import Link from "next/link";
import { LucideIcon } from "lucide-react";

export default function FeatureTile({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="card flex flex-col items-center justify-center gap-2 py-6 hover:border-accent-pink/60 transition-colors"
    >
      <span className="gradient-bg rounded-2xl p-3">
        <Icon size={22} className="text-white" />
      </span>
      <span className="text-sm font-medium text-center">{label}</span>
    </Link>
  );
}
