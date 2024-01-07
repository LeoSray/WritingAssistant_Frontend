/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig
module.exports = {
  async redirects() {
      return [
          {
              source: '/',
              destination: '/homepage',
              permanent: false, // Consider using false during development
          },
      ];
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};