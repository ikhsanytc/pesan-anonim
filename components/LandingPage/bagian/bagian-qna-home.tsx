import { AnimatePresence } from "motion/react";
import { Dispatch, FC, SetStateAction } from "react";
import PesanLayang from "../pesan-layang";

type BagianQnaHomeProps = {
  question: number;
  setQuestion: Dispatch<SetStateAction<number>>;
};

const BagianQnaHome: FC<BagianQnaHomeProps> = ({ setQuestion, question }) => {
  return (
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
              <PesanLayang type="layang-1">Apa cita cita kamu?</PesanLayang>
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
              <PesanLayang type="layang-1">Harta, Tahta, Wanita!</PesanLayang>
              <PesanLayang type="layang-2">
                Kamu cantik, soft spoken, mengagumkan.
              </PesanLayang>
              <PesanLayang type="layang-3">Lu jelek, burik, dekil!</PesanLayang>
              <PesanLayang type="layang-4">
                Tolong, maaf, terima kasih.
              </PesanLayang>
            </>
          ) : null}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default BagianQnaHome;
