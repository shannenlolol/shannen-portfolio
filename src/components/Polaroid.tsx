import { useState } from "react";
import type { CSSProperties } from "react";
import "../cottage/polaroid.css";

/** Scrapbook fasteners drawn in CSS: washi tape, push pin, wooden button, clothes peg. */
export type Deco = "tape" | "pin" | "button" | "clip";
/**
 * `uncropped` keeps the photo's own aspect ratio instead of cropping it to 4:3.
 * `video` is an embeddable player URL: the photo becomes its thumbnail, with a play button.
 */
export type Photo = { src?: string; alt?: string; placeholder?: string; caption?: string; deco: Deco; tilt: number; width?: number; uncropped?: boolean; video?: string };

/** Width of LinkedIn's compact embed, the player the video thumbnails swap to. */
const EMBED_WIDTH = 504;

/** A tilted photo print. Without `src` it shows a labelled placeholder until the image is ready. */
export default function Polaroid({ photo }: { photo: Photo }) {
  // The player only loads on click, so the page stays fast and the embed's cookies aren't set until then.
  const [playing, setPlaying] = useState(false);
  // While playing, the print straightens and widens so the player is usable.
  const style = { "--tilt": `${playing ? 0 : photo.tilt}deg`, "--w": `${playing ? EMBED_WIDTH : (photo.width ?? 200)}px` } as CSSProperties;
  const classes = ["polaroid", photo.uncropped && "polaroid-uncropped", playing && "polaroid-playing"].filter(Boolean).join(" ");
  return (
    <figure className={classes} style={style}>
      <span className={`deco deco-${photo.deco}`} aria-hidden="true" />
      {playing ? (
        <iframe className="polaroid-embed" src={photo.video} title={`Video: ${photo.alt}`} allowFullScreen />
      ) : photo.video ? (
        <button type="button" className="polaroid-video" onClick={() => setPlaying(true)} aria-label={`Play video: ${photo.alt}`}>
          <img src={photo.src} alt="" loading="lazy" />
          <span className="polaroid-play" aria-hidden="true" />
        </button>
      ) : photo.src ? (
        <a href={photo.src} target="_blank" rel="noreferrer" aria-label={`View full photo: ${photo.alt}`}>
          <img src={photo.src} alt={photo.alt} loading="lazy" />
        </a>
      ) : (
        <div className="polaroid-placeholder">{photo.placeholder}</div>
      )}
      {photo.caption && <figcaption>{photo.caption}</figcaption>}
    </figure>
  );
}
