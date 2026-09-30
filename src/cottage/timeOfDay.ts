const STORAGE_KEY = "sl-tod";
const frames = [
  { s: 0, top: "#A9B8E0", bot: "#F8CFC0", sun: "#FFD9A8", n: 0, w: .5, g: 0, st: 0, ff: 0 },
  { s: .25, top: "#9CCBE8", bot: "#E6F2E4", sun: "#FFF4C7", n: 0, w: 0, g: 0, st: 0, ff: 0 },
  { s: .5, top: "#9FB9D9", bot: "#F6D6A0", sun: "#FFB86B", n: .08, w: .7, g: 0, st: 0, ff: 0 },
  { s: .72, top: "#4B4E86", bot: "#F2A27C", sun: "#FF9466", n: .5, w: .6, g: .7, st: .25, ff: .5 },
  { s: 1, top: "#0E1530", bot: "#27385F", sun: "#FFB070", n: 1, w: 0, g: 1, st: 1, ff: 1 },
];
const clamp = (value: number) => Math.max(0, Math.min(1, value));
export function mix(a: string, b: string, t: number) {
  return "#" + [1, 3, 5].map(i => {
    const x = parseInt(a.slice(i, i + 2), 16);
    const y = parseInt(b.slice(i, i + 2), 16);
    return Math.round(x + (y - x) * t).toString(16).padStart(2, "0");
  }).join("");
}
export function frame(value: number) {
  const s = clamp(value);
  let i = 0;
  while (i < frames.length - 2 && s > frames[i + 1].s) i++;
  const a = frames[i], b = frames[i + 1];
  const t = clamp((s - a.s) / (b.s - a.s)), e = t * t * (3 - 2 * t);
  const number = (key: "n" | "w" | "g" | "st" | "ff") => a[key] + (b[key] - a[key]) * e;
  return { top: mix(a.top, b.top, e), bot: mix(a.bot, b.bot, e), sun: mix(a.sun, b.sun, e), n: number("n"), w: number("w"), g: number("g"), st: number("st"), ff: number("ff") };
}
export function phaseLabel(s: number) {
  return s < .1 ? "Dawn" : s < .42 ? "Day" : s < .62 ? "Sunset" : s < .84 ? "Dusk" : "Night";
}
function initialTime() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null && raw.trim() !== "" && Number.isFinite(Number(raw))) return clamp(Number(raw));
  } catch { /* Storage can be unavailable in private browsing. */ }
  const date = new Date(), hour = date.getHours() + date.getMinutes() / 60;
  const stops = [[0, 1], [5, 0], [10, .2], [13, .3], [17, .5], [19, .72], [21, .9], [24, 1]];
  let value = 1;
  if (hour >= 5) {
    for (let i = 1; i < stops.length - 1; i++) {
      if (hour <= stops[i + 1][0]) {
        const [h, s] = stops[i], [nextH, nextS] = stops[i + 1];
        value = s + (hour - h) / (nextH - h) * (nextS - s);
        break;
      }
    }
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches && value < .62 ? .8 : value;
}
let time = initialTime();
const listeners = new Set<(value: number) => void>();
export const getTimeOfDay = () => time;
export function subscribeTimeOfDay(listener: (value: number) => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
function applyPalette() {
  const f = frame(time), night = f.n > .45;
  const page = mix(mix("#D5E4B8", "#F2C98A", f.w * .18), "#131C20", f.n);
  const ink = night ? "#F1EEDC" : "#1E2A1B", muted = night ? "#C3CDB4" : "#3E4B39", accent = night ? "#B7D9A0" : "#2F5A2A";
  const vars: Record<string, string> = {
    "--page": page, "--ink": ink, "--ink2": muted, "--muted": muted, "--hi": accent, "--accent": accent,
    "--sky-top": f.top, "--sky-bot": f.bot, "--reading-sky": f.top,
    "--line": night ? "rgba(241,238,220,.25)" : "rgba(30,42,27,.25)",
    "--panel": night ? "rgba(10,16,22,.38)" : "rgba(255,255,255,.42)",
    "--surface": mix(page, night ? "#33434A" : "#F7FAEE", .6),
    "--time-pop": night ? "#1B282C" : "#F4F8EA",
    "--project-one": mix(page, f.bot, .2), "--project-two": mix(page, f.bot, .4), "--project-three": mix(page, f.top, .15),
  };
  const root = document.documentElement;
  root.dataset.theme = night ? "dark" : "light";
  root.style.colorScheme = night ? "dark" : "light";
  for (const [key, value] of Object.entries(vars)) root.style.setProperty(key, value);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", page);
}
export function setTimeOfDay(value: number, persist = true) {
  if (!Number.isFinite(value)) return;
  time = clamp(value);
  if (persist) {
    try { localStorage.setItem(STORAGE_KEY, String(time)); } catch { /* Keep working without storage. */ }
  }
  applyPalette();
  listeners.forEach(listener => listener(time));
}
export function initializeTimeOfDay() {
  setTimeOfDay(time);
  window.addEventListener("pageshow", () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null && saved.trim() && Number.isFinite(Number(saved))) setTimeOfDay(Number(saved), false);
    } catch { /* In-memory setting remains available. */ }
  });
  window.addEventListener("storage", event => {
    if (event.key === STORAGE_KEY && event.newValue !== null && event.newValue.trim() && Number.isFinite(Number(event.newValue))) {
      setTimeOfDay(Number(event.newValue), false);
    }
  });
}
