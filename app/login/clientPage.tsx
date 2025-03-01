"use client";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

const ClientPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [continueForm, setContinueForm] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
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
    if (password.trim() === "") {
      toast.error("Password tidak boleh kosong");
      return;
    }
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
      return;
    }
    router.push("/home");
    toast.success("Welcome back!");
  };
  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl text-center font-bold mb-6">Login ke akunmu</h1>
      <form onSubmit={submit}>
        <div className="bg-gray-800 shadow-xl py-4 px-6 rounded-full flex items-center">
          <input
            className="outline-none bg-transparent"
            placeholder="Email..."
            value={email}
            type="email"
            readOnly={isLoadingEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isLoadingEmail && <div className="loader"></div>}
        </div>
        {continueForm ? (
          <div className="flex flex-col justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-800 mt-5 shadow-xl py-4 px-6 rounded-full flex items-center"
            >
              <input
                className="outline-none bg-transparent"
                placeholder="Password..."
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </motion.div>
            <button
              className="bg-blue-500 mt-5 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
              type="submit"
            >
              Submit
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default ClientPage;
