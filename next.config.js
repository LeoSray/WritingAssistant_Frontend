/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = nextConfig;
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
  output: 'standalone',
};
