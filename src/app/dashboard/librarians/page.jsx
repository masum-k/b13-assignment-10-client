"use client";

import React, { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { addBook } from "@/lib/actions/books";
import { toast } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import LibrarianUnauthCard from "@/components/LibrarianUnauthCard";

// Mock API Functions (Replace these URL targets with your real API endpoints)
const api = {
    createBook: async (payload) => (await fetch("/api/books", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })).json(),
    updateBook: async (id, payload) => (await fetch(`/api/books/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })).json(),
    deleteBook: async (id) => (await fetch(`/api/books/${id}`, { method: "DELETE" })).json(),
    togglePublish: async (id, currentStatus) => (await fetch(`/api/books/${id}/publish`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: currentStatus === "Published" ? "Unpublished" : "Published" }) })).json(),
    updateDelivery: async (id, status) => (await fetch(`/api/deliveries/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) })).json(),
};

const monthlyEarningsData = [{ month: "Jan", earnings: 120 }, { month: "Feb", earnings: 210 }, { month: "Mar", earnings: 180 }, { month: "Apr", earnings: 340 }, { month: "May", earnings: 290 }, { month: "Jun", earnings: 450 }];
const initialInventory = [
    { id: "BK-101", title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", deliveryFee: "4.50", description: "A novel set in the Jazz Age.", status: "Published", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400", requestCount: 42 },
    { id: "BK-102", title: "To Kill a Mockingbird", author: "Harper Lee", category: "Classic", deliveryFee: "3.99", description: "A story of racial injustice.", status: "Unpublished", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400", requestCount: 18 },
    { id: "BK-103", title: "Advanced Quantum Computing", author: "Dr. Aris Thorne", category: "Science", deliveryFee: "6.00", description: "In-depth research on qubit coherence.", status: "Pending Approval", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400", requestCount: 0 }
];
const initialDeliveries = [
    { id: "DEL-901", clientName: "Alice Smith", bookTitle: "The Great Gatsby", date: "2026-07-24", status: "Pending" },
    { id: "DEL-902", clientName: "Robert Johnson", bookTitle: "The Great Gatsby", date: "2026-07-22", status: "Dispatched" },
    { id: "DEL-903", clientName: "Emily Davis", bookTitle: "To Kill a Mockingbird", date: "2026-07-18", status: "Delivered" }
];
const emptyForm = { title: "", author: "", category: "Classic", deliveryFee: "", description: "", coverUrl: "" };

export default function LibrarianDashboardPage() {
    const isClient = useSyncExternalStore(() => () => { }, () => true, () => false);
    const [inventory, setInventory] = useState(initialInventory);
    const [deliveries, setDeliveries] = useState(initialDeliveries);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [uploadState, setUploadState] = useState({ loading: false, error: "" });
    const { data: session, isPending } = useSession();

    // 1. Create/Update Book API Handler with Payload Pattern
    const handleSaveBook = async (e) => {
        e.preventDefault();
        const cover = formData.coverUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400";

        // Structured Payload matching your exact requirement
        const payload = {
            ...formData,
            deliveryFee: parseFloat(formData.deliveryFee) || 0,
            cover,
            status: editingBook ? editingBook.status : "Pending Approval",
            requestCount: editingBook ? editingBook.requestCount : 0,
        };

        try {
            const res = await addBook(payload);
            if (res?.insertedId) {
                toast.success("Book added successfully!");
            }
        } catch (err) {
            console.error("Action error:", err);
        }

        try {
            if (editingBook) {
                // await api.updateBook(editingBook.id, payload);
                setInventory(prev => prev.map(b => b.id === editingBook.id ? { ...b, ...payload } : b));
            } else {
                // const res = await api.createBook(payload);
                const newBook = { id: `BK-${Date.now().toString().slice(-3)}`, ...payload };
                setInventory(prev => [newBook, ...prev]);
            }
            setFormData(emptyForm);
            setIsModalOpen(false);
        } catch (err) {
            alert("Failed to save book to backend api.");
        }
    };

    // 2. Toggle Publish Handler
    const handleTogglePublish = async (book) => {
        if (book.status === "Pending Approval") return alert("Books pending approval can only be approved by an Admin.");
        try {
            // await api.togglePublish(book.id, book.status);
            setInventory(prev => prev.map(b => b.id === book.id ? { ...b, status: b.status === "Published" ? "Unpublished" : "Published" } : b));
        } catch {
            alert("Failed to update status.");
        }
    };

    // 3. Delete Book Handler
    const handleDeleteBook = async (id) => {
        if (!confirm("Are you sure you want to delete this book?")) return;
        try {
            // await api.deleteBook(id);
            setInventory(prev => prev.filter(b => b.id !== id));
        } catch {
            alert("Failed to delete book.");
        }
    };

    // 4. Update Delivery Status Handler
    const handleDeliveryStatus = async (id, status) => {
        try {
            // await api.updateDelivery(id, status);
            setDeliveries(prev => prev.map(d => d.id === id ? { ...d, status } : d));
        } catch {
            alert("Failed to update delivery status.");
        }
    };

    const handleUploadToImgBB = async (file) => {
        setUploadState({ loading: true, error: "" });
        try {
            const body = new FormData();
            body.append("image", file);

            const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API}`, { method: "POST", body });

            const result = await res.json();
            if (result.success) setFormData(p => ({ ...p, coverUrl: result.data.url }));
            else setUploadState({ loading: false, error: "Upload failed." });
        } catch {
            setUploadState({ loading: false, error: "Network error." });
        } finally {
            setUploadState(p => ({ ...p, loading: false }));
        }
    };

    const handleOpenModal = (book = null) => {
        setEditingBook(book);
        setFormData(book ? { title: book.title, author: book.author, category: book.category, deliveryFee: book.deliveryFee, description: book.description, coverUrl: book.cover } : emptyForm);
        setUploadState({ loading: false, error: "" });
        setIsModalOpen(true);
    };

    return (
        <>
            {session?.user?.role === "reader" || !session?.user ? <LibrarianUnauthCard/> : <div className="min-h-screen bg-gray-50 text-gray-900 pb-16">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col gap-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Dashboard for Librarian</h1>
                        <button onClick={() => handleOpenModal()} className="bg-red-600 hover:bg-red-700 text-white font-medium text-xs h-10 px-4 rounded-lg flex items-center gap-2">
                            <span className="text-base font-bold">+</span> Add Book
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <StatCard title="Total Books Listed" value={inventory.length} color="blue" path="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        <StatCard title="Total Earnings" value="$1,590.00" color="emerald" path="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <StatCard title="Active Pending Requests" value={deliveries.filter(d => d.status === "Pending").length} color="amber" path="M13 10V3L4 14h7v7l9-11h-7z" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <h2 className="text-base font-bold mb-4">Overview Visual Representation</h2>
                            <div className="h-60 w-full">
                                {isClient ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={monthlyEarningsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                                            <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", borderColor: "#E5E7EB", fontSize: "12px" }} />
                                            <Area type="monotone" dataKey="earnings" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorEarnings)" name="Earnings ($)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : <div className="w-full h-full bg-gray-50 rounded-lg animate-pulse" />}
                            </div>
                        </div>

                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <h2 className="text-base font-bold mb-4">Most Requested Books</h2>
                            <div className="flex flex-col gap-3">
                                {[...inventory].sort((a, b) => b.requestCount - a.requestCount).slice(0, 3).map((book) => (
                                    <div key={book.id} className="flex items-center gap-3 p-2 rounded-lg border border-gray-100 bg-gray-50/50">
                                        <div className="relative w-9 h-12 bg-gray-200 rounded overflow-hidden shrink-0">
                                            <Image src={book.cover} alt={book.title} fill className="object-cover" sizes="36px" />
                                        </div>
                                        <div className="overflow-hidden flex-1">
                                            <h4 className="text-xs font-bold truncate">{book.title}</h4>
                                            <p className="text-[11px] text-gray-500 truncate">{book.author}</p>
                                            <span className="text-[10px] font-semibold text-blue-600">{book.requestCount} Requests</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Inventory Table with Image Column */}
                    <TableContainer title="Manage Inventory" headers={["Cover", "Book Title", "Author", "Category", "Delivery Fee", "Current Status", "Toggle", "Actions"]}>
                        {inventory.map((book) => (
                            <tr key={book.id} className="hover:bg-gray-50/50">
                                <td className="py-2 px-4">
                                    <div className="relative w-9 h-12 bg-gray-100 rounded overflow-hidden border border-gray-200">
                                        <Image
                                            src={book.cover}
                                            alt={book.title}
                                            fill
                                            className="object-cover"
                                            sizes="36px"
                                        />
                                    </div>
                                </td>
                                <td className="py-3 px-4 font-bold">{book.title}</td>
                                <td className="py-3 px-4 text-gray-600">{book.author}</td>
                                <td className="py-3 px-4">{book.category}</td>
                                <td className="py-3 px-4 font-mono">${book.deliveryFee}</td>
                                <td className="py-3 px-4"><StatusBadge status={book.status} /></td>
                                <td className="py-3 px-4 text-center">
                                    {book.status === "Pending Approval" ? (
                                        <span className="text-gray-400 text-[11px] italic">Cannot Publish</span>
                                    ) : (
                                        <button
                                            type="button" role="switch" aria-checked={book.status === "Published"}
                                            onClick={() => handleTogglePublish(book)}
                                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${book.status === "Published" ? "bg-red-600" : "bg-gray-300"}`}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${book.status === "Published" ? "translate-x-4" : "translate-x-0"}`} />
                                        </button>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-right space-x-2">
                                    <button onClick={() => handleOpenModal(book)} className="text-blue-600 hover:underline">Edit</button>
                                    <button onClick={() => handleDeleteBook(book.id)} className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </TableContainer>

                    {/* Deliveries Table */}
                    <TableContainer title="Manage Deliveries" headers={["Client Name", "Book Title", "Date", "Status"]}>
                        {deliveries.map((del) => (
                            <tr key={del.id} className="hover:bg-gray-50/50">
                                <td className="py-3.5 px-4 font-semibold">{del.clientName}</td>
                                <td className="py-3.5 px-4">{del.bookTitle}</td>
                                <td className="py-3.5 px-4 text-gray-500">{del.date}</td>
                                <td className="py-3.5 px-4">
                                    <select
                                        value={del.status}
                                        onChange={(e) => handleDeliveryStatus(del.id, e.target.value)}
                                        className={`border text-xs rounded-lg px-2.5 py-1 font-medium ${del.status === "Pending" ? "bg-amber-50 border-amber-200 text-amber-800" :
                                            del.status === "Dispatched" ? "bg-blue-50 border-blue-200 text-blue-800" :
                                                "bg-emerald-50 border-emerald-200 text-emerald-800"
                                            }`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Dispatched">Dispatched</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </TableContainer>
                </main>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl flex flex-col gap-4">
                            <h2 className="text-base font-bold">{editingBook ? "Edit Book" : "Add Book"}</h2>
                            <form onSubmit={handleSaveBook} className="flex flex-col gap-3">
                                {["title", "author"].map((field) => (
                                    <div key={field}>
                                        <label className="text-xs font-medium block capitalize mb-1">{field} *</label>
                                        <input
                                            type="text" required value={formData[field]}
                                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                            className="w-full border rounded-lg p-2 text-xs focus:border-red-600 outline-none"
                                        />
                                    </div>
                                ))}

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-medium block mb-1">Category *</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full border rounded-lg p-2 text-xs focus:border-red-600 outline-none"
                                        >
                                            {["Classic", "Romance", "Fiction", "Fantasy", "Science"].map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium block mb-1">Delivery Fee *</label>
                                        <input
                                            type="number" step="0.01" required value={formData.deliveryFee}
                                            onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value })}
                                            className="w-full border rounded-lg p-2 text-xs focus:border-red-600 outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-medium block mb-1">Description</label>
                                    <textarea
                                        rows={2} value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full border rounded-lg p-2 text-xs focus:border-red-600 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-medium block mb-1">Upload Cover Image (ImgBB API)</label>
                                    <input
                                        type="file" accept="image/*"
                                        onChange={(e) => e.target.files?.[0] && handleUploadToImgBB(e.target.files[0])}
                                        className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-gray-100"
                                    />
                                    {uploadState.loading && <p className="text-[10px] text-blue-600 mt-1">Uploading...</p>}
                                    {formData.coverUrl && !uploadState.loading && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="relative w-8 h-10 border rounded overflow-hidden">
                                                <Image src={formData.coverUrl} alt="Preview" fill className="object-cover" sizes="32px" />
                                            </div>
                                            <span className="text-[10px] text-emerald-600 font-medium">✓ Uploaded successfully</span>
                                        </div>
                                    )}
                                    {uploadState.error && <p className="text-[10px] text-red-500 mt-1">{uploadState.error}</p>}
                                </div>

                                <div className="flex justify-end gap-2 pt-2 border-t">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-100 text-xs px-3 py-1.5 rounded-lg">Cancel</button>
                                    <button type="submit" disabled={uploadState.loading} className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg">
                                        {editingBook ? "Save Changes" : "Submit Book"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>}
        </>
    );
}

// Reusable Helper Components
function StatCard({ title, value, color, path }) {
    const colors = { blue: "bg-blue-50 text-blue-600", emerald: "bg-emerald-50 text-emerald-600", amber: "bg-amber-50 text-amber-600" };
    return (
        <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg ${colors[color]} flex items-center justify-center`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={path} /></svg>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold mt-0.5">{value}</h3>
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = { Published: "text-emerald-700 bg-emerald-50 border-emerald-200", Unpublished: "text-gray-700 bg-gray-100 border-gray-200", "Pending Approval": "text-amber-700 bg-amber-50 border-amber-200" };
    return <span className={`border px-2.5 py-0.5 rounded-full font-medium ${styles[status]}`}>{status}</span>;
}

function TableContainer({ title, headers, children }) {
    return (
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-base font-bold mb-4">{title}</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                    <thead>
                        <tr className="border-b border-gray-200 text-gray-500 bg-gray-50/50">
                            {headers.map((h, i) => (
                                <th key={h} className={`py-3 px-4 ${i === headers.length - 1 ? "text-right" : i === headers.length - 2 ? "text-center" : ""}`}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">{children}</tbody>
                </table>
            </div>
        </div>
    );
}