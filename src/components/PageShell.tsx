import { ReactNode } from "react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { useDocumentTitle } from "@/hooks/use-document-title";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  updated?: string;
  children: ReactNode;
  documentTitle?: string;
  documentDescription?: string;
}

export const PageShell = ({ eyebrow, title, intro, updated, children, documentTitle, documentDescription }: PageShellProps) => {
  useDocumentTitle(
    documentTitle ?? `${title} — GMHGM`,
    documentDescription ?? intro
  );
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav />
      <main className="pt-36 md:pt-44 pb-24">
        <div className="container max-w-3xl">
          {eyebrow && (
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-6 text-display text-[40px] sm:text-[56px] md:text-[64px] leading-[1.04]">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              {intro}
            </p>
          )}
          {updated && (
            <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {updated}
            </p>
          )}
          <div className="mt-14 prose-content space-y-6">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
