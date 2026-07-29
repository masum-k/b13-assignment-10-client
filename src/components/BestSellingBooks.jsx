"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card} from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const BESTSELLING_BOOKS = [
  {
    id: 1,
    format: "HARDCOVER, KINDLE, PAPERBACK",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    price: "$11.98 – $27.00",
  },
  {
    id: 2,
    format: "HARDCOVER",
    title: "The Midnight Library",
    author: "Matt Haig",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg",
    price: "$13.29",
  },
  {
    id: 3,
    format: "KINDLE",
    title: "Think Like a Monk",
    author: "Jay Shetty",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781982134488-L.jpg",
    price: "$14.99",
  },
  {
    id: 4,
    format: "KINDLE",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780735219090-L.jpg",
    price: "$9.99",
  },
  {
    id: 5,
    format: "KINDLE",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg",
    price: "$12.99",
  },
  {
    id: 6,
    format: "PAPERBACK",
    title: "It Starts with Us",
    author: "Colleen Hoover",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781668001226-L.jpg",
    price: "$10.43",
  },
  {
    id: 7,
    format: "HARDCOVER",
    title: "Educated",
    author: "Tara Westover",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg",
    price: "$14.82",
  },
];

export default function BestSellingBooks() {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-white">
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

      <div className="relative flex items-center gap-3">
        <button
          type="button"
          onClick={() => swiperInstance?.slidePrev()}
          aria-label="Previous books"
          className="shrink-0 w-8 h-10 border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-500 transition-colors bg-white z-10 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

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

        <button
          type="button"
          onClick={() => swiperInstance?.slideNext()}
          aria-label="Next books"
          className="shrink-0 w-8 h-10 border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-500 transition-colors bg-white z-10 cursor-pointer"
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
      <Card className="p-0 flex flex-col justify-between h-full">
        <Link href={`/books/${item.id}`} className="flex-1 flex flex-col justify-between">
          <div className="relative w-full aspect-3/4 mb-4 flex items-center justify-center overflow-hidden bg-gray-50">
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            />
          </div>

          <div className="flex flex-col items-start w-full text-left">
            <span className="text-[10px] text-rose-600 font-medium tracking-wider uppercase mb-1">
              {item.format}
            </span>

            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 h-8 sm:h-9 mb-1 leading-snug group-hover:text-rose-600 transition-colors">
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
      </Card>
    </Card>
  );
}