import React, { FC, RefObject } from "react";
import WaveTerbalik from "../../svg/wave-terbalik";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

type BagianKeempatHomeProps = {
  isInViewBagianKe4: boolean;
  bagianKe4Ref: RefObject<HTMLDivElement | null>;
};

const BagianKeempatHome: FC<BagianKeempatHomeProps> = ({
  bagianKe4Ref,
  isInViewBagianKe4,
}) => {
  const nav = useRouter();
  return (
    <div ref={bagianKe4Ref} className="bg-black md:min-h-screen relative px-4">
      <div className="bg-gradient-to-b rounded-b-3xl from-blue-500 to-indigo-700 md:h-[500px] h-[300px]">
        <WaveTerbalik />
        <div className="flex flex-col justify-center items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={isInViewBagianKe4 ? { opacity: 1, y: 0 } : {}}
            className="md:text-5xl text-4xl text-white font-bold text-center"
          >
            Coba sekarang!
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, rotate: 200 }}
            animate={isInViewBagianKe4 ? { opacity: 1, rotate: 0 } : {}}
            transition={{ delay: 1 }}
          >
            <button
              onClick={() => nav.push("/register")}
              className="bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-800 px-20 mt-5 rounded-2xl text-white font-semibold shadow-2xl py-4 hover:scale-105 hover:-translate-y-1 transition duration-150 md:text-xl"
            >
              Try!
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BagianKeempatHome;
