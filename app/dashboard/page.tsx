"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  pointerWithin,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, Dumbbell, LayoutDashboard, GripVertical } from "lucide-react";
import PageShell from "@/components/PageShell";
import WorkoutGroupCard from "@/components/WorkoutGroupCard";
import CreateGroupModal from "@/components/CreateGroupModal";
import ProfileModal from "@/components/ProfileModal";
import { getExercise } from "@/lib/exercises";

export default function DashboardPage() {
  const user = useQuery(api.users.currentUser);
  const workoutGroups = useQuery(api.workoutGroups.list);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);

  const reorderGroups = useMutation(api.workoutGroups.reorderGroups);
  const reorderGroupExercises = useMutation(api.workoutGroups.reorderGroupExercises);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function collisionDetection(args: Parameters<typeof closestCenter>[0]) {
    const pointerHits = pointerWithin(args);
    if (pointerHits.length > 0) return pointerHits;
    return closestCenter(args);
  }

  const needsOnboarding =
    user !== undefined && user !== null && !user.profile?.onboardingComplete;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
    setActiveType(event.active.data.current?.type ?? null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    setActiveType(null);
    if (!over || !workoutGroups) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type === "group" && overData?.type === "group") {
      const oldIndex = workoutGroups.findIndex((g) => g._id === active.id);
      const newIndex = workoutGroups.findIndex((g) => g._id === over.id);
      if (oldIndex !== newIndex) {
        const reordered = arrayMove(workoutGroups, oldIndex, newIndex);
        await reorderGroups({ orderedIds: reordered.map((g) => g._id) });
      }
      return;
    }

    if (activeData?.type === "exercise" && overData?.type === "exercise") {
      const groupId = activeData.groupId;
      if (groupId === overData.groupId) {
        const group = workoutGroups.find((g) => g._id === groupId);
        if (!group) return;
        const oldIdx = group.exercises.findIndex((e) => e._id === active.id);
        const newIdx = group.exercises.findIndex((e) => e._id === over.id);
        if (oldIdx !== newIdx) {
          const reordered = arrayMove(group.exercises, oldIdx, newIdx);
          await reorderGroupExercises({
            groupId,
            orderedIds: reordered.map((e) => e._id),
          });
        }
      }
    }
  }

  const activeGroup = activeType === "group"
    ? workoutGroups?.find((g) => g._id === activeId)
    : null;

  const activeExercise = activeType === "exercise"
    ? (() => {
        for (const g of workoutGroups ?? []) {
          const ge = g.exercises.find((e) => e._id === activeId);
          if (ge) return ge;
        }
        return null;
      })()
    : null;

  if (user === undefined || workoutGroups === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <PageShell user={user}>
      {needsOnboarding && (
        <ProfileModal existing={user?.profile} onClose={() => {}} isOnboarding />
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 pb-24 sm:pb-8 page-enter">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              My Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Organize your workout routines and track your exercises
            </p>
          </div>
          <button
            onClick={() => setShowCreateGroup(true)}
            className="self-start flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            New Group
          </button>
        </div>

        {workoutGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl mb-6 shadow-sm">
              <Dumbbell className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No workout groups yet</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-sm">
              Create workout groups to organize your exercises by day or routine. Browse exercises
              to pin them to your library first.
            </p>
            <button
              onClick={() => setShowCreateGroup(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Create your first group
            </button>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={collisionDetection}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={workoutGroups.map((g) => g._id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {workoutGroups.map((group) => (
                  <WorkoutGroupCard key={group._id} group={group} />
                ))}
              </div>
            </SortableContext>

            <DragOverlay dropAnimation={null}>
              {activeGroup && (
                <div className="bg-white dark:bg-gray-900 border-2 border-indigo-400 rounded-2xl p-3 shadow-2xl rotate-1 opacity-95 w-64">
                  <div className="flex items-center gap-2 mb-2">
                    <GripVertical className="w-4 h-4 text-indigo-400" />
                    <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">{activeGroup.title}</p>
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 ml-6">
                    {activeGroup.exercises.length} exercise{activeGroup.exercises.length !== 1 ? "s" : ""}
                  </p>
                </div>
              )}
              {activeExercise && activeExercise.pinned && (() => {
                const ex = getExercise(activeExercise.pinned.exerciseId);
                if (!ex) return null;
                return (
                  <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border-2 border-indigo-400 rounded-xl p-2.5 shadow-2xl rotate-1 opacity-95 w-52">
                    <GripVertical className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">{ex.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {activeExercise.pinned.resistance !== undefined && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                            {activeExercise.pinned.resistance} {activeExercise.pinned.resistanceUnit ?? "lbs"}
                          </span>
                        )}
                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                          {activeExercise.pinned.sets ?? 3}×{activeExercise.pinned.reps ?? "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </DragOverlay>
          </DndContext>
        )}
      </main>

      {showCreateGroup && <CreateGroupModal onClose={() => setShowCreateGroup(false)} />}
    </PageShell>
  );
}
