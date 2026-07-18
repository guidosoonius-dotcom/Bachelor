export type QuizQuestionRow = {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: "a" | "b" | "c" | "d";
  sort_order: number;
};

export type QuizAnswerRow = {
  id: string;
  question_id: string;
  guest_name: string;
  selected_option: "a" | "b" | "c" | "d";
  is_correct: boolean;
};

export type DareRow = {
  id: string;
  text: string;
  sort_order: number;
};

export type DareVoteRow = {
  id: string;
  dare_id: string;
  guest_name: string;
};

export type LocationSuggestionRow = {
  id: string;
  guest_name: string;
  suggestion: string;
  link: string | null;
  note: string | null;
  created_at: string;
};

export type PhotoRow = {
  id: string;
  storage_path: string;
  guest_name: string | null;
  created_at: string;
};
