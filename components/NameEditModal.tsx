"use client";

import { useEffect, useState } from "react";

export default function NameEditModal({
  open,
  initialValue,
  onClose,
  onSave,
}: {
  open: boolean;
  initialValue: string;
  onClose: () => void;
  onSave: (name: string) => void;
}) {
  const [input, setInput] = useState(initialValue);

  useEffect(() => {
    if (open) setInput(initialValue);
  }, [open, initialValue]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) {
      onSave(input.trim());
    }
  }

  return (
    <div className="name-modal-overlay" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="name-modal-card"
      >
        <p className="name-modal-title">Jouw naam</p>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Jouw naam"
          className="pill-input w-full px-4 py-3 text-center text-base outline-none focus:ring-2 focus:ring-accent/50"
        />
        <div className="name-modal-actions">
          <button type="button" onClick={onClose} className="name-modal-cancel">
            Annuleren
          </button>
          <button type="submit" disabled={!input.trim()} className="name-modal-save">
            Opslaan
          </button>
        </div>
      </form>
    </div>
  );
}
