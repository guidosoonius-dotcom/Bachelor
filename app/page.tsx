"use client";

import { useEffect, useState } from "react";
import { CalendarClock, HelpCircle, ListChecks, Camera, Info, Martini } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useGuestName } from "@/lib/guest";
import { PHOTO_GOAL } from "@/lib/content";
import { latestBachelorQuizJudgements } from "@/lib/bachelorQuiz";
import HomeHeader from "@/components/HomeHeader";
import CountdownHero from "@/components/CountdownHero";
import FeatureTile from "@/components/FeatureTile";
import UpcomingEventCard from "@/components/UpcomingEventCard";
import HomeQuizScoreboard from "@/components/HomeQuizScoreboard";
import TopDareCard from "@/components/TopDareCard";
import PhotoUploaderLeaderboard from "@/components/PhotoUploaderLeaderboard";

const POLL_INTERVAL_MS = 20000;

export default function Home() {
  const { guestName, ready } = useGuestName();
  const [quizRemaining, setQuizRemaining] = useState(0);
  const [daresProgress, setDaresProgress] = useState(0);
  const [photoCount, setPhotoCount] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<
    { question_id: string; guest_name: string; is_correct: boolean }[]
  >([]);
  const [dares, setDares] = useState<{ id: string; text: string }[]>([]);
  const [dareVotes, setDareVotes] = useState<{ dare_id: string; guest_name: string }[]>([]);
  const [photoUploaders, setPhotoUploaders] = useState<{ guest_name: string | null }[]>([]);
  const [shotsCount, setShotsCount] = useState(0);

  useEffect(() => {
    if (!ready) return;

    async function load() {
      const [
        { data: questions },
        { data: answers },
        { data: daresData },
        { data: votes },
        { data: photos },
        { data: bachelorQuizAnswers },
      ] = await Promise.all([
        supabase.from("quiz_questions").select("id"),
        supabase.from("quiz_answers").select("question_id, guest_name, is_correct"),
        supabase.from("dares").select("id, text"),
        supabase.from("dare_votes").select("dare_id, guest_name"),
        supabase.from("photos").select("guest_name"),
        supabase.from("bachelor_quiz_answers").select("question_id, is_correct, created_at"),
      ]);

      const totalQuestions = questions?.length ?? 0;
      const answeredByMe = guestName
        ? new Set(
            (answers ?? [])
              .filter((a) => a.guest_name === guestName)
              .map((a) => a.question_id)
          ).size
        : 0;
      setQuizRemaining(Math.max(0, totalQuestions - answeredByMe));

      const totalDares = daresData?.length ?? 0;
      const votedByMe = guestName
        ? new Set(
            (votes ?? []).filter((v) => v.guest_name === guestName).map((v) => v.dare_id)
          ).size
        : 0;
      setDaresProgress(totalDares === 0 ? 0 : Math.round((votedByMe / totalDares) * 100));

      setPhotoCount(photos?.length ?? 0);
      setQuizAnswers(answers ?? []);
      setDares(daresData ?? []);
      setDareVotes(votes ?? []);
      setPhotoUploaders(photos ?? []);

      const judged = latestBachelorQuizJudgements(bachelorQuizAnswers ?? []);
      setShotsCount([...judged.values()].filter((row) => !row.is_correct).length);
    }

    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [ready, guestName]);

  return (
    <div>
      <HomeHeader />
      <CountdownHero />

      <section className="grid-menu">
        <FeatureTile href="/timeline" label="Programma & locaties" icon={CalendarClock} variant="light" />
        <FeatureTile href="/quiz" label="Quiz" icon={HelpCircle} variant="teal" badge={quizRemaining} />
        <FeatureTile
          href="/opdrachten"
          label="Opdrachten"
          icon={ListChecks}
          variant="light"
          progress={daresProgress}
        />
        <FeatureTile href="/info" label="Praktische info" icon={Info} variant="light" />
        <FeatureTile
          href="/erik-quiz"
          label="Shotjes-quiz voor Erik"
          icon={Martini}
          variant="shot"
          counter={shotsCount > 0 ? `${shotsCount} shotje${shotsCount === 1 ? "" : "s"}` : undefined}
          fullWidth
        />
        <FeatureTile
          href="/fotowall"
          label="Fotowall"
          icon={Camera}
          variant="navy"
          counter={`${photoCount} / ${PHOTO_GOAL}`}
          progress={(photoCount / PHOTO_GOAL) * 100}
          fullWidth
        />
      </section>

      <UpcomingEventCard />
      <HomeQuizScoreboard answers={quizAnswers} />
      <TopDareCard dares={dares} votes={dareVotes} />
      <PhotoUploaderLeaderboard photos={photoUploaders} />
    </div>
  );
}
