import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== process.env.SITE_PASSWORD) {
    return NextResponse.json({ error: "wrong" }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
