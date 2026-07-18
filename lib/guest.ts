"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "vjf_guest_name";
const CHANGE_EVENT = "vjf-guest-name-change";

export function getStoredGuestName(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

export function setStoredGuestName(name: string) {
  window.localStorage.setItem(STORAGE_KEY, name.trim());
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useGuestName() {
  const [guestName, setGuestNameState] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setGuestNameState(getStoredGuestName());
    setReady(true);

    function handleChange() {
      setGuestNameState(getStoredGuestName());
    }
    window.addEventListener(CHANGE_EVENT, handleChange);
    return () => window.removeEventListener(CHANGE_EVENT, handleChange);
  }, []);

  const setGuestName = useCallback((name: string) => {
    setStoredGuestName(name);
  }, []);

  return { guestName, setGuestName, ready };
}
