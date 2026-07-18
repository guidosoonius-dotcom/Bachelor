"use client";

import { usePathname } from "next/navigation";
import { PartyPopper, UserRound } from "lucide-react";
import { useGuestName } from "@/lib/guest";

export default function TopBar() {
  const pathname = usePathname();
  const { guestName, setGuestName, ready } = useGuestName();

  function handleEditName() {
    const next = window.prompt("Wat is je naam?", guestName ?? "");
    if (next && next.trim()) {
      setGuestName(next);
    }
  }

  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-20 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <PartyPopper size={20} className="text-primary" />
          <span className="app-title">Vrijgezellenfeest</span>
        </div>
        <button onClick={handleEditName} className="user-badge flex items-center gap-1.5">
          <UserRound size={15} className="text-muted" />
          {ready && guestName ? guestName : "Naam"}
        </button>
      </div>
    </header>
  );
}
