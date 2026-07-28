"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";
import Image from "next/image";
import ReaderUnauthCard from "@/components/ReaderUnauthCard";
import { useSession } from "@/lib/auth-client";

// Helper hook to check if component is rendered on the client without useEffect/setState
const emptySubscribe = () => () => { };
function useIsClient() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
}

// Mock Chart Data
const monthlyActivityData = [
    { month: "Jan", books: 2, spent: 15 },
    { month: "Feb", books: 4, spent: 28 },
    { month: "Mar", books: 3, spent: 22 },
    { month: "Apr", books: 6, spent: 45 },
    { month: "May", books: 5, spent: 38 },
    { month: "Jun", books: 8, spent: 60 },
];

// Initial Delivery History Data
const initialDeliveries = [
    { id: "DEL-8091", title: "The Great Gatsby", fee: "$4.50", date: "2026-07-20", status: "Delivered" },
    { id: "DEL-8092", title: "To Kill a Mockingbird", fee: "$3.99", date: "2026-07-24", status: "Dispatched" },
    { id: "DEL-8093", title: "1984 by George Orwell", fee: "$5.00", date: "2026-07-26", status: "Pending" },
    { id: "DEL-8094", title: "Pride and Prejudice", fee: "$4.20", date: "2026-07-15", status: "Delivered" },
];

