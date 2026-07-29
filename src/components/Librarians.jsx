"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const TOP_LIBRARIANS = [
  {
    id: 1,
    name: "Eleanor Vance",
    role: "Chief Archival Librarian",
    booksManaged: "1,240 Books Managed",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Marcus Holloway",
    role: "Head of Collections",
    booksManaged: "3,150 Books Managed",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Clara Oswald",
    role: "Digital Catalog Specialist",
    booksManaged: "890 Books Managed",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Arthur Pendelton",
    role: "Rare Manuscripts Custodian",
    booksManaged: "450 Rare Volumes",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Sophia Martinez",
    role: "Children's Literature Curator",
    booksManaged: "2,100 Books Managed",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "David Chen",
    role: "Research & Reference Lead",
    booksManaged: "1,820 Books Managed",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Beatrix Potter",
    role: "Senior Cataloger",
    booksManaged: "2,840 Books Managed",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop",
  },
];

export default function Librarians() {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-white font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl text-center sm:text-3xl font-semibold text-gray-900">
          Top Librarians
        </h2>
      </div>

      {/* Slider Controls & Track */}
      <div className="relative flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => swiperInstance?.slidePrev()}
          aria-label="Previous librarians"
          className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-500 transition-colors bg-white z-10 cursor-pointer shadow-sm"
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
            {TOP_LIBRARIANS.map((librarian) => (
              <SwiperSlide key={librarian.id}>
                <div className="flex flex-col items-center text-center group cursor-pointer py-2">
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden mb-4 bg-gray-100 shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                    <Image
                      src={librarian.image}
                      alt={librarian.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 112px, 144px"
                    />
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-rose-600 transition-colors mb-0.5">
                    {librarian.name}
                  </h3>

                  <p className="text-[11px] font-medium text-rose-600 tracking-wide uppercase mb-0.5">
                    {librarian.role}
                  </p>

                  <p className="text-xs text-gray-400 font-normal">
                    {librarian.booksManaged}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          type="button"
          onClick={() => swiperInstance?.slideNext()}
          aria-label="Next librarians"
          className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-500 transition-colors bg-white z-10 cursor-pointer shadow-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}