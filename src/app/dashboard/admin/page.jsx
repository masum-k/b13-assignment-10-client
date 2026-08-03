"use client";

import React, { useState } from "react";
import {
  Card,
  Button,
  Chip,
  Modal,
  useOverlayState,
  Select,
} from "@heroui/react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Users,
  BookOpen,
  Truck,
  DollarSign,
  CheckCircle,
  Trash2,
  EyeOff,
  ShieldAlert,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import Unauthorized from "@/components/Unauthorized";
import { useSession } from "@/lib/auth-client";

// --- Mock Data ---
const initialStats = {
  totalUsers: 1420,
  totalBooks: 3850,
  totalDeliveries: 942,
  totalRevenue: 28450,
};

// Category palette centered on red-600
const categoryData = [
  { name: "Fiction", value: 1200, color: "#DC2626" },       // red-600
  { name: "Non-Fiction", value: 850, color: "#059669" },    // emerald-600
  { name: "Science & Tech", value: 650, color: "#D97706" }, // amber-600
  { name: "History", value: 450, color: "#9333EA" },        // purple-600
  { name: "Biography", value: 400, color: "#475569" },      // slate-600
];

const revenueTrendData = [
  { month: "Jan", revenue: 3200, deliveries: 110 },
  { month: "Feb", revenue: 4100, deliveries: 145 },
  { month: "Mar", revenue: 3800, deliveries: 130 },
  { month: "Apr", revenue: 5200, deliveries: 180 },
  { month: "May", revenue: 4900, deliveries: 165 },
  { month: "Jun", revenue: 7250, deliveries: 212 },
];

const initialPendingBooks = [
  { id: "p1", title: "Quantum Computing Unleashed", author: "Dr. Elena Rostova", category: "Science & Tech", submittedDate: "2026-07-28" },
  { id: "p2", title: "The Silent Forest", author: "Marcus Vance", category: "Fiction", submittedDate: "2026-07-30" },
  { id: "p3", title: "Modern Economics 101", author: "Sarah Jenkins", category: "Non-Fiction", submittedDate: "2026-08-01" },
];

