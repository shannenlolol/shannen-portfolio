import type { CSSProperties } from "react";
import "../cottage/polaroid.css";

/** Scrapbook fasteners drawn in CSS: washi tape, push pin, wooden button, clothes peg, two corner tapes, a paper sticker. */
export type Deco = "tape" | "pin" | "button" | "clip" | "tape-corners" | "sticker";
/**
 * `uncropped` keeps the photo's own aspect ratio instead of cropping it to 4:3.
 * `loop` is a short muted clip played like a GIF, with `src` as its still poster frame.
 */
export type Photo = { src?: string; alt?: string; placeholder?: string; caption?: string; deco: Deco; tilt: number; width?: number; uncropped?: boolean; loop?: string; className?: string };

/**
 * A tilted photo print. Without `src` it shows a labelled placeholder until the image is ready. The photo opens in
 * the lightbox (see LightboxHost).
 */
export default function Polaroid({ photo }: { photo: Photo }) {
  const style = { "--tilt": `${photo.tilt}deg`, "--w": `${photo.width ?? 200}px` } as CSSProperties;
  // Visitors who ask for reduced motion see the poster frame instead of an autoplaying loop.
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <figure className={`polaroid ${photo.uncropped ? "polaroid-uncropped" : ""} ${photo.className ?? ""}`} style={style}>
      <span className={`deco deco-${photo.deco}`} aria-hidden="true" />
      {photo.src && photo.loop ? (
        <a href={photo.loop} target="_blank" rel="noreferrer" aria-label={`View full video: ${photo.alt}`} data-lightbox="video">
          <video src={photo.loop} poster={photo.src} autoPlay={!still} muted loop playsInline preload="metadata" />
        </a>
      ) : photo.src ? (
        <a href={photo.src} target="_blank" rel="noreferrer" aria-label={`View full photo: ${photo.alt}`} data-lightbox>
          <img src={photo.src} alt={photo.alt} loading="lazy" />
        </a>
      ) : (
        <div className="polaroid-placeholder">{photo.placeholder}</div>
      )}
      {photo.caption && <figcaption>{photo.caption}</figcaption>}
    </figure>
  );
}
