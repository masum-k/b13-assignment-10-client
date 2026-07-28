"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@heroui/react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BESTSELLING_BOOKS = [
  {
    id: 1,
    format: "HARDCOVER, KINDLE, PAPERBACK",
    title: "The Last Sister (Columbia River Book 1)",
    author: "Conn Iggulden",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    price: "$29.59 – $59.95",
  },
  {
    id: 2,
    format: "HARDCOVER",
    title: "The Last Sister (Columbia River Book 1)",
    author: "Jessica Simpson, Max Lucado",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
    price: "$16.59",
  },
  {
    id: 3,
    format: "KINDLE",
    title: "Think Like a Monk: Train Your Mind for Peace and...",
    author: "Luanne Rice",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
    price: "$1.75",
  },
  {
    id: 4,
    format: "KINDLE",
    title: "Under a Firefly Moon (Firefly Lake Book 1)",
    author: "Donna Kauffman",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
    price: "$7.67",
  },
  {
    id: 5,
    format: "KINDLE",
    title: "Zombie Theorem: Dark Times Book Five",
    author: "James Wallace",
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    price: "$2.68",
  },
  {
    id: 6,
    format: "PAPERBACK",
    title: "A Million Little Pieces",
    author: "James Frey",
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop",
    price: "$12.99",
  },
  {
    id: 7,
    format: "HARDCOVER",
    title: "The Rural Diaries",
    author: "Hilarie Burton",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
    price: "$14.82",
  },
];

export default function BestSellingBooks() {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-white">
      {/* Header */}
      <div className="relative flex items-center justify-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center">
          Bestselling Books
        </h2>

        <Link
          href="/shop"
          className="absolute right-0 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
        >
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Slider Container */}
      <div className="relative flex items-center gap-3">
        {/* Left Nav Button */}
        <button
          type="button"
          onClick={() => swiperInstance?.slidePrev()}
          aria-label="Previous books"
          className="flex-shrink-0 w-8 h-10 border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-500 transition-colors bg-white z-10 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Swiper Track */}
        <div className="flex-1 overflow-hidden border-t border-l border-gray-200">
          <Swiper
            onSwiper={setSwiperInstance}
            spaceBetween={0}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className="w-full"
          >
            {BESTSELLING_BOOKS.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <BookCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Nav Button */}
        <button
          type="button"
          onClick={() => swiperInstance?.slideNext()}
          aria-label="Next books"
          className="flex-shrink-0 w-8 h-10 border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-500 transition-colors bg-white z-10 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function BookCard({ item }) {
  return (
    <Card className="group relative bg-white p-4 rounded-none border-b border-r border-gray-200 shadow-none transition-all duration-200 hover:border-gray-900 hover:shadow-lg hover:z-10 flex flex-col justify-between h-full">
      <Card.Content className="p-0 flex flex-col justify-between h-full">
        <Link href={`/books/${item.id}`} className="block flex-1 flex flex-col justify-between">
          {/* Book Cover Image */}
          <div className="relative w-full aspect-[3/4] mb-4 flex items-center justify-center overflow-hidden bg-gray-50">
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            />
          </div>

          {/* Book Details */}
          <div className="flex flex-col items-start w-full text-left">
            <span className="text-[10px] text-red-500 font-medium tracking-wider uppercase mb-1">
              {item.format}
            </span>

            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 h-8 sm:h-9 mb-1 leading-snug group-hover:text-red-500 transition-colors">
              {item.title}
            </h3>

            <p className="text-xs text-gray-400 truncate w-full mb-3">
              {item.author}
            </p>

            <span className="text-gray-900 font-bold text-sm mb-2">
              {item.price}
            </span>
          </div>
        </Link>
      </Card.Content>
    </Card>
  );
}