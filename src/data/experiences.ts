/**
 * A keepsake stuck into the journal: a photo (or looping clip), an embedded post, or a letter. A photo's
 * `fastener` (washi tape, corner tapes, or a flower or star sticker) overrides the one the journal would pick.
 */
export type Keepsake =
  | { kind: "photo"; src: string; alt: string; caption?: string; uncropped?: boolean; loop?: string; fastener?: "tape" | "tape-corners" | "flower" | "star" }
  | { kind: "embed"; src: string; title: string }
  | { kind: "letter"; href: string; quote: string; from: string; title: string };

/**
 * One piece of a journal page: the role's introduction, its toolkit, some of its contributions
 * (by index, so the numbering carries over between pages), or a keepsake.
 */
export type JournalBlock = { kind: "intro" } | { kind: "toolkit" } | { kind: "did"; items: number[] } | Keepsake;

type Experience = {
  slug: string;
  /** Short label for the journal's bookmark tab. */
  tab: string;
  logo: string;
  company: string;
  attachedTo?: { name: string; logo: string };
  role: string;
  period: string;
  field: string;
  context: string;
  /** The role's palette in the journal, taken from its company's logo (see journal.css). Each role's is distinct. */
  color: "brick" | "blue" | "mustard" | "rose";
  skills: string[];
  contributions: { title: string; text: string }[];
  /** The role's journal pages, each a list of blocks. Wide screens show two pages at once, so an even count fills whole spreads. */
  pages: JournalBlock[][];
};

