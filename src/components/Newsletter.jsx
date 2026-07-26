"use client";

import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className="w-full bg-white text-gray-700 font-sans">
      <div className="max-w-4xl mx-auto px-4 pt-16 pb-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
          Join Our Newsletter
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Signup to be the first to hear about exclusive deals, special offers and upcoming collections
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email for weekly newsletter."
            required
            className="w-full sm:flex-1 px-4 py-3 border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-colors cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}