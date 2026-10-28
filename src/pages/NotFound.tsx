import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  useDocumentTitle("Page not found — GMHGM", "The page you're looking for doesn't exist.");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-clip flex flex-col">
      <Nav />
      <main className="flex-1 pt-36 md:pt-44 pb-24">
        <div className="container max-w-2xl text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            Error 404
          </p>
          <h1 className="mt-6 text-display text-[56px] sm:text-[72px] md:text-[88px] leading-[1.04]">
            Lost the trail.
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            The page you're looking for doesn't exist — or it's moved. Let's get you back on solid ground.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Back to home
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/coaching"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.04]"
            >
              Explore coaching
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
