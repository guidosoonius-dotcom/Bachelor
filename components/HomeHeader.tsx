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
    <header className="home-header">
      <h1 className="home-wordmark">Vrijgezellenfeest</h1>
      <div className="home-user-row">
        <h2 className="home-welcome-text">Hallo {name}</h2>
        <button onClick={handleEditName} className="home-user-badge">
          <span className="home-avatar-circle">{name.charAt(0).toUpperCase()}</span>
          <span>{name}</span>
        </button>
      </div>
    </header>
  );
}
