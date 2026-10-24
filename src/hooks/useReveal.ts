import { useLayoutEffect } from "react";
import type { RefObject } from "react";

/**
 * Adds `is-visible` to matching children of `ref` as they scroll into view.
 * Hiding only starts once `reveal-ready` is on the root, so content stays
 * readable without JavaScript or IntersectionObserver. A layout effect avoids
 * a flash of visible-then-hidden content on first paint.
 */
export default function useReveal(ref: RefObject<HTMLElement | null>, selector: string) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    root.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    root.querySelectorAll(selector).forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [ref, selector]);
}
