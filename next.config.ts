import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'export',
      eslint: {
    // ⛔ Esto ignora errores de ESLint durante la build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
