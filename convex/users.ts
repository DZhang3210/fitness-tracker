import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const user = await ctx.db.get(userId);
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    return { ...user, profile };
  },
});

export const upsertProfile = mutation({
  args: {
    height: v.optional(v.number()),
    weight: v.optional(v.number()),
    gender: v.optional(v.union(v.literal("male"), v.literal("female"), v.literal("other"))),
    heightUnit: v.optional(v.union(v.literal("cm"), v.literal("ft"))),
    weightUnit: v.optional(v.union(v.literal("kg"), v.literal("lbs"))),
    onboardingComplete: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        onboardingComplete: args.onboardingComplete ?? existing.onboardingComplete,
      });
    } else {
      await ctx.db.insert("userProfiles", {
        userId,
        height: args.height,
        weight: args.weight,
        gender: args.gender,
        heightUnit: args.heightUnit ?? "cm",
        weightUnit: args.weightUnit ?? "kg",
        onboardingComplete: args.onboardingComplete ?? false,
      });
    }
  },
});
