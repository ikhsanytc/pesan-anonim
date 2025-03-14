"use client";
import ProfileType from "@/utils/types/profile";
import {
  ArrowRightStartOnRectangleIcon,
  PencilIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";

type ClientPageProps = {
  profile: ProfileType;
  avatar_url: string;
};

const ClientPage: FC<ClientPageProps> = ({ profile, avatar_url }) => {
  const [logoutMenu, setLogoutMenu] = useState(false);
  const router = useRouter();
  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      process.env.NEXT_PUBLIC_BASE_URL + "/message/" + profile.username
    );
    toast.success("Copied to clipboard!");
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
      <div
        className={`bg-white ${
          logoutMenu && "pointer-events-none"
        } min-h-screen px-4 flex flex-col items-center`}
      >
        <div className="flex relative justify-center gap-4 mt-5 items-center w-full text-xl font-semibold">
          <Link href="#" className="text-black">
            PLAY
          </Link>
          <Link href="/home/inbox" className="text-slate-500">
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
        <div className="md:w-[400px] w-[350px] mt-10 shadow-xl rounded-3xl relative">
          <div className="absolute w-full h-full bg-slate-200 rounded-3xl bg-opacity-5 backdrop-filter backdrop-blur-sm flex flex-col items-center justify-center">
            <ProfileImage path={avatar_url} />
            <h1 className="mt-5 text-white text-xl font-bold">
              Send me anonymous messages!
            </h1>
          </div>
          <motion.img
            src="/background.jpg"
            layoutId="bg-image"
            loading="lazy"
            className="rounded-3xl"
            alt=""
          />
        </div>
        <div className="md:w-[400px] w-[350px] rounded-3xl shadow-xl bg-gray-200 p-4 mt-10 text-center flex flex-col justify-center">
          <h1 className="text-base font-semibold">Copy your link</h1>
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/message/${profile.username}`}
            target="_blank"
            className="font-semibold hover:underline mt-2 mb-2 text-base text-slate-400"
          >
            {process.env.NEXT_PUBLIC_BASE_URL}/message/{profile.username}
          </Link>
          <button
            onClick={handleCopy}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-600 text-white font-bold rounded-full cursor-pointer"
          >
            Copy
          </button>
        </div>
      </div>
    </>
  );
};

type ProfileImageProps = {
  path: string;
};

const ProfileImage: FC<ProfileImageProps> = ({ path }) => {
  const router = useRouter();
  return (
    <motion.div
      layoutId="profileAvatar"
      onClick={() => router.push("/home/edit_avatar")}
      className="bg-white relative rounded-full p-1 cursor-pointer hover:bg-opacity-50"
    >
      <img src={path} loading="lazy" className="w-24 rounded-full" alt="" />
      <div className="absolute -bottom-1 right-0 bg-white rounded-full p-2 flex justify-center items-center">
        <PencilIcon className="w-5" />
      </div>
    </motion.div>
  );
};

export default ClientPage;
