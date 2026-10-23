import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, TouchEvent } from "react";
import { createPortal } from "react-dom";
import "../cottage/polaroid.css";

/** Scrapbook fasteners drawn in CSS: washi tape, push pin, wooden button, clothes peg, two corner tapes, a paper sticker. */
export type Deco = "tape" | "pin" | "button" | "clip" | "tape-corners" | "sticker";
/**
 * `uncropped` keeps the photo's own aspect ratio instead of cropping it to 4:3.
 * `loop` is a short muted clip played like a GIF, with `src` as its still poster frame.
 */
export type Photo = { src?: string; alt?: string; placeholder?: string; caption?: string; deco: Deco; tilt: number; width?: number; uncropped?: boolean; loop?: string; className?: string };

/**
 * The photo (or clip) shown large over the page. Clicking around it, the close button or Esc closes it.
 * It is portalled to the body so the print's tilt and page styles don't reach it.
 */
function Lightbox({ photo, still, onClose }: { photo: Photo; still: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => dialog.current?.showModal(), []);
  const close = () => dialog.current?.close();
  // React passes events up through portals, so touches here would otherwise turn the journal's pages.
  const keep = (event: TouchEvent) => event.stopPropagation();
  return createPortal(
    <dialog
      className="lightbox"
      ref={dialog}
      aria-label={photo.alt}
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && close()}
      onTouchStart={keep}
      onTouchEnd={keep}
      data-local-swipe
    >
      <div className="lightbox-print">
        {photo.loop ? <video src={photo.loop} poster={photo.src} autoPlay={!still} muted loop playsInline controls /> : <img src={photo.src} alt={photo.alt} />}
      </div>
      <button type="button" className="lightbox-close" onClick={close} aria-label="Close photo">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </dialog>,
    document.body,
  );
}

/** A tilted photo print. Without `src` it shows a labelled placeholder until the image is ready. */
export default function Polaroid({ photo }: { photo: Photo }) {
  const [open, setOpen] = useState(false);
  const style = { "--tilt": `${photo.tilt}deg`, "--w": `${photo.width ?? 200}px` } as CSSProperties;
  // Visitors who ask for reduced motion see the poster frame instead of an autoplaying loop.
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // A plain click opens the lightbox; modified clicks keep the link's own behaviour (e.g. a new tab).
  function view(event: MouseEvent) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setOpen(true);
  }
  return (
    <figure className={`polaroid ${photo.uncropped ? "polaroid-uncropped" : ""} ${photo.className ?? ""}`} style={style}>
      <span className={`deco deco-${photo.deco}`} aria-hidden="true" />
      {photo.src && photo.loop ? (
        <a href={photo.loop} target="_blank" rel="noreferrer" aria-label={`View full video: ${photo.alt}`} onClick={view}>
          <video src={photo.loop} poster={photo.src} autoPlay={!still} muted loop playsInline preload="metadata" />
        </a>
      ) : photo.src ? (
        <a href={photo.src} target="_blank" rel="noreferrer" aria-label={`View full photo: ${photo.alt}`} onClick={view}>
          <img src={photo.src} alt={photo.alt} loading="lazy" />
        </a>
      ) : (
        <div className="polaroid-placeholder">{photo.placeholder}</div>
      )}
      {photo.caption && <figcaption>{photo.caption}</figcaption>}
      {open && <Lightbox photo={photo} still={still} onClose={() => setOpen(false)} />}
    </figure>
  );
}
