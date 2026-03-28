import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getForDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return ctx.db
      .query("workoutSessions")
      .withIndex("by_user_date", (q) => q.eq("userId", userId).eq("date", args.date))
      .collect();
  },
});

export const saveProgress = mutation({
  args: {
    date: v.string(),
    workoutGroupExerciseId: v.id("workoutGroupExercises"),
    completedSets: v.array(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("workoutSessions")
      .withIndex("by_user_exercise_date", (q) =>
        q.eq("userId", userId)
          .eq("workoutGroupExerciseId", args.workoutGroupExerciseId)
          .eq("date", args.date)
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { completedSets: args.completedSets });
    } else {
      await ctx.db.insert("workoutSessions", {
        userId,
        date: args.date,
        workoutGroupExerciseId: args.workoutGroupExerciseId,
        completedSets: args.completedSets,
      });
    }
  },
});

export const getHistory = query({
  args: { days: v.number() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    // Build date strings for the last N days
    const dates: string[] = [];
    for (let i = 0; i < args.days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().slice(0, 10));
    }

    // Fetch sessions for each date
    const results = await Promise.all(
      dates.map(async (date) => {
        const sessions = await ctx.db
          .query("workoutSessions")
          .withIndex("by_user_date", (q) => q.eq("userId", userId).eq("date", date))
          .collect();

        const enriched = await Promise.all(
          sessions.map(async (s) => {
            const ge = await ctx.db.get(s.workoutGroupExerciseId);
            if (!ge) return null;
            const pinned = await ctx.db.get(ge.pinnedExerciseId);
            if (!pinned) return null;
            const group = await ctx.db.get(ge.groupId);
            return {
              sessionId: s._id,
              exerciseId: pinned.exerciseId,
              groupTitle: group?.title ?? "Unknown",
              completedSets: s.completedSets,
            };
          })
        );

        return { date, sessions: enriched.filter((e): e is NonNullable<typeof e> => e !== null) };
      })
    );

    return results;
  },
});
