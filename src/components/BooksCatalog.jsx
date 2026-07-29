"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";

const FEATURED_BOOKS = [
  {
    id: 1,
    format: "KINDLE EDITION",
    title: "Think Like a Monk",
    author: "Jay Shetty",
    price: "$15.99",
    image: "https://covers.openlibrary.org/b/isbn/9781982134488-L.jpg",
  },
  {
    id: 2,
    format: "KINDLE",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: "$5.31",
    image: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg",
  },
  {
    id: 3,
    format: "KINDLE",
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    price: "$10.35",
    image: "https://covers.openlibrary.org/b/isbn/9780385547345-L.jpg",
  },
  {
    id: 4,
    format: "HARDCOVER",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    price: "$16.59",
    image: "https://covers.openlibrary.org/b/isbn/9780593321201-L.jpg",
  },
  {
    id: 5,
    format: "KINDLE EDITION",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: "$37.00",
    originalPrice: "$78.00",
    image: "https://covers.openlibrary.org/b/isbn/9780735219090-L.jpg",
  },
  {
    id: 6,
    format: "KINDLE EDITION",
    title: "Atomic Habits",
    author: "James Clear",
    price: "$11.98",
    image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  },
  {
    id: 7,
    format: "PAPERBACK",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    price: "$14.99",
    image: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
  },
  {
    id: 8,
    format: "HARDCOVER, KINDLE, PAPER...",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: "$18.95 – $29.95",
    image: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
  },
  {
    id: 9,
    format: "HARDCOVER",
    title: "Dune",
    author: "Frank Herbert",
    price: "$14.20",
    image: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
  },
  {
    id: 10,
    format: "HARDCOVER",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    price: "$14.82",
    image: "https://covers.openlibrary.org/b/isbn/9780593318171-L.jpg",
  },
  {
    id: 11,
    format: "HARDCOVER, KINDLE, PAPER...",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: "$15.95 – $29.95",
    image: "https://covers.openlibrary.org/b/isbn/9780062060624-L.jpg",
  },
];

const BOOKS_DATA = {
  Featured: FEATURED_BOOKS,
  "On Sale": [...FEATURED_BOOKS].reverse(),
  "Most Viewed": [
    ...FEATURED_BOOKS.slice(2),
    ...FEATURED_BOOKS.slice(0, 2),
  ],
};

export default function BooksCatalog() {
  const [activeTab, setActiveTab] = useState("Most Viewed");
  const [wishlist, setWishlist] = useState([]);
  const [, setCart] = useState([]);

  const handleAddToCart = (book, e) => {
    e.stopPropagation();
    e.preventDefault();
    setCart((prev) => [...prev, book]);
    alert(`Added "${book.title}" to cart!`);
  };

  const handleToggleWishlist = (book, e) => {
    e.stopPropagation();
    e.preventDefault();
    setWishlist((prev) =>
      prev.includes(book.id)
        ? prev.filter((id) => id !== book.id)
        : [...prev, book.id]
    );
  };

  const currentBooks = BOOKS_DATA[activeTab] || BOOKS_DATA.Featured;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 bg-white">
      <h2 className="text-2xl sm:text-3xl font-normal text-center text-gray-900 mb-6">
        Featured Books
      </h2>

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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 border-t border-l border-gray-200">
        {currentBooks.map((book) => {
          const isWishlisted = wishlist.includes(book.id);

          return (
            <div
              key={book.id}
              className="group relative bg-white p-4 border-r border-b border-gray-200 flex flex-col justify-between transition-all duration-150 hover:shadow-xl hover:border-gray-900 hover:z-20 cursor-pointer"
            >
              <Link href={`/books/${book.id}`} className="flex-1 flex flex-col justify-between">
                <div className="relative w-full aspect-2/3 mb-4 flex items-center justify-center overflow-hidden">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                  />
                </div>

                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-rose-500 font-medium tracking-wide uppercase mb-1">
                    {book.format}
                  </span>

                  <h3 className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2 h-8 mb-2 group-hover:text-rose-600 transition-colors">
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
                </div>
              </Link>

              <div className="flex items-center justify-between pt-1 border-t border-gray-50 mt-auto">
                <button
                  type="button"
                  onClick={(e) => handleAddToCart(book, e)}
                  aria-label="Add to cart"
                  className="text-gray-600 hover:text-gray-900 transition-colors p-1 cursor-pointer z-10"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                </button>

                <button
                  type="button"
                  onClick={(e) => handleToggleWishlist(book, e)}
                  aria-label="Add to wishlist"
                  className={`transition-colors p-1 cursor-pointer z-10 ${
                    isWishlisted
                      ? "text-rose-600 fill-rose-600"
                      : "text-gray-600 hover:text-rose-600"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 stroke-[1.5] ${
                      isWishlisted ? "fill-current text-rose-600" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}