"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiArrowRight, FiArrowLeft, FiUsers, FiBook, FiAward } from "react-icons/fi";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80",
    tag: "Online Learning",
    heading: "Learn From Expert Tutors Anytime, Anywhere",
    subtext: "Connect with verified tutors across Mathematics, Physics, Chemistry and more. Book a session in minutes.",
    cta: "Find a Tutor",
    stats: [
      { icon: FiUsers, value: "67.1k+", label: "Students" },
      { icon: FiBook, value: "26k+", label: "Sessions" },
      { icon: FiAward, value: "99.9%", label: "Success Rate" },
    ],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=900&q=80",
    tag: "Flexible Learning",
    heading: "Book Sessions That Fit Your Schedule",
    subtext: "Flexible time slots and online / offline modes — study the way that works best for you.",
    cta: "Browse Tutors",
    stats: [
      { icon: FiUsers, value: "500+", label: "Expert Tutors" },
      { icon: FiBook, value: "50+", label: "Subjects" },
      { icon: FiAward, value: "4.9★", label: "Avg Rating" },
    ],
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80",
    tag: "Smart Dashboard",
    heading: "Manage Your Learning Journey Effortlessly",
    subtext: "Track booked sessions, session tokens and tutor details all in one organized dashboard.",
    cta: "Get Started",
    stats: [
      { icon: FiUsers, value: "12k+", label: "Tutors Listed" },
      { icon: FiBook, value: "100k+", label: "Lessons Done" },
      { icon: FiAward, value: "Top Rated", label: "Platform" },
    ],
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="bg-[#FFEEE8] dark:bg-[#1D2026] overflow-hidden">
      <div className="w-[85%] max-w-[1920px] mx-auto px-4 md:px-8 py-12 md:py-0">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[480px]">

          {/* Left Content */}
          <div className="flex-1 py-8 md:py-16">
            <span className="inline-block bg-white dark:bg-gray-800 text-[#FF6636] text-xs font-bold uppercase tracking-widest px-3 py-1.5 mb-6">
              {slide.tag}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-[#1D2026] dark:text-white leading-tight mb-5">
              {slide.heading}
            </h1>
            <p className="text-[#6E7485] dark:text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              {slide.subtext}
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/tutors"
                className="flex items-center gap-2 bg-[#FF6636] text-white text-sm font-bold px-6 py-3.5 hover:bg-[#e85520] transition-colors"
              >
                {slide.cta} <FiArrowRight className="text-base" />
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-2 border border-[#1D2026] dark:border-gray-400 text-[#1D2026] dark:text-white text-sm font-bold px-6 py-3.5 hover:bg-[#1D2026] hover:text-white dark:hover:bg-white dark:hover:text-[#1D2026] transition-colors"
              >
                Register Free
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              {slide.stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FF6636] flex items-center justify-center shrink-0">
                    <Icon className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-[#1D2026] dark:text-white leading-none">{value}</p>
                    <p className="text-xs text-[#6E7485] dark:text-gray-400 mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full md:w-[420px] lg:w-[480px] shrink-0">
            <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-200">
              <Image
                key={slide.id}
                src={slide.image}
                alt={slide.heading}
                fill
                className="object-cover transition-opacity duration-700"
                priority
              />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white dark:bg-[#1D2026] shadow-lg px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FF6636] flex items-center justify-center shrink-0">
                  <FiAward className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1D2026] dark:text-white">Top Rated Platform</p>
                  <p className="text-[11px] text-[#6E7485] dark:text-gray-400">Trusted by 67k+ students</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="flex items-center gap-4 pb-8">
          <button onClick={prev} className="w-10 h-10 border border-gray-300 dark:border-gray-600 flex items-center justify-center text-[#4E5566] dark:text-gray-300 hover:border-[#FF6636] hover:text-[#FF6636] transition-colors" aria-label="Previous">
            <FiArrowLeft className="text-base" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 transition-all duration-300 ${i === current ? "w-8 bg-[#FF6636]" : "w-4 bg-gray-300 dark:bg-gray-600"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 border border-gray-300 dark:border-gray-600 flex items-center justify-center text-[#4E5566] dark:text-gray-300 hover:border-[#FF6636] hover:text-[#FF6636] transition-colors" aria-label="Next">
            <FiArrowRight className="text-base" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;