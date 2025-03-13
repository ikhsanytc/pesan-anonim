"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type ErrorProps = {
  message?: string;
};

const Error: FC<ErrorProps> = ({
  message = "Kami ada kesalahan sedikit di halaman ini 🙏",
}) => {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-500 to-indigo-700 min-h-screen flex flex-col text-white justify-center items-center">
      <div
        onClick={() => router.back()}
        className="absolute left-5 top-5 cursor-pointer"
      >
        <ChevronLeftIcon className="w-10" />
      </div>
      <h1 className="text-6xl font-bold">Oops!</h1>
      <h2 className="mt-3 text-2xl font-semibold">{message}</h2>
    </div>
  );
};

export default Error;
