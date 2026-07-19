type UploaderPhoto = { guest_name: string | null };

export default function PhotoUploaderLeaderboard({ photos }: { photos: UploaderPhoto[] }) {
  const counts = new Map<string, number>();
  for (const p of photos) {
    if (!p.guest_name) continue;
    counts.set(p.guest_name, (counts.get(p.guest_name) ?? 0) + 1);
  }
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);

  if (ranked.length === 0) return null;

  return (
    <section className="home-section">
      <h4 className="section-heading">Meeste foto's geüpload</h4>
      <div className="home-list-card">
        <span className="home-live-badge">
          <span className="home-live-dot" />
          Live
        </span>
        {ranked.map(([name, count], i) => (
          <div key={name} className="home-list-row">
            <span className="home-list-rank">
              <span className="home-list-medal">{i + 1}</span>
              {name}
            </span>
            <span className="home-list-score">
              {count} foto{count === 1 ? "" : "'s"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
