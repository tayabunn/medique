import { FiShield, FiClock, FiStar, FiZap } from "react-icons/fi";

const features = [
  {
    icon: FiShield,
    title: "Verified Tutors",
    desc: "Every tutor on MediQue is verified with real credentials, institution details, and experience records.",
  },
  {
    icon: FiClock,
    title: "Flexible Scheduling",
    desc: "Book sessions that fit your timetable — morning, evening, weekdays or weekends.",
  },
  {
    icon: FiStar,
    title: "Expert Across Subjects",
    desc: "From Mathematics and Physics to English and Computer Science — find the right expert.",
  },
  {
    icon: FiZap,
    title: "Instant Confirmation",
    desc: "Get immediate booking confirmation and a unique digital session token the moment you book.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white dark:bg-[#1D2026] py-24 px-4 md:px-8 overflow-hidden">
      <div className="w-[85%] max-w-[1920px] mx-auto">

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Text */}
          <div>
            <p className="text-[#FF6636] text-sm font-bold uppercase tracking-widest mb-2">Why MediQue</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D2026] dark:text-white mb-4">
              Built for Smarter Learning
            </h2>
            <p className="text-[#6E7485] dark:text-gray-400 text-base leading-relaxed max-w-md">
              We eliminate the hassle of manual scheduling so you can focus on what matters most — learning and growing.
            </p>
            <div className="mt-8 flex flex-col gap-5">
              {features.slice(0, 2).map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFEEE8] dark:bg-[#FF6636]/10 flex items-center justify-center shrink-0">
                    <Icon className="text-[#FF6636] text-xl" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1D2026] dark:text-white mb-1">{title}</h3>
                    <p className="text-sm text-[#6E7485] dark:text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="border border-gray-100 dark:border-gray-700 p-6 group hover:border-[#FF6636] hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-[#FFEEE8] dark:bg-[#FF6636]/10 flex items-center justify-center mb-4 group-hover:bg-[#FF6636] transition-colors">
                  <Icon className="text-[#FF6636] group-hover:text-white text-xl transition-colors" />
                </div>
                <h3 className="text-sm font-bold text-[#1D2026] dark:text-white mb-2">{title}</h3>
                <p className="text-xs text-[#6E7485] dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
