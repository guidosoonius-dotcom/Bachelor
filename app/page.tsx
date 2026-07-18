import { CalendarClock, HelpCircle, ListChecks, Camera, Info } from "lucide-react";
import CountdownHero from "@/components/CountdownHero";
import FeatureTile from "@/components/FeatureTile";
import { SECTION_ACCENTS } from "@/lib/content";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <CountdownHero />

      <section className="grid grid-cols-2 gap-3">
        <FeatureTile
          href="/timeline"
          label="Programma & locaties"
          icon={CalendarClock}
          tileClass={SECTION_ACCENTS.programma.tileClass}
        />
        <FeatureTile
          href="/quiz"
          label="Quiz"
          icon={HelpCircle}
          tileClass={SECTION_ACCENTS.quiz.tileClass}
        />
        <FeatureTile
          href="/opdrachten"
          label="Opdrachten"
          icon={ListChecks}
          tileClass={SECTION_ACCENTS.opdrachten.tileClass}
        />
        <FeatureTile
          href="/fotowall"
          label="Fotowall"
          icon={Camera}
          tileClass={SECTION_ACCENTS.fotowall.tileClass}
        />
      </section>

      <FeatureTile
        href="/info"
        label="Praktische info"
        icon={Info}
        tileClass={SECTION_ACCENTS.info.tileClass}
        variant="pill"
      />
    </div>
  );
}
