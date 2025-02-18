import { AnimatePresence } from "motion/react";
import React, { Dispatch, FC, SetStateAction } from "react";
import PesanLayangMobile from "../pesan-layang-mobile";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

type BagianQnAHomeMobileProps = {
  question: number;
  setQuestion: Dispatch<SetStateAction<number>>;
};

const BagianQnAHomeMobile: FC<BagianQnAHomeMobileProps> = ({
  question,
  setQuestion,
}) => {
  return (
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
                <PesanLayangMobile>Aku lagi suka seseorang!</PesanLayangMobile>
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
                <PesanLayangMobile>Harta, Tahta, Wanita!</PesanLayangMobile>
                <PesanLayangMobile>
                  Kamu cantik, soft spoken, mengagumkan.
                </PesanLayangMobile>
                <PesanLayangMobile>Lu jelek, burik, dekil!</PesanLayangMobile>
                <PesanLayangMobile>
                  Tolong, maaf, terima kasih.
                </PesanLayangMobile>
              </>
            ) : null}
          </div>
          <div className="flex gap-3 items-center">
            <ArrowLeftIcon
              className="w-10 cursor-pointer"
              onClick={() => {
                if (question === 1) {
                  setQuestion(3);
                  return;
                }
                setQuestion(question - 1);
              }}
            />
            <p className="text-lg min-w-44 text-center font-semibold">
              {question === 1
                ? "Tanyakan saya apapun"
                : question === 2
                ? "Confession"
                : question === 3
                ? "3 Kata"
                : ""}
            </p>
            <ArrowRightIcon
              className="w-10 cursor-pointer"
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
  );
};

export default BagianQnAHomeMobile;
