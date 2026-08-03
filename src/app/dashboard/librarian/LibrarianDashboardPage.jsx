"use client";

import React, { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { addBook, updateBook, deleteBook, togglePublish } from "@/lib/actions/books";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import Unauthorized from "@/components/Unauthorized";

const CATEGORIES = ["Classic", "Fiction", "Non-Fiction", "Science & Tech", "History", "Biography", "Children", "Fantasy & Sci-Fi"];
const emptyForm = { title: "", author: "", category: "Classic", deliveryFee: "", description: "", coverUrl: "" };

export default function LibrarianDashboardPage({ librarian, librarianBook = [] }) {
  const isClient = useSyncExternalStore(() => () => { }, () => true, () => false);
  const [inventory, setInventory] = useState(librarianBook);
  const [prevLibrarianBook, setPrevLibrarianBook] = useState(librarianBook);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  if (librarianBook !== prevLibrarianBook) {
    setPrevLibrarianBook(librarianBook);
    setInventory(librarianBook || []);
  }

  if (!isClient) {
    return <div className="w-full h-96 bg-slate-100 rounded-2xl animate-pulse" />;
  }
  if (session?.user?.role !== "librarian") return <Unauthorized />;

  // Image Upload
  const handleUploadToImgBB = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!key) {
      setFormData((p) => ({ ...p, coverUrl: URL.createObjectURL(file) }));
      setLoading(false);
      return toast.info("Using local preview fallback.");
    }

    try {
      const body = new FormData();
      body.append("image", file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body }).then((r) => r.json());
      if (res.success) setFormData((p) => ({ ...p, coverUrl: res.data.url })), toast.success("Cover uploaded!");
      else throw new Error(res.error?.message);
    } catch {
      setFormData((p) => ({ ...p, coverUrl: URL.createObjectURL(file) }));
      toast.error("Upload failed. Used local preview.");
    } finally {
      setLoading(false);
    }
  };

  // Save Book
  const handleSaveBook = async (e) => {
    e.preventDefault();
    if (!formData.coverUrl) return toast.warning("Please upload a cover image.");

    const payload = {
      ...formData,
      deliveryFee: parseFloat(formData.deliveryFee) || 0,
      cover: formData.coverUrl,
      status: editingBook?.status || "Pending",
      requestCount: editingBook?.requestCount || 0,
      isPublished: editingBook?.isPublished || false,
      librarian: librarian.id,
    };

    try {
      const id = editingBook?.id || editingBook?._id;
      if (editingBook) {
        if (typeof updateBook === "function") await updateBook(id, payload);
        setInventory((prev) => prev.map((b) => ((b.id || b._id) === id ? { ...b, ...payload } : b)));
        toast.success("Updated!");
      } else {
        const res = typeof addBook === "function" ? await addBook(payload) : null;
        setInventory((prev) => [{ id: res?.insertedId || res?._id || `BK-${Date.now()}`, ...payload }, ...prev]);
        toast.success("Added!");
      }
      setIsModalOpen(false);
    } catch {
      toast.error("Failed to save book.");
    }
  };

  // Status & Actions
  const handleStatusChange = async (bookId, newStatus) => {
    if (typeof updateBook === "function") await updateBook(bookId, { status: newStatus });
    setInventory((prev) => prev.map((b) => ((b.id || b._id) === bookId ? { ...b, status: newStatus } : b)));
    toast.success(`Status: ${newStatus}`);
  };

  const handleTogglePublish = async (bookId, current) => {
    if (typeof togglePublish === "function") await togglePublish(bookId, !current);
    setInventory((prev) => prev.map((b) => ((b.id || b._id) === bookId ? { ...b, isPublished: !current } : b)));
  };

  const handleDelete = async (bookId) => {
    if (!confirm("Delete this book?")) return;
    if (typeof deleteBook === "function") await deleteBook(bookId);
    setInventory((prev) => prev.filter((b) => (b.id || b._id) !== bookId));
    toast.success("Deleted.");
  };

  const totalRequests = inventory.reduce((a, c) => a + (c.requestCount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold">Librarian Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome, <span className="font-semibold text-indigo-600">{librarian.name}</span></p>
        </div>
        <button onClick={() => { setEditingBook(null); setFormData(emptyForm); setIsModalOpen(true); }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          + Add New Book
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <MetricCard label="Total Books" value={inventory.length} />
        <MetricCard label="Published" value={inventory.filter((b) => b.isPublished).length} color="text-emerald-600" />
        <MetricCard label="Borrow Requests" value={totalRequests} color="text-indigo-600" />
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Borrow Requests Trend</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[{ m: "Jan", r: 12 }, { m: "Feb", r: 19 }, { m: "Mar", r: 30 }, { m: "Apr", r: 22 }, { m: "May", r: 45 }, { m: "Jun", r: totalRequests || 50 }]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="m" /><YAxis /><Tooltip />
              <Area type="monotone" dataKey="r" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Manage Deliveries Table */}
      <TableWrapper title="Manage Deliveries" isEmpty={inventory.length === 0}>
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-500">
            <tr><th className="p-4">Client</th><th className="p-4">Book Title</th><th className="p-4">Date</th><th className="p-4">Status</th><th className="p-4 text-right">Update</th></tr>
          </thead>
          <tbody className="divide-y">
            {inventory.map((book) => <DeliveryRow key={`del-${book.id || book._id}`} book={book} onStatusChange={handleStatusChange} />)}
          </tbody>
        </table>
      </TableWrapper>

      {/* Book Inventory Table */}
      <TableWrapper title="Your Book Inventory" isEmpty={inventory.length === 0}>
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-500">
            <tr>
              <th className="p-4">Book</th>
              <th className="p-4">Category</th>
              <th className="p-4">Fee</th>
              <th className="p-4">Status</th>
              <th className="p-4">Publish Switch</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {inventory.map((book) => (
              <BookRow
                key={book.id || book._id}
                book={book}
                onEdit={() => { setEditingBook(book); setFormData({ title: book.title, author: book.author, category: book.category, deliveryFee: String(book.deliveryFee || ""), description: book.description || "", coverUrl: book.cover || book.coverUrl || "" }); setIsModalOpen(true); }}
                onToggle={() => handleTogglePublish(book.id || book._id, book.isPublished)}
                onDelete={() => handleDelete(book.id || book._id)}
              />
            ))}
          </tbody>
        </table>
      </TableWrapper>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <form onSubmit={handleSaveBook} className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg space-y-4 border">
            <h3 className="text-lg font-bold">{editingBook ? "Edit Book" : "Add New Book"}</h3>
            <input type="text" required placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border rounded dark:bg-gray-700" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" required placeholder="Author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className="w-full p-2 border rounded dark:bg-gray-700" />
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-2 border rounded dark:bg-gray-700">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <input type="number" step="0.01" placeholder="Delivery Fee" value={formData.deliveryFee} onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value })} className="w-full p-2 border rounded dark:bg-gray-700" />
            <div>
              <input type="file" accept="image/*" onChange={handleUploadToImgBB} className="text-xs" />
              {loading && <span className="text-xs text-indigo-600 animate-pulse ml-2">Uploading...</span>}
            </div>
            <textarea placeholder="Description" rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded dark:bg-gray-700" />
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500">Cancel</button>
              <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

/* Helper Components */
const MetricCard = ({ label, value, color = "text-gray-900 dark:text-white" }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border shadow-sm">
    <p className="text-xs font-semibold text-gray-400 uppercase">{label}</p>
    <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
  </div>
);

const TableWrapper = ({ title, isEmpty, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl border shadow-sm overflow-hidden">
    <div className="p-4 border-b font-semibold">{title}</div>
    {isEmpty ? <div className="p-8 text-center text-gray-500">No records found.</div> : <div className="overflow-x-auto">{children}</div>}
  </div>
);

const DeliveryRow = ({ book, onStatusChange }) => {
  const id = book.id || book._id;
  const status = book.status || "Pending";

  const dotColor = status === "Delivered" ? "bg-emerald-500" : status === "Dispatched" ? "bg-blue-500" : "bg-amber-500";
  const badgeBg = status === "Delivered" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : status === "Dispatched" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-amber-50 text-amber-700 border-amber-200";

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
      <td className="p-4 font-medium">{book.clientName || book.userName || "Library Patron"}</td>
      <td className="p-4">{book.title}</td>
      <td className="p-4 text-gray-400">{book.requestDate || new Date().toLocaleDateString()}</td>
      <td className="p-4">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${badgeBg}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
          {status}
        </span>
      </td>
      <td className="p-4 text-right">
        <select value={status} onChange={(e) => onStatusChange(id, e.target.value)} className="p-1 border rounded text-xs dark:bg-gray-700">
          <option value="Pending">Pending</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Delivered">Delivered</option>
        </select>
      </td>
    </tr>
  );
};

/* SEPARATED STATUS BADGE AND TOGGLE SWITCH */
const BookRow = ({ book, onEdit, onToggle, onDelete }) => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
    <td className="p-4 flex items-center gap-3">
      <div className="relative w-10 h-14 bg-gray-100 rounded overflow-hidden">
        <Image src={book.cover || book.coverUrl || "/placeholder-book.png"} alt={book.title} fill className="object-cover" sizes="40px" />
      </div>
      <div><p className="font-semibold">{book.title}</p><p className="text-xs text-gray-400">{book.author}</p></div>
    </td>
    <td className="p-4">{book.category}</td>
    <td className="p-4">${parseFloat(book.deliveryFee || 0).toFixed(2)}</td>
    
    {/* 1. STATUS BADGE */}
    <td className="p-4">
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
          book.isPublished
            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
            : "bg-amber-50 text-amber-700 border-amber-300"
        }`}
      >
        {book.isPublished ? "Published" : "Draft"}
      </span>
    </td>

    {/* 2. SWITCH COLUMN */}
    <td className="p-4">
      <button
        type="button"
        role="switch"
        aria-checked={book.isPublished}
        onClick={onToggle}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          book.isPublished ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            book.isPublished ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </td>

    <td className="p-4 text-right space-x-2">
      <button onClick={onEdit} className="text-indigo-600 font-medium">Edit</button>
      <button onClick={onDelete} className="text-rose-600 font-medium">Delete</button>
    </td>
  </tr>
);