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
  const hasProgress = progress !== undefined;

  return (
    <Link
      href={href}
      className={`nav-card nav-card-${variant}${variant === "light" ? " wave-texture" : ""}`}
      style={fullWidth ? { gridColumn: "span 2" } : undefined}
    >
      <span className="icon-box">
        <Icon size={18} />
      </span>

      {hasProgress && (
        <div className="card-progress-wrapper">
          {counter && <div className="progress-info">{counter}</div>}
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}

      <p className="card-title">{label}</p>

      {badge !== undefined && badge > 0 && <span className="badge-count">{badge}</span>}
    </Link>
  );
}
