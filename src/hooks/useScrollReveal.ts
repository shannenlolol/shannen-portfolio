import { useEffect } from "react";

/** Progressive enhancement: content stays readable without motion or observer support. */
export default function useScrollReveal(enabled: boolean) {
  useEffect(() => {
    if (!enabled || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const selector =
      ".home-page .section-heading, .home-page .experience-row, .home-project-card, .skills-preview, .education-preview, .home-page .contact-section";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (preference.matches || !("animate" in entry.target)) continue;
          const siblings = entry.target.parentElement?.children;
          const index = siblings
            ? Array.from(siblings).indexOf(entry.target)
            : 0;
          const animation = entry.target.animate(
            [
              { opacity: 0, transform: "translateY(24px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 650,
              delay: Math.min(index * 65, 195),
              easing: "cubic-bezier(.22, 1, .36, 1)",
              fill: "backwards",
            },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(selector)
      .forEach((element) => observer.observe(element));
    function cancelMotion() {
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
    }
    preference.addEventListener("change", cancelMotion);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", cancelMotion);
    };
  }, [enabled]);
}
