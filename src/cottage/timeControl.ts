import { frame, getTimeOfDay, phaseLabel, setTimeOfDay, subscribeTimeOfDay } from "./timeOfDay";
import "./timeControl.css";

export function mountTimeControl(host: HTMLElement) {
  const trigger = host.querySelector<HTMLButtonElement>(".time-trigger")!;
  const popup = host.querySelector<HTMLElement>(".time-popover")!;
  const slider = host.querySelector<HTMLInputElement>(".time-range")!;
  const abort = new AbortController();
  const options = { signal: abort.signal };
  function render(value: number) {
    const label = phaseLabel(value);
    host.querySelector(".time-label")!.textContent = label;
    host.querySelector(".time-value")!.textContent = label;
    trigger.setAttribute("aria-label", `Time of day: ${label}`);
    slider.value = String(Math.round(value * 1000));
    slider.setAttribute("aria-valuetext", label);
    host.dataset.night = String(frame(value).n > .45);
    host.querySelectorAll<HTMLButtonElement>("[data-time]").forEach(button => {
      button.setAttribute("aria-pressed", String(Math.abs(Number(button.dataset.time) - value) < .001));
    });
  }
  function close(restoreFocus = false) {
    popup.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    if (restoreFocus) trigger.focus();
  }
  trigger.addEventListener("click", () => {
    const open = popup.hidden;
    popup.hidden = !open;
    trigger.setAttribute("aria-expanded", String(open));
    if (open) slider.focus();
  }, options);
  slider.addEventListener("input", () => setTimeOfDay(Number(slider.value) / 1000), options);
  host.querySelectorAll<HTMLButtonElement>("[data-time]").forEach(button => {
    button.addEventListener("click", () => setTimeOfDay(Number(button.dataset.time)), options);
  });
  document.addEventListener("click", event => {
    if (!host.contains(event.target as Node)) close();
  }, options);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !popup.hidden) { event.preventDefault(); close(true); }
  }, options);
  host.addEventListener("focusout", event => {
    if (event.relatedTarget && !host.contains(event.relatedTarget as Node)) close();
  }, options);
  render(getTimeOfDay());
  const unsubscribe = subscribeTimeOfDay(render);
  return () => { abort.abort(); unsubscribe(); };
}
