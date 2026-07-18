// Alle content hieronder is makkelijk aan te passen zonder de rest van de app te hoeven wijzigen.

export const BACHELOR_NAME = "Erik";
export const EVENT_DATE_LABEL = "zaterdag 8 augustus 2026";
export const EVENT_TITLE = `Vrijgezellenfeest van ${BACHELOR_NAME}`;
export const EVENT_DATE = new Date("2026-08-08T10:00:00+02:00");

export const BACHELOR_AVATAR_SRC = "/bachelor-avatar.jpg";

export type SectionKey = "programma" | "quiz" | "opdrachten" | "fotowall" | "info";

export const SECTION_ACCENTS: Record<SectionKey, { tileClass: string; textClass: string }> = {
  programma: { tileClass: "tile-programma", textClass: "text-tile-programma" },
  quiz: { tileClass: "tile-quiz", textClass: "text-tile-quiz" },
  opdrachten: { tileClass: "tile-opdrachten", textClass: "text-tile-opdrachten" },
  fotowall: { tileClass: "tile-fotowall", textClass: "text-tile-fotowall" },
  info: { tileClass: "tile-info", textClass: "text-tile-info" },
};

export type TimelineStop = {
  time: string;
  title: string;
  description: string;
  locationName: string;
  city: string;
  website?: string;
  hasSuggestions?: boolean;
};

export const TIMELINE: TimelineStop[] = [
  {
    time: "10:00",
    title: "Verzamelen",
    description:
      "We verzamelen bij de Allegro in Krimpen aan den IJssel — het huis van de bachelor. Zorg dat je op tijd bent!",
    locationName: "Allegro Krimpen aan den IJssel",
    city: "Krimpen aan den IJssel",
  },
  {
    time: "11:00",
    title: "Activiteiten",
    description:
      "Actie en vermaak bij De Basis 010: uitdagende buitenactiviteiten in het groen, speciaal geschikt voor een vrijgezellenfeest.",
    locationName: "De Basis 010",
    city: "Vlaardingen",
    website: "https://www.debasis010.nl",
  },
  {
    time: "18:00",
    title: "Eten",
    description:
      "Diner bij Little V in Rotterdam: authentieke Vietnamese keuken en gezellige sfeer, sinds 2006.",
    locationName: "Little V",
    city: "Rotterdam",
    website: "https://littlev.nl",
  },
  {
    time: "20:30",
    title: "Stappen",
    description:
      "We sluiten de avond af in het centrum van Rotterdam. Heb je een tip voor een leuke bar of club? Zet 'm hieronder!",
    locationName: "Centrum Rotterdam",
    city: "Rotterdam",
    hasSuggestions: true,
  },
];

export function buildMapsUrl(locationName: string, city: string) {
  const query = encodeURIComponent(`${locationName}, ${city}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export type PracticalInfoItem = {
  label: string;
  value: string;
};

export const PRACTICAL_INFO: PracticalInfoItem[] = [
  { label: "Verzamelplek & tijd", value: "10:00 uur bij de Allegro, Krimpen aan den IJssel." },
  { label: "Wat neem je mee?", value: "Comfortabele kleding en schoenen voor de activiteiten, en iets feestelijks voor de avond." },
  { label: "Vervoer", value: "We regelen gezamenlijk vervoer tussen de locaties — details volgen." },
  { label: "Contactpersoon", value: "Bij vragen of noodgevallen: [naam + telefoonnummer invullen]." },
  { label: "Kosten", value: "[Bedrag invullen] per persoon, vooraf over te maken naar [rekeningnummer]." },
  { label: "Dresscode", value: "Casual overdag, iets feestelijkers voor het eten en stappen 's avonds." },
];
