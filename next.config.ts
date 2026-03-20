import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;

// next.config.js
module.exports = {
  allowedDevOrigins: ['10.220.167.1'],
}
