import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

/**
 * Seeds 3 workout groups for the authenticated user.
 * Run once via: npx convex run seedWorkouts:seedWorkouts
 */
export const seedWorkouts = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated — sign in first, then run this seed.");

    const groups = [
      {
        title: "Upper Body (Day 1 & 4)",
        daysOfWeek: [1, 4], // Mon, Thu
        color: "bg-indigo-500",
        exerciseIds: [
          "decline-pushup",
          "pull-up",
          "chest-dip",
          "archer-pushup",
          "plank-to-pushup",
        ],
      },
      {
        title: "Lower Body & Core (Day 2 & 3)",
        daysOfWeek: [2, 3], // Tue, Wed
        color: "bg-emerald-500",
        exerciseIds: [
          "pistol-squat",
          "bulgarian-split-squat",
          "single-leg-glute-bridge",
          "standing-calf-raise",
          "hanging-leg-raise",
          "windshield-wipers",
        ],
      },
      {
        title: "Skill Training",
        daysOfWeek: [6], // Sat
        color: "bg-amber-500",
        exerciseIds: [
          "handstand-hold",
          "l-sit",
          "muscle-up",
        ],
      },
    ];

    const existing = await ctx.db
      .query("workoutGroups")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    let orderOffset = existing.length;

    for (const groupDef of groups) {
      // Skip if a group with this title already exists
      const alreadyExists = existing.find((g) => g.title === groupDef.title);
      if (alreadyExists) {
        console.log(`Skipping "${groupDef.title}" — already exists.`);
        continue;
      }

      const groupId = await ctx.db.insert("workoutGroups", {
        userId,
        title: groupDef.title,
        daysOfWeek: groupDef.daysOfWeek,
        order: orderOffset++,
        color: groupDef.color,
      });

      for (let i = 0; i < groupDef.exerciseIds.length; i++) {
        const exerciseId = groupDef.exerciseIds[i];

        // Find or create the pinnedExercise entry
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

      console.log(`Created "${groupDef.title}" with ${groupDef.exerciseIds.length} exercises.`);
    }

    return { message: "Seed complete!" };
  },
});
