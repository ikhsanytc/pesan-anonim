import { FC, ReactNode } from "react";
import { motion } from "motion/react";

type PesanLayangMobileProps = {
  children: ReactNode;
};

const PesanLayangMobile: FC<PesanLayangMobileProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      key={`${children}`}
      className={`bg-slate-400 text-black text-center font-bold w-52 rounded-full p-2`}
    >
      {children}
    </motion.div>
  );
};
export default PesanLayangMobile;
