import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode, TouchEvent } from "react";
import { experiences } from "../data/experiences";
import type { JournalBlock, Keepsake, Sticker } from "../data/experiences";
import { navigate } from "../cottage/navigate";
import Polaroid from "./Polaroid";
import type { Photo } from "./Polaroid";
import { DecoStrip, JournalTitle, NumberMark, PressedFlower, SewnButton, Star } from "./JournalBits";
import "../cottage/journal.css";

type Job = (typeof experiences)[number];
/**
 * One journal page. `owner` is the role's slug ("" for the cover and contents) and decides
 * the URL while the page is open. `still` renders the copy drawn on a turning leaf: no embeds or
 * autoplaying video, since it only exists for the length of the animation.
 */
type Leaf = { key: string; owner: string; render: (still: boolean) => ReactNode; tone?: "lined" };

const shortPeriod = (period: string) => period.replace(" - Present", " – now").replace(" - ", " – ");
const SINGLE_PAGE = "(max-width: 860px)";
const TURN_MS = 780;
/**
 * Set when the book has closed and the site is travelling on to Projects. During the journey App draws a fresh
 * copy of the journal as the page being left, which would otherwise start on its front cover and flash it;
 * this makes that copy start already shut on its back cover instead.
 */
let leftClosed = false;

const OPEN_MS = 1000;
// Closing is a little slower than opening, and the shut book rests briefly before the site travels on, so the
// ending registers without holding the visitor up.
const CLOSE_MS = 1150;
const CLOSED_REST_MS = 650;

function useMedia(query: string) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const list = matchMedia(query);
    const change = () => setMatches(list.matches);
    list.addEventListener("change", change);
    return () => list.removeEventListener("change", change);
  }, [query]);
  return matches;
}

/** The outside of the front cover: the title engraved into the leather. */
function FrontCover() {
  return (
    <div className="j-outer j-outer-front">
      <span className="j-cover-title">
        <span className="j-deboss">Experiences</span>
        <span className="j-cover-sub">chapters so far</span>
      </span>
    </div>
  );
}

/** The outside of the back cover: plain leather. */
function BackCover() {
  return <div className="j-outer j-outer-back" />;
}

/**
 * A page as it looks inside the book: on its half of the leather, for the covers to carry while they swing.
 * Without a page it is blank paper (phones only ever show a sliver of the left-hand page).
 */
function HalfBook({ page, side }: { page?: Leaf; side: "left" | "right" }) {
  return (
    <div className={`j-half j-half-${side}`}>
      <PageSheet page={page} side={side} still />
    </div>
  );
}

function InsideCover() {
  return (
    <div className="j-cover-page">
      <span className="j-lace" aria-hidden="true" />
      {/* The front cover already carries the title, so the inside cover is just a note. */}
      <div className="j-snippet">
        <p>Four roles, from my first internship in 2022 to the job I have now. Pick a tab, or turn the page.</p>
      </div>
      <div className="j-cover-deco" aria-hidden="true">
        <PressedFlower variant="lavender" className="j-flower-a" />
        <PressedFlower variant="daisy" className="j-flower-b" />
        <SewnButton className="sewn-sage j-button-a" />
        <SewnButton className="sewn-rose j-button-b" />
        <Star className="j-star-a" />
        <Star className="j-star-b star-small" />
      </div>
    </div>
  );
}

