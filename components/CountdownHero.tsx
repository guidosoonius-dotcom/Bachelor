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
    <div className="gradient-bg relative flex flex-col gap-5 overflow-hidden rounded-3xl p-5">
      <div className="flex items-center gap-3">
        <BachelorAvatar size={48} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/75">
            Vrijgezellenfeest van {BACHELOR_NAME}
          </p>
          <p className="text-sm font-semibold text-white">{EVENT_DATE_LABEL}</p>
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        {days === null ? (
          <span className="text-5xl font-extrabold text-white">&nbsp;</span>
        ) : isPast ? (
          <span className="text-2xl font-extrabold text-white">Het feest is voorbij!</span>
        ) : isToday ? (
          <span className="text-2xl font-extrabold text-white">Vandaag is het zover! 🎉</span>
        ) : (
          <>
            <span className="text-6xl font-extrabold tracking-tight text-white">{days}</span>
            <span className="text-lg font-bold text-white/90">
              dag{days === 1 ? "" : "en"} te gaan
            </span>
          </>
        )}
      </div>
    </div>
  );
}
