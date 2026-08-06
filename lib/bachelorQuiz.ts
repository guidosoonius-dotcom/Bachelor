export type BachelorQuizQuestion = {
  id: string;
  question: string;
  answer: string;
  criterion?: string;
  hasTimer?: boolean;
};

type JudgedRow = { question_id: string; is_correct: boolean; created_at: string };

export function latestBachelorQuizJudgements<T extends JudgedRow>(rows: T[]) {
  const latest = new Map<string, T>();
  for (const row of rows) {
    const existing = latest.get(row.question_id);
    if (!existing || new Date(row.created_at).getTime() > new Date(existing.created_at).getTime()) {
      latest.set(row.question_id, row);
    }
  }
  return latest;
}

export const BACHELOR_QUIZ_TITLE = "Vrijgezellenquiz voor Erik";

export const BACHELOR_QUIZ_QUESTIONS: BachelorQuizQuestion[] = [
  {
    id: "q1",
    question: "Waar komt de traditie van het vrijgezellenfeest oorspronkelijk vandaan?",
    answer: "Uit het oude Griekenland (Sparta, rond de 5e eeuw v.Chr.).",
    criterion: "Als hij 'Griekenland' of 'Sparta' noemt, is het goed!",
  },
  {
    id: "q2",
    question: "Waarom dragen we de trouwring van oudsher traditioneel aan de linker ringvinger?",
    answer:
      "Vanwege het geloof in de Vena Amoris (de ader van de liefde) die rechtstreeks van de linker ringvinger naar het hart zou lopen.",
  },
  {
    id: "q3",
    question: "Hoeveel woog de grootste bruidstaart ter wereld ooit, volgens het Guinness Book of Records?",
    answer: "6.818 kg.",
    criterion: "Marge: hij mag er 1.000 kg naast zitten.",
  },
  {
    id: "q4",
    question:
      "Als jullie samen op de bank ploffen, bij wie van jullie twee gaan de katten dan als állereerste op schoot liggen?",
    answer: "",
    criterion: "Vraag vooraf gesteld aan de bruid: 'Bij wie liggen de katten als eerste op schoot?'",
  },
  {
    id: "q5",
    question: "Wat is volgens haar jouw absolute favoriete film of serie die je keer op keer opnieuw kunt kijken?",
    answer: "",
    criterion: "Vraag vooraf gesteld aan de bruid: 'Wat is zijn lievelingsfilm of -serie?'",
  },
  {
    id: "q6",
    question: "Hoeveel kilo denkt jouw vriendin dat jouw 'one rep max' momenteel is op de bench press?",
    answer: "",
    criterion:
      "Vraag vooraf gesteld aan de bruid: 'Hoeveel kilo denk jij dat hij maximaal één keer kan bench pressen?'",
  },
  {
    id: "q7",
    question:
      "Noem binnen 30 seconden 3 Ajax-spelers die wél uit de eigen jeugdopleiding kwamen én met de club de Champions League hebben gewonnen.",
    answer: "Bijvoorbeeld: Clarence Seedorf, Patrick Kluivert, Frank de Boer, Edgar Davids, Edwin van der Sar.",
    criterion: "Host beoordeelt of de genoemde namen kloppen.",
    hasTimer: true,
  },
  {
    id: "q8",
    question: "Welk edelmetaal maakt de Krimpenerwaard (Schoonhoven) beroemd?",
    answer: "Zilver!",
  },
  {
    id: "q9",
    question: "Wat was volgens haar de allergrootste afknapper toen ze jou voor het eerst ontmoette?",
    answer: "",
    criterion: "Vraag vooraf gesteld aan de bruid.",
  },
  {
    id: "q10",
    question: "Wat is volgens jouw vriendin jouw meest irritante of vreemde trekje als je slaapt?",
    answer: "",
    criterion:
      "Vraag vooraf gesteld aan de bruid: denk aan snurken, de deken stelen, praten in z'n slaap, of diagonaal liggen.",
  },
];
