"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { supabase, FOTOWALL_BUCKET } from "@/lib/supabase/client";
import { useGuestName } from "@/lib/guest";

const MAX_SIZE_BYTES = 8 * 1024 * 1024;

export default function PhotoUploadForm({ onUploaded }: { onUploaded: () => void }) {
  const { guestName } = useGuestName();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Alleen afbeeldingen zijn toegestaan.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("Bestand is te groot (max 8MB).");
      return;
    }
    setUploading(true);
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const path = `${crypto.randomUUID()}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from(FOTOWALL_BUCKET)
      .upload(path, file);

    if (uploadError) {
      setError("Uploaden mislukt, probeer het opnieuw.");
      setUploading(false);
      return;
    }

    await supabase
      .from("photos")
      .insert({ storage_path: path, guest_name: guestName });

    setUploading(false);
    onUploaded();
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-bold text-white shadow-subtle transition-transform active:scale-95 disabled:opacity-50"
      >
        <Upload size={18} />
        {uploading ? "Uploaden..." : "Foto toevoegen"}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
