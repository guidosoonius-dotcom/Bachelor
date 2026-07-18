"use client";

import { useEffect, useState } from "react";
import { Send, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useGuestName } from "@/lib/guest";
import { LocationSuggestionRow } from "@/lib/types";

export default function StapSuggestions() {
  const { guestName } = useGuestName();
  const [suggestions, setSuggestions] = useState<LocationSuggestionRow[]>([]);
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("location_suggestions")
        .select("*")
        .order("created_at", { ascending: false });
      setSuggestions(data ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || !guestName) return;
    setSubmitting(true);
    await supabase.from("location_suggestions").insert({
      guest_name: guestName,
      suggestion: text.trim(),
      link: link.trim() || null,
    });
    setText("");
    setLink("");
    setSubmitting(false);
    load();
  }

  return (
    <div className="border-t border-border pt-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted uppercase tracking-wide">
          Suggesties voor het stappen
        </span>
        <button onClick={load} aria-label="Vernieuwen">
          <RefreshCw size={14} className="text-muted" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Naam van bar of club"
          className="rounded-lg bg-surface-elevated border border-border px-3 py-2 text-sm outline-none focus:border-accent-pink"
        />
        <div className="flex gap-2">
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link (optioneel)"
            className="flex-1 rounded-lg bg-surface-elevated border border-border px-3 py-2 text-sm outline-none focus:border-accent-pink"
          />
          <button
            type="submit"
            disabled={!text.trim() || submitting}
            className="gradient-bg rounded-lg px-3 disabled:opacity-40"
            aria-label="Versturen"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-xs text-muted">Laden...</p>
      ) : suggestions.length === 0 ? (
        <p className="text-xs text-muted">Nog geen suggesties, wees de eerste!</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {suggestions.map((s) => (
            <li key={s.id} className="text-sm bg-surface-elevated rounded-lg px-3 py-2">
              <div className="flex items-center justify-between gap-2">
                {s.link ? (
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline decoration-accent-pink/60 underline-offset-2"
                  >
                    {s.suggestion}
                  </a>
                ) : (
                  <span className="font-medium">{s.suggestion}</span>
                )}
                <span className="text-xs text-muted shrink-0">{s.guest_name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
