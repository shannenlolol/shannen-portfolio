import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landscape from "./components/Landscape";
import CottageHome from "./components/CottageHome";
import ExperienceOverview from "./components/ExperienceOverview";
import ExperiencePage from "./components/ExperiencePage";
import Education from "./components/Education";
import SkillsPage from "./components/SkillsPage";
import Projects from "./components/Projects";
import ContactPage from "./components/ContactPage";
import ResumePage from "./components/ResumePage";
import { experiences } from "./data/experiences";
import { travelDirection, worldPosition, worldRoutes } from "./cottage/worldRoutes";
import "./index.css";
import "./cottage/pages.css";
import "./cottage/world.css";

type Location = { path: string; search: string; key: number };
const readLocation = (): Location => ({ path: window.location.pathname.replace(/\/$/, "") || "/", search: window.location.search, key: Date.now() });
function Page({ route }: { route: Location }) {
  switch (route.path) {
    case "/": return <CottageHome />;
    case "/experience": return <ExperienceOverview />;
    case "/projects": return <Projects />;
    case "/education": return <Education />;
    case "/skills": return <SkillsPage />;
    case "/contact": return <ContactPage />;
    case "/resume": return <ResumePage />;
    default: return <ExperiencePage slug={route.path.startsWith("/experience/") ? route.path.slice(12) : ""} />;
  }
}
export default function App() {
  const [route, setRoute] = useState(readLocation);
  const [previous, setPrevious] = useState<Location | null>(null);
  const [direction, setDirection] = useState(0);
  const [reduced, setReduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const current = useRef(route);
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const outgoing = useRef<HTMLDivElement>(null);
  const arrivalScroll = useRef(0);
  const departureScroll = useRef(0);
  const queued = useRef<(() => void) | null>(null);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(preference.matches);
    preference.addEventListener("change", change);
    return () => preference.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    history.scrollRestoration = "manual";
    function go(url: URL, pop = false, scroll = 0) {
      if (busy.current) {
        if (pop) queued.current = () => go(new URL(window.location.href), true, scroll);
        return;
      }
      const next = { path: url.pathname.replace(/\/$/, "") || "/", search: url.search, key: Date.now() };
      if (next.path === current.current.path && next.search === current.current.search) return;
      departureScroll.current = window.scrollY;
      arrivalScroll.current = scroll;
      if (!pop) {
        history.replaceState({ ...history.state, worldScroll: window.scrollY }, "");
        history.pushState({ worldScroll: 0 }, "", url.pathname + url.search + url.hash);
      }
      busy.current = true;
      const travel = travelDirection(current.current.path, next.path);
      setDirection(travel);
      setPrevious(current.current);
      current.current = next;
      setRoute(next);
      window.scrollTo({ top: 0, behavior: "instant" });
      timer.current = setTimeout(() => {
        busy.current = false;
        setPrevious(null);
        window.scrollTo({ top: arrivalScroll.current, behavior: "instant" });
        const heading = stage.current?.querySelector<HTMLElement>(".world-current h1");
        heading?.setAttribute("tabindex", "-1");
        heading?.focus({ preventScroll: true });
        const pending = queued.current;
        queued.current = null;
        if (pending) requestAnimationFrame(pending);
      }, preferenceReduced() || travel === 0 ? 180 : 700);
    }
    function preferenceReduced() { return matchMedia("(prefers-reduced-motion: reduce)").matches; }
    function click(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement | SVGAElement>("a[href]");
      if (!link || link.getAttribute("target") === "_blank" || link.hasAttribute("download")) return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      const url = new URL(href, location.href);
      if (url.origin !== location.origin || worldPosition(url.pathname) < 0) return;
      event.preventDefault();
      go(url);
    }
    function pop(event: PopStateEvent) { go(new URL(location.href), true, event.state?.worldScroll ?? 0); }
    const interactive = (target: EventTarget | null) => target instanceof Element && !!target.closest('input,textarea,select,button,a,[role="slider"],[role="button"],[contenteditable="true"],object,iframe');
    function neighbor(step: number) {
      const index = worldPosition(current.current.path), target = worldRoutes[index + step];
      if (index >= 0 && target) go(new URL(target.path, location.origin));
    }
    function key(event: KeyboardEvent) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || interactive(event.target) || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
      event.preventDefault(); neighbor(event.key === "ArrowLeft" ? -1 : 1);
    }
    let touch: { x: number; y: number; time: number } | null = null;
    function touchStart(event: TouchEvent) {
      touch = event.touches.length === 1 && !interactive(event.target) ? { x: event.touches[0].clientX, y: event.touches[0].clientY, time: Date.now() } : null;
    }
    function touchEnd(event: TouchEvent) {
      if (!touch || !event.changedTouches[0]) return;
      const dx = event.changedTouches[0].clientX - touch.x, dy = event.changedTouches[0].clientY - touch.y;
      if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.7 && Date.now() - touch.time < 650 && !window.getSelection()?.toString()) neighbor(dx < 0 ? 1 : -1);
      touch = null;
    }
    document.addEventListener("click", click);
    document.addEventListener("keydown", key);
    window.addEventListener("popstate", pop);
    document.addEventListener("touchstart", touchStart, { passive: true });
    document.addEventListener("touchend", touchEnd, { passive: true });
    return () => {
      document.removeEventListener("click", click);document.removeEventListener("keydown", key);window.removeEventListener("popstate", pop);
      document.removeEventListener("touchstart", touchStart);document.removeEventListener("touchend", touchEnd);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    const title = worldRoutes.find(item => item.path === route.path)?.label ?? experiences.find(job => route.path === `/experience/${job.slug}`)?.company ?? "Page not found";
    document.title = route.path === "/" ? "Shannen Lee - Software Engineer" : `${title} - Shannen Lee`;
    if (outgoing.current) outgoing.current.inert = true;
  }, [route]);

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navbar path={route.path} />
    <Landscape path={route.path} reduced={reduced} />
    <div ref={stage} className={`world-stage ${previous ? "is-travelling" : ""} ${reduced || direction === 0 ? "fade-travel" : ""}`} style={{ "--direction": direction || 1, "--departure-scroll": `${departureScroll.current}px` } as CSSProperties}>
      {previous && <div ref={outgoing} key={previous.key} className={`world-view world-outgoing ${previous.path === "/" ? "at-home" : ""}`} aria-hidden="true"><Page route={previous} /></div>}
      <div key={route.key} className={`world-view world-current ${route.path === "/" ? "at-home" : ""}`}><Page route={route} /></div>
    </div>
    <Footer />
    <span className="world-announcement" role="status" aria-live="polite">{previous ? "" : `${worldRoutes.find(item => item.path === route.path)?.label ?? "Experience details"} page`}</span>
  </>;
}
