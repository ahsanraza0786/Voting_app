// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   // If you have images from domains, add them here
//   images: {
//     domains: [], // leave empty if no external images
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // leave empty if no external images
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups', // needed for Google OAuth popup
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none', // needed for Google OAuth popup
          },
        ],
      },
    ];
  },
};

export default nextConfig;

