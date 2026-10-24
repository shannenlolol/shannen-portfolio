/**
 * The small copy of a site photo that pages show (made by scripts/make-display-images.mjs), for a path under
 * /assets/images. Links still point at the original, which the lightbox opens. Logos, videos and anything else
 * come back unchanged.
 */
export function displaySrc(src: string) {
  const match = /^\/assets\/images\/(?!logos\/)(.+)\.(jpe?g|png)$/i.exec(src);
  return match ? `/assets/display/${match[1]}.webp` : src;
}
