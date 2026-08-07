"use client";

import { useEffect, useRef, useState } from "react";
import { Martini, Timer as TimerIcon } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import {
  BACHELOR_QUIZ_QUESTIONS,
  BACHELOR_QUIZ_TITLE,
  latestBachelorQuizJudgements,
} from "@/lib/bachelorQuiz";
import { BachelorQuizAnswerRow } from "@/lib/types";
import NameEditButton from "@/components/NameEditButton";

const POLL_INTERVAL_MS = 20000;
const TIMER_SECONDS = 30;

export default function ErikQuizPage() {
  const [answers, setAnswers] = useState<BachelorQuizAnswerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  async function load() {
    try {
      const { data } = await supabase
        .from("bachelor_quiz_answers")
        .select("*")
        .order("created_at");
      setAnswers(data ?? []);
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
    return () => {
      if (flashTimeout.current) clearTimeout(flashTimeout.current);
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, []);

  const judged = latestBachelorQuizJudgements(answers);
  const shotsCount = [...judged.values()].filter((row) => !row.is_correct).length;

  const question = BACHELOR_QUIZ_QUESTIONS[index];
  const result = judged.get(question.id);
  const isEditing = editingIds.has(question.id);
  const showResult = result !== undefined && !isEditing;
  const isRevealed = revealedIds.has(question.id) || showResult;

  function startTimer() {
    setTimerSeconds(TIMER_SECONDS);
    if (timerInterval.current) clearInterval(timerInterval.current);
    timerInterval.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev === null || prev <= 1) {
          if (timerInterval.current) clearInterval(timerInterval.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function reveal() {
    setRevealedIds((prev) => new Set(prev).add(question.id));
  }

  async function judge(isCorrect: boolean) {
    setEditingIds((prev) => {
      const next = new Set(prev);
      next.delete(question.id);
      return next;
    });

    const optimistic: BachelorQuizAnswerRow = {
      id: crypto.randomUUID(),
      question_id: question.id,
      is_correct: isCorrect,
      created_at: new Date().toISOString(),
    };
    setAnswers((prev) => [...prev, optimistic]);

    if (!isCorrect) {
      setFlash(true);
      if (flashTimeout.current) clearTimeout(flashTimeout.current);
      flashTimeout.current = setTimeout(() => setFlash(false), 1400);
    }

    await supabase
      .from("bachelor_quiz_answers")
      .insert({ question_id: question.id, is_correct: isCorrect });
  }

  function goTo(nextIndex: number) {
    if (nextIndex < 0 || nextIndex >= BACHELOR_QUIZ_QUESTIONS.length) return;
    setTimerSeconds(null);
    if (timerInterval.current) clearInterval(timerInterval.current);
    setIndex(nextIndex);
  }

  if (loading) {
    return <p className="text-muted text-sm">Laden...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="heading-script text-4xl">{BACHELOR_QUIZ_TITLE}</h1>
        <NameEditButton />
      </div>
      <p className="text-sm text-muted -mt-2">
        Eén persoon leest de vraag hardop voor aan Erik en beoordeelt daarna of het antwoord klopt.
        Fout antwoord = shotje!
      </p>

      {shotsCount > 0 && (
        <div className="bachelor-quiz-shot-counter">
          <Martini size={18} />
          Erik heeft al {shotsCount} shotje{shotsCount === 1 ? "" : "s"} genomen
        </div>
      )}

      <div className="bachelor-quiz-card">
        <p className="bachelor-quiz-progress">
          Vraag {index + 1} van {BACHELOR_QUIZ_QUESTIONS.length}
        </p>
        <p className="bachelor-quiz-question">{question.question}</p>

        {question.hasTimer && (
          <div className="flex flex-col items-center gap-2">
            {timerSeconds !== null ? (
              <p className="bachelor-quiz-timer">
                <TimerIcon size={28} className="inline -mt-1 mr-2" />
                {timerSeconds}s
              </p>
            ) : (
              <button onClick={startTimer} className="bachelor-quiz-timer-button">
                Start 30 seconden
              </button>
            )}
          </div>
        )}

        {isRevealed ? (
          <>
            {question.criterion && <p className="bachelor-quiz-criterion">{question.criterion}</p>}
            <p className={`bachelor-quiz-answer ${question.answer ? "" : "bachelor-quiz-answer-missing"}`}>
              {question.answer || "Antwoord volgt nog van Guido — beoordeel voorlopig zelf."}
            </p>
          </>
        ) : (
          <button onClick={reveal} className="bachelor-quiz-reveal-button">
            Toon antwoord
          </button>
        )}

        {isRevealed && !showResult && (
          <div className="bachelor-quiz-judge-row">
            <button onClick={() => judge(true)} className="bachelor-quiz-judge-good">
              Goed!
            </button>
            <button onClick={() => judge(false)} className="bachelor-quiz-judge-bad">
              Fout — shotje!
            </button>
          </div>
        )}

        {showResult && (
          <div className={`bachelor-quiz-result ${result.is_correct ? "good" : "bad"}`}>
            <span>{result.is_correct ? "Goed beantwoord!" : "Fout — shotje genomen!"}</span>
            <button
              onClick={() => setEditingIds((prev) => new Set(prev).add(question.id))}
              className="bachelor-quiz-redo"
            >
              opnieuw beoordelen
            </button>
          </div>
        )}
      </div>

      <div className="bachelor-quiz-nav">
        <button
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="bachelor-quiz-nav-button"
        >
          Vorige
        </button>
        <button
          onClick={() => goTo(index + 1)}
          disabled={index === BACHELOR_QUIZ_QUESTIONS.length - 1}
          className="bachelor-quiz-nav-button"
        >
          Volgende
        </button>
      </div>

      {flash && (
        <div className="bachelor-quiz-flash">
          <p className="bachelor-quiz-flash-text">🥃 SHOTJE! 🥃</p>
        </div>
      )}
    </div>
  );
}
