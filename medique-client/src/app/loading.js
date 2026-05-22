import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#1D2026]">
      <div className="relative flex flex-col items-center">
        {/* Animated Box Loader */}
        <div className="relative w-16 h-16 mb-8 group">
           <div className="absolute inset-0 border-4 border-[#FF6636]/20" />
           <div className="absolute inset-0 border-4 border-[#FF6636] border-t-transparent animate-spin" />
           <div className="absolute inset-[30%] bg-[#FF6636] animate-pulse" />
        </div>
        
        {/* Logo Text */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase">
            Medi<span className="text-[#FF6636]">Que</span>
          </h2>
          <div className="mt-4 flex items-center gap-2">
             <div className="w-1 h-1 bg-[#FF6636] animate-bounce [animation-delay:-0.3s]" />
             <div className="w-1 h-1 bg-[#FF6636] animate-bounce [animation-delay:-0.15s]" />
             <div className="w-1 h-1 bg-[#FF6636] animate-bounce" />
             <p className="text-gray-500 font-bold tracking-[0.2em] text-[10px] uppercase ml-2">
               Initializing Platform
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
