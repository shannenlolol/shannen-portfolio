
/** A journal heading, typed onto a strip of paper with torn ends and held down with washi tape. */
export function JournalTitle({ text }: { text: string }) {
  return (
    <span className="jt">
      <span className="j-tape jt-tape" aria-hidden="true" />
      <span className="jt-strip">{text}</span>
    </span>
  );
}

/** A contribution number, handwritten in ink inside a loose pen circle. */
export function NumberMark({ n }: { n: number }) {
  return (
    <span className="mark" aria-hidden="true">
      {/* The circle's stroke overshoots where it started, as a pen would. */}
      <svg viewBox="0 0 100 100" focusable="false">
        <path d="M52 8C79 7 94 27 92 51 90 77 70 93 46 92 21 90 6 71 8 47 10 25 29 9 55 10 62 10 67 13 70 16" />
      </svg>
      <span>{n}</span>
    </span>
  );
}

// A plump five-point star centred in a 100×100 box, leaving room for the die-cut border's stroke.
const STAR_PATH = "M50 9L61.2 37.6 91.9 39.4 68.1 58.9 75.9 88.6 50 72 24.1 88.6 31.9 58.9 8.1 39.4 38.8 37.6Z";

/**
 * A matte star sticker, optionally with a number printed on it: flat pastel yellow (--star-fill) on a white die-cut
 * margin with rounded points, which is what makes it read as a sticker.
 */
export function Star({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <span className={`star ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" focusable="false">
        {/* The white backing paper, cut a little wider than the print. */}
        <path d={STAR_PATH} fill="#fffdf7" stroke="#fffdf7" strokeWidth="9" strokeLinejoin="round" />
        <path d={STAR_PATH} style={{ fill: "var(--star-fill)", stroke: "var(--star-edge)" }} strokeWidth="2" strokeLinejoin="round" />
      </svg>
      {label && <span className="star-label">{label}</span>}
    </span>
  );
}

export function DecoStrip({ flower, star }: { flower: "lavender" | "daisy" | "fern"; star?: boolean }) {
  return (
    <div className="deco-strip" aria-hidden="true">
      {star && <Star className="star-small" />}
      <PressedFlower variant={flower} />
    </div>
  );
}

/** Pressed, dried flower sprigs held down with a strip of washi tape. Purely decorative. */
export function PressedFlower({ variant = "lavender", className = "" }: { variant?: "lavender" | "daisy" | "fern"; className?: string }) {
  return (
    <span className={`pressed-flower pressed-${variant} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 80 160" focusable="false">
        {variant === "lavender" && (
          <g>
            <path d="M40 158 C38 120 42 80 40 30" stroke="#7d8a5a" strokeWidth="2" fill="none" />
            <path d="M40 120 C30 112 24 104 20 92" stroke="#7d8a5a" strokeWidth="1.6" fill="none" />
            {/* Buds alternate either side of the stem, shrinking towards the tip. */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <ellipse key={i} cx={40 + (i % 2 ? 4 : -4)} cy={34 + i * 9} rx={4.2 - i * 0.25} ry={6 - i * 0.3} fill={i % 3 ? "#a48bbf" : "#8c74a8"} transform={`rotate(${i % 2 ? 25 : -25} ${40 + (i % 2 ? 4 : -4)} ${34 + i * 9})`} />
            ))}
            {[0, 1, 2].map((i) => (
              <ellipse key={i} cx={20 + (i % 2 ? 3 : -2)} cy={78 + i * 7} rx="3" ry="4.5" fill="#b49dcb" />
            ))}
          </g>
        )}
        {variant === "daisy" && (
          <g>
            <path d="M42 158 C44 130 36 100 40 62" stroke="#7d8a5a" strokeWidth="2" fill="none" />
            <path d="M41 122 C52 116 58 108 60 98" stroke="#7d8a5a" strokeWidth="1.6" fill="none" />
            <ellipse cx="57" cy="104" rx="5" ry="10" fill="#93a46b" transform="rotate(35 57 104)" />
            {/* Petals are one ellipse rotated around the flower's centre. */}
            {Array.from({ length: 12 }, (_, i) => (
              <ellipse key={i} cx="40" cy="38" rx="4" ry="13" fill="#f6efdc" stroke="#e2d6b8" strokeWidth=".6" transform={`rotate(${i * 30} 40 50)`} />
            ))}
            <circle cx="40" cy="50" r="7" fill="#e3b54f" />
          </g>
        )}
        {variant === "fern" && (
          <g>
            <path d="M40 158 C40 110 38 70 44 14" stroke="#6f7f4f" strokeWidth="2" fill="none" />
            {Array.from({ length: 10 }, (_, i) => (
              <g key={i}>
                <ellipse cx={30 + i * 0.6} cy={140 - i * 12} rx={11 - i * 0.8} ry="3.4" fill="#8a9a63" transform={`rotate(-28 ${30 + i * 0.6} ${140 - i * 12})`} />
                <ellipse cx={50 + i * 0.2} cy={136 - i * 12} rx={11 - i * 0.8} ry="3.4" fill="#99a873" transform={`rotate(28 ${50 + i * 0.2} ${136 - i * 12})`} />
              </g>
            ))}
          </g>
        )}
      </svg>
      <span className="pressed-tape" />
    </span>
  );
}
