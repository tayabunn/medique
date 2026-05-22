import { setServers } from "node:dns";

// Global DNS fix for MongoDB SRV resolution on Windows
if (process.env.NODE_ENV === "development") {
  try {
    setServers(["8.8.8.8", "8.8.4.4"]);
    console.log("NextConfig: DNS fix applied for database connectivity.");
  } catch (e) {
    console.warn("NextConfig: Failed to apply DNS fix", e.message);
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'postimg.cc',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
