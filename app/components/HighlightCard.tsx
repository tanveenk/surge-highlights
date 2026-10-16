"use client";
import { useEffect, useState } from "react";
import { getImage } from "@/lib/images";
import type { Highlight } from "@/lib/api";

export default function HighlightCard({ h }: { h: Highlight }) {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getImage(h.title).then(async (s) => {
      setSrc(s ?? (await getImage("vancouver")));
      setLoading(false);
    });
  }, [h.title]);

  return (
    <div className="mb-4 break-inside-avoid rounded-xl bg-white p-3 shadow-sm">
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
        {loading ? (
          <div className="h-full w-full animate-pulse bg-gray-300" />
        ) : (
          src && <img src={src} alt={h.title} className="h-full w-full object-cover" />
        )}
      </div>
      <h3 className="mt-2 text-sm font-semibold">{h.title}</h3>
      <p className="text-xs text-gray-500">{h.location}</p>
      <p className="mt-1 line-clamp-3 text-xs text-gray-700">{h.description}</p>
    </div>
  );
}