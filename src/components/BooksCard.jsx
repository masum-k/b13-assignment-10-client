"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, Button, Link } from "@heroui/react";

export default function BooksCard({ book }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (!book) return null;

  // Ensure book is safely parsed as an array
  const booksList = Array.isArray(book) ? book : [book];

  // 1. Flexible, case-insensitive approval check to prevent production filtering drops
  const approvedBooks = booksList.filter((item) => {
    if (!item) return false;
    const status = String(item.status || "").trim().toLowerCase();
    // Fallback: if status field is completely missing in production data, allow it through or check if it's explicitly approved
    return status === "approved" || !item.status;
  });

  // 2. Dynamically extract unique categories from actual book records so they always match
  const dynamicCategories = ["All", ...Array.from(new Set(approvedBooks.map((item) => item.category).filter(Boolean)))];

  // Search & Filter logic applied safely
  const filteredBooks = approvedBooks.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
      
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8 font-sans text-slate-900 max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* Header Card */}
      <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Explore Books</h1>
          <p className="text-xs text-slate-500">
            Discover and borrow from our available collection.
          </p>
        </div>
        <Link
          href="/dashboard/reader"
          className="self-start sm:self-auto bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
        >
          Back to Dashboard
        </Link>
      </Card>

      {/* Search & Filter Controls Card */}
      <Card className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-72 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500/20"
        />

        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {dynamicCategories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-red-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </Card>

      {/* Book Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredBooks.map((singleBook) => {
          if (!singleBook) return null;

          const bookId = singleBook._id?.$oid || singleBook._id || singleBook.id;
          const coverImage = singleBook.coverUrl || singleBook.cover || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400";

          return (
            <Card
              key={bookId}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-3 shadow-xs hover:shadow-md transition-shadow"
            >
              {/* Cover Image Header */}
              <div className="p-0 border-none flex flex-col gap-0">
                <div className="h-48 relative w-full rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={coverImage}
                    alt={singleBook.title || "Book cover"}
                    fill
                    className="object-cover"
                  />
                  {singleBook.category && (
                    <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[10px] font-semibold px-2 py-0.5 rounded-md text-slate-700">
                      {singleBook.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Author Content */}
              <div className="p-0 flex-1 flex flex-col justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold truncate text-slate-800">
                    {singleBook.title}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">
                    {singleBook.author}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-0 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Available
                </span>

                <Link
                  href={`/books/${bookId}`}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                >
                  Borrow
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <Card className="p-12 text-center bg-white border border-slate-200 rounded-2xl">
          <p className="text-sm text-slate-500">
            No books found matching your criteria.
          </p>
        </Card>
      )}
    </div>
  );
}