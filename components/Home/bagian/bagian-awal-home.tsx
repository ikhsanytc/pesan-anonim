import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { Dispatch, FC, SetStateAction } from "react";
import { motion } from "motion/react";
import { ReactTyped } from "react-typed";
import Wave from "../../svg/wave";

type NavbarHomeLayangProps = {
  menuStatus: boolean;
  ref: (node?: Element | null) => void;
  setMenuStatus: Dispatch<SetStateAction<boolean>>;
};

const BagianAwalHome: FC<NavbarHomeLayangProps> = ({
  menuStatus,
  ref,
  setMenuStatus,
}) => {
  return (
    <div className="bg-gradient-to-b from-pink-500 to-orange-600 rounded-3xl">
      <div ref={ref} className="flex p-4 justify-between items-center z-50">
        <h1 className="text-3xl font-bold">Anonim</h1>
        <div className="lg:flex hidden gap-4 text-2xl font-bold">
          <a href="" className="hover:underline underline-offset-4">
            About
          </a>
          <a href="" className="hover:underline underline-offset-4">
            Blog
          </a>
          <a href="" className="hover:underline underline-offset-4">
            Contact Us
          </a>
        </div>
        <a
          href=""
          className="text-2xl lg:block hidden font-bold hover:text-black"
        >
          Try It
        </a>
        {menuStatus ? (
          <div
            onClick={() => setMenuStatus(false)}
            className="lg:hidden cursor-pointer z-50"
          >
            <XMarkIcon className="w-10" />
          </div>
        ) : (
          <div
            onClick={() => setMenuStatus(true)}
            className="lg:hidden cursor-pointer z-50"
          >
            <Bars3Icon className="w-10" />
          </div>
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="mt-10 flex flex-col justify-center items-center min-h-96"
      >
        <ReactTyped
          strings={[
            "Kirim pesan anonim.",
            "Kirim pesan mengenai hobimu.",
            "Kirim pesan mengenai keluargamu.",
            "Kirim pesan mengenai temanmu.",
            "Kirim pesan mengenai kamu.",
            "Kirim pesan mengenai dirimu.",
            "Kirim pesan mengenai kamu.",
            "Kirim pesan mengenai dirimu.",
            "",
          ]}
          typeSpeed={100}
          className="lg:text-5xl md:text-4xl text-2xl font-semibold"
          backSpeed={100}
          loop
        />
      </motion.div>
      <Wave />
    </div>
  );
};

export default BagianAwalHome;
