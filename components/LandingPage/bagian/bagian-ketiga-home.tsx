import { motion } from "motion/react";
import { FC, RefObject } from "react";

type BagianKetigaHomeProps = {
  isInViewBagianKe3: boolean;
  bagianKe3Ref: RefObject<HTMLDivElement | null>;
};

const BagianKetigaHome: FC<BagianKetigaHomeProps> = ({
  bagianKe3Ref,
  isInViewBagianKe3,
}) => {
  return (
    <div
      key="bagian-ke3"
      ref={bagianKe3Ref}
      className="bg-black min-h-screen flex flex-col justify-center items-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={isInViewBagianKe3 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-white mb-20 mt-20 text-6xl font-bold"
      >
        Cari tahu
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInViewBagianKe3 ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1 }}
        className="relative bg-gradient-to-br from-indigo-500 md:w-96 w-64 rounded-3xl to-orange-600 p-2"
      >
        <img src="/amba.png" className="rounded-3xl" alt="" />
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={
            isInViewBagianKe3 ? { opacity: 1, scale: 1, rotate: -12 } : {}
          }
          transition={{ delay: 1.5 }}
          className="absolute -top-10 -left-20 -rotate-12 bg-white md:w-64 w-32 p-2 rounded-full text-center"
        >
          <p className="font-bold text-lg">Siapa teman baikmu?</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={
            isInViewBagianKe3 ? { opacity: 1, scale: 1, rotate: -12 } : {}
          }
          transition={{ delay: 2 }}
          className="absolute -bottom-10 -left-20 -rotate-12 bg-white md:w-64 w-40 p-2 rounded-full text-center"
        >
          <p className="font-bold text-lg">
            Hal apa yang masih kamu ingat waktu kecil?
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={
            isInViewBagianKe3 ? { opacity: 1, scale: 1, rotate: 12 } : {}
          }
          transition={{ delay: 2.5 }}
          className="absolute -top-10 -right-20 rotate-12 bg-white md:w-64 w-32 p-2 rounded-full text-center"
        >
          <p className="font-bold text-lg">Tipe kamu yang seperti apa?</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={
            isInViewBagianKe3 ? { opacity: 1, scale: 1, rotate: 12 } : {}
          }
          transition={{ delay: 3 }}
          className="absolute -bottom-10 -right-20 rotate-12 bg-white md:w-64 w-40 p-2 rounded-full text-center"
        >
          <p className="font-bold text-lg">Skill apa yang kamu banggakan?</p>
        </motion.div>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={isInViewBagianKe3 ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2 }}
        className="text-white text-center mt-20 text-6xl px-4 font-bold"
      >
        Tentang seseorang
      </motion.h1>
    </div>
  );
};

export default BagianKetigaHome;
