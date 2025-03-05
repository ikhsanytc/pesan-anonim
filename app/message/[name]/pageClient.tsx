"use client";
import React, { FC } from "react";

type MessageClientProps = {
  avatar_url: string;
  username: string;
};

const MessageClient: FC<MessageClientProps> = ({ avatar_url, username }) => {
  return (
    <div className="bg-gradient-to-br flex flex-col justify-center px-4 items-center from-pink-500 to-orange-600 min-h-screen">
      <div className="flex flex-col lg:w-1/2 w-full">
        <div className="bg-white shadow-xl w-full p-4 rounded-t-3xl flex gap-2 items-center">
          <div>
            <img src={avatar_url} className="w-14 rounded-full" alt="" />
          </div>
          <div className="flex flex-col">
            <p>@{username}</p>
            <p className="font-bold -mt-1">Send anonymous messages!</p>
          </div>
        </div>
        <textarea
          name=""
          id=""
          rows={5}
          placeholder="Send me anonymous message!"
          className="bg-white bg-opacity-30 rounded-b-3xl p-4 placeholder-black/30 text-xl font-semibold"
        ></textarea>
      </div>
    </div>
  );
};

export default MessageClient;
