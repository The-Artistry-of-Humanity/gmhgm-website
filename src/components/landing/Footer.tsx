import { Instagram, Youtube, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M16.5 3a5.5 5.5 0 0 0 5.5 5.5v3a8.45 8.45 0 0 1-5-1.62V15.5a6.5 6.5 0 1 1-6.5-6.5c.34 0 .67.03 1 .08v3.1a3.5 3.5 0 1 0 2.5 3.32V3h2.5z" />
  </svg>
);

const SpotifyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.4a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.55-1.03 8.48-.59 11.66 1.34.36.22.47.69.25 1.03zm1.23-2.74a.94.94 0 0 1-1.29.31c-3.23-1.99-8.16-2.57-11.98-1.4a.94.94 0 1 1-.55-1.8c4.38-1.34 9.83-.7 13.51 1.6a.94.94 0 0 1 .31 1.29zm.11-2.85c-3.87-2.3-10.27-2.51-13.97-1.39a1.13 1.13 0 1 1-.66-2.16c4.26-1.3 11.31-1.05 15.79 1.61a1.13 1.13 0 1 1-1.16 1.94z" />
  </svg>
);

const socials = [
  { href: "https://www.instagram.com/alignwithwillo/", label: "Instagram", Icon: Instagram },
  { href: "https://www.youtube.com/@alignwithwillo", label: "YouTube", Icon: Youtube },
  { href: "https://www.tiktok.com/@alignwithwillo", label: "TikTok", Icon: TikTokIcon },
  { href: "https://open.spotify.com/show/6C9jBcH8FHdlAdaQL9lfEQ?si=2c4d5b2439a944d8", label: "Spotify", Icon: SpotifyIcon },
  { href: "https://www.linkedin.com/in/ian-williams077/", label: "LinkedIn", Icon: Linkedin },
];

export const Footer = () => {
  return (
    <footer className="border-t border-white/[0.06] py-14">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary shadow-glow" />
            <span className="text-sm font-semibold tracking-[0.18em]">GMHGM</span>
            <span className="text-sm text-muted-foreground ml-3 hidden sm:inline">
              Good Men Helping Good Men
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-muted-foreground">
            <a href="/#pillars" className="hover:text-foreground transition-colors">The Pillars</a>
            <a href="/#how" className="hover:text-foreground transition-colors">How it works</a>
            <a href="/#community" className="hover:text-foreground transition-colors">Community</a>
            <Link to="/press" className="hover:text-foreground transition-colors">Press</Link>
            <Link to="/coaching" className="hover:text-foreground transition-colors">Coaching</Link>
          </nav>

          <div className="flex items-center gap-4">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GMHGM. Built for men, quietly.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
