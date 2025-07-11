import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  assetPrefix: '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
