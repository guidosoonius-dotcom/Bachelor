"use client";

import { useState } from "react";
import { PartyPopper } from "lucide-react";
import { useGuestName } from "@/lib/guest";
import { EVENT_TITLE } from "@/lib/content";

function GradientSquiggle() {
  return (
    <svg viewBox="0 0 300 32" className="mx-auto h-6 w-full max-w-[220px]" fill="none">
      <defs>
        <linearGradient id="squiggle" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff3f8e" />
          <stop offset="0.5" stopColor="#ff5b4d" />
          <stop offset="1" stopColor="#8b3ffa" />
        </linearGradient>
      </defs>
      <path
        d="M2 16 C 40 -2, 80 34, 120 16 S 200 -2, 240 16 S 280 34, 298 16"
        stroke="url(#squiggle)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function NameGate() {
  const { guestName, setGuestName, ready } = useGuestName();
  const [input, setInput] = useState("");

  if (!ready || guestName) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) {
      setGuestName(input);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <span className="gradient-bg inline-flex rounded-2xl p-3">
        <PartyPopper size={26} className="text-white" />
      </span>

      <div className="flex flex-col items-center gap-1">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight">Doe je mee?</h1>
        <GradientSquiggle />
      </div>

      <p className="-mt-2 max-w-xs text-sm text-muted">
        {EVENT_TITLE}. Vul je naam in zodat we weten wie er stemt en de quiz wint.
      </p>

      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Jouw naam"
          className="pill-input w-full px-5 py-4 text-center text-base outline-none focus:ring-2 focus:ring-accent-pink/50"
        />
        <div className={`glow-ring w-full ${!input.trim() ? "opacity-40" : ""}`}>
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-full rounded-full bg-background py-3.5 font-bold text-white"
          >
            Doe mee!
          </button>
        </div>
      </form>
    </div>
  );
}
