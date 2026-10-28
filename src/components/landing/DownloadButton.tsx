import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
  className?: string;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
}

export const DownloadButton = ({ className, variant = "primary", size = "md" }: DownloadButtonProps) => {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const sizes = size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-sm";
  const href = "http://lnkz.app/dpvk";

  if (variant === "ghost") {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, sizes, "text-foreground/90 hover:text-foreground border border-white/10 hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.05]", className)}>
        Download the App
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        base,
        sizes,
        "text-primary-foreground bg-primary hover:bg-primary-glow shadow-glow hover:shadow-soft-glow",
        className
      )}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
      <span className="relative">Download the App</span>
      <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
};
