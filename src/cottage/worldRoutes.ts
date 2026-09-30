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
  return normalized.startsWith("/experience/") ? 4 : worldRoutes.findIndex(route => route.path === normalized);
}
export function travelDirection(from: string, to: string) {
  return Math.sign(worldPosition(to) - worldPosition(from));
}
