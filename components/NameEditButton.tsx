"use client";

import { useState } from "react";
import { useGuestName } from "@/lib/guest";
import NameEditModal from "@/components/NameEditModal";

export default function NameEditButton() {
  const { guestName, setGuestName, ready } = useGuestName();
  const [open, setOpen] = useState(false);

  const initial = ready && guestName ? guestName.charAt(0).toUpperCase() : "?";

  return (
    <>
      <button onClick={() => setOpen(true)} className="name-edit-chip" aria-label="Naam wijzigen">
        {initial}
      </button>
      <NameEditModal
        open={open}
        initialValue={guestName ?? ""}
        onClose={() => setOpen(false)}
        onSave={(value) => {
          setGuestName(value);
          setOpen(false);
        }}
      />
    </>
  );
}
