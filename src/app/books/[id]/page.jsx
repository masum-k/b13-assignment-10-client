"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Heart, ChevronRight } from "lucide-react";

// Mock database (In production, replace with an API call or database query using params.id)
const ALL_BOOKS = [
  {
    id: "1",
    title: "De Vengeance - J.D Kurtness",
    tags: "Book, Fiction",
    brand: "Amazonia",
    availability: "In Stock",
    sku: "125",
    price: "$18.99",
    originalPrice: "$25.00",
    description:
      "A compelling story of resilience and mystery. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
    ],
  },
  {
    id: "2",
    title: "Anthropologie Amerindienne - Franz",
    price: "$11.99",
    originalPrice: "$23.99",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "A Million Little Pieces - James Frey",
    price: "$12.99",
    originalPrice: "$25.99",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "When The Dawn Disappeared",
    price: "$15.99",
    originalPrice: "$31.99",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
  },
];

export default function BookDetailsPage() {
  const params = useParams();
  const bookId = params?.id;

  // Find the selected book based on ID, fallback to the first book if not found
  const book = ALL_BOOKS.find((b) => b.id === bookId) || ALL_BOOKS[0];

  const [selectedImage, setSelectedImage] = useState(book.coverImage || book.thumbnails?.[0]);
  const [selectedFormat, setSelectedFormat] = useState("Paperback");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("DESCRIPTION");

  return (
    <div className="w-full bg-white min-h-screen text-gray-800 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-gray-400 flex items-center gap-2 border-b border-gray-100">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/books" className="hover:text-gray-900">Books</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-medium truncate">{book.title}</span>
      </div>

      <main className="max-w-6xl mx-auto px-4 pt-8">
        {/* TOP SECTION: Gallery & Main Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          {/* Left: Product Gallery */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-3/4 max-w-85 border border-gray-200 shadow-sm mb-4 bg-gray-50">
              <Image
                src={selectedImage || book.coverImage}
                alt={book.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 overflow-x-auto py-2">
              {(book.thumbnails || [book.coverImage]).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-16 h-20 border-2 transition-all ${
                    selectedImage === img ? "border-green-600 scale-105" : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Book Details & Actions */}
          <div className="md:col-span-7 flex flex-col justify-start">
            <span className="text-xs text-gray-400 mb-1">Tags: {book.tags || "Book"}</span>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{book.title}</h1>

            <div className="text-xs text-gray-500 space-y-1 mb-4">
              <p>Brand: <span className="text-red-500">{book.brand || "Amazonia"}</span></p>
              <p>Availability: <span className="text-red-500">{book.availability || "In Stock"}</span></p>
              <p>SKU: <span className="text-gray-700">{book.sku || "125"}</span></p>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-bold text-red-600">{book.price}</span>
              {book.originalPrice && (
                <span className="text-sm text-gray-400 line-through">{book.originalPrice}</span>
              )}
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-6 max-w-xl">
              {book.description}
            </p>

            {/* Format Selection Buttons */}
            <div className="flex items-center gap-2 mb-6">
              {["HARD", "PAPER", "KINDLE"].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-4 py-1.5 text-xs font-semibold border transition-colors ${
                    selectedFormat === fmt
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-900"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            {/* Quantity and Add To Cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-xs font-medium text-gray-600 gap-2">
                <span>Qty</span>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 h-9 border border-gray-300 text-center text-gray-900 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => alert(`Added ${quantity} of ${book.title} to cart!`)}
                className="flex-1 max-w-55 h-9 border-2 border-red-600 text-red-600 text-xs font-bold uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors"
              >
                + Add To Cart
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              type="button"
              className="w-full max-w-77.5 h-9 bg-red-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors mb-4"
            >
              Buy Now
            </button>

            {/* Wishlist Link */}
            <button
              type="button"
              onClick={() => alert("Added to Wishlist!")}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 transition-colors w-fit"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Add To Wishlist</span>
            </button>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="border-t border-gray-200 pt-8 mb-16">
          <div className="flex justify-center gap-8 border-b border-gray-200 pb-3 mb-6">
            {["DESCRIPTION", "REVIEWS", "CUSTOM TAB"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold tracking-wider transition-colors relative pb-3 -mb-3 ${
                  activeTab === tab
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-600 leading-relaxed max-w-4xl mx-auto text-center sm:text-left space-y-4">
            {activeTab === "DESCRIPTION" && (
              <>
                <p>{book.description}</p>
                <p>
                  Additional details regarding binding, paper quality, chapter indexes, and author biographies can be placed right here.
                </p>
              </>
            )}
            {activeTab === "REVIEWS" && <p className="text-center">No reviews yet. Be the first to review this book!</p>}
            {activeTab === "CUSTOM TAB" && <p className="text-center">Custom information or shipping policies go here.</p>}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mb-16">
          <h2 className="text-sm font-bold text-gray-900 text-center uppercase tracking-widest mb-2">
            Related Products
          </h2>
          <div className="w-12 h-0.5 bg-red-600 mx-auto mb-8"></div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ALL_BOOKS.map((item) => (
              <Link key={item.id} href={`/books/${item.id}`} className="group block text-center border border-gray-100 p-3 hover:shadow-md transition-shadow">
                <div className="relative w-full aspect-3/4 mb-3 bg-gray-50">
                  <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                </div>
                <h3 className="text-xs font-semibold text-gray-800 truncate group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-xs font-bold text-red-600">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-[10px] text-white bg-red-600 px-1 py-0.5 font-bold">-50%</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* RECENTLY VIEWED PRODUCTS */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 text-center uppercase tracking-widest mb-2">
            Recently Viewed Products
          </h2>
          <div className="w-12 h-0.5 bg-red-600 mx-auto mb-8"></div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ALL_BOOKS.slice(0, 2).map((item) => (
              <Link key={item.id} href={`/books/${item.id}`} className="group block text-center border border-gray-100 p-3 hover:shadow-md transition-shadow">
                <div className="relative w-full aspect-3/4 mb-3 bg-gray-50">
                  <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                </div>
                <h3 className="text-xs font-semibold text-gray-800 truncate group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs font-bold text-red-600">{item.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 shadow-lg flex items-center justify-between max-w-4xl mx-auto z-50 text-xs">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-10 bg-gray-100">
            <Image src={book.coverImage} alt="mini" fill className="object-cover" />
          </div>
          <span className="font-semibold text-gray-800 truncate max-w-37.5 sm:max-w-xs">{book.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-bold text-red-600">{book.price}</span>
          <button
            onClick={() => alert(`Added ${book.title} to cart!`)}
            className="bg-gray-100 text-gray-800 px-3 py-1.5 border border-gray-300 font-semibold hover:bg-red-600 hover:text-white transition-colors"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}