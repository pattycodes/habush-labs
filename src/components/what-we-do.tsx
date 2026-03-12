import BottleMosaic from "./bottle-mosaic";

const services = [
  {
    title: "DEVELOPMENT",
    description:
      "FULL STACK APPS, SAAS PLATFORMS, MOBILE. WE BUILD IT FROM SCRATCH OR TAKE OVER YOUR CODEBASE.",
    color: "text-yellow",
  },
  {
    title: "MARKETING",
    description:
      "VIRAL CONTENT, SOCIAL MEDIA, PAID ADS, INFLUENCER CAMPAIGNS. WE GET EYEBALLS AND CONVERT THEM.",
    color: "text-red",
  },
  {
    title: "PRODUCT STRATEGY",
    description:
      "MARKET RESEARCH, ROADMAPPING, UI/UX, LAUNCH STRATEGY. WE FIGURE OUT WHAT TO BUILD AND WHY.",
    color: "text-yellow",
  },
];

export default function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="relative bg-background-dark px-8 md:px-16 py-20 md:py-32 overflow-hidden"
    >
      {/* Spinning bottle mosaic on right side */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none hidden md:block">
        <BottleMosaic />
      </div>

      <div className="relative z-10 max-w-5xl">
        <p className="text-xs font-mono tracking-wider uppercase text-muted mb-8">
          &gt; WHAT WE DO
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-mono font-bold uppercase leading-[1.15] tracking-tight mb-16">
          WE SERVE AS THE{" "}
          <span className="text-yellow">DEVELOPMENT</span> AND{" "}
          <span className="text-red">MARKETING POWERHOUSE</span> FOR
          YOUR BRAND, DEDICATED TO BUILDING{" "}
          <span className="text-yellow">EXCEPTIONAL PRODUCTS</span> AND
          SCALING{" "}
          <span className="text-red">DIGITAL PRESENCE</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-1">
          {services.map((service) => (
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
    </section>
  );
}
