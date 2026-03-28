import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return await ctx.db
      .query("pinnedExercises")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const pin = mutation({
  args: {
    exerciseId: v.string(),
    resistance: v.optional(v.number()),
    resistanceUnit: v.optional(v.union(v.literal("lbs"), v.literal("kg"))),
    sets: v.optional(v.number()),
    reps: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("pinnedExercises")
      .withIndex("by_user_exercise", (q) =>
        q.eq("userId", userId).eq("exerciseId", args.exerciseId)
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        resistance: args.resistance,
        resistanceUnit: args.resistanceUnit,
        sets: args.sets,
        reps: args.reps,
        notes: args.notes,
      });
      return existing._id;
    }

    return await ctx.db.insert("pinnedExercises", {
      userId,
      exerciseId: args.exerciseId,
      resistance: args.resistance,
      resistanceUnit: args.resistanceUnit,
      sets: args.sets,
      reps: args.reps,
      notes: args.notes,
      createdAt: Date.now(),
    });
  },
});

// Pin multiple exercises at once without resistance (used when applying a routine)
export const pinMany = mutation({
  args: {
    exerciseIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const results: Record<string, string> = {};

    for (const exerciseId of args.exerciseIds) {
      const existing = await ctx.db
        .query("pinnedExercises")
        .withIndex("by_user_exercise", (q) =>
          q.eq("userId", userId).eq("exerciseId", exerciseId)
        )
        .unique();

      if (existing) {
        results[exerciseId] = existing._id;
      } else {
        const id = await ctx.db.insert("pinnedExercises", {
          userId,
          exerciseId,
          createdAt: Date.now(),
        });
        results[exerciseId] = id;
      }
    }

    return results;
  },
});

export const unpin = mutation({
  args: { pinnedExerciseId: v.id("pinnedExercises") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const pinned = await ctx.db.get(args.pinnedExerciseId);
    if (!pinned || pinned.userId !== userId) throw new Error("Not found");
    const groupExercises = await ctx.db
      .query("workoutGroupExercises")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("pinnedExerciseId"), args.pinnedExerciseId))
      .collect();
    for (const ge of groupExercises) {
      await ctx.db.delete(ge._id);
    }
    await ctx.db.delete(args.pinnedExerciseId);
  },
});

export const updateResistance = mutation({
  args: {
    pinnedExerciseId: v.id("pinnedExercises"),
    resistance: v.optional(v.number()),
    resistanceUnit: v.optional(v.union(v.literal("lbs"), v.literal("kg"))),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const pinned = await ctx.db.get(args.pinnedExerciseId);
    if (!pinned || pinned.userId !== userId) throw new Error("Not found");
    await ctx.db.patch(args.pinnedExerciseId, {
      resistance: args.resistance,
      resistanceUnit: args.resistanceUnit,
    });
  },
});
