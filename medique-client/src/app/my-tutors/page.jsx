import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { EditTutorModal } from "@/components/EditTutorModal";
import DeleteTutor from "@/components/DeleteTutor";
import { FiBookOpen, FiMapPin, FiMonitor, FiPlusSquare } from "react-icons/fi";

export const dynamic = "force-dynamic";
export const metadata = { title: "My Tutors — MediQue" };

const MyTutorsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const { token } = await auth.api.getToken({ headers: await headers() });
  const user = session?.user;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#1D2026] text-center px-6">
        <div className="w-16 h-16 bg-[#FF6636] flex items-center justify-center mx-auto mb-4">
          <FiBookOpen className="text-white text-2xl" />
        </div>
        <h1 className="text-2xl font-bold text-[#1D2026] dark:text-white mb-2">Please Log In</h1>
        <p className="text-[#6E7485] dark:text-gray-400 text-sm mb-6">You need to be logged in to view your tutors.</p>
        <Link href="/signin" className="bg-[#FF6636] text-white text-sm font-bold px-6 py-3 hover:bg-[#e85520] transition-colors">
          Sign In
        </Link>
      </div>
    );
  }

  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://medique-server.vercel.app";
  const res = await fetch(`${apiUrl}/my-tutors/${user.id}`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    if (res.status === 401) {
      redirect("/signin");
    }
    return []; // Or handle error
  }
  const tutors = await res.json();

  return (
    <div className="min-h-screen bg-white dark:bg-[#1D2026]">

      {/* Header */}
      <div className="bg-[#1D2026] px-4 md:px-8 py-12">
        <div className="w-[85%] max-w-[1920px] mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[#FF6636] text-sm font-bold uppercase tracking-widest mb-2">Dashboard</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white">My Tutors</h1>
            <p className="text-gray-400 text-sm mt-1">Manage the tutor listings you have created</p>
          </div>
          <Link
            href="/add-tutor"
            className="flex items-center gap-2 bg-[#FF6636] text-white text-sm font-bold px-5 py-3 hover:bg-[#e85520] transition-colors"
          >
            <FiPlusSquare /> Add New Tutor
          </Link>
        </div>
      </div>

      <div className="w-[85%] max-w-[1920px] mx-auto px-4 md:px-0 py-10">
        {tutors.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <FiBookOpen className="text-[#6E7485] text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-[#1D2026] dark:text-white mb-2">No tutors yet</h3>
            <p className="text-[#6E7485] dark:text-gray-400 text-sm mb-6">You haven&apos;t added any tutors yet. Start by adding your first one.</p>
            <Link href="/add-tutor" className="bg-[#FF6636] text-white text-sm font-bold px-6 py-3 hover:bg-[#e85520] transition-colors">
              Add Your First Tutor
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-100 dark:border-gray-700">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                  <th className="py-3 px-4 text-xs font-bold text-[#6E7485] dark:text-gray-400 uppercase tracking-wider">Tutor</th>
                  <th className="py-3 px-4 text-xs font-bold text-[#6E7485] dark:text-gray-400 uppercase tracking-wider">Subject</th>
                  <th className="py-3 px-4 text-xs font-bold text-[#6E7485] dark:text-gray-400 uppercase tracking-wider">Fee/hr</th>
                  <th className="py-3 px-4 text-xs font-bold text-[#6E7485] dark:text-gray-400 uppercase tracking-wider">Slots</th>
                  <th className="py-3 px-4 text-xs font-bold text-[#6E7485] dark:text-gray-400 uppercase tracking-wider">Mode</th>
                  <th className="py-3 px-4 text-xs font-bold text-[#6E7485] dark:text-gray-400 uppercase tracking-wider">Location</th>
                  <th className="py-3 px-4 text-xs font-bold text-[#6E7485] dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tutors.map((tutor) => {
                  const imgSrc = tutor.photo || tutor.imageUrl || "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=200&q=80";
                  return (
                    <tr key={tutor._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 shrink-0 overflow-hidden">
                            <Image src={imgSrc} alt={tutor.tutorName} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-[#1D2026] dark:text-white text-sm">{tutor.tutorName}</p>
                            <p className="text-xs text-[#6E7485] dark:text-gray-400">{tutor.institution}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-1.5 text-[#4E5566] dark:text-gray-300">
                          <FiBookOpen className="text-[#FF6636] shrink-0" /> {tutor.subject}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-[#FF6636]">${tutor.hourlyFee}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 text-xs font-bold ${parseInt(tutor.totalSlot) > 0 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"}`}>
                          {tutor.totalSlot} left
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-1.5 text-[#4E5566] dark:text-gray-300">
                          <FiMonitor className="text-[#FF6636] shrink-0" /> {tutor.teachingMode}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-1.5 text-[#4E5566] dark:text-gray-300">
                          <FiMapPin className="text-[#FF6636] shrink-0" /> {tutor.location}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <EditTutorModal tutor={tutor} />
                          <DeleteTutor tutor={tutor} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTutorsPage;
