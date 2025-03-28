"use client";
import { getAvatarUrl, getProfile } from "@/utils/supabase/server";
import ProfileType from "@/utils/types/profile";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProfileImage from "./profile-img";
import { motion } from "motion/react";
import Link from "next/link";

const Utama = () => {
  const [avatar_url, setAvatarUrl] = useState("/nophoto.jpeg");
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const router = useRouter();
  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      process.env.NEXT_PUBLIC_BASE_URL + "/message/" + profile?.username
    );
    toast.success("Copied to clipboard!");
  };
  useEffect(() => {
    (async () => {
      const profile = await getProfile();
      if (!profile) {
        router.push("/register");
        return;
      }
      setProfile(profile);
      const avatar = await getAvatarUrl(profile.avatar_url);
      setAvatarUrl(avatar);
    })();
  }, []);
  return (
    <>
      <div
        className={`md:w-[400px] w-[350px] mt-10 shadow-xl rounded-3xl relative ${
          profile ?? "cursor-wait"
        }`}
      >
        <div
          className={`absolute w-full h-full bg-slate-200 rounded-3xl bg-opacity-5 backdrop-filter backdrop-blur-sm flex flex-col items-center justify-center ${
            profile ?? "pointer-events-none"
          }`}
        >
          <ProfileImage path={avatar_url} />
          <h1 className="mt-5 text-white text-xl font-bold">
            {profile ? (
              "Send me anonymous messages!"
            ) : (
              <div className="loaderNormal mt-2"></div>
            )}
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
      {profile ? (
        <>
          <div className="md:w-[400px] w-[350px] rounded-3xl shadow-xl bg-gray-200 p-4 mt-10 text-center flex flex-col justify-center">
            <h1 className="text-base font-semibold">Copy your link</h1>
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/message/${profile?.username}`}
              target="_blank"
              className="font-semibold hover:underline mt-2 mb-2 text-base text-slate-400"
            >
              {process.env.NEXT_PUBLIC_BASE_URL}/message/{profile?.username}
            </Link>
            <button
              onClick={handleCopy}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-600 text-white font-bold rounded-full cursor-pointer"
            >
              Copy
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="md:w-[400px] w-[350px] rounded-3xl shadow-xl bg-gray-200 p-4 mt-10 text-center cursor-wait">
            <div className="animate-pulse flex flex-col justify-center items-center w-full">
              <div className="w-32 h-2 rounded-full bg-gray-500"></div>
              <div className="w-60 h-2 rounded-full bg-gray-500 mt-3"></div>
              <div className="w-full py-3 text-white bg-gray-500 font-bold mt-3 rounded-full cursor-wait">
                Copy
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Utama;
