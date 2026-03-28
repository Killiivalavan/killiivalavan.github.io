/** @type {import('next').NextConfig} */

// Polyfill for Node.js 22/25+ experimental webstorage
if (
  typeof globalThis !== 'undefined' &&
  globalThis.localStorage &&
  !globalThis.localStorage.getItem
) {
  globalThis.localStorage.getItem = () => null;
  globalThis.localStorage.setItem = () => {};
  globalThis.localStorage.removeItem = () => {};
}

const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: {
    // Custom loader for static export — passes through the src as-is.
    // This allows using Next.js <Image> component (lazy loading, priority hints, sizes)
    // without requiring a server-side image optimization endpoint.
    // To add real optimization later, swap this loader for a CDN-based one.
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.js',
  },
};

module.exports = nextConfig;
