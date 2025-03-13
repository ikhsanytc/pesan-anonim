"use client";
import { getProfile } from "@/utils/supabase/server";
import { AnimatePresence, motion } from "motion/react";
import React, { FC, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

type MessageClientProps = {
  avatar_url: string;
  username: string;
};

const MessageClient: FC<MessageClientProps> = ({ avatar_url, username }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    document.title = `@${username}`;
  }, []);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let usernameUserSekarang = "unknown";
    const userProfile = await getProfile();
    if (userProfile) {
      usernameUserSekarang = userProfile.username;
    }
    try {
      const res = await fetch("/api/send_message", {
        method: "POST",
        body: JSON.stringify({
          message,
          to: username,
          from: usernameUserSekarang,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.message);
        setIsLoading(false);
        return;
      }
      toast.success("Pesan terkirim!");
      setMessage("");
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      toast.error("Terjadi kesalahan!");
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-gradient-to-br flex flex-col justify-center px-4 items-center from-pink-500 to-orange-600 min-h-screen">
      <form onSubmit={submit} className="flex flex-col lg:w-1/2 w-full">
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Send me anonymous message..."
          className="bg-white bg-opacity-30 rounded-b-3xl p-4 placeholder-black/30 text-xl font-semibold"
        ></textarea>
        <AnimatePresence mode="popLayout">
          {message && !isLoading ? (
            <motion.button
              type="submit"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
              key="buttonSend"
              className="w-full bg-black py-4 text-white rounded-full font-semibold mt-5 hover:bg-black/90 transition duration-150"
            >
              Send
            </motion.button>
          ) : isLoading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
              className="loaderNormal mx-auto mt-5"
            ></motion.div>
          ) : null}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default MessageClient;
