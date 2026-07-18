import { Car, Bus } from "lucide-react";
import { TravelSegment } from "@/lib/content";

export default function TravelIndicator({ segment }: { segment: TravelSegment }) {
  return (
    <div className="timeline-travel">
      <span className="timeline-travel-item">
        <Car size={14} className="timeline-travel-icon" />
        {segment.car}
      </span>
      <span className="timeline-travel-item">
        <Bus size={14} className="timeline-travel-icon" />
        {segment.ov}
      </span>
    </div>
  );
}
