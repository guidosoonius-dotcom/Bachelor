import Image from "next/image";
import { supabase, FOTOWALL_BUCKET } from "@/lib/supabase/client";
import { PhotoRow } from "@/lib/types";
import { FOTOWALL_SEED_PHOTOS } from "@/lib/content";

export default function PhotoGrid({ photos }: { photos: PhotoRow[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {FOTOWALL_SEED_PHOTOS.map((seed) => (
        <div key={seed.src} className="card relative aspect-square overflow-hidden">
          <Image
            src={seed.src}
            alt={seed.alt}
            fill
            sizes="(max-width: 480px) 50vw, 200px"
            className="object-cover"
          />
        </div>
      ))}
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
              <span className="absolute bottom-1 left-1 right-1 truncate rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white">
                {photo.guest_name}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
