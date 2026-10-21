import { useRef } from "react";
import type { CSSProperties } from "react";
import { experiences } from "../data/experiences";
import useReveal from "../hooks/useReveal";
import Polaroid from "./Polaroid";
import type { Photo } from "./Polaroid";
import "../cottage/experience.css";

/**
 * Captions are optional, so some or all entries in the data may leave them out.
 * `uncropped` is for group photos: shown whole as a wide print instead of cropped to 4:3.
 */
type ExperienceImage = { src: string; alt: string; caption?: string; uncropped?: boolean };

const shortPeriod = (period: string) => period.replace(" - Present", " – now").replace(" - ", " – ");

export default function ExperiencePage({ slug }: { slug: string }) {
  const page = useRef<HTMLElement>(null);
  useReveal(page, ".xd-reveal");
  const index = experiences.findIndex((job) => job.slug === slug);
  const job = experiences[index];
  if (!job)
    return (
      <main id="main-content" className="not-found">
        <p className="eyebrow">404 / Page not found</p>
        <h1>Let’s get you back.</h1>
        <a className="button button-primary" href="/">
          Return home
        </a>
      </main>
    );
  const next = experiences[(index + 1) % experiences.length];
  const [lead, ...rest] = job.images.map((img: ExperienceImage) => ({ src: `/assets/images/${img.src}`, alt: img.alt, caption: img.caption, uncropped: img.uncropped }));
  const leadPhoto: Photo = lead
    ? { ...lead, deco: "tape", tilt: -2.5, width: 270 }
    : { placeholder: "Photo to come", caption: "[caption]", deco: "tape", tilt: -2.5, width: 270 };
  // Pad the gallery to two prints with placeholders until more images are added.
  const gallery: Photo[] = [
    // Uncropped prints are wide enough to fill a row on their own, so the faces stay readable.
    ...rest.map((img, i) => ({ ...img, deco: (i % 2 ? "pin" : "button") as Photo["deco"], tilt: i % 2 ? 2 : -1.5, width: img.uncropped ? 560 : 260 })),
    ...Array.from({ length: Math.max(0, 2 - rest.length) }, (_, i): Photo => ({
      placeholder: "Screenshot or photo to come",
      caption: "[caption]",
      deco: (rest.length + i) % 2 ? "pin" : "button",
      tilt: (rest.length + i) % 2 ? 2 : -1.5,
      width: 260,
    })),
  ];

  return (
    <main id="main-content" className="experience-page" data-color={job.color} ref={page}>
      <a className="back-link" href="/experience">
        ← All experience
      </a>

      <header className="xd-hero">
        <div className="xd-hero-copy">
          <p className="xd-badge-row">
            <span className="xd-logo">
              <img src={job.logo} alt={job.company} />
            </span>
            <span>
              {job.role} · {shortPeriod(job.period)}
            </span>
          </p>
          <h1>{job.summary}</h1>
        </div>
        <ul className="xd-stamps" aria-label="Results">
          {job.metrics.map((metric) => (
            <li key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </li>
          ))}
        </ul>
      </header>

      <div className="xd-body">
        <aside className="xd-aside xd-reveal">
          <section>
            <h2 className="xd-label">Toolkit</h2>
            <ul className="xd-tools">
              {job.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>
          <div className="xd-lead-photo">
            <Polaroid photo={leadPhoto} />
          </div>
          {/* <section className="xd-proud">
            <span className="deco deco-pin" aria-hidden="true" />
            <h2 className="xd-label">Proudest moment</h2>
            <p>{job.proud}</p>
          </section> */}
          {job.recommendation && (
            <a className="text-link" href={job.recommendation} target="_blank" rel="noreferrer">
              Read my recommendation
            </a>
          )}
        </aside>

        <div className="xd-main">
          <p className="xd-context xd-reveal">{job.context}</p>
          <h2 className="xd-label xd-reveal">What I did</h2>
          <ol className="xd-contributions">
            {job.contributions.map((item, i) => (
              <li className="xd-reveal" key={item.title} style={{ "--i": i } as CSSProperties}>
                <span className="xd-number" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="xd-gallery xd-reveal">
            {gallery.map((photo, i) => (
              <Polaroid photo={photo} key={`${photo.src ?? "placeholder"}-${i}`} />
            ))}
          </div>
        </div>
      </div>

      <a className="xd-next" href={`/experience/${next.slug}`}>
        <span>
          <span className="xd-label">Next stop</span>
          <span className="xd-next-name">{next.company}</span>
        </span>
        <span className="xd-next-arrow" aria-hidden="true">
          →
        </span>
      </a>
    </main>
  );
}
