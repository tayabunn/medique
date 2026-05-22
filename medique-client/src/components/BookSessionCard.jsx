"use client";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { HiCheck, HiTicket } from "react-icons/hi";
import { FiPhone, FiUser, FiMail, FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";

const BookSessionCard = ({ tutor = {} }) => {
  const { data: session, refetch } = authClient.useSession();
  const user = session?.user;

  const { hourlyFee, _id, tutorName, photo, imageUrl, subject, totalSlot, sessionStartDate } = tutor;
  const [phone, setPhone] = useState("");
  const [sessionToken, setSessionToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // Slot check
  const slotsLeft = parseInt(totalSlot) || 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sessionDate = sessionStartDate ? new Date(sessionStartDate) : null;
  if (sessionDate) sessionDate.setHours(0, 0, 0, 0);

  const noSlots = slotsLeft <= 0;
  const notYet = sessionDate && today < sessionDate;

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please log in to book a session.");
      return;
    }
    if (noSlots) {
      toast.error("No available slots left.");
      return;
    }
    if (notYet) {
      toast.error("Booking is not available yet for this tutor");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    setLoading(true);
    const bookingData = {
      userId: user?.id,
      studentName: user?.name,
      studentEmail: user?.email,
      phone,
      tutorId: _id,
      tutorName,
      subject,
      imageUrl: photo || imageUrl,
    };

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Booking failed. Please try again.");
        return;
      }

      setSessionToken(data.sessionToken);
      toast.success(`Session booked successfully with ${tutorName}!`);
      refetch();
    } catch (error) {
       toast.error("An error occurred. Please try again.");
    } finally {
       setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1D2026] border border-gray-100 dark:border-gray-800 p-8 shadow-2xl relative">
       {/* Price Header */}
       <div className="flex items-center justify-between gap-4 mb-8">
          <div>
             <span className="text-xs font-bold text-[#6E7485] dark:text-gray-500 uppercase tracking-widest block mb-1">Session Fee</span>
             <h2 className="text-[#FF6636] text-5xl font-bold">${hourlyFee || 0} <span className="text-lg text-[#6E7485] font-normal">/ hr</span></h2>
          </div>
          <div className="w-14 h-14 bg-[#FF6636]/10 flex items-center justify-center">
             <FiShoppingCart className="text-[#FF6636] text-2xl" />
          </div>
       </div>

       {/* Status Badges */}
       <div className="mb-8">
         {noSlots ? (
           <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 px-4 py-3 text-xs font-bold uppercase tracking-widest">
             Fully Booked
           </div>
         ) : notYet ? (
           <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-3 text-xs font-bold uppercase tracking-widest">
             Starts on {sessionDate?.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
           </div>
         ) : (
           <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 text-green-700 dark:text-green-400 px-4 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
             <span className="w-2 h-2 bg-green-500 animate-pulse" /> {slotsLeft} Slots Available
           </div>
         )}
       </div>

       {/* Form */}
       <div className="space-y-4 mb-8">
          <div className="space-y-4">
             <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 px-4 py-3">
                <FiUser className="text-[#6E7485] shrink-0" />
                <span className="text-[#1D2026] dark:text-white text-sm font-semibold truncate">{user?.name || "Login Required"}</span>
             </div>
             <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 px-4 py-3">
                <FiMail className="text-[#6E7485] shrink-0" />
                <span className="text-[#1D2026] dark:text-white text-sm truncate">{user?.email || "—"}</span>
             </div>
             <div className="relative group">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E7485] group-focus-within:text-[#FF6636] transition-colors" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#1D2026] dark:text-white pl-10 pr-4 py-3 text-sm outline-none focus:border-[#FF6636] transition-colors"
                />
             </div>
          </div>

          <button
             onClick={handleBooking}
             disabled={noSlots || notYet || loading}
             className="w-full bg-[#FF6636] hover:bg-[#e85520] text-white py-4 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-colors disabled:opacity-30 disabled:cursor-not-allowed group"
          >
             {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin" /> : <>Book This Session <span className="group-hover:translate-x-1 transition-transform">→</span></>}
          </button>
       </div>

       {/* Success State */}
       {sessionToken && (
         <div className="bg-[#FF6636]/5 border-2 border-dashed border-[#FF6636]/30 px-5 py-4 mb-8">
            <div className="flex items-center gap-3 mb-2">
               <HiTicket className="text-[#FF6636] text-2xl" />
               <span className="text-xs font-bold text-[#FF6636] uppercase tracking-widest">Booking Confirmed!</span>
            </div>
            <p className="text-[#1D2026] dark:text-white font-mono font-black text-xl mb-1">{sessionToken}</p>
            <p className="text-[10px] text-[#6E7485] dark:text-gray-500 uppercase font-bold">Session ID (Keep this safe)</p>
         </div>
       )}

       {/* Trust Points */}
       <div className="space-y-3">
          {[
            "Verified expert academic tutor",
            "Flexible online/offline schedule",
            "Secure session token generation",
          ].map((point, idx) => (
             <div key={idx} className="flex items-center gap-3 text-[#6E7485] dark:text-gray-400">
                <HiCheck className="text-green-500 text-lg shrink-0" />
                <span className="text-xs font-semibold">{point}</span>
             </div>
          ))}
       </div>
    </div>
  );
};

export default BookSessionCard;
