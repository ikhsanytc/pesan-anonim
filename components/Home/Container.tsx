import {
  ArrowRightStartOnRectangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, ReactNode, useState } from "react";

type ContainerHomeProps = {
  children?: ReactNode;
  currentPage?: "utama" | "inbox";
};

const ContainerHome: FC<ContainerHomeProps> = ({
  children,
  currentPage = "utama",
}) => {
  const router = useRouter();
  const [logoutMenu, setLogoutMenu] = useState(false);
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
      <div
        className={`bg-white ${
          logoutMenu && "pointer-events-none"
        } min-h-screen px-4 flex flex-col items-center`}
      >
        <div className="flex relative justify-center gap-4 mt-5 items-center w-full text-xl font-semibold">
          <Link
            href="/home"
            className={
              currentPage === "utama" ? "text-black" : "text-slate-500"
            }
          >
            PLAY
          </Link>
          <Link
            href="/home/inbox"
            className={
              currentPage === "inbox" ? "text-black" : "text-slate-500"
            }
          >
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
        <div className={currentPage === "inbox" ? "w-full lg:w-1/2" : ""}>
          {children}
        </div>
      </div>
    </>
  );
};

export default ContainerHome;
