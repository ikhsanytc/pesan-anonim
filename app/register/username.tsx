"use client";
import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion"; // Pastikan ini benar
import { toast } from "react-toastify";

type UsernameProps = {
  setCurrentPage: Dispatch<SetStateAction<string>>;
};

const Username: FC<UsernameProps> = ({ setCurrentPage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const continueForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isContinue) {
      submit();
      return;
    }

    if (username.trim() === "") {
      toast.error("Username tidak boleh kosong!");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsContinue(true);
    }, 2000);
  };

  const submit = () => {
    if (email.trim() === "") {
      toast.error("Email tidak boleh kosong!");
      return;
    }
    if (password.trim() === "") {
      toast.error("Password tidak boleh kosong!");
      return;
    }
    localStorage.setItem(
      "inforUsername",
      JSON.stringify({
        username: username,
        email: email,
        password: password,
      })
    );
    toast.success("Ok, next avatar!");
    setCurrentPage("avatar");
  };

  useEffect(() => {
    const inforAge = JSON.parse(localStorage.getItem("inforAge") as string);
    const inforUsername = JSON.parse(
      localStorage.getItem("inforUsername") as string
    );
    if (!inforAge) {
      toast.error("Masukkan usia terlebih dahulu!");
      setCurrentPage("age");
    }
    if (inforUsername) {
      setCurrentPage("avatar");
    }
  }, [setCurrentPage]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      key="usernamePage"
      className="flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl text-center font-bold mb-6">
        Tentukan {isContinue ? "email dan password" : "username"}
      </h1>
      <form
        onSubmit={continueForm}
        className="flex flex-col items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {!isContinue ? (
            <motion.div
              key="usernameInput"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/35 backdrop-filter backdrop-blur text-black font-semibold shadow-xl py-4 px-6 rounded-full flex items-center"
            >
              <p>@</p>
              <input
                className="outline-none bg-transparent placeholder-black"
                placeholder="Name..."
                value={username}
                required
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </motion.div>
          ) : (
            <>
              <motion.div
                key="emailInput"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white/35 backdrop-filter backdrop-blur text-black font-semibold shadow-xl py-4 px-6 rounded-full flex items-center"
              >
                <input
                  className="placeholder-black outline-none bg-transparent"
                  placeholder="Email..."
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </motion.div>
              <motion.div
                key="passwordInput"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white/35 backdrop-filter backdrop-blur font-semibold text-black shadow-xl py-4 px-6 rounded-full flex items-center mt-4"
              >
                <input
                  className="outline-none bg-transparent placeholder-black"
                  placeholder="Password..."
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-white/75 relative flex justify-center items-center text-black font-semibold hover:scale-105 transition duration-150 py-2 px-6 rounded-lg hover:bg-white mt-10"
        >
          {isLoading ? (
            <div className="absolute h-full p-4 rounded-lg bg-opacity-5 backdrop-filter backdrop-blur w-full flex justify-center items-center">
              <div className="loader"></div>
            </div>
          ) : null}
          {isContinue ? "Submit" : "Continue"}
        </button>
      </form>
    </motion.div>
  );
};

export default Username;
