"use client";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ResetPasswordClient = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.trim() === "") {
      toast.error("Password tidak boleh kosong!");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      if (error) {
        throw new Error(error.message);
      }
      toast.success("Sukses me-reset kata sandi, sekarang login!");
      await supabase.auth.signOut();
      router.push("/login");
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
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const access_token = params.get("access_token");
    if (!access_token) {
      router.push("/forgot-password");
      return;
    }
  }, []);
  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-500 text-white">
      <h1 className="text-4xl text-center font-bold mb-6">
        Buat kata sandi baru
      </h1>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={submit}
      >
        <div className="bg-white/35 text-black font-semibold shadow-xl py-4 w-72 rounded-full">
          <input
            className="outline-none bg-transparent w-full px-6 placeholder-black"
            placeholder="Password..."
            value={password}
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-white/75 mt-5 text-black py-3 min-w-24 flex justify-center items-center rounded-xl hover:bg-white hover:scale-105 transition duration-150 font-semibold"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <div className="loader"></div> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordClient;
