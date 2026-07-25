"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Heart } from "lucide-react";

const BOOKS_DATA = {
  Featured: [
    {
      id: 1,
      format: "KINDLE EDITION",
      title: "Think Like a Monk: Train Your Mind for...",
      author: "Jay Shetty",
      price: "$15.99",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      format: "KINDLE",
      title: "Fever: A Novel",
      author: "Mary Beth Keane",
      price: "$5.31",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      format: "KINDLE",
      title: "Open Book: A Memoir",
      author: "Jessica Simpson",
      price: "$10.35",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      format: "HARDCOVER",
      title: "The Last Sister (Columbia River Book 1)",
      author: "Jessica Simpson, Max Lu...",
      price: "$16.59",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 5,
      format: "KINDLE EDITION",
      title: "Where the Crawdads Sing",
      author: "Kelly Harms",
      price: "$37.00",
      originalPrice: "$78.00",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 6,
      format: "KINDLE EDITION",
      title: "Think Like a Monk: Train Your Mind for...",
      author: "Anna Burns",
      price: "$56.00",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 7,
      format: "HARDCOVER",
      title: "The Rural Diaries: Love, Livestock, and Big Lif...",
      author: "Hilarie Burton",
      price: "$14.82",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 8,
      format: "PAPERBACK",
      title: "The Warhol Incident",
      author: "G.K. Parks",
      price: "$14.99",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 9,
      format: "HARDCOVER, KINDLE, PAPER...",
      title: "The Overdue Life of Amy Byler",
      author: "Douglas Kennedy, Jessic...",
      price: "$29.95 – $59.95",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 10,
      format: "HARDCOVER",
      title: "Dark in Death: An Eve Dallas Novel (In Death...",
      author: "J. D. Robb",
      price: "$14.20",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 11,
      format: "HARDCOVER",
      title: "The Rural Diaries: Love, Livestock, and Big Lif...",
      author: "Hilarie Burton",
      price: "$14.82",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 12,
      format: "HARDCOVER, KINDLE, PAPER...",
      title: "Isabelle in the Afternoon",
      author: "Douglas Kennedy",
      price: "$29.95 – $59.95",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
    },
  ],
  "On Sale": [],
  "Most Viewed": [],
};

// Populate On Sale and Most Viewed tabs with fallback items so tabs work properly
BOOKS_DATA["On Sale"] = [...BOOKS_DATA.Featured].reverse();
BOOKS_DATA["Most Viewed"] = [
  ...BOOKS_DATA.Featured.slice(2),
  ...BOOKS_DATA.Featured.slice(0, 2),
];

export default function BooksCatalog() {
  const [activeTab, setActiveTab] = useState("Most Viewed");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (book, e) => {
    e.stopPropagation();
    setCart((prev) => [...prev, book]);
    alert(`Added "${book.title}" to cart!`);
  };

  const handleToggleWishlist = (book, e) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(book.id)
        ? prev.filter((id) => id !== book.id)
        : [...prev, book.id]
    );
  };

  const currentBooks = BOOKS_DATA[activeTab] || BOOKS_DATA.Featured;

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 py-12 bg-white">
      {/* Centered Heading */}
      <h2 className="text-2xl sm:text-3xl font-normal text-center text-gray-900 mb-6">
        Featured Books
      </h2>

      {/* Tabs Row */}
      <div className="flex justify-center items-center gap-8 mb-8">
        {["Featured", "On Sale", "Most Viewed"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`text-xs sm:text-sm font-semibold transition-all cursor-pointer relative pb-1 ${
              activeTab === tab
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 6-Column Grid x 2 Rows Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 border-t border-l border-gray-200">
        {currentBooks.map((book) => {
          const isWishlisted = wishlist.includes(book.id);

          return (
            <div
              key={book.id}
              className="group relative bg-white p-4 border-r border-b border-gray-200 flex flex-col justify-between transition-all duration-150 hover:shadow-xl hover:border-gray-900 hover:z-20 cursor-pointer"
            >
              {/* Top Image Box */}
              <div className="relative w-full aspect-[2/3] mb-4 flex items-center justify-center overflow-hidden">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                />
              </div>

              {/* Bottom Information */}
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-red-400 font-medium tracking-wide uppercase mb-1">
                  {book.format}
                </span>

                <h3 className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2 h-8 mb-2">
                  {book.title}
                </h3>

                <p className="text-[11px] text-gray-400 truncate mb-2">
                  {book.author}
                </p>

                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-sm font-bold text-gray-900">
                    {book.price}
                  </span>
                  {book.originalPrice && (
                    <span className="text-xs text-gray-300 line-through">
                      {book.originalPrice}
                    </span>
                  )}
                </div>

                {/* Footer Action Icons */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(book, e)}
                    aria-label="Add to cart"
                    className="text-gray-600 hover:text-gray-900 transition-colors p-1 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleToggleWishlist(book, e)}
                    aria-label="Add to wishlist"
                    className={`transition-colors p-1 cursor-pointer ${
                      isWishlisted
                        ? "text-red-500 fill-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 stroke-[1.5] ${
                        isWishlisted ? "fill-current text-red-500" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}