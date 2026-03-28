"use client";

import { useState } from "react";
import { X, Zap, ChevronDown, ChevronUp, Check, Dumbbell, Clock, Calendar } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ROUTINES, GOAL_LABELS, LEVEL_LABELS, Routine } from "@/lib/routines";
import { getExercise } from "@/lib/exercises";

type Props = { onClose: () => void };

export default function RoutineBrowser({ onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [applying, setApplying] = useState<string | null>(null);
  const [applied, setApplied] = useState<string | null>(null);
  const [goalFilter, setGoalFilter] = useState<Routine["goal"] | "all">("all");
  const [levelFilter, setLevelFilter] = useState<Routine["level"] | "all">("all");

  const applyRoutine = useMutation(api.workoutGroups.applyRoutine);

  const filtered = ROUTINES.filter((r) => {
    const matchGoal = goalFilter === "all" || r.goal === goalFilter;
    const matchLevel = levelFilter === "all" || r.level === levelFilter;
    return matchGoal && matchLevel;
  });

  const handleApply = async (routine: Routine) => {
    setApplying(routine.id);
    try {
      await applyRoutine({ groups: routine.groups });
      setApplied(routine.id);
      setTimeout(onClose, 900);
    } finally {
      setApplying(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="modal-overlay absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="modal-panel relative bg-white border border-gray-100 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-xl">
              <Zap className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Premade Routines</h2>
              <p className="text-xs text-gray-500">Pick a plan and we&apos;ll set everything up</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filters */}
        <div className="px-5 py-3 border-b border-gray-100 flex gap-2 flex-wrap flex-shrink-0">
          <div className="flex gap-1">
            {(["all", "strength", "hypertrophy", "both", "athletic"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGoalFilter(g)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  goalFilter === g
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                {g === "all" ? "All Goals" : GOAL_LABELS[g].label}
              </button>
            ))}
          </div>
          <div className="w-px bg-gray-200" />
          <div className="flex gap-1">
            {(["all", "beginner", "intermediate", "advanced"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLevelFilter(l)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors capitalize ${
                  levelFilter === l
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                {l === "all" ? "All Levels" : l}
              </button>
            ))}
          </div>
        </div>

        {/* Routine list */}
        <div className="overflow-y-auto flex-1 p-4 space-y-3">
          {filtered.map((routine) => {
            const goalInfo = GOAL_LABELS[routine.goal];
            const levelInfo = LEVEL_LABELS[routine.level];
            const isExpanded = expanded === routine.id;
            const isApplying = applying === routine.id;
            const isApplied = applied === routine.id;

            return (
              <div
                key={routine.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${goalInfo.color}`}>
                          {goalInfo.label}
                        </span>
                        <span className={`text-[10px] font-semibold ${levelInfo.color}`}>
                          {levelInfo.label}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm">{routine.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{routine.description}</p>

                      <div className="flex items-center gap-4 mt-2.5">
                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Calendar className="w-3 h-3" />
                          {routine.daysPerWeek} days/week
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Clock className="w-3 h-3" />
                          ~{routine.estimatedMinutes} min
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Dumbbell className="w-3 h-3" />
                          {routine.groups.reduce((sum, g) => sum + g.exerciseIds.length, 0)} exercises
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleApply(routine)}
                        disabled={!!applying || isApplied}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isApplied
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50"
                        }`}
                      >
                        {isApplying ? (
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : isApplied ? (
                          <><Check className="w-3.5 h-3.5" /> Added!</>
                        ) : (
                          <><Zap className="w-3.5 h-3.5" /> Use This</>
                        )}
                      </button>
                      <button
                        onClick={() => setExpanded(isExpanded ? null : routine.id)}
                        className="px-3 py-1.5 rounded-xl text-[11px] text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-1"
                      >
                        Preview
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-1.5 mt-3 flex-wrap">
                    {routine.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 bg-gray-50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-3 bg-gray-50">
                    {routine.groups.map((group) => (
                      <div key={group.title}>
                        <p className="text-[11px] font-semibold text-gray-600 mb-1.5">{group.title}</p>
                        <div className="grid grid-cols-2 gap-1">
                          {group.exerciseIds.map((id) => {
                            const ex = getExercise(id);
                            return (
                              <div key={id} className="text-[11px] text-gray-500 flex items-center gap-1.5">
                                <div className="w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                                {ex?.name ?? id}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
