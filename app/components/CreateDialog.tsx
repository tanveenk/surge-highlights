"use client";
import { useState } from "react";
import { createHighlight, type Highlight } from "@/lib/api";

export default function CreateDialog({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (h: Highlight) => void;
}) {
  const [form, setForm] = useState({ title: "", location: "", description: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      onCreated(await createHighlight(form));
    } catch {
      setError("Something went wrong. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="w-full max-w-md space-y-3 rounded-xl bg-white p-6">
        <h2 className="text-lg font-semibold">Create highlight</h2>
        <input required placeholder="Title" value={form.title} onChange={set("title")} className="w-full rounded-lg border p-2 text-sm" />
        <input required placeholder="Location" value={form.location} onChange={set("location")} className="w-full rounded-lg border p-2 text-sm" />
        <textarea required placeholder="Description" rows={4} value={form.description} onChange={set("description")} className="w-full rounded-lg border p-2 text-sm" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-lg px-3 py-2 text-sm">Cancel</button>
          <button disabled={submitting} className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-rose-600 disabled:opacity-50">
            {submitting ? "Creating..." : "Create highlight"}
          </button>
        </div>
      </form>
    </div>
  );
}