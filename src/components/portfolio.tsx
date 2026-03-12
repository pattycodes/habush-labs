"use client";

import { useState } from "react";

type RevealedData = Record<string, { title: string; description: string; bullets?: string[] }>;

// Real names/descriptions never ship to the browser — fetched from server after auth
const ventures = [
  {
    id: "venture_0",
    blurName: true,
    tag: "ACTIVE",
    tagColor: "bg-emerald-800",
    stats: [
      { value: "$300K+", label: "REVENUE" },
      { value: "10K+", label: "FOLLOWERS" },
      { value: "$35K+", label: "MRR" },
    ],
  },
  {
    id: "venture_1",
    blurName: true,
    tag: "EXITED",
    tagColor: "bg-yellow",
    stats: [
      { value: "30M+", label: "VIEWS" },
      { value: "$52M", label: "EXIT" },
      { value: "4 MO", label: "CAMPAIGN" },
    ],
  },
  {
    id: "venture_2",
    blurName: false,
    tag: "ACTIVE",
    tagColor: "bg-emerald-800",
    title: "STEALTH APP",
    description: "CAN'T SAY YET",
    stats: [
      { value: "15M+", label: "VIEWS" },
      { value: "$23K+", label: "MRR" },
      { value: "4 MO", label: "LAUNCHED" },
    ],
  },
  {
    id: "venture_3",
    blurName: true,
    tag: "CLOSED",
    tagColor: "bg-muted",
    stats: [
      { value: "11K+", label: "FOLLOWERS" },
      { value: "15M+", label: "VIEWS" },
      { value: "$8.4K", label: "REVENUE" },
    ],
  },
  {
    id: "venture_4",
    blurName: false,
    tag: "ACTIVE",
    tagColor: "bg-emerald-800",
    title: "STEALTH SAAS CONTRACT",
    description: "ONGOING CONTRACT STARTED JANUARY",
    stats: [
      { value: "16M+", label: "VIEWS" },
      { value: "$9K+", label: "MRR" },
      { value: "4K+", label: "FOLLOWERS" },
    ],
  },
  {
    id: "venture_5",
    blurName: false,
    tag: "CLOSED",
    tagColor: "bg-muted",
    title: "PERSONAL ACCOUNTS",
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
  const [revealed, setRevealed] = useState<RevealedData | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const unlocked = revealed !== null;

  const handleUnlock = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: input }),
      });
      if (res.ok) {
        const data: RevealedData = await res.json();
        setRevealed(data);
        setError(false);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="portfolio" className="bg-background-dark px-8 md:px-16 py-20 md:py-32">
      <p className="text-xs font-mono tracking-wider uppercase text-muted mb-4">
        &gt; VENTURES:
      </p>
      <p className="text-sm font-mono text-muted mb-12 max-w-xl uppercase">
        CONTENT MARKETING, VIRAL PROJECTS, AND SOCIAL MEDIA VENTURES.
      </p>

      {/* Password unlock banner */}
      {!unlocked && (
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[10px] font-mono uppercase text-muted tracking-wider">
            &gt; ENTER PASSWORD TO REVEAL NAMES:
          </span>
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
            placeholder="••••••••"
            className="bg-transparent border border-border text-foreground font-mono text-xs px-3 py-1.5 outline-none focus:border-yellow/50 transition-colors placeholder:text-border w-32"
          />
          <button
            onClick={handleUnlock}
            disabled={loading}
            className="text-[10px] font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "UNLOCK"}
          </button>
          {error && (
            <span className="text-[10px] font-mono uppercase text-red tracking-wider">
              WRONG PASSWORD
            </span>
          )}
        </div>
      )}
      {unlocked && (
        <div className="flex items-center gap-2 mb-8">
          <span className="text-[10px] font-mono uppercase text-muted tracking-wider">
            &gt; ACCESS GRANTED
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600" />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-1">
        {ventures.map((venture) => {
          const isBlurred = venture.blurName;
          const revealedInfo = revealed?.[venture.id];
          const isRevealed = !isBlurred || revealedInfo != null;

          const displayTitle = isBlurred
            ? (revealedInfo?.title ?? "███████████")
            : (venture as { title?: string }).title;
          const displayDescription = isBlurred
            ? revealedInfo?.description
            : (venture as { description?: string }).description;
          const displayBullets = isBlurred
            ? revealedInfo?.bullets
            : (venture as { bullets?: string[] }).bullets;

          return (
            <div
              key={venture.id}
              className="bg-black border border-border p-6 md:p-8 group hover:border-yellow/30 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <h3
                  className={`text-lg md:text-xl font-mono font-bold uppercase text-foreground transition-all duration-300 ${!isRevealed ? "blur-sm select-none" : ""}`}
                >
                  {displayTitle}
                </h3>
                <span
                  className={`${venture.tagColor} text-black text-[9px] font-mono font-bold tracking-wider uppercase px-2.5 py-1`}
                >
                  {venture.tag}
                </span>
              </div>

              {/* Description */}
              {isRevealed && displayDescription && (
                <p className="text-xs font-mono text-muted mb-5 uppercase">
                  {displayDescription}
                </p>
              )}

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
              {isRevealed && displayBullets && (
                <div className="border-t border-border pt-4 space-y-1.5">
                  {displayBullets.map((bullet) => (
                    <p key={bullet} className="text-[10px] font-mono text-muted uppercase">
                      {bullet}
                    </p>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* NDA note */}
      <p className="text-xs font-mono text-muted mt-8 text-center uppercase">
        AND MANY MORE UNDER STRICT NDA
      </p>
    </section>
  );
}
