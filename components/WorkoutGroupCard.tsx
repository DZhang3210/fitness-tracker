"use client";

import { useState } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Pencil,
  Trash2,
  X,
  Check,
  Dumbbell,
  Calendar,
  Plus,
} from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getExercise, Exercise } from "@/lib/exercises";
import AddExerciseModal from "./AddExerciseModal";
import PinExerciseModal from "./PinExerciseModal";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const GROUP_COLORS = [
  "border-l-indigo-500",
  "border-l-emerald-500",
  "border-l-violet-500",
  "border-l-amber-500",
  "border-l-pink-500",
  "border-l-blue-500",
  "border-l-teal-500",
  "border-l-rose-500",
];

type PinnedEx = {
  _id: Id<"pinnedExercises">;
  exerciseId: string;
  resistance?: number;
  resistanceUnit?: "lbs" | "kg";
  sets?: number;
  reps?: number;
};

type GroupExercise = {
  _id: Id<"workoutGroupExercises">;
  pinnedExerciseId: Id<"pinnedExercises">;
  order: number;
  pinned?: PinnedEx | null;
};

type Group = {
  _id: Id<"workoutGroups">;
  title: string;
  daysOfWeek: number[];
  order: number;
  color?: string;
  exercises: GroupExercise[];
};

export function SortableExerciseItem({
  ge,
  groupId,
  userWeight,
  userGender,
}: {
  ge: GroupExercise;
  groupId: Id<"workoutGroups">;
  userWeight?: number;
  userGender?: "male" | "female" | "other";
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: ge._id, data: { type: "exercise", groupId } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
    opacity: isDragging ? 0 : 1,
  };

  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const removeExercise = useMutation(api.workoutGroups.removeExercise);
  const exercise = ge.pinned ? getExercise(ge.pinned.exerciseId) : null;

  if (!exercise || !ge.pinned) return null;

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl p-2.5 group/item"
      >
        <button
          {...attributes}
          {...listeners}
          className="p-1 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-900 truncate">{exercise.name}</p>
          <div className="flex items-center gap-2 flex-wrap mt-0.5">
            {ge.pinned.resistance !== undefined && (
              <div className="flex items-center gap-1">
                <Dumbbell className="w-2.5 h-2.5 text-emerald-500" />
                <span className="text-[10px] text-emerald-600 font-medium">
                  {ge.pinned.resistance} {ge.pinned.resistanceUnit ?? "lbs"}
                </span>
              </div>
            )}
            <span className="text-[10px] text-indigo-600 font-medium">
              {ge.pinned.sets ?? 3}×{ge.pinned.reps ?? "—"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-0.5 opacity-0 group-hover/item:opacity-100 transition-all">
          <button
            onClick={() => setEditingExercise(exercise)}
            className="p-1 text-gray-300 hover:text-indigo-500"
          >
            <Pencil className="w-3 h-3" />
          </button>
          <button
            onClick={() => removeExercise({ workoutGroupExerciseId: ge._id })}
            className="p-1 text-gray-300 hover:text-red-500"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {editingExercise && ge.pinned && (
        <PinExerciseModal
          exercise={editingExercise}
          existing={ge.pinned}
          userWeight={userWeight}
          userGender={userGender}
          onClose={() => setEditingExercise(null)}
        />
      )}
    </>
  );
}

function ExerciseDropZone({
  groupId,
  exercises,
  userWeight,
  userGender,
}: {
  groupId: Id<"workoutGroups">;
  exercises: GroupExercise[];
  userWeight?: number;
  userGender?: "male" | "female" | "other";
}) {
  const { setNodeRef } = useDroppable({ id: `exercise-zone-${groupId}` });
  return (
    <div ref={setNodeRef} className="min-h-[8px]">
      <SortableContext
        items={exercises.map((e) => e._id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-1.5">
          {exercises.map((ge) => (
            <SortableExerciseItem
              key={ge._id}
              ge={ge}
              groupId={groupId}
              userWeight={userWeight}
              userGender={userGender}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default function WorkoutGroupCard({ group }: { group: Group }) {
  const colorClass = GROUP_COLORS[group.order % GROUP_COLORS.length];
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(group.title);
  const [days, setDays] = useState<number[]>(group.daysOfWeek);
  const [showAddModal, setShowAddModal] = useState(false);

  const user = useQuery(api.users.currentUser);
  const pinnedExercises = useQuery(api.pinnedExercises.list);

  const updateGroup = useMutation(api.workoutGroups.update);
  const removeGroup = useMutation(api.workoutGroups.remove);

  const userWeight = user?.profile?.weight ?? undefined;
  const userGender = user?.profile?.gender ?? undefined;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: group._id, data: { type: "group" } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
    opacity: isDragging ? 0 : 1,
  };

  const saveEdit = async () => {
    if (title.trim()) {
      await updateGroup({ groupId: group._id, title: title.trim(), daysOfWeek: days });
    }
    setEditing(false);
  };

  const toggleDay = (d: number) => {
    setDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`bg-white border border-gray-200 rounded-2xl overflow-hidden border-l-4 ${colorClass} shadow-sm`}
      >
        {/* Header */}
        <div className="p-3 flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="p-1 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing flex-shrink-0"
          >
            <GripVertical className="w-4 h-4" />
          </button>

          {editing ? (
            <div className="flex-1 flex flex-col gap-2">
              <input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-900 focus:outline-none focus:border-indigo-400 w-full"
              />
              <div className="flex gap-1">
                {DAY_LABELS.map((label, d) => (
                  <button
                    key={d}
                    onClick={() => toggleDay(d)}
                    className={`flex-1 text-[10px] py-1 rounded-md font-medium transition-colors ${
                      days.includes(d)
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    {label[0]}
                  </button>
                ))}
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={saveEdit}
                  className="flex-1 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs text-white flex items-center justify-center gap-1 transition-colors"
                >
                  <Check className="w-3 h-3" /> Save
                </button>
                <button
                  onClick={() => { setEditing(false); setTitle(group.title); setDays(group.daysOfWeek); }}
                  className="flex-1 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs text-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-900 truncate">{group.title}</h3>
                {group.daysOfWeek.length > 0 && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] text-gray-400">
                      {group.daysOfWeek
                        .sort()
                        .map((d) => DAY_LABELS[d])
                        .join(", ")}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => setEditing(true)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => removeGroup({ groupId: group._id })}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Exercises */}
        <div className="px-3 pb-3">
          <ExerciseDropZone
            groupId={group._id}
            exercises={group.exercises}
            userWeight={userWeight}
            userGender={userGender}
          />

          <button
            onClick={() => setShowAddModal(true)}
            className="w-full flex items-center justify-center gap-1.5 mt-2 py-2 text-xs text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl border border-dashed border-indigo-200 hover:border-indigo-300 transition-all"
          >
            <Plus className="w-3 h-3" />
            Add exercise
          </button>

          <p className="text-[10px] text-gray-400 mt-2 text-center">
            {group.exercises.length} exercise{group.exercises.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {showAddModal && (
        <AddExerciseModal
          groupId={group._id}
          pinnedExercises={pinnedExercises ?? []}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </>
  );
}
