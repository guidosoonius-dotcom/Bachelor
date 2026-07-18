"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarClock, HelpCircle, ListChecks, Camera } from "lucide-react";

const ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/timeline", label: "Programma", icon: CalendarClock },
  { href: "/quiz", label: "Quiz", icon: HelpCircle },
  { href: "/opdrachten", label: "Opdrachten", icon: ListChecks },
  { href: "/fotowall", label: "Foto's", icon: Camera },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 border-t border-border bg-surface/95 backdrop-blur">
      <div className="max-w-md mx-auto grid grid-cols-5">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 py-2.5 text-xs"
            >
              <Icon
                size={20}
                className={active ? "text-accent-pink" : "text-muted"}
                strokeWidth={active ? 2.5 : 2}
              />
              <span className={active ? "gradient-text font-medium" : "text-muted"}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
