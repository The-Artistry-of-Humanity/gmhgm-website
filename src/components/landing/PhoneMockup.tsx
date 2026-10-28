interface PhoneMockupProps {
  children?: React.ReactNode;
  className?: string;
}

/** Minimal, premium phone frame in pure SVG/CSS. */
export const PhoneMockup = ({ children, className }: PhoneMockupProps) => {
  return (
    <div className={className}>
      <div className="relative mx-auto" style={{ width: 300, maxWidth: "100%" }}>
        {/* outer frame */}
        <div
          className="relative rounded-[44px] p-[3px]"
          style={{
            background:
              "linear-gradient(160deg, hsl(0 0% 28%), hsl(0 0% 8%) 40%, hsl(0 0% 18%) 70%, hsl(0 0% 6%))",
            boxShadow:
              "0 40px 80px -20px hsl(0 0% 0% / 0.7), 0 0 0 1px hsl(0 0% 100% / 0.04), inset 0 0 0 1px hsl(0 0% 100% / 0.06)",
          }}
        >
          <div
            className="relative overflow-hidden rounded-[42px] bg-background"
            style={{ aspectRatio: "9 / 19.5" }}
          >
            {/* dynamic island */}
            <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
            {/* screen content */}
            <div className="absolute inset-0">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Hero phone screen — daily check-in. */
export const ScreenHome = () => (
  <div className="flex h-full w-full flex-col bg-gradient-to-b from-[#0a0a0a] via-[#0c0c10] to-[#080814] p-5 pt-10 text-foreground">
    <div className="mt-4">
      <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Tuesday · Day 47</p>
      <h3 className="mt-1 text-[20px] font-medium leading-tight text-display">
        Good morning,<br />James.
      </h3>
    </div>

    {/* pentagon mini */}
    <div className="mt-5 flex items-center justify-center">
      <MiniPentagon />
    </div>

    <div className="mt-4 space-y-2">
      {[
        { label: "Morning reflection", done: true },
        { label: "Train · 45 min", done: true },
        { label: "Call dad", done: false },
        { label: "Read · 20 min", done: false },
      ].map((t) => (
        <div
          key={t.label}
          className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5"
        >
          <span
            className={`h-3.5 w-3.5 rounded-full border ${
              t.done ? "bg-primary border-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)]" : "border-white/20"
            }`}
          />
          <span className={`text-[12px] ${t.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
            {t.label}
          </span>
        </div>
      ))}
    </div>

    <div className="mt-auto flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Streak</p>
        <p className="text-[15px] font-semibold">12 days</p>
      </div>
      <div className="h-9 w-9 rounded-full bg-primary/90 shadow-glow" />
    </div>
  </div>
);

const MiniPentagon = () => {
  const cx = 70, cy = 64, r = 44;
  const points = Array.from({ length: 5 }).map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  });
  const innerR = 30;
  const inner = Array.from({ length: 5 }).map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return [cx + innerR * Math.cos(a), cy + innerR * Math.sin(a)] as const;
  });
  return (
    <svg viewBox="0 0 140 130" className="h-[130px] w-[140px]">
      <defs>
        <radialGradient id="mp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(240 100% 60% / 0.4)" />
          <stop offset="100%" stopColor="hsl(240 100% 60% / 0)" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r + 12} fill="url(#mp)" />
      <polygon
        points={points.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke="hsl(0 0% 100% / 0.12)"
        strokeWidth="1"
      />
      <polygon
        points={inner.map((p) => p.join(",")).join(" ")}
        fill="hsl(240 100% 50% / 0.18)"
        stroke="hsl(240 100% 60%)"
        strokeWidth="1.2"
      />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill="hsl(240 100% 65%)" />
      ))}
    </svg>
  );
};

/** Reflection screen */
export const ScreenReflect = () => (
  <div className="flex h-full w-full flex-col bg-gradient-to-b from-[#08080c] to-[#0a0a14] p-5 pt-10">
    <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Evening reflection</p>
    <h3 className="mt-2 text-[18px] font-medium text-display leading-tight">
      What pulled you<br />off centre today?
    </h3>
    <div className="mt-4 flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3">
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Felt scattered after the meeting. Noticed I was reaching for my phone instead of sitting with it. Tomorrow: walk before opening anything.
      </p>
    </div>
    <div className="mt-3 flex gap-2">
      {["Calm", "Restless", "Clear", "Heavy"].map((m, i) => (
        <span
          key={m}
          className={`flex-1 rounded-full border px-2 py-1.5 text-center text-[10px] ${
            i === 1 ? "border-primary bg-primary/15 text-foreground" : "border-white/10 text-muted-foreground"
          }`}
        >
          {m}
        </span>
      ))}
    </div>
  </div>
);

/** Habits screen */
export const ScreenHabits = () => (
  <div className="flex h-full w-full flex-col bg-gradient-to-b from-[#08080c] to-[#0a0a14] p-5 pt-10">
    <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Pillars · this week</p>
    <h3 className="mt-2 text-[18px] font-medium text-display">Where you're showing up</h3>
    <div className="mt-4 space-y-3">
      {[
        { l: "Health", v: 86 },
        { l: "Inner work", v: 64 },
        { l: "Love", v: 72 },
        { l: "Social", v: 40 },
        { l: "Flow", v: 58 },
      ].map((b) => (
        <div key={b.l}>
          <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
            <span>{b.l}</span>
            <span>{b.v}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${b.v}%`, boxShadow: "0 0 12px hsl(var(--primary)/0.6)" }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/** Community screen */
export const ScreenCommunity = () => (
  <div className="flex h-full w-full flex-col bg-gradient-to-b from-[#08080c] to-[#0a0a14] p-5 pt-10">
    <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Circle</p>
    <h3 className="mt-2 text-[18px] font-medium text-display">Men doing the work</h3>
    <div className="mt-4 space-y-2">
      {[
        { n: "Marcus", t: "Held the hard conversation. It went better than I feared." },
        { n: "Theo", t: "30 days off the snooze button." },
        { n: "Idris", t: "Cooked for my dad for the first time in years." },
      ].map((p) => (
        <div key={p.n} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-primary-glow" />
            <span className="text-[11px] font-medium">{p.n}</span>
          </div>
          <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted-foreground">{p.t}</p>
        </div>
      ))}
    </div>
  </div>
);

/** Fulfilment Score screen — single big number with a delta. */
export const ScreenScore = () => (
  <div className="flex h-full w-full flex-col bg-gradient-to-b from-[#08080c] to-[#0a0a14] p-5 pt-10">
    <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Fulfilment score</p>
    <h3 className="mt-2 text-[16px] font-medium text-display">This week</h3>

    <div className="mt-6 flex flex-1 flex-col items-center justify-center">
      <div className="relative flex h-[150px] w-[150px] items-center justify-center">
        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(0 0% 100% / 0.06)" strokeWidth="6" />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="hsl(240 100% 60%)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 52 * 0.72} ${2 * Math.PI * 52}`}
            style={{ filter: "drop-shadow(0 0 8px hsl(var(--primary)/0.6))" }}
          />
        </svg>
        <div className="text-center">
          <p className="text-display text-[44px] leading-none">72</p>
          <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-muted-foreground">/ 100</p>
        </div>
      </div>
      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1">
        <span className="text-[10px] text-primary">▲ +6</span>
        <span className="text-[10px] text-muted-foreground">vs last week</span>
      </div>
    </div>

    <div className="mt-auto rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Baseline</p>
      <p className="mt-1 text-[11px] leading-relaxed">You're trending up. Keep showing up in the small things.</p>
    </div>
  </div>
);

/** Five Pillars radar / pentagon screen */
export const ScreenPillars = () => {
  const cx = 100, cy = 100;
  const labels = ["Health", "Inner", "Love", "Social", "Flow"];
  const values = [0.78, 0.6, 0.7, 0.4, 0.55];
  const outerR = 70;
  const outer = labels.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return [cx + outerR * Math.cos(a), cy + outerR * Math.sin(a)] as const;
  });
  const inner = values.map((v, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const r = outerR * v;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  });
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-[#08080c] to-[#0a0a14] p-5 pt-10">
      <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Five pillars</p>
      <h3 className="mt-2 text-[16px] font-medium text-display">Your fulfilment shape</h3>

      <div className="mt-2 flex flex-1 items-center justify-center">
        <svg viewBox="0 0 200 200" className="h-[200px] w-[200px]">
          {[0.33, 0.66, 1].map((s) => (
            <polygon
              key={s}
              points={outer
                .map(([x, y]) => `${cx + (x - cx) * s},${cy + (y - cy) * s}`)
                .join(" ")}
              fill="none"
              stroke="hsl(0 0% 100% / 0.06)"
              strokeWidth="1"
            />
          ))}
          <polygon
            points={inner.map((p) => p.join(",")).join(" ")}
            fill="hsl(240 100% 50% / 0.22)"
            stroke="hsl(240 100% 60%)"
            strokeWidth="1.4"
            style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary)/0.5))" }}
          />
          {outer.map(([x, y], i) => (
            <text
              key={i}
              x={cx + (x - cx) * 1.22}
              y={cy + (y - cy) * 1.22 + 3}
              textAnchor="middle"
              fill="hsl(0 0% 64%)"
              fontSize="9"
              style={{ letterSpacing: 1 }}
            >
              {labels[i].toUpperCase()}
            </text>
          ))}
          {inner.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2.5} fill="hsl(240 100% 65%)" />
          ))}
        </svg>
      </div>

      <div className="mt-auto grid grid-cols-5 gap-1">
        {labels.map((l, i) => (
          <div key={l} className="rounded-md border border-white/[0.06] bg-white/[0.03] py-1.5 text-center">
            <p className="text-[9px] text-muted-foreground">{l}</p>
            <p className="text-[11px] font-medium">{Math.round(values[i] * 100)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/** Weak spots screen — pillar with lowest score + targeted habits/workshops */
export const ScreenWeakSpots = () => (
  <div className="flex h-full w-full flex-col bg-gradient-to-b from-[#08080c] to-[#0a0a14] p-5 pt-10">
    <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Focus area</p>
    <h3 className="mt-2 text-[16px] font-medium text-display">Social · weakest pillar</h3>

    <div className="mt-3 rounded-xl border border-primary/30 bg-primary/[0.06] p-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.18em] text-primary">Score</p>
        <p className="text-[10px] text-muted-foreground">▼ −4 this week</p>
      </div>
      <p className="mt-1 text-display text-[26px] leading-none">40<span className="text-[12px] text-muted-foreground">/100</span></p>
    </div>

    <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Targeted habits</p>
    <div className="mt-2 space-y-2">
      {[
        { l: "Call one friend · 10 min", tag: "Daily" },
        { l: "Plan one shared meal", tag: "Weekly" },
      ].map((h) => (
        <div key={h.l} className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-2">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-primary" />
            <span className="text-[11px]">{h.l}</span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground">{h.tag}</span>
        </div>
      ))}
    </div>

    <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Self-workshop</p>
    <div className="mt-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
      <p className="text-[11px] font-medium">Rebuilding the inner circle</p>
      <p className="mt-1 text-[10px] text-muted-foreground">4 sessions · 12 min each</p>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full w-[25%] rounded-full bg-primary" style={{ boxShadow: "0 0 8px hsl(var(--primary)/0.6)" }} />
      </div>
    </div>
  </div>
);

/** Matched Connections screen */
export const ScreenMatched = () => (
  <div className="flex h-full w-full flex-col bg-gradient-to-b from-[#08080c] to-[#0a0a14] p-5 pt-10">
    <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Your matches</p>
    <h3 className="mt-2 text-[16px] font-medium text-display">Complementary men</h3>

    <div className="mt-4 space-y-2.5">
      {[
        { n: "Daniel, 38", strong: "Social", weak: "Inner work", pct: 92 },
        { n: "Aaron, 41", strong: "Health", weak: "Love", pct: 87 },
        { n: "Sam, 33", strong: "Flow", weak: "Health", pct: 81 },
      ].map((m) => (
        <div key={m.n} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-primary-glow" />
              <span className="text-[11px] font-medium">{m.n}</span>
            </div>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[9px] text-primary">
              {m.pct}% match
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[9.5px]">
            <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-primary">↑ {m.strong}</span>
            <span className="text-muted-foreground">covers your</span>
            <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-foreground/80">{m.weak}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-auto rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5 text-center">
      <p className="text-[10px] text-muted-foreground">Refreshes weekly · only quiet, active men</p>
    </div>
  </div>
);

/** Content Library screen */
export const ScreenLibrary = () => (
  <div className="flex h-full w-full flex-col bg-gradient-to-b from-[#08080c] to-[#0a0a14] p-5 pt-10">
    <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Library</p>
    <h3 className="mt-2 text-[16px] font-medium text-display">For your focus area</h3>

    <div className="mt-3 flex gap-1.5">
      {["All", "Inner", "Love", "Health", "Flow"].map((t, i) => (
        <span
          key={t}
          className={`rounded-full border px-2 py-0.5 text-[9px] ${
            i === 1 ? "border-primary bg-primary/15 text-foreground" : "border-white/10 text-muted-foreground"
          }`}
        >
          {t}
        </span>
      ))}
    </div>

    <div className="mt-3 space-y-2">
      {[
        { k: "Video", t: "Sitting with discomfort", d: "9 min · Inner" },
        { k: "Article", t: "How men actually rebuild trust", d: "6 min read" },
        { k: "Audio", t: "Morning reset · Day 4", d: "11 min" },
        { k: "Workshop", t: "The honest letter", d: "3 sessions" },
      ].map((c) => (
        <div key={c.t} className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-primary/40 to-primary/10 text-[8.5px] uppercase tracking-wider text-foreground">
            {c.k.slice(0, 3)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium">{c.t}</p>
            <p className="mt-0.5 text-[9.5px] text-muted-foreground">{c.d}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
