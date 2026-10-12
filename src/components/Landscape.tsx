import { memo, useEffect, useLayoutEffect, useRef } from "react";
import type { CSSProperties } from "react";
import markup from "../cottage/landscape.html?raw";
import { initializeScene } from "../cottage/scene.js";
import { worldPosition } from "../cottage/worldRoutes";
import "../cottage/cottage.css";

// Keep the exact same SVG and animation state alive while content pages change.
const Scene = memo(function Scene() {
  useLayoutEffect(() => initializeScene(), []);
  return <div className="landscape-art" dangerouslySetInnerHTML={{ __html: markup }} />;
});
export default function Landscape({ path, reduced }: { path: string; reduced: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scroll = () => {
      host.current?.setAttribute("data-scrolled", String(window.scrollY > window.innerHeight * .45));
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  return <div ref={host} id="landscape" className={`cottage-home persistent-landscape ${reduced ? "still-landscape" : ""}`} data-home={path === "/"} style={{ "--camera": Math.max(0, worldPosition(path)) - 3 } as CSSProperties}>
    <Scene />
  </div>;
}
