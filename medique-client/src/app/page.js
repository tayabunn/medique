import Banner from "@/components/Banner";
import FeaturedTutors from "@/components/FeaturedTutors";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import TopCategories from "@/components/TopCategories";
import TopInstructors from "@/components/TopInstructors";

export const metadata = {
  title: "MediQue — Book Expert Tutors Online",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Banner />
      <TopCategories />
      <FeaturedTutors />
      <HowItWorks />
      <WhyChooseUs />
      <TopInstructors />
    </main>
  );
}
