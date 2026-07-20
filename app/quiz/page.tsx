"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useGuestName } from "@/lib/guest";
import { QuizQuestionRow, QuizAnswerRow } from "@/lib/types";
import QuizQuestion from "@/components/QuizQuestion";
import QuizLeaderboard from "@/components/QuizLeaderboard";
import NameEditButton from "@/components/NameEditButton";

const POLL_INTERVAL_MS = 20000;

export default function QuizPage() {
  const { guestName, ready } = useGuestName();
  const [questions, setQuestions] = useState<QuizQuestionRow[]>([]);
  const [allAnswers, setAllAnswers] = useState<QuizAnswerRow[]>([]);
  const [myAnswers, setMyAnswers] = useState<Record<string, "a" | "b" | "c" | "d">>({});
  const [loading, setLoading] = useState(true);

  async function load() {
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
    const interval = setInterval(load, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
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

  const answeredCount = Object.keys(myAnswers).length;
  const quizCompleted = questions.length > 0 && answeredCount === questions.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="heading-script text-4xl">Quiz over de bachelor</h1>
        <NameEditButton />
      </div>
      <p className="text-sm text-muted -mt-2">
        Hoe goed ken jij hem? Beantwoord alle {questions.length} vragen! De goede en foute
        antwoorden zie je pas zodra je alle vragen hebt beantwoord.
      </p>

      {questions.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-xs font-semibold text-muted">
            {answeredCount} van de {questions.length} beantwoord
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {questions.map((q, index) => (
          <QuizQuestion
            key={q.id}
            number={index + 1}
            question={q}
            guestName={guestName ?? ""}
            answered={myAnswers[q.id] ?? null}
            quizCompleted={quizCompleted}
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
