"use client";

import { useMemo } from "react";
import { X, CheckCircle2, Moon, Dumbbell, ChevronRight, Calendar } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getExercise } from "@/lib/exercises";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(year, month - 1, day);
  const diffDays = Math.round((today.getTime() - target.getTime()) / 86400000);

  const dayName = DAY_NAMES[d.getDay()];
  const monthStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  if (diffDays === 0) return { label: "Today", sub: monthStr, dayName };
  if (diffDays === 1) return { label: "Yesterday", sub: monthStr, dayName };
  return { label: dayName, sub: monthStr, dayName };
}

type Props = { onClose: () => void };

export default function ScheduleHistoryModal({ onClose }: Props) {
  const history = useQuery(api.workoutSessions.getHistory, { days: 28 });
  const workoutGroups = useQuery(api.workoutGroups.list);

  const scheduledDays = useMemo(() => {
    const set = new Set<number>();
    for (const g of workoutGroups ?? []) {
      for (const d of g.daysOfWeek) set.add(d);
    }
    return set;
  }, [workoutGroups]);

  const isLoading = history === undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="modal-overlay absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="modal-panel relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md shadow-xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950 rounded-xl">
              <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Workout History</h2>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">Last 28 days</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-2">
              {history.map(({ date, sessions }) => {
                const { label, sub } = formatDate(date);
                const [year, month, day] = date.split("-").map(Number);
                const d = new Date(year, month - 1, day);
                const dayOfWeek = d.getDay();
                const isScheduled = scheduledDays.has(dayOfWeek);
                const hasActivity = sessions.length > 0;
                const allSetsTotal = sessions.reduce((sum, s) => sum + s.completedSets.length, 0);
                const doneSetsTotal = sessions.reduce(
                  (sum, s) => sum + s.completedSets.filter(Boolean).length,
                  0
                );

                let status: "done" | "partial" | "skipped" | "rest";
                if (hasActivity && doneSetsTotal === allSetsTotal && allSetsTotal > 0) {
                  status = "done";
                } else if (hasActivity && doneSetsTotal > 0) {
                  status = "partial";
                } else if (isScheduled && !hasActivity) {
                  status = "skipped";
                } else {
                  status = "rest";
                }

                return (
                  <div
                    key={date}
                    className={`rounded-xl border p-3 ${
                      status === "done"
                        ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30"
                        : status === "partial"
                        ? "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/30"
                        : status === "skipped"
                        ? "border-red-100 dark:border-red-900 bg-red-50/30 dark:bg-red-950/20"
                        : "border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {status === "done" && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        )}
                        {status === "partial" && (
                          <div className="w-4 h-4 rounded-full border-2 border-amber-400 flex-shrink-0" />
                        )}
                        {status === "skipped" && (
                          <div className="w-4 h-4 rounded-full border-2 border-red-300 dark:border-red-600 flex-shrink-0" />
                        )}
                        {status === "rest" && (
                          <Moon className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                        )}

                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{label}</span>
                            <span className="text-[10px] text-gray-400 dark:text-gray-500">{sub}</span>
                          </div>
                          <p
                            className={`text-[10px] font-medium ${
                              status === "done"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : status === "partial"
                                ? "text-amber-600 dark:text-amber-400"
                                : status === "skipped"
                                ? "text-red-400 dark:text-red-500"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            {status === "done" && `All done · ${doneSetsTotal} sets`}
                            {status === "partial" && `${doneSetsTotal}/${allSetsTotal} sets`}
                            {status === "skipped" && "Scheduled · missed"}
                            {status === "rest" && "Rest day"}
                          </p>
                        </div>
                      </div>

                      {hasActivity && (
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
                      )}
                    </div>

                    {hasActivity && (
                      <div className="mt-2.5 pl-6 space-y-1.5">
                        {Object.entries(
                          sessions.reduce<Record<string, typeof sessions>>((acc, s) => {
                            (acc[s.groupTitle] ??= []).push(s);
                            return acc;
                          }, {})
                        ).map(([groupTitle, groupSessions]) => (
                          <div key={groupTitle}>
                            <p className="text-[9px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
                              {groupTitle}
                            </p>
                            {groupSessions.map((s) => {
                              const ex = getExercise(s.exerciseId);
                              const done = s.completedSets.filter(Boolean).length;
                              const total = s.completedSets.length;
                              if (!ex) return null;
                              return (
                                <div
                                  key={s.sessionId}
                                  className="flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 rounded-lg px-2 py-1"
                                >
                                  <Dumbbell className="w-2.5 h-2.5 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                                  <span className="text-[10px] text-gray-700 dark:text-gray-300 flex-1 truncate">
                                    {ex.name}
                                  </span>
                                  <span
                                    className={`text-[10px] font-medium flex-shrink-0 ${
                                      done === total ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                                    }`}
                                  >
                                    {done}/{total}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
