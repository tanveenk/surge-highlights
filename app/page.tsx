import { Suspense } from "react";
import { getHighlights } from "@/lib/api";
import HighlightsSection from "./components/HighlightsSection";

async function HighlightsLoader() {
  const initial = await getHighlights().catch(() => []);
  return <HighlightsSection initial={initial} />;
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 xl:px-12 py-10 md:py-14">
          <div className="max-w-3xl animate-pulse">
            <div className="h-3 w-20 bg-red-200 rounded mb-3" />
            <div className="h-8 w-3/4 max-w-lg bg-gray-200 rounded mb-3" />
            <div className="h-4 w-full max-w-md bg-gray-100 rounded" />
          </div>
          <div className="mt-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 animate-pulse">
                <div className="aspect-[16/10] w-full rounded-xl bg-gray-200 mb-3" />
                <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-1/3 bg-gray-100 rounded mb-3" />
                <div className="h-3 w-full bg-gray-100 rounded mb-1" />
                <div className="h-3 w-4/5 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </main>
      }
    >
      <HighlightsLoader />
    </Suspense>
  );
}
