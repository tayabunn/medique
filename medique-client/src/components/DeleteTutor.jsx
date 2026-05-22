"use client";
import React from 'react';
import { AlertDialog } from "@heroui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

export function DeleteTutor({ tutor }) {
  const { tutorName, _id } = tutor;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutor/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${tokenData?.token}`,
      },
    });
    const data = await res.json();

    if (data.deletedCount > 0) {
      toast.success(`"${tutorName}" has been deleted.`);
      setIsOpen(false);
      router.push("/my-tutors");
    } else {
      toast.error("Failed to delete tutor.");
    }
  };

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 px-4 py-2 text-sm border border-red-100 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-bold"
      >
        <RiDeleteBin6Line className="text-base" />
        Delete
      </button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="max-w-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-0 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
               <div className="flex items-center gap-2 text-red-600 uppercase tracking-tighter font-black">
                  <FiAlertTriangle className="text-xl" />
                  <span>Permanent Delete</span>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-[#6E7485] hover:text-red-600 transition-colors">
                  <FiX className="text-xl" />
               </button>
            </div>

            <div className="p-8">
               <p className='text-[#1D2026] dark:text-gray-300 text-lg font-medium leading-relaxed mb-8'>
                 Are you sure you want to permanently delete <strong className="text-red-500 font-black">"{tutorName}"</strong>? This action will remove all listings and tokens associated with this tutor and cannot be undone.
               </p>

               <div className="flex gap-4">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-gray-100 dark:bg-gray-800 text-[#6E7485] font-bold py-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Keep it
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 transition-colors shadow-lg shadow-red-600/20"
                  >
                    Yes, Delete
                  </button>
               </div>
            </div>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}

export default DeleteTutor;
