"use client";

import TutorCard from "@/components/TutorCard";
import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

export default function TutorsClient({ initialTutors = [] }) {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tutors, setTutors] = useState(initialTutors);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);

  // Debounced suggestion fetching
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://medique-server.vercel.app";
        const res = await fetch(`${apiUrl}/tutors?search=${search}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          // Extract unique tutor names or subjects for suggestions
          const uniqueSuggestions = Array.from(new Set(data.map(t => t.tutorName))).slice(0, 8);
          setSuggestions(uniqueSuggestions);
        }
      } catch (e) {
        console.error(e);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);

  // Debounced main search results fetching
  useEffect(() => {
    const performLiveSearch = async () => {
      // Don't search if it's too short (optional, but keep it consistent with suggestions)
      // Actually, for the main list, we might want to allow empty search to show all.
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (startDate) params.set("startDate", startDate);
        if (endDate) params.set("endDate", endDate);
        const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://medique-server.vercel.app";
        const res = await fetch(`${apiUrl}/tutors?${params.toString()}`, { cache: "no-store" });
        if (res.ok) setTutors(await res.json());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(performLiveSearch, 500); // 500ms for main results to avoid flickering
    return () => clearTimeout(timeoutId);
  }, [search, startDate, endDate]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/tutors?${params.toString()}`, { cache: "no-store" });
      if (res.ok) setTutors(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/tutors`, { cache: "no-store" });
      if (res.ok) setTutors(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#1D2026]">

      {/* Page Header */}
      <div className="bg-[#1D2026] px-4 md:px-8 py-12">
        <div className="w-[85%] max-w-[1920px] mx-auto">
          <p className="text-[#FF6636] text-sm font-bold uppercase tracking-widest mb-2">Our Tutors</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Browse Expert Tutors</h1>
          <p className="text-gray-400 text-sm">
            Find the perfect tutor to help you achieve your learning goals.
          </p>
        </div>
      </div>

      <div className="w-[85%] max-w-[1920px] mx-auto px-4 md:px-0 py-10">

        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-3 mb-10 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          {/* Search Input */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E7485] text-base" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                  setShowSuggestions(false);
                }
              }}
              placeholder="Search by tutor name or subject..."
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#1D2026] dark:text-white pl-10 pr-4 py-3 text-sm outline-none focus:border-[#FF6636] transition-colors"
            />
            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div 
                ref={suggestionRef}
                className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#1D2026] border border-gray-200 dark:border-gray-700 shadow-xl z-50 overflow-hidden"
              >
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearch(suggestion);
                      setShowSuggestions(false);
                      // Trigger search immediately
                      const params = new URLSearchParams();
                      params.set("search", suggestion);
                      if (startDate) params.set("startDate", startDate);
                      if (endDate) params.set("endDate", endDate);
                      setLoading(true);
                      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://medique-server.vercel.app";
                      fetch(`${apiUrl}/tutors?${params.toString()}`)
                        .then(res => res.json())
                        .then(data => {
                          setTutors(data);
                          setLoading(false);
                        });
                    }}
                    className="w-full text-left px-10 py-2.5 text-sm text-[#4E5566] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#FF6636] transition-colors flex items-center gap-2"
                  >
                    <FiSearch className="text-gray-400 text-xs" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3">
              <FiFilter className="text-[#6E7485] text-sm shrink-0" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent py-3 text-sm text-[#1D2026] dark:text-white outline-none"
                title="Start Date"
              />
              <span className="text-[#6E7485] text-xs font-bold">TO</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent py-3 text-sm text-[#1D2026] dark:text-white outline-none"
                title="End Date"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="flex-1 sm:flex-none bg-[#FF6636] hover:bg-[#e85520] disabled:opacity-60 text-white text-sm font-bold px-6 py-3 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" /> : <><FiSearch /> Find Tutors</>}
              </button>
              <button
                onClick={handleReset}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#1D2026] dark:text-white text-sm font-bold px-4 py-3 hover:border-[#FF6636] hover:text-[#FF6636] transition-colors flex items-center gap-1"
              >
                <FiX /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        {!loading && tutors.length > 0 && (
          <p className="text-sm text-[#6E7485] dark:text-gray-400 mb-6 font-semibold">
            Showing <span className="text-[#1D2026] dark:text-white font-bold">{tutors.length}</span> tutors
          </p>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-10 border-4 border-[#FF6636]/20 border-t-[#FF6636] animate-spin" />
            <p className="text-[#6E7485] dark:text-gray-400 text-sm font-semibold">Searching tutors...</p>
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <FiSearch className="text-[#6E7485] text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-[#1D2026] dark:text-white mb-2">No tutors found</h3>
            <p className="text-[#6E7485] dark:text-gray-400 text-sm mb-6">Try adjusting your search or filters to find more results.</p>
            <button
              onClick={handleReset}
              className="bg-[#FF6636] text-white text-sm font-bold px-6 py-3 hover:bg-[#e85520] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {tutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}