"use client";

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
    <div className={`challenge-card ${voted ? "completed" : ""}`}>
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
  );
}
