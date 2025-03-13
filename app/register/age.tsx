"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import Link from "next/link";

type AgeProps = {
  setCurrentPage: Dispatch<SetStateAction<string>>;
};

const Age: React.FC<AgeProps> = ({ setCurrentPage }) => {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years: number[] = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
  );

  const [selectedMonth, setSelectedMonth] = useState<string>(months[0]);
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const [isLoading, setIsLoading] = useState(false);

  const calculateAge = (year: number, month: string): number => {
    const birthDate = new Date(year, months.indexOf(month), 1);
    const ageDiff = new Date().getTime() - birthDate.getTime();
    return Math.floor(ageDiff / (365.25 * 24 * 60 * 60 * 1000)); // Convert ms to years
  };
  const submit = () => {
    setIsLoading(true);
    const age = calculateAge(selectedYear, selectedMonth);
    if (age === 0) {
      toast.error("Masa umurnya 0?");
      setIsLoading(false);
      return;
    }
    if (age < 0) {
      toast.error("Umur tidak boleh negatif!");
      setIsLoading(false);
      return;
    }
    localStorage.setItem(
      "inforAge",
      JSON.stringify({
        age: age,
        month: selectedMonth,
        year: selectedYear,
      })
    );
    toast.success("Oke!");
    setCurrentPage("username");
  };
  useEffect(() => {
    const inforAge = JSON.parse(localStorage.getItem("inforAge") as string);
    if (inforAge) {
      setCurrentPage("username");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      key="age"
      className="flex flex-col items-center justify-center "
    >
      <h1 className="text-4xl text-center font-bold mb-6">Tentukan umur mu</h1>
      <div className="flex gap-4 mb-6">
        {/* Month Picker */}
        <select
          className="p-3 bg-white/35 backdrop-filter backdrop-blur text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          value={selectedMonth}
          disabled={isLoading}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>

        {/* Year Picker */}
        <select
          className="p-3 bg-white/35 backdrop-filter backdrop-blur rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          value={selectedYear}
          disabled={isLoading}
          onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
        >
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <p className="text-lg font-semibold mb-6">
        {calculateAge(selectedYear, selectedMonth)} years old
      </p>

      <button
        onClick={submit}
        disabled={isLoading}
        className="bg-white/75 text-black font-semibold shadow-xl hover:scale-105 transition duration-150 py-2 px-6 rounded-lg hover:bg-white"
      >
        Continue
      </button>
      <p className="mb-5 mt-5 font-semibold">Or</p>
      <Link
        className="bg-white/75 hover:scale-105 transition duration-150 shadow-xl text-black py-2 px-6 rounded-lg hover:bg-white font-semibold"
        href="/login"
      >
        Login
      </Link>

      <p className="text-xs mt-4 px-10">
        By continuing, you agree to our{" "}
        <a href="#" className="text-blue-500 underline">
          Terms of Use
        </a>{" "}
        and have read and agreed to our{" "}
        <a href="#" className="text-blue-500 underline">
          Privacy Policy
        </a>
        .
      </p>
    </motion.div>
  );
};

export default Age;
