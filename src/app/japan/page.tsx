import type { Metadata } from "next";
import JapanNav from "@/components/japan/nav";
import BottleMosaic from "@/components/bottle-mosaic";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "HABUSH LABS — Japan App Localization",
  description:
    "Full Japan localization for US apps. UX redesign, native copy, funnel localization. Not translation. Domestication.",
  openGraph: {
    title: "HABUSH LABS — Japan App Localization",
    description:
      "We domesticate US apps for the Japanese market. Not translation. Domestication.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HABUSH LABS — Japan App Localization",
    description:
      "We domesticate US apps for the Japanese market. Not translation. Domestication.",
  },
};

/* ─── HERO ─── */
function JapanHero() {
  return (
    <section className="relative mt-[60px] overflow-hidden">
      <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center p-8 md:p-16 pixel-gradient">
        <div className="absolute inset-0 dot-matrix pointer-events-none" />
        <div className="relative z-10 text-center">
          <p className="text-xs font-mono tracking-wider uppercase text-muted mb-6 animate-fade-up">
            &gt; JAPAN LOCALIZATION
          </p>
          <h1 className="animate-fade-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-bold uppercase leading-[0.95] tracking-tight text-foreground">
            WE DON&apos;T
            <br />
            <span className="text-foreground/60">TRANSLATE APPS</span>
            <br />
            WE <span className="text-yellow">DOMESTICATE</span>
            <br />
            THEM FOR JAPAN
          </h1>
          <p className="animate-fade-up-delay-1 mt-6 text-sm md:text-base font-mono text-muted uppercase tracking-wider max-w-xl mx-auto">
            YOUR UX, YOUR COPY, YOUR FUNNEL. EVERYTHING REBUILT BY PEOPLE WHO
            ACTUALLY LIVE HERE.
          </p>
          <div className="animate-fade-up-delay-2 mt-8">
            <a
              href="https://cal.com/habush/localization-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-mono font-bold tracking-wider uppercase bg-yellow text-black px-6 py-3 hover:bg-yellow/80 transition-colors"
            >
              BOOK A CALL
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── JAPAN IS DIFFERENT ─── */
function JapanIsDifferent() {
  return (
    <section className="relative bg-background-dark px-8 md:px-16 py-20 md:py-32 border-b border-border overflow-hidden">
      {/* Bottle mosaic — right side on desktop */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none hidden md:block">
        <BottleMosaic />
      </div>

      <div className="relative z-10 max-w-3xl">
        <p className="text-xs font-mono tracking-wider uppercase text-muted mb-8">
          &gt; JAPAN IS DIFFERENT
        </p>
        <div className="space-y-6 text-lg md:text-xl font-mono uppercase leading-relaxed text-foreground/80">
          <p>
            UBER LAUNCHED IN JAPAN AND GOT{" "}
            <span className="text-red">CRUSHED</span>. TOO AGGRESSIVE.
            JAPANESE USERS TRUSTED THEIR TAXI SYSTEM.
          </p>
          <p>
            WHATSAPP NEVER STOOD A CHANCE.{" "}
            <span className="text-yellow">LINE</span> HAD ALREADY WON WITH
            STICKERS, PAYMENTS, AND MANGA.
          </p>
          <p>
            EVEN AMAZON TOOK{" "}
            <span className="text-yellow">YEARS</span> TO CRACK IT.
            THEY HAD TO REBUILD EVERYTHING. LOGISTICS, UX, PRODUCT MIX.
          </p>
          <p>
            THE COMPANIES THAT WIN IN JAPAN DON&apos;T TRANSLATE.
          </p>
          <p>
            THEY{" "}
            <span className="text-red">REBUILD FROM THE INSIDE OUT</span>.
          </p>
        </div>
      </div>

      {/* Bottle mosaic — full-width below content on mobile */}
      <div className="relative w-full h-[50vh] mt-12 md:hidden">
        <BottleMosaic />
      </div>
    </section>
  );
}

/* ─── THE PROBLEM ─── */
const problems = [
  {
    title: "TRANSLATED UX",
    description:
      "JAPANESE USERS NAVIGATE APPS DIFFERENTLY. DIRECT TRANSLATION OF YOUR UI CREATES FRICTION AND CONFUSION.",
    color: "text-red",
  },
  {
    title: "WRONG TONE",
    description:
      "KEIGO, CASUAL, BUSINESS. JAPANESE HAS LAYERS OF POLITENESS YOUR AI DOESN'T UNDERSTAND.",
    color: "text-yellow",
  },
  {
    title: "BROKEN FUNNELS",
    description:
      "YOUR ONBOARDING, LANDING PAGES, ASO, AND ADS WERE BUILT FOR AMERICAN PSYCHOLOGY. THEY DON'T CONVERT IN JAPAN.",
    color: "text-red",
  },
  {
    title: "NO CULTURAL FIT",
    description:
      "COLORS, SPACING, INFORMATION DENSITY, TRUST SIGNALS. EVERYTHING JAPANESE USERS EXPECT IS DIFFERENT.",
    color: "text-yellow",
  },
];

function TheProblem() {
  return (
    <section
      id="the-problem"
      className="bg-black px-8 md:px-16 py-20 md:py-32 border-b border-border"
    >
      <div>
        <p className="text-xs font-mono tracking-wider uppercase text-muted mb-8">
          &gt; THE PROBLEM
        </p>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold uppercase leading-[1.15] tracking-tight">
            YOUR APP WON&apos;T CRACK JAPAN WITH JUST AN{" "}
            <span className="text-red">AI TRANSLATION</span>
          </h2>
          <div className="grid grid-cols-2 gap-1">
            {problems.map((p) => (
              <div
                key={p.title}
                className="bg-black border border-border p-6 hover:border-yellow/30 transition-colors"
              >
                <h3
                  className={`text-lg font-mono font-bold uppercase ${p.color} mb-4`}
                >
                  {p.title}
                </h3>
                <p className="text-xs font-mono text-muted leading-relaxed uppercase">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ─── */
const services = [
  {
    title: "UX REDESIGN",
    description:
      "WE REDESIGN YOUR UX FOR JAPANESE EXPECTATIONS. INFORMATION DENSITY, NAVIGATION PATTERNS, VISUAL HIERARCHY. ALL REBUILT.",
    color: "text-yellow",
  },
  {
    title: "NATIVE COPY",
    description:
      "EVERY STRING REWRITTEN BY JAPANESE COPYWRITERS. NOT TRANSLATED. WRITTEN NATIVE FROM SCRATCH FOR YOUR CONTEXT.",
    color: "text-red",
  },
  {
    title: "FULL FUNNEL",
    description:
      "LANDING PAGES, APP STORE OPTIMIZATION, AD CREATIVE, SOCIAL MEDIA. YOUR ENTIRE ACQUISITION FUNNEL, LOCALIZED.",
    color: "text-yellow",
  },
];

function Services() {
  return (
    <section
      id="services"
      className="bg-background-dark px-8 md:px-16 py-20 md:py-32"
    >
      <div>
        <p className="text-xs font-mono tracking-wider uppercase text-muted mb-8">
          &gt; SERVICES
        </p>
        <div className="grid md:grid-cols-2 gap-1 md:gap-16 items-center">
          <div className="space-y-1">
            {/* First card full width */}
            <div className="bg-black border border-border p-6 md:p-8 hover:border-yellow/30 transition-colors">
              <h3 className="text-lg md:text-xl font-mono font-bold uppercase text-yellow mb-4">
                {services[0].title}
              </h3>
              <p className="text-xs font-mono text-muted leading-relaxed uppercase">
                {services[0].description}
              </p>
            </div>
            {/* Two cards side by side */}
            <div className="grid grid-cols-2 gap-1">
              {services.slice(1).map((service) => (
                <div
                  key={service.title}
                  className="bg-black border border-border p-6 md:p-8 hover:border-yellow/30 transition-colors"
                >
                  <h3
                    className={`text-lg md:text-xl font-mono font-bold uppercase ${service.color} mb-4`}
                  >
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono text-muted leading-relaxed uppercase">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-mono font-bold uppercase leading-[1.15] tracking-tight md:text-right">
              WHAT YOU <span className="text-yellow">ACTUALLY GET</span>
              <br />
              WHEN YOU <span className="text-red">WORK WITH US</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── WHY US ─── */
const bullets = [
  "WE LIVE IN JAPAN. WE USE JAPANESE APPS DAILY. WE KNOW WHAT WORKS HERE.",
  "OUR TEAM IS CRACKED JAPANESE DESIGNERS, COPYWRITERS, AND MARKETERS WHO WANT TO WORK WITH US FOUNDERS.",
  "WE'VE STUDIED HOW JAPANESE USERS ONBOARD, PAY, CHURN, AND SHARE. FIRSTHAND.",
  "WE'VE ALREADY BUILT AND SCALED APPS IN THIS MARKET. THIS ISN'T THEORY.",
];

function WhyUs() {
  return (
    <section className="bg-black px-8 md:px-16 py-20 md:py-32 border-y border-border">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-mono tracking-wider uppercase text-muted mb-8">
          &gt; WHY US
        </p>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <h2 className="text-2xl md:text-4xl font-mono font-bold uppercase leading-[1.15] tracking-tight">
            WE&apos;RE{" "}
            <span className="text-yellow">ON THE GROUND</span> IN JAPAN.
            <br />
            NOT REMOTE.
            <br />
            NOT OUTSOURCED.
          </h2>
          <div className="space-y-6">
            {bullets.map((bullet) => (
              <p
                key={bullet}
                className="text-sm font-mono uppercase text-foreground leading-relaxed"
              >
                <span className="text-yellow">&gt;</span> {bullet}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── STATS ─── */
const stats = [
  { value: "$36B", label: "JAPAN APP MARKET" },
  { value: "#2", label: "GLOBAL APP REVENUE" },
  { value: "93M+", label: "SMARTPHONE USERS" },
  { value: "85%", label: "iOS MARKET SHARE" },
];

function JapanStats() {
  return (
    <section className="bg-black px-8 md:px-16 py-16 md:py-24 border-b border-border">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-4xl md:text-5xl font-mono font-bold text-yellow">
              {stat.value}
            </p>
            <p className="text-[10px] font-mono tracking-wider uppercase text-muted mt-3">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── PROCESS ─── */
const steps = [
  {
    number: "01",
    title: "AUDIT",
    description:
      "WE ANALYZE YOUR APP, FUNNEL, AND MARKET POSITIONING. IDENTIFY EVERY SURFACE THAT NEEDS DOMESTICATION.",
    color: "text-yellow",
  },
  {
    number: "02",
    title: "DOMESTICATE",
    description:
      "OUR JAPANESE TEAM REDESIGNS UX, REWRITES COPY, REBUILDS YOUR FUNNEL. EVERYTHING NATIVE.",
    color: "text-red",
  },
  {
    number: "03",
    title: "LAUNCH",
    description:
      "WE DELIVER A JAPANESE PRODUCT READY FOR THE APP STORE, WITH LOCALIZED ASO AND LAUNCH STRATEGY.",
    color: "text-yellow",
  },
];

function Process() {
  return (
    <section className="bg-background-dark px-8 md:px-16 py-20 md:py-32">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-mono tracking-wider uppercase text-muted mb-8">
          &gt; THE PROCESS
        </p>
        <h2 className="text-2xl md:text-4xl font-mono font-bold uppercase leading-[1.15] tracking-tight mb-16">
          YOU HAND US THE APP. WE HAND BACK A{" "}
          <span className="text-yellow">JAPANESE PRODUCT</span>.
        </h2>
        <div className="grid md:grid-cols-3 gap-1">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-black border border-border p-6 md:p-8 hover:border-yellow/30 transition-colors"
            >
              <p
                className={`text-4xl font-mono font-bold ${step.color} mb-2`}
              >
                {step.number}
              </p>
              <h3 className="text-lg md:text-xl font-mono font-bold uppercase text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-xs font-mono text-muted leading-relaxed uppercase">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function JapanCTA() {
  return (
    <section
      id="contact"
      className="bg-background-dark px-8 md:px-16 py-20 md:py-32 relative overflow-hidden"
    >
      {/* Dot matrix decoration — right side (flipped from main page) */}
      <div className="absolute top-0 right-0 w-1/4 h-full dot-matrix pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="text-xs font-mono tracking-wider uppercase text-muted mb-8">
          &gt; READY?
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-mono font-bold uppercase leading-tight">
          LET&apos;S <span className="text-yellow">DOMESTICATE</span>
          <br />
          YOUR APP FOR <span className="text-red">JAPAN</span>
        </h2>
        <p className="text-sm font-mono text-muted uppercase tracking-wider mt-6 max-w-lg mx-auto">
          LIMITED SPOTS. SERIOUS APPS ONLY.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://cal.com/habush/localization-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs font-mono font-bold tracking-wider uppercase bg-yellow text-black px-8 py-4 hover:bg-yellow/80 transition-colors"
          >
            BOOK A CALL
          </a>
          <a
            href="https://x.com/pattybuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs font-mono font-bold tracking-wider uppercase border border-border text-foreground px-8 py-4 hover:border-yellow hover:text-yellow transition-colors"
          >
            DM ON X
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE ─── */
export default function JapanPage() {
  return (
    <main className="min-h-screen">
      <JapanNav />
      <JapanHero />
      <JapanIsDifferent />
      <TheProblem />
      <Services />
      <WhyUs />
      <JapanStats />
      <Process />
      <JapanCTA />
      <Footer />
    </main>
  );
}
