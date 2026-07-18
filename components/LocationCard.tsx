"use client";

import { useEffect, useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import StapSuggestions from "@/components/StapSuggestions";
import { buildMapsUrl, getStopDateTime, TimelineStop } from "@/lib/content";

export default function LocationCard({ stop }: { stop: TimelineStop }) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(Date.now() > getStopDateTime(stop).getTime());
  }, [stop]);

  return (
    <div className={`timeline-item ${completed ? "completed" : ""}`}>
      <div className="timeline-dot" />
      <div className="timeline-card">
        <p className="timeline-time">{stop.time}</p>
        <h3 className="timeline-title">{stop.title}</h3>
        <p className="mb-2 text-sm text-muted">{stop.description}</p>

        <div className="flex flex-wrap gap-4">
          <a
            href={buildMapsUrl(stop.locationName, stop.city)}
            target="_blank"
            rel="noopener noreferrer"
            className="timeline-location"
          >
            <MapPin size={13} />
            Route
          </a>
          {stop.website && (
            <a href={stop.website} target="_blank" rel="noopener noreferrer" className="timeline-location">
              <ExternalLink size={13} />
              Website
            </a>
          )}
        </div>

        {stop.hasSuggestions && <StapSuggestions />}
      </div>
    </div>
  );
}
