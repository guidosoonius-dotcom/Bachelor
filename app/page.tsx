import { CalendarClock, HelpCircle, ListChecks, Camera, Info } from "lucide-react";
import BachelorAvatar from "@/components/BachelorAvatar";
import FeatureTile from "@/components/FeatureTile";
import { EVENT_DATE_LABEL, BACHELOR_NAME } from "@/lib/content";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex items-center gap-4 pt-2">
        <BachelorAvatar />
        <div>
          <p className="text-muted text-sm">{EVENT_DATE_LABEL}</p>
          <h1 className="text-2xl font-semibold">
            Vrijgezellenfeest van <span className="gradient-text">{BACHELOR_NAME}</span>
          </h1>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <FeatureTile href="/timeline" label="Programma & locaties" icon={CalendarClock} />
        <FeatureTile href="/quiz" label="Quiz" icon={HelpCircle} />
        <FeatureTile href="/opdrachten" label="Opdrachten" icon={ListChecks} />
        <FeatureTile href="/fotowall" label="Fotowall" icon={Camera} />
        <FeatureTile href="/info" label="Praktische info" icon={Info} />
      </section>
    </div>
  );
}
