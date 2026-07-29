"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Truck, RotateCcw, CreditCard, LifeBuoy } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const SLIDER_DATA = [
  {
    id: 1,
    subTitle: "Book Mockup",
    title: "HARDCOVER.",
    description: "Cover up front of book and leave summary",
    buttonText: "Shopping Now",
    buttonLink: "/shop",
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    subTitle: "Exclusive Release",
    title: "PAPERBACK.",
    description: "Discover curated stories delivered to your doorstep",
    buttonText: "Browse Books",
    buttonLink: "/shop",
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    subTitle: "New Arrival",
    title: "AUDIOBOOKS.",
    description: "Listen to your favorite authors anywhere, anytime",
    buttonText: "Listen Now",
    buttonLink: "/shop",
    coverImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600",
  },
];

const RIGHT_FEATURED_BOOKS = [
  {
    id: 1,
    publisher: "Amazona",
    title: "De Vengeance - J.D Kurtness",
    price: "$18.99",
    originalPrice: "$19.99",
    discount: "-50%",
    coverImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 2,
    publisher: "Amazona",
    title: "Coyote Tales - Thomas King",
    price: "$13.99",
    originalPrice: "$19.99",
    discount: "-50%",
    coverImage:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 3,
    publisher: "Amazona",
    title: "Fred The Lonely Monster - Anne",
    price: "$15.99",
    originalPrice: "$19.99",
    discount: "-50%",
    coverImage:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200",
  },
];

const FEATURES = [
  {
    id: 1,
    title: "Free Shipping Item",
    subTitle: "Orders over $500",
    icon: Truck,
  },
  {
    id: 2,
    title: "Money Back Guarantee",
    subTitle: "100% money back",
    icon: RotateCcw,
  },
  {
    id: 3,
    title: "Cash On Delivery",
    subTitle: "Lorem ipsum dolor amet",
    icon: CreditCard,
  },
  {
    id: 4,
    title: "Help & Support",
    subTitle: "Call us : + 0123.4567.89",
    icon: LifeBuoy,
  },
];

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        <div className="lg:col-span-8 bg-[#f5f5f5] rounded-sm relative overflow-hidden flex items-center min-h-80 sm:min-h-95">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              el: ".custom-swiper-pagination",
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="w-full h-full custom-swiper"
          >
            {SLIDER_DATA.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="p-6 sm:p-10 md:p-12 flex flex-col-reverse sm:flex-row items-center justify-between gap-6 h-full">
                  <div className="flex-1 space-y-2 sm:space-y-3 z-10 text-center sm:text-left">
                    <span className="text-rose-600 font-medium text-base sm:text-lg block">
                      {slide.subTitle}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
                      {slide.title}
                    </h1>
                    <p className="text-gray-500 italic text-base sm:text-xl font-light max-w-sm mx-auto sm:mx-0 pt-1">
                      {slide.description}
                    </p>
                    <div className="pt-3 sm:pt-4">
                      <Link
                        href={slide.buttonLink}
                        className="inline-block border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors duration-200 font-bold text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-2.5 rounded-sm"
                      >
                        {slide.buttonText}
                      </Link>
                    </div>
                  </div>

                  <div className="relative w-36 h-48 sm:w-48 sm:h-64 md:w-56 md:h-72 shrink-0 drop-shadow-2xl">
                    <Image
                      src={slide.coverImage}
                      alt={slide.title}
                      fill
                      priority
                      sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 300px"
                      className="object-cover rounded-r-md rounded-l-sm"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-swiper-pagination absolute bottom-3 sm:bottom-4 left-1/2 sm:left-2/3 -translate-x-1/2 z-20 flex items-center justify-center w-auto!" />
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
          {RIGHT_FEATURED_BOOKS.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="bg-white border border-gray-100 rounded-sm p-3 sm:p-3.5 flex items-center gap-3 sm:gap-4 hover:shadow-sm transition-shadow duration-200 group"
            >
              <div className="relative w-14 h-18 sm:w-16 sm:h-20 shrink-0 bg-gray-50 border border-gray-200 rounded-sm overflow-hidden">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  sizes="100px"
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[11px] sm:text-xs text-gray-400 block font-normal">
                  {book.publisher}
                </span>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-rose-600 transition-colors truncate mt-0.5">
                  {book.title}
                </h3>

                <div className="flex items-center gap-2 mt-1.5 sm:mt-2">
                  <span className="text-rose-600 font-bold text-xs sm:text-sm">
                    {book.price}
                  </span>
                  <span className="text-[11px] sm:text-xs text-gray-400 line-through">
                    {book.originalPrice}
                  </span>
                  <span className="bg-rose-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-sm ml-auto">
                    {book.discount}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
        {FEATURES.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-sm p-3.5 sm:p-4 flex items-center gap-3.5"
            >
              <div className="bg-rose-600 text-white p-2.5 rounded-sm shrink-0">
                <IconComponent className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-400 truncate">
                  {item.subTitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}