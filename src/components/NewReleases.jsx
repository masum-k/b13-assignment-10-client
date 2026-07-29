"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@heroui/react";
import { Heart } from "lucide-react";

const CATEGORIES = [
  { id: "history", label: "History" },
  { id: "science", label: "Science & Math" },
  { id: "romance", label: "Romance" },
  { id: "travel", label: "Travel" },
];

const NEW_RELEASES_DATA = {
  travel: [
    {
      id: 1,
      format: "KINDLE EDITION",
      title: "Where the Crawdads Sing",
      author: "Kelly Harms",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
      price: "$37.00",
      originalPrice: "$78.00",
    },
    {
      id: 2,
      format: "HARDCOVER, KINDLE, PAPER...",
      title: "Empire of Silver",
      author: "Conn Iggulden",
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
      price: "$29.59 – $59.95",
    },
    {
      id: 3,
      format: "HARDCOVER, KINDLE, PAPER...",
      title: "All You Can Ever Know: A Memoir",
      author: "Conn Iggulden",
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
      price: "$29.59 – $59.95",
    },
    {
      id: 4,
      format: "PAPERBACK",
      title: "Ask Again, Yes: A Novel",
      author: "Mary Beth Keane",
      coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
      price: "$11.51",
    },
    {
      id: 5,
      format: "KINDLE",
      title: "Her: A Psychological Thriller",
      author: "Britney King",
      coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
      price: "$4.78",
    },
    {
      id: 6,
      format: "HARDCOVER, KINDLE, PAPER...",
      title: "The Stellenbosch Mafia: Inside the...",
      author: "Pieter du Toit",
      coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop",
      price: "$29.95 – $59.95",
    },
    {
      id: 7,
      format: "KINDLE EDITION",
      title: "Under a Firefly Moon (Firefly Lake Book 1)",
      author: "Nora Roberts",
      coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
      price: "$99.00",
    },
    {
      id: 8,
      format: "KINDLE",
      title: "Next Level Basic: The Definitive Basic Bitch...",
      author: "Stassi Schroeder",
      coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop",
      price: "$4.72",
      originalPrice: "$9.99",
    },
  ],
  history: [
    {
      id: 101,
      format: "HARDCOVER",
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      coverImage: "https://images.unsplash.com/photo-1510172951991-856a654063f9?q=80&w=600&auto=format&fit=crop",
      price: "$24.99",
    },
    {
      id: 102,
      format: "PAPERBACK",
      title: "Guns, Germs, and Steel",
      author: "Jared Diamond",
      coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop",
      price: "$18.50",
    },
  ],
  science: [
    {
      id: 201,
      format: "KINDLE EDITION",
      title: "Astrophysics for People in a Hurry",
      author: "Neil deGrasse Tyson",
      coverImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=600&auto=format&fit=crop",
      price: "$9.99",
    },
  ],
  romance: [
    {
      id: 301,
      format: "PAPERBACK",
      title: "It Ends with Us",
      author: "Colleen Hoover",
      coverImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop",
      price: "$12.80",
    },
  ],
};

export default function NewReleases() {
  const [selectedCategory, setSelectedCategory] = useState("travel");
  const activeBooks = NEW_RELEASES_DATA[selectedCategory] || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          New Releases
        </h2>

        <div className="flex items-center gap-8 self-end sm:self-auto">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative pb-2 text-sm font-semibold transition-colors duration-200 cursor-pointer outline-none ${
                  isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {cat.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 border border-gray-200">
        <div className="lg:col-span-1 bg-[#fff5f5] p-6 sm:p-8 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-gray-200">
          <div className="relative w-44 h-44 mb-6 flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"
              alt="Promo Books"
              fill
              className="object-contain drop-shadow-md"
              sizes="176px"
            />
          </div>

          <p className="text-gray-800 text-2xl font-light leading-tight mb-1">
            Get Extra
          </p>
          <h3 className="text-3xl sm:text-4xl font-bold text-rose-600 mb-2">
            Sale -25%
          </h3>
          <p className="text-xs sm:text-sm font-medium tracking-wide text-gray-400 uppercase mb-8">
            ON ORDER OVER $100
          </p>

          <Link
            href="/shop"
            className="w-full max-w-40 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-medium text-xs sm:text-sm py-2.5 px-4 transition-colors duration-200 rounded-none shadow-sm text-center block"
          >
            View More
          </Link>
        </div>

        <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 min-h-100">
          {activeBooks.map((item) => (
            <BookCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BookCard({ item }) {
  return (
    <Card className="group relative bg-white p-4 sm:p-5 rounded-none border-b border-r border-gray-200 shadow-none transition-all duration-200 hover:border-gray-900 hover:shadow-lg hover:z-10 flex flex-col justify-between h-full">
      <Card.Content className="p-0 flex flex-col justify-between h-full">
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

          <div className="flex flex-col items-start w-full mt-auto text-left">
            <span className="text-[10px] text-rose-600 font-medium tracking-wider uppercase mb-1">
              {item.format}
            </span>

            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 h-8 sm:h-9 mb-1 leading-snug group-hover:text-rose-600 transition-colors">
              {item.title}
            </h3>

            <p className="text-xs text-gray-400 truncate w-full mb-3">
              {item.author}
            </p>

            <div className="flex items-center gap-1.5 w-full mb-2">
              <span className="text-gray-900 font-bold text-sm">
                {item.price}
              </span>
              {item.originalPrice && (
                <span className="text-gray-400 line-through text-xs">
                  {item.originalPrice}
                </span>
              )}
            </div>
          </div>
        </Link>

        <div className="w-full pt-1">
          <div className="hidden group-hover:flex items-center justify-between w-full pt-1 border-t border-gray-100">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Added ${item.title} to cart`);
              }}
              className="text-[11px] font-bold tracking-wider text-gray-900 hover:text-rose-600 transition-colors uppercase cursor-pointer"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Added ${item.title} to wishlist`);
              }}
              aria-label="Add to wishlist"
              className="text-gray-600 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}