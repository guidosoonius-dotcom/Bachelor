import Image from "next/image";
import { supabase, FOTOWALL_BUCKET } from "@/lib/supabase/client";
import { PhotoRow } from "@/lib/types";

export default function PhotoGrid({ photos }: { photos: PhotoRow[] }) {
  if (photos.length === 0) {
    return <p className="text-sm text-muted">Nog geen foto&apos;s, upload de eerste!</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {photos.map((photo) => {
        const { data } = supabase.storage
          .from(FOTOWALL_BUCKET)
          .getPublicUrl(photo.storage_path);
        return (
          <div key={photo.id} className="card relative aspect-square overflow-hidden">
            <Image
              src={data.publicUrl}
              alt={photo.guest_name ?? "Fotowall"}
              fill
              sizes="(max-width: 480px) 50vw, 200px"
              className="object-cover"
              unoptimized
            />
            {photo.guest_name && (
              <span className="absolute bottom-1 left-1 right-1 truncate text-[10px] bg-black/50 rounded px-1.5 py-0.5">
                {photo.guest_name}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
