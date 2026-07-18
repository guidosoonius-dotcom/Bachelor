import { CalendarClock, HelpCircle, ListChecks, Camera, Info } from "lucide-react";
import CountdownHero from "@/components/CountdownHero";
import FeatureTile from "@/components/FeatureTile";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <CountdownHero />

      <section className="grid-menu">
        <FeatureTile href="/timeline" label="Programma & locaties" icon={CalendarClock} />
        <FeatureTile href="/quiz" label="Quiz" icon={HelpCircle} />
        <FeatureTile href="/opdrachten" label="Opdrachten" icon={ListChecks} />
        <FeatureTile href="/fotowall" label="Fotowall" icon={Camera} />
        <FeatureTile href="/info" label="Praktische info" icon={Info} fullWidth />
      </section>
    </div>
  );
}
