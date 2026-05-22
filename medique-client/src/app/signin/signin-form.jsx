"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SigninForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = formData;
    const { data, error } = await authClient.signIn.email({ email, password, callbackURL: "/" });
    if (error) {
      toast.error(error.message || "Login failed");
    } else {
      toast.success("Welcome back to MediQue!");
      router.push("/");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1D2026] flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#1D2026] overflow-hidden flex-col justify-end p-12">
        <Image
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80"
          alt="Learning"
          fill
          className="object-cover opacity-30"
        />
        <div className="relative z-10">
          <div className="w-10 h-10 bg-[#FF6636] flex items-center justify-center mb-6">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Learn From Expert<br />Tutors Today
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-sm">
            Join 67,000+ students discovering the best tutors across every subject — online and offline.
          </p>
          <div className="flex gap-8 mt-8">
            <div>
              <p className="text-2xl font-bold text-white">67.1k+</p>
              <p className="text-gray-500 text-sm">Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">26k+</p>
              <p className="text-gray-500 text-sm">Sessions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="text-gray-500 text-sm">Success</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="text-2xl font-bold text-[#1D2026] dark:text-white">
              Medi<span className="text-[#FF6636]">Que</span>
            </Link>
            <h1 className="text-3xl font-bold text-[#1D2026] dark:text-white mt-6 mb-1">Welcome Back</h1>
            <p className="text-[#6E7485] dark:text-gray-400 text-sm">Sign in to your MediQue account</p>
          </div>

          <form onSubmit={handleSignin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#1D2026] dark:text-white mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E7485]" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#1D2026] dark:text-white pl-10 pr-4 py-3 outline-none focus:border-[#FF6636] transition-colors text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#1D2026] dark:text-white mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E7485]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#1D2026] dark:text-white pl-10 pr-12 py-3 outline-none focus:border-[#FF6636] transition-colors text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E7485] hover:text-[#FF6636] transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6636] hover:bg-[#e85520] disabled:opacity-60 text-white py-3 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>Login to MediQue <FiArrowRight /></>
              )}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1" />
            <span className="text-xs text-[#6E7485] font-semibold">OR CONTINUE WITH</span>
            <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#1D2026] dark:text-white py-3 flex items-center justify-center gap-3 font-semibold text-sm hover:border-[#FF6636] transition-colors"
          >
            <FcGoogle className="text-xl" /> Sign in with Google
          </button>

          <p className="mt-6 text-center text-[#6E7485] dark:text-gray-400 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#FF6636] font-bold hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;