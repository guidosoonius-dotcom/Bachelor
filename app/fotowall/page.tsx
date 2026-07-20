"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { PhotoRow } from "@/lib/types";
import PhotoUploadForm from "@/components/PhotoUploadForm";
import PhotoGrid from "@/components/PhotoGrid";
import NameEditButton from "@/components/NameEditButton";

const POLL_INTERVAL_MS = 20000;

export default function FotowallPage() {
  const [photos, setPhotos] = useState<PhotoRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const { data } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });
      setPhotos(data ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="heading-script text-4xl">Fotowall</h1>
        <div className="flex items-center gap-3">
          <NameEditButton />
          <button onClick={load} aria-label="Vernieuwen">
            <RefreshCw size={16} className="text-muted" />
          </button>
        </div>
      </div>
      <p className="text-sm text-muted -mt-2">
        Heb jij een leuke foto van of met Erik? Voeg 'm toe aan de fotowall!
      </p>
      <PhotoUploadForm onUploaded={load} />
      <PhotoGrid photos={photos} />
      {loading && <p className="text-sm text-muted">Laden...</p>}
    </div>
  );
}
