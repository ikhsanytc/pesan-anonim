"use client";
import { checkEmailAndUsername } from "@/utils/supabase/server";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

type ProsesProps = {
  setCurrentPage: Dispatch<SetStateAction<string>>;
};

const Proses: FC<ProsesProps> = ({ setCurrentPage }) => {
  const router = useRouter();
  const [conditionLoading, setConditionLoading] = useState("Mengecek input...");
  useEffect(() => {
    const inforAge = JSON.parse(localStorage.getItem("inforAge") as string);
    const inforUsername = JSON.parse(
      localStorage.getItem("inforUsername") as string
    );
    const inforAvatar = JSON.parse(
      localStorage.getItem("inforAvatar") as string
    );
    if (!inforAge) {
      setCurrentPage("age");
      return;
    }
    if (!inforUsername) {
      setCurrentPage("username");
      return;
    }
    if (!inforAvatar) {
      setCurrentPage("avatar");
      return;
    }
    setTimeout(async () => {
      try {
        const res = await checkEmailAndUsername(
          inforUsername.email,
          inforUsername.username
        );
        setConditionLoading("Mengecek email dan username...");
        if (res) {
          toast.error("Email atau username sudah terdaftar!");
          localStorage.removeItem("inforUsername");
          router.refresh();
          setCurrentPage("username");
          return;
        }
      } catch (e) {
        toast.error("Terjadi kesalahan!");
        router.refresh();
        localStorage.removeItem("inforAge");
        localStorage.removeItem("inforAvatar");
        localStorage.removeItem("inforUsername");
        setCurrentPage("age");
        return;
      }
      setTimeout(async () => {
        setConditionLoading("Membuat akun...");
        const res = await fetch("/api/create_user", {
          method: "POST",
          body: JSON.stringify({
            username: inforUsername.username,
            email: inforUsername.email,
            password: inforUsername.password,
            age: inforAge.age,
            month: inforAge.month,
            year: inforAge.year,
            avatar: inforAvatar.avatar,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        localStorage.removeItem("inforAge");
        localStorage.removeItem("inforUsername");
        localStorage.removeItem("inforAvatar");
        if (data.error) {
          toast.error(data.message);
          router.refresh();
          setCurrentPage("age");
          return;
        }
        setTimeout(() => {
          toast.success(
            "Berhasil, selamat datang " + inforUsername.username + "!"
          );
          router.push("/home");
        }, 3000);
      }, 1000);
    }, 1000);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      key="prosesPage"
      className="flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl text-center font-bold mb-1">
        Sedang diproses...
      </h1>
      <p className="text-xl text-center font-light mb-6">
        Anda akan ke redirect saat sudah selesai.
      </p>
      <div className="loaderNormal"></div>
      <div className="flex mt-2 flex-col gap-4 items-center justify-center">
        <div className="flex gap-2 items-center">
          <p>{conditionLoading}</p>
        </div>
      </div>
    </motion.div>
  );
};
export default Proses;
