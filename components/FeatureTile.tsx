import Link from "next/link";
import { LucideIcon } from "lucide-react";

type Variant = "light" | "teal" | "navy";

export default function FeatureTile({
  href,
  label,
  icon: Icon,
  variant = "light",
  badge,
  counter,
  progress,
  fullWidth = false,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  variant?: Variant;
  badge?: number;
  counter?: string;
  progress?: number;
  fullWidth?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`nav-card nav-card-${variant}${variant === "light" ? " wave-texture" : ""}`}
      style={fullWidth ? { gridColumn: "span 2" } : undefined}
    >
      <div className="nav-card-top">
        <span className="nav-card-icon">
          <Icon size={18} />
        </span>
        {badge !== undefined && badge > 0 && <span className="nav-card-badge">{badge}</span>}
      </div>
      <div className="nav-card-bottom">
        <p className="nav-card-title">{label}</p>
        {counter && <p className="nav-card-counter">{counter}</p>}
        {progress !== undefined && (
          <div className="nav-card-progress">
            <div
              className="nav-card-progress-bar"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}
      </div>
    </Link>
  );
}
