"use client";

import { useEffect, useState } from "react";
import BachelorAvatar from "@/components/BachelorAvatar";
import { BACHELOR_NAME, EVENT_DATE, EVENT_DATE_LABEL } from "@/lib/content";

function daysRemaining() {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.ceil((EVENT_DATE.getTime() - Date.now()) / msPerDay);
}

export default function CountdownHero() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(daysRemaining());
  }, []);

  const isToday = days === 0;
  const isPast = days !== null && days < 0;

  return (
    <div className="hero-card">
      <div className="hero-profile-wrapper">
        <BachelorAvatar size={90} />
      </div>
      <h2>Vrijgezellenfeest van {BACHELOR_NAME}</h2>
      <p className="date-sub">{EVENT_DATE_LABEL}</p>

      <div className="countdown-section">
        {days === null ? (
          <div className="countdown-number">&nbsp;</div>
        ) : isPast ? (
          <p className="font-display text-xl font-semibold text-primary">Het feest is voorbij!</p>
        ) : isToday ? (
          <p className="font-display text-xl font-semibold text-primary">Vandaag is het zover! 🎉</p>
        ) : (
          <>
            <div className="countdown-number">{days}</div>
            <div className="countdown-label">
              dag{days === 1 ? "" : "en"} te gaan
            </div>
          </>
        )}
      </div>
    </div>
  );
}
