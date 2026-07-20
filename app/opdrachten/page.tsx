"use client";

import { useEffect, useState } from "react";
import { supabase, FOTOWALL_BUCKET } from "@/lib/supabase/client";
import { useGuestName } from "@/lib/guest";
import { getCurrentStop } from "@/lib/content";
import { DareRow, DareVoteRow, DareCompletionRow } from "@/lib/types";
import { compressImage } from "@/lib/compressImage";
import DareCard from "@/components/DareCard";
import NameEditButton from "@/components/NameEditButton";

const POLL_INTERVAL_MS = 20000;

export default function OpdrachtenPage() {
  const { guestName, ready } = useGuestName();
  const [dares, setDares] = useState<DareRow[]>([]);
  const [votes, setVotes] = useState<DareVoteRow[]>([]);
  const [completions, setCompletions] = useState<DareCompletionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventStarted, setEventStarted] = useState(false);

  async function load() {
    try {
      const [{ data: d }, { data: v }, { data: c }] = await Promise.all([
        supabase.from("dares").select("*").order("sort_order"),
        supabase.from("dare_votes").select("*"),
        supabase.from("dare_completions").select("*"),
      ]);
      setDares(d ?? []);
      setVotes(v ?? []);
      setCompletions(c ?? []);
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
    setEventStarted(getCurrentStop() !== null);
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

  async function handleComplete(dareId: string, file: File) {
    if (!guestName) return;
    const compressed = await compressImage(file);
    const safeName = compressed.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const path = `dares/${crypto.randomUUID()}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from(FOTOWALL_BUCKET)
      .upload(path, compressed);
    if (uploadError) return;

    const { error } = await supabase
      .from("dare_completions")
      .insert({ dare_id: dareId, guest_name: guestName, photo_path: path });
    if (!error) load();
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
      <div className="flex items-center justify-between">
        <h1 className="heading-script text-4xl">Opdrachten</h1>
        <NameEditButton />
      </div>
      <p className="text-sm text-muted -mt-2">
        Stem op de opdrachten die de bachelor moet uitvoeren!
      </p>
      <div className="challenge-list">
        {sorted.map((dare) => {
          const voteCount = votes.filter((v) => v.dare_id === dare.id).length;
          const voted = votes.some(
            (v) => v.dare_id === dare.id && v.guest_name === guestName
          );
          const completion = completions.find((c) => c.dare_id === dare.id);
          const completionData = completion
            ? {
                photoUrl: supabase.storage
                  .from(FOTOWALL_BUCKET)
                  .getPublicUrl(completion.photo_path).data.publicUrl,
                guestName: completion.guest_name,
              }
            : null;
          return (
            <DareCard
              key={dare.id}
              text={dare.text}
              voteCount={voteCount}
              voted={voted}
              onVote={() => handleVote(dare.id)}
              completion={completionData}
              onComplete={(file) => handleComplete(dare.id, file)}
              eventStarted={eventStarted}
            />
          );
        })}
      </div>
    </div>
  );
}
