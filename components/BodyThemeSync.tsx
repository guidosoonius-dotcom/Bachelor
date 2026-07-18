"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BodyThemeSync() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.toggle("theme-dark-home", pathname === "/");
  }, [pathname]);

  return null;
}
