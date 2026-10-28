import { useState } from "react";

const PILLARS = [
  { key: "health", label: "Health & Fitness", desc: "Train the body. Sleep the brain. Eat like it matters." },
  { key: "inner", label: "Inner Work", desc: "Notice the patterns. Soften the edges. Know yourself." },
  { key: "love", label: "Love & Relationships", desc: "Show up for the people who chose you." },
  { key: "social", label: "Social Connection", desc: "Friendships are infrastructure. Maintain them." },
  { key: "flow", label: "Work & Life Flow", desc: "Do work that fits. Build a life around it, not despite it." },
] as const;

export const Pillars = () => {
  const [active, setActive] = useState<number>(0);

  // pentagon geometry
  const size = 520;
  const cx = size / 2;
  const cy = size / 2 + 10;
  const r = 180;
  const padX = 140; // horizontal padding for labels
  const padY = 60; // vertical padding for labels
  const points = PILLARS.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), angle: a };
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");
  const innerR = r * 0.6;
  const innerPoints = PILLARS.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return `${cx + innerR * Math.cos(a)},${cy + innerR * Math.sin(a)}`;
  }).join(" ");

  return (
    <section id="pillars" className="relative py-28 md:py-40 overflow-hidden">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <div className="h-[600px] w-[600px] rounded-full bg-glow blur-3xl opacity-60" />
      </div>

      <div className="container relative">
        <div className="max-w-2xl">
          <p className="reveal text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            The framework
          </p>
          <h2 className="reveal mt-6 text-display text-[36px] sm:text-[48px] md:text-[60px] leading-[1.05]">
            The Five Pillars<br />of Fulfilment.
          </h2>
          <p className="reveal mt-6 max-w-xl text-muted-foreground text-base md:text-lg leading-relaxed">
            Every man's life rests on five loads. When one collapses, the others bend. GMHGM is built around all five — together.
          </p>
        </div>

        <div className="reveal mt-16 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* pentagon */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="relative w-full max-w-[520px]">
            <svg
              viewBox={`${-padX} ${-padY} ${size + padX * 2} ${size + 20 + padY * 2}`}
              className="w-full h-auto overflow-visible"
            >
                <defs>
                  <radialGradient id="penta-fill" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(240 100% 55% / 0.25)" />
                    <stop offset="100%" stopColor="hsl(240 100% 55% / 0)" />
                  </radialGradient>
                  <filter id="penta-glow">
                    <feGaussianBlur stdDeviation="6" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* radial spokes */}
                {points.map((p, i) => (
                  <line
                    key={`spoke-${i}`}
                    x1={cx}
                    y1={cy}
                    x2={p.x}
                    y2={p.y}
                    stroke="hsl(0 0% 100% / 0.06)"
                    strokeWidth="1"
                  />
                ))}

                {/* outer pentagon */}
                <polygon
                  points={polygonPoints}
                  fill="url(#penta-fill)"
                  stroke="hsl(0 0% 100% / 0.14)"
                  strokeWidth="1"
                />

                {/* inner pentagon */}
                <polygon
                  points={innerPoints}
                  fill="none"
                  stroke="hsl(0 0% 100% / 0.08)"
                  strokeWidth="1"
                />

                {/* active edges from center */}
                <line
                  key={`active-${active}`}
                  x1={cx}
                  y1={cy}
                  x2={points[active].x}
                  y2={points[active].y}
                  stroke="hsl(240 100% 60%)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  filter="url(#penta-glow)"
                />

                {/* vertices */}
                {points.map((p, i) => {
                  const isActive = i === active;
                  return (
                    <g
                      key={i}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isActive ? 18 : 12}
                        fill={isActive ? "hsl(240 100% 50%)" : "hsl(0 0% 8%)"}
                        stroke={isActive ? "hsl(240 100% 70%)" : "hsl(0 0% 100% / 0.2)"}
                        strokeWidth="1.5"
                        filter={isActive ? "url(#penta-glow)" : undefined}
                        style={{ transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)" }}
                      />
                      <circle cx={p.x} cy={p.y} r={4} fill={isActive ? "white" : "hsl(0 0% 50%)"} />
                    </g>
                  );
                })}

                {/* center node */}
                <circle cx={cx} cy={cy} r={6} fill="hsl(240 100% 60%)" filter="url(#penta-glow)" />

                {/* labels */}
                {points.map((p, i) => {
                  const dx = p.x - cx;
                  const dy = p.y - cy;
                  const len = Math.hypot(dx, dy);
                  const ox = (dx / len) * 56;
                  const oy = (dy / len) * 38;
                  const isActive = i === active;
                  const anchor = Math.abs(dx) < 4 ? "middle" : dx > 0 ? "start" : "end";
                  return (
                    <text
                      key={`label-${i}`}
                      x={p.x + ox}
                      y={p.y + oy}
                      textAnchor={anchor}
                      dominantBaseline="middle"
                      fontSize="13"
                      fontFamily="Inter, sans-serif"
                      fontWeight={isActive ? 600 : 500}
                      fill={isActive ? "hsl(0 0% 98%)" : "hsl(0 0% 60%)"}
                      style={{ transition: "fill 0.3s" }}
                    >
                      {PILLARS[i].label}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* description list */}
          <div className="lg:col-span-2 space-y-2">
            {PILLARS.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.key}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`w-full text-left rounded-2xl border px-5 py-4 transition-all duration-300 ${
                    isActive
                      ? "border-primary/40 bg-primary/[0.06] shadow-soft-glow"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-mono text-[10px] tracking-widest ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span className="text-[15px] font-medium text-foreground">{p.label}</span>
                  </div>
                  <p
                    className={`mt-2 text-sm leading-relaxed transition-colors ${
                      isActive ? "text-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    {p.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
