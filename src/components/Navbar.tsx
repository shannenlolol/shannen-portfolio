import { memo, useEffect, useRef } from "react";
import { getNavbarMarkup, mountNavbar } from "../cottage/navbar";

function Navbar({ path }: { path: string }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => mountNavbar(host.current!, path), [path]);
  return <div ref={host} dangerouslySetInnerHTML={{ __html: getNavbarMarkup(path) }} />;
}

export default memo(Navbar);
