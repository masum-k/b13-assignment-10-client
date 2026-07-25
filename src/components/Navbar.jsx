"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Dropdown, Label } from "@heroui/react";
import {
  Search,
  User,
  ShoppingBag,
  Plus,
  ChevronDown,
  BookOpen,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Pages");
  const [category, setCategory] = useState("All categories");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { title: "Pages", items: ["Home", "About Us", "Contact", "FAQ"] },
    { title: "Shop", items: ["All Books", "Bestsellers", "New Releases", "Deals"] },
    { title: "Help", items: ["Shipping Info", "Returns", "Order Status", "Support"] },
    { title: "Theme", items: ["Light", "Dark", "System"] },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 font-sans sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="bg-red-600 text-white p-2 sm:p-2.5 rounded-md shadow-sm">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-wider text-black leading-none">
              ANGELICA
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-gray-500 uppercase mt-0.5 sm:mt-1">
              Inclusive Bookstore
            </span>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center space-x-6 text-sm font-medium text-gray-700">
          {navLinks.map((nav) => (
            <li key={nav.title} className="relative py-2">
              <Dropdown>
                <Dropdown.Trigger>
                  <div
                    onClick={() => setActiveTab(nav.title)}
                    className={`flex items-center gap-1 transition-colors hover:text-black py-1 cursor-pointer select-none ${
                      activeTab === nav.title
                        ? "text-black font-semibold border-b-2 border-black -mb-2.25"
                        : "text-gray-600"
                    }`}
                  >
                    <span>{nav.title}</span>
                    <Plus className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </Dropdown.Trigger>

                <Dropdown.Popover>
                  <Dropdown.Menu aria-label={`${nav.title} Options`}>
                    {nav.items.map((item) => (
                      <Dropdown.Item id={item} key={item}>
                        <Label>{item}</Label>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </li>
          ))}
        </ul>

        {/* --- 3. DESKTOP SEARCH BAR --- */}
        <div className="flex-1 max-w-md xl:max-w-lg hidden lg:flex items-center">
          <div className="flex w-full border border-gray-300 rounded-sm overflow-hidden focus-within:ring-1 focus-within:ring-red-600 focus-within:border-red-600">
            <Dropdown>
              <Dropdown.Trigger>
                <div className="flex items-center justify-between gap-2 px-3 py-2 bg-white text-xs text-gray-700 border-r border-gray-300 min-w-30 hover:bg-gray-50 cursor-pointer select-none">
                  <span className="truncate">{category}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                </div>
              </Dropdown.Trigger>

              <Dropdown.Popover>
                <Dropdown.Menu
                  aria-label="Categories"
                  onAction={(key) => setCategory(key.toString())}
                >
                  {[
                    "All categories",
                    "Fiction",
                    "Non-Fiction",
                    "Children's Books",
                    "Biography",
                  ].map((cat) => (
                    <Dropdown.Item id={cat} key={cat}>
                      <Label>{cat}</Label>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>

            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
            />

            <button
              type="button"
              className="bg-red-600 text-white px-4 flex items-center justify-center hover:bg-red-700 transition-colors shrink-0"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* --- 4. USER ACCOUNT & CART PANEL --- */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center bg-gray-100 rounded-sm px-2.5 sm:px-4 py-1.5 sm:py-2 space-x-2 sm:space-x-4 text-xs font-medium text-gray-800">
            {/* Account Dropdown */}
            <Dropdown>
              <Dropdown.Trigger>
                <div className="flex items-center gap-1 sm:gap-1.5 hover:text-black transition-colors cursor-pointer select-none">
                  <User className="w-4 h-4 text-gray-700" />
                  <span className="hidden sm:inline">My Account</span>
                  <Plus className="w-3 h-3 text-gray-400 hidden sm:inline" />
                </div>
              </Dropdown.Trigger>

              <Dropdown.Popover>
                <Dropdown.Menu aria-label="Account Options">
                  <Dropdown.Item id="profile">
                    <Label>Profile</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="orders">
                    <Label>My Orders</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="wishlist">
                    <Label>Wishlist</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="logout" variant="danger">
                    <Label>Log Out</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>

            <span className="text-gray-300">|</span>

            {/* Cart Section */}
            <Link
              href="/cart"
              className="flex items-center gap-1 sm:gap-1.5 hover:text-black transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-gray-700" />
              <span>€0.00</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 lg:hidden text-gray-700 hover:text-black focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* --- 5. MOBILE NAVIGATION MENU --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-4">
          {/* Mobile Search Input */}
          <div className="flex w-full border border-gray-300 rounded-sm overflow-hidden">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="button"
              className="bg-red-600 text-white px-4 flex items-center justify-center shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Navigation Accordions/Links */}
          <div className="space-y-3 pt-2">
            {navLinks.map((nav) => (
              <div key={nav.title} className="border-b border-gray-100 pb-2">
                <span className="text-xs font-bold uppercase text-gray-400 tracking-wider block mb-1">
                  {nav.title}
                </span>
                <div className="grid grid-cols-2 gap-2 pl-2">
                  {nav.items.map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="text-xs font-medium text-gray-700 hover:text-red-600 py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}