"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@heroui/react";
import { ShoppingBag, Heart } from "lucide-react";

const FEATURED_BOOKS = [
  {
    id: 1,
    format: "KINDLE EDITION",
    title: "Think Like a Monk: Train Your Mind for...",
    author: "Jay Shetty",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    price: "$15.99",
  },
  {
    id: 2,
    format: "KINDLE",
    title: "Fever: A Novel",
    author: "Mary Beth Keane",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
    price: "$5.31",
  },
  {
    id: 3,
    format: "KINDLE",
    title: "Open Book: A Memoir",
    author: "Jessica Simpson",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
    price: "$10.35",
  },
  {
    id: 4,
    format: "HARDCOVER",
    title: "The Last Sister (Columbia River Book 1)",
    author: "Jessica Simpson, Max Lu...",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
    price: "$16.59",
  },
  {
    id: 5,
    format: "KINDLE EDITION",
    title: "Where the Crawdads Sing",
    author: "Kelly Harms",
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    price: "$37.00",
    originalPrice: "$78.00",
  },
  {
    id: 6,
    format: "KINDLE EDITION",
    title: "Think Like a Monk: Train Your Mind for...",
    author: "Anna Burns",
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop",
    price: "$56.00",
  },
  {
    id: 7,
    format: "HARDCOVER",
    title: "The Rural Diaries: Love, Livestock, and Big Lif...",
    author: "Hilarie Burton",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
    price: "$14.82",
  },
  {
    id: 8,
    format: "PAPERBACK",
    title: "The Warhol Incident",
    author: "G.K. Parks",
    coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop",
    price: "$14.99",
  },
  {
    id: 9,
    format: "HARDCOVER, KINDLE, PAPER...",
    title: "The Overdue Life of Amy Byler",
    author: "Douglas Kennedy, Jessic...",
    coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop",
    price: "$29.95 - $59.95",
  },
  {
    id: 10,
    format: "HARDCOVER",
    title: "Dark in Death: An Eve Dallas Novel (In Death...",
    author: "J. D. Robb",
    coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600&auto=format&fit=crop",
    price: "$14.20",
  },
  {
    id: 11,
    format: "HARDCOVER",
    title: "The Rural Diaries: Love, Livestock, and Big Lif...",
    author: "Hilarie Burton",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    price: "$14.82",
  },
  {
    id: 12,
    format: "HARDCOVER, KINDLE, PAPER...",
    title: "Isabelle in the Afternoon",
    author: "Douglas Kennedy",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
    price: "$29.95 - $59.95",
  },
];

const TABS = [
  { id: "featured", label: "Featured" },
  { id: "onsale", label: "On Sale" },
  { id: "viewed", label: "Most Viewed" },
];

export default function BooksCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("viewed");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 bg-white min-h-screen">
      {/* Title Header */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
        Featured Books
      </h2>

      {/* Clean Tab Navigation Bar */}
      <div className="flex justify-center items-center gap-8 mb-8">
        {TABS.map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={`relative pb-2 text-sm font-semibold transition-colors duration-200 outline-none focus:outline-none whitespace-nowrap ${
                isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}

              {/* Red Underline Bar */}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Grid Layout (6 Columns on Desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-t border-l border-gray-200">
        {FEATURED_BOOKS.map((item) => (
          <BookCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function BookCard({ item }) {
  return (
    <Card className="group relative bg-white p-4 rounded-none border-b border-r border-gray-200 shadow-none transition-all duration-200 hover:border-gray-900 hover:shadow-lg hover:z-10 flex flex-col justify-between h-full">
      <Card.Content className="p-0 flex flex-col justify-between h-full">
        {/* Book Cover Image */}
        <div className="relative w-full aspect-[3/4] mb-3 flex items-center justify-center overflow-hidden bg-gray-50">
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          />
        </div>

        {/* Content Container */}
        <div className="flex flex-col items-start w-full mt-auto text-left">
          {/* Format Badge in RED */}
          <span className="text-[10px] text-red-500 font-medium tracking-wider uppercase mb-1">
            {item.format}
          </span>

          {/* Book Title */}
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 h-8 sm:h-9 mb-2 leading-snug">
            {item.title}
          </h3>

          {/* Author */}
          <p className="text-xs text-gray-400 truncate w-full mb-3">
            {item.author}
          </p>

          {/* Price & Hover Action Icons */}
          <div className="flex items-center justify-between w-full pt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-900 font-bold text-sm sm:text-base">
                {item.price}
              </span>
              {item.originalPrice && (
                <span className="text-gray-400 line-through text-xs">
                  {item.originalPrice}
                </span>
              )}
            </div>

            {/* Hover Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                type="button"
                aria-label="Add to cart"
                className="text-gray-600 hover:text-red-600 transition-colors p-0.5"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Add to wishlist"
                className="text-gray-600 hover:text-red-600 transition-colors p-0.5"
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}