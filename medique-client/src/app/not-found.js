import Link from "next/link";
import React from "react";
import { FiHome, FiSearch, FiArrowRight } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1D2026] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-xl">
        <h1 className="text-[12rem] font-black text-gray-100 dark:text-gray-800/50 leading-none select-none tracking-tighter">404</h1>
        <div className="relative -mt-20">
          <p className="text-[#FF6636] text-sm font-black uppercase tracking-[0.3em] mb-4">Error Page</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1D2026] dark:text-white mb-6 tracking-tight">
            Lost in <span className="text-[#FF6636]">MediQue?</span>
          </h2>
          <p className="text-[#6E7485] dark:text-gray-400 text-lg mb-10 leading-relaxed font-medium">
            We couldn&apos;t find the page you were looking for. The tutor might have changed their schedule or the link is outdated.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto bg-[#1D2026] dark:bg-[#FF6636] hover:bg-[#FF6636] dark:hover:bg-[#e85520] text-white px-8 py-4 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all group"
            >
              <FiHome className="text-base" /> Back to Home
            </Link>
            <Link
              href="/tutors"
              className="w-full sm:w-auto border-2 border-gray-100 dark:border-gray-800 hover:border-[#FF6636] text-[#1D2026] dark:text-white px-8 py-4 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all group"
            >
              Browse Tutors <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;