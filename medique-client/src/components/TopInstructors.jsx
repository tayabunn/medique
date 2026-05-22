import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const instructors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    subject: "Mathematics & Physics",
    rating: 4.9,
    sessions: 320,
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80",
  },
  {
    id: 2,
    name: "Prof. James Carter",
    subject: "Computer Science",
    rating: 4.8,
    sessions: 274,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
  },
  {
    id: 3,
    name: "Ms. Aisha Rahman",
    subject: "English & Literature",
    rating: 4.9,
    sessions: 210,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
  },
  {
    id: 4,
    name: "Mr. Daniel Park",
    subject: "Chemistry & Biology",
    rating: 4.7,
    sessions: 189,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
];

const TopInstructors = () => {
  return (
    <section className="bg-gray-50 dark:bg-[#1D2026] py-24 px-4 md:px-8 border-t border-gray-100 dark:border-gray-800">
      <div className="w-[85%] max-w-[1920px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <p className="text-[#FF6636] text-sm font-bold uppercase tracking-widest mb-2">Our Experts</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D2026] dark:text-white">
              Top Instructor of the Month
            </h2>
          </div>
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 border border-[#FF6636] text-[#FF6636] text-sm font-bold px-5 py-2.5 hover:bg-[#FF6636] hover:text-white transition-colors shrink-0"
          >
            All Instructors <FiArrowRight className="text-base" />
          </Link>
        </div>

        {/* Instructor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="bg-(--card-bg) border border-(--card-border) group hover:shadow-lg hover:border-[#FF6636] transition-all flex flex-col text-center"
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-bold text-(--card-text) group-hover:text-[#FF6636] transition-colors mb-1">
                  {instructor.name}
                </h3>
                <p className="text-xs text-[#6E7485] mb-3">{instructor.subject}</p>
                <div className="flex items-center justify-center gap-3 text-xs text-[#6E7485] dark:text-gray-400 pt-3 border-t border-(--card-border)">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-amber-400" />
                    <span className="font-bold text-(--card-text)">{instructor.rating}</span>
                  </span>
                  <span className="w-px h-3 bg-(--card-border)" />
                  <span className="text-[#6E7485]">{instructor.sessions} Sessions</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TopInstructors;
