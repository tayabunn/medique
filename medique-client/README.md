# MediQue — Tutoring Management System

**Live URL:** [https://medique-tutor.web.app](https://medique-tutor.web.app)

MediQue is a specialized tutor booking platform designed to simplify the connection between students and expert educators. Built with a focus on efficiency and user experience, it features a smart scheduling system, real-time slot validation, and a secure booking flow.

## Key Features

- **Expert Tutor Marketplace:** Browse and filter verified tutors across multiple subjects like Mathematics, Physics, and Biology with detailed experience profiles.
- **Smart Booking System:** Real-time slot management that prevents overbooking and validates availability based on tutor-defined session start dates.
- **Digital Session Tokens:** Automatic generation of unique session tokens upon confirmed booking for easy tracking and verification.
- **Tutor Dashboard:** Comprehensive CRUD management allows users to add, edit, and manage their own tutor listings with an intuitive interface.
- **Premium User Experience:** A high-performance, responsive design featuring a dynamic banner carousel, smooth animations, and dark/light mode support.
- **Secure Authentication:** Robust multi-factor authentication including Google social login and JWT-protected private routes.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), HeroUI, Tailwind CSS, React Icons, React Toastify.
- **Backend:** Node.js, Express, MongoDB.
- **Auth:** Better Auth (with MongoDB adapter), JWT (Jose-CJS).

## Getting Started

1. Clone the repository for both client and server.
2. Install dependencies using `npm install`.
3. Set up environment variables (.env) with your MongoDB URI and Auth secrets.
4. Run the development server with `npm run dev`.