export const experiences: Experience[] = [
  {
    slug: "st-engineering",
    tab: "ST Eng.",
    logo: "/assets/logos/st-engineering.png",
    company: "ST Engineering",
    attachedTo: { name: "The Digital and Intelligence Service", logo: "/assets/logos/dis.png" },
    role: "Software Engineer",
    period: "Sep 2025 - Present",
    field: "Platforms & infrastructure",
    context:
      "Attached to The Digital and Intelligence Service",
    color: "brick",
    // proud: "[Proudest moment: one sentence]",
    skills: [
      "Python",
      "Dash",
      "Kafka",
      "PostgreSQL",
      "OpenShift",
      "Helm",
      "Argo CD",
    ],
    contributions: [
      {
        title: "A reusable application foundation",
        text: "A low-code Dash builder that turns JSON/YAML config into forms and charts for non-technical teams. Adopted across six use cases with no new code.",
      },
      {
        title: "Integrations through configuration",
        text: "Kafka and PostgreSQL integrations set up through config alone, cutting the effort for each new use case from days to hours.",
      },
      {
        title: "Repeatable deployment",
        text: "Helm and Argo CD GitOps deploys across OpenShift staging, replacing a manual multi-step setup with one repeatable process.",
      },
    ],
    pages: [
      [
        { kind: "intro" },
        { kind: "toolkit" },
        {
          kind: "photo",
          src: "experience/st-engineering/airshow-2026-photographers-1.jpg",
          alt: "Shannen and a fellow photographer holding up their cameras at the ST Engineering booth",
          fastener: "flower",
        },
      ],
      [
        { kind: "did", items: [0, 1, 2] },
        {
          kind: "photo",
          src: "experience/st-engineering/cny-dinner-2026.jpg",
          alt: "Shannen with colleagues dressed in red at a Chinese New Year dinner",
          uncropped: true,
        },
        {
          kind: "photo",
          src: "experience/st-engineering/mss-40th-anniversary.jpg",
          alt: "Mission Software & Services team photo in front of the 40th anniversary screen",
          uncropped: true,
          fastener: "tape",
        },
      ],
    ],
  },
  {
    slug: "dso",
    tab: "DSO",
    logo: "/assets/logos/dso.png",
    company: "DSO National Laboratories",
    role: "Machine Learning Engineer Intern",
    period: "Jul 2024 - Dec 2024",
    field: "Applied machine learning",
    context:
      "Designed and implemented a hierarchical reinforcement learning system for a simulated multi-agent environment.",
    color: "blue",
    // proud: "[Proudest moment: one sentence]",
    skills: ["Python", "PyTorch", "Hierarchical RL", "Multi-agent systems"],
    contributions: [
      {
        title: "Coordinating multiple agents",
        text: "A hierarchical reinforcement learning system in PyTorch that coordinates 12 agents in a simulated environment.",
      },
      {
        title: "Refining the learning environment",
        text: "Tuned the state, observation and reward design, lifting the task success rate above 95%.",
      },
    ],
    pages: [
      [
        { kind: "intro" },
        { kind: "toolkit" },
        {
          kind: "photo",
          src: "experience/dso/team-outing-prawning.jpg",
          alt: "Team outing during my DSO internship",
          fastener: "flower",
        },
      ],
      [
        { kind: "did", items: [0, 1] },
        {
          kind: "embed",
          src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7275813594418528256?compact=1",
          title: "LinkedIn post: DSO video featuring Shannen as an intern in the Information Division",
        },
      ],
    ],
  },
  {
    slug: "continental",
    tab: "Continental",
    logo: "/assets/logos/continental.png",
    company: "Continental Automotive",
    role: "Software Engineer Intern",
    period: "Jul 2023 - Dec 2023",
    field: "Robotics & connected systems",
    context:
      "Led development of a fleet management system for autonomous food delivery robots at Continental Automotive Singapore.",
    color: "mustard",
    // proud: "[Proudest moment: one sentence]",
    skills: ["Python", "FastAPI", "ROS2", "OpenRMF"],
    contributions: [
      {
        title: "Real-time fleet visibility",
        text: "Led a fleet management system on FastAPI, ROS2 and OpenRMF, with a live dashboard of each robot's battery, task and location.",
      },
      {
        title: "From development to live delivery",
        text: "Deployed it to three robots running a six-waypoint delivery route at once, with live demos for key stakeholders.",
      },
    ],
    pages: [
      [
        { kind: "intro" },
        { kind: "toolkit" },
        {
          kind: "photo",
          src: "experience/continental/delivery-robot-poster.jpg",
          loop: "experience/continental/delivery-robot.mp4",
          alt: "A yellow autonomous delivery robot driving along a footpath on its route",
        },
      ],
      [
        { kind: "did", items: [0, 1] },
        {
          kind: "photo",
          src: "experience/continental/intern-cohort.jpg",
          alt: "Shannen with colleagues at Continental",
          fastener: "tape",
        },
        {
          kind: "photo",
          src: "experience/continental/office-lobby.jpg",
          alt: "Shannen during her Continental internship",
        },
      ],
    ],
  },
  {
    slug: "amaris-ai",
    tab: "AMARIS.AI",
    logo: "/assets/logos/amaris-ai.png",
    company: "AMARIS.AI",
    role: "Software Developer Intern",
    period: "Jul 2022 - Dec 2022",
    field: "Full-stack product development",
    context:
      "Worked across React interfaces and FastAPI backend features for a paint-visualisation platform serving customers across APAC.",
    color: "rose",
    // proud: "[Proudest moment: one sentence]",
    skills: ["React", "FastAPI", "Python", "JavaScript", "Backend testing"],
    contributions: [
      {
        title: "Reusable, multilingual interfaces",
        text: "Reusable, multilingual React components and FastAPI features for a paint-visualisation platform used in eight APAC countries.",
      },
      {
        title: "Reliability across the product",
        text: "Fixed 30+ bugs across photo processing, billing and reports, and built a 70+ test backend suite to catch regressions before release.",
      },
    ],
    // No photos from this role, so its keepsake is the testimonial letter instead.
    pages: [
      [{ kind: "intro" }, { kind: "toolkit" }],
      [
        { kind: "did", items: [0, 1] },
        {
          kind: "letter",
          href: "/assets/images/experience/amaris-ai/testimonial.pdf",
          quote:
            "She was able to make headway and even perform at a level beyond her original scope of work.",
          from: "Prof Yu Chien Siang",
          title: "Chief Innovation and Trust Officer, Amaris AI",
        },
      ],
    ],
  },
];
