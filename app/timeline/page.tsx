import LocationCard from "@/components/LocationCard";
import { TIMELINE } from "@/lib/content";

export default function TimelinePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-extrabold tracking-tight">Programma & locaties</h1>
      <div className="flex flex-col gap-4">
        {TIMELINE.map((stop) => (
          <LocationCard key={stop.time} stop={stop} />
        ))}
      </div>
    </div>
  );
}
