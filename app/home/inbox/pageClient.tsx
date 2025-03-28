"use client";
import ContainerHome from "@/components/Home/Container";
import InboxComponent from "@/components/Home/Inbox";
import { supabase } from "@/utils/supabase/client";
import { getInbox, getProfile } from "@/utils/supabase/server";
import InboxType from "@/utils/types/inbox";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "motion/react";

const InboxClient: FC = () => {
  const [inbox, setInbox] = useState<InboxType[]>([]);
  const [loading, setLoading] = useState(true); // [inbox, setInbox]
  const inboxRef = useRef<InboxType[]>([]);
  const usernameRef = useRef("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const dataInbox = await getInbox();
      const profile = await getProfile();
      if (dataInbox.error) {
        toast.error(dataInbox.message);
        return;
      }
      setUsername(profile?.username ?? "");
      setInbox(dataInbox.data ? dataInbox.data : []);
      setLoading(false);
    })();
  }, []);
  useEffect(() => {
    inboxRef.current = inbox;
  }, [inbox]);
  useEffect(() => {
    usernameRef.current = username;
  }, [username]);
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
      usernameRef.current &&
      usernameRef.current !== "" &&
      payload.new.to === usernameRef.current
    ) {
      setInbox([payload.new, ...inboxRef.current]);
    }
    if (
      payload.eventType === "UPDATE" &&
      inboxRef.current &&
      usernameRef.current &&
      usernameRef.current !== "" &&
      payload.new.to === usernameRef.current
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
    <motion.div layoutId="bg-white" className="bg-white min-h-screen">
      <ContainerHome currentPage="inbox">
        <InboxComponent inbox={inbox} loading={loading} />
      </ContainerHome>
    </motion.div>
  );
};

export default InboxClient;
