require("dotenv").config();
const environment = process.env.NODE_ENV || "dev";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ['', 'logo.clearbit.com', 'api.kickfire.com'],
  },
  experimental: {
    appDir: true,
  },
  typescript: {
    // !! WARN !! Dangerously allow production builds to successfully complete even if you have type errors.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
