import LocationCard from "@/components/LocationCard";
import TravelIndicator from "@/components/TravelIndicator";
import { TIMELINE } from "@/lib/content";

export default function TimelinePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Programma & locaties</h1>
      <div className="timeline">
        {TIMELINE.map((stop) => (
          <div key={stop.time}>
            <LocationCard stop={stop} />
            {stop.travelToNext && <TravelIndicator segment={stop.travelToNext} />}
          </div>
        ))}
      </div>
    </div>
  );
}
