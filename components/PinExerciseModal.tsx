"use client";

import { useState } from "react";
import { X, Dumbbell } from "lucide-react";
import { Exercise } from "@/lib/exercises";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { adjustedMean } from "@/lib/stats";

type Props = {
  exercise: Exercise;
  existing?: {
    _id: Id<"pinnedExercises">;
    resistance?: number;
    resistanceUnit?: "lbs" | "kg";
    sets?: number;
    reps?: number;
  } | null;
  userWeight?: number;
  userGender?: "male" | "female" | "other";
  onClose: () => void;
};

export default function PinExerciseModal({ exercise, existing, userWeight, userGender, onClose }: Props) {
  const [resistance, setResistance] = useState(existing?.resistance?.toString() ?? "");
  const [unit, setUnit] = useState<"lbs" | "kg">(existing?.resistanceUnit ?? "lbs");
  const [sets, setSets] = useState(existing?.sets?.toString() ?? "3");
  const [reps, setReps] = useState(existing?.reps?.toString() ?? "12");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const pin = useMutation(api.pinnedExercises.pin);

  const gender = userGender === "other" ? "male" : (userGender ?? "male");
  const avgData = exercise.averages[gender];
  const hintAvgLbs = userWeight
    ? Math.round(adjustedMean(avgData.mean, userWeight))
    : avgData.mean;
  const hintAvgKg = Math.round(hintAvgLbs * 0.453592);
  const hintValue = unit === "lbs" ? hintAvgLbs : hintAvgKg;

  const handleSave = async () => {
    const val = resistance ? parseFloat(resistance) : undefined;
    if (val !== undefined && (isNaN(val) || val <= 0)) return;
    const setsVal = sets ? parseInt(sets) : 3;
    const repsVal = reps ? parseInt(reps) : 12;
    setSaving(true);
    try {
      await pin({
        exerciseId: exercise.id,
        resistance: val,
        resistanceUnit: val !== undefined ? unit : undefined,
        sets: setsVal,
        reps: repsVal,
        notes: notes || undefined,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const hasWeight = resistance && parseFloat(resistance) > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="modal-overlay absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="modal-panel relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 w-full sm:max-w-md shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950 rounded-xl">
            <Dumbbell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              {existing?.resistance !== undefined ? "Update Weight" : "Log Weight"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{exercise.name}</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Weight */}
          <div>
            <label className="block text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
              <Dumbbell className="inline w-3.5 h-3.5 mr-1 text-gray-400 dark:text-gray-500" />
              Weight / Resistance
              <span className="text-gray-300 dark:text-gray-600 text-xs font-normal normal-case ml-2">(optional)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={resistance}
                onChange={(e) => setResistance(e.target.value)}
                placeholder={`e.g. ${hintValue}`}
                min="0"
                step="2.5"
                className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 text-sm"
              />
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                {(["lbs", "kg"] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                      unit === u ? "bg-indigo-600 text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            {!hasWeight && (
              <div className="mt-2.5 flex items-start gap-1.5 text-xs bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-800 rounded-lg px-3 py-2">
                <span className="text-amber-500 dark:text-amber-400 flex-shrink-0 font-medium">psst...</span>
                <span className="text-gray-500 dark:text-gray-400">
                  the average is{" "}
                  <span className="text-gray-900 dark:text-gray-100 font-medium">{hintValue} {unit}</span>
                  {avgData.unit === "reps" ? " reps" : ""}.{" "}
                  You can skip this and add it later.
                </span>
              </div>
            )}
          </div>

          {/* Sets × Reps */}
          <div>
            <label className="block text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
              Sets &amp; Reps
              <span className="text-gray-300 dark:text-gray-600 text-xs font-normal normal-case ml-2">(optional)</span>
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  placeholder="3"
                  min="1"
                  max="20"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 pr-12 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500 pointer-events-none">sets</span>
              </div>
              <span className="text-gray-400 dark:text-gray-500 font-bold text-lg">×</span>
              <div className="relative flex-1">
                <input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  placeholder="12"
                  min="1"
                  max="100"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 pr-12 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500 pointer-events-none">reps</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">Used in Schedule view to track set completion.</p>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. use pause reps, maintain neutral wrist..."
              rows={2}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 resize-none text-sm"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium transition-colors text-sm flex items-center justify-center gap-2"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                existing?.resistance !== undefined ? "Update" : "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
