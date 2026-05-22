import React from "react";
import {
  FiCode, FiBook, FiCamera, FiMusic, FiBarChart2,
  FiGlobe, FiFeather, FiCpu, FiArrowRight
} from "react-icons/fi";
import Link from "next/link";

const categories = [
  { icon: FiCode, name: "Computer Science", count: "120+ Tutors", bg: "bg-[#FFEEE8]", iconColor: "text-[#FF6636]", iconBg: "bg-[#FF6636]/10" },
  { icon: FiBarChart2, name: "Mathematics", count: "95+ Tutors", bg: "bg-[#E8F8FF]", iconColor: "text-[#1E90FF]", iconBg: "bg-[#1E90FF]/10" },
  { icon: FiBook, name: "Physics", count: "78+ Tutors", bg: "bg-[#FFF7E6]", iconColor: "text-[#FFB340]", iconBg: "bg-[#FFB340]/10" },
  { icon: FiGlobe, name: "Languages", count: "60+ Tutors", bg: "bg-[#EEFFF4]", iconColor: "text-[#23C16B]", iconBg: "bg-[#23C16B]/10" },
  { icon: FiCamera, name: "Photography", count: "45+ Tutors", bg: "bg-[#F3ECFF]", iconColor: "text-[#8B5CF6]", iconBg: "bg-[#8B5CF6]/10" },
  { icon: FiMusic, name: "Music", count: "55+ Tutors", bg: "bg-[#FFF0F5]", iconColor: "text-[#FF4D8D]", iconBg: "bg-[#FF4D8D]/10" },
  { icon: FiFeather, name: "Literature", count: "40+ Tutors", bg: "bg-[#F0F4FF]", iconColor: "text-[#3B82F6]", iconBg: "bg-[#3B82F6]/10" },
  { icon: FiCpu, name: "Engineering", count: "88+ Tutors", bg: "bg-[#F5FFF0]", iconColor: "text-[#6CC200]", iconBg: "bg-[#6CC200]/10" },
];

const TopCategories = () => {
  return (
    <section className="bg-[#F5F7FA] dark:bg-[#1D2026] py-20 px-4 md:px-8">
      <div className="w-[85%] max-w-[1920px] mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#FF6636] text-sm font-bold uppercase tracking-widest mb-2">Browse Categories</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D2026] dark:text-white">
            Browse Top Categories
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map(({ icon: Icon, name, count, bg, iconColor, iconBg }) => (
            <Link
              href="/tutors"
              key={name}
              className={`${bg} dark:bg-gray-800 flex items-center gap-4 px-4 py-5 group hover:shadow-md transition-shadow`}
            >
              <div className={`w-12 h-12 ${iconBg} flex items-center justify-center shrink-0`}>
                <Icon className={`${iconColor} text-xl`} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1D2026] dark:text-white group-hover:text-[#FF6636] transition-colors">{name}</p>
                <p className="text-xs text-[#6E7485] dark:text-gray-400 mt-0.5">{count}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 text-[#FF6636] text-sm font-bold hover:underline transition-colors"
          >
            Browse All Categories <FiArrowRight className="text-base" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
