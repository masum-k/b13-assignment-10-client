"use client";

import React from "react";
import Image from "next/image";

export default function Offer () {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="relative w-full overflow-hidden bg-[#f8f8f8] min-h-[220px] sm:min-h-[280px] flex items-center">
        {/* Background Image Container */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1600&auto=format&fit=crop"
            alt="Promotional books background"
            fill
            className="object-cover object-right opacity-90"
            priority
          />
          {/* Left-to-right subtle white fade gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8f8f8] via-[#f8f8f8]/80 to-transparent w-full md:w-3/4" />
        </div>
 
 
        {/* Text Content */}
        <div className="relative z-10 px-8 sm:px-16 py-8 max-w-xl text-left">
          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
            Buy 3. Get Free 1.
          </h2>

          {/* Subtitle with Italic Styling */}
          <p className="text-base sm:text-xl font-normal italic text-gray-600 mb-6">
            50% off for selected products in Smartbook.
          </p>

          {/* Outline Action Button */}
          <button
            type="button"
            onClick={() => alert("Redirecting to offer products...")}
            className="inline-block border border-red-400 text-red-500 hover:bg-red-500 hover:text-white font-medium text-xs sm:text-sm px-6 py-2.5 transition-colors duration-200 cursor-pointer bg-white/80 backdrop-blur-sm"
          >
            See More
          </button>
        </div>
      </div>
    </section>
  );
}