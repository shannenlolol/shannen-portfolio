import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import "../cottage/lightbox.css";

type Shown = { src: string; alt: string; video: boolean; poster?: string };

/** The photo (or clip) shown large over the page. Clicking around it, the close button or Esc closes it. */
function Lightbox({ shown, onClose }: { shown: Shown; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => dialog.current?.showModal(), []);
  const close = () => dialog.current?.close();
  // Touches here belong to the viewer, not to any page-turning handler further up React's tree.
  const keep = (event: TouchEvent) => event.stopPropagation();
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <dialog
      className="lightbox"
      ref={dialog}
      aria-label={shown.alt}
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && close()}
      onTouchStart={keep}
      onTouchEnd={keep}
      data-local-swipe
    >
      <div className="lightbox-print">
        {shown.video ? <video src={shown.src} poster={shown.poster} autoPlay={!still} muted loop playsInline controls /> : <img src={shown.src} alt={shown.alt} />}
      </div>
      <button type="button" className="lightbox-close" onClick={close} aria-label="Close photo">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </dialog>
  );
}

/**
 * Opens any link marked `data-lightbox` in the lightbox instead of following it, wherever it is on the site
 * (React pages and the static Home markup alike). The link points at the full image or clip, so modified clicks
 * (e.g. a new tab) still work. `data-lightbox="video"` shows a clip, with the link's video or image as its poster.
 */
export default function LightboxHost() {
  const [shown, setShown] = useState<Shown | null>(null);
  useEffect(() => {
    function click(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[data-lightbox]");
      if (!link) return;
      event.preventDefault();
      const media = link.querySelector<HTMLImageElement | HTMLVideoElement>("img,video");
      const video = link.dataset.lightbox === "video";
      setShown({
        src: link.href,
        alt: media?.getAttribute("alt") ?? media?.getAttribute("aria-label") ?? link.getAttribute("aria-label") ?? "",
        video,
        poster: media instanceof HTMLVideoElement ? media.poster : undefined,
      });
    }
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return shown && <Lightbox shown={shown} onClose={() => setShown(null)} />;
}
