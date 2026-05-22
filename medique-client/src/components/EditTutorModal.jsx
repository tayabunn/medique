"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  Modal,
} from "@heroui/react";
import { VscEditSparkle } from "react-icons/vsc";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";

const fieldClass = "w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#1D2026] dark:text-white px-3 py-3 text-sm outline-none focus:border-[#FF6636] transition-colors placeholder-gray-400";
const labelClass = "block text-sm font-semibold text-[#1D2026] dark:text-white mb-1.5";

export function EditTutorModal({ tutor }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const {
    _id,
    tutorName,
    photo,
    subject,
    availableDays,
    availableTimeSlot,
    hourlyFee,
    totalSlot,
    sessionStartDate,
    institution,
    experience,
    location,
    teachingMode,
    description,
  } = tutor;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tutorData = Object.fromEntries(formData.entries());

    const { data: tokenData } = await authClient.token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutor/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(tutorData),
    });
    const data = await res.json();

    if (data.modifiedCount > 0) {
      toast.success("Tutor updated successfully!");
      setIsOpen(false);
      router.refresh();
    } else {
      toast.error("No changes were made.");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 font-bold text-[#1D2026] dark:text-white hover:border-[#FF6636] hover:text-[#FF6636] transition-colors"
      >
        <VscEditSparkle className="text-base" />
        Edit
      </button>
      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-0 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
               <h3 className="text-xl font-bold text-[#1D2026] dark:text-white uppercase tracking-tight">Edit Tutor Profile</h3>
               <button onClick={() => setIsOpen(false)} className="text-[#6E7485] hover:text-[#FF6636] transition-colors">
                  <FiX className="text-xl" />
               </button>
            </div>
            
            <form onSubmit={onSubmit} className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">

                  {/* Tutor Name */}
                  <div className="md:col-span-2">
                    <label className={labelClass}>Tutor Name</label>
                    <input defaultValue={tutorName} name="tutorName" required className={fieldClass} />
                  </div>

                  {/* Photo URL */}
                  <div className="md:col-span-2">
                    <label className={labelClass}>Photo URL</label>
                    <input defaultValue={photo} name="photo" type="url" className={fieldClass} />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className={labelClass}>Subject / Category</label>
                    <select name="subject" defaultValue={subject} required className={fieldClass}>
                       {["Mathematics","Physics","Chemistry","Biology","English","History","Computer Science","Economics"].map(s => (
                         <option key={s} value={s}>{s}</option>
                       ))}
                    </select>
                  </div>

                  {/* Teaching Mode */}
                  <div>
                    <label className={labelClass}>Teaching Mode</label>
                    <select name="teachingMode" defaultValue={teachingMode} required className={fieldClass}>
                       {["Online","Offline","Both"].map(m => (
                         <option key={m} value={m}>{m}</option>
                       ))}
                    </select>
                  </div>

                  {/* Available Days */}
                  <div>
                    <label className={labelClass}>Available Days</label>
                    <input defaultValue={availableDays} name="availableDays" required className={fieldClass} />
                  </div>

                  {/* Available Time Slot */}
                  <div>
                    <label className={labelClass}>Available Time Slot</label>
                    <input defaultValue={availableTimeSlot} name="availableTimeSlot" required className={fieldClass} />
                  </div>

                  {/* Hourly Fee */}
                  <div>
                    <label className={labelClass}>Hourly Fee (USD)</label>
                    <input defaultValue={hourlyFee} name="hourlyFee" type="number" required className={fieldClass} />
                  </div>

                  {/* Total Slot */}
                  <div>
                    <label className={labelClass}>Total Slots</label>
                    <input defaultValue={totalSlot} name="totalSlot" type="number" required className={fieldClass} />
                  </div>

                  {/* Session Start Date */}
                  <div className="md:col-span-2">
                    <label className={labelClass}>Session Start Date</label>
                    <input defaultValue={sessionStartDate} name="sessionStartDate" type="date" required className={fieldClass} />
                  </div>

                  {/* Institution */}
                  <div>
                    <label className={labelClass}>Institution</label>
                    <input defaultValue={institution} name="institution" required className={fieldClass} />
                  </div>

                  {/* Experience */}
                  <div>
                    <label className={labelClass}>Experience</label>
                    <input defaultValue={experience} name="experience" required className={fieldClass} />
                  </div>

                  {/* Location */}
                  <div className="md:col-span-2">
                    <label className={labelClass}>Location</label>
                    <input defaultValue={location} name="location" required className={fieldClass} />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className={labelClass}>Description</label>
                    <textarea defaultValue={description} name="description" rows={4} className={`${fieldClass} resize-none`} />
                  </div>

                </div>

                <div className="flex gap-4">
                   <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-gray-100 dark:bg-gray-800 text-[#6E7485] font-bold py-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                   >
                     Cancel
                   </button>
                   <button
                    type="submit"
                    className="flex-2 bg-[#FF6636] hover:bg-[#e85520] text-white font-bold py-3 transition-colors"
                   >
                     Update Tutor Profile
                   </button>
                </div>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
