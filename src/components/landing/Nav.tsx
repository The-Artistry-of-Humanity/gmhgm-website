import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DownloadButton } from "./DownloadButton";
import { cn } from "@/lib/utils";
import { ArrowRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import logo from "@/assets/gmhgm-logo.png";

const links = [
  { href: "/#pillars", label: "The Pillars" },
  { href: "/#how", label: "How it works" },
  { href: "/#community", label: "Community" },
  { href: "/press", label: "Press" },
];

export const Nav = ({
  minimal = false,
  coachingCta = false,
}: { minimal?: boolean; coachingCta?: boolean } = {}) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="container">
        <div
          className={cn(
            "flex items-center justify-between rounded-full transition-all duration-500",
            scrolled
              ? "glass-strong px-4 py-2 shadow-elevated"
              : "px-2 py-1"
          )}
        >
          <Link to="/" className="flex items-center gap-2.5 pl-1">
            <img
              src={logo}
              alt="GMHGM logo"
              className="h-9 w-9 rounded-[8px]"
            />
            <span className="text-sm font-semibold tracking-[0.18em] text-foreground/90">
              GMHGM
            </span>
          </Link>

          {!minimal && (
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          )}

          {!minimal && (
          <div className="flex items-center gap-2">
            <Link
              to="/coaching"
              className="inline-flex items-center justify-center rounded-full px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-medium text-foreground/90 hover:text-foreground border border-white/10 hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
            >
              Coaching
            </Link>
            <div className="hidden sm:block">
              <DownloadButton size="md" />
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-foreground/90 transition-colors"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-white/10 w-[85%] sm:w-[380px]">
                <nav className="mt-12 flex flex-col gap-2">
                  {links.map((l) => (
                    <SheetClose asChild key={l.href}>
                      <a
                        href={l.href}
                        className="px-3 py-3 text-base text-foreground/90 hover:text-foreground border-b border-white/5"
                      >
                        {l.label}
                      </a>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link
                      to="/coaching"
                      className="mt-4 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary-glow shadow-glow transition-all"
                    >
                      1:1 Coaching with Ian
                    </Link>
                  </SheetClose>
                  <div className="mt-2 sm:hidden">
                    <DownloadButton size="md" />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          )}
          {minimal && coachingCta && (
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary-glow shadow-glow hover:shadow-soft-glow transition-all duration-300"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
              <span className="relative">Start the conversation</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
