import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  headers: async () => {
    return [
      {
        source: "/resume.pdf",
        headers: [
          { key: "Cache-Control", value: "public, max-age=60" },
        ],
      },
    ];
  },
};

export default nextConfig;
