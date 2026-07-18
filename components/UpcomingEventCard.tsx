import { MapPin, Clock } from "lucide-react";
import { getNextUpcomingStop } from "@/lib/content";

export default function UpcomingEventCard() {
  const stop = getNextUpcomingStop();
  if (!stop) return null;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="upcoming-title">Aankomende evenementen</h2>
      <div className="upcoming-card">
        <span className="upcoming-card-icon">
          <MapPin size={16} />
        </span>
        <div>
          <p className="upcoming-card-title">
            {stop.title} bij {stop.locationName}
          </p>
          <p className="upcoming-card-sub">
            <Clock size={12} />
            {stop.time} · {stop.locationName}, {stop.city}
          </p>
        </div>
      </div>
    </div>
  );
}
