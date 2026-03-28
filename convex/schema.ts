import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,

  // Extended user profile
  userProfiles: defineTable({
    userId: v.id("users"),
    height: v.optional(v.number()), // in cm
    weight: v.optional(v.number()), // in kg
    gender: v.optional(v.union(v.literal("male"), v.literal("female"), v.literal("other"))),
    heightUnit: v.optional(v.union(v.literal("cm"), v.literal("ft"))),
    weightUnit: v.optional(v.union(v.literal("kg"), v.literal("lbs"))),
    onboardingComplete: v.boolean(),
  }).index("by_user", ["userId"]),

  // Exercises pinned to a user's library
  pinnedExercises: defineTable({
    userId: v.id("users"),
    exerciseId: v.string(), // references static exercise data
    resistance: v.optional(v.number()), // weight/resistance value (optional)
    resistanceUnit: v.optional(v.union(v.literal("lbs"), v.literal("kg"))),
    sets: v.optional(v.number()),
    reps: v.optional(v.number()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_exercise", ["userId", "exerciseId"]),

  // Workout groups (days/routines on the dashboard)
  workoutGroups: defineTable({
    userId: v.id("users"),
    title: v.string(),
    daysOfWeek: v.array(v.number()), // 0=Sun, 1=Mon, ..., 6=Sat
    order: v.number(),
    color: v.optional(v.string()),
  }).index("by_user", ["userId"]),

  // Exercises within a workout group (ordered)
  workoutGroupExercises: defineTable({
    groupId: v.id("workoutGroups"),
    userId: v.id("users"),
    pinnedExerciseId: v.id("pinnedExercises"),
    order: v.number(),
  })
    .index("by_group", ["groupId"])
    .index("by_user", ["userId"]),

  // Per-exercise set completion, persisted by date
  workoutSessions: defineTable({
    userId: v.id("users"),
    date: v.string(), // "YYYY-MM-DD"
    workoutGroupExerciseId: v.id("workoutGroupExercises"),
    completedSets: v.array(v.boolean()),
  })
    .index("by_user_date", ["userId", "date"])
    .index("by_user_exercise_date", ["userId", "workoutGroupExerciseId", "date"]),
});
