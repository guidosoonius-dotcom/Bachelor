"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import GradientCard from "@/components/GradientCard";
import { supabase } from "@/lib/supabase/client";
import { QuizQuestionRow } from "@/lib/types";

const OPTION_KEYS = ["a", "b", "c", "d"] as const;

export default function QuizQuestion({
  question,
  guestName,
  answered,
  onAnswered,
}: {
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
      <p className="font-medium">{question.question}</p>
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

          let styles = "border-border";
          if (showResult && isCorrect) {
            styles = "border-emerald-500 bg-emerald-500/10";
          } else if (showResult && isSelected && !isCorrect) {
            styles = "border-red-500 bg-red-500/10";
          }

          return (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              disabled={selected !== null}
              className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm text-left transition-colors ${styles}`}
            >
              <span>{label}</span>
              {showResult && isCorrect && <Check size={16} className="text-emerald-500" />}
              {showResult && isSelected && !isCorrect && <X size={16} className="text-red-500" />}
            </button>
          );
        })}
      </div>
    </GradientCard>
  );
}
