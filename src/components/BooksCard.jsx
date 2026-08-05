"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, Button, Link } from "@heroui/react";

export default function BooksCard({ book }) {
  // 1. Hooks called at top level
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 2. Early return guard
  if (!book) return null;

  // Ensure book is handled as an array and ONLY include books approved by the admin
  const booksList = Array.isArray(book) ? book : [book];
  const approvedBooks = booksList.filter(
    (item) => item?.status?.toLowerCase() === "approved"
  );

  const categories = ["All", "Classic", "Fiction", "Sci-Fi", "Romance"];

  // Search & Filter logic applied to approved books only
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
          {categories.map((cat) => (
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
          
          // Safeguard: Ignore expired local blob URLs in production and use a fallback cover image
          const rawCover = singleBook.cover;
          const validCover = (rawCover && !rawCover.startsWith("blob:")) 
            ? rawCover 
            : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400";

          return (
            <Card
              key={bookId}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-3 shadow-xs hover:shadow-md transition-shadow"
            >
              {/* Cover Image Header */}
              <Card.Header className="p-0 border-none flex flex-col gap-0">
                <div className="h-48 relative w-full rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={validCover}
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
              </Card.Header>

              {/* Title & Author Content */}
              <Card.Content className="p-0 flex-1 flex flex-col justify-between gap-2">
                <div>
                  <Card.Title className="text-sm font-bold truncate text-slate-800">
                    {singleBook.title}
                  </Card.Title>
                  <Card.Description className="text-xs text-slate-500 truncate">
                    {singleBook.author}
                  </Card.Description>
                </div>
              </Card.Content>

              {/* Footer */}
              <Card.Footer className="p-0 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
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
              </Card.Footer>
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