"use client";

import { useEffect, useRef, useState } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on first input and bind ESC key
  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim() || !form.description.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const created = await createHighlight(form);
      onCreated(created);
    } catch {
      setError("Failed to create highlight. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[2px] p-4 transition-all animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-7 shadow-2xl transition-all border border-gray-100"
      >
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h2 id="modal-title" className="text-xl font-bold text-gray-900 tracking-tight">
              Create highlight
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Share a new memory with your community
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="title" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Title
            </label>
            <input
              ref={inputRef}
              id="title"
              required
              placeholder="e.g. Sunset at English Bay"
              value={form.title}
              onChange={set("title")}
              disabled={submitting}
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#eb2f37] focus:ring-2 focus:ring-[#eb2f37]/20 transition disabled:bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Location
            </label>
            <input
              id="location"
              required
              placeholder="e.g. Vancouver, BC"
              value={form.location}
              onChange={set("location")}
              disabled={submitting}
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#eb2f37] focus:ring-2 focus:ring-[#eb2f37]/20 transition disabled:bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              id="description"
              required
              rows={4}
              placeholder="Share what made this moment unforgettable..."
              value={form.description}
              onChange={set("description")}
              disabled={submitting}
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#eb2f37] focus:ring-2 focus:ring-[#eb2f37]/20 transition disabled:bg-gray-50 resize-none"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-100 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-[#eb2f37] hover:bg-[#d62828] active:bg-[#b91c1c] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Creating...</span>
                </>
              ) : (
                "Create highlight"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}