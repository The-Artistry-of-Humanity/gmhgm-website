import { PageShell } from "@/components/PageShell";

interface Item {
  date: string;
  outlet: string;
  title: string;
  body: string;
  cta: string;
  url: string;
}

const items: Item[] = [
  {
    date: "Friday, 17 October 2025",
    outlet: "TechAdvice.Life",
    title: "How GMHGM is helping Men live with greater Fulfilment",
    body:
      "TechAdvice Life recently spotlighted Good Men Helping Good Men (GMHGM), diving into how the movement is reshaping modern masculinity and empowering men to live with purpose. The feature explores the launch of the GMHGM app and its mission to help men strengthen emotional resilience, deepen connection, and find balance through the 5 Pillars of Fulfilment.",
    cta: "Read full story",
    url: "https://techadvice.life/2025/10/17/good-men-helping-good-men-the-movement-redefining-masculinity-launches-a-new-app/",
  },
  {
    date: "Thursday, 09 October 2025",
    outlet: "DigiTrendz",
    title: "The Movement Redefining Masculinity Just Launched an App",
    body:
      "DigiTrendz recently featured Good Men Helping Good Men (GMHGM), exploring the mission behind our movement and the launch of our new app. The article highlights how the platform is helping men build emotional resilience, foster connection and live with greater fulfilment through our 5 Pillars framework.",
    cta: "Read full story",
    url: "https://digitrendz.blog/the-movement-redefining-masculinity-just-launched-an-app/",
  },
  {
    date: "Monday, 06 October 2025",
    outlet: "2SM Radio",
    title: "Ian Williams on Tim Webster for Breakfast",
    body:
      "Ian joined Tim Webster on 2SM Sydney Radio to talk about the launch of the Good Men Helping Good Men (GMHGM) app and its mission to support men who are struggling. The conversation highlighted the app's community-driven approach — helping men connect, support one another, and take proactive steps toward fulfilment.",
    cta: "Re-listen",
    url: "https://omny.fm/shows/tim-webster-for-breakfast/ian-williams-good-men-helping-good-men-app-07-10-25",
  },
  {
    date: "Monday, 06 October 2025",
    outlet: "iTWire",
    title: "Redefining Masculinity — The GMHGM App Launches",
    body:
      "In a feature interview with iTWire, founder Ian Williams shares the story behind Good Men Helping Good Men (GMHGM) and the launch of its new app — a free tool built to help men grow with purpose and \"catch them before they fall.\" Rooted in Ian's personal journey and the 5 Pillars of Fulfilment — Health & Fitness, Internal Work, Love & Relationships, Social Connection, and Work & Life Flow — the app aims to redefine masculinity through connection, honesty, and sustainable growth.",
    cta: "Read full story",
    url: "https://itwire.com/your-it/video-interview-good-men-helping-good-men-the-movement-redefining-masculinity-launches-a-new-app.html",
  },
  {
    date: "Thursday, 02 October 2025",
    outlet: "AusLeisure",
    title: "GMHGM Challenges \"Tough Guy\" Myth with New Wellness App",
    body:
      "AusLeisure profiles Good Men Helping Good Men (GMHGM) and its new app, positioning it as a challenge to the \"tough guy\" stereotype that prevents men from seeking support. The piece highlights how the app provides a private, structured framework for emotional growth and peer connection, encouraging men to move beyond silence and embrace vulnerability.",
    cta: "Read full story",
    url: "https://www.ausleisure.com.au/news/gmhgm-challenges-tough-guy-myth-and-launches-app-to-support-mens-mental-wellness",
  },
  {
    date: "Thursday, 02 October 2025",
    outlet: "PR Wire",
    title: "About the GMHGM App Launch",
    body:
      "Markson Sparks announces the launch of the Good Men Helping Good Men, highlighting its importance in a fast moving, digital world.",
    cta: "Read full story",
    url: "https://prwire.com.au/pr/124435/good-men-helping-good-men-the-movement-redefining-masculinity-launches-a-new-app",
  },
];

const Press = () => (
  <PageShell
    eyebrow="Press, Media & News"
    title="In the press."
    intro="Stay up to date with our latest announcements, product updates and stories from the GMHGM community. For media enquiries, interviews, or press materials, please contact us at ian@gmhgm.com. Together, let's amplify the movement toward fulfilment and wellbeing."
    updated="Last updated: 17 October 2025"
    documentTitle="Press & Media — GMHGM"
    documentDescription="Latest press coverage and media features about Good Men Helping Good Men. For media enquiries, contact ian@gmhgm.com."
  >
    <div className="space-y-10">
      {items.map((item, i) => (
        <article
          key={i}
          className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 hover:border-primary/40 hover:bg-white/[0.04] transition-all duration-300"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {item.date} · {item.outlet}
          </p>
          <h3 className="mt-3 text-xl font-medium text-foreground leading-snug">
            {item.title}
          </h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">{item.body}</p>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm text-primary-glow hover:text-primary inline-flex items-center gap-1.5 group/link"
          >
            {item.cta} <span className="transition-transform duration-300 group-hover/link:translate-x-0.5">→</span>
          </a>
        </article>
      ))}
    </div>
  </PageShell>
);

export default Press;
