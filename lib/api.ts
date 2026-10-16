const BASE = "https://surgetakehome.vercel.app/api";
const UUID = process.env.NEXT_PUBLIC_UUID || "revenant";

export type Highlight = {
  id?: string | number;
  title: string;
  location: string;
  description: string;
};

export async function getHighlights(): Promise<Highlight[]> {
  const res = await fetch(`${BASE}/getreviews/${UUID}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load highlights");
  const data = await res.json();
  return Array.isArray(data) ? data : data.reviews ?? [];
}

export async function createHighlight(
  body: Pick<Highlight, "title" | "location" | "description">
): Promise<Highlight> {
  const res = await fetch(`${BASE}/postreview/${UUID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to create highlight");
  const result = await res.json();
  if (Array.isArray(result?.data) && result.data.length > 0) {
    return result.data[0];
  }
  return { id: Date.now(), ...body };
}