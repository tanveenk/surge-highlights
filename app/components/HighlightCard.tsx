"use client";

import { useEffect, useState } from "react";
import { getImage } from "@/lib/images";
import type { Highlight } from "@/lib/api";

export default function HighlightCard({ h }: { h: Highlight }) {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getImage(h.title).then((s) => {
      if (active) {
        setSrc(s);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [h.title]);

  return (
    <article className="group flex flex-col rounded-2xl bg-white p-3.5 sm:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-md transition-shadow duration-200 break-inside-avoid">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-100">
        {loading && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}
        {src && (
          <img
            src={src}
            alt={h.title}
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setLoading(false)}
            onError={() => {
              setSrc("https://live.staticflickr.com/3495/3767191276_08fc338768_b.jpg");
            }}
          />
        )}
      </div>

      <div className="flex flex-col mt-3.5">
        <h3 className="text-[15px] font-bold text-gray-900 tracking-tight leading-snug">
          {h.title}
        </h3>
        <p className="mt-0.5 text-xs text-gray-400 font-normal">
          {h.location}
        </p>
        <p className="mt-2.5 text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
          {h.description}
        </p>
      </div>
    </article>
  );
}