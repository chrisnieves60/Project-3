/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["placebear.com"],
  },
};

module.exports = nextConfig;
