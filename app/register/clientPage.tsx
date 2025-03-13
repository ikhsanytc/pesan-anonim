"use client";
import { AnimatePresence } from "motion/react";
import React, { useState } from "react";
import Age from "./age";
import Username from "./username";
import Avatar from "./avatar";
import Proses from "./proses";

const ClientPage = () => {
  const [currentPage, setCurrentPage] = useState("age");
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-indigo-600 text-white">
      <div className="z-50">
        <AnimatePresence mode="wait">
          {currentPage === "age" ? (
            <Age setCurrentPage={setCurrentPage} />
          ) : currentPage === "username" ? (
            <Username setCurrentPage={setCurrentPage} />
          ) : currentPage === "avatar" ? (
            <Avatar setCurrentPage={setCurrentPage} />
          ) : currentPage === "proses" ? (
            <Proses setCurrentPage={setCurrentPage} />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ClientPage;
