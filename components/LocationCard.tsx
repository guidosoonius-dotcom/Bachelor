import { MapPin, ExternalLink } from "lucide-react";
import GradientCard from "@/components/GradientCard";
import StapSuggestions from "@/components/StapSuggestions";
import { buildMapsUrl, TimelineStop } from "@/lib/content";

export default function LocationCard({ stop }: { stop: TimelineStop }) {
  return (
    <GradientCard className="flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <span className="text-tile-programma shrink-0 pt-0.5 text-sm font-extrabold">
          {stop.time}
        </span>
        <div className="flex-1">
          <h3 className="font-bold">{stop.title}</h3>
          <p className="mt-1 text-sm text-muted">{stop.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={buildMapsUrl(stop.locationName, stop.city)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-surface-elevated px-3 py-1.5 text-xs font-medium transition-colors hover:bg-surface"
        >
          <MapPin size={13} />
          Route
        </a>
        {stop.website && (
          <a
            href={stop.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-surface-elevated px-3 py-1.5 text-xs font-medium transition-colors hover:bg-surface"
          >
            <ExternalLink size={13} />
            Website
          </a>
        )}
      </div>

      {stop.hasSuggestions && <StapSuggestions />}
    </GradientCard>
  );
}
