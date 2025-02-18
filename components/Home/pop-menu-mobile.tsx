import { AnimatePresence, motion } from "motion/react";
import React, { FC } from "react";

type PopMenuMobileProps = {
  menuStatus: boolean;
};

const PopMenuMobile: FC<PopMenuMobileProps> = ({ menuStatus }) => {
  return (
    <div
      className={`fixed inset-0 left-10 ${
        menuStatus ? "z-50" : "pointer-events-none"
      } right-10 flex justify-center items-center gap-4`}
    >
      <AnimatePresence mode="popLayout">
        {menuStatus ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key="modal"
            className="bg-black min-h-60 w-full p-3 rounded-3xl shadow bg-opacity-80 backdrop-filter backdrop-blur text-white flex justify-center"
          >
            <div className="flex flex-col text-4xl font-bold justify-center gap-2">
              <a href="" className="hover:underline">
                About
              </a>
              <a href="" className="hover:underline">
                Blog
              </a>
              <a href="" className="hover:underline">
                Contact Us
              </a>
              <a href="" className="hover:text-pink-500">
                Try
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default PopMenuMobile;
