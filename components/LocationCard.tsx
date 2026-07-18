import { MapPin, ExternalLink } from "lucide-react";
import GradientCard from "@/components/GradientCard";
import StapSuggestions from "@/components/StapSuggestions";
import { buildMapsUrl, TimelineStop } from "@/lib/content";

export default function LocationCard({ stop }: { stop: TimelineStop }) {
  return (
    <GradientCard className="flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <span className="gradient-text font-semibold text-sm shrink-0 pt-0.5">
          {stop.time}
        </span>
        <div className="flex-1">
          <h3 className="font-semibold">{stop.title}</h3>
          <p className="text-sm text-muted mt-1">{stop.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pl-0">
        <a
          href={buildMapsUrl(stop.locationName, stop.city)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs rounded-full border border-border px-3 py-1.5 hover:border-accent-pink/60 transition-colors"
        >
          <MapPin size={13} />
          Route
        </a>
        {stop.website && (
          <a
            href={stop.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs rounded-full border border-border px-3 py-1.5 hover:border-accent-pink/60 transition-colors"
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
