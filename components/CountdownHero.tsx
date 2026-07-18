"use client";

import { useEffect, useState } from "react";
import { BACHELOR_AVATAR_SRC, BACHELOR_NAME, EVENT_DATE, EVENT_DATE_LABEL } from "@/lib/content";

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
      <div className="hero-info">
        <span className="hero-date">{EVENT_DATE_LABEL}</span>
        <h3 className="hero-event-title">Vrijgezellenfeest van {BACHELOR_NAME}</h3>
      </div>

      <div className="hero-countdown">
        {days === null ? (
          <div className="countdown-number">&nbsp;</div>
        ) : isPast ? (
          <p className="font-display text-lg font-semibold">Het feest is voorbij!</p>
        ) : isToday ? (
          <p className="font-display text-lg font-semibold">Vandaag is het zover! 🎉</p>
        ) : (
          <>
            <div className="countdown-number">{days}</div>
            <div className="countdown-label">
              dag{days === 1 ? "" : "en"} te gaan
            </div>
          </>
        )}
      </div>

      <div className="hero-image" style={{ backgroundImage: `url(${BACHELOR_AVATAR_SRC})` }} />
    </div>
  );
}
