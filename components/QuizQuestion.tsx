"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import GradientCard from "@/components/GradientCard";
import { supabase } from "@/lib/supabase/client";
import { QuizQuestionRow } from "@/lib/types";

const OPTION_KEYS = ["a", "b", "c", "d"] as const;

export default function QuizQuestion({
  number,
  question,
  guestName,
  answered,
  onAnswered,
}: {
  number: number;
  question: QuizQuestionRow;
  guestName: string;
  answered: "a" | "b" | "c" | "d" | null;
  onAnswered: (selected: "a" | "b" | "c" | "d") => void;
}) {
  const [selected, setSelected] = useState<string | null>(answered);
  const [submitting, setSubmitting] = useState(false);

  async function handleSelect(option: "a" | "b" | "c" | "d") {
    if (selected || submitting) return;
    setSubmitting(true);
    setSelected(option);
    const { error } = await supabase.from("quiz_answers").insert({
      question_id: question.id,
      guest_name: guestName,
      selected_option: option,
      is_correct: option === question.correct_option,
    });
    if (!error) onAnswered(option);
    setSubmitting(false);
  }

  return (
    <GradientCard className="flex flex-col gap-3">
      <p className="text-xs font-bold uppercase tracking-wide text-primary">Vraag {number}</p>
      <p className="font-bold">{question.question}</p>
      <div className="flex flex-col gap-2">
        {OPTION_KEYS.map((key) => {
          const optionLabels: Record<typeof key, string> = {
            a: question.option_a,
            b: question.option_b,
            c: question.option_c,
            d: question.option_d,
          };
          const label = optionLabels[key];
          const isSelected = selected === key;
          const isCorrect = key === question.correct_option;
          const showResult = selected !== null;

          let styles = "bg-secondary/40 text-foreground";
          if (showResult && isCorrect) {
            styles = "bg-success/15 text-success";
          } else if (showResult && isSelected && !isCorrect) {
            styles = "bg-red-500/15 text-red-600";
          }

          return (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              disabled={selected !== null}
              className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${styles}`}
            >
              <span>{label}</span>
              {showResult && isCorrect && <Check size={16} className="text-success" />}
              {showResult && isSelected && !isCorrect && <X size={16} className="text-red-600" />}
            </button>
          );
        })}
      </div>
    </GradientCard>
  );
}
