"use client";

import { authClient } from "@/lib/auth-client";
import React from "react";
import { FiMail, FiCalendar, FiUser, FiArrowLeft, FiSave, FiX, FiEdit3, FiLock, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export const ProfileForm = () => {
  const { data: session, refetch } = authClient.useSession();
  const user = session?.user;

  const [editingName, setEditingName] = React.useState(false);
  const [editingEmail, setEditingEmail] = React.useState(false);
  const [nameValue, setNameValue] = React.useState(user?.name || "");
  const [emailValue, setEmailValue] = React.useState(user?.email || "");
  const [status, setStatus] = React.useState({ type: "", msg: "" });

  if (!user) return null;

  const showStatus = (type, msg) => {
    setStatus({ type, msg });
    setTimeout(() => setStatus({ type: "", msg: "" }), 3000);
  };

  const handleSaveName = async () => {
    if (!nameValue.trim() || nameValue === user.name) {
      setEditingName(false);
      return;
    }
    const res = await authClient.updateUser({ name: nameValue.trim() });
    if (res.error) showStatus("error", res.error.message || "Failed to update name");
    else {
      showStatus("success", "Name updated!");
      setEditingName(false);
    }
  };

  const handleSaveEmail = async () => {
    if (!emailValue.trim() || emailValue === user.email) {
      setEditingEmail(false);
      return;
    }
    const res = await authClient.changeEmail({ newEmail: emailValue.trim() });
    if (res.error) showStatus("error", res.error.message || "Failed to update email");
    else {
      showStatus("success", "Verification email sent to new address.");
      setEditingEmail(false);
      await refetch();
    }
  };

  const handleNameKeyDown = (e) => {
    if (e.key === "Enter") handleSaveName();
    if (e.key === "Escape") setEditingName(false);
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter") handleSaveEmail();
    if (e.key === "Escape") setEditingEmail(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1D2026]">
       {/* Header */}
       <div className="bg-[#1D2026] pt-32 pb-20 px-4 md:px-0">
          <div className="w-[85%] max-w-[1920px] mx-auto">
             <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FF6636] transition-colors mb-8 text-xs font-bold uppercase tracking-widest">
                <FiArrowLeft className="text-lg" /> Back to Home
             </Link>
             <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">User Profile</h1>
             <p className="text-gray-400 text-sm mt-2 font-medium">Manage your account information and preferences</p>
          </div>
       </div>

       <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-10 pb-20">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 md:p-12 shadow-2xl relative">
             <div className="flex flex-col md:flex-row items-center gap-10">
                {/* Avatar */}
                <div className="relative shrink-0">
                   <div className="w-40 h-40 bg-gray-100 dark:bg-gray-800 border-4 border-white dark:border-[#FF6636]/20 relative overflow-hidden">
                      {user.image ? (
                        <Image src={user.image} alt={user.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl font-black text-[#FF6636] bg-[#FF6636]/10">
                           {user.name?.charAt(0)}
                        </div>
                      )}
                   </div>
                   <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white dark:border-gray-900" />
                </div>

                <div className="flex-1 text-center md:text-left w-full">
                   {/* Name Editing */}
                   <div className="mb-6">
                      {editingName ? (
                         <div className="flex items-center gap-2">
                            <input
                               value={nameValue}
                               onChange={(e) => setNameValue(e.target.value)}
                               onKeyDown={handleNameKeyDown}
                               autoFocus
                               className="bg-white dark:bg-gray-800 border border-[#FF6636] text-[#1D2026] dark:text-white px-4 py-3 text-2xl font-bold outline-none w-full"
                            />
                            <button onClick={handleSaveName} className="bg-[#FF6636] text-white p-4 hover:bg-[#e85520] transition-colors">
                               <FiSave className="text-xl" />
                            </button>
                            <button onClick={() => setEditingName(false)} className="bg-gray-100 dark:bg-gray-700 text-[#6E7485] p-4 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                               <FiX className="text-xl" />
                            </button>
                         </div>
                      ) : (
                         <div className="flex items-center justify-center md:justify-start gap-4 group">
                            <h2 className="text-3xl md:text-4xl font-black text-[#1D2026] dark:text-white tracking-tighter uppercase">{user.name}</h2>
                            <button onClick={() => setEditingName(true)} className="text-[#FF6636] transition-colors mt-1 border-orange-300 border-2 rounded-full p-2">
                               <FiEdit3 className="text-xl" />
                            </button>
                         </div>
                      )}
                   </div>

                   {/* Details Grid */}
                   <div className="space-y-4">
                      {/* Email */}
                      <div className="flex flex-col items-center md:items-start gap-1">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                               <FiMail className="text-[#FF6636]" />
                            </div>
                            {editingEmail ? (
                               <div className="flex items-center gap-2">
                                  <input
                                     type="email"
                                     value={emailValue}
                                     onChange={(e) => setEmailValue(e.target.value)}
                                     onKeyDown={handleEmailKeyDown}
                                     autoFocus
                                     className="bg-white dark:bg-gray-800 border border-[#FF6636] text-[#1D2026] dark:text-white px-3 py-1 text-sm outline-none"
                                  />
                                  <button onClick={handleSaveEmail} className="text-[#FF6636] font-bold hover:underline text-xs uppercase">Save</button>
                                  <button onClick={() => setEditingEmail(false)} className="text-[#6E7485] font-bold hover:underline text-xs uppercase">Cancel</button>
                               </div>
                            ) : (
                               <div className="flex items-center gap-2 group">
                                  <span className="text-[#4E5566] dark:text-gray-300 font-medium">{user.email}</span>
                                  <button onClick={() => setEditingEmail(true)} className="text-[#FF6636] transition-colors">
                                     <FiLock className="text-xs" />
                                  </button>
                               </div>
                            )}
                         </div>
                      </div>

                      {/* Other Meta */}
                      <div className="flex items-center justify-center md:justify-start gap-3 text-[#6E7485] dark:text-gray-400">
                         <div className="w-8 h-8 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                            <FiCalendar className="text-[#FF6636]" />
                         </div>
                         <span className="text-sm font-semibold">Joined {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-3 text-[#6E7485] dark:text-gray-400">
                         <div className="w-8 h-8 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                            <FiUser className="text-[#FF6636]" />
                         </div>
                         <span className="text-sm font-semibold uppercase tracking-widest text-[#FF6636]">Student Member</span>
                      </div>
                   </div>
                </div>
             </div>

             {status.msg && (
                <div className={`mt-8 py-3 px-4 border-l-4 font-bold text-sm ${
                   status.type === "error"
                      ? "bg-red-50 border-red-500 text-red-600"
                      : "bg-green-50 border-green-500 text-green-600"
                }`}>
                   {status.msg}
                </div>
             )}

             {/* Quick Links */}
             <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/my-tutors" className="border border-gray-100 dark:border-gray-800 p-6 hover:border-[#FF6636] transition-all group">
                   <h3 className="text-[#6E7485] dark:text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Dashboard Control</h3>
                   <p className="text-[#1D2026] dark:text-white text-xl font-bold group-hover:text-[#FF6636] transition-colors">Manage My Tutors</p>
                </Link>
                <Link href="/my-booked-sessions" className="border border-gray-100 dark:border-gray-800 p-6 hover:border-[#FF6636] transition-all group">
                   <h3 className="text-[#6E7485] dark:text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Learning Progress</h3>
                   <p className="text-[#1D2026] dark:text-white text-xl font-bold group-hover:text-[#FF6636] transition-colors">Booked Sessions</p>
                </Link>
             </div>

             {/* Sign Out */}
             <div className="mt-10 flex justify-center md:justify-start">
                <button 
                   onClick={() => authClient.signOut()} 
                   className="flex items-center justify-center gap-2 bg-[#1D2026] dark:bg-black text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-red-600 transition-colors group"
                >
                   <FiLogOut className="group-hover:translate-x-1 transition-transform" /> Sign Out from Account
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};