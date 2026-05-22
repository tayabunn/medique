import React from "react";
import FeaturedSlider from "./FeaturedSlider";

const Featured = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://medique-server.vercel.app";
  let tutors = [];

  try {
    const res = await fetch(`${apiUrl}/featured-tutors`, { cache: "no-store" });
    if (res.ok) {
      tutors = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch featured tutors:", error);
  }

  if (tutors.length === 0) {
    return null;
  }

  return <FeaturedSlider tutors={tutors} />;
};

export default Featured;
