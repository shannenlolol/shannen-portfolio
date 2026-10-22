/**
 * Lets a page ask App to change route without a link click (e.g. the experience journal
 * turning into the next role). App registers its router here; until then it falls back
 * to a normal page load.
 */
let navigator: ((path: string) => void) | null = null;

export function setNavigator(handler: ((path: string) => void) | null) {
  navigator = handler;
}

export function navigate(path: string) {
  if (navigator) navigator(path);
  else window.location.assign(path);
}

/** The overview and every role page are one journal, so moving between them turns pages instead of travelling. */
export const isJournalPath = (path: string) => path === "/experiences" || path.startsWith("/experiences/");
