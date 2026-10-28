import { useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  ArrowRight,
  Check,
  Compass,
  Flame,
  HeartPulse,
  Brain,
  Users,
  Briefcase,
  Heart,
  ShieldCheck,
  Sparkles,
  Target,
  Activity,
  Quote,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useDocumentTitle } from "@/hooks/use-document-title";
import sauna from "@/assets/coach-sauna.jpg";
import headphones from "@/assets/coach-headphones.png";
import flex from "@/assets/coach-flex.jpg";
import portrait from "@/assets/coach-portrait.jpg";
import pointing from "@/assets/coach-pointing.png";

/* ---------- Reusable bits ---------- */

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
    {children}
  </p>
);

const SectionHeading = ({
  eyebrow,
  title,
  intro,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) => (
  <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h2 className="mt-5 text-display text-[34px] sm:text-[44px] md:text-[52px] leading-[1.05]">
      {title}
    </h2>
    {intro && (
      <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
        {intro}
      </p>
    )}
  </div>
);

const PrimaryCTA = ({
  children,
  href = "#contact",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) => (
  <a
    href={href}
    className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-medium text-primary-foreground bg-primary hover:bg-primary-glow shadow-glow hover:shadow-soft-glow transition-all duration-300 ${className}`}
  >
    <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
    <span className="relative">{children}</span>
    <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
  </a>
);

const GhostCTA = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <a
    href={href}
    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-foreground/90 hover:text-foreground border border-white/10 hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
  >
    {children}
  </a>
);

/* ---------- Hero with vertical YouTube Short ---------- */

const Hero = () => (
  <section className="relative pt-36 md:pt-44 pb-24 overflow-hidden">
    <div className="absolute inset-0 -z-10 grid-bg opacity-60" />
    <div
      className="absolute inset-x-0 top-0 -z-10 h-[600px]"
      style={{ background: "var(--gradient-radial-hero)" }}
    />
    <div className="container">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-center">
        <div className="reveal">
          <Eyebrow>1:1 Coaching with Ian Williams</Eyebrow>
          <h1 className="mt-7 text-display text-[44px] leading-[1.02] sm:text-[64px] md:text-[78px] lg:text-[88px] text-foreground">
            Are you ready to{" "}
             <span className="italic text-primary-foreground">change your life?</span>
          </h1>
          <p className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-xl">
            If you're tired of drifting, overthinking, or repeating the same
            patterns, I can help. My coaching is built around the{" "}
            <strong className="text-foreground">5 Pillars of Fulfilment</strong>.
            Direct, grounded, and honest about where you're slipping.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <PrimaryCTA>Start the conversation</PrimaryCTA>
            <GhostCTA href="#packages">See packages</GhostCTA>
          </div>
          <p className="mt-6 text-sm text-muted-foreground italic">
            Only reach out if you're genuinely willing to put in the work.
          </p>
        </div>

        {/* Vertical YouTube short */}
        <div className="reveal flex justify-center lg:justify-end">
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-[40px] blur-3xl opacity-60"
              style={{ background: "var(--gradient-glow)" }}
            />
            <div className="relative rounded-[36px] p-[2px] bg-gradient-to-b from-white/20 via-primary/30 to-white/5 shadow-elevated">
              <div className="rounded-[34px] overflow-hidden bg-black aspect-[9/16] w-[280px] sm:w-[320px] md:w-[340px]">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/Q84sorSpdfc?autoplay=1&mute=1&loop=1&playlist=Q84sorSpdfc&controls=1&modestbranding=1&rel=0&playsinline=1"
                  title="A message from Ian"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Quick promise tiles ---------- */

const Promises = () => {
  const items = [
    {
      Icon: Target,
      title: "Get clear on what's holding you back",
      copy: "Cut through the noise and name the real blocker.",
    },
    {
      Icon: Activity,
      title: "Build consistency across all 5 pillars",
      copy: "Health, relationships, work, and your inner world.",
    },
    {
      Icon: ShieldCheck,
      title: "Feel calmer, more confident, in control",
      copy: "Self-leadership instead of survival mode.",
    },
  ];
  return (
    <section className="py-16">
      <div className="container grid sm:grid-cols-3 gap-4">
        {items.map(({ Icon, title, copy }, i) => (
          <div
            key={i}
            className="reveal rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300"
          >
            <Icon className="h-5 w-5 text-primary-glow" />
            <h3 className="mt-4 text-base font-medium text-foreground leading-snug">
              {title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ---------- This won't be comfortable ---------- */

const NotComfortable = () => (
  <section className="py-24">
    <div className="container">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="reveal relative order-2 md:order-1">
          <div
            className="absolute -inset-4 rounded-3xl blur-2xl opacity-50"
            style={{ background: "var(--gradient-glow)" }}
          />
          <div className="relative rounded-3xl overflow-hidden border border-white/10">
            <img
              src={sauna}
              alt="Ian Williams"
              className="w-full h-[480px] object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
        <div className="reveal order-1 md:order-2">
          <Eyebrow>Honest warning</Eyebrow>
          <h2 className="mt-5 text-display text-[34px] sm:text-[44px] md:text-[52px] leading-[1.05]">
            This won't be comfortable.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            I may look friendly, and I would consider myself this way, but if
            we work together, this won't be easy. I'm not going to tell you what
            you want to hear. I'm going to tell you what you need to hear.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            I'll tell you the truth, even when it's uncomfortable. I'll
            challenge you. And I'll expect you to get uncomfortable, stay in it,
            and grow through it.
          </p>
          <p className="mt-6 text-foreground/90 italic">
            If you're ready for that, keep scrolling. If not, this probably
            isn't for you.
          </p>
          <div className="mt-8">
            <PrimaryCTA>I'm ready, let's talk</PrimaryCTA>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Different lives, same patterns ---------- */

const Patterns = () => {
  const symptoms = [
    "You wake up with good intentions… then the day happens and you're back in survival mode",
    "You tell yourself \"I'll start next week\" and weeks turn into months",
    "You overthink a message, a decision, a conversation… then say nothing and regret it",
    "You scroll, snack, drink, work, or train to switch your brain off, then still feel restless",
    "You feel behind in life, like you should be further along, and it's quietly eating at you",
    "You want to date, socialise, or put yourself out there… but confidence keeps disappearing",
    "You keep saying yes to things you don't want, then feel resentful",
    "You're productive, but not fulfilled, like you're ticking boxes instead of living",
    "You avoid hard conversations because conflict feels risky… then problems build up",
    "You've had a big change (breakup, new job, move, becoming a parent, loss)",
    "You keep starting habits (gym, routines, journaling, meditation)… and they never stick",
    "You don't feel like yourself lately and you can't fully explain why",
  ];
  const wants = [
    "Wake up steady, not already behind",
    "Stop negotiating with yourself and actually follow through",
    "Feel confident in the moment, not just alone in your head",
    "Have better boundaries without guilt or blowing things up",
    "Feel connected to yourself, and to the people around you",
    "Build a life that feels aligned across the 5 Pillars, not just \"busy\"",
  ];

  return (
    <section className="py-24 relative">
      <div className="container">
        <SectionHeading
          eyebrow="The pattern"
          title="Different lives, same patterns."
          intro="If you can relate to even a few of these, you're in the right place."
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-6">
          {/* Symptoms */}
          <div className="reveal rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 md:p-10">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Sound familiar?
            </p>
            <ul className="mt-6 space-y-3.5">
              {symptoms.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground/85 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-destructive/80 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Wants */}
          <div className="reveal rounded-3xl p-[1px] bg-gradient-to-b from-primary/40 via-primary/10 to-transparent">
            <div className="rounded-3xl bg-background/80 p-8 md:p-10 h-full backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.22em] text-primary-glow">
                What you want instead
              </p>
              <ul className="mt-6 space-y-4">
                {wants.map((s, i) => (
                  <li key={i} className="flex gap-3 text-base text-foreground/95 leading-relaxed">
                    <Check className="mt-0.5 h-5 w-5 text-primary-glow shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <PrimaryCTA>Let's get you there</PrimaryCTA>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- How I coach (process steps with visual) ---------- */

const HowICoach = () => {
  const steps = [
    {
      n: "01",
      title: "Get honest about what's actually going on",
      copy: "We separate the symptom from the real pattern. No guesswork.",
    },
    {
      n: "02",
      title: "Build a plan that works in real life",
      copy: "Not perfect-world advice. Something you can follow on your worst day.",
    },
    {
      n: "03",
      title: "I challenge you when you're avoiding",
      copy: "Direct, but supportive. We do the hard reps together.",
    },
    {
      n: "04",
      title: "Momentum, consistency, self-leadership",
      copy: "Quick fixes don't last. We build the operator underneath.",
    },
  ];

  return (
    <section className="py-24">
      <div className="container">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-center">
          <div className="reveal">
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-[40px] blur-3xl opacity-40"
                style={{ background: "var(--gradient-glow)" }}
              />
              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                <img src={flex} alt="Coaching in action" className="w-full h-[520px] object-cover" />
              </div>
            </div>
          </div>
          <div>
            <Eyebrow>How I coach</Eyebrow>
            <h2 className="mt-5 text-display text-[34px] sm:text-[44px] md:text-[52px] leading-[1.05]">
              No hype. Just the work.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
              I help you build a life that feels aligned, using the 5 Pillars
              of Fulfilment as the framework.
            </p>

            <ol className="mt-10 space-y-3">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="reveal group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex gap-5">
                    <span className="text-mono text-xs text-primary-glow pt-1 tracking-widest">
                      {s.n}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-foreground">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {s.copy}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- 5 Pillars visualization ---------- */

const PillarsViz = () => {
  const pillars = [
    { Icon: HeartPulse, label: "Health & Fitness", copy: "Energy, strength, sleep." },
    { Icon: Brain, label: "Internal Work", copy: "Emotional regulation & mindset." },
    { Icon: Heart, label: "Love & Relationships", copy: "Intimacy, dating, connection." },
    { Icon: Users, label: "Social Connection", copy: "Real friendships, real support." },
    { Icon: Briefcase, label: "Work & Life Flow", copy: "Purpose, money, balance." },
  ];

  return (
    <section className="py-24 relative">
      <div className="container">
        <SectionHeading
          eyebrow="The framework"
          title="The 5 Pillars of Fulfilment"
          intro="One pillar slipping pulls the others down. We work on all five, together."
        />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pillars.map(({ Icon, label, copy }, i) => (
            <div
              key={label}
              className="reveal group relative rounded-2xl p-[1px] bg-gradient-to-b from-white/10 to-white/[0.02] hover:from-primary/40 transition-all duration-500"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="relative h-full rounded-2xl bg-card/80 backdrop-blur p-6 overflow-hidden">
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 border border-primary/30 text-primary-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Pillar 0{i + 1}
                  </p>
                  <h3 className="mt-2 text-base font-medium text-foreground leading-snug">
                    {label}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {copy}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <PrimaryCTA>Map your pillars with me</PrimaryCTA>
        </div>
      </div>
    </section>
  );
};

/* ---------- About Ian ---------- */

const AboutIan = () => (
  <section className="py-24">
    <div className="container">
      <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div className="reveal relative">
          <div className="relative rounded-3xl overflow-hidden border border-white/10">
            <img
              src={portrait}
              alt="Ian Williams"
              className="w-full h-[520px] object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -right-5 hidden md:block rounded-2xl border border-white/10 bg-background/80 backdrop-blur px-5 py-4 shadow-elevated">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Founder</p>
            <p className="mt-1 text-sm font-medium">Ian Williams</p>
          </div>
        </div>
        <div className="reveal">
          <Eyebrow>And this is me…</Eyebrow>
          <h2 className="mt-5 text-display text-[34px] sm:text-[44px] md:text-[52px] leading-[1.05]">
            Hi, I'm Ian.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            I've been where you are. For a long time I looked like I had it
            together… but underneath I was carrying stress, overthinking, and a
            quiet feeling that something was off.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            That's why I coach the way I do now: direct, grounded, and
            practical. No hype. No pretending. Just the truth, and the tools to
            do something about it.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Over the years I've mentored and coached hundreds of men through
            confidence, consistency, purpose, emotional control and more.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "100s", v: "Men coached" },
              { k: "5", v: "Pillars covered" },
              { k: "1:1", v: "Always personal" },
            ].map((s) => (
              <div key={s.v} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-display text-2xl text-primary-glow">{s.k}</p>
                <p className="mt-1 text-xs text-muted-foreground uppercase tracking-[0.18em]">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Testimonials ---------- */

const Testimonials = () => {
  const quotes = [
    {
      q: "I was about to drop a heap more money on therapy again. Chatting with Ian saved me thousands. Not because therapy's bad, I just needed straight talk, a clear plan, and someone to keep me honest. Massive shift in a short time.",
      who: "Cliff, 31",
    },
    {
      q: "I used to bottle things up, then it'd come out sideways. Ian helped me get my head right, regulate my emotions, and actually say what I mean without blowing things up. My relationships are way calmer now.",
      who: "Stevo, 42",
    },
    {
      q: "I'd go hard for a week, fall off, then feel guilty and start again. Working with Ian, I finally built habits that stick. I'm more confident now because I'm actually backing myself with action.",
      who: "Luke, 28",
    },
    {
      q: "I was running hot all the time, work stress, no off switch, always 'on'. The coaching helped me slow my head down, get my priorities straight, and build a routine that actually brings me back to centre. Sleeping better, feeling in control again.",
      who: "Matt, 34",
    },
    {
      q: "Everything looked good on paper, but I still felt flat. Through our sessions I got honest about what I actually want versus what I'm doing out of habit. Now I've got direction and I'm making decisions with confidence instead of second guessing everything.",
      who: "Sam, 31",
    },
    {
      q: "I was saying yes to everything and quietly resenting everyone. The work we did around boundaries was a game changer. No more guilt, no more living in other people's expectations. Life feels lighter and I'm way more solid in myself.",
      who: "Josh, 38",
    },
    {
      q: "I was overthinking dating, reading every signal, then either trying too hard or pulling back. The biggest shift was building self-trust. I show up grounded now, not performing, just relaxed in who I am.",
      who: "Jack, 29",
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative">
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[400px] opacity-60"
        style={{ background: "var(--gradient-radial-hero)" }}
      />
      <div className="container">
        <SectionHeading
          eyebrow="What the men I coach say"
          title="Different starting points. Same shift."
          intro="I've coached men from all walks of life, across different ages and life situations: relationships, breakups, fatherhood, pressure at work, confidence, direction. If you're wondering what this feels like on the other side, start here."
        />

        <div className="mt-16 columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {quotes.map(({ q, who }, i) => (
            <figure
              key={who}
              className="reveal mb-5 break-inside-avoid rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 hover:border-primary/30 transition-all duration-300"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <Quote className="h-5 w-5 text-primary-glow/80" />
              <blockquote className="mt-4 text-[15px] leading-relaxed text-foreground/90">
                {q}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 border border-primary/30 text-primary-glow text-xs font-medium">
                  {who.charAt(0)}
                </span>
                <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {who}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <PrimaryCTA>Start your conversation</PrimaryCTA>
        </div>
      </div>
    </section>
  );
};

/* ---------- Packages ---------- */

const Packages = () => {
  const packs = [
    {
      name: "Clarity",
      price: "$390",
      currency: "AUD",
      tag: "One session",
      Icon: Compass,
      best: "Feeling stuck, overwhelmed, at a crossroads.",
      desc: "A 90-minute Clarity Session (video or in-person).",
      bullets: [
        "Clear direction on what matters most right now",
        "The real blocker named: pattern, fear, blind spot",
        "A simple next-step plan you can act on immediately",
        "Confidence + calm because you know what to do next",
      ],
    },
    {
      name: "Momentum",
      price: "$1,690",
      currency: "AUD",
      tag: "6 weeks",
      Icon: Flame,
      featured: true,
      best: "Build momentum across the 5 Pillars.",
      desc: "Consistency that lasts, not another short burst.",
      bullets: [
        "Habits that match your goals and your real life",
        "Self-Workshops to break unhelpful patterns",
        "Mirror Sessions to cut through self-deception",
        "3× 60-min sessions + WhatsApp support (24 to 48h, weekdays)",
      ],
    },
    {
      name: "Evolve",
      price: "$3,490",
      currency: "AUD",
      tag: "12 weeks",
      Icon: Sparkles,
      best: "Deep transformation + high accountability.",
      desc: "Everything in Momentum, plus deeper behaviour change.",
      bullets: [
        "More reps with Ian so insights turn into action",
        "A reset halfway through to tighten the plan",
        "Stronger emotional regulation under pressure",
        "5× 60-min sessions, 3× 20-min check-ins, WhatsApp support",
      ],
    },
  ];

  return (
    <section id="packages" className="py-24 relative">
      <div className="container">
        <SectionHeading
          eyebrow="Coaching packages"
          title="Three ways to work together."
          intro="From a clarity reset to deep transformation. Pick what matches the season you're in."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {packs.map(({ name, price, currency, tag, Icon, best, desc, bullets, featured }) => (
            <div
              key={name}
              className={`reveal relative rounded-3xl p-[1px] transition-all duration-500 ${
                featured
                  ? "bg-gradient-to-b from-primary/60 via-primary/20 to-transparent shadow-glow"
                  : "bg-gradient-to-b from-white/10 to-white/[0.02]"
              }`}
            >
              <div className="relative h-full rounded-3xl bg-card/90 backdrop-blur p-7 flex flex-col">
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.22em] bg-primary text-primary-foreground shadow-glow">
                    Most chosen
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 border border-primary/30 text-primary-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {tag}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-medium text-foreground">{name}</h3>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-display text-4xl">{price}</span>
                  <span className="text-xs text-muted-foreground">{currency}</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground italic">Best for: {best}</p>
                <p className="mt-3 text-sm text-foreground/85 leading-relaxed">{desc}</p>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm text-foreground/85 leading-relaxed">
                      <Check className="mt-0.5 h-4 w-4 text-primary-glow shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${
                    featured
                      ? "bg-primary text-primary-foreground hover:bg-primary-glow shadow-glow"
                      : "border border-white/10 hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.05] text-foreground/90"
                  }`}
                >
                  Choose {name}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Contact form ---------- */

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  location: z.string().trim().min(2, "Where are you based?").max(120),
  reason: z.string().trim().min(10, "Tell me a little about what's going on").max(1500),
  packageInterest: z.string().min(1, "Pick the package you're drawn to"),
  weeklyTime: z.string().min(1, "Roughly how much time can you commit?"),
  notes: z.string().trim().max(1000).optional(),
});

