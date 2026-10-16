"use client";

import { useEffect, useMemo, useState } from "react";
import type { Highlight } from "@/lib/api";
import HighlightCard from "./HighlightCard";
import CreateDialog from "./CreateDialog";

export default function HighlightsSection({ initial }: { initial: Highlight[] }) {
  const [items, setItems] = useState<Highlight[]>(initial);
  const [open, setOpen] = useState(false);
  const [cols, setCols] = useState(3);

  // Sync column count dynamically with the required Figma breakpoints:
  // Mobile: < 788px (1 col)
  // Tablet: 788px - 1279px (2 cols)
  // Desktop: >= 1280px (3 cols)
  useEffect(() => {
    function updateColumns() {
      const width = window.innerWidth;
      if (width < 788) {
        setCols(1);
      } else if (width < 1280) {
        setCols(2);
      } else {
        setCols(3);
      }
    }

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Distribute items across columns to achieve true masonry matching Figma mockup:
  // Row 1: Item 0 (Col 1), Item 1 (Col 2), Item 2 (Col 3)
  // Row 2: Item 3 (Col 1), Item 4 (Col 2), Item 5 (Col 3)
  // Row 3: Item 6 (Col 1), Item 7 (Col 2), Item 8 (Col 3)
  const columns = useMemo(() => {
    const colBuckets: Highlight[][] = Array.from({ length: cols }, () => []);
    items.forEach((item, index) => {
      colBuckets[index % cols].push(item);
    });
    return colBuckets;
  }, [items, cols]);

  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 xl:px-12 py-10 md:py-14">
      {/* Header Section */}
      <header className="max-w-3xl">
        <p className="text-xs font-bold tracking-widest text-[#eb2f37] uppercase">
          Highlights
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-gray-900 tracking-tight leading-tight">
          What are the special moments of your life?
        </h1>
        <p className="mt-3 max-w-xl text-sm text-gray-500 leading-relaxed font-normal">
          We believe every moment counts! Share your favorite highlights, unforgettable memories, and the stories that make your life shine.
        </p>
      </header>

      {/* Masonry Columns Layout */}
      <section
        aria-label="Highlights grid"
        className={`mt-9 grid gap-4 sm:gap-5 items-start ${
          cols === 1
            ? "grid-cols-1"
            : cols === 2
            ? "grid-cols-2"
            : "grid-cols-3"
        }`}
      >
        {columns.map((colItems, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-4 sm:gap-5">
            {colItems.map((h, i) => (
              <HighlightCard
                key={h.id != null ? `${h.id}` : `${h.title}-${colIdx}-${i}`}
                h={h}
              />
            ))}
          </div>
        ))}
      </section>

      {/* Floating Action Button (FAB) matching Figma Interaction */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Create highlight"
        className="fixed bottom-7 right-7 sm:bottom-9 sm:right-9 z-40 flex items-center justify-center rounded-xl bg-[#eb2f37] hover:bg-[#d62828] active:bg-[#b91c1c] px-5 py-2.5 text-sm font-medium text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
      >
        Create +
      </button>

      {/* Create Dialog Modal */}
      {open && (
        <CreateDialog
          onClose={() => setOpen(false)}
          onCreated={(newHighlight) => {
            setItems((prev) => [newHighlight, ...prev]);
            setOpen(false);
          }}
        />
      )}
    </main>
  );
}