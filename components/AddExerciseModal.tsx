"use client";

import { useState, useMemo } from "react";
import { X, Search, Dumbbell, Plus, Check } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { EXERCISES, CATEGORIES, ExerciseCategory, Exercise } from "@/lib/exercises";

type Props = {
  groupId: Id<"workoutGroups">;
  existingExerciseIds: Set<string>;
  onClose: () => void;
};

export default function AddExerciseModal({ groupId, existingExerciseIds, onClose }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | "all">("all");
  const [adding, setAdding] = useState<string | null>(null);
  const addExercise = useMutation(api.workoutGroups.addExerciseByExerciseId);

  const filtered = useMemo(() => {
    return EXERCISES.filter((ex) => {
      const matchSearch =
        !search ||
        ex.name.toLowerCase().includes(search.toLowerCase()) ||
        ex.muscleGroups.some((m) => m.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = selectedCategory === "all" || ex.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [search, selectedCategory]);

  const handleAdd = async (exerciseId: string) => {
    if (existingExerciseIds.has(exerciseId)) return;
    setAdding(exerciseId);
    try {
      await addExercise({ groupId, exerciseId });
      onClose();
    } finally {
      setAdding(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="modal-overlay absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="modal-panel relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm shadow-xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between flex-shrink-0">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Add Exercise</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exercises..."
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-8 pr-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900"
            />
          </div>
          {/* Category filter */}
          <div className="flex gap-1.5 overflow-x-auto pb-0.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? `${cat.color} text-white`
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Exercise list */}
        <div className="p-2 overflow-y-auto flex-1">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-8 px-4">
              No matches for &ldquo;{search}&rdquo;
            </p>
          ) : (
            filtered.map((ex) => {
              const isAlreadyIn = existingExerciseIds.has(ex.id);
              const isAdding = adding === ex.id;
              return (
                <button
                  key={ex.id}
                  onClick={() => handleAdd(ex.id)}
                  disabled={isAdding || isAlreadyIn}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all text-left ${
                    isAlreadyIn
                      ? "border-emerald-100 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950 cursor-default opacity-70"
                      : "border-transparent hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:border-indigo-100 dark:hover:border-indigo-800 disabled:opacity-50"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {(() => {
                        const cat = CATEGORIES.find((c) => c.id === ex.category);
                        return cat ? (
                          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full text-white uppercase tracking-wide flex-shrink-0 ${cat.color}`}>
                            {cat.label}
                          </span>
                        ) : null;
                      })()}
                      <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">{ex.name}</p>
                    </div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">
                      {ex.muscleGroups.slice(0, 2).join(", ")}
                    </p>
                  </div>
                  {isAlreadyIn ? (
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  ) : isAdding ? (
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
