/**
 * Custom image loader for Next.js static export (GitHub Pages).
 * Since there's no server to run image optimization, this loader simply
 * returns the src as-is — but still allows using <Image> for its
 * built-in lazy loading, size hints, and priority preloading.
 *
 * To add real optimization later, replace this with a Cloudflare Images
 * or Imgix loader.
 *
 * @param {{ src: string, width: number, quality?: number }} params
 * @returns {string}
 */
export default function staticImageLoader({ src }) {
  return src;
}
