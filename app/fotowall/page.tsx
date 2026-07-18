"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { PhotoRow } from "@/lib/types";
import PhotoUploadForm from "@/components/PhotoUploadForm";
import PhotoGrid from "@/components/PhotoGrid";

export default function FotowallPage() {
  const [photos, setPhotos] = useState<PhotoRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
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
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="heading-script text-4xl">Fotowall</h1>
        <button onClick={load} aria-label="Vernieuwen">
          <RefreshCw size={16} className="text-muted" />
        </button>
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
