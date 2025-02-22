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
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
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
  );
};

export default ClientPage;
