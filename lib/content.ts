// Alle content hieronder is makkelijk aan te passen zonder de rest van de app te hoeven wijzigen.

export const BACHELOR_NAME = "Erik";
export const EVENT_DATE_LABEL = "zaterdag 8 augustus 2026";
export const EVENT_TITLE = `Vrijgezellenfeest van ${BACHELOR_NAME}`;
export const EVENT_DATE = new Date("2026-08-08T11:00:00+02:00");

export const BACHELOR_AVATAR_SRC = "/bachelor-avatar.jpg";

export type TravelSegment = {
  car: string;
  ov: string;
};

export type TimelineStop = {
  time: string;
  title: string;
  description: string;
  locationName: string;
  city: string;
  website?: string;
  hasSuggestions?: boolean;
  travelToNext?: TravelSegment;
};

export const TIMELINE: TimelineStop[] = [
  {
    time: "11:00",
    title: "Verzamelen",
    description:
      "We verzamelen bij Allegro 45 in Krimpen aan den IJssel — het huis van de bachelor. Zorg dat je op tijd bent!",
    locationName: "Allegro 45",
    city: "Krimpen aan den IJssel",
    travelToNext: { car: "±35 min", ov: "±60 min" },
  },
  {
    time: "13:00",
    title: "Activiteiten",
    description:
      "Actie en vermaak bij De Basis 010, van 13:00 tot 17:00 uur: uitdagende buitenactiviteiten in het groen, speciaal geschikt voor een vrijgezellenfeest.",
    locationName: "De Basis 010",
    city: "Vlaardingen",
    website: "https://www.debasis010.nl",
    travelToNext: { car: "±15 min", ov: "±25 min" },
  },
  {
    time: "20:15",
    title: "Eten",
    description:
      "Diner bij Little V in Rotterdam: authentieke Vietnamese keuken en gezellige sfeer, sinds 2006.",
    locationName: "Little V",
    city: "Rotterdam",
    website: "https://littlev.nl",
    travelToNext: { car: "±5 min", ov: "±10 min (of lopen)" },
  },
  {
    time: "22:30",
    title: "Stappen",
    description:
      "We sluiten de avond af in het centrum van Rotterdam, naar verwachting rond 22:30. Heb je een tip voor een leuke bar of club? Zet 'm hieronder!",
    locationName: "Centrum Rotterdam",
    city: "Rotterdam",
    hasSuggestions: true,
  },
];

export function buildMapsUrl(locationName: string, city: string) {
  const query = encodeURIComponent(`${locationName}, ${city}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function getStopDateTime(stop: TimelineStop): Date {
  const [hours, minutes] = stop.time.split(":").map(Number);
  const date = new Date(EVENT_DATE);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function getNextUpcomingStop(): TimelineStop | null {
  const now = Date.now();
  return TIMELINE.find((stop) => getStopDateTime(stop).getTime() > now) ?? null;
}

export const PHOTO_GOAL = 10;

export type PracticalInfoItem = {
  label: string;
  value: string;
  link?: string;
};

export const PRACTICAL_INFO: PracticalInfoItem[] = [
  { label: "Verzamelplek & tijd", value: "11:00 uur bij Allegro 45, Krimpen aan den IJssel." },
  { label: "Wat neem je mee?", value: "Comfortabele kleding en schoenen voor de activiteiten, en iets feestelijks voor de avond." },
  { label: "Vervoer", value: "We regelen gezamenlijk vervoer tussen de locaties — details volgen." },
  { label: "Contactpersoon", value: "Bij vragen of noodgevallen: Ronald van Velzen (+31 6 23 21 27 23) of Guido (+31 6 21 39 30 58). Makkelijkst is via de groepsapp." },
  {
    label: "Kosten",
    value: "Alle kosten verrekenen we via de Tikkie Groepie. Sluit je aan via onderstaande link:",
    link: "https://tikkie.me/groepie/6N9TPjMrD1N3oFq9jwUTTs/join",
  },
  { label: "Dresscode", value: "Casual overdag, iets feestelijkers voor het eten en stappen 's avonds." },
];
