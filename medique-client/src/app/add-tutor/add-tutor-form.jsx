"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  Select,
  SelectIndicator,
  SelectPopover,
  SelectTrigger,
  SelectValue,
  TextArea,
  TextField,
} from "@heroui/react";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";

const fieldClass = "w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#1D2026] dark:text-white px-3 py-3 text-sm outline-none focus:border-[#FF6636] transition-colors placeholder-gray-400";
const labelClass = "block text-sm font-semibold text-[#1D2026] dark:text-white mb-1.5";

const AddTutorForm = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tutorData = Object.fromEntries(formData.entries());

    tutorData.userId = user?.id;
    tutorData.userEmail = user?.email;
    tutorData.userName = user?.name;

    const { data: tokenData } = await authClient.token();
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://medique-server.vercel.app";
    const res = await fetch(`${apiUrl}/tutor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(tutorData),
    });
    const data = await res.json();

    if (data.insertedId) {
      toast.success("Tutor added successfully!");
      e.target.reset();
    } else {
      toast.error("Failed to add tutor. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#1D2026]">

      {/* Header */}
      <div className="bg-[#1D2026] px-4 md:px-0 py-12">
        <div className="w-[85%] max-w-[1920px] mx-auto">
          <p className="text-[#FF6636] text-sm font-bold uppercase tracking-widest mb-2">Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Add a Tutor</h1>
          <p className="text-gray-400 text-sm mt-1">Fill in the details below to create a new tutor listing</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
        <div className="border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 md:p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Tutor Name */}
              <div className="md:col-span-2">
                <label className={labelClass}>Tutor Name <span className="text-[#FF6636]">*</span></label>
                <input name="tutorName" required placeholder="e.g. Dr. Sarah Ahmed" className={fieldClass} />
              </div>

              {/* Photo URL */}
              <div className="md:col-span-2">
                <label className={labelClass}>Photo URL <span className="text-[#6E7485] font-normal">(imgbb / postimage)</span></label>
                <input name="photo" type="url" placeholder="https://i.ibb.co/your-image.jpg" className={fieldClass} />
              </div>

              {/* Subject */}
              <div>
                <label className={labelClass}>Subject / Category <span className="text-[#FF6636]">*</span></label>
                <select name="subject" required className={fieldClass}>
                  <option value="">Select subject</option>
                  {["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Computer Science", "Economics"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Teaching Mode */}
              <div>
                <label className={labelClass}>Teaching Mode <span className="text-[#FF6636]">*</span></label>
                <select name="teachingMode" required className={fieldClass}>
                  <option value="">Select mode</option>
                  {["Online", "Offline", "Both"].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Available Days */}
              <div>
                <label className={labelClass}>Available Days <span className="text-[#FF6636]">*</span></label>
                <input name="availableDays" required placeholder="e.g. Sun - Thu" className={fieldClass} />
              </div>

              {/* Available Time Slot */}
              <div>
                <label className={labelClass}>Available Time Slot <span className="text-[#FF6636]">*</span></label>
                <input name="availableTimeSlot" required placeholder="e.g. 5:00 PM - 8:00 PM" className={fieldClass} />
              </div>

              {/* Hourly Fee */}
              <div>
                <label className={labelClass}>Hourly Fee (USD) <span className="text-[#FF6636]">*</span></label>
                <input name="hourlyFee" type="number" required min="1" placeholder="25" className={fieldClass} />
              </div>

              {/* Total Slots */}
              <div>
                <label className={labelClass}>Total Slots <span className="text-[#FF6636]">*</span></label>
                <input name="totalSlot" type="number" required min="1" placeholder="10" className={fieldClass} />
              </div>

              {/* Session Start Date */}
              <div className="md:col-span-2">
                <label className={labelClass}>Session Start Date <span className="text-[#FF6636]">*</span></label>
                <input name="sessionStartDate" type="date" required className={fieldClass} />
              </div>

              {/* Institution */}
              <div>
                <label className={labelClass}>Institution <span className="text-[#FF6636]">*</span></label>
                <input name="institution" required placeholder="e.g. Dhaka University" className={fieldClass} />
              </div>

              {/* Experience */}
              <div>
                <label className={labelClass}>Experience <span className="text-[#FF6636]">*</span></label>
                <input name="experience" required placeholder="e.g. 5 years" className={fieldClass} />
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label className={labelClass}>Location (Area / City) <span className="text-[#FF6636]">*</span></label>
                <input name="location" required placeholder="e.g. Gulshan, Dhaka" className={fieldClass} />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Describe your teaching style and expertise..."
                  className={`${fieldClass} resize-none`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF6636] hover:bg-[#e85520] text-white text-sm font-bold py-3.5 flex items-center justify-center gap-2 transition-colors"
            >
              Add Tutor <FiArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTutorForm;