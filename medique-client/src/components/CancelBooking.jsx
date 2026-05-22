"use client";
import { AlertDialog } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiXCircle, FiX, FiAlertCircle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useState } from "react";

export default function CancelBooking({ booking }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = async () => {
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${booking._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify({ status: "cancelled" }),
      });
      if (res.ok) {
        toast.success("Booking cancelled successfully.");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to cancel booking.");
      }
    } catch (err) {
      console.error("Cancel error:", err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center gap-2"
      >
        <FiXCircle /> Cancel
      </button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="max-w-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-0 overflow-hidden">
             {/* Header */}
             <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
               <div className="flex items-center gap-2 text-red-600 uppercase tracking-tighter font-black">
                  <FiAlertCircle className="text-xl" />
                  <span>Cancel Booking</span>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-[#6E7485] hover:text-red-600 transition-colors">
                  <FiX className="text-xl" />
               </button>
            </div>

            <div className="p-8">
               <p className='text-[#1D2026] dark:text-gray-300 text-lg font-medium leading-relaxed mb-8'>
                 Are you sure you want to cancel your session with <strong className="text-red-500 font-black">"{booking.tutorName}"</strong>? This will release your slot for other students.
               </p>

               <div className="flex gap-4">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-gray-100 dark:bg-gray-800 text-[#6E7485] font-bold py-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Keep Booking
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 transition-colors"
                  >
                    Yes, Cancel
                  </button>
               </div>
            </div>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
