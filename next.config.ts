import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noai, noimageai" },
          // Also add a generic opt-out header used by some crawlers
          { key: "Permissions-Policy", value: "interest-cohort=()" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
