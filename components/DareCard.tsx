"use client";

import { ThumbsUp } from "lucide-react";
import GradientCard from "@/components/GradientCard";

export default function DareCard({
  text,
  voteCount,
  voted,
  onVote,
}: {
  text: string;
  voteCount: number;
  voted: boolean;
  onVote: () => void;
}) {
  return (
    <GradientCard className="flex items-center gap-3">
      <p className="flex-1 text-sm">{text}</p>
      <button
        onClick={onVote}
        disabled={voted}
        className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 shrink-0 transition-colors ${
          voted ? "gradient-bg text-white" : "border border-border text-muted"
        }`}
      >
        <ThumbsUp size={16} />
        <span className="text-xs font-medium">{voteCount}</span>
      </button>
    </GradientCard>
  );
}
