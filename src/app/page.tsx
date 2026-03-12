import Nav from "@/components/nav";
import Hero from "@/components/hero";
import WhatWeDo from "@/components/what-we-do";
import Stats from "@/components/stats";
import Portfolio from "@/components/portfolio";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <WhatWeDo />
      <Stats />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
}
