import TutorsClient from "./TutorsClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Browse Tutors — MediQue" };

async function getTutors() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
    const res = await fetch(`${apiUrl}/tutors`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch tutors:", error);
    return [];
  }
}

export default async function TutorsPage() {
  const tutors = await getTutors();

  return (
    <TutorsClient initialTutors={tutors} />
  );
}