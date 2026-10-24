import type { CSSProperties } from "react";
import { displaySrc } from "../displayImage";
import "../cottage/polaroid.css";

/** Scrapbook fasteners drawn in CSS: washi tape, push pin, wooden button, clothes peg, two corner tapes, a paper sticker. */
export type Deco = "tape" | "pin" | "button" | "clip" | "tape-corners" | "sticker";
/**
 * `uncropped` keeps the photo's own aspect ratio (`ratio`, width ÷ height, when known) instead of cropping it to 4:3.
 * `loop` is a short muted clip played like a GIF, with `src` as its still poster frame.
 */
export type Photo = { src?: string; alt?: string; placeholder?: string; caption?: string; deco: Deco; tilt: number; width?: number; uncropped?: boolean; ratio?: number; loop?: string; className?: string };

/**
 * A tilted photo print. Without `src` it shows a labelled placeholder until the image is ready. The photo opens in
 * the lightbox (see LightboxHost). `eager` is for prints that are drawn only once they're on screen anyway (the
 * journal's pages and their turning copies): they load and decode straight away, so a page that is rebuilt as it
 * turns shows its photos in the same frame rather than blinking them in.
 */
export default function Polaroid({ photo, eager = false }: { photo: Photo; eager?: boolean }) {
  const style = { "--tilt": `${photo.tilt}deg`, "--w": `${photo.width ?? 200}px` } as CSSProperties;
  // Visitors who ask for reduced motion see the poster frame instead of an autoplaying loop.
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <figure className={`polaroid ${photo.uncropped ? "polaroid-uncropped" : ""} ${photo.className ?? ""}`} style={style}>
      <span className={`deco deco-${photo.deco}`} aria-hidden="true" />
      {photo.src && photo.loop ? (
        <a href={photo.loop} target="_blank" rel="noreferrer" aria-label={`View full video: ${photo.alt}`} data-lightbox="video">
          <video src={photo.loop} poster={displaySrc(photo.src)} autoPlay={!still} muted loop playsInline preload="metadata" />
        </a>
      ) : photo.src ? (
        <a href={photo.src} target="_blank" rel="noreferrer" aria-label={`View full photo: ${photo.alt}`} data-lightbox>
          <img src={displaySrc(photo.src)} alt={photo.alt} loading={eager ? "eager" : "lazy"} decoding={eager ? "sync" : "async"} style={photo.uncropped && photo.ratio ? { aspectRatio: photo.ratio } : undefined} />
        </a>
      ) : (
        <div className="polaroid-placeholder">{photo.placeholder}</div>
      )}
      {photo.caption && <figcaption>{photo.caption}</figcaption>}
    </figure>
  );
}
