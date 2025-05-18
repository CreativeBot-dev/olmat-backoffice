/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dev.api.olmat.web.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.olmat.web.id",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
