import { NextResponse } from "next/server";

// These never leave the server — no NEXT_PUBLIC_ prefix
const REVEALED: Record<string, { title: string; description: string; bullets?: string[] }> = {
  venture_0: {
    title: "SOCIALFINDER.AI",
    description: "FIND ANYONE ONLINE WITH A SINGLE PHOTO",
  },
  venture_1: {
    title: "TRANSPOSED.AI",
    description: "AI VOICE CLONING TECHNOLOGY PLATFORM. FIRST TO MARKET.",
    bullets: [
      "CO-FOUNDER & CMO",
      "CELEBRITY FOLLOWS EXCEEDING 150M+ COMBINED FOLLOWERS",
      "FIRST TO MARKET AI VOICE CLONING",
      "SUCCESSFULLY EXITED FOR $52M",
    ],
  },
  venture_2: {
    title: "PUDGY PENGUINS WORLD",
    description: "CONTENT MARKETING CAMPAIGN FOR PUDGY PENGUINS",
    bullets: [
      "14M+ VIEWS IN 2 WEEKS",
      "2 WEEKS ACTIVE CAMPAIGN",
    ],
  },
  venture_3: {
    title: "RAPSTORIES.AI",
    description: "CLOSED DOWN SAAS",
    bullets: [
      "ACCOUNT LIVE FOR ONLY ONE WEEK",
      "11K+ FOLLOWERS GAINED INSTANTLY",
      "15M+ VIEWS ACROSS PLATFORMS",
      "$8.4K REVENUE BEFORE SHUTDOWN",
    ],
  },
  venture_4: {
    title: "STEALTH SAAS CONTRACT",
    description: "ONGOING CONTRACT STARTED JANUARY",
  },
  venture_5: {
    title: "PERSONAL ACCOUNTS",
    description: "AFFILIATE & TIKTOK SHOP",
    bullets: [
      "MULTIPLE ACCOUNTS ACROSS NICHES",
      "RAN UP THE BAG THEN MOVED ON",
      "$500K+ TOTAL REVENUE IN 6 MONTHS",
    ],
  },
};

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== process.env.PORTFOLIO_PASSWORD) {
    return NextResponse.json({ error: "wrong" }, { status: 401 });
  }

  return NextResponse.json(REVEALED);
}
