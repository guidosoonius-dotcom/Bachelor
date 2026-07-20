import LocationCard from "@/components/LocationCard";
import TravelIndicator from "@/components/TravelIndicator";
import NameEditButton from "@/components/NameEditButton";
import { TIMELINE } from "@/lib/content";

export default function TimelinePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="heading-script text-4xl">Programma & locaties</h1>
        <NameEditButton />
      </div>
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
