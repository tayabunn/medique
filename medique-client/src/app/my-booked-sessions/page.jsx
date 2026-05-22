import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import CancelBooking from "@/components/CancelBooking";
import { HiTicket } from "react-icons/hi";
import { FiBookOpen, FiUser, FiMail } from "react-icons/fi";

export const dynamic = "force-dynamic";
export const metadata = { title: "My Booked Sessions — MediQue" };

const MyBookedSessionsPage = async () => {
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
        <p className="text-[#6E7485] dark:text-gray-400 text-sm mb-6">You need to be logged in to view your booked sessions.</p>
        <Link href="/signin" className="bg-[#FF6636] text-white text-sm font-bold px-6 py-3 hover:bg-[#e85520] transition-colors">
          Sign In
        </Link>
      </div>
    );
  }

  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://medique-server.vercel.app";
  const res = await fetch(`${apiUrl}/booking/${user.id}`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    if (res.status === 401) {
      redirect("/signin");
    }
    return []; // Or handle error
  }
  const bookings = await res.json();

  return (
    <div className="min-h-screen bg-white dark:bg-[#1D2026]">

      {/* Header */}
      <div className="bg-[#1D2026] px-4 md:px-8 py-12">
        <div className="w-[85%] max-w-[1920px] mx-auto">
          <p className="text-[#FF6636] text-sm font-bold uppercase tracking-widest mb-2">Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">My Booked Sessions</h1>
          <p className="text-gray-400 text-sm mt-1">Track and manage your learning sessions</p>
        </div>
      </div>

      <div className="w-[85%] max-w-[1920px] mx-auto px-4 md:px-0 py-10">
        {bookings.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <HiTicket className="text-[#6E7485] text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-[#1D2026] dark:text-white mb-2">No sessions yet</h3>
            <p className="text-[#6E7485] dark:text-gray-400 text-sm mb-6">You haven&apos;t booked any sessions yet. Browse available tutors to get started.</p>
            <Link href="/tutors" className="bg-[#FF6636] text-white text-sm font-bold px-6 py-3 hover:bg-[#e85520] transition-colors">
              Browse Tutors
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-100 dark:border-gray-700">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                  <th className="py-3 px-4 text-xs font-bold text-[#6E7485] dark:text-gray-400 uppercase tracking-wider">Tutor</th>
                  <th className="py-3 px-4 text-xs font-bold text-[#6E7485] dark:text-gray-400 uppercase tracking-wider">Student</th>
                  <th className="py-3 px-4 text-xs font-bold text-[#6E7485] dark:text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="py-3 px-4 text-xs font-bold text-[#6E7485] dark:text-gray-400 uppercase tracking-wider">Session Token</th>
                  <th className="py-3 px-4 text-xs font-bold text-[#6E7485] dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-xs font-bold text-[#6E7485] dark:text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const isCancelled = booking.status === "cancelled";
                  return (
                    <tr key={booking._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-bold text-[#1D2026] dark:text-white flex items-center gap-2">
                          <FiBookOpen className="text-[#FF6636] shrink-0" /> {booking.tutorName}
                        </p>
                        <p className="text-xs text-[#6E7485] dark:text-gray-400 mt-0.5 pl-5">{booking.subject}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-1.5 text-[#4E5566] dark:text-gray-300">
                          <FiUser className="text-[#FF6636] shrink-0" /> {booking.studentName}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-1.5 text-[#6E7485] dark:text-gray-400 text-xs">
                          <FiMail className="text-[#FF6636] shrink-0" /> {booking.studentEmail}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {booking.sessionToken ? (
                          <span className="flex items-center gap-1.5 font-mono text-[#FF6636] text-xs font-bold">
                            <HiTicket className="text-base shrink-0" /> {booking.sessionToken}
                          </span>
                        ) : (
                          <span className="text-[#6E7485]">—</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 text-xs font-bold uppercase ${isCancelled ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`}>
                          {booking.status || "confirmed"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {isCancelled ? (
                          <span className="text-[#6E7485] text-xs italic">Cancelled</span>
                        ) : (
                          <CancelBooking booking={booking} />
                        )}
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

export default MyBookedSessionsPage;
