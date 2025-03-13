import { motion } from "motion/react";
import WaveTerbalik from "../../svg/wave-terbalik";
import { FC, RefObject } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

type BagianKeduaHomeProps = {
  isInViewBagianKe2: boolean;
  bagianKe2Ref: RefObject<HTMLDivElement | null>;
};

const BagianKeduaHome: FC<BagianKeduaHomeProps> = ({
  isInViewBagianKe2,
  bagianKe2Ref,
}) => {
  return (
    <div className="bg-gradient-to-b from-blue-500 to-indigo-700 min-h-screen">
      <WaveTerbalik />
      <motion.div
        key="bagian-ke2"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInViewBagianKe2 ? { opacity: 1, scale: 1 } : {}}
        exit={{ opacity: 0, scale: 0 }}
        ref={bagianKe2Ref}
      >
        <span className="text-xl text-white flex gap-2 font-semibold justify-center items-center">
          <ArrowDownIcon className="w-6" /> <p>Scroll for more</p>
        </span>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={
                isInViewBagianKe2 ? { opacity: 1, scale: 1, rotate: 12 } : {}
              }
              transition={{ delay: 0.5 }}
              className="bg-slate-200 shadow-xl rotate-12 mb-5 w-64 h-32 rounded-xl"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-blue-500 h-1/2 rounded-t-xl flex justify-center items-center text-white">
                <p className="font-bold text-2xl">Dealbreaker</p>
              </div>
              <div className="flex justify-center items-center h-16">
                <p className="text-lg font-semibold text-center">
                  Mereka tidak suka film marvel
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={
                isInViewBagianKe2 ? { opacity: 1, scale: 1, rotate: -12 } : {}
              }
              transition={{ delay: 1 }}
              className="absolute top-80 shadow-xl bg-slate-200 mb-5 -rotate-12 w-72 h-32 rounded-xl"
            >
              <div className="bg-gradient-to-br from-purple-600 to-blue-500 h-1/2 rounded-t-xl flex justify-center items-center text-white">
                <p className="font-bold text-2xl">3 Kata</p>
              </div>
              <div className="flex justify-center items-center h-16">
                <p className="text-lg text-center font-semibold">
                  Cantik, Anggun, Mengagumkan.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={
                isInViewBagianKe2 ? { opacity: 1, scale: 1, rotate: 12 } : {}
              }
              transition={{ delay: 1.5 }}
              className="absolute shadow-xl lg:block hidden top-40 right-52 bg-slate-200 mb-5 rotate-12 w-72 h-32 rounded-xl"
            >
              <div className="bg-gradient-to-br from-red-600 to-orange-500 h-1/2 rounded-t-xl flex justify-center items-center text-white">
                <p className="font-bold text-2xl">Tanya jawab</p>
              </div>
              <div className="flex justify-center items-center h-16">
                <p className="text-lg font-semibold text-center">
                  Apa kamu pernah pergi ke kota tua?
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={
                isInViewBagianKe2 ? { opacity: 1, scale: 1, rotate: -12 } : {}
              }
              transition={{ delay: 2 }}
              className="absolute shadow-xl lg:block hidden top-40 left-60 bg-slate-200 mb-5 -rotate-12 w-72 h-32 rounded-xl"
            >
              <div className="bg-gradient-to-br from-orange-600 to-red-500 h-1/2 rounded-t-xl flex justify-center items-center text-white">
                <p className="font-bold text-2xl">Jujur</p>
              </div>
              <div className="flex justify-center items-center h-16">
                <p className="text-lg font-semibold text-center">
                  Aku suka kamu
                </p>
              </div>
            </motion.div>
          </div>
          <div className="relative shadow-xl bg-gradient-to-br from-pink-600 to-orange-600 w-32 h-32 rounded-full p-1">
            <img src="/ambatukam.jpeg" className="rounded-full" alt="" />
            <div className="absolute shadow-xl top-10 left-14 bg-gradient-to-br from-pink-600 to-orange-600 w-36 h-36 rounded-full p-1">
              <img src="/ambatukam-2.jpg" className="rounded-full" alt="" />
            </div>
          </div>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isInViewBagianKe2 ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-white text-5xl font-bold text-center mt-20 pb-10 px-4"
        >
          Jawab satu persatu pertanyaan yang muncul
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default BagianKeduaHome;
