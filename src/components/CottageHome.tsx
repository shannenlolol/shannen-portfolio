import { memo, useLayoutEffect, useRef } from "react";
import markup from "../cottage/home.html?raw";
import { getTimeOfDay, phaseLabel, setTimeOfDay, subscribeTimeOfDay } from "../cottage/timeOfDay";
import "../cottage/cottage.css";

function CottageHome() {
  const host = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const slider = host.current!.querySelector<HTMLInputElement>("#tod")!;
    const phase = host.current!.querySelector<HTMLOutputElement>("#phase")!;
    const update = (value: number) => {
      slider.value = String(Math.round(value * 1000));
      slider.setAttribute("aria-valuetext", phaseLabel(value));
      phase.textContent = phaseLabel(value);
    };
    const input = () => setTimeOfDay(Number(slider.value) / 1000);
    update(getTimeOfDay());
    const unsubscribe = subscribeTimeOfDay(update);
    slider.addEventListener("input", input);
    return () => { unsubscribe(); slider.removeEventListener("input", input); };
  }, []);
  return <div className="cottage-home home-content" ref={host} dangerouslySetInnerHTML={{ __html: markup }} />;
}
export default memo(CottageHome);
