import { useEffect, useRef } from "react";
import markup from "../cottage/timeControl.html?raw";
import { mountTimeControl } from "../cottage/timeControl";

export default function TimeOfDay() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => mountTimeControl(host.current!), []);
  return <div ref={host} className="time-control-host" dangerouslySetInnerHTML={{ __html: markup }} />;
}
