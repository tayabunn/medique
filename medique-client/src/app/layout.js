import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./Providers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "MediQue — Smart Tutor Booking",
  description: "MediQue is a tutor booking platform where students can browse tutors, book sessions, and manage their learning schedule efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} font-outfit h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          toastClassName="!rounded-none !font-outfit !text-sm !font-semibold"
          progressClassName="!bg-[#FF6636]"
        />
      </body>
    </html>
  );
}
