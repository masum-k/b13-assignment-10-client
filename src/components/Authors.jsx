"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const FAVORITE_AUTHORS = [
  {
    id: 1,
    name: "Andre Aciman",
    booksCount: "2 Published Books",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Anna Banks",
    booksCount: "6 Published Books",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Anna Burns",
    booksCount: "2 Published Books",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Ashlee Vance",
    booksCount: "2 Published Books",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Barbara O'Neal",
    booksCount: "1 Published Books",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "A G Riddle",
    booksCount: "3 Published Books",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Neil Gaiman",
    booksCount: "8 Published Books",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
  },
];

export default function Authors() {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl text-center sm:text-3xl font-semibold text-gray-900">
          Favorite Authors
        </h2>
      </div>

      {/* Slider Controls & Track */}
      <div className="relative flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => swiperInstance?.slidePrev()}
          aria-label="Previous authors"
          className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-500 transition-colors bg-white z-10 cursor-pointer shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 overflow-hidden">
          <Swiper
            onSwiper={setSwiperInstance}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              480: { slidesPerView: 3, spaceBetween: 24 },
              768: { slidesPerView: 4, spaceBetween: 28 },
              1024: { slidesPerView: 5, spaceBetween: 32 },
            }}
            className="w-full"
          >
            {FAVORITE_AUTHORS.map((author) => (
              <SwiperSlide key={author.id}>
                <div className="flex flex-col items-center text-center group cursor-pointer py-2">
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden mb-4 bg-gray-100 shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                    <Image
                      src={author.image}
                      alt={author.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 112px, 144px"
                    />
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-red-500 transition-colors mb-0.5">
                    {author.name}
                  </h3>

                  <p className="text-xs text-gray-400 font-normal">
                    {author.booksCount}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          type="button"
          onClick={() => swiperInstance?.slideNext()}
          aria-label="Next authors"
          className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-500 transition-colors bg-white z-10 cursor-pointer shadow-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}