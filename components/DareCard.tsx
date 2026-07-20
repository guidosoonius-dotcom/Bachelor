"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, CheckCircle2 } from "lucide-react";

export default function DareCard({
  text,
  voteCount,
  voted,
  onVote,
  completion,
  onComplete,
  eventStarted,
}: {
  text: string;
  voteCount: number;
  voted: boolean;
  onVote: () => void;
  completion: { photoUrl: string; guestName: string } | null;
  onComplete: (file: File) => Promise<void>;
  eventStarted: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      await onComplete(file);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={`challenge-card ${voted ? "completed" : ""}`}>
      <div className="challenge-top">
        <div className="challenge-content">
          <p className="challenge-title">{text}</p>
        </div>
        <div className="challenge-right">
          <span className="challenge-badge">
            {voteCount} stem{voteCount === 1 ? "" : "men"}
          </span>
          <button
            className="challenge-checkbox"
            onClick={onVote}
            disabled={voted}
            aria-pressed={voted}
            aria-label={voted ? "Je hebt gestemd" : "Stem op deze opdracht"}
          />
        </div>
      </div>

      {completion && (
        <div className="challenge-proof">
          <div className="challenge-proof-img-wrap">
            <Image
              src={completion.photoUrl}
              alt="Bewijsfoto"
              fill
              sizes="48px"
              className="object-cover"
              unoptimized
            />
          </div>
          <span className="challenge-proof-label">
            <CheckCircle2 size={14} />
            Gelukt! Bewijs door {completion.guestName}
          </span>
        </div>
      )}

      {!completion && eventStarted && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="challenge-proof-button"
          >
            <Camera size={14} />
            {uploading ? "Uploaden..." : "Gelukt? Voeg bewijsfoto toe"}
          </button>
        </>
      )}

      {!completion && !eventStarted && (
        <p className="text-xs text-muted">Bewijsfoto toevoegen kan zodra het feest begint.</p>
      )}
    </div>
  );
}
