"use client";

import { useState, useMemo } from "react";
import { X, Search, Dumbbell, Plus } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getExercise } from "@/lib/exercises";

type PinnedExercise = {
  _id: Id<"pinnedExercises">;
  exerciseId: string;
  resistance?: number;
  resistanceUnit?: "lbs" | "kg";
  sets?: number;
  reps?: number;
};

type Props = {
  groupId: Id<"workoutGroups">;
  pinnedExercises: PinnedExercise[];
  onClose: () => void;
};

export default function AddExerciseModal({ groupId, pinnedExercises, onClose }: Props) {
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState<string | null>(null);
  const addExercise = useMutation(api.workoutGroups.addExercise);

  const filtered = useMemo(() => {
    return pinnedExercises.filter((pe) => {
      const ex = getExercise(pe.exerciseId);
      if (!ex) return false;
      if (!search) return true;
      return (
        ex.name.toLowerCase().includes(search.toLowerCase()) ||
        ex.muscleGroups.some((m) => m.toLowerCase().includes(search.toLowerCase()))
      );
    });
  }, [pinnedExercises, search]);

  const handleAdd = async (pinnedId: Id<"pinnedExercises">) => {
    setAdding(pinnedId);
    try {
      await addExercise({ groupId, pinnedExerciseId: pinnedId });
      onClose();
    } finally {
      setAdding(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="modal-overlay absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="modal-panel relative bg-white border border-gray-100 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm shadow-xl">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-sm">Add Exercise</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your pinned exercises..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Exercise list */}
        <div className="p-2 max-h-72 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8 px-4">
              {pinnedExercises.length === 0
                ? "No pinned exercises yet. Pin exercises from the Exercise Library first."
                : `No matches for "${search}"`}
            </p>
          ) : (
            filtered.map((pe) => {
              const ex = getExercise(pe.exerciseId);
              if (!ex) return null;
              const isAdding = adding === pe._id;
              return (
                <button
                  key={pe._id}
                  onClick={() => handleAdd(pe._id)}
                  disabled={isAdding}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all text-left disabled:opacity-50"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{ex.name}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      {pe.resistance !== undefined && (
                        <span className="text-[10px] text-emerald-600 flex items-center gap-1">
                          <Dumbbell className="w-2.5 h-2.5" />
                          {pe.resistance} {pe.resistanceUnit ?? "lbs"}
                        </span>
                      )}
                      <span className="text-[10px] text-indigo-600 font-medium">
                        {pe.sets ?? 3} sets × {pe.reps ?? "—"} reps
                      </span>
                    </div>
                  </div>
                  {isAdding ? (
                    <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
