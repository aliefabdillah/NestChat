/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    SOCKET_URL: process.env.SOCKET_URL,
  }
};

export default nextConfig;
