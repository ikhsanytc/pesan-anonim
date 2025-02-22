"use client";
import React, { useRef, useState } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import { motion, useInView as useInViewMotion } from "motion/react";
import { useInView } from "react-intersection-observer";
import PopMenuMobile from "@/components/Home/pop-menu-mobile";
import BagianAwalHome from "@/components/Home/bagian/bagian-awal-home";
import NavbarHomeLayang from "@/components/Home/navbar-home-layang";
import BagianQnAHomeMobile from "@/components/Home/bagian/bagian-qna-home-mobile";
import BagianQnaHome from "@/components/Home/bagian/bagian-qna-home";
import BagianKeduaHome from "@/components/Home/bagian/bagian-kedua-home";
import BagianKetigaHome from "@/components/Home/bagian/bagian-ketiga-home";
import BagianKeempatHome from "@/components/Home/bagian/bagian-keempat-home";
import BagianFooterHome from "@/components/Home/bagian/bagian-footer-home";

const Home = () => {
  const { ref, inView } = useInView();
  const bagianQnARef = useRef<HTMLDivElement>(null);
  const bagianKe2Ref = useRef<HTMLDivElement>(null);
  const bagianKe3Ref = useRef<HTMLDivElement>(null);
  const bagianKe4Ref = useRef<HTMLDivElement>(null);
  const isInViewBagianKe2 = useInViewMotion(bagianKe2Ref);
  const isInViewBagianKe3 = useInViewMotion(bagianKe3Ref);
  const isInViewBagianKe4 = useInViewMotion(bagianKe4Ref);
  const isInViewBagianQnA = useInViewMotion(bagianQnARef);
  const [menuStatus, setMenuStatus] = useState(false);
  // 1 = Tanyakan saya apapun
  // 2 = Confession
  // 3 = 3 Kata
  const [question, setQuestion] = useState(1);
  return (
    <>
      <PopMenuMobile menuStatus={menuStatus} />
      <NavbarHomeLayang
        inView={inView}
        menuStatus={menuStatus}
        setMenuStatus={setMenuStatus}
      />
      <div className="bg-black min-h-screen px-4 py-6 text-white ">
        <BagianAwalHome
          menuStatus={menuStatus}
          ref={ref}
          setMenuStatus={setMenuStatus}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInViewBagianQnA ? { opacity: 1, scale: 1 } : {}}
          className="bg-black"
          ref={bagianQnARef}
          key="bagian-q&a"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xl flex gap-2 font-semibold justify-center items-center"
          >
            <ArrowDownIcon className="w-6" /> <p>Scroll for more</p>
          </motion.span>
          <BagianQnAHomeMobile question={question} setQuestion={setQuestion} />
          <BagianQnaHome question={question} setQuestion={setQuestion} />
        </motion.div>
      </div>
      <BagianKeduaHome
        bagianKe2Ref={bagianKe2Ref}
        isInViewBagianKe2={isInViewBagianKe2}
      />
      <BagianKetigaHome
        bagianKe3Ref={bagianKe3Ref}
        isInViewBagianKe3={isInViewBagianKe3}
      />
      <BagianKeempatHome
        bagianKe4Ref={bagianKe4Ref}
        isInViewBagianKe4={isInViewBagianKe4}
      />
      <BagianFooterHome />
    </>
  );
};

export default Home;
