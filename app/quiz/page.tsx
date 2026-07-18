"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useGuestName } from "@/lib/guest";
import { QuizQuestionRow, QuizAnswerRow } from "@/lib/types";
import QuizQuestion from "@/components/QuizQuestion";
import QuizLeaderboard from "@/components/QuizLeaderboard";

export default function QuizPage() {
  const { guestName, ready } = useGuestName();
  const [questions, setQuestions] = useState<QuizQuestionRow[]>([]);
  const [allAnswers, setAllAnswers] = useState<QuizAnswerRow[]>([]);
  const [myAnswers, setMyAnswers] = useState<Record<string, "a" | "b" | "c" | "d">>({});
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const [{ data: q }, { data: a }] = await Promise.all([
        supabase.from("quiz_questions").select("*").order("sort_order"),
        supabase.from("quiz_answers").select("*"),
      ]);
      setQuestions(q ?? []);
      setAllAnswers(a ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!guestName) return;
    const mine: Record<string, "a" | "b" | "c" | "d"> = {};
    for (const a of allAnswers) {
      if (a.guest_name === guestName) mine[a.question_id] = a.selected_option;
    }
    setMyAnswers(mine);
  }, [allAnswers, guestName]);

  if (!ready || loading) {
    return <p className="text-muted text-sm">Laden...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Quiz over de bachelor</h1>
      <p className="text-sm text-muted -mt-2">
        Hoe goed ken jij hem? Beantwoord alle {questions.length} vragen!
      </p>

      <div className="flex flex-col gap-4">
        {questions.map((q, index) => (
          <QuizQuestion
            key={q.id}
            number={index + 1}
            question={q}
            guestName={guestName ?? ""}
            answered={myAnswers[q.id] ?? null}
            onAnswered={(selected) => {
              setAllAnswers((prev) => [
                ...prev,
                {
                  id: crypto.randomUUID(),
                  question_id: q.id,
                  guest_name: guestName ?? "",
                  selected_option: selected,
                  is_correct: selected === q.correct_option,
                },
              ]);
            }}
          />
        ))}
      </div>

      <QuizLeaderboard answers={allAnswers} />
    </div>
  );
}
