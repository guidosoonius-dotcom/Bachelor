"use client";

import { useState } from "react";
import { PartyPopper } from "lucide-react";
import { useGuestName } from "@/lib/guest";
import { EVENT_TITLE } from "@/lib/content";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm card p-6 text-center">
        <span className="gradient-bg inline-flex rounded-full p-3 mb-4">
          <PartyPopper size={28} className="text-white" />
        </span>
        <h1 className="text-xl font-semibold mb-1">{EVENT_TITLE}</h1>
        <p className="text-muted text-sm mb-5">
          Wat is je naam? Zo weten we wie de quiz wint en wie de beste opdrachten
          bedenkt.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Jouw naam"
            className="rounded-xl bg-surface-elevated border border-border px-4 py-3 text-center outline-none focus:border-accent-pink"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="gradient-bg rounded-xl py-3 font-medium disabled:opacity-40"
          >
            Doe mee!
          </button>
        </form>
      </div>
    </div>
  );
}
