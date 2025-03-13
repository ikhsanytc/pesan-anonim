"use client";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const ClientPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [continueForm, setContinueForm] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!continueForm) {
      setIsLoadingEmail(true);
      setTimeout(() => {
        setIsLoadingEmail(false);
        if (email.trim() === "") {
          toast.error("Email tidak boleh kosong");
          return;
        }
        setContinueForm(true);
      }, 2000);
      return;
    }
    setIsloading(true);
    if (password.trim() === "") {
      toast.error("Password tidak boleh kosong");
      setIsloading(false);
      return;
    }
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.message);
        setIsloading(false);
        return;
      }
      router.push("/home");
      toast.success("Welcome back!");
    } catch (e) {
      console.error(e);
      toast.error("Terjadi kesalahan");
    }
  };
  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-500 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div
          onClick={() => router.back()}
          className="absolute top-5 left-5 cursor-pointer hover:scale-110 transition duration-150 -translate-y-1"
        >
          <ArrowLeftIcon className="w-6" />
        </div>
        <h1 className="text-4xl text-center font-bold mb-6">Login ke akunmu</h1>
        <form onSubmit={submit}>
          <div className="bg-white/35 backdrop-filter backdrop-blur text-black font-semibold shadow-xl py-4 px-6 rounded-full flex gap-1 items-center">
            <input
              className="outline-none bg-transparent w-full placeholder-black"
              placeholder="Email..."
              value={email}
              required
              type="email"
              readOnly={isLoadingEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isLoadingEmail && <div className="loader"></div>}
          </div>
          {!continueForm && (
            <Link href="/forgot-password" className="text-sm pl-1 pt-2 ">
              Lupa kata sandi?
            </Link>
          )}

          {continueForm ? (
            <div className="flex flex-col mt-5">
              <div className="bg-white/35 backdrop-filter backdrop-blur text-black font-semibold shadow-xl py-4 px-6 rounded-full flex gap-1 items-center">
                <input
                  className="outline-none bg-transparent w-full placeholder-black"
                  placeholder="Password..."
                  value={password}
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* {isLoadingEmail && <div className="loader"></div>} */}
              </div>
              <Link href="/forgot-password" className="text-sm pl-1 pt-1">
                Lupa kata sandi?
              </Link>
              <button
                className="bg-white/75 mt-5 text-black py-3 min-w-24 flex justify-center items-center rounded-xl shadow-xl hover:scale-105 transition duration-150 hover:bg-white font-semibold"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <div className="loader"></div> : "Submit"}
              </button>
            </div>
          ) : null}
        </form>
      </motion.div>
    </div>
  );
};

export default ClientPage;
