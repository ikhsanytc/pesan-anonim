"use client";
import ProfileType from "@/utils/types/profile";
import { PencilIcon } from "@heroicons/react/24/solid";
import { User } from "@supabase/supabase-js";
import React, { FC } from "react";

type ClientPageProps = {
  user: User;
  profile: ProfileType;
  avatar_url: string;
};

const ClientPage: FC<ClientPageProps> = ({ user, profile, avatar_url }) => {
  return (
    <div className="bg-white min-h-screen px-4 flex flex-col items-center">
      <div className="flex gap-4 mt-5 items-center text-xl font-semibold">
        <a href="" className="text-black">
          PLAY
        </a>
        <a href="" className="text-slate-500">
          INBOX
        </a>
      </div>
      <div className="md:w-[400px] w-[350px] mt-10 shadow-xl rounded-3xl relative">
        <div className="absolute w-full h-full bg-slate-200 rounded-3xl bg-opacity-5 backdrop-filter backdrop-blur-sm flex flex-col items-center justify-center">
          <ProfileImage path={avatar_url} />
          <h1 className="mt-5 text-white text-xl font-bold">
            send me anonymous messages!
          </h1>
        </div>
        <img src="/background.jpg" className="rounded-3xl" alt="" />
      </div>
      <div className="md:w-[400px] w-[350px] rounded-3xl shadow-xl bg-gray-200 p-4 mt-10 text-center flex flex-col justify-center">
        <h1 className="text-base font-semibold">Copy your link</h1>
        <p className="font-semibold mt-2 mb-2 text-base text-slate-400">
          anonim.com/message/ikhsannnn
        </p>
        <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-600 text-white font-bold rounded-full">
          Copy
        </button>
      </div>
    </div>
  );
};

type ProfileImageProps = {
  path: string;
};

const ProfileImage: FC<ProfileImageProps> = ({ path }) => {
  return (
    <div className="bg-white relative rounded-full p-1 cursor-pointer hover:bg-opacity-50">
      <img src={path} className="w-24 rounded-full" alt="" />
      <div className="absolute -bottom-1 right-0 bg-white rounded-full p-2 flex justify-center items-center">
        <PencilIcon className="w-5" />
      </div>
    </div>
  );
};

export default ClientPage;