const PACKAGE_OPTIONS = [
  "Clarity (one 90-min session)",
  "Momentum (6 weeks)",
  "Evolve (12 weeks)",
  "Not sure yet, help me choose",
];

const TIME_OPTIONS = [
  "1 to 2 hours / week",
  "3 to 4 hours / week",
  "5+ hours / week",
  "Whatever it takes",
];

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    reason: "",
    packageInterest: "",
    weeklyTime: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as keyof typeof form] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const d = result.data;
    try {
      const { error } = await supabase.functions.invoke("submit-coaching-enquiry", {
        body: {
          name: d.name,
          email: d.email,
          location: d.location,
          reason: d.reason,
          packageInterest: d.packageInterest,
          weeklyTime: d.weeklyTime,
          notes: d.notes || "",
        },
      });
      if (error) throw error;

      toast({
        title: "Message received",
        description: "Thanks for reaching out. Ian will personally read your message and reply soon.",
      });
      setForm({
        name: "",
        email: "",
        location: "",
        reason: "",
        packageInterest: "",
        weeklyTime: "",
        notes: "",
      });
    } catch (err) {
      console.error("Submission failed", err);
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again or email ian@gmhgm.com directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container">
        <div className="relative rounded-[32px] p-[1px] bg-gradient-to-br from-primary/60 via-primary/20 to-white/5 shadow-elevated overflow-hidden">
          <div className="relative rounded-[31px] bg-gradient-to-br from-background via-background to-[hsl(240_60%_8%)] p-8 md:p-14">
            <div
              className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-50 blur-3xl"
              style={{ background: "var(--gradient-glow)" }}
            />
            <div className="relative grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
              <div>
                <Eyebrow>Start the conversation</Eyebrow>
                <h2 className="mt-5 text-display text-[34px] sm:text-[44px] md:text-[48px] leading-[1.05]">
                  Tell me what's actually going on.
                </h2>
                <p className="mt-5 text-muted-foreground leading-relaxed">
                  Help me understand what you're looking for and whether I'm the
                  right person to support you. I'll read every message
                  personally.
                </p>
                <div className="mt-8 hidden lg:block">
                  <img
                    src={pointing}
                    alt=""
                    className="w-56 h-auto opacity-90"
                  />
                </div>
              </div>

              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Joe Smith"
                      maxLength={100}
                      className="h-12 bg-white/[0.04] border-white/10 focus-visible:ring-primary/50"
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="joe@gmail.com"
                      maxLength={255}
                      className="h-12 bg-white/[0.04] border-white/10 focus-visible:ring-primary/50"
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                    Where are you based? (City, Country)
                  </label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Sydney, Australia"
                    maxLength={120}
                    className="h-12 bg-white/[0.04] border-white/10 focus-visible:ring-primary/50"
                  />
                  {errors.location && <p className="mt-1.5 text-xs text-destructive">{errors.location}</p>}
                </div>

                <div>
                  <label htmlFor="reason" className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                    What made you reach out right now?
                  </label>
                  <Textarea
                    id="reason"
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    placeholder="I'm struggling with X recently and I'm looking to..."
                    rows={5}
                    maxLength={1500}
                    className="bg-white/[0.04] border-white/10 focus-visible:ring-primary/50"
                  />
                  {errors.reason && <p className="mt-1.5 text-xs text-destructive">{errors.reason}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                      Package interest
                    </label>
                    <Select
                      value={form.packageInterest}
                      onValueChange={(v) => setForm({ ...form, packageInterest: v })}
                    >
                      <SelectTrigger className="h-12 bg-white/[0.04] border-white/10 focus:ring-primary/50">
                        <SelectValue placeholder="Select…" />
                      </SelectTrigger>
                      <SelectContent>
                        {PACKAGE_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.packageInterest && <p className="mt-1.5 text-xs text-destructive">{errors.packageInterest}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                      Weekly time you can invest
                    </label>
                    <Select
                      value={form.weeklyTime}
                      onValueChange={(v) => setForm({ ...form, weeklyTime: v })}
                    >
                      <SelectTrigger className="h-12 bg-white/[0.04] border-white/10 focus:ring-primary/50">
                        <SelectValue placeholder="Select…" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.weeklyTime && <p className="mt-1.5 text-xs text-destructive">{errors.weeklyTime}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                    Anything else I need to know? (optional)
                  </label>
                  <Textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Context, timing, anything you'd want me to know going in."
                    rows={3}
                    maxLength={1000}
                    className="bg-white/[0.04] border-white/10 focus-visible:ring-primary/50"
                  />
                  {errors.notes && <p className="mt-1.5 text-xs text-destructive">{errors.notes}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-medium text-primary-foreground bg-primary hover:bg-primary-glow shadow-glow hover:shadow-soft-glow transition-all duration-300 disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Let's do this"}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

/* ---------- Page ---------- */

const Coaching = () => {
  const ref = useReveal<HTMLDivElement>();
  useDocumentTitle(
    "1:1 Coaching with Ian Williams — GMHGM",
    "Direct, grounded 1:1 coaching with Ian Williams, built around the 5 Pillars of Fulfilment. For men ready to do the work."
  );
  return (
    <div ref={ref} className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav minimal coachingCta />
      <main>
        <Hero />
        <Promises />
        <NotComfortable />
        <Patterns />
        <HowICoach />
        <PillarsViz />
        <AboutIan />
        <Testimonials />
        <Packages />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Coaching;