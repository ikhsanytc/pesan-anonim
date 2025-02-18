"use client";
import Wave from "@/components/svg/wave";
import React, { useRef, useState } from "react";
import { ReactTyped } from "react-typed";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  AnimatePresence,
  motion,
  useInView as useInViewMotion,
} from "motion/react";
import { useInView } from "react-intersection-observer";
import WaveTerbalik from "@/components/svg/wave-terbalik";
import Link from "next/link";
import PesanLayang from "@/components/Home/pesan-layang";
import PesanLayangMobile from "@/components/Home/pesan-layang-mobile";

const Home = () => {
  const { ref, inView } = useInView();
  const bagianQnARef = useRef<HTMLDivElement>(null);
  const bagianKe2Ref = useRef<HTMLDivElement>(null);
  const bagianKe3Ref = useRef<HTMLDivElement>(null);
  const isInViewBagianKe2 = useInViewMotion(bagianKe2Ref);
  const isInViewBagianKe3 = useInViewMotion(bagianKe3Ref);
  const isInViewBagianQnA = useInViewMotion(bagianQnARef);
  const [menuStatus, setMenuStatus] = useState(false);
  // 1 = Tanyakan saya apapun
  // 2 = Confession
  // 3 = 3 Kata
  const [question, setQuestion] = useState(1);
  return (
    <>
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
      <div
        className={`fixed top-0 bg-black bg-opacity-85 backdrop-filter backdrop-blur ${
          inView
            ? "w-0 opacity-0 pointer-events-none text-black"
            : "w-full text-white"
        } p-4 z-50 transition-all duration-500 ease-in-out`}
      >
        <div className="flex justify-between items-center gap-4">
          {inView ? null : (
            <>
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
                className="text-2xl lg:block hidden font-bold hover:text-pink-500"
              >
                Try It
              </a>
              {menuStatus ? (
                <div
                  onClick={() => setMenuStatus(false)}
                  className="lg:hidden cursor-pointer"
                >
                  <XMarkIcon className="w-10" />
                </div>
              ) : (
                <div
                  onClick={() => setMenuStatus(true)}
                  className="lg:hidden cursor-pointer"
                >
                  <Bars3Icon className="w-10" />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="bg-black min-h-screen px-4 py-6 text-white ">
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
          <div className="md:hidden block">
            <AnimatePresence mode="popLayout">
              <div className="relative flex flex-col justify-center min-h-screen items-center">
                <h1 className="text-center text-5xl mb-5 font-bold z-40">
                  Bermain game q&a
                </h1>
                <div className="flex flex-col min-h-80 gap-3">
                  {question === 1 ? (
                    <>
                      <PesanLayangMobile>Apa cita cita kamu?</PesanLayangMobile>
                      <PesanLayangMobile>
                        Siapa orang yang kamu suka?
                      </PesanLayangMobile>
                      <PesanLayangMobile>
                        Rencana masa depan mau bagaimana?
                      </PesanLayangMobile>
                      <PesanLayangMobile>
                        Jika kamu jadi kamen rider, apa yang kamu lakukan?
                      </PesanLayangMobile>
                    </>
                  ) : question === 2 ? (
                    <>
                      <PesanLayangMobile>
                        Aku lagi suka seseorang!
                      </PesanLayangMobile>
                      <PesanLayangMobile>
                        Aku pernah buka situs biru.
                      </PesanLayangMobile>
                      <PesanLayangMobile>
                        Aku pernah dapet nilai 50 di ulangan :)
                      </PesanLayangMobile>
                      <PesanLayangMobile>Aku ga suka kamu.</PesanLayangMobile>
                    </>
                  ) : question === 3 ? (
                    <>
                      <PesanLayangMobile>
                        Harta, Tahta, Wanita!
                      </PesanLayangMobile>
                      <PesanLayangMobile>
                        Kamu cantik, soft spoken, mengagumkan.
                      </PesanLayangMobile>
                      <PesanLayangMobile>
                        Lu jelek, burik, dekil!
                      </PesanLayangMobile>
                      <PesanLayangMobile>
                        Tolong, maaf, terima kasih.
                      </PesanLayangMobile>
                    </>
                  ) : null}
                </div>
                <div className="flex gap-3 items-center">
                  <ArrowLeftIcon
                    className="w-10"
                    onClick={() => {
                      if (question === 1) {
                        setQuestion(3);
                        return;
                      }
                      setQuestion(question - 1);
                    }}
                  />
                  <p className="text-lg font-semibold">
                    {question === 1
                      ? "Tanyakan saya apapun"
                      : question === 2
                      ? "Confession"
                      : question === 3
                      ? "3 Kata"
                      : ""}
                  </p>
                  <ArrowRightIcon
                    className="w-10"
                    onClick={() => {
                      if (question === 3) {
                        setQuestion(1);
                        return;
                      }
                      setQuestion(question + 1);
                    }}
                  />
                </div>
              </div>
            </AnimatePresence>
          </div>
          <div className="md:block hidden">
            <AnimatePresence mode="popLayout">
              <div className="relative flex flex-col justify-center min-h-screen items-center">
                <h1 className="text-center text-6xl font-bold z-40">
                  Bermain game q&a
                </h1>
                <div className="mt-6 text-3xl font-bold text-center z-40 flex flex-col gap-3">
                  <p
                    className="hover:text-orange-600 cursor-pointer"
                    onMouseEnter={() => setQuestion(1)}
                  >
                    Tanyakan saya apapun
                  </p>
                  <p
                    className="hover:text-orange-600 cursor-pointer"
                    onMouseEnter={() => setQuestion(2)}
                  >
                    Confession
                  </p>
                  <p
                    className="hover:text-orange-600 cursor-pointer"
                    onMouseEnter={() => setQuestion(3)}
                  >
                    3 Kata
                  </p>
                </div>
                {question === 1 ? (
                  <>
                    <PesanLayang type="layang-1">
                      Apa cita cita kamu?
                    </PesanLayang>
                    <PesanLayang type="layang-2">
                      Siapa orang yang kamu suka?
                    </PesanLayang>
                    <PesanLayang type="layang-3">
                      Rencana masa depan mau bagaimana?
                    </PesanLayang>
                    <PesanLayang type="layang-4">
                      Jika kamu jadi kamen rider, apa yang kamu lakukan?
                    </PesanLayang>
                  </>
                ) : question === 2 ? (
                  <>
                    <PesanLayang type="layang-1">
                      Aku lagi suka seseorang!
                    </PesanLayang>
                    <PesanLayang type="layang-2">
                      Aku pernah buka situs biru.
                    </PesanLayang>
                    <PesanLayang type="layang-3">
                      Aku pernah dapet nilai 50 di ulangan :)
                    </PesanLayang>
                    <PesanLayang type="layang-4">Aku ga suka kamu.</PesanLayang>
                  </>
                ) : question === 3 ? (
                  <>
                    <PesanLayang type="layang-1">
                      Harta, Tahta, Wanita!
                    </PesanLayang>
                    <PesanLayang type="layang-2">
                      Kamu cantik, soft spoken, mengagumkan.
                    </PesanLayang>
                    <PesanLayang type="layang-3">
                      Lu jelek, burik, dekil!
                    </PesanLayang>
                    <PesanLayang type="layang-4">
                      Tolong, maaf, terima kasih.
                    </PesanLayang>
                  </>
                ) : null}
              </div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <div className="bg-gradient-to-b from-pink-500 to-orange-600 min-h-screen">
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
              <div className="bg-slate-200 shadow-xl rotate-12 mb-5 w-64 h-32 rounded-xl">
                <div className="bg-gradient-to-br from-indigo-500 to-blue-500 h-1/2 rounded-t-xl flex justify-center items-center text-white">
                  <p className="font-bold text-2xl">Dealbreaker</p>
                </div>
                <div className="flex justify-center items-center h-16">
                  <p className="text-lg font-semibold">
                    Mereka tidak suka film marvel
                  </p>
                </div>
              </div>
              <div className="absolute top-80 shadow-xl bg-slate-200 mb-5 -rotate-12 w-72 h-32 rounded-xl">
                <div className="bg-gradient-to-br from-purple-600 to-blue-500 h-1/2 rounded-t-xl flex justify-center items-center text-white">
                  <p className="font-bold text-2xl">3 Kata</p>
                </div>
                <div className="flex justify-center items-center h-16">
                  <p className="text-lg font-semibold">
                    Cantik, Anggun, Mengagumkan.
                  </p>
                </div>
              </div>
              <div className="absolute shadow-xl lg:block hidden top-40 right-52 bg-slate-200 mb-5 rotate-12 w-72 h-32 rounded-xl">
                <div className="bg-gradient-to-br from-red-600 to-orange-500 h-1/2 rounded-t-xl flex justify-center items-center text-white">
                  <p className="font-bold text-2xl">Tanya jawab</p>
                </div>
                <div className="flex justify-center items-center h-16">
                  <p className="text-lg font-semibold text-center">
                    Apa kamu pernah pergi ke kota tua?
                  </p>
                </div>
              </div>
              <div className="absolute shadow-xl lg:block hidden top-40 left-60 bg-slate-200 mb-5 -rotate-12 w-72 h-32 rounded-xl">
                <div className="bg-gradient-to-br from-orange-600 to-red-500 h-1/2 rounded-t-xl flex justify-center items-center text-white">
                  <p className="font-bold text-2xl">Jujur</p>
                </div>
                <div className="flex justify-center items-center h-16">
                  <p className="text-lg font-semibold text-center">
                    Aku suka kamu
                  </p>
                </div>
              </div>
            </div>
            <div className="relative shadow-xl bg-gradient-to-br from-pink-600 to-orange-600 w-32 h-32 rounded-full p-1">
              <img src="/ambatukam.jpeg" className="rounded-full" alt="" />
              <div className="absolute shadow-xl top-10 left-14 bg-gradient-to-br from-pink-600 to-orange-600 w-36 h-36 rounded-full p-1">
                <img src="/ambatukam-2.jpg" className="rounded-full" alt="" />
              </div>
            </div>
          </div>
          <h1 className="text-white text-5xl font-bold text-center mt-20 pb-10 px-4">
            Jawab satu persatu pertanyaan yang muncul
          </h1>
        </motion.div>
      </div>
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
          <div className="absolute -top-10 -left-20 -rotate-12 bg-white md:w-64 w-32 p-2 rounded-full text-center">
            <p className="font-bold text-lg">Siapa teman baikmu?</p>
          </div>
          <div className="absolute -bottom-10 -left-20 -rotate-12 bg-white md:w-64 w-40 p-2 rounded-full text-center">
            <p className="font-bold text-lg">
              Hal apa yang masih kamu ingat waktu kecil?
            </p>
          </div>
          <div className="absolute -top-10 -right-20 rotate-12 bg-white md:w-64 w-32 p-2 rounded-full text-center">
            <p className="font-bold text-lg">Tipe kamu yang seperti apa?</p>
          </div>
          <div className="absolute -bottom-10 -right-20 rotate-12 bg-white md:w-64 w-40 p-2 rounded-full text-center">
            <p className="font-bold text-lg">Skill apa yang kamu banggakan?</p>
          </div>
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
      <div className="text-white pt-5 bg-black px-4 pb-5 flex justify-between items-center">
        <p className="md:text-3xl text-xl font-bold">Pesan Anonim</p>
        <p className="md:text-2xl text-sm font-semibold">
          Made with nextjs by ikhsan
        </p>
      </div>
    </>
  );
};

export default Home;
