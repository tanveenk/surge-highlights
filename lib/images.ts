export async function getImage(query: string): Promise<string | null> {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&page_size=1&aspect_ratio=wide`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return data.results?.[0]?.url ?? null;
  } catch {
    return null;
  }
}