"use client";

import { useGuestName } from "@/lib/guest";

export default function HomeHeader() {
  const { guestName, setGuestName, ready } = useGuestName();

  function handleEditName() {
    const next = window.prompt("Wat is je naam?", guestName ?? "");
    if (next && next.trim()) {
      setGuestName(next);
    }
  }

  const name = ready && guestName ? guestName : "Gast";

  return (
    <div className="flex items-start justify-between gap-3 pt-2">
      <h1 className="home-wordmark">Vrijgezellenfeest</h1>
      <button onClick={handleEditName} className="home-greeting-chip">
        <span className="home-greeting-text">Hallo {name}</span>
        <span className="home-avatar-chip">
          <span className="avatar-initial">{name.charAt(0).toUpperCase()}</span>
          {name}
        </span>
      </button>
    </div>
  );
}
