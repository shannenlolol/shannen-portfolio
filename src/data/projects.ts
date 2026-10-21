export type ProjectStatus = "live" | "polishing" | "earlier";

export type Project = {
  name: string;
  slug: string;
  kind: string;
  status: ProjectStatus;
  technologies: string[];
  description: string;
  /** Why I built it, in one personal line. */
  why?: string;
  /** A fuller description for the project's own page. */
  detail?: string;
  /** Where and how it runs, e.g. hosting. */
  runsOn?: string;
  /** Things I'm proud of, one line each. */
  highlights?: string[];
  links: { label: string; href: string }[];
  category: string;
  /** Screenshot under /assets/images. Without one, the card shows `placeholder`. */
  image?: string;
  placeholder?: string;
};

export const projects: Project[] = [
  {
    name: "Image Editor",
    slug: "image-editor",
    kind: "Creative tool",
    status: "live",
    technologies: ["Python", "Flask", "rembg", "JavaScript"],
    description: "Remove backgrounds, crop, rotate and batch-export photos, right in the browser.",
    why: "My dad needed clean product photos in exact sizes for retailers and e-commerce sites, and the free online editors he’d been using were full of ads and paywalls, and looked a bit dodgy. So I built him one without any of that.",
    runsOn: "PythonAnywhere",
    highlights: ["[One thing you’re proud of]"],
    links: [{ label: "Try the editor", href: "https://shannenlolol.pythonanywhere.com/" }, { label: "Source code", href: "https://github.com/shannenlolol/image-editor-web-app" }],
    category: "Python · Flask · Image processing",
    image: "projects/image-editor/after.png",
  },
  {
    name: "Health Tracker",
    slug: "health-tracker",
    kind: "Telegram bot · self-hosted",
    status: "polishing",
    technologies: [],
    description: "Send a meal photo on Telegram; it estimates the nutrition, saves it and charts your progress.",
    why: "After I took my family for a body composition scan, my parents wanted to cut down on body fat. I built this so they could log meals with just a photo and get a clearer picture of what they’re eating.",
    runsOn: "My NAS at home, behind a Cloudflare Tunnel",
    highlights: ["Access approvals handled inside Telegram", "[Another thing you’re proud of]"],
    links: [],
    category: "Telegram bot",
    placeholder: "Chat GIF to come: photo → estimate → save → chart",
  },
];
