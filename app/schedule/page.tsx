"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Calendar, Dumbbell, CheckCircle2, Circle, Trophy, Moon, History } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProfileModal from "@/components/ProfileModal";
import ScheduleHistoryModal from "@/components/ScheduleHistoryModal";
import { getExercise } from "@/lib/exercises";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CONFETTI_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316", "#ec4899"];

function toLocalDateString(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// ─── Confetti ─────────────────────────────────────────────────────────────────

interface ConfettiPiece {
  id: number;
  left: string;
  color: string;
  delay: string;
  duration: string;
  size: number;
  isCircle: boolean;
}

function Confetti({ active }: { active: boolean }) {
  const pieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: 90 }, (_, i) => ({
      id: i,
      left: `${(i / 90) * 100 + (Math.sin(i * 1.5) * 3)}%`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: `${(i % 8) * 0.07}s`,
      duration: `${1.4 + (i % 5) * 0.18}s`,
      size: 7 + (i % 5),
      isCircle: i % 4 === 0,
    }));
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.isCircle ? "50%" : "2px",
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

// ─── Set button ───────────────────────────────────────────────────────────────

function SetButton({ index, checked, onToggle }: { index: number; checked: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
        checked
          ? "bg-emerald-500 border-emerald-500 text-white shadow-sm scale-95"
          : "bg-white border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600"
      }`}
    >
      {checked ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
      Set {index + 1}
    </button>
  );
}

// ─── Exercise row ─────────────────────────────────────────────────────────────

function ExerciseRow({
  ge,
  date,
  initialCompleted,
  onComplete,
}: {
  ge: {
    _id: Id<"workoutGroupExercises">;
    pinned?: {
      exerciseId: string;
      resistance?: number;
      resistanceUnit?: "lbs" | "kg";
      sets?: number;
      reps?: number;
    } | null;
  };
  date: string;
  initialCompleted: boolean[];
  onComplete: () => void;
}) {
  const exercise = ge.pinned ? getExercise(ge.pinned.exerciseId) : null;
  const totalSets = ge.pinned?.sets ?? 3;
  const [checked, setChecked] = useState<boolean[]>(initialCompleted);
  const allDone = checked.every(Boolean);

  const saveProgress = useMutation(api.workoutSessions.saveProgress);

  // Sync if the exercise switches (day changes)
  useEffect(() => {
    setChecked(initialCompleted);
  }, [ge._id, date]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = useCallback(
    (i: number) => {
      setChecked((prev) => {
        const next = [...prev];
        next[i] = !next[i];
        const wasAllDone = prev.every(Boolean);
        const nowAllDone = next.every(Boolean);
        // Persist async — don't call setState-during-render
        saveProgress({ date, workoutGroupExerciseId: ge._id, completedSets: next });
        // Fire confetti callback after this render cycle
        if (nowAllDone && !wasAllDone) {
          setTimeout(onComplete, 0);
        }
        return next;
      });
    },
    [date, ge._id, saveProgress, onComplete]
  );

  if (!exercise || !ge.pinned) return null;

  return (
    <div
      className={`bg-white border rounded-2xl p-4 shadow-sm transition-all ${
        allDone
          ? "border-emerald-300 ring-1 ring-emerald-200 bg-emerald-50/30"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm">{exercise.name}</h3>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {exercise.muscleGroups.slice(0, 2).join(" · ")}
          </p>
        </div>
        {allDone && (
          <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-xl flex-shrink-0">
            <Trophy className="w-3.5 h-3.5" />
            Done!
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        {ge.pinned.resistance !== undefined && (
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-2.5 py-1">
            <Dumbbell className="w-3 h-3 text-green-600" />
            <span className="text-green-700 text-xs font-medium">
              {ge.pinned.resistance} {ge.pinned.resistanceUnit ?? "lbs"}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1 bg-indigo-50 border border-indigo-100 rounded-lg px-2.5 py-1">
          <span className="text-indigo-700 text-xs font-medium">
            {totalSets} sets{ge.pinned.reps ? ` × ${ge.pinned.reps} reps` : ""}
          </span>
        </div>
      </div>

      {/* Set checkboxes */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalSets }, (_, i) => (
          <SetButton key={i} index={i} checked={checked[i] ?? false} onToggle={() => toggle(i)} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SchedulePage() {
  const user = useQuery(api.users.currentUser);
  const workoutGroups = useQuery(api.workoutGroups.list);
  const [confettiActive, setConfettiActive] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const today = new Date().getDay();
  const todayDateStr = toLocalDateString(new Date());
  const [selectedDay, setSelectedDay] = useState(today);

  // Compute the ISO date string for the selected day (within this week)
  const selectedDateStr = useMemo(() => {
    const now = new Date();
    const diff = selectedDay - today;
    const target = new Date(now);
    target.setDate(now.getDate() + diff);
    return toLocalDateString(target);
  }, [selectedDay, today]);

  const sessions = useQuery(api.workoutSessions.getForDate, { date: selectedDateStr });

  const needsOnboarding =
    user !== undefined && user !== null && !user.profile?.onboardingComplete;

  const selectedGroups = useMemo(
    () => (workoutGroups ?? []).filter((g) => g.daysOfWeek.includes(selectedDay)),
    [workoutGroups, selectedDay]
  );

  const nextDay = useMemo(() => {
    if (selectedGroups.length > 0) return null;
    for (let offset = 1; offset <= 7; offset++) {
      const d = (selectedDay + offset) % 7;
      if ((workoutGroups ?? []).some((g) => g.daysOfWeek.includes(d))) {
        return { dayName: DAY_NAMES[d], offset };
      }
    }
    return null;
  }, [selectedDay, selectedGroups, workoutGroups]);

  const handleExerciseComplete = useCallback(() => {
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 2500);
  }, []);

  if (user === undefined || workoutGroups === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      <Confetti active={confettiActive} />

      {needsOnboarding && (
        <ProfileModal existing={user?.profile} onClose={() => {}} isOnboarding />
      )}

      <main className="max-w-3xl mx-auto px-4 py-8 pb-24 sm:pb-8 page-enter">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-indigo-600" />
                Schedule
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {DAY_NAMES[selectedDay]}{selectedDay === today ? " · Today" : ""}
              </p>
            </div>
            <button
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
            >
              <History className="w-4 h-4" />
              History
            </button>
          </div>

          {/* Week day selector */}
          <div className="flex gap-1.5">
            {DAY_SHORT.map((d, i) => {
              const hasWorkout = (workoutGroups ?? []).some((g) => g.daysOfWeek.includes(i));
              const isToday = i === today;
              const isSelected = i === selectedDay;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDay(i)}
                  className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-xl text-[10px] font-semibold transition-all ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-sm"
                      : hasWorkout
                      ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  } ${isToday && !isSelected ? "ring-2 ring-emerald-400 ring-dashed" : ""}`}
                >
                  {d[0]}
                  {hasWorkout && (
                    <span
                      className={`w-1 h-1 rounded-full ${isSelected ? "bg-white/70" : "bg-indigo-400"}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {selectedGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-6 bg-white border border-gray-200 rounded-3xl mb-5 shadow-sm">
              <Moon className="w-10 h-10 text-indigo-300 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Rest day</h2>
            <p className="text-gray-400 text-sm max-w-xs">
              No workouts scheduled for {DAY_NAMES[selectedDay]}.
              {nextDay && (
                <> Next session is <span className="text-gray-700 font-medium">{nextDay.dayName}</span>.</>
              )}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {selectedGroups.map((group) => (
              <div key={group._id}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px flex-1 bg-gray-200" />
                  <h2 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    {group.title}
                    <span className="text-gray-400 font-normal">
                      · {group.exercises.length} exercise{group.exercises.length !== 1 ? "s" : ""}
                    </span>
                  </h2>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                {group.exercises.length === 0 ? (
                  <div className="text-center py-6 text-sm text-gray-400 bg-white border border-dashed border-gray-200 rounded-2xl">
                    No exercises in this group yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {group.exercises.map((ge) => {
                      const sessionData = sessions?.find(
                        (s) => s.workoutGroupExerciseId === ge._id
                      );
                      const totalSets = ge.pinned?.sets ?? 3;
                      const initialCompleted = sessionData
                        ? sessionData.completedSets.slice(0, totalSets)
                        : Array(totalSets).fill(false);
                      return (
                        <ExerciseRow
                          key={`${ge._id}-${selectedDateStr}`}
                          ge={ge}
                          date={selectedDateStr}
                          initialCompleted={initialCompleted}
                          onComplete={handleExerciseComplete}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {showProfileModal && (
        <ProfileModal existing={user?.profile} onClose={() => setShowProfileModal(false)} />
      )}
      {showHistory && <ScheduleHistoryModal onClose={() => setShowHistory(false)} />}
    </div>
  );
}
