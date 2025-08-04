import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // ⬅️ tambahkan ini
  },
};

export default nextConfig;
