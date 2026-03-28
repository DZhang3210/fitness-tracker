export type ExerciseCategory =
  | "chest"
  | "back"
  | "shoulders"
  | "arms"
  | "legs"
  | "core"
  | "cardio"
  | "full-body";

export type StickFrame = {
  // SVG path data for each body part in this frame
  label: string; // e.g. "Start", "Down", "Up"
  description: string; // brief description of this position
};

export type Exercise = {
  id: string;
  name: string;
  category: ExerciseCategory;
  muscleGroups: string[];
  description: string;
  instructions: string[];
  frames: StickFrame[]; // 3-4 frames showing motion
  youtubeIds: string[]; // 2-3 YouTube video IDs
  // Average weight stats (in lbs, for intermediate lifter, ~75kg bodyweight)
  averages: {
    male: { mean: number; sd: number; unit: "lbs" | "reps" };
    female: { mean: number; sd: number; unit: "lbs" | "reps" };
  };
  tips: string[];
  equipment: string[];
};

export const EXERCISES: Exercise[] = [
  {
    id: "bench-press",
    name: "Bench Press",
    category: "chest",
    muscleGroups: ["Pectorals", "Anterior Deltoids", "Triceps"],
    description:
      "The bench press is the foundational horizontal pushing movement. Lying on a flat bench, you press a barbell from chest height to full arm extension, building upper body pushing strength.",
    instructions: [
      "Lie flat on bench, grip bar just outside shoulder width",
      "Unrack bar and lower it to your lower chest with control",
      "Touch chest lightly, then press explosively back to start",
      "Keep shoulder blades retracted and feet flat on floor",
    ],
    frames: [
      { label: "Set Up", description: "Lying on bench, bar over chest" },
      { label: "Lower", description: "Bar descends to chest, elbows at 45°" },
      { label: "Press", description: "Drive bar back to lockout" },
    ],
    youtubeIds: ["Ry8GzVcj8SY", "vcBig73ojpE", "gRVjAtPip0Y"],
    averages: {
      male: { mean: 135, sd: 45, unit: "lbs" },
      female: { mean: 65, sd: 22, unit: "lbs" },
    },
    tips: [
      "Arch your back slightly and plant feet firmly",
      "Lead with your chest, not just your arms",
      "Control the descent — don't bounce off your chest",
    ],
    equipment: ["Barbell", "Flat Bench", "Rack"],
  },
  {
    id: "squat",
    name: "Back Squat",
    category: "legs",
    muscleGroups: ["Quadriceps", "Hamstrings", "Glutes", "Core"],
    description:
      "The king of lower body exercises. A barbell is positioned across your upper back while you lower your hips below parallel and drive back to standing.",
    instructions: [
      "Bar sits on traps (high bar) or rear deltoids (low bar)",
      "Feet shoulder-width apart, toes slightly out",
      "Descend by pushing knees out and hips back",
      "Break parallel — thighs below horizontal",
      "Drive through whole foot to stand",
    ],
    frames: [
      { label: "Stand", description: "Bar on back, neutral spine" },
      { label: "Descent", description: "Hips back and down, knees tracking toes" },
      { label: "Parallel", description: "Hip crease below knee" },
      { label: "Drive", description: "Explode up through heels" },
    ],
    youtubeIds: ["ultKZYZCuEA", "bEv6CCg2BC8", "YaXPRqUwItQ"],
    averages: {
      male: { mean: 185, sd: 60, unit: "lbs" },
      female: { mean: 105, sd: 38, unit: "lbs" },
    },
    tips: [
      "Keep your chest up and core braced throughout",
      "Push your knees out in line with your toes",
      "Breathe in before descending, exhale at the top",
    ],
    equipment: ["Barbell", "Squat Rack"],
  },
  {
    id: "deadlift",
    name: "Deadlift",
    category: "back",
    muscleGroups: ["Hamstrings", "Glutes", "Lower Back", "Traps", "Core"],
    description:
      "A full-body pulling movement where you lift a barbell from the floor to hip height. One of the most effective strength-building exercises.",
    instructions: [
      "Bar over mid-foot, hip-width stance",
      "Hinge at hips, grip just outside legs",
      "Big breath in, brace core, push floor away",
      "Bar stays close to body throughout",
      "Lock out hips and knees simultaneously at top",
    ],
    frames: [
      { label: "Set", description: "Hips down, neutral spine, bar over mid-foot" },
      { label: "Off Floor", description: "Legs drive, back angle maintained" },
      { label: "Lockout", description: "Hips fully extended, standing tall" },
    ],
    youtubeIds: ["op9kVnSso6Q", "1ZXobu7JvvE", "r4MzxtBKyNE"],
    averages: {
      male: { mean: 225, sd: 70, unit: "lbs" },
      female: { mean: 120, sd: 42, unit: "lbs" },
    },
    tips: [
      "Think 'push the floor away' rather than 'pull the bar up'",
      "Keep the bar in contact with your shins and thighs",
      "Don't hyperextend at the top — just stand tall",
    ],
    equipment: ["Barbell", "Plates"],
  },
  {
    id: "overhead-press",
    name: "Overhead Press",
    category: "shoulders",
    muscleGroups: ["Anterior Deltoids", "Medial Deltoids", "Triceps", "Core"],
    description:
      "Standing barbell press from shoulder height to full overhead extension. The primary vertical pushing pattern for shoulder development.",
    instructions: [
      "Bar rests on front deltoids/upper chest, grip just outside shoulder width",
      "Brace core and glutes, slight lean back",
      "Press bar straight up, moving head back as bar passes face",
      "Lock out overhead, arms fully extended",
    ],
    frames: [
      { label: "Rack", description: "Bar at shoulder height, elbows forward" },
      { label: "Press", description: "Bar moving upward past face" },
      { label: "Lockout", description: "Arms locked out overhead" },
    ],
    youtubeIds: ["2yjwXTZbrDc", "kPnB4kXGMBU", "_RlRSV0jDnE"],
    averages: {
      male: { mean: 95, sd: 30, unit: "lbs" },
      female: { mean: 48, sd: 16, unit: "lbs" },
    },
    tips: [
      "Keep your core and glutes tight throughout",
      "Move your head back slightly to let the bar travel in a straight line",
      "Don't use leg drive — keep legs straight",
    ],
    equipment: ["Barbell", "Rack"],
  },
  {
    id: "barbell-row",
    name: "Barbell Row",
    category: "back",
    muscleGroups: ["Latissimus Dorsi", "Rhomboids", "Biceps", "Rear Deltoids"],
    description:
      "A bent-over horizontal pulling movement that builds a thick, wide back. The barbell is pulled to the lower abdomen while maintaining a hinged position.",
    instructions: [
      "Hinge forward to about 45°, bar hanging from arms",
      "Drive elbows back and up to pull bar to lower abdomen",
      "Squeeze shoulder blades together at the top",
      "Lower with control back to start",
    ],
    frames: [
      { label: "Hinge", description: "Bent over, bar hanging" },
      { label: "Pull", description: "Elbows driving back" },
      { label: "Top", description: "Bar at abdomen, scaps squeezed" },
    ],
    youtubeIds: ["kBWAon7ItDw", "G8l_8chR5BE", "vT2GjY_Umpw"],
    averages: {
      male: { mean: 145, sd: 45, unit: "lbs" },
      female: { mean: 72, sd: 24, unit: "lbs" },
    },
    tips: [
      "Think about pulling your elbows to the ceiling",
      "Keep a flat back throughout — don't round",
      "The bar should travel in a straight line up and down",
    ],
    equipment: ["Barbell"],
  },
  {
    id: "pull-up",
    name: "Pull-Up",
    category: "back",
    muscleGroups: ["Latissimus Dorsi", "Biceps", "Rear Deltoids", "Core"],
    description:
      "A bodyweight vertical pulling movement. Hanging from a bar, you pull your chin above bar height. One of the best measures of relative upper body strength.",
    instructions: [
      "Hang from bar, arms fully extended, shoulder-width grip",
      "Depress and retract scapulae to initiate",
      "Pull elbows toward hips until chin clears bar",
      "Lower fully under control",
    ],
    frames: [
      { label: "Dead Hang", description: "Arms fully extended, shoulders packed" },
      { label: "Halfway", description: "Elbows bent, pulling upward" },
      { label: "Top", description: "Chin over bar, chest near bar" },
    ],
    youtubeIds: ["eGo4IYlbE5g", "UvSNy4uw-CA", "poFRHGOMxOk"],
    averages: {
      male: { mean: 8, sd: 5, unit: "reps" },
      female: { mean: 2, sd: 2, unit: "reps" },
    },
    tips: [
      "Full range of motion — dead hang to chin over bar",
      "Avoid kipping unless training for gymnastics/CrossFit",
      "Add weight with a belt once you can do 10+ strict reps",
    ],
    equipment: ["Pull-Up Bar"],
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    category: "back",
    muscleGroups: ["Latissimus Dorsi", "Biceps", "Rear Deltoids"],
    description:
      "A cable machine exercise mimicking the pull-up pattern. Ideal for building lat width and as a progression toward unassisted pull-ups.",
    instructions: [
      "Sit with thighs secured under pads, grip bar wider than shoulder width",
      "Lean back slightly and depress shoulders",
      "Pull bar to upper chest, driving elbows down and back",
      "Return with control, fully extending arms",
    ],
    frames: [
      { label: "Start", description: "Arms extended upward, slight lean" },
      { label: "Pull", description: "Bar approaching chest, elbows down" },
      { label: "Finish", description: "Bar at upper chest, lats contracted" },
    ],
    youtubeIds: ["CAwf7n6Luuc", "lueScQ8bksc", "SAioDgqId2Q"],
    averages: {
      male: { mean: 120, sd: 38, unit: "lbs" },
      female: { mean: 62, sd: 20, unit: "lbs" },
    },
    tips: [
      "Think about pulling your elbows to your back pockets",
      "Avoid using momentum — control each rep",
      "Experiment with grip width: slightly outside shoulders is typically best",
    ],
    equipment: ["Cable Machine", "Lat Bar"],
  },
  {
    id: "dumbbell-curl",
    name: "Dumbbell Bicep Curl",
    category: "arms",
    muscleGroups: ["Biceps", "Brachialis", "Brachioradialis"],
    description:
      "Classic isolation exercise for bicep development. Standing or seated, you curl dumbbells from a hanging position to shoulder height.",
    instructions: [
      "Stand with dumbbells at sides, palms forward",
      "Curl both (or alternating) dumbbells toward shoulders",
      "Squeeze bicep at top, elbow stays at side",
      "Lower slowly to full extension",
    ],
    frames: [
      { label: "Down", description: "Arms fully extended at sides" },
      { label: "Mid", description: "Halfway, bicep beginning to peak" },
      { label: "Up", description: "Dumbbells at shoulder height, bicep contracted" },
    ],
    youtubeIds: ["ykJmrZ5v0Oo", "av7-8igSXTs", "in1PZGHBdYA"],
    averages: {
      male: { mean: 30, sd: 10, unit: "lbs" },
      female: { mean: 14, sd: 5, unit: "lbs" },
    },
    tips: [
      "Keep upper arms stationary — don't swing",
      "Supinate (rotate) wrist as you curl for full bicep activation",
      "Full range of motion beats heavy weight with partial reps",
    ],
    equipment: ["Dumbbells"],
  },
  {
    id: "tricep-pushdown",
    name: "Tricep Pushdown",
    category: "arms",
    muscleGroups: ["Triceps"],
    description:
      "Cable isolation exercise for the triceps. Using a rope or bar attachment on a high cable pulley, you press downward to full elbow extension.",
    instructions: [
      "Stand at cable machine, rope/bar at upper chest height",
      "Elbows tucked at sides throughout",
      "Push attachment down until arms fully extended",
      "Return slowly, keeping elbows still",
    ],
    frames: [
      { label: "Up", description: "Elbows bent, attachment at chest" },
      { label: "Push", description: "Arms extending downward" },
      { label: "Lockout", description: "Arms fully extended, triceps contracted" },
    ],
    youtubeIds: ["2-LAMcpzODU", "kiuVA0gs3EI", "vB5OHsJ3EME"],
    averages: {
      male: { mean: 55, sd: 18, unit: "lbs" },
      female: { mean: 28, sd: 10, unit: "lbs" },
    },
    tips: [
      "Keep your upper arms glued to your sides",
      "Squeeze at the bottom and feel the tricep contract",
      "Use rope for full extension and a bit more range of motion",
    ],
    equipment: ["Cable Machine", "Rope or Bar Attachment"],
  },
  {
    id: "leg-press",
    name: "Leg Press",
    category: "legs",
    muscleGroups: ["Quadriceps", "Hamstrings", "Glutes"],
    description:
      "Machine-based lower body push exercise. Seated in a leg press machine, you push a weighted platform away with both feet, targeting quads, hamstrings, and glutes.",
    instructions: [
      "Sit in machine, feet shoulder-width on platform",
      "Lower platform by bending knees toward chest",
      "Stop when knees are at 90°",
      "Press through heels to extend legs (don't lock out hard)",
    ],
    frames: [
      { label: "Up", description: "Legs near full extension" },
      { label: "Lower", description: "Knees bending, platform descending" },
      { label: "Down", description: "Knees at 90°, full depth" },
    ],
    youtubeIds: ["IZxyjW7MPJQ", "sEM_zo9bPXk", "yZmx_Ac3880"],
    averages: {
      male: { mean: 275, sd: 90, unit: "lbs" },
      female: { mean: 155, sd: 55, unit: "lbs" },
    },
    tips: [
      "Don't lock your knees out at the top",
      "Keep your lower back pressed into the seat",
      "Foot position changes emphasis: higher = more hamstrings/glutes, lower = more quads",
    ],
    equipment: ["Leg Press Machine"],
  },
  {
    id: "romanian-deadlift",
    name: "Romanian Deadlift",
    category: "legs",
    muscleGroups: ["Hamstrings", "Glutes", "Lower Back"],
    description:
      "A hip-hinge movement that emphasizes the hamstrings and glutes. Unlike a conventional deadlift, the bar doesn't touch the floor — tension is maintained throughout.",
    instructions: [
      "Stand holding barbell at hips, slight knee bend",
      "Hinge at hips, pushing them back while bar slides down thighs",
      "Lower until you feel a strong hamstring stretch (mid-shin level)",
      "Drive hips forward to return to start",
    ],
    frames: [
      { label: "Stand", description: "Upright, bar at hips" },
      { label: "Hinge", description: "Hips pushed back, bar at knees" },
      { label: "Stretch", description: "Maximum hamstring stretch, mid-shin" },
    ],
    youtubeIds: ["JCXUYuzwNrM", "7rl7IQOQ8oM", "EBwukh3GnJA"],
    averages: {
      male: { mean: 175, sd: 55, unit: "lbs" },
      female: { mean: 95, sd: 32, unit: "lbs" },
    },
    tips: [
      "Keep the bar as close to your body as possible",
      "Focus on pushing hips back — not just bending over",
      "Stop when lower back starts to round, not at foot level",
    ],
    equipment: ["Barbell"],
  },
  {
    id: "hip-thrust",
    name: "Hip Thrust",
    category: "legs",
    muscleGroups: ["Glutes", "Hamstrings", "Core"],
    description:
      "The most effective exercise for glute isolation. Upper back rests on a bench while you drive a barbell upward by extending the hips to a fully contracted position.",
    instructions: [
      "Upper back across bench, bar in hip crease, feet flat on floor",
      "Lower hips toward floor",
      "Drive hips up explosively to full extension",
      "Squeeze glutes hard at top, pause 1 second",
    ],
    frames: [
      { label: "Down", description: "Hips near floor, back on bench" },
      { label: "Drive", description: "Hips rising, glutes engaging" },
      { label: "Top", description: "Hips fully extended, body flat from shoulders to knees" },
    ],
    youtubeIds: ["SEdqd9cFOcY", "Zp26q4BY5HE", "PH2FGjKFd7o"],
    averages: {
      male: { mean: 185, sd: 65, unit: "lbs" },
      female: { mean: 115, sd: 45, unit: "lbs" },
    },
    tips: [
      "Use a pad or towel to protect your hip bones",
      "Chin tucked to avoid hyperextending your neck",
      "Drive through your heels — don't let knees cave inward",
    ],
    equipment: ["Barbell", "Bench", "Barbell Pad"],
  },
  {
    id: "dumbbell-shoulder-press",
    name: "Dumbbell Shoulder Press",
    category: "shoulders",
    muscleGroups: ["Anterior Deltoids", "Medial Deltoids", "Triceps"],
    description:
      "Seated or standing overhead press with dumbbells. Allows each arm to work independently, helping correct strength imbalances.",
    instructions: [
      "Sit upright, dumbbells at shoulder height, palms forward",
      "Press both dumbbells overhead until arms are extended",
      "Lower slowly back to shoulder level",
      "Keep core braced and avoid arching excessively",
    ],
    frames: [
      { label: "Start", description: "Dumbbells at ears, elbows at 90°" },
      { label: "Press", description: "Dumbbells rising overhead" },
      { label: "Top", description: "Arms locked out, slight inward lean" },
    ],
    youtubeIds: ["qEwKCR5JCog", "HzIiNhHhhtA", "P3MtF5uqBgA"],
    averages: {
      male: { mean: 50, sd: 16, unit: "lbs" },
      female: { mean: 22, sd: 8, unit: "lbs" },
    },
    tips: [
      "Use a slight neutral grip (palms facing inward) to reduce shoulder strain",
      "Keep your lower back against the pad if using a bench",
      "Control the lowering phase — don't drop the dumbbells",
    ],
    equipment: ["Dumbbells", "Adjustable Bench (optional)"],
  },
  {
    id: "cable-fly",
    name: "Cable Fly",
    category: "chest",
    muscleGroups: ["Pectorals", "Anterior Deltoids"],
    description:
      "Cable crossover fly for chest isolation. Two high cable pulleys allow you to perform a wide hugging motion that puts constant tension on the pectoral muscles.",
    instructions: [
      "Stand between cable pulleys set at head height, grip each handle",
      "Slight bend in elbows, step forward to create tension",
      "Bring hands together in a wide arc in front of chest",
      "Squeeze chest at the midpoint, then return with control",
    ],
    frames: [
      { label: "Open", description: "Arms wide, cables taut" },
      { label: "Mid", description: "Arms sweeping inward" },
      { label: "Close", description: "Hands meeting at chest, pecs squeezed" },
    ],
    youtubeIds: ["taI4XduLpTk", "Is32LDWB2Hs", "WEM7CuFDesw"],
    averages: {
      male: { mean: 40, sd: 14, unit: "lbs" },
      female: { mean: 18, sd: 7, unit: "lbs" },
    },
    tips: [
      "Maintain the same elbow angle throughout — this isn't a press",
      "Think 'hugging a tree' for the motion",
      "Cable flies allow more variety: high-to-low targets lower chest, low-to-high targets upper chest",
    ],
    equipment: ["Cable Machine (dual)"],
  },
  {
    id: "face-pull",
    name: "Face Pull",
    category: "shoulders",
    muscleGroups: ["Rear Deltoids", "Rotator Cuff", "Rhomboids", "Traps"],
    description:
      "An essential shoulder health exercise. Using a rope attachment on a high cable, you pull toward your face while externally rotating your shoulders.",
    instructions: [
      "Set cable at head height, grip rope with overhand grip",
      "Pull rope toward face, elbows flaring wide",
      "Externally rotate forearms at the end — hands pointing up",
      "Return slowly to full extension",
    ],
    frames: [
      { label: "Extend", description: "Arms forward, cable taut" },
      { label: "Pull", description: "Elbows flaring outward" },
      { label: "Finish", description: "Rope at face, forearms vertical" },
    ],
    youtubeIds: ["HSoHeSjvIdQ", "V3NTQoJTNoI", "rep-qVOkqgk"],
    averages: {
      male: { mean: 40, sd: 14, unit: "lbs" },
      female: { mean: 22, sd: 8, unit: "lbs" },
    },
    tips: [
      "Never skip face pulls — they are crucial for shoulder joint health",
      "Elbows should be above the line of pull",
      "Use lighter weight and focus on external rotation at end range",
    ],
    equipment: ["Cable Machine", "Rope Attachment"],
  },
  {
    id: "lunges",
    name: "Dumbbell Lunges",
    category: "legs",
    muscleGroups: ["Quadriceps", "Hamstrings", "Glutes"],
    description:
      "A unilateral leg exercise that improves balance and addresses strength imbalances. You step forward into a lunge position while holding dumbbells at your sides.",
    instructions: [
      "Stand with dumbbells at sides",
      "Step forward with one leg, lower knee toward floor",
      "Front thigh parallel to floor, back knee hovering above floor",
      "Push back to standing and alternate legs",
    ],
    frames: [
      { label: "Stand", description: "Upright, dumbbells at sides" },
      { label: "Step", description: "Striding forward" },
      { label: "Down", description: "Front knee at 90°, back knee near floor" },
    ],
    youtubeIds: ["D7KaRcUTQeE", "QOVaHwm-Q6U", "eFWCn5iEbTU"],
    averages: {
      male: { mean: 40, sd: 14, unit: "lbs" },
      female: { mean: 20, sd: 8, unit: "lbs" },
    },
    tips: [
      "Keep your torso upright — don't lean forward",
      "Front knee should track over your toes",
      "Step long enough that your front shin stays vertical",
    ],
    equipment: ["Dumbbells"],
  },
  {
    id: "plank",
    name: "Plank",
    category: "core",
    muscleGroups: ["Rectus Abdominis", "Transverse Abdominis", "Obliques", "Glutes"],
    description:
      "An isometric core stability exercise. You hold a push-up-like position, bracing your entire midsection to maintain a rigid, flat body position.",
    instructions: [
      "Position on forearms and toes, elbows under shoulders",
      "Body forms a straight line from head to heels",
      "Brace abs, squeeze glutes, push floor away",
      "Hold without letting hips sag or pike",
    ],
    frames: [
      { label: "Hold", description: "Rigid body plank position" },
      { label: "Breathe", description: "Same position, steady breath" },
    ],
    youtubeIds: ["pSHjTRCQxIw", "B296mZDhrP4", "H7YlMN01K2c"],
    averages: {
      male: { mean: 90, sd: 40, unit: "reps" }, // in seconds
      female: { mean: 65, sd: 30, unit: "reps" },
    },
    tips: [
      "Don't hold your breath — keep steady breathing",
      "Squeeze every muscle, not just your abs",
      "Build up duration gradually; quality beats time",
    ],
    equipment: ["Mat"],
  },
  {
    id: "seated-cable-row",
    name: "Seated Cable Row",
    category: "back",
    muscleGroups: ["Latissimus Dorsi", "Rhomboids", "Biceps", "Rear Deltoids"],
    description:
      "A horizontal cable pull exercise performed seated. Using a cable machine with a close-grip handle, you row toward your torso to build mid-back thickness.",
    instructions: [
      "Sit at cable row machine, feet on platform, slight knee bend",
      "Grip handle with neutral grip, torso upright",
      "Pull handle to lower abdomen, squeezing shoulder blades",
      "Return with control, allowing full arm extension",
    ],
    frames: [
      { label: "Reach", description: "Arms extended forward" },
      { label: "Pull", description: "Handle approaching abdomen" },
      { label: "Contract", description: "Handle at abdomen, scapulae retracted" },
    ],
    youtubeIds: ["UCXxvVItLoM", "GZbfZ033f74", "pYcpY20QaE8"],
    averages: {
      male: { mean: 130, sd: 42, unit: "lbs" },
      female: { mean: 65, sd: 22, unit: "lbs" },
    },
    tips: [
      "Drive elbows back — not just hands back",
      "Slight torso rock is OK; excessive swinging reduces effectiveness",
      "Use a slow, controlled return to build more back strength",
    ],
    equipment: ["Cable Machine", "Row Handle"],
  },
  {
    id: "incline-db-press",
    name: "Incline Dumbbell Press",
    category: "chest",
    muscleGroups: ["Upper Pectorals", "Anterior Deltoids", "Triceps"],
    description:
      "Dumbbell press performed on an incline bench, targeting the upper chest fibers more than flat bench pressing.",
    instructions: [
      "Set bench to 30-45°, sit with dumbbells on knees",
      "Press dumbbells to shoulder height, then press overhead",
      "Lower with control until dumbbells are at chest level",
      "Press back up, hands converging slightly at top",
    ],
    frames: [
      { label: "Down", description: "Dumbbells at chest level, elbows bent" },
      { label: "Press", description: "Dumbbells rising on incline" },
      { label: "Top", description: "Arms extended, incline position" },
    ],
    youtubeIds: ["8iPEnn-ltC8", "DbFgADa2PL8", "IP4oeKh3BI0"],
    averages: {
      male: { mean: 60, sd: 20, unit: "lbs" },
      female: { mean: 28, sd: 10, unit: "lbs" },
    },
    tips: [
      "Keep elbows at 45–60° from your torso, not flared wide",
      "Focus on upper chest activation — think 'push up and in'",
      "Don't set the incline too steep — 30-45° is the sweet spot",
    ],
    equipment: ["Dumbbells", "Incline Bench"],
  },

  // ── 30 additional exercises ────────────────────────────────────────────────

  {
    id: "push-up",
    name: "Push-Up",
    category: "chest",
    muscleGroups: ["Pectorals", "Triceps", "Anterior Deltoids", "Core"],
    description:
      "The foundational bodyweight pressing movement. No equipment needed — just your own bodyweight resisting gravity as you lower and press your chest from the floor.",
    instructions: [
      "Place hands slightly wider than shoulder-width, body in a straight line",
      "Lower chest to the floor, elbows at roughly 45°",
      "Press back up to full arm extension",
      "Maintain a rigid plank position throughout",
    ],
    frames: [
      { label: "Up", description: "Arms extended, plank position" },
      { label: "Down", description: "Chest near floor, elbows bent" },
    ],
    youtubeIds: ["IODxDxX7oi4", "BkROOThGHRo", "mm6_WcoCVTA"],
    averages: {
      male: { mean: 28, sd: 12, unit: "reps" },
      female: { mean: 14, sd: 8, unit: "reps" },
    },
    tips: [
      "Keep your core and glutes tight — no sagging hips",
      "Full range of motion: chest lightly touches floor each rep",
      "Add a weight plate on your back to progress beyond bodyweight",
    ],
    equipment: ["Bodyweight"],
  },

  {
    id: "dumbbell-flat-press",
    name: "Dumbbell Flat Press",
    category: "chest",
    muscleGroups: ["Pectorals", "Triceps", "Anterior Deltoids"],
    description:
      "A flat bench pressing movement with dumbbells instead of a barbell, allowing each arm to work independently and providing a greater range of motion at the bottom.",
    instructions: [
      "Sit on flat bench with dumbbells on thighs, then kick them up as you lie back",
      "Lower dumbbells to chest level with elbows at 45–60°",
      "Press back up, hands converging slightly at the top",
      "Don't let the dumbbells bang together — stop just before",
    ],
    frames: [
      { label: "Down", description: "Dumbbells at chest, elbows bent" },
      { label: "Press", description: "Dumbbells rising" },
      { label: "Top", description: "Arms nearly extended" },
    ],
    youtubeIds: ["VmB1G1K7v94", "QsYre__-aro", "StPRMQGDsk8"],
    averages: {
      male: { mean: 55, sd: 18, unit: "lbs" },
      female: { mean: 26, sd: 9, unit: "lbs" },
    },
    tips: [
      "The extra ROM at the bottom stretches the chest more than a barbell",
      "Keep a slight arch in your lower back and retract your shoulder blades",
      "Control the weight on the way down — don't just drop it",
    ],
    equipment: ["Dumbbells", "Flat Bench"],
  },

  {
    id: "chest-dip",
    name: "Chest Dip",
    category: "chest",
    muscleGroups: ["Pectorals", "Triceps", "Anterior Deltoids"],
    description:
      "A bodyweight dip performed on parallel bars with a forward lean to emphasize the lower chest. One of the best compound pressing movements for overall chest development.",
    instructions: [
      "Grip parallel bars, arms straight, slight forward lean of torso",
      "Lower body by bending elbows, leaning forward throughout",
      "Descend until shoulders are below elbow level",
      "Press back up to the start, maintaining the forward lean",
    ],
    frames: [
      { label: "Top", description: "Arms extended, forward lean" },
      { label: "Bottom", description: "Elbows bent, chest stretched" },
    ],
    youtubeIds: ["2z8JmcrW-As", "yN6Q1UI_xkE", "dX_nSOOJIsE"],
    averages: {
      male: { mean: 12, sd: 6, unit: "reps" },
      female: { mean: 4, sd: 3, unit: "reps" },
    },
    tips: [
      "Lean forward — upright dips target triceps; forward lean targets chest",
      "Go deep enough to feel a chest stretch at the bottom",
      "Add a weight belt once you can comfortably do 12+ reps",
    ],
    equipment: ["Parallel Dip Bars"],
  },

  {
    id: "pec-deck",
    name: "Pec Deck (Machine Fly)",
    category: "chest",
    muscleGroups: ["Pectorals", "Anterior Deltoids"],
    description:
      "A machine-based chest isolation exercise. Padded arms allow you to perform a fly motion with constant tension, ideal for targeting the inner chest and getting a strong squeeze.",
    instructions: [
      "Sit upright on the machine, back flat against pad",
      "Place forearms on the vertical pads, elbows at shoulder height",
      "Squeeze the pads together in front of your chest",
      "Return slowly, feeling a full chest stretch at the end",
    ],
    frames: [
      { label: "Open", description: "Arms wide, chest stretched" },
      { label: "Close", description: "Pads meeting in front, pecs contracted" },
    ],
    youtubeIds: ["Z57CtFmRMxA", "p3zSBVOHrFg", "ea_WBEA8XO4"],
    averages: {
      male: { mean: 115, sd: 38, unit: "lbs" },
      female: { mean: 55, sd: 20, unit: "lbs" },
    },
    tips: [
      "Focus on squeezing from the chest, not just moving your arms",
      "Don't let the weight stack drop — control the return",
      "Elbows should stay at shoulder height throughout",
    ],
    equipment: ["Pec Deck Machine"],
  },

  {
    id: "t-bar-row",
    name: "T-Bar Row",
    category: "back",
    muscleGroups: ["Latissimus Dorsi", "Rhomboids", "Biceps", "Lower Back"],
    description:
      "A heavy barbell rowing variation using a T-bar or landmine setup. Allows heavier loading than dumbbell rows while keeping the torso supported. Excellent for back thickness.",
    instructions: [
      "Straddle the bar, feet shoulder-width, hinge to ~45°",
      "Grip the handle with both hands, arms extended",
      "Pull the handle to your lower chest/upper abdomen",
      "Lower under control until arms are fully extended",
    ],
    frames: [
      { label: "Hang", description: "Hinged over, arms extended" },
      { label: "Pull", description: "Handle approaching chest" },
    ],
    youtubeIds: ["j3Igk5nyZE4", "KDEl3AmZbVE", "GIPSG6-tTKo"],
    averages: {
      male: { mean: 155, sd: 50, unit: "lbs" },
      female: { mean: 75, sd: 26, unit: "lbs" },
    },
    tips: [
      "Keep a neutral spine — no rounding",
      "Drive your elbows back, not just your hands",
      "A chest-supported variation removes lower back strain if needed",
    ],
    equipment: ["Barbell", "T-Bar Row Platform or Landmine"],
  },

  {
    id: "single-arm-db-row",
    name: "Single-Arm Dumbbell Row",
    category: "back",
    muscleGroups: ["Latissimus Dorsi", "Rhomboids", "Biceps", "Rear Deltoids"],
    description:
      "A unilateral back exercise where one hand and knee brace on a bench while the other arm rows a heavy dumbbell. Allows a long range of motion and heavy loading.",
    instructions: [
      "Place one hand and same-side knee on a flat bench",
      "Dumbbell hangs from the free arm, back flat and parallel to floor",
      "Row the dumbbell to hip level, elbow driving back",
      "Lower fully, letting the shoulder protract for full stretch",
    ],
    frames: [
      { label: "Hang", description: "Arm extended, shoulder protracting" },
      { label: "Row", description: "Elbow driving back to hip" },
    ],
    youtubeIds: ["pYcpY20QaE8", "roCP0hFQzHI", "xl_jhfE4GCA"],
    averages: {
      male: { mean: 80, sd: 26, unit: "lbs" },
      female: { mean: 38, sd: 13, unit: "lbs" },
    },
    tips: [
      "Allow the shoulder blade to move fully — don't keep it pinned",
      "Drive elbow toward hip, not just upward",
      "Use a wrist strap so grip doesn't limit the weight you can use",
    ],
    equipment: ["Dumbbell", "Flat Bench"],
  },

  {
    id: "good-morning",
    name: "Good Morning",
    category: "back",
    muscleGroups: ["Hamstrings", "Glutes", "Lower Back", "Erector Spinae"],
    description:
      "A barbell hip-hinge movement with the bar on your back. Named for the bowing motion it resembles, it strengthens the entire posterior chain with an emphasis on the lower back and hamstrings.",
    instructions: [
      "Place barbell on upper back (high or low bar position)",
      "Slight bend in knees, brace core",
      "Hinge at hips, pushing them back as you lean forward",
      "Lower until torso is roughly parallel to floor, then drive hips forward to stand",
    ],
    frames: [
      { label: "Stand", description: "Upright, bar on back" },
      { label: "Hinge", description: "Torso forward, hips back" },
    ],
    youtubeIds: ["YA-h3n9L4YU", "_oGlEKBH4Xo", "OB0oB8oO6MQ"],
    averages: {
      male: { mean: 95, sd: 35, unit: "lbs" },
      female: { mean: 45, sd: 18, unit: "lbs" },
    },
    tips: [
      "Start very light — this movement is technical and stressful on the lower back",
      "Keep the bar path close to your center of gravity",
      "If in doubt, the Romanian deadlift is a safer alternative",
    ],
    equipment: ["Barbell", "Rack"],
  },

  {
    id: "chest-supported-row",
    name: "Chest-Supported Row",
    category: "back",
    muscleGroups: ["Rhomboids", "Latissimus Dorsi", "Rear Deltoids", "Biceps"],
    description:
      "A rowing variation where your chest rests on an incline bench, completely removing lower back involvement. Allows full focus on upper back strength and eliminates momentum.",
    instructions: [
      "Lie face-down on an incline bench (30–45°), dumbbells hanging",
      "Row dumbbells toward hips, driving elbows back",
      "Squeeze shoulder blades together at the top",
      "Lower with full control",
    ],
    frames: [
      { label: "Hang", description: "Chest on pad, arms hanging" },
      { label: "Row", description: "Elbows at hip level, scaps retracted" },
    ],
    youtubeIds: ["fEhDvRGNYFk", "yRjBhPNmGqA", "b8U6FIQfMvw"],
    averages: {
      male: { mean: 55, sd: 18, unit: "lbs" },
      female: { mean: 25, sd: 9, unit: "lbs" },
    },
    tips: [
      "Perfect for people with lower back issues who still want to row",
      "Keep your chin tucked — don't crane your neck up",
      "Vary grip: pronated for upper back, neutral for lats",
    ],
    equipment: ["Dumbbells", "Incline Bench"],
  },

  {
    id: "lateral-raise",
    name: "Lateral Raise",
    category: "shoulders",
    muscleGroups: ["Medial Deltoids", "Supraspinatus"],
    description:
      "The primary isolation exercise for the medial (side) deltoid. Raising dumbbells out to the sides widens the shoulder silhouette more than any other movement.",
    instructions: [
      "Stand with dumbbells at sides, slight bend in elbows",
      "Raise arms out to the sides until they are parallel to the floor",
      "Lead with the elbows, not the wrists",
      "Lower slowly — 3-4 seconds on the way down",
    ],
    frames: [
      { label: "Down", description: "Dumbbells at sides" },
      { label: "Up", description: "Arms parallel to floor, T-position" },
    ],
    youtubeIds: ["3VcKaXpzqRo", "geenhiHju-o", "FeRnLVPqPYM"],
    averages: {
      male: { mean: 20, sd: 7, unit: "lbs" },
      female: { mean: 10, sd: 4, unit: "lbs" },
    },
    tips: [
      "Use lighter weight than you think — form breaks quickly as weight increases",
      "Tilt the dumbbell slightly so pinky is higher than thumb at the top",
      "The slow lowering phase builds more muscle than the lift itself",
    ],
    equipment: ["Dumbbells"],
  },

  {
    id: "rear-delt-fly",
    name: "Rear Delt Fly",
    category: "shoulders",
    muscleGroups: ["Rear Deltoids", "Rhomboids", "Infraspinatus"],
    description:
      "An isolation exercise for the often-neglected rear deltoid. Performed bent over or on a chest-supported bench, you raise dumbbells outward in a reverse fly motion.",
    instructions: [
      "Hinge forward at hips to about 45–60°, dumbbells hanging",
      "With a slight elbow bend, raise arms out to the sides",
      "Stop when arms are parallel to the floor and squeeze rear delts",
      "Lower slowly with control",
    ],
    frames: [
      { label: "Hang", description: "Bent over, dumbbells hanging" },
      { label: "Fly", description: "Arms raised laterally, rear delts contracted" },
    ],
    youtubeIds: ["ttvfGg9d76c", "EA7u4Q_8HQ0", "6ZB_xtMubCY"],
    averages: {
      male: { mean: 22, sd: 8, unit: "lbs" },
      female: { mean: 10, sd: 4, unit: "lbs" },
    },
    tips: [
      "Keep a slight bend in your elbows throughout — this is not a straight-arm raise",
      "Think of leading with your elbows and pinching shoulder blades",
      "Can also be done on a pec deck machine with arms reversed",
    ],
    equipment: ["Dumbbells"],
  },

  {
    id: "arnold-press",
    name: "Arnold Press",
    category: "shoulders",
    muscleGroups: ["Anterior Deltoids", "Medial Deltoids", "Triceps"],
    description:
      "A dumbbell shoulder press variation invented by Arnold Schwarzenegger that adds a rotation from a palms-in position at the bottom to palms-forward at the top, hitting more of the deltoid.",
    instructions: [
      "Start with dumbbells at chin height, palms facing you, elbows in",
      "As you press upward, rotate palms forward",
      "At the top, arms are extended with palms facing away",
      "Reverse the rotation as you lower back to start",
    ],
    frames: [
      { label: "Start", description: "Palms facing in, elbows forward" },
      { label: "Rotate", description: "Mid-press, palms rotating out" },
      { label: "Top", description: "Full extension, palms facing away" },
    ],
    youtubeIds: ["vj2w851ZHRM", "3ml9BjD3F4o", "3MHlKKgwrDQ"],
    averages: {
      male: { mean: 40, sd: 14, unit: "lbs" },
      female: { mean: 18, sd: 7, unit: "lbs" },
    },
    tips: [
      "Move through the rotation smoothly — don't rush it",
      "Slightly lighter than a standard press due to the rotation",
      "Great for addressing front and side delt in a single movement",
    ],
    equipment: ["Dumbbells"],
  },

  {
    id: "upright-row",
    name: "Upright Row",
    category: "shoulders",
    muscleGroups: ["Medial Deltoids", "Trapezius", "Biceps"],
    description:
      "A vertical pulling movement where a barbell or dumbbells are pulled from hip level to chin height. Targets the medial deltoids and traps simultaneously.",
    instructions: [
      "Grip barbell with hands shoulder-width (or slightly narrower)",
      "Pull bar straight up, leading with elbows above the bar",
      "Elbows should reach chin/nose height at the top",
      "Lower slowly to the starting position",
    ],
    frames: [
      { label: "Down", description: "Bar at hips, arms extended" },
      { label: "Up", description: "Bar at chin, elbows flared high" },
    ],
    youtubeIds: ["amCSS_1_wqk", "VG5CWjf6TXQ", "UxEzCuuFx8Q"],
    averages: {
      male: { mean: 75, sd: 25, unit: "lbs" },
      female: { mean: 35, sd: 12, unit: "lbs" },
    },
    tips: [
      "Use a shoulder-width or wider grip to reduce shoulder impingement risk",
      "Don't pull so high the elbows go far above shoulder height",
      "Can be done with dumbbells, cable, or EZ-bar",
    ],
    equipment: ["Barbell or Dumbbells"],
  },

  {
    id: "hammer-curl",
    name: "Hammer Curl",
    category: "arms",
    muscleGroups: ["Brachialis", "Biceps", "Brachioradialis"],
    description:
      "A dumbbell curl performed with a neutral (hammer) grip — thumbs pointing up. This targets the brachialis muscle underneath the bicep, which adds arm thickness and pushes the bicep peak higher.",
    instructions: [
      "Hold dumbbells at sides with a neutral grip (palms facing each other)",
      "Curl both dumbbells simultaneously, maintaining the neutral grip",
      "Squeeze at the top, then lower slowly",
      "Elbows stay stationary at your sides",
    ],
    frames: [
      { label: "Down", description: "Arms extended, thumbs facing forward" },
      { label: "Up", description: "Dumbbells at shoulder, neutral grip" },
    ],
    youtubeIds: ["zC3nLlEvin4", "TwD-YGVP4Bk", "ykJmrZ5v0Oo"],
    averages: {
      male: { mean: 32, sd: 10, unit: "lbs" },
      female: { mean: 15, sd: 5, unit: "lbs" },
    },
    tips: [
      "Neutral grip puts less stress on the wrist and elbow than supinated curls",
      "Try alternating reps to allow focus on each arm individually",
      "Brachialis development adds more visible arm size than pure bicep training",
    ],
    equipment: ["Dumbbells"],
  },

  {
    id: "skull-crusher",
    name: "Skull Crusher",
    category: "arms",
    muscleGroups: ["Triceps (Long Head)", "Triceps (Lateral Head)"],
    description:
      "A lying tricep extension with an EZ-bar or dumbbells, lowering the weight toward the forehead (or slightly behind the head). One of the best tricep mass-builders.",
    instructions: [
      "Lie on a flat bench, EZ-bar held above chest with arms straight",
      "Lower the bar toward your forehead by bending only at the elbows",
      "Stop just above the forehead, then press back to start",
      "Keep upper arms stationary and perpendicular to the floor",
    ],
    frames: [
      { label: "Up", description: "Arms extended, bar above chest" },
      { label: "Down", description: "Elbows bent, bar near forehead" },
    ],
    youtubeIds: ["d_KZxkY_0cM", "NIBDFJgPCQU", "ir5PsbniVSc"],
    averages: {
      male: { mean: 65, sd: 22, unit: "lbs" },
      female: { mean: 30, sd: 11, unit: "lbs" },
    },
    tips: [
      "Use an EZ-bar to reduce wrist strain vs. straight bar",
      "Lower toward forehead or slightly behind the head for more long-head stretch",
      "Don't flare your elbows — keep them tucked and pointing at the ceiling",
    ],
    equipment: ["EZ-Bar or Barbell", "Flat Bench"],
  },

  {
    id: "preacher-curl",
    name: "Preacher Curl",
    category: "arms",
    muscleGroups: ["Biceps", "Brachialis"],
    description:
      "A bicep curl performed with the upper arms resting on a preacher bench pad, completely isolating the bicep by eliminating any ability to cheat with body swing.",
    instructions: [
      "Sit at preacher bench, upper arms resting on the angled pad",
      "Hold EZ-bar or dumbbells at arm's length",
      "Curl until forearms are vertical, squeeze bicep",
      "Lower slowly — the stretched position at the bottom is where the most growth occurs",
    ],
    frames: [
      { label: "Extended", description: "Arms nearly straight on pad" },
      { label: "Curled", description: "Forearms vertical, bicep contracted" },
    ],
    youtubeIds: ["fIWP-FRFNU0", "Ux6KCPFDHqQ", "P_V4VTiGRwE"],
    averages: {
      male: { mean: 55, sd: 18, unit: "lbs" },
      female: { mean: 25, sd: 9, unit: "lbs" },
    },
    tips: [
      "Don't let the bar drop too fast at the bottom — the stretch is productive, not a bounce",
      "The preacher bench removes all cheating, so you'll use less weight than standing curls",
      "Can be done one arm at a time with a dumbbell for better mind-muscle connection",
    ],
    equipment: ["EZ-Bar or Dumbbells", "Preacher Bench"],
  },

  {
    id: "overhead-tricep-extension",
    name: "Overhead Tricep Extension",
    category: "arms",
    muscleGroups: ["Triceps (Long Head)"],
    description:
      "A dumbbell or cable tricep exercise performed overhead, placing the long head of the tricep in a fully stretched position. This overhead position is uniquely effective for long-head development.",
    instructions: [
      "Sit or stand, hold a single dumbbell with both hands behind your head",
      "Elbows pointed at the ceiling, upper arms stationary",
      "Extend forearms upward until arms are fully straight",
      "Lower slowly back behind the head",
    ],
    frames: [
      { label: "Down", description: "Dumbbell behind head, elbows bent" },
      { label: "Up", description: "Arms fully extended overhead" },
    ],
    youtubeIds: ["YbX7Wd8jQ-Q", "_gsUck-7M74", "6SS6K3lAwZ8"],
    averages: {
      male: { mean: 55, sd: 18, unit: "lbs" },
      female: { mean: 26, sd: 9, unit: "lbs" },
    },
    tips: [
      "Keep elbows close to your head — don't let them flare wide",
      "This is the best exercise for the long head, which makes up two-thirds of tricep mass",
      "Use a cable behind you for constant tension throughout the range",
    ],
    equipment: ["Dumbbell or Cable Machine"],
  },

  {
    id: "close-grip-bench",
    name: "Close-Grip Bench Press",
    category: "arms",
    muscleGroups: ["Triceps", "Pectorals", "Anterior Deltoids"],
    description:
      "A barbell bench press with a narrower grip, shifting the emphasis from the chest to the triceps. One of the best compound movements for tricep mass and strength.",
    instructions: [
      "Grip barbell with hands about shoulder-width (or slightly narrower)",
      "Unrack and lower the bar to your lower chest/upper abs",
      "Elbows stay closer to the body than a standard bench press",
      "Press back up to full extension",
    ],
    frames: [
      { label: "Down", description: "Bar at lower chest, elbows tucked" },
      { label: "Up", description: "Arms extended, triceps contracted" },
    ],
    youtubeIds: ["nEF0bv2FW94", "cXbSJHtjrQA", "wxS9OD7Q0-w"],
    averages: {
      male: { mean: 115, sd: 38, unit: "lbs" },
      female: { mean: 55, sd: 18, unit: "lbs" },
    },
    tips: [
      "Don't go too narrow — hands touching causes wrist pain and reduces stability",
      "Tuck the elbows to about 30° from the torso for maximum tricep engagement",
      "Can be used as a main pressing movement or an accessory after bench press",
    ],
    equipment: ["Barbell", "Flat Bench", "Rack"],
  },

  {
    id: "bulgarian-split-squat",
    name: "Bulgarian Split Squat",
    category: "legs",
    muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
    description:
      "A rear-foot elevated split squat. One foot is elevated on a bench behind you while you lunge the front leg. Extremely effective for unilateral leg development and identifying strength imbalances.",
    instructions: [
      "Stand a stride's length in front of a bench, rest rear foot on it",
      "Lower your back knee toward the floor",
      "Front thigh should reach parallel or below",
      "Drive through the front foot's heel to rise",
    ],
    frames: [
      { label: "Stand", description: "Rear foot on bench, upright" },
      { label: "Down", description: "Back knee near floor, front thigh parallel" },
    ],
    youtubeIds: ["2C-uNgKwPLE", "vUNhCBYDDMw", "HMg5UBKkR7I"],
    averages: {
      male: { mean: 45, sd: 16, unit: "lbs" },
      female: { mean: 22, sd: 8, unit: "lbs" },
    },
    tips: [
      "Front foot position matters — too close cramps the knee, too far strains the hip",
      "Keep your torso upright to maximize quad activation",
      "Hold dumbbells at sides or a barbell on your back",
    ],
    equipment: ["Dumbbells or Barbell", "Bench"],
  },

  {
    id: "hack-squat",
    name: "Hack Squat",
    category: "legs",
    muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
    description:
      "A machine squat movement where your back is supported on an angled sled, allowing heavier quad-focused loading without spinal compression concerns.",
    instructions: [
      "Position on machine with back flat against pad, feet shoulder-width on platform",
      "Release safety handles and lower by bending knees",
      "Descend until thighs are parallel or below",
      "Drive through heels to return to start",
    ],
    frames: [
      { label: "Up", description: "Legs near extended on sled" },
      { label: "Down", description: "Thighs parallel, deep squat on machine" },
    ],
    youtubeIds: ["EdtbbskHUE4", "sB-e4LHGSP0", "4V_9JlJAaFc"],
    averages: {
      male: { mean: 245, sd: 80, unit: "lbs" },
      female: { mean: 130, sd: 45, unit: "lbs" },
    },
    tips: [
      "Feet higher on the platform = more glutes/hamstrings; lower = more quads",
      "Don't lock out knees at the top to keep tension on the quads",
      "The machine's back support allows you to push quad volume safely",
    ],
    equipment: ["Hack Squat Machine"],
  },

  {
    id: "lying-leg-curl",
    name: "Lying Leg Curl",
    category: "legs",
    muscleGroups: ["Hamstrings", "Gastrocnemius"],
    description:
      "The primary isolation exercise for the hamstrings. Lying face-down on a leg curl machine, you curl a padded roller toward your glutes using only your hamstrings.",
    instructions: [
      "Lie face-down on leg curl machine, pad resting on back of ankles",
      "Curl legs toward glutes as far as the machine allows",
      "Squeeze hamstrings at the top for 1 second",
      "Lower slowly under control",
    ],
    frames: [
      { label: "Extended", description: "Legs nearly straight" },
      { label: "Curled", description: "Heels approaching glutes" },
    ],
    youtubeIds: ["Orxowest56U", "1Tq3QdYUuHs", "ELOCsoDSmrg"],
    averages: {
      male: { mean: 110, sd: 35, unit: "lbs" },
      female: { mean: 60, sd: 22, unit: "lbs" },
    },
    tips: [
      "Point toes slightly to emphasize the outer hamstring",
      "Don't let your hips rise off the pad to cheat the weight",
      "Full extension at the bottom is important for the hamstring stretch",
    ],
    equipment: ["Lying Leg Curl Machine"],
  },

  {
    id: "leg-extension",
    name: "Leg Extension",
    category: "legs",
    muscleGroups: ["Quadriceps"],
    description:
      "The primary quad isolation exercise. Sitting in a leg extension machine, you extend the legs from 90° to full extension, contracting all four heads of the quadriceps.",
    instructions: [
      "Sit in machine, pad resting on front of ankles, knee at 90°",
      "Extend both legs until nearly straight",
      "Hold the contraction at the top for 1 second",
      "Lower slowly through the full range",
    ],
    frames: [
      { label: "Bent", description: "Knees at 90°, pad behind ankles" },
      { label: "Extended", description: "Legs fully extended, quads contracted" },
    ],
    youtubeIds: ["YyvSfVjQeL0", "m0FOpMEgero", "y4CJ9MTQSYY"],
    averages: {
      male: { mean: 130, sd: 42, unit: "lbs" },
      female: { mean: 72, sd: 25, unit: "lbs" },
    },
    tips: [
      "Point toes slightly upward at the top for a stronger quad contraction",
      "This is one of the few exercises that isolates the rectus femoris",
      "Use single-leg for addressing imbalances",
    ],
    equipment: ["Leg Extension Machine"],
  },

  {
    id: "standing-calf-raise",
    name: "Standing Calf Raise",
    category: "legs",
    muscleGroups: ["Gastrocnemius", "Soleus"],
    description:
      "The fundamental calf exercise. Standing with the balls of your feet on a raised platform, you raise and lower your heels to work the calf muscles through their full range of motion.",
    instructions: [
      "Stand on the edge of a step or calf block, heels hanging off",
      "Lower heels as far as comfortable — full stretch",
      "Rise onto tiptoes as high as possible",
      "Hold the top position briefly, then lower slowly",
    ],
    frames: [
      { label: "Stretch", description: "Heels below platform level" },
      { label: "Rise", description: "On tiptoes, calves contracted" },
    ],
    youtubeIds: ["gwLzBJYoWlI", "YMmgqO8-Gts", "c5kKlGXvkYI"],
    averages: {
      male: { mean: 185, sd: 65, unit: "lbs" },
      female: { mean: 100, sd: 38, unit: "lbs" },
    },
    tips: [
      "Full range of motion is everything — partial reps barely work the calf",
      "Calves respond well to high reps (15–25) due to their endurance fiber composition",
      "Slightly turn toes in/out to shift emphasis between inner and outer calf heads",
    ],
    equipment: ["Calf Raise Machine or Step"],
  },

  {
    id: "goblet-squat",
    name: "Goblet Squat",
    category: "legs",
    muscleGroups: ["Quadriceps", "Glutes", "Core"],
    description:
      "A front-loaded squat holding a dumbbell or kettlebell at chest height. The counterbalance makes it easier to squat deeply with an upright torso, making it great for beginners and warm-ups.",
    instructions: [
      "Hold a dumbbell or kettlebell vertically at chest height",
      "Feet shoulder-width, toes slightly out",
      "Squat deep, elbows tracking inside the knees",
      "Drive up through the heels, keeping the weight close",
    ],
    frames: [
      { label: "Stand", description: "Weight at chest, upright" },
      { label: "Squat", description: "Deep squat, elbows inside knees" },
    ],
    youtubeIds: ["MxsFDhcyFyE", "CkFzYHOQm4E", "g4OPcbmOc6Y"],
    averages: {
      male: { mean: 60, sd: 20, unit: "lbs" },
      female: { mean: 28, sd: 10, unit: "lbs" },
    },
    tips: [
      "The weight in front helps you sit back and keep your chest tall simultaneously",
      "Aim to squat as deep as comfortable — ideally below parallel",
      "Excellent warm-up and mobility drill before heavier squats",
    ],
    equipment: ["Dumbbell or Kettlebell"],
  },

  {
    id: "step-up",
    name: "Step-Up",
    category: "legs",
    muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
    description:
      "A unilateral leg exercise using a box or bench. You step one foot up and drive through that leg to lift your full bodyweight, mimicking functional stair-climbing under load.",
    instructions: [
      "Stand facing a bench or box, dumbbells at sides",
      "Step one foot onto the box and drive through that heel to stand up",
      "Bring the trailing foot up to meet the other",
      "Step back down and repeat on the same leg, or alternate",
    ],
    frames: [
      { label: "Floor", description: "Standing facing the box" },
      { label: "Drive", description: "Pushing through the elevated leg" },
      { label: "Top", description: "Both feet on box, standing tall" },
    ],
    youtubeIds: ["dQqApCGd5Ss", "hbMCSCNpHcg", "jlBBNqsxMXU"],
    averages: {
      male: { mean: 35, sd: 12, unit: "lbs" },
      female: { mean: 16, sd: 6, unit: "lbs" },
    },
    tips: [
      "Push through the heel of the elevated foot — don't push off the floor foot",
      "Box height: knee at 90° when the foot is on the box is a good starting point",
      "Keep your torso upright — don't hunch forward",
    ],
    equipment: ["Dumbbells", "Box or Bench"],
  },

  {
    id: "ab-wheel-rollout",
    name: "Ab Wheel Rollout",
    category: "core",
    muscleGroups: ["Rectus Abdominis", "Transverse Abdominis", "Lats", "Shoulders"],
    description:
      "One of the most demanding core exercises. Rolling an ab wheel from a kneeling position challenges the entire anterior core and lats as you resist spinal extension.",
    instructions: [
      "Kneel on a mat, grip the ab wheel handles, arms straight",
      "Roll the wheel forward slowly, hinging at the hips",
      "Extend as far as you can while keeping your lower back from caving",
      "Use your abs and lats to pull the wheel back to start",
    ],
    frames: [
      { label: "Start", description: "Kneeling, wheel under shoulders" },
      { label: "Extend", description: "Body nearly parallel to floor" },
    ],
    youtubeIds: ["0AFgCNEsSpI", "NtbbImFPqKE", "b9EBsIBsAsA"],
    averages: {
      male: { mean: 8, sd: 4, unit: "reps" },
      female: { mean: 4, sd: 2, unit: "reps" },
    },
    tips: [
      "Start from a kneeling position — standing rollouts are extremely advanced",
      "If your lower back arches, you've gone too far — stop there and build up",
      "Exhale on the way out and brace hard on the return",
    ],
    equipment: ["Ab Wheel"],
  },

  {
    id: "hanging-leg-raise",
    name: "Hanging Leg Raise",
    category: "core",
    muscleGroups: ["Rectus Abdominis", "Hip Flexors", "Obliques"],
    description:
      "An advanced core exercise performed hanging from a pull-up bar. Raising your legs challenges the lower abs and hip flexors while requiring full body tension.",
    instructions: [
      "Hang from a pull-up bar, arms fully extended",
      "Raise legs (bent or straight) toward the bar",
      "Control the descent — don't swing",
      "Keep shoulders packed, not shrugged",
    ],
    frames: [
      { label: "Hang", description: "Dead hang, legs down" },
      { label: "Raise", description: "Legs raised to bar level" },
    ],
    youtubeIds: ["Pr1ieGZ5atk", "JcpSb7QLZPM", "s_7vhLpLqBc"],
    averages: {
      male: { mean: 12, sd: 5, unit: "reps" },
      female: { mean: 6, sd: 3, unit: "reps" },
    },
    tips: [
      "Bend your knees to reduce difficulty; straight legs are the advanced version",
      "Don't swing — momentum defeats the purpose",
      "Try to tuck your pelvis as you raise, rather than just lifting from the hip",
    ],
    equipment: ["Pull-Up Bar"],
  },

  {
    id: "russian-twist",
    name: "Russian Twist",
    category: "core",
    muscleGroups: ["Obliques", "Rectus Abdominis", "Hip Flexors"],
    description:
      "A rotational core exercise performed seated. With your torso leaned back and feet off the floor, you rotate side to side holding a weight, targeting the obliques.",
    instructions: [
      "Sit on the floor, knees bent, feet slightly off the ground",
      "Lean torso back to about 45°, holding a plate or medicine ball",
      "Rotate the weight to one side, touching or hovering near the floor",
      "Rotate to the other side — that's one rep",
    ],
    frames: [
      { label: "Center", description: "Torso back, weight at center" },
      { label: "Twist", description: "Weight rotated to one side" },
    ],
    youtubeIds: ["wkD8rjkodUI", "JyUqwkVpsi8", "oMv1wUPCFug"],
    averages: {
      male: { mean: 25, sd: 10, unit: "lbs" },
      female: { mean: 10, sd: 4, unit: "lbs" },
    },
    tips: [
      "Rotate from the torso, not just the arms",
      "Keep your back straight — don't round your lower back",
      "Use a medicine ball, plate, or dumbbell for resistance",
    ],
    equipment: ["Weight Plate or Medicine Ball"],
  },

  {
    id: "cable-crunch",
    name: "Cable Crunch",
    category: "core",
    muscleGroups: ["Rectus Abdominis", "Obliques"],
    description:
      "A weighted ab exercise performed kneeling at a cable machine. Allows progressive overload of the abdominals in a way that bodyweight crunches cannot match.",
    instructions: [
      "Kneel below a high cable pulley, grip rope behind head",
      "Hinge at the hips, crunching your elbows toward your knees",
      "Focus on flexing the spine — don't just pull with your arms",
      "Return to the upright position, keeping tension on the cable",
    ],
    frames: [
      { label: "Up", description: "Kneeling upright, rope behind head" },
      { label: "Crunch", description: "Torso flexed forward, elbows to knees" },
    ],
    youtubeIds: ["2fbujeH3F0E", "_T_DLDOTHuM", "wBKllMWGieI"],
    averages: {
      male: { mean: 70, sd: 24, unit: "lbs" },
      female: { mean: 35, sd: 13, unit: "lbs" },
    },
    tips: [
      "Think about bringing your sternum toward your pelvis — spinal flexion, not hip flexion",
      "The hips should stay mostly still",
      "Progressive overload works here — add weight as you get stronger",
    ],
    equipment: ["Cable Machine", "Rope Attachment"],
  },

  {
    id: "side-plank",
    name: "Side Plank",
    category: "core",
    muscleGroups: ["Obliques", "Transverse Abdominis", "Glutes"],
    description:
      "An isometric lateral core exercise. Balancing on one forearm and the side of one foot, you resist lateral spinal flexion — targeting the obliques more directly than a standard plank.",
    instructions: [
      "Lie on your side, forearm on the floor, elbow under shoulder",
      "Stack feet on top of each other and lift your hips off the floor",
      "Body forms a straight line from head to feet",
      "Hold for the desired time, then switch sides",
    ],
    frames: [
      { label: "Hold", description: "Side plank, body straight, hips up" },
    ],
    youtubeIds: ["K2MnUH7PaUk", "IWAlrRfD1lI", "j8tSBMZ8_PU"],
    averages: {
      male: { mean: 55, sd: 25, unit: "reps" },
      female: { mean: 40, sd: 18, unit: "reps" },
    },
    tips: [
      "Don't let your hips sag or pike — stay in a rigid straight line",
      "Brace your glutes and core simultaneously",
      "Progress by lifting the top leg or adding a weight plate on your hip",
    ],
    equipment: ["Mat"],
  },

  {
    id: "kettlebell-swing",
    name: "Kettlebell Swing",
    category: "full-body",
    muscleGroups: ["Glutes", "Hamstrings", "Core", "Shoulders"],
    description:
      "A ballistic hip-hinge movement using a kettlebell. The explosive hip drive propels the bell to chest height, training power, conditioning, and posterior chain all in one movement.",
    instructions: [
      "Stand with feet shoulder-width, kettlebell on floor in front",
      "Hike the bell back between your legs like a hiking pass",
      "Explosively drive hips forward to propel the bell to chest height",
      "Let it fall and hike back, maintaining the hip hinge",
    ],
    frames: [
      { label: "Hike", description: "Hips back, bell between legs" },
      { label: "Drive", description: "Hips extending, bell rising" },
      { label: "Float", description: "Bell at chest height, hips locked out" },
    ],
    youtubeIds: ["mKDIuUbH94k", "sSESeQAir2M", "Bwt0cE1Vej4"],
    averages: {
      male: { mean: 50, sd: 16, unit: "lbs" },
      female: { mean: 26, sd: 9, unit: "lbs" },
    },
    tips: [
      "This is a hip hinge, not a squat — your hips go back, not down",
      "The power comes from your hips, not your arms",
      "Keep the bell close to the body on the downswing to protect your lower back",
    ],
    equipment: ["Kettlebell"],
  },

  {
    id: "farmers-walk",
    name: "Farmer's Walk",
    category: "full-body",
    muscleGroups: ["Forearms", "Traps", "Core", "Glutes", "Quads"],
    description:
      "A loaded carry exercise — you simply walk while holding heavy dumbbells or kettlebells. One of the most functional strength exercises and a tremendous grip and trap builder.",
    instructions: [
      "Pick up heavy dumbbells or kettlebells, one in each hand",
      "Stand tall: chest up, shoulders back, core braced",
      "Walk forward at a controlled pace for the target distance or time",
      "Set the weights down safely at the end",
    ],
    frames: [
      { label: "Stand", description: "Weights at sides, tall posture" },
      { label: "Walk", description: "Moving forward, maintaining posture" },
    ],
    youtubeIds: ["Fkzk2Hf9Wr0", "rt1SVSP8GHY", "4oeQl3-9uO0"],
    averages: {
      male: { mean: 80, sd: 28, unit: "lbs" },
      female: { mean: 38, sd: 14, unit: "lbs" },
    },
    tips: [
      "Walk with short, quick steps — don't lunge",
      "Keep your shoulders pulled back and down — don't let them round forward",
      "Use straps if grip is the limiting factor, not the muscles you're targeting",
    ],
    equipment: ["Dumbbells, Kettlebells, or Trap Bar"],
  },

  {
    id: "cable-lateral-raise",
    name: "Cable Lateral Raise",
    category: "shoulders",
    muscleGroups: ["Medial Deltoids"],
    description:
      "A lateral raise performed with a low cable pulley, providing constant tension throughout the entire range of motion — unlike dumbbells, which have zero tension at the bottom.",
    instructions: [
      "Stand beside a low cable pulley, grip the handle with the far hand",
      "Raise the handle in a wide arc out to the side until arm is parallel to floor",
      "Hold briefly at the top, then lower under control",
      "Keep a slight elbow bend throughout",
    ],
    frames: [
      { label: "Down", description: "Arm at side, cable taut" },
      { label: "Up", description: "Arm parallel to floor, delt contracted" },
    ],
    youtubeIds: ["PPRMoFTB_1E", "QLQMnxJR8E0", "HVDoTqCqS3c"],
    averages: {
      male: { mean: 18, sd: 6, unit: "lbs" },
      female: { mean: 8, sd: 3, unit: "lbs" },
    },
    tips: [
      "Cable provides more tension at the bottom than dumbbells — more effective per rep",
      "Cross your arm slightly in front of your body at the start for more range",
      "Can be done leaning slightly away from the cable for extra stretch",
    ],
    equipment: ["Cable Machine"],
  },

  {
    id: "reverse-curl",
    name: "Reverse Curl",
    category: "arms",
    muscleGroups: ["Brachioradialis", "Brachialis", "Wrist Extensors"],
    description:
      "A curl performed with an overhand (pronated) grip, shifting the emphasis from the bicep to the brachioradialis and wrist extensors. Builds forearm size and improves wrist stability.",
    instructions: [
      "Grip a barbell or EZ-bar with an overhand (palms-down) grip",
      "Curl the bar from hip level to chin level",
      "Keep elbows stationary at your sides",
      "Lower slowly, maintaining the pronated grip",
    ],
    frames: [
      { label: "Down", description: "Arms extended, overhand grip" },
      { label: "Up", description: "Bar at chin, forearms vertical" },
    ],
    youtubeIds: ["r27J9X3KBAQ", "nFgvKTeXgFk", "A7-TefGHMY4"],
    averages: {
      male: { mean: 55, sd: 18, unit: "lbs" },
      female: { mean: 25, sd: 9, unit: "lbs" },
    },
    tips: [
      "You will use significantly less weight than a regular curl — that's normal",
      "Goes well paired with regular curls to hit all heads of the elbow flexors",
      "An EZ-bar reduces wrist strain compared to a straight bar",
    ],
    equipment: ["Barbell or EZ-Bar"],
  },

  // ─── Cardio ──────────────────────────────────────────────────────────────────

  {
    id: "treadmill-run",
    name: "Treadmill Run",
    category: "cardio",
    muscleGroups: ["Quads", "Hamstrings", "Calves", "Cardiovascular System"],
    description:
      "Steady-state or interval running on a treadmill. Builds aerobic capacity, burns calories, and improves cardiovascular health with consistent, controllable effort.",
    instructions: [
      "Set speed and incline to your target pace",
      "Land midfoot, not on your heel",
      "Keep a slight forward lean from the ankles",
      "Swing arms naturally — do not hold the rails",
      "Breathe rhythmically; aim for nasal breathing at moderate effort",
    ],
    frames: [
      { label: "Stride", description: "Foot strikes midfoot under hips" },
      { label: "Drive", description: "Opposite knee drives forward" },
    ],
    youtubeIds: ["_kGESn8ArrU", "brFHyOtTwH4", "ZXGS9HpjFSs"],
    averages: {
      male: { mean: 30, sd: 10, unit: "reps" },
      female: { mean: 25, sd: 8, unit: "reps" },
    },
    tips: [
      "Use a slight 1–2% incline to mimic outdoor running resistance",
      "Interval training (alternate fast/slow) burns more calories than steady pace",
      "Keep cadence around 170–180 steps/min to reduce injury risk",
    ],
    equipment: ["Treadmill"],
  },

  {
    id: "jump-rope",
    name: "Jump Rope",
    category: "cardio",
    muscleGroups: ["Calves", "Shoulders", "Core", "Cardiovascular System"],
    description:
      "High-intensity skipping using a jump rope. Develops coordination, footwork, and cardiovascular endurance simultaneously.",
    instructions: [
      "Grip handles lightly at hip level, elbows close to sides",
      "Jump 1–2 inches off the ground — just enough to clear the rope",
      "Use wrists (not arms) to rotate the rope",
      "Land softly on the balls of your feet",
      "Keep a slight bend in the knees throughout",
    ],
    frames: [
      { label: "Jump", description: "Both feet leave the ground" },
      { label: "Land", description: "Soft landing on balls of feet" },
    ],
    youtubeIds: ["1BZM2bskGK0", "FJmRQ5iTXKE", "oF6_cMCybHE"],
    averages: {
      male: { mean: 100, sd: 40, unit: "reps" },
      female: { mean: 80, sd: 30, unit: "reps" },
    },
    tips: [
      "Start with 30-second intervals; build to 1–3 minute rounds",
      "A speed rope is lighter and better for double-unders",
      "Great warm-up or finisher at the end of a strength session",
    ],
    equipment: ["Jump Rope"],
  },

  {
    id: "burpees",
    name: "Burpees",
    category: "cardio",
    muscleGroups: ["Full Body", "Chest", "Shoulders", "Quads", "Cardiovascular System"],
    description:
      "A demanding full-body movement combining a squat, plank, push-up, and jump. One of the most effective exercises for conditioning and calorie burn.",
    instructions: [
      "Start standing, then squat and place hands on the floor",
      "Jump or step feet back to a push-up position",
      "Perform a full push-up (or skip for easier version)",
      "Jump or step feet back to squat position",
      "Explode upward into a jump, clapping hands overhead",
    ],
    frames: [
      { label: "Stand", description: "Upright start position" },
      { label: "Plank", description: "Hands on floor, body straight" },
      { label: "Jump", description: "Explosive jump at the top" },
    ],
    youtubeIds: ["dZgVxmf6jkA", "JNMZB9GzRYU", "TU8QYVW0gDU"],
    averages: {
      male: { mean: 20, sd: 8, unit: "reps" },
      female: { mean: 15, sd: 6, unit: "reps" },
    },
    tips: [
      "Scale by removing the push-up or the jump",
      "Focus on breathing — exhale on the push-up, inhale on the jump",
      "Time-based sets (30–60 sec) work better than fixed reps for conditioning",
    ],
    equipment: ["Bodyweight"],
  },

  {
    id: "stationary-bike",
    name: "Stationary Bike",
    category: "cardio",
    muscleGroups: ["Quads", "Hamstrings", "Glutes", "Cardiovascular System"],
    description:
      "Low-impact cycling on a fixed bike. Excellent for building cardiovascular fitness without stress on the knees and joints.",
    instructions: [
      "Adjust seat so leg is almost fully extended at the bottom of the pedal stroke",
      "Grip handlebars lightly — do not lean heavily on them",
      "Maintain a cadence of 70–90 RPM for steady state",
      "For intervals, alternate high resistance sprints with recovery",
      "Keep core engaged and back neutral throughout",
    ],
    frames: [
      { label: "Push", description: "Driving pedal downward" },
      { label: "Pull", description: "Pulling pedal upward (with clips)" },
    ],
    youtubeIds: ["2YCRJ3JTBFU", "g8QiCo2bBg8", "oopENzPl8cU"],
    averages: {
      male: { mean: 30, sd: 10, unit: "reps" },
      female: { mean: 25, sd: 8, unit: "reps" },
    },
    tips: [
      "Increase resistance instead of speed to build leg strength",
      "HIIT intervals (20 sec hard / 40 sec easy) are very time-efficient",
      "Clip-in pedals significantly improve pedaling efficiency",
    ],
    equipment: ["Stationary Bike"],
  },

  {
    id: "rowing-machine",
    name: "Rowing Machine",
    category: "cardio",
    muscleGroups: ["Back", "Biceps", "Core", "Legs", "Cardiovascular System"],
    description:
      "Full-body rowing on an ergometer (erg). Combines cardiovascular conditioning with significant muscle engagement — roughly 60% legs, 20% core, 20% upper body.",
    instructions: [
      "Start in the catch: knees bent, arms extended, lean slightly forward",
      "Drive through legs first, then lean back, then pull hands to lower chest",
      "Return in reverse: extend arms, then lean forward, then bend knees",
      "Keep a straight back throughout — avoid rounding the lower back",
      "Target a stroke rate of 18–24 SPM for steady state",
    ],
    frames: [
      { label: "Catch", description: "Knees bent, arms forward" },
      { label: "Drive", description: "Legs push, back opens" },
      { label: "Finish", description: "Legs straight, hands at chest" },
    ],
    youtubeIds: ["H0r_7x0JKDA", "q4BXCWqnSQI", "Y7bJdHsT2G8"],
    averages: {
      male: { mean: 20, sd: 7, unit: "reps" },
      female: { mean: 15, sd: 5, unit: "reps" },
    },
    tips: [
      "80% of power comes from the legs — don't row with your arms first",
      "Focus on ratio: spend more time on the recovery (return) than the drive",
      "Great low-impact substitute for running",
    ],
    equipment: ["Rowing Ergometer"],
  },

  {
    id: "box-jumps",
    name: "Box Jumps",
    category: "cardio",
    muscleGroups: ["Quads", "Glutes", "Calves", "Cardiovascular System"],
    description:
      "Explosive jumps onto a raised platform. Builds lower-body power, fast-twitch muscle activation, and elevates heart rate quickly.",
    instructions: [
      "Stand facing the box, feet shoulder-width apart",
      "Swing arms back, drop into a quarter squat",
      "Explode upward, swinging arms forward for momentum",
      "Land softly on both feet on top of the box",
      "Step down (don't jump down) to protect knees",
    ],
    frames: [
      { label: "Load", description: "Quarter squat, arms back" },
      { label: "Jump", description: "Explosive takeoff" },
      { label: "Land", description: "Soft landing on box" },
    ],
    youtubeIds: ["52r_Ul5k03g", "NBY9-kTuHEk", "v-lROGiL5MA"],
    averages: {
      male: { mean: 15, sd: 6, unit: "reps" },
      female: { mean: 10, sd: 4, unit: "reps" },
    },
    tips: [
      "Start with a lower box (12–18\") and build up",
      "Step down, never jump down — reduces Achilles tendon stress",
      "Pause at the top to reset before each rep",
    ],
    equipment: ["Plyo Box"],
  },

  {
    id: "mountain-climbers",
    name: "Mountain Climbers",
    category: "cardio",
    muscleGroups: ["Core", "Shoulders", "Hip Flexors", "Cardiovascular System"],
    description:
      "A high-intensity bodyweight exercise performed in a plank position, alternately driving knees to the chest. Builds core stability, hip flexor strength, and cardio endurance.",
    instructions: [
      "Start in a high plank: wrists under shoulders, body in a straight line",
      "Drive one knee toward your chest",
      "Quickly switch legs in a running motion",
      "Keep hips level — don't let them rise or sag",
      "Perform for time rather than reps",
    ],
    frames: [
      { label: "Plank", description: "Arms extended, body straight" },
      { label: "Drive", description: "Knee drives toward chest" },
    ],
    youtubeIds: ["nmwgirgXLYM", "cnyTQDSE884", "De_Ql_BX94c"],
    averages: {
      male: { mean: 40, sd: 15, unit: "reps" },
      female: { mean: 30, sd: 12, unit: "reps" },
    },
    tips: [
      "Slow them down for more core work, speed them up for cardio",
      "Keep wrists stacked under shoulders to protect joints",
      "Great as a warm-up or in a circuit between strength sets",
    ],
    equipment: ["Bodyweight"],
  },

  {
    id: "decline-bench-press",
    name: "Decline Bench Press",
    category: "chest",
    muscleGroups: ["Lower Pectorals", "Triceps", "Anterior Deltoids"],
    description:
      "A bench press performed on a decline bench (feet elevated), angling the movement to target the lower portion of the chest. Many lifters find they can move heavier weight in this position.",
    instructions: [
      "Lock feet under the ankle pads, lie back on the decline bench",
      "Grip bar slightly wider than shoulder-width",
      "Lower bar to lower chest with control",
      "Press back up to full arm extension",
    ],
    frames: [
      { label: "Down", description: "Bar at lower chest, decline angle" },
      { label: "Press", description: "Arms extending upward" },
    ],
    youtubeIds: ["LfyQBUKR8SE", "OR5rCFXJkBM", "0nALkBERMz4"],
    averages: {
      male: { mean: 145, sd: 48, unit: "lbs" },
      female: { mean: 70, sd: 25, unit: "lbs" },
    },
    tips: [
      "The decline angle reduces shoulder stress for many people",
      "Bar touches lower on the chest than a flat bench press",
      "Smith machine is a common alternative for solo lifters",
    ],
    equipment: ["Barbell", "Decline Bench", "Rack"],
  },
];

export const CATEGORIES: { id: ExerciseCategory; label: string; color: string }[] = [
  { id: "chest", label: "Chest", color: "bg-red-500" },
  { id: "back", label: "Back", color: "bg-blue-500" },
  { id: "shoulders", label: "Shoulders", color: "bg-yellow-500" },
  { id: "arms", label: "Arms", color: "bg-purple-500" },
  { id: "legs", label: "Legs", color: "bg-green-500" },
  { id: "core", label: "Core", color: "bg-orange-500" },
  { id: "cardio", label: "Cardio", color: "bg-pink-500" },
  { id: "full-body", label: "Full Body", color: "bg-teal-500" },
];

export function getExercise(id: string): Exercise | undefined {
  return EXERCISES.find((e) => e.id === id);
}

export function getExercisesByCategory(category: ExerciseCategory): Exercise[] {
  return EXERCISES.filter((e) => e.category === category);
}
