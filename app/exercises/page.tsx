"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import PageShell from "@/components/PageShell";
import ExerciseCard from "@/components/ExerciseCard";
import PinExerciseModal from "@/components/PinExerciseModal";
import StatsModal from "@/components/StatsModal";
import ProfileModal from "@/components/ProfileModal";
import { EXERCISES, CATEGORIES, Exercise, ExerciseCategory } from "@/lib/exercises";

export default function ExercisesPage() {
  const user = useQuery(api.users.currentUser);
  const pinnedExercises = useQuery(api.pinnedExercises.list);
  const exerciseWorkoutMap = useQuery(api.workoutGroups.getExerciseWorkoutMap);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | "all">("all");
  const [showAllPills, setShowAllPills] = useState(false);
  const [addingWeightExercise, setAddingWeightExercise] = useState<Exercise | null>(null);
  const [statsExercise, setStatsExercise] = useState<Exercise | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const pinnedMap = useMemo(() => {
    const m = new Map<string, { _id: Id<"pinnedExercises">; resistance?: number; resistanceUnit?: "lbs" | "kg"; sets?: number; reps?: number }>();
    if (pinnedExercises) {
      for (const p of pinnedExercises) {
        m.set(p.exerciseId, {
          _id: p._id,
          resistance: p.resistance ?? undefined,
          resistanceUnit: p.resistanceUnit ?? undefined,
          sets: p.sets ?? undefined,
          reps: p.reps ?? undefined,
        });
      }
    }
    return m;
  }, [pinnedExercises]);

  // Map exerciseId -> workout group names
  const workoutNamesMap = useMemo(() => {
    const m = new Map<string, string[]>();
    if (exerciseWorkoutMap) {
      for (const { exerciseId, groupTitle } of exerciseWorkoutMap) {
        const existing = m.get(exerciseId) ?? [];
        existing.push(groupTitle);
        m.set(exerciseId, existing);
      }
    }
    return m;
  }, [exerciseWorkoutMap]);

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

  // Sort: exercises in a workout come first
  const sortedFiltered = useMemo(() => {
    const inWorkout = filtered.filter((ex) => workoutNamesMap.has(ex.id));
    const notInWorkout = filtered.filter((ex) => !workoutNamesMap.has(ex.id));
    return [...inWorkout, ...notInWorkout];
  }, [filtered, workoutNamesMap]);

  const needsOnboarding = user !== undefined && user !== null && !user.profile?.onboardingComplete;

  if (user === undefined || pinnedExercises === undefined || exerciseWorkoutMap === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statsExercisePinned = statsExercise
    ? pinnedMap.get(statsExercise.id)
    : null;

  return (
    <PageShell user={user}>
      {needsOnboarding && (
        <ProfileModal existing={user?.profile} onClose={() => {}} isOnboarding />
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 pb-24 sm:pb-8 page-enter">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Exercise Library</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Browse exercises and log your working weight to see your strength percentile.
          </p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exercises or muscle groups..."
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl pl-9 pr-4 py-2.5 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 shadow-sm text-sm"
            />
          </div>

          {/* Desktop: single scrolling row */}
          <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                selectedCategory === "all" ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  selectedCategory === cat.id ? `${cat.color} text-white shadow-sm` : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Mobile: wrapping grid, collapsed to 2 rows with fade */}
          <div className="sm:hidden">
            <div className="relative">
              <div
                className={`flex flex-wrap gap-1.5 transition-all ${showAllPills ? "" : "max-h-[76px] overflow-hidden"}`}
              >
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    selectedCategory === "all" ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  All
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      selectedCategory === cat.id ? `${cat.color} text-white` : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              {!showAllPills && (
                <div className="absolute bottom-0 inset-x-0 h-7 bg-gradient-to-t from-gray-50 dark:from-gray-950 to-transparent pointer-events-none" />
              )}
            </div>
            <button
              onClick={() => setShowAllPills((v) => !v)}
              className="mt-1.5 flex items-center gap-1 text-xs text-indigo-500 dark:text-indigo-400 font-medium"
            >
              {showAllPills ? (
                <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
              ) : (
                <><ChevronDown className="w-3.5 h-3.5" /> Show all filters</>
              )}
            </button>
          </div>
        </div>

        {/* No profile warning */}
        {!user?.profile?.weight && (
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center justify-between gap-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Add your height & weight to unlock strength percentile stats for each exercise.
            </p>
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex-shrink-0 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Set up profile
            </button>
          </div>
        )}

        {/* Exercise grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedFiltered.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              pinned={pinnedMap.get(exercise.id) ?? null}
              userWeight={user?.profile?.weight ?? undefined}
              userGender={user?.profile?.gender ?? undefined}
              onAddWeight={(ex) => setAddingWeightExercise(ex)}
              onViewStats={(ex) => {
                if (user?.profile?.weight && user?.profile?.height) {
                  setStatsExercise(ex);
                } else {
                  setShowProfileModal(true);
                }
              }}
              workoutGroupNames={workoutNamesMap.get(exercise.id)}
            />
          ))}
        </div>

        {sortedFiltered.length === 0 && (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            No exercises found for &ldquo;{search}&rdquo;
          </div>
        )}
      </main>

      {addingWeightExercise && (
        <PinExerciseModal
          exercise={addingWeightExercise}
          existing={pinnedMap.get(addingWeightExercise.id) ?? null}
          userWeight={user?.profile?.weight ?? undefined}
          userGender={user?.profile?.gender ?? undefined}
          onClose={() => setAddingWeightExercise(null)}
        />
      )}

      {statsExercise && statsExercisePinned && statsExercisePinned.resistance !== undefined && user?.profile?.weight && user?.profile?.height && (
        <StatsModal
          exercise={statsExercise}
          resistance={statsExercisePinned.resistance}
          resistanceUnit={statsExercisePinned.resistanceUnit ?? "lbs"}
          userWeight={user.profile.weight}
          userHeight={user.profile.height}
          userGender={user.profile.gender ?? "male"}
          onClose={() => setStatsExercise(null)}
        />
      )}

      {showProfileModal && (
        <ProfileModal existing={user?.profile} onClose={() => setShowProfileModal(false)} />
      )}
    </PageShell>
  );
}
