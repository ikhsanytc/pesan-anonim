"use client";
import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-500 to-orange-600 min-h-screen flex flex-col text-white justify-center items-center">
      <h1 className="text-6xl font-bold">Oops!</h1>
      <h2 className="mt-3 text-2xl font-semibold">
        Kami ada kesalahan sedikit di halaman ini 🙏
      </h2>
      <Link
        href="/"
        className="bg-indigo-600 hover:scale-105 hover:-translate-y-1 transition duration-150 mt-4 py-3 px-6 text-xl font-semibold rounded-xl"
      >
        Kembali
      </Link>
    </div>
  );
};

export default Error;
