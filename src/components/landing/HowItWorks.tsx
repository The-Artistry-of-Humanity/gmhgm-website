import { Check } from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";
import screenScore from "@/assets/screen-fulfilment-score.png";
import screenPillars from "@/assets/screen-five-pillars.png";
import screenWeakSpots from "@/assets/screen-weak-spots.png";
import screenCommunity from "@/assets/screen-community.png";
import screenLibrary from "@/assets/screen-library.png";

const FEATURES = [
  {
    eyebrow: "Fulfilment Score",
    title: "A single, honest score for how your life is really going.",
    body: "Check in with yourself and get one clear number that reflects where you actually stand. Not a guess, not a feeling — a personal baseline you can track over time.",
    image: screenScore,
  },
  {
    eyebrow: "Five Pillars of Fulfilment",
    title: "A holistic view of your life — not a narrow slice.",
    body: "Your life is more than just one thing. The app looks at five core areas that shape how fulfilled you actually feel, so nothing important gets missed.",
    image: screenPillars,
  },
  {
    eyebrow: "Weak spots",
    title: "Find your weak spots. Work on them.",
    body: "The app shows you exactly where you're slipping and gives you habits and self-workshops to strengthen those areas. No generic advice — everything is targeted to where you actually need it.",
    image: screenWeakSpots,
  },
  {
    eyebrow: "Matched Connections",
    title: "Paired with men who complement where you stand.",
    body: "Get matched with men who are strong where you're struggling, and the other way around. Real, complementary support from someone who gets it — not a random feed of strangers.",
    image: screenCommunity,
  },
  {
    eyebrow: "Content Library",
    title: "Curated content for every area of life.",
    body: "Videos, articles, and resources across all five pillars — built to support your growth without the overwhelm of figuring out what to watch, read, or do next.",
    image: screenLibrary,
  },
];

const CHECKLIST = [
  "Tailored growth path based on your score",
  "Daily actions to keep you moving in all areas of life",
  "Self-workshops you can do at your own pace",
  "Community of like-minded men on the same journey",
  "Identify your strongest and weakest life areas at a glance",
  "Set intentions and track your habits",
  "Content matched to your current focus area",
  "Built for men who want more from life, not just fewer problems",
  "Free to use while in early access",
  "Available on App Store and Google Play",
];

export const HowItWorks = () => {
  return (
    <section id="how" className="relative py-28 md:py-40">
      <div className="container">
        <div className="max-w-2xl">
          <p className="reveal text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            How it works
          </p>
          <h2 className="reveal mt-6 text-display text-[36px] sm:text-[48px] md:text-[60px] leading-[1.05]">
            One app.<br />Five pillars.<br />Daily.
          </h2>
        </div>

        <div className="mt-24 space-y-32 md:space-y-40">
          {FEATURES.map((f, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={f.title}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-5 reveal">
                  <p className="text-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                    0{i + 1} · {f.eyebrow}
                  </p>
                  <h3 className="mt-5 text-display text-[30px] sm:text-[36px] md:text-[42px] leading-[1.1]">
                    {f.title}
                  </h3>
                  <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
                    {f.body}
                  </p>
                </div>

                <div className="lg:col-span-7 reveal">
                  <div className="relative flex justify-center">
                    <div
                      className="absolute -inset-12 -z-10 rounded-full bg-glow blur-3xl opacity-50"
                      aria-hidden
                    />
                    <PhoneMockup>
                      <img
                        src={f.image}
                        alt={f.eyebrow}
                        className="h-full w-full object-cover"
                      />
                    </PhoneMockup>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Checklist — everything else inside the app */}
        <div className="mt-32 md:mt-40 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 reveal">
            <p className="text-mono text-[11px] uppercase tracking-[0.24em] text-primary">
              And everything else
            </p>
            <h3 className="mt-5 text-display text-[30px] sm:text-[36px] md:text-[42px] leading-[1.1]">
              What else is inside.
            </h3>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
              The details that make the difference — built around how men actually live, not how apps usually work.
            </p>
          </div>
          <ul className="lg:col-span-7 reveal grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {CHECKLIST.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-t border-white/[0.06] pt-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/40">
                  <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                </span>
                <span className="text-[14px] md:text-[15px] leading-relaxed text-foreground/90">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
