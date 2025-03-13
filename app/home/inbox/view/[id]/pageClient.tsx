"use client";
import InboxType from "@/utils/types/inbox";
import React, { FC, useState } from "react";
import "./style.css";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

type ViewInboxClientProps = {
  data: InboxType;
};

const ViewInboxClient: FC<ViewInboxClientProps> = ({ data }) => {
  const router = useRouter();
  const colorArray = [
    "from-pink-600 to-orange-600",
    "from-indigo-800 to-blue-600",
    "from-purple-600 to-pink-600",
    "from-green-600 to-lime-400",
  ];
  const [color, setColor] = useState(colorArray[0]);
  const onChangeColor = () => {
    const randomColor =
      colorArray[Math.floor(Math.random() * colorArray.length)];
    setColor(randomColor);
  };
  return (
    <div className="bg-slate-100 min-h-screen flex px-4 flex-col justify-center items-center">
      <Link href="/home/inbox" className="absolute left-5 top-5 cursor-pointer">
        <ChevronLeftIcon className="w-10" />
      </Link>
      <div className="flex flex-col w-full lg:w-1/2 shadow-2xl bg-transparent rounded-3xl">
        <div
          className={`bg-gradient-to-r ${color} h-24 p-5 rounded-t-3xl text-center text-white flex justify-center items-center`}
        >
          <h1 className="text-2xl font-bold">ask me anything, anonymously</h1>
        </div>
        <motion.div
          layoutId="bg-white"
          onDoubleClick={() => router.push("/home/inbox")}
          className="bg-white h-36 rounded-b-3xl p-5 flex justify-center items-center text-center"
        >
          <p className="text-xl font-semibold">{data.message}</p>
        </motion.div>
      </div>
      <div
        className="bg-white p-1 mt-5 cursor-pointer rounded-full"
        onClick={onChangeColor}
      >
        <div className="color-picker"></div>
      </div>
    </div>
  );
};

export default ViewInboxClient;
