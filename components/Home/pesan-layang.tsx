import { FC, ReactNode } from "react";
import { motion } from "motion/react";

type PesanLayangProps = {
  children: ReactNode;
  type: "layang-1" | "layang-2" | "layang-3" | "layang-4";
};

const PesanLayang: FC<PesanLayangProps> = ({ children, type }) => {
  const layang1 = "right-10";
  const layang2 = "left-10";
  const layang3 = "bottom-20 left-10";
  const layang4 = "bottom-20 right-10";
  const layang =
    type === "layang-1"
      ? layang1
      : type === "layang-2"
      ? layang2
      : type === "layang-3"
      ? layang3
      : layang4;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      key={`${children}`}
      className={`bg-slate-400 absolute ${layang} text-black text-center font-bold w-52 rounded-full p-2`}
    >
      {children}
    </motion.div>
  );
};

export default PesanLayang;
