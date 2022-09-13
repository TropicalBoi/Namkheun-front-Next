const { flush } = require('@emotion/css');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // hydrate: false,
};

module.exports = nextConfig;
