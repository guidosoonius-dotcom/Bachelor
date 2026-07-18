import Image from "next/image";
import { BACHELOR_AVATAR_SRC } from "@/lib/content";

export default function BachelorAvatar({ size = 72 }: { size?: number }) {
  return (
    <div className="inline-flex shrink-0" style={{ width: size, height: size }}>
      <Image
        src={BACHELOR_AVATAR_SRC}
        alt="De bachelor"
        width={size}
        height={size}
        className="h-full w-full rounded-full border-[3px] border-secondary object-cover"
      />
    </div>
  );
}