function Contents() {
  return (
    <div className="j-contents">
      {/* Carries the inside cover's lace on across the spread. */}
      <span className="j-lace" aria-hidden="true" />
      <h2 className="j-title j-contents-title">
        <JournalTitle text="Contents" />
      </h2>
      <ol className="j-toc">
        {experiences.map((job) => (
          <li key={job.slug} data-color={job.color}>
            <a href={`/experiences/${job.slug}`}>
              <span className="j-toc-name">
                <strong>{job.company}</strong>
                <span>{job.role}</span>
                <span className="j-toc-period">{shortPeriod(job.period)}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
      <DecoStrip flower="fern" />
    </div>
  );
}

const image = (path: string) => `/assets/images/${path}`;

type PhotoBlock = Extract<Keepsake, { kind: "photo" }>;
type Run = Exclude<JournalBlock, PhotoBlock> | { kind: "photos"; items: PhotoBlock[] };

/** Gathers neighbouring photos into one run, so they hang from the same twine. */
function groupPhotos(blocks: JournalBlock[]) {
  const runs: Run[] = [];
  for (const block of blocks) {
    const last = runs[runs.length - 1];
    if (block.kind !== "photo") runs.push(block);
    else if (last?.kind === "photos") last.items.push(block);
    else runs.push({ kind: "photos", items: [block] });
  }
  return runs;
}

function Intro({ job }: { job: Job }) {
  return (
    <div className="j-intro">
      <div className="j-title-top">
        <span className="j-logo">
          <img src={job.logo} alt="" />
        </span>
        <span className="j-stamp">
          <span>{shortPeriod(job.period)}</span>
        </span>
      </div>
      {/* The logo already shows the company, so the name is only spelt out for screen readers. */}
      <h2 className="j-role">
        <span className="visually-hidden">{job.company}, </span>
        {job.role}
      </h2>
      {job.attachedTo && (
        <p className="j-attached">
          Attached to
          <img src={job.attachedTo.logo} alt={job.attachedTo.name} />
        </p>
      )}
      <div className="j-snippet">
        <p>{job.context}</p>
      </div>
    </div>
  );
}

function Toolkit({ job }: { job: Job }) {
  return (
    <div className="j-toolkit">
      <h3 className="j-label j-stitched">Toolkit</h3>
      <ul className="j-felt">
        {job.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}


/** Some of the role's contributions, numbered so the count carries on from earlier pages. */
function Contributions({ job, items }: { job: Job; items: number[] }) {
  return (
    <div className="j-notes">
      {items[0] === 0 && <h3 className="j-label">What I did</h3>}
      <ol>
        {items.map((i) => (
          <li key={i}>
            <NumberMark n={i + 1} />
            <div>
              <h4>{job.contributions[i].title}</h4>
              <p>{job.contributions[i].text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Each print gets its own fastener, washi colour (from its role's palette) and pattern, sticker shape, and tilt. They're picked from the first print's path
// and stepped through for the rest, so prints in a group always differ yet look the same on every visit.
const FASTENERS: Photo["deco"][] = ["tape", "tape-corners", "sticker"];
const STICKERS = ["stk-flower", "stk-daisy", "stk-tulip", "stk-star"];
const STICKER_SHAPES: readonly string[] = ["flower", "daisy", "tulip", "star"] satisfies Sticker[];
const WASHI = ["wt-a", "wt-b", "wt-c"];
const WASHI_PRINTS = ["wt-stripe", "wt-dots", "wt-grid", "wt-plain"];
const PRINT_TILTS = [-3, 2.2, -1.4, 3.2, -2.4, 1.2];
function pick<T>(key: string, list: readonly T[], salt: number, step = 0) {
  let hash = salt;
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return list[(hash + step) % list.length];
}

function Photos({ items, still }: { items: PhotoBlock[]; still: boolean }) {
  // Wide group photos keep their own shape; the rest are 4:3 prints. A pair is laid out as a collage.
  const wide = items.every((item) => item.uncropped);
  return (
    <div className={`j-prints ${wide ? "j-prints-wide" : ""} ${items.length > 1 ? "j-prints-pair" : ""}`}>
      {items.map((item, i) => {
        const key = items[0].src;
        // A photo can ask for its fastener; a flower, daisy, tulip or star is a sticker of that shape.
        const { fastener } = item;
        const sticker = fastener && STICKER_SHAPES.includes(fastener) ? `stk-${fastener}` : undefined;
        const photo: Photo = {
          src: image(item.src),
          alt: item.alt,
          uncropped: item.uncropped,
          loop: item.loop && !still ? image(item.loop) : undefined,
          deco: fastener === "tape" || fastener === "tape-corners" ? fastener : sticker ? "sticker" : pick(key, FASTENERS, 7, i),
          tilt: pick(key, PRINT_TILTS, 3, i),
          className: `${pick(key, WASHI, 11, i)} ${pick(key, WASHI_PRINTS, 5, i)} ${sticker ?? pick(key, STICKERS, 13, i)}`,
        };
        return <Polaroid key={item.src} photo={photo} />;
      })}
    </div>
  );
}

// LinkedIn's compact embed (just the video player) is this size; its layout doesn't reflow to fit a smaller frame.
const EMBED = { width: 504, height: 399 };
// Kept a little under full size so the video sits on the page as a keepsake rather than filling it.
const EMBED_MAX_SCALE = 0.74;

/**
 * The embedded post, scaled down as a whole so all of it fits the space on its page without scrolling.
 * The iframe keeps LinkedIn's own size and is shrunk with a transform; the card is sized to match.
 */
function FittedEmbed({ src, title, still }: { src: string; title: string; still: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const element = box.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.min(EMBED_MAX_SCALE, width / EMBED.width, height / EMBED.height));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const size = { width: EMBED.width * scale, height: EMBED.height * scale };
  return (
    <div className="j-embed" ref={box}>
      <div className="j-embed-card wt-a wt-stripe" style={size}>
        <span className="deco deco-tape-corners" aria-hidden="true" />
        <div className="j-embed-frame">
          {still ? <div className="j-embed-still">LinkedIn post</div> : <iframe src={src} title={title} width={EMBED.width} height={EMBED.height} style={{ transform: `scale(${scale})` }} scrolling="no" loading="lazy" allowFullScreen />}
        </div>
      </div>
    </div>
  );
}

// The pressed flower that best suits each role's palette.
const FLOWERS = { brick: "fern", blue: "lavender", mustard: "daisy", rose: "daisy" } as const;

/** One of a role's pages: text and keepsakes in the order the role's data lays them out. */
function RolePage({ job, blocks, page, still }: { job: Job; blocks: JournalBlock[]; page: number; still: boolean }) {
  // Keepsakes fill whatever height the page has left, so only text-only pages get the deco strip.
  const hasKeepsake = blocks.some((block) => block.kind === "photo" || block.kind === "embed" || block.kind === "letter");
  return (
    <div className="j-role-page">
      {groupPhotos(blocks).map((run, i) => {
        switch (run.kind) {
          case "intro":
            return <Intro job={job} key={i} />;
          case "toolkit":
            return <Toolkit job={job} key={i} />;
          case "did":
            return <Contributions job={job} items={run.items} key={i} />;
          case "photos":
            return <Photos items={run.items} still={still} key={i} />;
          case "embed":
            return <FittedEmbed src={run.src} title={run.title} still={still} key={i} />;
          case "letter":
            return (
              // The letter sits between the envelope's back and its front pocket, and slides up out of it on hover.
              <figure className="j-letter" key={i}>
                <span className="j-envelope" aria-hidden="true" />
                <div className="j-letter-slot">
                  <div className="j-letter-paper">
                    <p className="j-letter-kicker">Testimonial</p>
                    <blockquote>
                      <p>“{run.quote}”</p>
                    </blockquote>
                    <figcaption>
                      <strong>{run.from}</strong>
                      <span>{run.title}</span>
                    </figcaption>
                    <a className="j-letter-link" href={run.href} target="_blank" rel="noreferrer">
                      Read the full letter (PDF)
                    </a>
                  </div>
                </div>
                <span className="j-pocket" aria-hidden="true" />
                <span className="j-seal" aria-hidden="true">
                  ★
                </span>
              </figure>
            );
        }
      })}
      {!hasKeepsake && <DecoStrip flower={FLOWERS[job.color]} button={page % 2 ? "role" : undefined} star={page % 2 === 0} />}
    </div>
  );
}

function FillerPage() {
  return (
    <div className="j-filler" aria-hidden="true">
      <PressedFlower variant="lavender" />
      <PressedFlower variant="daisy" />
      <Star className="star-small" />
    </div>
  );
}

/**
/**
 * Lays the journal out as a flat list of pages. On wide screens pages are shown in pairs (spreads), so every role
 * is padded to an even number of pages to start on a left-hand page. Phones show the same pages one at a time
 * (at most two per role), with no padding.
 */
function buildPages(single: boolean) {
  const firstPage: Record<string, number> = {};
  const pages: Leaf[] = [
    { key: "cover", owner: "", render: () => <InsideCover /> },
    { key: "contents", owner: "", render: () => <Contents /> },
  ];
  experiences.forEach((job) => {
    firstPage[job.slug] = pages.length;
    job.pages.forEach((blocks, p) => {
      // Pages listing contributions are on lined notebook paper.
      const tone = blocks.some((block) => block.kind === "did") ? "lined" : undefined;
      pages.push({ key: `${job.slug}-${p}`, owner: job.slug, tone, render: (still) => <RolePage job={job} blocks={blocks} page={p} still={still} /> });
    });
    if (!single && pages.length % 2) pages.push({ key: `${job.slug}-filler`, owner: job.slug, render: () => <FillerPage /> });
  });
  return { pages, firstPage };
}
const LAYOUTS = { spread: buildPages(false), single: buildPages(true) };

function PageSheet({ page, side, still = false }: { page?: Leaf; side: "left" | "right" | "single"; still?: boolean }) {
  const job = experiences.find((item) => item.slug === page?.owner);
  return (
    <section className={`j-page j-${side} ${page?.tone === "lined" ? "j-lined" : ""}`} data-color={job?.color}>
      {page?.render(still)}
    </section>
  );
}

export default function ExperienceJournal({ slug }: { slug: string }) {
  const single = useMedia(SINGLE_PAGE);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const { pages, firstPage } = single ? LAYOUTS.single : LAYOUTS.spread;
  /**
   * Wide screens turn a spread at a time (`unit` is a page's spread). Phones show one page and turn it like a
   * notepad: every turn lifts the page off the spine at the left edge and swings it away, revealing the next one
   * underneath (turning back lays the previous page down over it). So phones step a page at a time (`pos`).
   */
  const step = single ? 1 : 2;
  const unit = (index: number) => index - (index % 2);
  const [page, setPage] = useState(() => firstPage[slug] ?? 0);
  /**
   * The covers. "front" is the closed book, which every visit starts with, swinging open while `moving` (or shut
   * again, with `shutting`, when turning back from the first spread); it opens at the page the address asks for.
   * "back" is the book closing at the end before travelling on to Projects.
   */
  const [board, setBoard] = useState<{ kind: "front" | "back"; moving: boolean; shutting?: boolean } | null>(() => {
    const kind = leftClosed ? "back" : "front";
    leftClosed = false;
    return { kind, moving: false };
  });
  const shownSlug = useRef(slug);
  // Spreads and single pages are laid out differently, so switching between them (e.g. turning a tablet) reopens
  // the same role's first page in the other layout.
  const shownLayout = useRef(single);
  useEffect(() => {
    if (shownLayout.current === single) return;
    shownLayout.current = single;
    setPage(firstPage[slug] ?? 0);
    // Only the layout switch should move the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [single]);
  // While a leaf is turning, the page it left from is still drawn underneath it.
  const [turn, setTurn] = useState<{ from: number; to: number } | null>(null);
  const book = useRef<HTMLDivElement>(null);
  const pending = useRef<number | null>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  // On phones every page is as tall as the tallest, so the book keeps one height as pages turn. All pages are laid
  // out once, hidden, and measured again whenever any of them changes size (e.g. as photos load).
  const measure = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState<number>();
  useEffect(() => {
    const box = measure.current;
    if (!single || !box) return;
    const sheets = [...box.children] as HTMLElement[];
    const observer = new ResizeObserver(() => setPageHeight(Math.max(...sheets.map((sheet) => sheet.offsetHeight))));
    sheets.forEach((sheet) => observer.observe(sheet));
    return () => observer.disconnect();
  }, [single]);
  const job = experiences.find((item) => item.slug === slug);

  function openBook() {
    if (board?.moving) return;
    setBoard(reduced ? null : { kind: "front", moving: true });
  }
  function shutBook() {
    setBoard({ kind: "front", moving: !reduced, shutting: true });
  }
  function closeBook() {
    if (reduced) navigate("/projects");
    else setBoard({ kind: "back", moving: true });
  }

  function turnTo(target: number, syncRoute = true) {
    // A closed book opens instead of turning; nothing turns while a cover is moving.
    if (board) {
      if (board.kind === "front" && !board.moving) openBook();
      return;
    }
    const at = single ? page : unit(page);
    // Turning on from the last page closes the book; turning back from the first shuts the front cover again.
    if (target > pages.length - 1) {
      if (at + step > pages.length - 1) closeBook();
      return;
    }
    if (target < 0) {
      if (at === 0) shutBook();
      return;
    }
    const to = single ? target : unit(target);
    if (to === at) return;
    // Bring the top of the book into view so the turn is seen, e.g. after reading a long page on a phone.
    const top = book.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) window.scrollBy({ top: top - 130, behavior: reduced ? "instant" : "smooth" });
    // Wide screens only turn a leaf when moving to another spread; phones turn one for every page.
    if (single) setTurn(reduced ? null : { from: page, to });
    else if (unit(to) !== unit(page)) setTurn(reduced ? null : { from: unit(page), to: unit(to) });
    setPage(to);
    const owner = pages[to].owner;
    if (syncRoute && owner !== (job?.slug ?? "")) {
      // Turning into another role changes the URL; the effect below then knows it is already open.
      pending.current = to;
      navigate(owner ? `/experiences/${owner}` : "/experiences");
    }
  }

  // Tabs, contents links and the back button change the route; open the matching page.
  useEffect(() => {
    // Only a change of address turns or opens the book; arriving leaves it shut at the page the address asks for.
    if (shownSlug.current === slug) return;
    shownSlug.current = slug;
    const target = pending.current ?? firstPage[slug] ?? 0;
    pending.current = null;
    // A tab chosen while the book is shut opens it straight at that page.
    if (board?.kind === "front" && !board.moving) {
      setPage(target);
      openBook();
    } else if ((single ? target : unit(target)) !== (single ? page : unit(page))) turnTo(target, false);
    // Only a route change should turn the page, not the turn's own state updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (!turn) return;
    const timer = setTimeout(() => setTurn(null), TURN_MS);
    return () => clearTimeout(timer);
  }, [turn]);

  // Once the front cover has swung open it is no longer needed; once the back has closed, travel on to Projects.
  useEffect(() => {
    if (!board?.moving) return;
    const leave = () => {
      leftClosed = true;
      navigate("/projects");
    };
    const done = board.kind === "back" ? leave : board.shutting ? () => setBoard({ kind: "front", moving: false }) : () => setBoard(null);
    const timer = setTimeout(done, board.kind === "back" ? CLOSE_MS + CLOSED_REST_MS : OPEN_MS);
    return () => clearTimeout(timer);
  }, [board]);

  if (slug && !job)
    return (
      <main id="main-content" className="not-found">
        <p className="eyebrow">404 / Page not found</p>
        <h1>Let’s get you back.</h1>
        <a className="button button-primary" href="/">
          Return home
        </a>
      </main>
    );

  const current = unit(page);
  const pos = single ? page : current;
  const owner = pages[pos].owner;
  const ownerJob = experiences.find((item) => item.slug === owner);
  const atEnd = pos + step > pages.length - 1;
  // One dot per spread (or page, on phones) of the open role, to show how much of it is left.
  const roleUnits = ownerJob ? [...new Set(pages.flatMap((item, i) => (item.owner === owner ? [single ? i : unit(i)] : [])))] : [];
  // The note on the curled corner says where turning the page leads.
  const nextOwner = atEnd ? null : pages[pos + step].owner;
  const nextJob = experiences.find((item) => item.slug === nextOwner);
  const nextNote = nextJob && nextOwner !== owner ? `Next: ${nextJob.tab}` : "Turn over";

  // During a forward turn the leaf lifts off the right-hand page, so the left still shows the old spread
  // and the right already shows the new one. A backward turn mirrors that.
  const forward = turn ? turn.to > turn.from : true;
  const leftIndex = turn && forward ? turn.from : current;
  const rightIndex = (turn && !forward ? turn.from : current) + 1;
  const closed = board && !(board.kind === "front" && board.moving && !board.shutting) ? board.kind : undefined;
  function touchStart(event: TouchEvent) {
    swipe.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }
  function touchEnd(event: TouchEvent) {
    const start = swipe.current;
    swipe.current = null;
    if (!start || !event.changedTouches[0]) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) turnTo(pos + (dx < 0 ? step : -step));
  }

  return (
    <main id="main-content" className="journal-page">
      <h1 className="visually-hidden">{job ? `Experience: ${job.company}, ${job.role}` : "Experiences"}</h1>
      <div className="journal" ref={book} data-single={single} data-board={board?.kind} data-closed={closed} style={{ "--cover": `${board?.kind === "back" ? CLOSE_MS : OPEN_MS}ms`, "--page-h": pageHeight ? `${pageHeight}px` : undefined } as CSSProperties}>
        <nav className="j-tabs" aria-label="Journal sections">
          {/* Already the open address while the book is shut, so this tab opens the book itself. */}
          <a className="j-tab j-tab-index" href="/experiences" aria-current={owner === "" ? "page" : undefined} onClick={() => closed === "front" && openBook()}>
            <Star />
            <span>Contents</span>
          </a>
          {experiences.map((item) => (
            <a className="j-tab" data-color={item.color} href={`/experiences/${item.slug}`} aria-current={owner === item.slug ? "page" : undefined} key={item.slug}>
              <span>{item.tab}</span>
            </a>
          ))}
        </nav>
        {/* Swipes inside the book turn its pages rather than travelling to the next part of the site (see App). */}
        <div className={`j-book ${turn ? "is-turning" : ""}`} data-local-swipe onTouchStart={touchStart} onTouchEnd={touchEnd}>
          <div className="j-pan">
            <div className="j-cover" inert={!!board}>
              {/* Phones: a sliver of the left-hand page beside the spine, running off the screen's edge, where
                  turned pages land. The spine can't curl, so tapping this page turns back instead. */}
              {single && (
                <button type="button" className="j-verso" onClick={() => turnTo(pos - step)} aria-label={pos > 0 ? "Turn back" : "Close the journal"}>
                  <span />
                </button>
              )}
              <div className="j-spread">
                {single && (
                  <div className="j-measure" ref={measure} aria-hidden="true" inert>
                    {pages.map((item) => (
                      <PageSheet page={item} side="single" still key={item.key} />
                    ))}
                  </div>
                )}
                {single ? (
                  // The page underneath: the new one while the old swings away, or the old one until the previous
                  // page has been laid back over it.
                  <PageSheet page={pages[turn && !forward ? turn.from : page]} side="single" key={pages[turn && !forward ? turn.from : page].key} />
                ) : (
                  <>
                    <PageSheet page={pages[leftIndex]} side="left" key={pages[leftIndex].key} />
                    <PageSheet page={pages[rightIndex]} side="right" key={pages[rightIndex]?.key ?? "blank"} />
                  </>
                )}
                {turn && (
                  <div className={`j-leaf ${forward ? "j-leaf-forward" : "j-leaf-back"}`} style={{ "--turn": `${TURN_MS}ms` } as CSSProperties} aria-hidden="true" inert key={`${turn.from}-${turn.to}`}>
                    {single ? (
                      <>
                        {/* The page carried away (or back); its reverse is only glimpsed past the edge, so it is blank. */}
                        <div className="j-face j-front">
                          <PageSheet page={pages[forward ? turn.from : turn.to]} side="single" still />
                        </div>
                        <div className="j-face j-back">
                          <PageSheet side="single" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="j-face j-front">{forward ? <PageSheet page={pages[turn.from + 1]} side="right" still /> : <PageSheet page={pages[turn.from]} side="left" still />}</div>
                        <div className="j-face j-back">{forward ? <PageSheet page={pages[turn.to]} side="left" still /> : <PageSheet page={pages[turn.to + 1]} side="right" still />}</div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* The cover swings around the spine like a page. Each face shows what lies on that side: closed, the
                cover's outside; opened or closing, the half page it carries over. */}
            {board && (
              <div className={`j-board j-board-${board.kind} ${board.moving ? "is-moving" : ""} ${board.shutting ? "is-shutting" : ""}`}>
                {board.kind === "front" ? (
                  <>
                    <button type="button" className="j-face j-front" onClick={openBook} disabled={board.moving} aria-label="Open the journal">
                      <FrontCover />
                    </button>
                    <div className="j-face j-back" aria-hidden="true" inert>
                      <HalfBook page={single ? undefined : pages[current]} side="left" />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Phones close by turning their last page away, uncovering the inside of the back cover. */}
                    <div className="j-face j-front" aria-hidden="true" inert>
                      <HalfBook page={pages[single ? page : current + 1]} side="right" />
                    </div>
                    {/* On phones the last page lands on the left, beside the open back cover. */}
                    <div className="j-face j-back" aria-hidden="true" inert>
                      {single ? <HalfBook side="left" /> : <BackCover />}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          {/* Curled page corners at the book's own corners turn the pages (swipes and the tabs also work). */}
          {!board && (
            <>
              {!single && <button type="button" className="j-corner j-corner-back" onClick={() => turnTo(pos - step)} aria-label={pos > 0 ? "Turn back" : "Close the journal"} />}
              {!atEnd ? (
                // Keyed on the page so the corner peeks out again after every turn.
                <button type="button" className="j-corner j-corner-next" onClick={() => turnTo(pos + step)} aria-label={`Turn page: ${nextNote}`} key={`next-${pos}`}>
                  <span className="j-corner-note" aria-hidden="true">{nextNote}</span>
                </button>
              ) : (
                // The journal ends on the last role; its corner leads on to the projects instead.
                <a
                  className="j-corner j-corner-next"
                  href="/projects"
                  key="projects"
                  aria-label="Close the journal and go to my projects"
                  onClick={(event) => {
                    event.preventDefault();
                    closeBook();
                  }}
                >
                  <span className="j-corner-note">My projects</span>
                </a>
              )}
            </>
          )}
        </div>
      </div>
      {roleUnits.length > 1 && (
        <p className="j-dots" aria-live="polite">
          {roleUnits.map((item) => (
            <span className={item === pos ? "is-current" : ""} key={item} />
          ))}
          <span className="visually-hidden">{`${single ? "Page" : "Spread"} ${roleUnits.indexOf(pos) + 1} of ${roleUnits.length}`}</span>
        </p>
      )}
    </main>
  );
}
