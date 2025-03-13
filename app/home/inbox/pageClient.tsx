"use client";
import MessageComponent from "@/components/Inbox/message-component";
import { supabase } from "@/utils/supabase/client";
import { getInbox } from "@/utils/supabase/server";
import InboxType from "@/utils/types/inbox";
import {
  ArrowRightStartOnRectangleIcon,
  InboxIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type InboxClientProps = {
  username: string;
};

const InboxClient: FC<InboxClientProps> = ({ username }) => {
  const [logoutMenu, setLogoutMenu] = useState(false);
  const [inbox, setInbox] = useState<InboxType[]>([]);
  const [loading, setLoading] = useState(true); // [inbox, setInbox]
  const router = useRouter();
  const inboxRef = useRef<InboxType[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const dataInbox = await getInbox();
      if (dataInbox.error) {
        toast.error(dataInbox.message);
        return;
      }
      setInbox(dataInbox.data ? dataInbox.data : []);
      setLoading(false);
    })();
  }, []);
  useEffect(() => {
    inboxRef.current = inbox;
  }, [inbox]);
  useEffect(() => {
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        onPayload
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const onPayload = (payload: RealtimePostgresChangesPayload<InboxType>) => {
    if (
      payload.eventType === "INSERT" &&
      inboxRef.current &&
      payload.new.to === username
    ) {
      setInbox([payload.new, ...inboxRef.current]);
    }
    if (
      payload.eventType === "UPDATE" &&
      inboxRef.current &&
      payload.new.to === username
    ) {
      const newInbox = inboxRef.current.map((data) => {
        if (data.id === payload.new.id) {
          return payload.new;
        }
        return data;
      });
      setInbox(newInbox);
    }
    if (payload.eventType === "DELETE" && inboxRef.current) {
      const newInbox = inboxRef.current.filter((data) => {
        return data.id !== payload.old.id;
      });
      setInbox(newInbox);
    }
  };
  return (
    <>
      <div
        className={`fixed inset-0 left-10 ${
          logoutMenu ? "z-50" : "pointer-events-none"
        } right-10 flex justify-center items-center gap-4`}
      >
        <AnimatePresence mode="popLayout">
          {logoutMenu ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              key="modal"
              className="bg-slate-300 min-h-60 w-full p-5 rounded-3xl shadow bg-opacity-80 backdrop-filter backdrop-blur text-black lg:w-1/2 relative"
            >
              <button
                onClick={() => setLogoutMenu(false)}
                className="absolute top-3 hover:scale-105 transition duration-150 right-3"
              >
                <XCircleIcon className="w-12" />
              </button>
              <h1 className="text-3xl font-bold">Logout</h1>
              <p className="mt-2">
                Kamu yakin ingin logout? setelah logout kamu akan kehilangan
                akses pada akun ini!
              </p>
              <button
                onClick={() => router.push("/api/logout")}
                className="absolute bottom-5 py-3 px-6 bg-red-600 text-white font-semibold rounded-3xl hover:bg-red-500 hover:scale-105 transition duration-150 hover:-translate-y-1"
              >
                Ya
              </button>
              <button
                onClick={() => setLogoutMenu(false)}
                className="absolute bottom-5 right-5 py-3 px-6 bg-blue-600 text-white font-semibold rounded-3xl hover:bg-blue-500 hover:scale-105 transition duration-150 hover:-translate-y-1"
              >
                Ga jadi dah
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <motion.div
        layoutId="bg-white"
        className={`bg-white ${
          logoutMenu && "pointer-events-none"
        } min-h-screen px-4 flex flex-col items-center`}
      >
        <div className="flex relative justify-center gap-4 mt-5 items-center w-full text-xl font-semibold">
          <Link href="/home" className="text-slate-500">
            PLAY
          </Link>
          <Link href="/home/inbox" className="text-black">
            INBOX
          </Link>

          <div className="absolute right-0">
            <p
              onClick={() => setLogoutMenu(true)}
              className="cursor-pointer lg:block hidden text-red-400 hover:text-red-600"
            >
              Logout
            </p>
            <ArrowRightStartOnRectangleIcon
              onClick={() => setLogoutMenu(true)}
              className="w-7 lg:hidden text-red-600"
            />
          </div>
        </div>
        <div className="flex flex-col lg:w-1/2 w-full mt-10 gap-4 items-center">
          {!loading &&
            inbox.map((data, i) => <MessageComponent key={i} inbox={data} />)}
          {loading && <div className="loader"></div>}
          {!loading && inbox.length === 0 && (
            <div className="flex flex-col mt-6 justify-center items-center">
              <InboxIcon className="w-32" />
              <h1 className="text-3xl font-bold">
                Your inbox is <span className="text-red-500">empty!</span>
              </h1>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default InboxClient;
