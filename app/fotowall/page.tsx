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
        <h1 className="font-display text-3xl font-semibold tracking-tight">Fotowall</h1>
        <button onClick={load} aria-label="Vernieuwen">
          <RefreshCw size={16} className="text-muted" />
        </button>
      </div>
      <PhotoUploadForm onUploaded={load} />
      {loading ? <p className="text-sm text-muted">Laden...</p> : <PhotoGrid photos={photos} />}
    </div>
  );
}
