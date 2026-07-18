"use client";

import { PartyPopper, UserRound } from "lucide-react";
import { useGuestName, setStoredGuestName } from "@/lib/guest";

export default function TopBar() {
  const { guestName, setGuestName, ready } = useGuestName();

  function handleEditName() {
    const next = window.prompt("Wat is je naam?", guestName ?? "");
    if (next && next.trim()) {
      setGuestName(next);
      setStoredGuestName(next);
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="gradient-bg rounded-full p-1.5">
            <PartyPopper size={18} className="text-white" />
          </span>
          <span className="font-semibold gradient-text">Vrijgezellenfeest</span>
        </div>
        <button
          onClick={handleEditName}
          className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-muted hover:text-foreground transition-colors"
        >
          <UserRound size={15} />
          {ready && guestName ? guestName : "Naam"}
        </button>
      </div>
    </header>
  );
}
