/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.coincap.io",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },
  env: {
    API_URL: "https://api.coincap.io/v2",
  },
};
