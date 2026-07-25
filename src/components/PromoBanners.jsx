"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function PromoBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* --- LEFT BANNER: BOOK AVAILABLE WORLDWIDE --- */}
        <div className="relative bg-linear-to-r from-[#ffe1a8] via-[#ffd693] to-[#fbc878] rounded-sm p-4 sm:p-6 flex items-center justify-between overflow-hidden min-h-40 sm:min-h-45">
          
          {/* Left Graphic: Book Spines */}
          <div className="relative w-16 sm:w-20 h-32 sm:h-36 shrink-0 hidden xs:block drop-shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=200"
              alt="Book Spines"
              fill
              sizes="100px"
              className="object-cover rounded-l-sm"
            />
          </div>

          {/* Center Content */}
          <div className="flex-1 text-center px-2 sm:px-4 z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              The Book
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 italic mt-0.5 mb-3 font-medium">
              Available Worldwide
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#7a1c22] hover:bg-[#60141a] text-white font-semibold text-xs sm:text-sm px-5 py-2 rounded-sm shadow-sm transition-colors duration-200"
            >
              Shop Now
            </Link>
          </div>

          {/* Right Graphic: Book Showcase */}
          <div className="relative w-28 sm:w-36 h-32 sm:h-40 shrink-0 drop-shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300"
              alt="Hand holding book"
              fill
              sizes="150px"
              className="object-cover rounded-sm"
            />
          </div>
        </div>

        {/* --- RIGHT BANNER: SALE DISCOUNT BADGE --- */}
        <div className="bg-[#cc001b] rounded-sm p-3 sm:p-4 flex items-center justify-between gap-2 overflow-hidden min-h-40 sm:min-h-45">
          
          {/* Left Side: Bold SALE Text */}
          <div className="flex-1 text-center sm:text-left pl-2 sm:pl-6">
            <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-widest uppercase leading-none">
              SALE
            </span>
          </div>

          {/* Right Side: White Discount Badge with Pointer Arrow */}
          <div className="relative bg-white rounded-sm px-4 sm:px-8 py-4 sm:py-6 flex flex-col items-center justify-center shrink-0 min-w-37.5 sm:min-w-52.5 shadow-md">
            
            {/* Pointer Triangle Arrow facing Left */}
            <div 
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-y-10 border-y-transparent border-r-12 border-r-white"
              aria-hidden="true"
            />

            <span className="text-[10px] sm:text-xs font-bold text-[#800000] uppercase tracking-wider mb-0.5">
              UP TO
            </span>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-5xl font-black text-[#cc001b] leading-none">
                40%
              </span>
              <span className="text-xs sm:text-base font-bold text-[#800000] uppercase">
                OFF
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}