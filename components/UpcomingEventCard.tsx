import { MapPin, Clock } from "lucide-react";
import { getNextUpcomingStop } from "@/lib/content";

export default function UpcomingEventCard() {
  const stop = getNextUpcomingStop();
  if (!stop) return null;

  return (
    <section className="home-section">
      <h4 className="section-heading">Aankomende evenementen</h4>
      <div className="event-card">
        <span className="home-live-badge">
          <span className="home-live-dot" />
          Live
        </span>
        <span className="event-icon-circle">
          <MapPin size={24} />
        </span>
        <div className="event-details">
          <h4>
            {stop.title} bij {stop.locationName}
          </h4>
          <p className="event-time-location">
            <Clock size={14} />
            {stop.time} · {stop.locationName}, {stop.city}
          </p>
        </div>
      </div>
    </section>
  );
}