// Initial Reading List Data
const initialReadingList = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400" },
    { id: 2, title: "Pride and Prejudice", author: "Jane Austen", category: "Romance", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400" },
    { id: 3, title: "The Catcher in the Rye", author: "J.D. Salinger", category: "Fiction", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400" },
    { id: 4, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", cover: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?auto=format&fit=crop&q=80&w=400" },
];

// Initial Reviews Data
const initialReviews = [
    { id: 101, bookTitle: "The Great Gatsby", rating: 5, comment: "An absolute masterpiece. Loved the symbolism and the tragic depth of Gatsby's character.", date: "July 22, 2026" },
    { id: 102, bookTitle: "Pride and Prejudice", rating: 4, comment: "Witty and timeless storytelling. Perfect weekend read!", date: "July 16, 2026" },
];

export default function UserDashboardPage() {
    const isClient = useIsClient();
    const { data: session, isPending } = useSession();

    // Reviews state
    const [reviews, setReviews] = useState(initialReviews);

    // Active editing state
    const [editingReview, setEditingReview] = useState(null);
    const [editComment, setEditComment] = useState("");
    const [editRating, setEditRating] = useState(5);

    // Delete review
    const handleDeleteReview = (id) => {
        setReviews((prev) => prev.filter((review) => review.id !== id));
    };

    // Open edit modal directly with selected item
    const handleOpenEditModal = (review, e) => {
        if (e) e.stopPropagation();
        setEditingReview(review);
        setEditComment(review.comment);
        setEditRating(review.rating);
    };

    // Close edit modal
    const handleCloseModal = () => {
        setEditingReview(null);
        setEditComment("");
        setEditRating(5);
    };

    // Save edited review
    const handleSaveEdit = (e) => {
        if (e) e.preventDefault();
        if (!editingReview) return;

        setReviews((prev) =>
            prev.map((item) =>
                item.id === editingReview.id
                    ? { ...item, comment: editComment, rating: editRating }
                    : item
            )
        );
        handleCloseModal();
    };

    return (
        <>
            {session?.user?.role === "librarians"
                ? <ReaderUnauthCard/>
                : <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-16">
                    {/* Main Content */}
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col gap-8">

                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Welcome Back, Reader!</h1>
                                <p className="text-xs text-gray-500 mt-1">Here is a quick overview of your reading stats, orders, and reviews.</p>
                            </div>
                            <Link
                                href="/books"
                                className="bg-red-600 hover:bg-red-700 transition-colors text-white font-medium text-xs h-10 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer w-fit shadow-sm"
                            >
                                Browse Books
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>

                        {/* Section 1: Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Total Books Read</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-0.5">28</h3>
                                </div>
                            </div>

                            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 001 1.732V15a2 2 0 001 1.732V18a2 2 0 002 2h12a2 2 0 002-2v-1.268A2 2 0 0021 15v-1.268A2 2 0 0022 12V9a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Pending Deliveries</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-0.5">2</h3>
                                </div>
                            </div>

                            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Total Spent on Fees</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-0.5">$208.20</h3>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Activity Chart */}
                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-base font-bold text-gray-900">Reading & Expense Trends</h2>
                                    <p className="text-xs text-gray-500">Books read vs. total fee expenditure in 2026</p>
                                </div>
                            </div>
                            <div className="h-64 w-full">
                                {isClient ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={monthlyActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                                            <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", borderColor: "#E5E7EB", fontSize: "12px" }} />
                                            <Area type="monotone" dataKey="spent" stroke="#DC2626" strokeWidth={2} fillOpacity={1} fill="url(#colorSpent)" name="Spent ($)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="w-full h-full bg-gray-50 rounded-lg animate-pulse" />
                                )}
                            </div>
                        </div>

                        {/* Section 3: Delivery History Table */}
                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <div className="mb-4">
                                <h2 className="text-base font-bold text-gray-900">Delivery History</h2>
                                <p className="text-xs text-gray-500">Track status and delivery fees for your requested books</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200 text-gray-500 font-medium bg-gray-50/50">
                                            <th className="py-3 px-4">Order ID</th>
                                            <th className="py-3 px-4">Book Title</th>
                                            <th className="py-3 px-4">Delivery Fee</th>
                                            <th className="py-3 px-4">Request Date</th>
                                            <th className="py-3 px-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-800">
                                        {initialDeliveries.map((delivery) => (
                                            <tr key={delivery.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-3.5 px-4 font-mono text-gray-500">{delivery.id}</td>
                                                <td className="py-3.5 px-4 font-semibold text-gray-900">{delivery.title}</td>
                                                <td className="py-3.5 px-4">{delivery.fee}</td>
                                                <td className="py-3.5 px-4 text-gray-500">{delivery.date}</td>
                                                <td className="py-3.5 px-4">
                                                    {delivery.status === "Delivered" && (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                            ✓ Delivered
                                                        </span>
                                                    )}
                                                    {delivery.status === "Dispatched" && (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                                            📦 Dispatched
                                                        </span>
                                                    )}
                                                    {delivery.status === "Pending" && (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                                            ⏳ Pending
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Section 4: My Reading List */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <h2 className="text-base font-bold text-gray-900">My Reading List</h2>
                                <p className="text-xs text-gray-500">Books successfully delivered to your collection</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                                {initialReadingList.map((book) => (
                                    <div key={book.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                                        <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
                                            <Image
                                                src={book.cover}
                                                alt={book.title}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                                                className="object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                            <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-md text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-gray-200">
                                                {book.category}
                                            </span>
                                        </div>
                                        <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                                            <div>
                                                <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{book.title}</h3>
                                                <p className="text-xs text-gray-500 mt-0.5">{book.author}</p>
                                            </div>
                                            <button className="w-full mt-2 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-800 text-xs font-semibold h-8 rounded-lg cursor-pointer">
                                                Read Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section 5: My Reviews */}
                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <div className="mb-4">
                                <h2 className="text-base font-bold text-gray-900">My Reviews & Comments</h2>
                                <p className="text-xs text-gray-500">Manage feedback you have submitted for books</p>
                            </div>

                            {reviews.length === 0 ? (
                                <p className="text-xs text-gray-400 py-6 text-center">You haven&apos;t left any reviews yet.</p>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex flex-col gap-1.5 max-w-2xl">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-sm font-bold text-gray-900">{review.bookTitle}</h3>
                                                    <span className="text-xs text-gray-400">• {review.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-amber-400">
                                                    {[...Array(5)].map((_, index) => (
                                                        <span key={index} className={index < review.rating ? "text-amber-400" : "text-gray-200"}>
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-xs text-gray-600 leading-relaxed mt-1">&quot;{review.comment}&quot;</p>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleOpenEditModal(review, e)}
                                                    className="bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-medium h-8 px-3 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                                                >
                                                    ✎ Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteReview(review.id)}
                                                    className="bg-red-50 border border-red-100 hover:bg-red-100 text-red-600 text-xs font-medium h-8 px-3 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                                                >
                                                    🗑 Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </main>

                    {/* Modal - Triggers whenever `editingReview` is set */}
                    {Boolean(editingReview) && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
                            onClick={handleCloseModal}
                        >
                            <div
                                className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-md shadow-xl flex flex-col gap-4"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">Edit Review</h2>
                                    <p className="text-xs text-gray-500">{editingReview?.bookTitle}</p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-700 block mb-1">Rating</label>
                                        <div className="flex items-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setEditRating(star)}
                                                    className="text-xl focus:outline-none cursor-pointer"
                                                >
                                                    <span className={star <= editRating ? "text-amber-400" : "text-gray-200"}>★</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-gray-700 block mb-1">Review Comment</label>
                                        <textarea
                                            rows={4}
                                            value={editComment}
                                            onChange={(e) => setEditComment(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-red-600 resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-xs font-medium h-9 px-4 rounded-lg cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSaveEdit}
                                        className="bg-red-600 hover:bg-red-700 transition-colors text-white text-xs font-medium h-9 px-4 rounded-lg cursor-pointer"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>}
        </>
    );
}