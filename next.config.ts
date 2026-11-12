import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    deviceSizes: [384, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [64, 128, 256, 320, 480],
    qualities: [70, 75, 80],
  },
};

export default nextConfig;
