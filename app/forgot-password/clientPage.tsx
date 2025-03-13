"use client";
import { supabase } from "@/utils/supabase/client";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const ForgotPasswordClient = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === "") {
      toast.error("Email tidak boleh kosong!");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
      });
      if (error) {
        throw new Error(error.message);
      }
      setIsLoading(false);
      toast.success("Email recovery terkirim, silahkan cek email anda!");
      setEmail("");
    } catch (e: any) {
      setIsLoading(false);
      console.error(e);
      if (e.message) {
        toast.error(e.message);
        return;
      }
      toast.error("Kesalahan terjadi!");
    }
  };
  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-500 text-white">
      <div
        onClick={() => router.back()}
        className="absolute top-5 left-5 cursor-pointer hover:scale-110 transition duration-150 -translate-y-1"
      >
        <ArrowLeftIcon className="w-6" />
      </div>
      <h1 className="text-4xl text-center font-bold mb-6">Lupa kata sandi</h1>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={submit}
      >
        <div className="bg-white/35 text-black font-semibold shadow-xl py-4 w-72 rounded-full">
          <input
            className="outline-none bg-transparent w-full px-6 placeholder-black"
            placeholder="Email..."
            value={email}
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="bg-white/75 mt-5 text-black hover:scale-105 transition duration-150 py-3 min-w-24 flex justify-center items-center rounded-xl hover:bg-white font-semibold"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <div className="loader"></div> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordClient;
