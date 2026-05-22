import Link from "next/link";
import { FaXTwitter, FaLinkedin, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#1D2026] text-gray-400">

      {/* Top Banner */}
      <div className="bg-[#FF6636]">
        <div className="w-[85%] max-w-[1920px] mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 leading-tight">
              Start Learning with 67.1k+ Students Around the World
            </h3>
            <p className="text-white/80 text-sm">Join the fastest-growing tutor booking platform today.</p>
          </div>
          <Link
            href="/signup"
            className="shrink-0 flex items-center gap-2 bg-white text-[#FF6636] text-sm font-bold px-6 py-3.5 hover:bg-[#1D2026] hover:text-white transition-colors whitespace-nowrap"
          >
            Join For Free <FiArrowRight className="text-base" />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="w-[85%] max-w-[1920px] mx-auto pt-20 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-3">
              Medi<span className="text-[#FF6636]">Que</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              Your smart platform for booking qualified tutors and managing learning sessions online and offline.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#FF6636] flex items-center justify-center shrink-0">
                <FiPhone className="text-white text-sm" />
              </div>
              <span className="text-sm">+880 1712-000000</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#FF6636] flex items-center justify-center shrink-0">
                <FiMail className="text-white text-sm" />
              </div>
              <span className="text-sm">support@medique.com</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF6636] flex items-center justify-center shrink-0">
                <FiMapPin className="text-white text-sm" />
              </div>
              <span className="text-sm">Dhaka, Bangladesh</span>
            </div>
          </div>

          {/* Tutor Services */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-5">Tutor Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/tutors" className="hover:text-[#FF6636] transition-colors">Browse Tutors</Link></li>
              <li><Link href="/add-tutor" className="hover:text-[#FF6636] transition-colors">Add a Tutor</Link></li>
              <li><Link href="/my-tutors" className="hover:text-[#FF6636] transition-colors">My Tutors</Link></li>
              <li><Link href="/my-booked-sessions" className="hover:text-[#FF6636] transition-colors">Booked Sessions</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-5">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><span className="hover:text-[#FF6636] transition-colors cursor-pointer">Help Center</span></li>
              <li><span className="hover:text-[#FF6636] transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-[#FF6636] transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-[#FF6636] transition-colors cursor-pointer">Cookie Policy</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-5">Newsletter</h4>
            <p className="text-sm mb-4 leading-relaxed">
              Subscribe for tutor updates, new subjects, and learning tips.
            </p>
            <div className="flex border border-gray-700">
              <input
                suppressHydrationWarning
                type="email"
                placeholder="Your email address"
                className="bg-transparent outline-none flex-1 text-sm px-3 py-2.5 text-gray-300 placeholder-gray-600"
              />
              <button className="px-4 bg-[#FF6636] text-white hover:bg-[#e85520] transition-colors shrink-0">
                <FiArrowRight className="text-base" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-8">
        <div className="w-[85%] max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p className="text-xs text-gray-500">
            © 2026 MediQue. All rights reserved.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: FaXTwitter, label: "X / Twitter" },
              { Icon: FaLinkedin, label: "LinkedIn" },
              { Icon: FaInstagram, label: "Instagram" },
              { Icon: FaFacebookF, label: "Facebook" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-8 h-8 border border-gray-700 flex items-center justify-center text-gray-400 hover:border-[#FF6636] hover:text-[#FF6636] transition-colors"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;