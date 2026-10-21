export const worldRoutes = [
  { path: "/contact", label: "Contact" },
  { path: "/resume", label: "Resume" },
  { path: "/education", label: "Education" },
  { path: "/", label: "Home" },
  { path: "/experience", label: "Experience" },
  { path: "/projects", label: "Projects" },
  { path: "/skills", label: "Skills" },
];
export function worldPosition(path: string) {
  const normalized = path.replace(/\/$/, "") || "/";
  // Detail pages (/experience/<slug>, /projects/<slug>) share their section's place in the world.
  const section = normalized.match(/^\/(experience|projects)\/[^/]+$/);
  return worldRoutes.findIndex(route => route.path === (section ? `/${section[1]}` : normalized));
}
export function travelDirection(from: string, to: string) {
  return Math.sign(worldPosition(to) - worldPosition(from));
}
