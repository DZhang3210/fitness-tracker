export type RoutineGroup = {
  title: string;
  daysOfWeek: number[]; // 0=Sun … 6=Sat
  exerciseIds: string[];
};

export type Routine = {
  id: string;
  name: string;
  description: string;
  goal: "strength" | "hypertrophy" | "both" | "athletic";
  level: "beginner" | "intermediate" | "advanced";
  daysPerWeek: number;
  estimatedMinutes: number;
  tags: string[];
  groups: RoutineGroup[];
};

export const ROUTINES: Routine[] = [
  {
    id: "beginner-full-body",
    name: "Beginner Full Body",
    description:
      "Three full-body sessions per week hitting every major muscle group. Ideal for those new to lifting — builds a broad strength base before specializing.",
    goal: "both",
    level: "beginner",
    daysPerWeek: 3,
    estimatedMinutes: 50,
    tags: ["Full Body", "3 days", "Beginner Friendly"],
    groups: [
      {
        title: "Full Body A",
        daysOfWeek: [1], // Monday
        exerciseIds: [
          "squat",
          "bench-press",
          "barbell-row",
          "dumbbell-shoulder-press",
          "dumbbell-curl",
          "plank",
        ],
      },
      {
        title: "Full Body B",
        daysOfWeek: [3], // Wednesday
        exerciseIds: [
          "deadlift",
          "incline-db-press",
          "lat-pulldown",
          "lateral-raise",
          "tricep-pushdown",
          "hanging-leg-raise",
        ],
      },
      {
        title: "Full Body C",
        daysOfWeek: [5], // Friday
        exerciseIds: [
          "goblet-squat",
          "push-up",
          "seated-cable-row",
          "overhead-press",
          "hammer-curl",
          "ab-wheel-rollout",
        ],
      },
    ],
  },

  {
    id: "push-pull-legs",
    name: "Push / Pull / Legs",
    description:
      "The most popular intermediate split. Each muscle group gets hit twice per week across six sessions — push muscles (chest/shoulders/triceps), pull muscles (back/biceps), and legs.",
    goal: "hypertrophy",
    level: "intermediate",
    daysPerWeek: 6,
    estimatedMinutes: 70,
    tags: ["PPL", "6 days", "High Volume"],
    groups: [
      {
        title: "Push A",
        daysOfWeek: [1], // Monday
        exerciseIds: [
          "bench-press",
          "incline-db-press",
          "cable-fly",
          "dumbbell-shoulder-press",
          "lateral-raise",
          "tricep-pushdown",
          "skull-crusher",
        ],
      },
      {
        title: "Pull A",
        daysOfWeek: [2], // Tuesday
        exerciseIds: [
          "deadlift",
          "barbell-row",
          "lat-pulldown",
          "seated-cable-row",
          "face-pull",
          "dumbbell-curl",
          "hammer-curl",
        ],
      },
      {
        title: "Legs A",
        daysOfWeek: [3], // Wednesday
        exerciseIds: [
          "squat",
          "romanian-deadlift",
          "leg-press",
          "lying-leg-curl",
          "leg-extension",
          "standing-calf-raise",
        ],
      },
      {
        title: "Push B",
        daysOfWeek: [4], // Thursday
        exerciseIds: [
          "overhead-press",
          "chest-dip",
          "pec-deck",
          "arnold-press",
          "cable-lateral-raise",
          "overhead-tricep-extension",
          "close-grip-bench",
        ],
      },
      {
        title: "Pull B",
        daysOfWeek: [5], // Friday
        exerciseIds: [
          "pull-up",
          "single-arm-db-row",
          "chest-supported-row",
          "t-bar-row",
          "rear-delt-fly",
          "preacher-curl",
          "reverse-curl",
        ],
      },
      {
        title: "Legs B",
        daysOfWeek: [6], // Saturday
        exerciseIds: [
          "bulgarian-split-squat",
          "hack-squat",
          "hip-thrust",
          "lying-leg-curl",
          "goblet-squat",
          "standing-calf-raise",
        ],
      },
    ],
  },

  {
    id: "upper-lower",
    name: "Upper / Lower Split",
    description:
      "Four days per week alternating upper-body and lower-body sessions. A balanced approach that allows good recovery while hitting each muscle group twice weekly.",
    goal: "both",
    level: "intermediate",
    daysPerWeek: 4,
    estimatedMinutes: 60,
    tags: ["Upper/Lower", "4 days", "Balanced"],
    groups: [
      {
        title: "Upper A",
        daysOfWeek: [1], // Monday
        exerciseIds: [
          "bench-press",
          "barbell-row",
          "overhead-press",
          "lat-pulldown",
          "dumbbell-curl",
          "tricep-pushdown",
          "face-pull",
        ],
      },
      {
        title: "Lower A",
        daysOfWeek: [2], // Tuesday
        exerciseIds: [
          "squat",
          "romanian-deadlift",
          "leg-press",
          "lying-leg-curl",
          "standing-calf-raise",
          "plank",
        ],
      },
      {
        title: "Upper B",
        daysOfWeek: [4], // Thursday
        exerciseIds: [
          "incline-db-press",
          "pull-up",
          "dumbbell-shoulder-press",
          "seated-cable-row",
          "hammer-curl",
          "skull-crusher",
          "rear-delt-fly",
        ],
      },
      {
        title: "Lower B",
        daysOfWeek: [5], // Friday
        exerciseIds: [
          "deadlift",
          "bulgarian-split-squat",
          "hack-squat",
          "leg-extension",
          "hip-thrust",
          "hanging-leg-raise",
        ],
      },
    ],
  },

  {
    id: "bro-split",
    name: "Classic Bro Split",
    description:
      "One muscle group per day across five sessions. Lower frequency but higher volume per session. Great for intermediate lifters who enjoy dedicated isolation work.",
    goal: "hypertrophy",
    level: "intermediate",
    daysPerWeek: 5,
    estimatedMinutes: 60,
    tags: ["Bro Split", "5 days", "Isolation Focus"],
    groups: [
      {
        title: "Chest Monday",
        daysOfWeek: [1],
        exerciseIds: [
          "bench-press",
          "incline-db-press",
          "decline-bench-press",
          "cable-fly",
          "pec-deck",
          "chest-dip",
        ],
      },
      {
        title: "Back Tuesday",
        daysOfWeek: [2],
        exerciseIds: [
          "deadlift",
          "barbell-row",
          "lat-pulldown",
          "seated-cable-row",
          "single-arm-db-row",
          "face-pull",
        ],
      },
      {
        title: "Shoulders Wednesday",
        daysOfWeek: [3],
        exerciseIds: [
          "overhead-press",
          "arnold-press",
          "lateral-raise",
          "cable-lateral-raise",
          "rear-delt-fly",
          "upright-row",
          "face-pull",
        ],
      },
      {
        title: "Arms Thursday",
        daysOfWeek: [4],
        exerciseIds: [
          "dumbbell-curl",
          "preacher-curl",
          "hammer-curl",
          "reverse-curl",
          "skull-crusher",
          "tricep-pushdown",
          "overhead-tricep-extension",
          "close-grip-bench",
        ],
      },
      {
        title: "Legs Friday",
        daysOfWeek: [5],
        exerciseIds: [
          "squat",
          "leg-press",
          "romanian-deadlift",
          "lying-leg-curl",
          "leg-extension",
          "standing-calf-raise",
          "hip-thrust",
        ],
      },
    ],
  },

  {
    id: "strength-powerlifting",
    name: "Strength Focus (Big 3)",
    description:
      "Built around the squat, bench press, and deadlift with targeted accessory work. Four days per week optimized for building raw strength on the competition lifts.",
    goal: "strength",
    level: "intermediate",
    daysPerWeek: 4,
    estimatedMinutes: 75,
    tags: ["Strength", "Powerlifting", "Big 3"],
    groups: [
      {
        title: "Squat Day",
        daysOfWeek: [1],
        exerciseIds: [
          "squat",
          "good-morning",
          "hack-squat",
          "leg-press",
          "lying-leg-curl",
          "ab-wheel-rollout",
        ],
      },
      {
        title: "Bench Day",
        daysOfWeek: [2],
        exerciseIds: [
          "bench-press",
          "close-grip-bench",
          "cable-fly",
          "dumbbell-shoulder-press",
          "tricep-pushdown",
          "skull-crusher",
        ],
      },
      {
        title: "Deadlift Day",
        daysOfWeek: [4],
        exerciseIds: [
          "deadlift",
          "barbell-row",
          "lat-pulldown",
          "face-pull",
          "dumbbell-curl",
          "hanging-leg-raise",
        ],
      },
      {
        title: "Press & Pull Day",
        daysOfWeek: [5],
        exerciseIds: [
          "overhead-press",
          "pull-up",
          "seated-cable-row",
          "lateral-raise",
          "rear-delt-fly",
          "plank",
        ],
      },
    ],
  },

  {
    id: "athletic-functional",
    name: "Athletic & Functional",
    description:
      "Three days per week combining compound strength moves with functional carries, jumps, and core work. Great for athletes or anyone wanting strength that transfers outside the gym.",
    goal: "athletic",
    level: "beginner",
    daysPerWeek: 3,
    estimatedMinutes: 55,
    tags: ["Functional", "Athletic", "3 days"],
    groups: [
      {
        title: "Athletic Day A",
        daysOfWeek: [1],
        exerciseIds: [
          "deadlift",
          "push-up",
          "kettlebell-swing",
          "pull-up",
          "lunges",
          "plank",
          "farmers-walk",
        ],
      },
      {
        title: "Athletic Day B",
        daysOfWeek: [3],
        exerciseIds: [
          "goblet-squat",
          "dumbbell-flat-press",
          "single-arm-db-row",
          "dumbbell-shoulder-press",
          "step-up",
          "ab-wheel-rollout",
        ],
      },
      {
        title: "Athletic Day C",
        daysOfWeek: [5],
        exerciseIds: [
          "romanian-deadlift",
          "chest-dip",
          "barbell-row",
          "lateral-raise",
          "bulgarian-split-squat",
          "hanging-leg-raise",
          "russian-twist",
        ],
      },
    ],
  },
];

export const GOAL_LABELS: Record<Routine["goal"], { label: string; color: string }> = {
  strength: { label: "Strength", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  hypertrophy: { label: "Hypertrophy", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  both: { label: "Strength + Size", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  athletic: { label: "Athletic", color: "bg-teal-500/20 text-teal-400 border-teal-500/30" },
};

export const LEVEL_LABELS: Record<Routine["level"], { label: string; color: string }> = {
  beginner: { label: "Beginner", color: "text-green-400" },
  intermediate: { label: "Intermediate", color: "text-yellow-400" },
  advanced: { label: "Advanced", color: "text-red-400" },
};
