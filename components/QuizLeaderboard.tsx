"use client";

import { Trophy } from "lucide-react";
import GradientCard from "@/components/GradientCard";
import { QuizAnswerRow } from "@/lib/types";

export default function QuizLeaderboard({ answers }: { answers: QuizAnswerRow[] }) {
  const scores = new Map<string, number>();
  for (const a of answers) {
    scores.set(a.guest_name, (scores.get(a.guest_name) ?? 0) + (a.is_correct ? 1 : 0));
  }
  const ranked = [...scores.entries()].sort((a, b) => b[1] - a[1]);

  if (ranked.length === 0) return null;

  return (
    <GradientCard className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Trophy size={16} className="text-tile-quiz" />
        Scoreboard
      </div>
      <ul className="flex flex-col gap-1.5">
        {ranked.map(([name, score], i) => (
          <li key={name} className="flex items-center justify-between text-sm">
            <span className="text-muted">
              {i + 1}. {name}
            </span>
            <span className="font-medium">{score} punt{score === 1 ? "" : "en"}</span>
          </li>
        ))}
      </ul>
    </GradientCard>
  );
}
