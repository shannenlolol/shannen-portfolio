import type { CSSProperties } from "react";
import "../cottage/polaroid.css";

/** Scrapbook fasteners drawn in CSS: washi tape, push pin, wooden button, clothes peg. */
export type Deco = "tape" | "pin" | "button" | "clip";
/**
 * `uncropped` keeps the photo's own aspect ratio instead of cropping it to 4:3.
 * `href` is where the print links to (defaults to the full-size photo); `video` adds a play badge.
 */
export type Photo = { src?: string; alt?: string; placeholder?: string; caption?: string; deco: Deco; tilt: number; width?: number; uncropped?: boolean; href?: string; video?: boolean };

/** A tilted photo print. Without `src` it shows a labelled placeholder until the image is ready. */
export default function Polaroid({ photo }: { photo: Photo }) {
  const style = { "--tilt": `${photo.tilt}deg`, "--w": `${photo.width ?? 200}px` } as CSSProperties;
  return (
    <figure className={photo.uncropped ? "polaroid polaroid-uncropped" : "polaroid"} style={style}>
      <span className={`deco deco-${photo.deco}`} aria-hidden="true" />
      {photo.src ? (
        <a href={photo.href ?? photo.src} target="_blank" rel="noreferrer" aria-label={`${photo.video ? "Watch video" : "View full photo"}: ${photo.alt}`}>
          <img src={photo.src} alt={photo.alt} loading="lazy" />
          {photo.video && <span className="polaroid-play" aria-hidden="true" />}
        </a>
      ) : (
        <div className="polaroid-placeholder">{photo.placeholder}</div>
      )}
      {photo.caption && <figcaption>{photo.caption}</figcaption>}
    </figure>
  );
}
