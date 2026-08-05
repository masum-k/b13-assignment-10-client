"use client";

import React, { useState } from "react";
import { Table, Card, Button } from '@heroui/react';
import { CircleArrowDownFill } from '@gravity-ui/icons';
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
  ArrowUpRight,
} from "lucide-react";
import Unauthorized from "@/components/Unauthorized";
import { useSession } from "@/lib/auth-client";
import { bookUpdate } from "@/lib/actions/books";
import { toast } from "react-toastify";

// --- Mock Data ---
const initialStats = {
  totalUsers: 1420,
  totalBooks: 3850,
  totalDeliveries: 942,
  totalRevenue: 28450,
};

// Category palette centered on clean white & red-600 contrast
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

export default function AdminDashboard({ books }) {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: session } = useSession();

  const handleApprove = async (id) => {
    const result = await bookUpdate(id, { status: 'Approved' });
    if (result.modifiedCount || result.acknowledged) {
      toast.success(`Book Approved`);
    }
  };

  const handleReject = async (id) => {
    const result = await bookUpdate(id, { status: 'Rejected' });
    if (result.modifiedCount || result.acknowledged) {
      toast.error(`Book Rejected`);
    }
  };

  // Helper to format date cleanly like "Oct 12, 2023"
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  // Status mapping for visual styling matching white & red theme
  const getStatusDetails = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return { color: 'text-emerald-600', label: 'Approved' };
      case 'rejected':
        return { color: 'text-red-600', label: 'Rejected' };
      case 'pending':
      default:
        return { color: 'text-amber-600', label: 'Pending' };
    }
  };

  // Helper to generate initials for the placeholder icon from book title
  const getInitials = (title) => {
    return title ? title.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'BK';
  };

  if (session?.user?.role !== "admin") return <Unauthorized />;

  return (
    <div className="min-h-screen bg-white text-slate-950 p-4 sm:p-8">
      {/* Header Bar */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
          </div>
          <p className="text-slate-500 text-sm mt-1">Platform management, book approvals, users, and transactions overview.</p>
        </div>
      </header>

      {/* 1. OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Total Users" value={initialStats.totalUsers.toLocaleString()} icon={<Users className="w-5 h-5 text-red-600" />} trend="+12% this month" />
            <MetricCard title="Total Books" value={initialStats.totalBooks.toLocaleString()} icon={<BookOpen className="w-5 h-5 text-emerald-600" />} trend="+48 new listings" />
            <MetricCard title="Total Deliveries" value={initialStats.totalDeliveries.toLocaleString()} icon={<Truck className="w-5 h-5 text-amber-600" />} trend="98.2% on-time" />
            <MetricCard title="Total Revenue" value={`$${initialStats.totalRevenue.toLocaleString()}`} icon={<DollarSign className="w-5 h-5 text-red-600" />} trend="+18.5% YoY" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Area Chart matching white & red-600 theme */}
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

      {/* Book Management Table */}
      <Table className="bg-white border border-slate-200 rounded-2xl shadow-sm">
        <Table.ScrollContainer>
          <Table.Content aria-label="Book approval management table">
            <Table.Header>
              <Table.Column isRowHeader className="text-slate-500 font-semibold pb-4 border-b border-slate-200 bg-slate-50 px-4">
                Book Title & Author
              </Table.Column>

              <Table.Column className="text-slate-500 font-semibold pb-4 border-b border-slate-200 bg-slate-50">
                Category
              </Table.Column>

              <Table.Column className="text-slate-500 font-semibold pb-4 border-b border-slate-200 bg-slate-50">
                Price
              </Table.Column>

              <Table.Column className="text-slate-500 font-semibold pb-4 border-b border-slate-200 bg-slate-50">
                Status
              </Table.Column>

              

              <Table.Column className="text-slate-500 font-semibold pb-4 border-b border-slate-200 bg-slate-50 text-right pr-4">
                Actions
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {books.map((book) => {
                const bookId = book._id?.$oid || book._id;
                const statusInfo = getStatusDetails(book.status);
                
                return (
                  <Table.Row key={bookId} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    {/* Book Avatar & Title / Author */}
                    <Table.Cell className="py-4 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-600 border border-red-100 rounded-lg font-bold text-sm tracking-wider">
                          {getInitials(book.title)}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 block">{book.title || book.name}</span>
                          <span className="text-xs text-slate-500">{book.author}</span>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* Category Pill */}
                    <Table.Cell className="py-4 align-middle">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium capitalize">
                        {book.category}
                      </span>
                    </Table.Cell>

                    {/* Price Pill */}
                    <Table.Cell className="py-4 align-middle">
                      <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold">
                        ${book.deliveryFee}
                      </span>
                    </Table.Cell>

                    {/* Status Dot */}
                    <Table.Cell className="py-4 align-middle">
                      <div className="flex items-center gap-2">
                        <CircleArrowDownFill className={`w-2 h-2 ${statusInfo.color}`} />
                        <span className={`text-sm font-semibold ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                    </Table.Cell>

                    

                    {/* Actions Panel */}
                    <Table.Cell className="py-4 pr-4 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        {book.status?.toLowerCase() !== 'approved' && (
                          <Button
                            size="sm"
                            variant="light"
                            onClick={() => handleApprove(bookId)}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg px-3 py-1 text-xs font-semibold transition-colors"
                          >
                            Approve
                          </Button>
                        )}
                        {book.status?.toLowerCase() !== 'rejected' && (
                          <Button
                            size="sm"
                            variant="light"
                            onClick={() => handleReject(bookId)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg px-3 py-1 text-xs font-semibold transition-colors"
                          >
                            Reject
                          </Button>
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}

// Helper Metric Card Component matching clean white & red-600 theme
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