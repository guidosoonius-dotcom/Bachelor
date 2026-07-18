"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useGuestName } from "@/lib/guest";
import { DareRow, DareVoteRow } from "@/lib/types";
import DareCard from "@/components/DareCard";

export default function OpdrachtenPage() {
  const { guestName, ready } = useGuestName();
  const [dares, setDares] = useState<DareRow[]>([]);
  const [votes, setVotes] = useState<DareVoteRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const [{ data: d }, { data: v }] = await Promise.all([
        supabase.from("dares").select("*").order("sort_order"),
        supabase.from("dare_votes").select("*"),
      ]);
      setDares(d ?? []);
      setVotes(v ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleVote(dareId: string) {
    if (!guestName) return;
    setVotes((prev) => [
      ...prev,
      { id: crypto.randomUUID(), dare_id: dareId, guest_name: guestName },
    ]);
    const { error } = await supabase
      .from("dare_votes")
      .insert({ dare_id: dareId, guest_name: guestName });
    if (error) load();
  }

  if (!ready || loading) {
    return <p className="text-muted text-sm">Laden...</p>;
  }

  const sorted = [...dares].sort((a, b) => {
    const countA = votes.filter((v) => v.dare_id === a.id).length;
    const countB = votes.filter((v) => v.dare_id === b.id).length;
    return countB - countA;
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Opdrachten</h1>
      <p className="text-sm text-muted -mt-2">
        Stem op de opdrachten die de bachelor moet uitvoeren!
      </p>
      <div className="challenge-list">
        {sorted.map((dare) => {
          const voteCount = votes.filter((v) => v.dare_id === dare.id).length;
          const voted = votes.some(
            (v) => v.dare_id === dare.id && v.guest_name === guestName
          );
          return (
            <DareCard
              key={dare.id}
              text={dare.text}
              voteCount={voteCount}
              voted={voted}
              onVote={() => handleVote(dare.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
