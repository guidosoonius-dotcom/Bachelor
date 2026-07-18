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
    <nav className="fixed inset-x-0 bottom-0 z-20 bg-surface/95 backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-5">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 py-2.5 text-xs"
            >
              <span className={active ? "gradient-bg rounded-full p-2" : "p-2"}>
                <Icon
                  size={18}
                  className={active ? "text-white" : "text-muted"}
                  strokeWidth={active ? 2.5 : 2}
                />
              </span>
              <span className={active ? "font-semibold text-foreground" : "text-muted"}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
