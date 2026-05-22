import { FiSearch, FiCalendar, FiBookOpen, FiCheckCircle } from "react-icons/fi";

const steps = [
  {
    icon: FiSearch,
    step: "01",
    title: "Browse Tutors",
    desc: "Search and filter from our curated list of verified tutors by subject, location, and availability.",
  },
  {
    icon: FiCalendar,
    step: "02",
    title: "Book a Session",
    desc: "Choose a convenient time slot and book your session instantly. Get a unique digital session token.",
  },
  {
    icon: FiBookOpen,
    step: "03",
    title: "Start Learning",
    desc: "Join your tutor online or offline. Track your sessions and progress from your personal dashboard.",
  },
  {
    icon: FiCheckCircle,
    step: "04",
    title: "Get Certified",
    desc: "Complete sessions and receive completion records to showcase your dedication and academic growth.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#1D2026] dark:bg-black py-16 md:py-20 px-4 md:px-8">
      <div className="w-[85%] max-w-[1920px] mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#FF6636] text-sm font-bold uppercase tracking-widest mb-2">Simple Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            How MediQue Works
          </h2>
          <p className="text-gray-400 mt-4 text-base max-w-xl mx-auto">
            Get connected with your ideal tutor in four simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-700">
          {steps.map(({ icon: Icon, step, title, desc }, idx) => (
            <div
              key={step}
              className={`relative p-8 group hover:bg-[#FF6636] transition-colors duration-300 ${
                idx < steps.length - 1 ? "border-b sm:border-b-0 sm:border-r lg:border-b-0 lg:border-r border-gray-700" : ""
              }`}
            >
              {/* Step Number */}
              <span className="absolute top-6 right-6 text-5xl font-black text-gray-700 group-hover:text-white/20 transition-colors leading-none select-none">
                {step}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 bg-[#FF6636] group-hover:bg-white flex items-center justify-center mb-6 transition-colors">
                <Icon className="text-white group-hover:text-[#FF6636] text-xl transition-colors" />
              </div>

              <h3 className="text-base font-bold text-white mb-3">{title}</h3>
              <p className="text-gray-400 group-hover:text-white/80 text-sm leading-relaxed transition-colors">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
