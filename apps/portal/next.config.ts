import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: false,
  },
  // Enable TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
