"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Search, Pin, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import ExerciseCard from "@/components/ExerciseCard";
import PinExerciseModal from "@/components/PinExerciseModal";
import StatsModal from "@/components/StatsModal";
import ProfileModal from "@/components/ProfileModal";
import { EXERCISES, CATEGORIES, Exercise, ExerciseCategory } from "@/lib/exercises";

export default function ExercisesPage() {
  const user = useQuery(api.users.currentUser);
  const pinnedExercises = useQuery(api.pinnedExercises.list);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | "all">("all");
  const [showAllPills, setShowAllPills] = useState(false);
  const [pinningExercise, setPinningExercise] = useState<Exercise | null>(null);
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

  const needsOnboarding = user !== undefined && user !== null && !user.profile?.onboardingComplete;

  if (user === undefined || pinnedExercises === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statsExercisePinned = statsExercise
    ? pinnedMap.get(statsExercise.id)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      {needsOnboarding && (
        <ProfileModal
          existing={user?.profile}
          onClose={() => {}}
          isOnboarding
        />
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 pb-24 sm:pb-8 page-enter">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Exercise Library</h1>
          <p className="text-gray-500 text-sm">
            Browse exercises, pin them to your library with your working weight.
            {pinnedExercises.length > 0 && (
              <span className="text-emerald-600 ml-2">
                <Pin className="inline w-3 h-3 mr-0.5" />
                {pinnedExercises.length} pinned
              </span>
            )}
          </p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exercises or muscle groups..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 shadow-sm text-sm"
            />
          </div>

          {/* Desktop: single scrolling row */}
          <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                selectedCategory === "all" ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 shadow-sm"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  selectedCategory === cat.id ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 shadow-sm"
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
                    selectedCategory === "all" ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-500"
                  }`}
                >
                  All
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      selectedCategory === cat.id ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-500"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              {/* Fade overlay when collapsed */}
              {!showAllPills && (
                <div className="absolute bottom-0 inset-x-0 h-7 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
              )}
            </div>
            <button
              onClick={() => setShowAllPills((v) => !v)}
              className="mt-1.5 flex items-center gap-1 text-xs text-indigo-500 font-medium"
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
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-4">
            <p className="text-sm text-amber-700">
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
          {filtered.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              pinned={pinnedMap.get(exercise.id) ?? null}
              userWeight={user?.profile?.weight ?? undefined}
              userGender={user?.profile?.gender ?? undefined}
              onPin={(ex) => setPinningExercise(ex)}
              onViewStats={(ex) => {
                if (user?.profile?.weight && user?.profile?.height) {
                  setStatsExercise(ex);
                } else {
                  setShowProfileModal(true);
                }
              }}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            No exercises found for &ldquo;{search}&rdquo;
          </div>
        )}
      </main>

      {pinningExercise && (
        <PinExerciseModal
          exercise={pinningExercise}
          existing={pinnedMap.get(pinningExercise.id) ?? null}

          userWeight={user?.profile?.weight ?? undefined}
          userGender={user?.profile?.gender ?? undefined}
          onClose={() => setPinningExercise(null)}
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
        <ProfileModal
          existing={user?.profile}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
}
