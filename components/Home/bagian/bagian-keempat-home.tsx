import React from "react";
import WaveTerbalik from "../../svg/wave-terbalik";
import Link from "next/link";

const BagianKeempatHome = () => {
  return (
    <div className="bg-black md:min-h-screen relative px-4">
      <div className="bg-gradient-to-b rounded-b-3xl from-pink-500 to-orange-600 md:h-[500px] h-[300px]">
        <WaveTerbalik />
        <div className="flex flex-col justify-center items-center">
          <h1 className="md:text-5xl text-4xl text-white font-bold text-center">
            Coba sekarang!
          </h1>
          <Link
            href="/"
            className="bg-gradient-to-br from-green-500 via-orange-500 to-indigo-500 px-20 mt-5 rounded-2xl text-white font-semibold shadow-2xl py-4 hover:scale-105 hover:-translate-y-1 transition duration-150 md:text-xl"
          >
            Try!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BagianKeempatHome;
