import { displaySrc } from "../displayImage";

const base = "/assets/images/projects/image-editor";

/**
 * The Image Editor's preview, shared by the Projects list and its own page: a short looping clip that opens the
 * full video in the lightbox.
 */
export default function EditorPreview() {
  // Visitors who ask for reduced motion see the poster frame instead of an autoplaying loop.
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  return <figure className="project-preview editor-preview">
    <div className="editor-preview-canvas">
      <a href={`${base}/trailer.mp4`} target="_blank" rel="noreferrer" aria-label="Watch the Image Editor in action" data-lightbox="video">
        <video src={`${base}/trailer-loop.mp4`} poster={displaySrc(`${base}/trailer-poster.jpg`)} autoPlay={!still} muted loop playsInline preload="metadata" />
      </a>
    </div>
  </figure>;
}
