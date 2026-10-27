export type ProjectStatus = "live" | "polishing" | "done" | "earlier";

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
  /**
   * Folder under /assets/images holding trailer.mp4, a short muted trailer-loop.mp4 and trailer-poster.jpg.
   * When set, the loop is shown in place of `image`.
   */
  trailer?: string;
  placeholder?: string;
};

export const projects: Project[] = [
  {
    name: "Where to Touch Grass",
    slug: "where-to-touch-grass",
    kind: "Web app · in progress",
    status: "live",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MapLibre", "Supabase"],
    description: "A guide to every park, nature reserve and trail in Singapore: which entrance to use, how to get there, how long it takes, and what it actually looks like.",
    why: "I got curious about the nature spots in Singapore and found there was no one place to look them up. Many I only found through a lot of digging or word of mouth, and plenty are still barely known. So I’m gathering it all in one place, and making it something everyone can add to.",
    detail: "An interactive map and searchable list of spots, filterable by region and type. Each place has its own page with photos, time to explore, getting there, entrances, tips and nearby spots. Anyone can browse without an account; logging in with Google or email to add tips and photos is coming soon.",
    runsOn: "Vercel, with Supabase for logins, contributions and photo storage",
    highlights: ["[One thing you’re proud of]"],
    links: [{ label: "Visit the site", href: "https://wheretotouchgrass.com" }],
    category: "Next.js · Maps · Supabase",
    placeholder: "Map screenshot to come",
  },
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
    trailer: "projects/image-editor",
  },
  {
    name: "Health Tracker",
    slug: "health-tracker",
    kind: "Telegram bot · self-hosted",
    status: "done",
    technologies: [],
    description: "Send a meal photo on Telegram; it estimates the nutrition, saves it and charts your progress.",
    why: "After I took my family for a body composition scan, my parents wanted to cut down on body fat. I built this so they could log meals with just a photo and get a clearer picture of what they’re eating.",
    runsOn: "My NAS at home, behind a Cloudflare Tunnel",
    highlights: ["Access approvals handled inside Telegram", "[Another thing you’re proud of]"],
    links: [],
    category: "Telegram bot",
    trailer: "projects/health-tracker",
  },
];
