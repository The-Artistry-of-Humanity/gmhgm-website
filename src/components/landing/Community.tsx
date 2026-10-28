const STATS = [
  { v: "500k+", l: "MEN INSPIRED ONLINE" },
  { v: "5", l: "Pillars of fulfilment" },
  { v: "100%", l: "MOVEMENT STRIKE-RATE" },
  { v: "Daily", l: "By design" },
];

const TESTIMONIALS = [
  {
    quote:
      "As a mother of three boys I believe something like this could be the helpful to raise good men (= sons, brothers, husbands!!).",
    name: "Maria, 44",
    place: "Melbourne",
  },
  {
    quote:
      "This can be more than just a community; it's a movement. We're breaking down toxic masculinity and creating a healthier, more supportive world for men 🌎💪💪",
    name: "Theo, 31",
    place: "Sydney",
  },
  {
    quote:
      "The pentagon thing sounds silly until you watch one of your sides cave in. Then you get it.",
    name: "Idris, 29",
    place: "Manchester",
  },
];

export const Community = () => {
  return (
    <section id="community" className="relative py-28 md:py-36">
      <div className="container">
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02]">
          {STATS.map((s) => (
            <div
              key={s.l}
              className="bg-background p-6 md:p-8 text-center"
            >
              <p className="text-display text-[28px] md:text-[40px] leading-none">{s.v}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.l}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="reveal glass rounded-2xl p-7 flex flex-col"
            >
              <blockquote className="text-foreground/90 text-[15px] leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-white/[0.06] text-sm text-muted-foreground">
                <span className="text-foreground/90">{t.name}</span> · {t.place}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
