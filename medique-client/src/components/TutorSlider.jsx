"use client";
import React, { useState } from "react";
import { FiBookOpen, FiClock, FiArrowRight, FiArrowLeft, FiMapPin, FiMonitor } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const TutorSlider = ({ tutors }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!tutors || tutors.length === 0) return null;

  const totalTutors = tutors.length;
  const visibleSlides = 3;
  const maxIndex = Math.max(0, totalTutors - visibleSlides);

  const nextSlide = () => {
    if (currentIndex < maxIndex) setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-20 px-4 md:px-8">
      <div className="w-[85%] max-w-[1920px] mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[#FF6636] text-sm font-bold uppercase tracking-widest mb-2">Featured Tutors</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D2026] dark:text-white">
              Best Tutors For You
            </h2>
          </div>
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 border border-[#FF6636] text-[#FF6636] text-sm font-bold px-5 py-2.5 hover:bg-[#FF6636] hover:text-white transition-colors shrink-0"
          >
            See All Tutors <FiArrowRight className="text-base" />
          </Link>
        </div>

        {/* Cards */}
        <div className="relative overflow-hidden w-full">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides + 1.5)}%)` }}
          >
            {tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 bg-white dark:bg-[#1D2026] border border-gray-100 dark:border-gray-700 group hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={tutor.photo || tutor.imageUrl || "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80"}
                    alt={tutor.tutorName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#FF6636] px-2 py-1 flex items-center gap-1">
                    <FaStar className="text-white text-xs" />
                    <span className="text-white text-xs font-bold">4.8</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[#6E7485] dark:text-gray-400 text-xs font-semibold mb-2">
                    <FiBookOpen className="text-[#FF6636]" />
                    <span>{tutor.subject}</span>
                  </div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <h3 className="text-base font-bold text-[#1D2026] dark:text-white leading-snug group-hover:text-[#FF6636] transition-colors">
                      {tutor.tutorName}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="text-base font-bold text-[#FF6636]">${tutor.hourlyFee}</span>
                      <span className="text-xs text-[#6E7485] dark:text-gray-400 block">/hr</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-[#6E7485] dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><FiMapPin className="text-[#FF6636]" />{tutor.location}</span>
                    <span className="flex items-center gap-1"><FiClock className="text-[#FF6636]" />{tutor.availableDays}</span>
                    <span className="flex items-center gap-1"><FiMonitor className="text-[#FF6636]" />{tutor.teachingMode}</span>
                  </div>
                  <Link
                    href={`/tutors/${tutor._id}`}
                    className="w-full flex items-center justify-center gap-2 bg-[#1D2026] dark:bg-white text-white dark:text-[#1D2026] text-sm font-bold py-2.5 hover:bg-[#FF6636] dark:hover:bg-[#FF6636] dark:hover:text-white transition-colors"
                  >
                    Book Session <FiArrowRight className="text-base" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-[#6E7485] dark:text-gray-400 font-semibold">
            {currentIndex + 1} / {maxIndex + 1}
          </span>
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`w-10 h-10 border flex items-center justify-center text-[#4E5566] dark:text-gray-300 transition-colors ${
                currentIndex === 0
                  ? "border-gray-200 dark:border-gray-700 opacity-40 cursor-not-allowed"
                  : "border-gray-300 dark:border-gray-600 hover:border-[#FF6636] hover:text-[#FF6636]"
              }`}
            >
              <FiArrowLeft className="text-base" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className={`w-10 h-10 border flex items-center justify-center text-[#4E5566] dark:text-gray-300 transition-colors ${
                currentIndex === maxIndex
                  ? "border-gray-200 dark:border-gray-700 opacity-40 cursor-not-allowed"
                  : "border-gray-300 dark:border-gray-600 hover:border-[#FF6636] hover:text-[#FF6636]"
              }`}
            >
              <FiArrowRight className="text-base" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TutorSlider;
