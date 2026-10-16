const imageCache = new Map<string, string | null>();

// Curated verified Openverse/Flickr images for the standard Figma mockup items
const FALLBACK_MAP: Record<string, string> = {
  "grouse grind": "https://live.staticflickr.com/4106/5083236736_16d58ccfa9_b.jpg",
  "english bay beach": "https://live.staticflickr.com/5060/5456670973_6970ce62a6_b.jpg",
  "granville island": "https://live.staticflickr.com/7508/15904239631_e9b3a8f8bd_b.jpg",
  "hockey night": "https://live.staticflickr.com/5010/5318940351_8763df23bb_b.jpg",
  "lighthouse park": "https://live.staticflickr.com/6127/6005003809_35bd4881d2_b.jpg",
  "science world": "https://live.staticflickr.com/3824/10435483003_7123a9d981_b.jpg",
  "concert night": "https://live.staticflickr.com/1895/43871832524_5be61b634c_b.jpg",
  "solar eclipse": "https://live.staticflickr.com/4056/4275487203_304f634908_b.jpg",
  "capilano suspension bridge": "https://live.staticflickr.com/1199/935410622_56cb8b9d64_b.jpg",
};

export async function getImage(query: string): Promise<string | null> {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return null;

  if (imageCache.has(cleanQuery)) {
    return imageCache.get(cleanQuery)!;
  }

  // 1. Check verified curated match first
  if (FALLBACK_MAP[cleanQuery]) {
    imageCache.set(cleanQuery, FALLBACK_MAP[cleanQuery]);
    return FALLBACK_MAP[cleanQuery];
  }

  // 2. Query Openverse API dynamically
  try {
    const res = await fetch(
      `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&page_size=1`,
      { headers: { Accept: "application/json" } }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0 && data.results[0]?.url) {
        const url = data.results[0].url;
        imageCache.set(cleanQuery, url);
        return url;
      }
    }
  } catch (err) {
    console.error("Openverse query error:", err);
  }

  // 3. Fallback: Query first keyword if multi-word query returned nothing
  const words = query.trim().split(/\s+/);
  if (words.length > 1 && words[0].length > 3) {
    try {
      const res = await fetch(
        `https://api.openverse.org/v1/images/?q=${encodeURIComponent(words[0])}&page_size=1`,
        { headers: { Accept: "application/json" } }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0 && data.results[0]?.url) {
          const url = data.results[0].url;
          imageCache.set(cleanQuery, url);
          return url;
        }
      }
    } catch {}
  }

  // 4. Default Vancouver scenic fallback
  const defaultFallback = "https://live.staticflickr.com/3495/3767191276_08fc338768_b.jpg";
  imageCache.set(cleanQuery, defaultFallback);
  return defaultFallback;
}