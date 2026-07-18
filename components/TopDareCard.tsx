import { ThumbsUp } from "lucide-react";
import { DareRow, DareVoteRow } from "@/lib/types";

type DareSummary = Pick<DareRow, "id" | "text">;

export default function TopDareCard({
  dares,
  votes,
}: {
  dares: DareSummary[];
  votes: Pick<DareVoteRow, "dare_id">[];
}) {
  if (votes.length === 0) return null;

  const counts = new Map<string, number>();
  for (const v of votes) {
    counts.set(v.dare_id, (counts.get(v.dare_id) ?? 0) + 1);
  }

  const topEntry = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  const topDare = dares.find((d) => d.id === topEntry[0]);
  if (!topDare) return null;

  const voteCount = topEntry[1];

  return (
    <section className="home-section">
      <h4 className="section-heading">Populairste opdracht</h4>
      <div className="event-card">
        <span className="home-live-badge">
          <span className="home-live-dot" />
          Live
        </span>
        <span className="event-icon-circle">
          <ThumbsUp size={22} />
        </span>
        <div className="event-details">
          <h4>{topDare.text}</h4>
          <p className="event-time-location">
            <ThumbsUp size={14} />
            {voteCount} stem{voteCount === 1 ? "" : "men"}
          </p>
        </div>
      </div>
    </section>
  );
}
