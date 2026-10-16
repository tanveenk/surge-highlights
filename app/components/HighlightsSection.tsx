"use client";
import { useState } from "react";
import type { Highlight } from "@/lib/api";
import HighlightCard from "./HighlightCard";
import CreateDialog from "/CreateDialog";

export default function HighlightsSection({ initial }: { initial: Highlight[] }) {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(false);

  return (
    <main className="mx-auto max-w-[1280px] px-4 py-10 md:px-8 xl:px-16">
      <p className="text-xs font-medium uppercase tracking-wide text-red-500">Highlights</p>
      <h1 className="mt-1 text-2xl font-semibold md:text-3xl">What are the special moments of your life?</h1>
      <p className="mt-3 max-w-xl text-sm text-gray-600">
        We believe every moment counts! Share your favorite highlights, unforgettable memories, and the stories that make your life shine.
      </p>

      <div className="mt-8 columns-1 gap-4 md:columns-2 xl:columns-3">
        {items.map((h, i) => (
          <HighlightCard key={h.id ?? `${h.title}-${i}`} h={h} />
        ))}
      </div>

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-rose-600"
      >
        Create +
      </button>

      {open && (
        <CreateDialog
          onClose={() => setOpen(false)}
          onCreated={(h) => {
            setItems((prev) => [h, ...prev]);
            setOpen(false);
          }}
        />
      )}
    </main>
  );
}