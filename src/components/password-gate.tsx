"use client";

import { useState, useEffect, useRef } from "react";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [fade, setFade] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("hb_auth") === "1") {
      setUnlocked(true);
    } else {
      inputRef.current?.focus();
    }
  }, []);

  const submit = async () => {
    if (!input || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: input }),
      });
      if (res.ok) {
        sessionStorage.setItem("hb_auth", "1");
        setFade(true);
        setTimeout(() => setUnlocked(true), 600);
      } else {
        setShake(true);
        setInput("");
        setTimeout(() => setShake(false), 500);
      }
    } catch {
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Prompt */}
        <div className="text-muted text-xs tracking-[0.3em] uppercase font-mono">
          &gt; ENTER PASSWORD
        </div>

        {/* Input */}
        <div
          className={`border border-border bg-transparent px-6 py-3 flex items-center gap-3 transition-transform ${shake ? "animate-shake" : ""}`}
        >
          <span className="text-yellow text-sm font-mono">_</span>
          <input
            ref={inputRef}
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="bg-transparent outline-none text-foreground font-mono text-sm tracking-widest w-48 placeholder:text-border"
            placeholder="········"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        {/* Subtle brand */}
        <div className="text-border text-[10px] tracking-[0.5em] uppercase font-mono mt-8">
          HABUSH LABS
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
