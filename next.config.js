/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const nextConfig = withPWA({
  reactStrictMode: true,
  pwa:{
    register: true,
    skipWaiting: true,
    dest: "public",
    disable: process.env.NODE_ENV === "development"
  }
})

module.exports = nextConfig
