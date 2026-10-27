import type { Project } from "../data/projects";
import { displaySrc } from "../displayImage";

/**
 * A project's trailer, shared by the Projects list and its own page: a short looping clip that opens the full
 * video in the lightbox. The files live in the project's `trailer` folder.
 */
export default function TrailerPreview({ project }: { project: Project }) {
  const base = `/assets/images/${project.trailer}`;
  // Visitors who ask for reduced motion see the poster frame instead of an autoplaying loop.
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  return <figure className={`project-preview trailer-preview trailer-${project.slug}`}>
    <div className="trailer-preview-canvas">
      <a href={`${base}/trailer.mp4`} target="_blank" rel="noreferrer" aria-label={`Watch ${project.name} in action`} data-lightbox="video">
        <video src={`${base}/trailer-loop.mp4`} poster={displaySrc(`${base}/trailer-poster.jpg`)} autoPlay={!still} muted loop playsInline preload="metadata" />
      </a>
    </div>
  </figure>;
}
