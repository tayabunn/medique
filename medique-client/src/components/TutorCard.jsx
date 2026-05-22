import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMapPin, FiMonitor, FiArrowUpRight } from "react-icons/fi";
import { FaBookOpen } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const TUTOR_PLACEHOLDERS = [
  "https://images.unsplash.com/photo-1544717297-fa154daaf762?w=600&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
];

const getFallbackImage = (id) => {
  if (!id) return TUTOR_PLACEHOLDERS[0];
  const index = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return TUTOR_PLACEHOLDERS[index % TUTOR_PLACEHOLDERS.length];
};

const TutorCard = ({ tutor }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { _id, tutorName, subject, hourlyFee, teachingMode, location, photo, imageUrl } = tutor;
  const fallback = getFallbackImage(_id);
  
  // Handle empty strings or nulls from server
  const initialSrc = (photo && photo.trim() !== "") ? photo : ((imageUrl && imageUrl.trim() !== "") ? imageUrl : fallback);
  
  const [imgSrc, setImgSrc] = React.useState(initialSrc);
  const [hasError, setHasError] = React.useState(false);

  return (
    <div className="bg-(--card-bg) border border-(--card-border) group hover:shadow-lg transition-shadow flex flex-col h-full">
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden shrink-0 bg-gray-100">
        <Image
          src={imgSrc}
          alt={tutorName}
          fill
          unoptimized
          className={`object-cover group-hover:scale-105 transition-transform duration-500 ${hasError ? 'opacity-90' : ''}`}
          onError={() => {
            if (!hasError) {
              setImgSrc(fallback);
              setHasError(true);
            }
          }}
        />
        <div className="absolute top-3 left-3 bg-[#FF6636] px-2.5 py-1 flex items-center gap-1 z-10">
          <FaStar className="text-white text-xs" />
          <span className="text-white text-xs font-bold">4.8</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[#6E7485] text-xs font-semibold mb-2">
          <FaBookOpen className="text-[#FF6636] text-sm" />
          <span>{subject}</span>
        </div>

        <div className="flex justify-between items-start gap-2 mb-3">
          <h2 className="text-base font-bold text-(--card-text) group-hover:text-[#FF6636] transition-colors leading-snug line-clamp-1">{tutorName}</h2>
          <div className="text-right shrink-0">
            <span className="text-base font-bold text-[#FF6636]">${hourlyFee}</span>
            <span className="text-xs text-[#6E7485] block">/hr</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-[#6E7485]">
            <FiMapPin className="text-[#FF6636] shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6E7485]">
            <FiMonitor className="text-[#FF6636] shrink-0" />
            <span>{teachingMode}</span>
          </div>
        </div>

        <button
          onClick={() => {
            if (!session) {
              router.push("/signin");
            } else {
              router.push(`/tutors/${_id}`);
            }
          }}
          className="mt-auto w-full flex items-center justify-center gap-2 bg-[#FF6636] text-white text-sm font-bold py-3 hover:bg-[#1D2026] transition-colors"
        >
          Book Session <FiArrowUpRight className="text-base" />
        </button>
      </div>
    </div>
  );
};

export default TutorCard;
