import { QuizAnswerRow } from "@/lib/types";

type ScoreboardAnswer = Pick<QuizAnswerRow, "guest_name" | "is_correct">;

export default function HomeQuizScoreboard({ answers }: { answers: ScoreboardAnswer[] }) {
  const scores = new Map<string, number>();
  for (const a of answers) {
    scores.set(a.guest_name, (scores.get(a.guest_name) ?? 0) + (a.is_correct ? 1 : 0));
  }
  const ranked = [...scores.entries()].sort((a, b) => b[1] - a[1]);

  if (ranked.length === 0) return null;

  return (
    <section className="home-section">
      <h4 className="section-heading">Scorebord quiz</h4>
      <div className="home-list-card">
        <span className="home-live-badge">
          <span className="home-live-dot" />
          Live
        </span>
        {ranked.map(([name, score], i) => (
          <div key={name} className="home-list-row">
            <span className="home-list-rank">
              <span className="home-list-medal">{i + 1}</span>
              {name}
            </span>
            <span className="home-list-score">
              {score} punt{score === 1 ? "" : "en"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
