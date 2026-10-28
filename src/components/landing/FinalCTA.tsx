import { DownloadButton } from "./DownloadButton";

export const FinalCTA = () => {
  return (
    <section id="download" className="relative py-32 md:py-44 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div className="h-[700px] w-[700px] rounded-full bg-glow blur-3xl opacity-70" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="reveal text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            Begin
          </p>
          <h2 className="reveal mt-6 text-display text-[40px] sm:text-[56px] md:text-[72px] leading-[1.02]">
            Start building a life<br />
            <span className="italic font-light">that actually fits you.</span>
          </h2>
          <p className="reveal mt-8 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Free to begin. Five minutes a day. Available on iOS and Android.
          </p>
          <div className="reveal mt-10 flex justify-center">
            <DownloadButton size="lg" />
          </div>
          <p className="reveal mt-5 text-xs text-muted-foreground">
            One unified app. Works on iPhone and Android.
          </p>
        </div>
      </div>
    </section>
  );
};
