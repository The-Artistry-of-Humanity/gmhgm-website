import { DownloadButton } from "./DownloadButton";
import { PhoneMockup } from "./PhoneMockup";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroPhoneScreen from "@/assets/hero-phone-screen.png";

export const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-hero-radial" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          {/* copy */}
          <div className="lg:col-span-7">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
                GOOD MEN HELPING GOOD MEN
              </span>
            </div>

            <h1 className="reveal mt-7 text-display text-[44px] leading-[1.02] sm:text-[64px] md:text-[78px] lg:text-[88px] text-foreground">
              Build a life you<br />
              don't need a<br />
              <span className="italic font-light text-foreground/95">break from.</span>
            </h1>

            <p className="reveal mt-7 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              GMHGM is a daily practice for men who want more from their lives — built around the Five Pillars of Fulfilment. Reflect, train, connect, grow. One operating system.
            </p>

            <div className="reveal mt-9 flex flex-wrap items-center gap-4">
              <DownloadButton size="lg" />
              <Link
                to="/coaching"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/90 hover:text-foreground border-b border-foreground/20 hover:border-foreground/60 pb-1 transition-colors"
              >
                Work 1:1 with Ian
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative reveal">
              <div
                className="absolute -inset-10 -z-10 rounded-full bg-glow blur-2xl animate-pulse-glow"
                aria-hidden
              />
              <div className="animate-float">
                <PhoneMockup>
                  <img
                    src={heroPhoneScreen}
                    alt="GMHGM app hero screen showing the Five Pillars framework"
                    className="h-full w-full object-cover"
                  />
                </PhoneMockup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
