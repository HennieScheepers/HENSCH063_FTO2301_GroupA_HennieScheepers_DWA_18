/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  images: {
    domains: ["content.production.cdn.art19.com", "res.cloudinary.com"],
  },
};
