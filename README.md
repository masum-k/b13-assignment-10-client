# 📚 Next.js E-Commerce Bookstore Front-End

A modern, responsive, and high-performance e-commerce bookstore web application built with **Next.js**, **React**, **Tailwind CSS**, and **HeroUI**. 

This project features dynamic book showcases, multi-category tabs, featured hero carousels, responsive catalog grids, and full navigation integration to individual product detail pages (`/books/[id]`).

---

## ✨ Features

- 🚀 **Hero Section Carousel**: Highlighting top promotions, category banners, and quick-feature callouts using Swiper.
- 🆕 **New Releases & Featured Sections**: Dynamic tab-filtered catalog layouts showcasing history, science, romance, travel, and more.
- 📦 **Responsive Book Catalog**: Multi-column responsive grid layout optimized for desktop, tablet, and mobile displays.
- 🔥 **Bestsellers Slider**: Interactive multi-item carousel for featured books with quick navigation controls.
- 🔗 **Integrated Navigation**: Seamless Next.js `<Link>` components wrapping book covers, titles, and cards directing to dynamic route pages (`/books/[id]`).
- 🛒 **Interactive UI Controls**: Action buttons for *Add to Cart* and *Wishlist* with event propagation management to prevent unintended navigation.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router / Pages Router compatible)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/), [HeroUI](https://www.heroui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Carousels/Sliders**: [Swiper.js](https://swiperjs.com/)
- **Image Optimization**: `next/image`

---

## 📂 Project Structure

```text
├── components/
│   ├── HeroSection.jsx        # Main banner slider & key features bar
│   ├── NewReleases.jsx        # Category tabs & promo banner grid
│   ├── BooksCatalog.jsx       # Tabbed catalog grid with quick action icons
│   └── BestSellingBooks.jsx   # Multi-card slider for top sellers
├── app/ or pages/
│   └── books/
│       └── [id]/              # Individual book details dynamic page
└── README.md