const initialAllBooks = [
  { id: "b101", title: "Clean Architecture", author: "Robert C. Martin", category: "Science & Tech", status: "Published", copies: 14 },
  { id: "b102", title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", status: "Published", copies: 8 },
  { id: "b103", title: "Sapiens", author: "Yuval Noah Harari", category: "History", status: "Published", copies: 21 },
  { id: "b104", title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", status: "Unpublished", copies: 0 },
];

const initialUsers = [
  { id: "u1", name: "Alex Morgan", email: "alex.m@example.com", role: "admin", joinedDate: "2025-01-15" },
  { id: "u2", name: "David Chen", email: "david.c@example.com", role: "librarian", joinedDate: "2025-03-22" },
  { id: "u3", name: "Sophia Martinez", email: "sophia.m@example.com", role: "user", joinedDate: "2025-06-10" },
  { id: "u4", name: "James Wilson", email: "james.w@example.com", role: "user", joinedDate: "2026-02-18" },
];

const initialTransactions = [
  { id: "TXN-9081", userEmail: "sophia.m@example.com", librarianEmail: "david.c@example.com", amount: "$45.00", date: "2026-08-02" },
  { id: "TXN-9082", userEmail: "james.w@example.com", librarianEmail: "david.c@example.com", amount: "$12.50", date: "2026-08-02" },
  { id: "TXN-9083", userEmail: "alex.m@example.com", librarianEmail: "system@library.org", amount: "$89.99", date: "2026-08-01" },
  { id: "TXN-9084", userEmail: "sophia.m@example.com", librarianEmail: "david.c@example.com", amount: "$24.00", date: "2026-07-31" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [pendingBooks, setPendingBooks] = useState(initialPendingBooks);
  const [allBooks, setAllBooks] = useState(initialAllBooks);
  const [users, setUsers] = useState(initialUsers);
  const [transactions] = useState(initialTransactions);
  const {data: session} = useSession();

  // HeroUI v3 Native Modal Overlay State
  const confirmModalState = useOverlayState();
  const [modalAction, setModalAction] = useState({ type: "", payload: null, title: "", message: "" });

  // --- Actions ---
  const handleApproveBook = (book) => {
    setPendingBooks((prev) => prev.filter((b) => b.id !== book.id));
    setAllBooks((prev) => [
      { id: book.id, title: book.title, author: book.author, category: book.category, status: "Published", copies: 1 },
      ...prev,
    ]);
  };

  const handleDeletePendingBook = (id) => {
    setPendingBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleTogglePublishBook = (bookId) => {
    setAllBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? { ...b, status: b.status === "Published" ? "Unpublished" : "Published" }
          : b
      )
    );
  };

  const handleDeleteBook = (bookId) => {
    setAllBooks((prev) => prev.filter((b) => b.id !== bookId));
    confirmModalState.close();
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  const handleDeleteUser = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    confirmModalState.close();
  };

  const openConfirmModal = (type, payload, title, message) => {
    setModalAction({ type, payload, title, message });
    confirmModalState.open();
  };

  const executeModalAction = () => {
    if (modalAction.type === "deleteUser") handleDeleteUser(modalAction.payload);
    if (modalAction.type === "deleteBook") handleDeleteBook(modalAction.payload);
  };

  if (session?.user?.role !== "admin") return <Unauthorized/>;


  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 sm:p-8">
      {/* Header Bar */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
          </div>
          <p className="text-slate-500 text-sm mt-1">Platform management, approvals, users, and transactions overview.</p>
        </div>

        {/* Tab Navigation - Highlighted with red-600 */}
        <div className="flex flex-wrap gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-200 shadow-sm">
          {[
            { id: "overview", label: "Overview" },
            { id: "approvals", label: `Pending Queue (${pendingBooks.length})` },
            { id: "users", label: "Users" },
            { id: "books", label: "Catalog" },
            { id: "transactions", label: "Transactions" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-red-600 text-white shadow-sm font-semibold"
                  : "text-slate-600 hover:text-red-600 hover:bg-red-50/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* TABS */}

      {/* 1. OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Total Users" value={initialStats.totalUsers.toLocaleString()} icon={<Users className="w-5 h-5 text-red-600" />} trend="+12% this month" />
            <MetricCard title="Total Books" value={initialStats.totalBooks.toLocaleString()} icon={<BookOpen className="w-5 h-5 text-emerald-600" />} trend="+48 new listings" />
            <MetricCard title="Total Deliveries" value={initialStats.totalDeliveries.toLocaleString()} icon={<Truck className="w-5 h-5 text-amber-600" />} trend="98.2% on-time" />
            <MetricCard title="Total Revenue" value={`$${initialStats.totalRevenue.toLocaleString()}`} icon={<DollarSign className="w-5 h-5 text-red-600" />} trend="+18.5% YoY" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Area Chart using red-600 stroke */}
            <Card className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Revenue & Delivery Growth</h2>
                  <p className="text-xs text-slate-500">Monthly breakdown of income and fulfilled requests</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-400" />
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueTrendData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#DC2626" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#FCA5A5", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                      itemStyle={{ color: "#0F172A" }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#DC2626" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Pie Chart */}
            <Card className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-sm">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Books by Category</h2>
                <p className="text-xs text-slate-500">Distribution across library catalog</p>
              </div>
              <div className="h-64 w-full flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                      itemStyle={{ color: "#0F172A" }}
                    />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: "12px", color: "#64748B" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* 2. BOOK APPROVAL QUEUE */}
      {activeTab === "approvals" && (
        <Card className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600" /> Pending Approval Queue
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Review and authorize new book submissions before public visibility.</p>
            </div>
            <Chip className="bg-amber-50 text-amber-700 border border-amber-200 text-xs">{pendingBooks.length} Pending</Chip>
          </div>

          {pendingBooks.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3 opacity-80" />
              <p className="text-base font-medium text-slate-800">Approval queue is completely empty!</p>
              <p className="text-xs text-slate-500">All submitted books have been processed.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="text-xs uppercase bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Book Title & Author</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Submitted Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pendingBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-semibold text-slate-900">{book.title}</div>
                        <div className="text-xs text-slate-500">by {book.author}</div>
                      </td>
                      <td className="px-4 py-4">
                        <Chip size="sm" variant="bordered" className="text-slate-600 border-slate-200">{book.category}</Chip>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-500">{book.submittedDate}</td>
                      <td className="px-4 py-4 text-right space-x-2">
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                          onPress={() => handleApproveBook(book)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" /> Approve & Publish
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600"
                          onPress={() => handleDeletePendingBook(book.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* 3. MANAGE USERS */}
      {activeTab === "users" && (
        <Card className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Platform Users Directory</h2>
            <p className="text-xs text-slate-500 mt-0.5">Manage user access rights, elevate privileges, or purge accounts.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Joined Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-900">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </td>
                    <td className="px-4 py-4">
                      <Chip
                        size="sm"
                        className={`capitalize font-medium ${
                          user.role === "admin"
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : user.role === "librarian"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {user.role}
                      </Chip>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500">{user.joinedDate}</td>
                    <td className="px-4 py-4 text-right flex items-center justify-end gap-2">
                      <Select
                        aria-label="Select role"
                        size="sm"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="w-32 bg-slate-50 border-slate-200 text-xs text-slate-800"
                      >
                        <Select key="user" value="user">Role: User</Select>
                        <Select key="librarian" value="librarian">Role: Librarian</Select>
                        <Select key="admin" value="admin">Role: Admin</Select>
                      </Select>

                      <Button
                        size="sm"
                        className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600"
                        onPress={() =>
                          openConfirmModal(
                            "deleteUser",
                            user.id,
                            "Delete User Account",
                            `Are you sure you want to permanently delete user "${user.name}" (${user.email})?`
                          )
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* 4. MANAGE ALL BOOKS */}
      {activeTab === "books" && (
        <Card className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Platform Master Book Catalog</h2>
            <p className="text-xs text-slate-500 mt-0.5">Admin administrative overrides: forcibly unpublish or purge listings anytime.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Book Info</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Copies</th>
                  <th className="px-4 py-3 text-right">Ultimate Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-900">{book.title}</div>
                      <div className="text-xs text-slate-500">by {book.author}</div>
                    </td>
                    <td className="px-4 py-4">
                      <Chip size="sm" variant="bordered" className="text-slate-600 border-slate-200">{book.category}</Chip>
                    </td>
                    <td className="px-4 py-4">
                      <Chip
                        size="sm"
                        color={book.status === "Published" ? "success" : "default"}
                        variant="dot"
                      >
                        {book.status}
                      </Chip>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500">{book.copies} available</td>
                    <td className="px-4 py-4 text-right space-x-2">
                      <Button
                        size="sm"
                        className={`text-xs ${
                          book.status === "Published"
                            ? "bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                        onPress={() => handleTogglePublishBook(book.id)}
                      >
                        {book.status === "Published" ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5 mr-1" /> Unpublish
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3.5 h-3.5 mr-1" /> Publish
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600"
                        onPress={() =>
                          openConfirmModal(
                            "deleteBook",
                            book.id,
                            "Completely Delete Listing",
                            `Are you sure you want to forcibly delete "${book.title}" from the platform? This action cannot be reversed.`
                          )
                        }
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* 5. VIEW ALL TRANSACTIONS */}
      {activeTab === "transactions" && (
        <Card className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Financial Transactions Audit Log</h2>
              <p className="text-xs text-slate-500 mt-0.5">Read-only system ledger tracking user payments and librarian assignments.</p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500">Total: {transactions.length} Records</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Transaction ID</th>
                  <th className="px-4 py-3">User Email</th>
                  <th className="px-4 py-3">Librarian / Handler Email</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 font-mono text-xs text-red-600 font-semibold">{txn.id}</td>
                    <td className="px-4 py-4 text-slate-800">{txn.userEmail}</td>
                    <td className="px-4 py-4 text-slate-500">{txn.librarianEmail}</td>
                    <td className="px-4 py-4 font-semibold text-emerald-600">{txn.amount}</td>
                    <td className="px-4 py-4 text-right text-xs text-slate-500">{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* HERO UI V3 COMPOUND CONFIRMATION MODAL */}
      <Modal state={confirmModalState}>
        <Modal.Backdrop variant="blur" />
        <Modal.Container>
          <Modal.Dialog className="bg-white border border-slate-200 text-slate-900 max-w-md p-6 rounded-2xl shadow-xl">
            <Modal.Header className="text-slate-900 text-lg font-bold pb-2">
              {modalAction.title}
            </Modal.Header>
            <Modal.Body className="py-2 text-sm text-slate-600">
              {modalAction.message}
            </Modal.Body>
            <Modal.Footer className="flex justify-end gap-2 pt-4 border-t border-slate-100 mt-4">
              <Button
                variant="ghost"
                onPress={() => confirmModalState.close()}
                className="text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white font-medium"
                onPress={executeModalAction}
              >
                Confirm Action
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal>
    </div>
  );
}

// Helper Metric Card Component
function MetricCard({ title, value, icon, trend }) {
  return (
    <Card className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{title}</span>
        <div className="p-2 rounded-xl bg-red-50 border border-red-100">{icon}</div>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
          <span className="text-emerald-600 font-medium">{trend}</span>
        </div>
      </div>
    </Card>
  );
}