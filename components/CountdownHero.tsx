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
    <div className="tile-hero relative flex flex-col gap-5 overflow-hidden rounded-3xl p-5">
      <div className="flex items-center gap-4">
        <BachelorAvatar size={96} />
        <div>
          <p className="font-display text-sm italic text-white/80">
            Vrijgezellenfeest van {BACHELOR_NAME}
          </p>
          <p className="text-sm font-semibold text-white">{EVENT_DATE_LABEL}</p>
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        {days === null ? (
          <span className="font-display text-5xl font-semibold text-white">&nbsp;</span>
        ) : isPast ? (
          <span className="font-display text-2xl font-semibold text-white">Het feest is voorbij!</span>
        ) : isToday ? (
          <span className="font-display text-2xl font-semibold text-white">Vandaag is het zover! 🎉</span>
        ) : (
          <>
            <span className="font-display text-6xl font-semibold tracking-tight text-white">{days}</span>
            <span className="text-lg font-bold text-white/90">
              dag{days === 1 ? "" : "en"} te gaan
            </span>
          </>
        )}
      </div>
    </div>
  );
}
