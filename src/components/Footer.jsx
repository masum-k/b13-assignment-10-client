"use client";

import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-gray-700 font-sans border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-gray-900">
              BOOK
              <span className="text-red-500 text-2xl font-black">W</span>
              ORM
            </div>

            <address className="not-italic text-xs text-gray-500 leading-relaxed">
              1418 River Drive, Suite 35 Cottonhall, CA 9622
              <br />
              United States
            </address>

            <div className="text-xs text-gray-500 space-y-1">
              <p>sale@bookworm.com</p>
              <p>+1 246-345-0695</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#instagram" aria-label="Instagram" className="opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png"
                  alt="Instagram"
                  width={4}
                  height={4}
                />
              </a>
              <a href="#facebook" aria-label="Facebook" className="opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png"
                  alt="Facebook"
                  width={4}
                  height={4}
                />
              </a>
              <a href="#youtube" aria-label="YouTube" className="opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                  alt="YouTube"
                  width={4}
                  height={4}
                />
              </a>
              <a href="#twitter" aria-label="Twitter" className="opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                  alt="Twitter"
                  width={4}
                  height={4}
                />
              </a>
              <a href="#pinterest" aria-label="Pinterest" className="opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/145/145808.png"
                  alt="Pinterest"
                  width={4}
                  height={4}
                />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li><a href="#about" className="hover:text-gray-900 transition-colors">About us</a></li>
              <li><a href="#sitemap" className="hover:text-gray-900 transition-colors">Sitemap</a></li>
              <li><a href="#bookmarks" className="hover:text-gray-900 transition-colors">Bookmarks</a></li>
              <li><a href="#signin" className="hover:text-gray-900 transition-colors">Sign in/Join</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li><a href="#help" className="hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="#returns" className="hover:text-gray-900 transition-colors">Returns</a></li>
              <li><a href="#recalls" className="hover:text-gray-900 transition-colors">Product Recalls</a></li>
              <li><a href="#accessibility" className="hover:text-gray-900 transition-colors">Accessibility</a></li>
              <li><a href="#contact" className="hover:text-gray-900 transition-colors">Contact Us</a></li>
              <li><a href="#pickup" className="hover:text-gray-900 transition-colors">Store Pickup</a></li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Policy</h3>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li><a href="#return-policy" className="hover:text-gray-900 transition-colors">Return Policy</a></li>
              <li><a href="#terms" className="hover:text-gray-900 transition-colors">Terms Of Use</a></li>
              <li><a href="#security" className="hover:text-gray-900 transition-colors">Security</a></li>
              <li><a href="#privacy" className="hover:text-gray-900 transition-colors">Privacy</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li><a href="#action" className="hover:text-gray-900 transition-colors">Action</a></li>
              <li><a href="#comedy" className="hover:text-gray-900 transition-colors">Comedy</a></li>
              <li><a href="#drama" className="hover:text-gray-900 transition-colors">Drama</a></li>
              <li><a href="#horror" className="hover:text-gray-900 transition-colors">Horror</a></li>
              <li><a href="#kids" className="hover:text-gray-900 transition-colors">Kids</a></li>
              <li><a href="#rom-com" className="hover:text-gray-900 transition-colors">Romantic Comedy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}