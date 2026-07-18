import Link from "next/link";
import { LucideIcon } from "lucide-react";

export default function FeatureTile({
  href,
  label,
  icon: Icon,
  fullWidth = false,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  fullWidth?: boolean;
}) {
  return (
    <Link href={href} className="nav-card" style={fullWidth ? { gridColumn: "span 2" } : undefined}>
      <span className="nav-card-icon">
        <Icon size={18} />
      </span>
      <span className="nav-card-title">{label}</span>
    </Link>
  );
}
