import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { WhatItIs } from "@/components/landing/WhatItIs";
import { Pillars } from "@/components/landing/Pillars";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Community } from "@/components/landing/Community";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { useReveal } from "@/hooks/use-reveal";

const Index = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav />
      <main>
        <Hero />
        <WhatItIs />
        <Pillars />
        <HowItWorks />
        <Community />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
