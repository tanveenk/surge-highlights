import { NextResponse } from "next/server";

const BASE = "https://surgetakehome.vercel.app/api";
const UUID = process.env.NEXT_PUBLIC_UUID || "revenant";

export async function GET() {
  try {
    const res = await fetch(`${BASE}/getreviews/${UUID}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch reviews from Surge API" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(Array.isArray(data) ? data : data.reviews ?? []);
  } catch (error) {
    console.error("GET /api/highlights error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${BASE}/postreview/${UUID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Surge API error response:", res.status, errText);
      return NextResponse.json(
        { error: "Failed to post review to Surge API" },
        { status: res.status }
      );
    }

    const result = await res.json();
    const createdItem =
      Array.isArray(result?.data) && result.data.length > 0
        ? result.data[0]
        : { id: Date.now(), ...body };

    return NextResponse.json(createdItem);
  } catch (error) {
    console.error("POST /api/highlights error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
