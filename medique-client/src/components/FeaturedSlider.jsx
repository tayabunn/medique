"use client";
import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FiMapPin, FiCalendar, FiArrowRight, FiArrowLeft, FiArrowUpRight, FiBookOpen, FiMonitor } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

const FeaturedSlider = ({ tutors }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleSlides = 3; 

  if (!tutors || tutors.length === 0) return null;

  const totalTutors = tutors.length;
  const maxIndex = Math.max(0, totalTutors - visibleSlides);

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <section className="bg-white font-outfit py-20 pb-24 text-zinc-800 border-t border-zinc-100">
      <div className="w-[85%] max-w-[1920px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D2026] dark:text-white tracking-tight uppercase">
              Featured Tutors
            </h2>
            <p className="text-[#6E7485] dark:text-gray-400 mt-3 text-lg font-medium">
              Handpicked experts for your educational journey
            </p>
          </div>
          <Link href="/tutors">
            <Button
              variant="bordered"
              className="border border-[#FF6636] text-[#FF6636] hover:bg-[#FF6636] hover:text-white font-bold px-6 py-5 rounded-none flex items-center gap-2 transition-all text-sm uppercase tracking-wider"
            >
              All Tutors <FiArrowRight className="text-base" />
            </Button>
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden w-full">
          <div 
            className="flex gap-8 transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleSlides + 1.2)}%)` 
            }}
          >
            {tutors.map((tutor) => {
              return (
                <div 
                  key={tutor._id}
                  className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] shrink-0 flex flex-col bg-white dark:bg-[#1D2026] border border-gray-100 dark:border-gray-700 group hover:border-[#FF6636] transition-all"
                >
                  {/* Card Image Area */}
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={tutor.photo || tutor.imageUrl || "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80"}
                      alt={tutor.tutorName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white dark:bg-[#1D2026] px-3 py-1.5 text-xs font-bold text-[#1D2026] dark:text-white flex items-center gap-1.5 shadow-sm border border-[#FF6636]">
                      <span className="font-bold">4.8</span>
                      <AiFillStar className="text-amber-400 text-sm" />
                    </div>
                  </div>

                  {/* Card Info Area */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      {/* Subject Row */}
                      <div className="flex items-center gap-1 text-[#6E7485] dark:text-gray-400 text-sm font-bold uppercase tracking-tighter mb-2">
                        <FiBookOpen className="text-[#FF6636]" />
                        <span>{tutor.subject}</span>
                      </div>

                      {/* Name & Fee Row */}
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <h3 className="text-xl font-bold text-[#1D2026] dark:text-white leading-snug group-hover:text-[#FF6636] transition-colors">
                          {tutor.tutorName}
                        </h3>
                        <div className="text-right">
                          <span className="text-xl font-bold text-[#FF6636]">${tutor.hourlyFee}</span>
                          <span className="text-xs text-[#6E7485] font-bold block uppercase">/hr</span>
                        </div>
                      </div>

                      {/* Location & Mode */}
                      <div className="flex items-center gap-4 text-[#6E7485] dark:text-gray-400 text-xs font-semibold mb-5">
                        <span className="flex items-center gap-1"><FiMapPin className="text-[#FF6636]" /> {tutor.location}</span>
                        <span className="flex items-center gap-1"><FiMonitor className="text-[#FF6636]" /> {tutor.teachingMode}</span>
                      </div>
                    </div>

                    {/* Action Link */}
                    <Link href={`/tutors/${tutor._id}`} className="w-full flex items-center justify-center gap-2 bg-[#1D2026] dark:bg-white text-white dark:text-[#1D2026] text-sm font-bold py-3 hover:bg-[#FF6636] dark:hover:bg-[#FF6636] dark:hover:text-white transition-colors">
                      Book Session <FiArrowUpRight className="text-base font-bold" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Footer & Controls */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-zinc-100">
          {/* Pagination Counter */}
          <div className="text-2xl font-semibold text-zinc-900 tracking-tight">
            <span>{currentIndex + 1}</span>
            <span className="text-zinc-300 mx-1">/</span>
            <span className="text-zinc-400">{maxIndex + 1}</span>
          </div>

          {/* Nav Buttons */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`w-12 h-12 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#1D2026] dark:text-white transition-all ${
                currentIndex === 0 
                  ? "opacity-40 cursor-not-allowed" 
                  : "hover:border-[#FF6636] hover:text-[#FF6636] bg-white dark:bg-[#1D2026] active:scale-95"
              }`}
            >
              <FiArrowLeft className="text-lg" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className={`w-12 h-12 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#1D2026] dark:text-white transition-all ${
                currentIndex === maxIndex 
                  ? "opacity-40 cursor-not-allowed" 
                  : "hover:border-[#FF6636] hover:text-[#FF6636] bg-white dark:bg-[#1D2026] active:scale-95"
              }`}
            >
              <FiArrowRight className="text-lg" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedSlider;
