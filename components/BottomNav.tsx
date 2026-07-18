"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarClock, HelpCircle, ListChecks, Info } from "lucide-react";

const ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/timeline", label: "Programma", icon: CalendarClock },
  { href: "/quiz", label: "Quiz", icon: HelpCircle },
  { href: "/opdrachten", label: "Opdrachten", icon: ListChecks },
  { href: "/info", label: "Info", icon: Info },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} className={`nav-item ${active ? "active" : ""}`}>
            <Icon size={20} className="nav-item-icon" strokeWidth={active ? 2.5 : 2} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
