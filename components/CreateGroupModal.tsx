"use client";

import { useState } from "react";
import { X, Plus, Zap, PenLine } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import RoutineBrowser from "./RoutineBrowser";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Props = { onClose: () => void };

export default function CreateGroupModal({ onClose }: Props) {
  const [mode, setMode] = useState<"pick" | "custom" | "routine">("pick");
  const [title, setTitle] = useState("");
  const [days, setDays] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);

  const createGroup = useMutation(api.workoutGroups.create);

  const toggleDay = (d: number) =>
    setDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));

  const handleCreate = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      await createGroup({ title: title.trim(), daysOfWeek: days });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  if (mode === "routine") {
    return <RoutineBrowser onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="modal-overlay absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="modal-panel relative bg-white border border-gray-100 rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 w-full sm:max-w-sm shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {mode === "pick" ? (
          <>
            <h2 className="font-semibold text-gray-900 mb-1">Add a Workout</h2>
            <p className="text-xs text-gray-500 mb-5">Start from a premade routine or build your own.</p>

            <div className="space-y-3">
              <button
                onClick={() => setMode("routine")}
                className="w-full flex items-start gap-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl hover:bg-indigo-100/70 hover:border-indigo-300 transition-all text-left group"
              >
                <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors flex-shrink-0">
                  <Zap className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Browse Routines</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Pick from 6 expert-designed plans (PPL, Upper/Lower, Bro Split and more). All exercises are added automatically.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setMode("custom")}
                className="w-full flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 hover:border-gray-300 transition-all text-left group"
              >
                <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors flex-shrink-0">
                  <PenLine className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Custom Group</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Create a blank workout group with your own name and days, then drag exercises into it from the library.
                  </p>
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setMode("pick")}
              className="text-xs text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1 transition-colors"
            >
              ← Back
            </button>
            <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <PenLine className="w-4 h-4 text-gray-400" /> Custom Workout Group
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Group Name</label>
                <input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                  placeholder="e.g. Push Day, Leg Day, Full Body A..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Days of Week</label>
                <div className="flex gap-1">
                  {DAY_LABELS.map((label, d) => (
                    <button
                      key={d}
                      onClick={() => toggleDay(d)}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${
                        days.includes(d)
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                      }`}
                    >
                      {label.slice(0, 2)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setMode("pick")}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors text-sm"
                >
                  Back
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!title.trim() || saving}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium transition-colors text-sm flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Plus className="w-3.5 h-3.5" /> Create</>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
