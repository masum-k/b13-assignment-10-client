"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import ReaderUnauthCard from "@/components/ReaderUnauthCard";
import { useSession } from "@/lib/auth-client";

const useIsClient = () => useSyncExternalStore(() => () => {}, () => true, () => false);

const monthlyActivity = [
  { month: "Jan", books: 2, spent: 15 },
  { month: "Feb", books: 4, spent: 28 },
  { month: "Mar", books: 3, spent: 22 },
  { month: "Apr", books: 6, spent: 45 },
  { month: "May", books: 5, spent: 38 },
  { month: "Jun", books: 8, spent: 60 },
];

const initialDeliveries = [
  { id: "DEL-8091", title: "The Great Gatsby", fee: "$4.50", date: "2026-07-20", status: "Delivered" },
  { id: "DEL-8092", title: "To Kill a Mockingbird", fee: "$3.99", date: "2026-07-24", status: "Dispatched" },
  { id: "DEL-8093", title: "1984", fee: "$5.00", date: "2026-07-26", status: "Pending" },
  { id: "DEL-8094", title: "Pride and Prejudice", fee: "$4.20", date: "2026-07-15", status: "Delivered" },
  { id: "DEL-8095", title: "The Catcher in the Rye", fee: "$3.50", date: "2026-06-30", status: "Delivered" },
];

const initialReadingList = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400", readProgress: 100 },
  { id: 2, title: "Pride and Prejudice", author: "Jane Austen", category: "Romance", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400", readProgress: 65 },
];

const initialReviews = [
  { id: 101, bookTitle: "The Great Gatsby", rating: 5, comment: "An absolute masterpiece. Loved the symbolism.", date: "July 22, 2026" },
  { id: 102, bookTitle: "Pride and Prejudice", rating: 4, comment: "Witty and timeless storytelling.", date: "July 16, 2026" },
];

// Helper to render status badges matching your design
const renderStatusBadge = (status) => {
  switch (status) {
    case "Delivered":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Delivered
        </span>
      );
    case "Dispatched":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-300">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Dispatched
        </span>
      );
    case "Pending":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-300">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Pending
        </span>
      );
    default:
      return null;
  }
};

export default function ReaderDashboardPage() {
  const isClient = useIsClient();
  const { data: session } = useSession();

  const [reviews, setReviews] = useState(initialReviews);
  const [editingReview, setEditingReview] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);

  const handleSaveEdit = (e) => {
    if (e) e.preventDefault();
    if (!editingReview) return;
    setReviews((prev) => prev.map((r) => (r.id === editingReview.id ? { ...r, comment: editComment, rating: editRating } : r)));
    setEditingReview(null);
  };

  if (session?.user?.role !== "reader") return <ReaderUnauthCard />;

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8 font-sans text-slate-900 max-w-7xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold">Welcome back, {session?.user?.name || "Reader"}!</h1>
          <p className="text-xs text-slate-500">Track your active reading milestones and orders.</p>
        </div>
        <Link href="/" className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all">
          Explore Catalog
        </Link>
      </div>

      {/* Single Stat */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">Total Books Read</p>
          <h3 className="text-2xl font-bold mt-1">28</h3>
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">↑ +3 this month</span>
      </div>

      {/* Analytics Chart */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <h2 className="text-sm font-bold mb-4">Activity Trends</h2>
        <div className="h-48 w-full">
          {isClient ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                <Area type="monotone" dataKey="spent" stroke="#DC2626" fill="#FEE2E2" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : <div className="w-full h-full bg-slate-100 rounded-xl animate-pulse" />}
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <h2 className="text-sm font-bold mb-4">Delivery History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b text-slate-500 font-semibold bg-slate-50">
                <th className="p-3">Order ID</th>
                <th className="p-3">Title</th>
                <th className="p-3">Fee</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialDeliveries.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-slate-500">{item.id}</td>
                  <td className="p-3 font-semibold">{item.title}</td>
                  <td className="p-3">{item.fee}</td>
                  <td className="p-3 text-slate-500">{item.date}</td>
                  <td className="p-3">{renderStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shelf */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <h2 className="text-sm font-bold mb-4">My Shelf</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {initialReadingList.map((book) => (
            <div key={book.id} className="border border-slate-200 rounded-xl p-3 flex flex-col gap-2">
              <div className="h-40 relative rounded-lg overflow-hidden bg-slate-100">
                <Image src={book.cover} alt={book.title} fill className="object-cover" />
              </div>
              <h3 className="text-xs font-bold truncate">{book.title}</h3>
              <p className="text-[11px] text-slate-500">{book.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <h2 className="text-sm font-bold mb-4">My Reviews</h2>
        <div className="flex flex-col gap-3">
          {reviews.map((r) => (
            <div key={r.id} className="p-4 bg-slate-50 rounded-xl flex justify-between items-center text-xs">
              <div>
                <h3 className="font-bold">{r.bookTitle} <span className="font-normal text-amber-500">{"★".repeat(r.rating)}</span></h3>
                <p className="text-slate-600 mt-1">&quot;{r.comment}&quot;</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditingReview(r); setEditComment(r.comment); setEditRating(r.rating); }} className="px-3 py-1 bg-white border rounded-lg hover:bg-slate-100">Edit</button>
                <button onClick={() => setReviews((prev) => prev.filter((item) => item.id !== r.id))} className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Review Modal */}
      {Boolean(editingReview) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4 shadow-xl">
            <h3 className="text-sm font-bold">Edit Review</h3>
            <div className="flex gap-1 text-xl text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} type="button" onClick={() => setEditRating(s)} className={s <= editRating ? "opacity-100" : "opacity-30"}>★</button>
              ))}
            </div>
            <textarea rows={3} value={editComment} onChange={(e) => setEditComment(e.target.value)} className="w-full border rounded-xl p-2 text-xs" />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditingReview(null)} className="px-3 py-1.5 text-xs bg-slate-100 rounded-lg">Cancel</button>
              <button type="button" onClick={handleSaveEdit} className="px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}