<div align="center">

# 👑 MediQue

### Premium Tutor Booking & Educational Management Platform

*Bridging medical expertise with a seamless learning experience.*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-medique--client.vercel.app-2dd4bf?style=for-the-badge)](https://medique-client.vercel.app/)
&nbsp;
[![Next.js 15](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
&nbsp;
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
&nbsp;
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📖 Table of Contents

- [✨ Overview](#-overview)
- [🚀 Live Link](#-live-link)
- [❌ The Problem & ✅ The Solution](#-the-problem--the-solution)
- [💡 Business Value & SEO](#-business-value--seo)
- [🚀 Key Features](#-key-features)
- [📦 Tech Stack & Architecture](#-tech-stack--architecture)
- [🛠 Installation & Setup](#-installation--setup)
- [🚢 Production Deployment](#-production-deployment)

---

## ✨ Overview

MediQue is a state-of-the-art, high-performance tutor booking platform meticulously crafted for the medical and academic industry. It represents the perfect synergy between efficient session management and a premium user interface, setting a new standard for educational technology.

Engineered with a modern tech stack—featuring **Next.js 15**, **Express**, **MongoDB**, and **Better Auth**—the platform is anchored in a sophisticated Teal & Dark aesthetic. Every element is designed to provide a seamless "Academic Excellence" journey, ensuring users enjoy a lightning-fast, secure, and intuitive booking experience across all devices. From detailed tutor profiles to secure booking flows, MediQue is built to drive learning outcomes and student success.

---

## ❌ The Problem & ✅ The Solution

> The education industry has a digital accessibility problem.

Most tutor booking platforms are built on outdated architectures — slow, confusing for students, and lacking real-time availability. Students expect a modern, instant experience, but most portals deliver frustration.

| ❌ The Problem                                               | ✅ MediQue's Solution                                                       |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Clunky, outdated booking systems with no mobile support      | A fully custom **Modern UI** with high-contrast design & responsive layouts |
| Slow API responses killing the booking experience           | Express server optimized for Vercel ensuring sub-100ms response times   |
| Unsecured authentication or complex login flows             | Better Auth with Google OAuth + JWT for total security out-of-the-box           |
| Manual tracking of booked sessions and availability         | Fully automated slot management with real-time database updates             |
| Lack of visual aesthetic for premium tutoring services       | Meticulously crafted **MediQue Design System** with custom theme toggles         |

---

## 🚀 Live Link

→ [View MediQue Live](https://medique-client.vercel.app/)

<br/>

<table>
  <tr>
    <td width="50%">
      <img src="https://images.unsplash.com/photo-1576091160550-2173bdb999ef?q=80&w=880&h=495&auto=format&fit=crop" alt="MediQue Preview 1" width="100%" style="border-radius:8px;aspect-ratio:16/9;object-fit:cover" />
    </td>
    <td width="50%">
      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=880&h=495&auto=format&fit=crop" alt="MediQue Preview 2" width="100%" style="border-radius:8px;aspect-ratio:16/9;object-fit:cover" />
    </td>
  </tr>
  <tr>
    <td align="center"><sub>👨‍🏫 Professional Tutor Discovery</sub></td>
    <td align="center"><sub>📅 Seamless Session Booking</sub></td>
  </tr>
</table>

---

## 💡 Business Value & SEO

MediQue balances professional aesthetics with enterprise-grade performance through:

| Feature                           | Impact                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------- |
| **Optimized SEO**    | leveraging Next.js 15 for fast indexing and high-visibility tutor profiles      |
| **Professional Trust**         | High-contrast UI and smooth animations build immediate authority in education        |
| **Secure Infrastructure**   | JWT and Better Auth integration protects user and tutor privacy data |
| **Real-time Availability** | Instant slot updates prevent double-bookings and technical friction         |

---

## 🚀 Key Features

- **🎓 Smart Tutor Discovery** — Advanced search and filtering to find the perfect expert in seconds.
- **📅 Instant Slot Booking** — One-click booking system with automated availability management.
- **🔐 Secure Auth Ecosystem** — Full support for Email/Password and Google OAuth via Better Auth.
- **🌗 Theme Intelligence** — Fully optimized Dark and Light modes with persistent user preference.
- **📊 Student Dashboard** — Personalized views for tracking booked sessions and scheduled learning.
- **📁 Tutor Management** — Comprehensive tools for experts to list services and manage availability.

---

## 📦 Tech Stack & Architecture

### Frontend (Client-side)

| Layer                      | Technology                                            |
| -------------------------- | ----------------------------------------------------- |
| **Framework**        | next@^15.0.0 (App Router)                         |
| **State Management** | React Context API & Local Storage                     |
| **Auth Engine**      | better-auth@^1.6.9                                |
| **Styling**          | TailwindCSS & Framer Motion                       |
| **Components**       | Swiper Slider, Lucide Icons, React Toastify       |

### Backend (Server-side)

| Layer                      | Technology                                            |
| -------------------------- | ----------------------------------------------------- |
| **Environment**      | Node.js / Express Server                          |
| **Database**         | MongoDB@^7.2.0 (Atlas Cloud Integration)          |
| **Authentication**   | jose@^4.15.5 (CJS compatible JWT)                 |
| **Middleware**       | CORS, Body Parser, Dotenv                         |

---

## 🛠 Installation & Setup

1. **Clone & Install**

   ```bash
   git clone https://github.com/tayabunn/medique.git
   cd medique
   npm install --prefix medique-client
   npm install --prefix medique-server
   ```

2. **Environment Variables**

   Create `.env` files in both folders:

   **medique-client/.env:**
   ```env
   MONGODB_URI=your_mongodb_uri
   BETTER_AUTH_SECRET=your_secret
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_SERVER_URL=http://localhost:5000
   ```

3. **Run Development**

   ```bash
   # Terminal 1: Client
   cd medique-client && npm run dev
   # Terminal 2: Server
   cd medique-server && npm run dev
   ```

---

## 🚢 Production Deployment

MediQue is optimized for **Vercel** serverless environments.

- **Frontend**: Automatically deployed via the `medique-client` root with Zero-Config.
- **Backend**: Configured via `api/index.js` and `vercel.json` for high-performance serverless execution.

---

## 🤝 Social & Contributing

<div align="center">

Produced with precision by [Tayabunn](https://github.com/tayabunn).

*Join us in redefining medical education!*

[![GitHub](https://img.shields.io/badge/GitHub-Tayabunn-181717?style=for-the-badge&logo=github)](https://github.com/tayabunn)

</div>
