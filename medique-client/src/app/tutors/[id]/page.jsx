import React from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { HiArrowNarrowLeft, HiCheck } from "react-icons/hi";
import { FiBookOpen, FiMapPin, FiMonitor, FiClock, FiUser, FiAward } from "react-icons/fi";
import { FaStar as FaStarSolid } from "react-icons/fa";
import BookSessionCard from "@/components/BookSessionCard";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return { 
    title: `Tutor Profile — MediQue`,
    description: "Book a session with our expert tutor"
  };
}

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://medique-server.vercel.app";
  const fetchOptions = {
    next: { revalidate: 60 }
  };
  
  if (token) {
    fetchOptions.headers = { authorization: `Bearer ${token}` };
  }

  const res = await fetch(`${apiUrl}/tutors/${id}`, fetchOptions);
  const tutor = await res.json();

  if (!res.ok) {
    if (res.status === 401) {
      redirect("/signin");
    }
    throw new Error(tutor?.error || "Tutor not found");
  }
  
  if (!tutor || tutor.error) {
    throw new Error(tutor?.error || "Tutor not found");
  }

  const {
    tutorName, photo, imageUrl, subject, hourlyFee, totalSlot,
    sessionStartDate, institution, experience, location,
    teachingMode, availableDays, availableTimeSlot, description, rating, reviews
  } = tutor;

  const imgSrc = photo || imageUrl || "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=80";

  return (
    <div className="min-h-screen bg-white dark:bg-[#1D2026]">
      {/* Header Banner */}
      <div className="bg-[#1D2026] pt-32 pb-20 px-4 md:px-0">
        <div className="w-[85%] max-w-[1920px] mx-auto">
          {/* Back Button */}
          <Link 
            href="/tutors" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FF6636] transition-colors mb-8 text-sm font-bold uppercase tracking-widest"
          >
            <HiArrowNarrowLeft className="text-lg" />
            Back to Tutors
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
             {/* Thumbnail */}
             <div className="relative w-40 h-40 md:w-56 md:h-56 shrink-0 border-4 border-white/10">
                <Image src={imgSrc} alt={tutorName} fill className="object-cover" />
             </div>

             <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                   <div className="flex items-center gap-1.5 bg-[#FF6636]/10 text-[#FF6636] px-3 py-1 text-xs font-bold uppercase tracking-tighter">
                      <FaStarSolid /> {rating || 4.8} ({reviews || 128} reviews)
                   </div>
                   <div className="flex items-center gap-1.5 bg-white/10 text-white px-3 py-1 text-xs font-bold uppercase tracking-tighter">
                      <FiBookOpen /> {subject}
                   </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
                  {tutorName}
                </h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-400 text-sm">
                   <div className="flex items-center gap-2">
                      <FiMapPin className="text-[#FF6636]" />
                      <span>{location}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <FiUser className="text-[#FF6636]" />
                      <span>{experience} Experience</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <FiMonitor className="text-[#FF6636]" />
                      <span>{teachingMode}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-[85%] max-w-[1920px] mx-auto px-4 md:px-0 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2">
            
            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#1D2026] dark:text-white mb-6 border-l-4 border-[#FF6636] pl-4 uppercase tracking-tight">Introduction</h2>
              <p className="text-[#6E7485] dark:text-gray-400 text-lg leading-relaxed">
                {description || `${tutorName} is a dedicated educator specializing in ${subject} with ${experience} of experience. Passionate about making complex topics simple and accessible for every student.`}
              </p>
            </div>

            {/* Teaching Focus */}
            <div className="mb-12">
               <h2 className="text-2xl font-bold text-[#1D2026] dark:text-white mb-6 border-l-4 border-[#FF6636] pl-4 uppercase tracking-tight">What You Will Learn</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Structured curriculum tailored to your level",
                  "Interactive problem-solving sessions",
                  "Regular progress assessments and feedback",
                  "Study materials and practice resources",
                  "Exam preparation and revision techniques",
                  "One-on-one personalized attention",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-5 border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/20 group hover:border-[#FF6636] transition-colors">
                    <HiCheck className="text-[#FF6636] text-xl mt-0.5 shrink-0" />
                    <span className="text-[#1D2026] dark:text-gray-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <h2 className="text-2xl font-bold text-[#1D2026] dark:text-white mb-6 border-l-4 border-[#FF6636] pl-4 uppercase tracking-tight">Education & Schedule</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: FiAward, label: "Institution", value: institution || "N/A" },
                  { icon: FiClock, label: "Available Days", value: availableDays || "Flexible" },
                  { icon: FiClock, label: "Time Slot", value: availableTimeSlot || "By arrangement" },
                  { icon: FiBookOpen, label: "Subject Area", value: subject },
                ].map((detail, idx) => (
                  <div key={idx} className="flex border border-gray-100 dark:border-gray-800 p-6">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 mr-4">
                      <detail.icon className="text-[#FF6636] text-xl" />
                    </div>
                    <div>
                      <p className="text-[#6E7485] dark:text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{detail.label}</p>
                      <p className="text-[#1D2026] dark:text-white font-bold">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:sticky lg:top-32 h-fit">
            <BookSessionCard tutor={tutor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsPage;