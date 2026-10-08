import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El indicador de desarrollo tapaba el usuario en el sidebar.
  devIndicators: { position: "bottom-right" },
};

export default nextConfig;
