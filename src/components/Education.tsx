import { useRef } from "react";
import type { CSSProperties } from "react";
import useReveal from "../hooks/useReveal";
import Polaroid from "./Polaroid";
import type { Photo } from "./Polaroid";
import "../cottage/education.css";

type Stop = {
  id: string;
  when: string;
  logo: string;
  logoAlt: string;
  name: string;
  summary: string;
  tags?: { label: string; highlight?: boolean }[];
  link?: { label: string; href: string };
  photos: Photo[];
  dot: string;
};

const stops: Stop[] = [
  {
    id: "ntu",
    when: "2020 – 2024 · Singapore",
    logo: "/assets/logos/ntu.png",
    logoAlt: "",
    name: "Nanyang Technological University",
    summary: "Bachelor of Computing in Computer Science.",
    tags: [
      { label: "Honours with Distinction", highlight: true },
      { label: "Artificial Intelligence" },
      { label: "Data Science & Analytics" },
    ],
    photos: [
      {
        src: "/assets/images/education/ntu-friends.jpg",
        alt: "Shannen with friends at NTU",
        caption: "",
        deco: "tape",
        tilt: -3,
        width: 210,
      },
      {
        src: "/assets/images/education/ntu-mdp-certificate.png",
        alt: "Multidisciplinary Design Project certificate",
        caption: "",
        deco: "pin",
        tilt: 4,
        width: 170,
      },
    ],
    dot: "#b9cea0",
  },
  {
    id: "boston",
    when: "Summer 2023 · Boston, USA",
    logo: "/assets/logos/boston-university.png",
    logoAlt: "",
    name: "Boston University",
    summary: "Deep Learning and Design Strategy & Software.",
    photos: [],
    dot: "#e7b98a",
  },
  {
    id: "aws",
    when: "May 2025 · Certification",
    logo: "/assets/images/education/aws-ml-engineer-badge.png",
    logoAlt: "AWS certification badge",
    name: "AWS Certified Machine Learning Engineer – Associate",
    summary: "Building, training and deploying machine learning models on AWS.",
    link: {
      label: "View credential",
      href: "https://www.credly.com/badges/0fb77826-915f-4f24-91f7-ad6289124323/public_url",
    },
    photos: [],
    dot: "#9fb8c9",
  },
];

export default function Education() {
  const page = useRef<HTMLElement>(null);
  useReveal(page, ".edu-stop");
  return (
    <main id='main-content' className='education-page' ref={page}>
      <header className='edu-heading'>
        <div>
          <p className='eyebrow'>Education</p>
          <h1>
            Where I learned
            <br />
            to learn.
          </h1>
        </div>
      </header>

      <ol className='edu-trail'>
        {stops.map((stop) => (
          <li
            className='edu-stop'
            id={stop.id}
            key={stop.id}
            style={{ "--dot": stop.dot } as CSSProperties}
          >
            <article className='edu-card'>
              <div className='edu-card-head'>
                <img
                  src={stop.logo}
                  alt={stop.logoAlt}
                  width='56'
                  height='56'
                  loading='lazy'
                />
                <div>
                  <p className='edu-when'>{stop.when}</p>
                  <h2>{stop.name}</h2>
                </div>
              </div>
              <p className='edu-summary'>{stop.summary}</p>
              {stop.tags && (
                <ul className='edu-tags'>
                  {stop.tags.map((tag) => (
                    <li
                      key={tag.label}
                      className={tag.highlight ? "is-highlight" : undefined}
                    >
                      {tag.label}
                    </li>
                  ))}
                </ul>
              )}
              {stop.link && (
                <a
                  className='text-link'
                  href={stop.link.href}
                  target='_blank'
                  rel='noreferrer'
                >
                  {stop.link.label}
                </a>
              )}
            </article>
            {stop.photos.length > 0 && (
              <div className='edu-photos'>
                {stop.photos.map((photo) => (
                  <Polaroid photo={photo} key={photo.caption} />
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </main>
  );
}
