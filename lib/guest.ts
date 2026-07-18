"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "vjf_guest_name";

export function getStoredGuestName(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

export function setStoredGuestName(name: string) {
  window.localStorage.setItem(STORAGE_KEY, name.trim());
}

export function useGuestName() {
  const [guestName, setGuestNameState] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setGuestNameState(getStoredGuestName());
    setReady(true);
  }, []);

  const setGuestName = useCallback((name: string) => {
    setStoredGuestName(name);
    setGuestNameState(name.trim());
  }, []);

  return { guestName, setGuestName, ready };
}
