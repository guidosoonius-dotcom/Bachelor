import Link from "next/link";
import { LucideIcon } from "lucide-react";

export default function FeatureTile({
  href,
  label,
  icon: Icon,
  tileClass,
  variant = "tile",
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  tileClass: string;
  variant?: "tile" | "pill";
}) {
  if (variant === "pill") {
    return (
      <Link
        href={href}
        className={`${tileClass} flex items-center gap-2.5 rounded-full px-5 py-3.5 transition-transform active:scale-[0.97]`}
      >
        <span className="badge-icon inline-flex rounded-full p-1.5">
          <Icon size={16} className="text-white" />
        </span>
        <span className="text-sm font-bold text-white">{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`${tileClass} relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-3xl p-4 transition-transform active:scale-[0.97]`}
    >
      <span className="badge-icon inline-flex w-fit rounded-full p-2">
        <Icon size={18} className="text-white" />
      </span>
      <span className="text-lg font-extrabold leading-tight text-white">{label}</span>
    </Link>
  );
}
