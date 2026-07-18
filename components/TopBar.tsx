"use client";

import { Sparkles, UserRound } from "lucide-react";
import { useGuestName } from "@/lib/guest";

export default function TopBar() {
  const { guestName, setGuestName, ready } = useGuestName();

  function handleEditName() {
    const next = window.prompt("Wat is je naam?", guestName ?? "");
    if (next && next.trim()) {
      setGuestName(next);
    }
  }

  return (
    <header className="sticky top-0 z-20 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="gradient-bg rounded-xl p-1.5">
            <Sparkles size={18} className="text-white" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">Vrijgezellenfeest</span>
        </div>
        <button
          onClick={handleEditName}
          className="flex items-center gap-1.5 rounded-full bg-surface-elevated px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
        >
          <UserRound size={15} className="text-muted" />
          {ready && guestName ? guestName : "Naam"}
        </button>
      </div>
    </header>
  );
}
