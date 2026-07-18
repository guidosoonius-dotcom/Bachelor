import Image from "next/image";
import { BACHELOR_AVATAR_SRC } from "@/lib/content";

export default function BachelorAvatar({ size = 72 }: { size?: number }) {
  return (
    <div
      className="gradient-ring inline-flex shrink-0"
      style={{ width: size, height: size }}
    >
      <Image
        src={BACHELOR_AVATAR_SRC}
        alt="De bachelor"
        width={size}
        height={size}
        className="rounded-full object-cover w-full h-full border-2 border-background"
      />
    </div>
  );
}
