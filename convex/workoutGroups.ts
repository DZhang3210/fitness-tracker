import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const groups = await ctx.db
      .query("workoutGroups")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // Fetch exercises for each group
    const groupsWithExercises = await Promise.all(
      groups.map(async (group) => {
        const exercises = await ctx.db
          .query("workoutGroupExercises")
          .withIndex("by_group", (q) => q.eq("groupId", group._id))
          .collect();
        const sortedExercises = exercises.sort((a, b) => a.order - b.order);

        const exercisesWithDetails = await Promise.all(
          sortedExercises.map(async (ge) => {
            const pinned = await ctx.db.get(ge.pinnedExerciseId);
            return { ...ge, pinned };
          })
        );

        return { ...group, exercises: exercisesWithDetails };
      })
    );

    return groupsWithExercises.sort((a, b) => a.order - b.order);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    daysOfWeek: v.array(v.number()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("workoutGroups")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    return await ctx.db.insert("workoutGroups", {
      userId,
      title: args.title,
      daysOfWeek: args.daysOfWeek,
      order: existing.length,
      color: args.color,
    });
  },
});

export const update = mutation({
  args: {
    groupId: v.id("workoutGroups"),
    title: v.optional(v.string()),
    daysOfWeek: v.optional(v.array(v.number())),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const group = await ctx.db.get(args.groupId);
    if (!group || group.userId !== userId) throw new Error("Not found");

    const { groupId, ...updates } = args;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(args.groupId, filteredUpdates);
  },
});

export const remove = mutation({
  args: { groupId: v.id("workoutGroups") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const group = await ctx.db.get(args.groupId);
    if (!group || group.userId !== userId) throw new Error("Not found");

    // Remove all exercises from this group
    const exercises = await ctx.db
      .query("workoutGroupExercises")
      .withIndex("by_group", (q) => q.eq("groupId", args.groupId))
      .collect();
    for (const ex of exercises) {
      await ctx.db.delete(ex._id);
    }
    await ctx.db.delete(args.groupId);
  },
});

export const reorderGroups = mutation({
  args: { orderedIds: v.array(v.id("workoutGroups")) },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    for (let i = 0; i < args.orderedIds.length; i++) {
      const group = await ctx.db.get(args.orderedIds[i]);
      if (group && group.userId === userId) {
        await ctx.db.patch(args.orderedIds[i], { order: i });
      }
    }
  },
});

export const addExercise = mutation({
  args: {
    groupId: v.id("workoutGroups"),
    pinnedExerciseId: v.id("pinnedExercises"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const group = await ctx.db.get(args.groupId);
    if (!group || group.userId !== userId) throw new Error("Not found");

    const existing = await ctx.db
      .query("workoutGroupExercises")
      .withIndex("by_group", (q) => q.eq("groupId", args.groupId))
      .collect();

    // Don't duplicate
    const alreadyIn = existing.find(
      (e) => e.pinnedExerciseId === args.pinnedExerciseId
    );
    if (alreadyIn) return alreadyIn._id;

    return await ctx.db.insert("workoutGroupExercises", {
      groupId: args.groupId,
      userId,
      pinnedExerciseId: args.pinnedExerciseId,
      order: existing.length,
    });
  },
});

export const removeExercise = mutation({
  args: { workoutGroupExerciseId: v.id("workoutGroupExercises") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const ge = await ctx.db.get(args.workoutGroupExerciseId);
    if (!ge || ge.userId !== userId) throw new Error("Not found");
    await ctx.db.delete(args.workoutGroupExerciseId);
  },
});

export const reorderGroupExercises = mutation({
  args: {
    groupId: v.id("workoutGroups"),
    orderedIds: v.array(v.id("workoutGroupExercises")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    for (let i = 0; i < args.orderedIds.length; i++) {
      const ge = await ctx.db.get(args.orderedIds[i]);
      if (ge && ge.userId === userId) {
        await ctx.db.patch(args.orderedIds[i], { order: i });
      }
    }
  },
});

// Get a map of exerciseId -> array of group titles (for exercises in at least one workout)
export const getExerciseWorkoutMap = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const groups = await ctx.db
      .query("workoutGroups")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const result: { exerciseId: string; groupTitle: string }[] = [];

    for (const group of groups) {
      const exercises = await ctx.db
        .query("workoutGroupExercises")
        .withIndex("by_group", (q) => q.eq("groupId", group._id))
        .collect();

      for (const ge of exercises) {
        const pinned = await ctx.db.get(ge.pinnedExerciseId);
        if (pinned) {
          result.push({ exerciseId: pinned.exerciseId, groupTitle: group.title });
        }
      }
    }

    return result;
  },
});

// Add an exercise to a workout group by exerciseId, auto-creating the pinnedExercise if needed
export const addExerciseByExerciseId = mutation({
  args: {
    groupId: v.id("workoutGroups"),
    exerciseId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const group = await ctx.db.get(args.groupId);
    if (!group || group.userId !== userId) throw new Error("Not found");

    // Find or create pinnedExercise record
    let pinnedId = (
      await ctx.db
        .query("pinnedExercises")
        .withIndex("by_user_exercise", (q) =>
          q.eq("userId", userId).eq("exerciseId", args.exerciseId)
        )
        .unique()
    )?._id;

    if (!pinnedId) {
      pinnedId = await ctx.db.insert("pinnedExercises", {
        userId,
        exerciseId: args.exerciseId,
        createdAt: Date.now(),
      });
    }

    const existingInGroup = await ctx.db
      .query("workoutGroupExercises")
      .withIndex("by_group", (q) => q.eq("groupId", args.groupId))
      .collect();

    // Don't duplicate
    const alreadyIn = existingInGroup.find((e) => e.pinnedExerciseId === pinnedId);
    if (alreadyIn) return alreadyIn._id;

    return await ctx.db.insert("workoutGroupExercises", {
      groupId: args.groupId,
      userId,
      pinnedExerciseId: pinnedId,
      order: existingInGroup.length,
    });
  },
});

// Apply a premade routine: pin all exercises (without resistance) and create all groups
export const applyRoutine = mutation({
  args: {
    groups: v.array(
      v.object({
        title: v.string(),
        daysOfWeek: v.array(v.number()),
        exerciseIds: v.array(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("workoutGroups")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    let orderOffset = existing.length;

    for (const groupDef of args.groups) {
      // Create the workout group
      const groupId = await ctx.db.insert("workoutGroups", {
        userId,
        title: groupDef.title,
        daysOfWeek: groupDef.daysOfWeek,
        order: orderOffset++,
      });

      // Pin each exercise if not already pinned, then add to group
      for (let i = 0; i < groupDef.exerciseIds.length; i++) {
        const exerciseId = groupDef.exerciseIds[i];

        let pinnedId = (
          await ctx.db
            .query("pinnedExercises")
            .withIndex("by_user_exercise", (q) =>
              q.eq("userId", userId).eq("exerciseId", exerciseId)
            )
            .unique()
        )?._id;

        if (!pinnedId) {
          pinnedId = await ctx.db.insert("pinnedExercises", {
            userId,
            exerciseId,
            createdAt: Date.now(),
          });
        }

        await ctx.db.insert("workoutGroupExercises", {
          groupId,
          userId,
          pinnedExerciseId: pinnedId,
          order: i,
        });
      }
    }
  },
});
