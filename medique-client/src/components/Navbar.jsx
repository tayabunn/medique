"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import {
  FiUser, FiSun, FiMoon, FiMenu, FiX, FiLogOut,
  FiChevronDown, FiBookOpen, FiCalendar, FiPlusSquare
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, refetch } = authClient.useSession();
  const user = session?.user;
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const isDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
    setDark(!!isDark);
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setDark(isDark);
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      await refetch();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tutors", href: "/tutors" },
  ];

  const authLinks = [
    { name: "Add Tutor", href: "/add-tutor", icon: FiPlusSquare },
    { name: "My Tutors", href: "/my-tutors", icon: FiBookOpen },
    { name: "My Booked Sessions", href: "/my-booked-sessions", icon: FiCalendar },
  ];

  const isActive = (href) => pathname === href;

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white dark:bg-[#1D2026] border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="w-[85%] max-w-[1920px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[#FF6636] flex items-center justify-center">
            <FiBookOpen className="text-white text-base" />
          </div>
          <span className="text-xl font-bold text-[#1D2026] dark:text-white">
            Medi<span className="text-[#FF6636]">Que</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors relative pb-1 ${
                isActive(link.href)
                  ? "text-[#FF6636] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#FF6636]"
                  : "text-[#4E5566] dark:text-gray-300 hover:text-[#FF6636]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user && authLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors relative pb-1 ${
                isActive(link.href)
                  ? "text-[#FF6636] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#FF6636]"
                  : "text-[#4E5566] dark:text-gray-300 hover:text-[#FF6636]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center text-[#4E5566] dark:text-gray-300 hover:text-[#FF6636] dark:hover:text-[#FF6636] transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
          </button>

          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-9 h-9 bg-[#FF6636] overflow-hidden flex items-center justify-center">
                  {user.image ? (
                    <Image src={user.image} alt={user.name} width={36} height={36} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-sm">{user.name?.charAt(0)}</span>
                  )}
                </div>
                <FiChevronDown className={`text-[#4E5566] dark:text-gray-300 text-sm transition-transform duration-200 hidden sm:block ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {profileOpen && (
                <div className="absolute top-12 right-0 w-64 bg-(--card-bg) border border-(--card-border) shadow-xl z-50">
                  <div className="px-4 py-3 border-b border-(--card-border)">
                    <p className="text-sm font-bold text-(--card-text) truncate">{user.name}</p>
                    <p className="text-xs text-[#6E7485] truncate mt-0.5">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => { setProfileOpen(false); router.push("/profile"); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-(--card-text) hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#FF6636] transition-colors"
                    >
                      <FiUser className="text-base" /> Profile
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                      <FiLogOut className="text-base" /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/signin"
                className="text-sm font-semibold text-[#1D2026] dark:text-white hover:text-[#FF6636] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-[#FF6636] text-white text-sm font-bold px-5 py-2.5 hover:bg-[#e85520] transition-colors"
              >
                Create Account
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-[#4E5566] dark:text-gray-300 hover:text-[#FF6636] transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#1D2026] border-t border-gray-200 dark:border-gray-700 px-4 py-4 flex flex-col gap-1">
          {[...navLinks, ...(user ? authLinks : [])].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 text-sm font-semibold transition-colors ${
                isActive(link.href)
                  ? "text-[#FF6636] bg-orange-50 dark:bg-orange-500/10"
                  : "text-[#4E5566] dark:text-gray-300 hover:text-[#FF6636] hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {link.icon && <link.icon className="text-base" />}
              {link.name}
            </Link>
          ))}
          {!user ? (
            <div className="flex flex-col gap-2 pt-3 border-t border-gray-100 dark:border-gray-700 mt-2">
              <Link href="/signin" onClick={() => setMenuOpen(false)} className="text-center py-2.5 text-sm font-bold text-[#1D2026] dark:text-white border border-gray-200 dark:border-gray-700 hover:border-[#FF6636] hover:text-[#FF6636] transition-colors">
                Login
              </Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)} className="text-center py-2.5 text-sm font-bold bg-[#FF6636] text-white hover:bg-[#e85520] transition-colors">
                Create Account
              </Link>
            </div>
          ) : (
            <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors mt-2 border-t border-gray-100 dark:border-gray-700">
              <FiLogOut /> Log Out
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
