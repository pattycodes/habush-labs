const ventures = [
  {
    title: "SOCIALFINDER.AI",
    tag: "ACTIVE",
    tagColor: "bg-emerald-800",
    url: "#",
    description: "FIND ANYONE ONLINE WITH A SINGLE PHOTO",
    stats: [
      { value: "$300K+", label: "REVENUE" },
      { value: "10K+", label: "FOLLOWERS" },
      { value: "$35K+", label: "MRR" },
    ],
    platforms: ["TWITTER", "INSTAGRAM", "TIKTOK"],
  },
  {
    title: "TRANSPOSED.AI",
    tag: "EXITED",
    tagColor: "bg-yellow",
    url: "#",
    description: "AI VOICE CLONING TECHNOLOGY PLATFORM. FIRST TO MARKET.",
    stats: [
      { value: "30M+", label: "VIEWS" },
      { value: "$52M", label: "EXIT" },
      { value: "4 MO", label: "CAMPAIGN" },
    ],
    bullets: [
      "CO-FOUNDER & CMO",
      "CELEBRITY FOLLOWS EXCEEDING 150M+ COMBINED FOLLOWERS",
      "FIRST TO MARKET AI VOICE CLONING",
      "SUCCESSFULLY EXITED FOR $52M",
    ],
  },
  {
    title: "STEALTH APP",
    tag: "ACTIVE",
    tagColor: "bg-emerald-800",
    description: "CAN'T SAY YET",
    stats: [
      { value: "15M+", label: "VIEWS" },
      { value: "$23K+", label: "MRR" },
      { value: "4 MO", label: "LAUNCHED" },
    ],
  },
  {
    title: "RAPSTORIES.AI",
    tag: "CLOSED",
    tagColor: "bg-muted",
    url: "#",
    description: "CLOSED DOWN SAAS",
    stats: [
      { value: "11K+", label: "FOLLOWERS" },
      { value: "15M+", label: "VIEWS" },
      { value: "$8.4K", label: "REVENUE" },
    ],
    bullets: [
      "ACCOUNT LIVE FOR ONLY ONE WEEK",
      "11K+ FOLLOWERS GAINED INSTANTLY",
      "15M+ VIEWS ACROSS PLATFORMS",
      "$8.4K REVENUE BEFORE SHUTDOWN",
    ],
  },
  {
    title: "STEALTH SAAS CONTRACT",
    tag: "ACTIVE",
    tagColor: "bg-emerald-800",
    description: "ONGOING CONTRACT STARTED JANUARY",
    stats: [
      { value: "16M+", label: "VIEWS" },
      { value: "$9K+", label: "MRR" },
      { value: "4K+", label: "FOLLOWERS" },
    ],
  },
  {
    title: "PERSONAL ACCOUNTS",
    tag: "CLOSED",
    tagColor: "bg-muted",
    description: "AFFILIATE & TIKTOK SHOP",
    stats: [
      { value: "$500K+", label: "REVENUE" },
      { value: "20M+", label: "VIEWS" },
      { value: "500+", label: "VIDEOS" },
    ],
    bullets: [
      "MULTIPLE ACCOUNTS ACROSS NICHES",
      "RAN UP THE BAG THEN MOVED ON",
      "$500K+ TOTAL REVENUE IN 6 MONTHS",
    ],
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-background-dark px-8 md:px-16 py-20 md:py-32">
      <p className="text-xs font-mono tracking-wider uppercase text-muted mb-4">
        &gt; VENTURES:
      </p>
      <p className="text-sm font-mono text-muted mb-12 max-w-xl uppercase">
        CONTENT MARKETING, VIRAL PROJECTS, AND SOCIAL MEDIA VENTURES.
      </p>

      <div className="grid md:grid-cols-2 gap-1">
        {ventures.map((venture) => (
          <div
            key={venture.title}
            className="bg-black border border-border p-6 md:p-8 group hover:border-yellow/30 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg md:text-xl font-mono font-bold uppercase text-foreground">
                  {venture.title}
                </h3>
                {venture.url && (
                  <a href={venture.url} className="text-muted hover:text-yellow transition-colors">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </a>
                )}
              </div>
              <span
                className={`${venture.tagColor} text-black text-[9px] font-mono font-bold tracking-wider uppercase px-2.5 py-1`}
              >
                {venture.tag}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs font-mono text-muted mb-5 uppercase">
              {venture.description}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              {venture.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl md:text-2xl font-mono font-bold text-yellow">
                    {stat.value}
                  </p>
                  <p className="text-[9px] font-mono tracking-wider uppercase text-muted mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Bullets */}
            {venture.bullets && (
              <div className="border-t border-border pt-4 space-y-1.5">
                {venture.bullets.map((bullet) => (
                  <p key={bullet} className="text-[10px] font-mono text-muted uppercase">
                    {bullet}
                  </p>
                ))}
              </div>
            )}

            {/* Platforms */}
            {venture.platforms && (
              <div className="border-t border-border pt-4 flex gap-4">
                {venture.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="text-[9px] font-mono tracking-wider uppercase text-muted"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* NDA note */}
      <p className="text-xs font-mono text-muted mt-8 text-center uppercase">
        AND MANY MORE UNDER STRICT NDA
      </p>
    </section>
  );
}
