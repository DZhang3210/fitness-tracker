"use client";

// Simplified stick figure SVG frames for each exercise

type FigureProps = { className?: string };

// Generic stick figure poses
const FigureStanding = ({ className }: FigureProps) => (
  <svg viewBox="0 0 60 100" className={className} fill="none">
    <circle cx="30" cy="10" r="8" stroke="currentColor" strokeWidth="2.5" />
    <line x1="30" y1="18" x2="30" y2="55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="28" x2="12" y2="45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="28" x2="48" y2="45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="55" x2="18" y2="82" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="55" x2="42" y2="82" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="18" y1="82" x2="14" y2="95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="42" y1="82" x2="46" y2="95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FigureSquatDown = ({ className }: FigureProps) => (
  <svg viewBox="0 0 60 100" className={className} fill="none">
    <circle cx="30" cy="10" r="8" stroke="currentColor" strokeWidth="2.5" />
    <line x1="30" y1="18" x2="30" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="25" x2="12" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="25" x2="48" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bent legs */}
    <line x1="30" y1="48" x2="14" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="48" x2="46" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="14" y1="60" x2="10" y2="82" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="46" y1="60" x2="50" y2="82" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="10" y1="82" x2="8" y2="92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="50" y1="82" x2="52" y2="92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FigureLying = ({ className }: FigureProps) => (
  <svg viewBox="0 0 120 60" className={className} fill="none">
    {/* Head */}
    <circle cx="10" cy="22" r="8" stroke="currentColor" strokeWidth="2.5" />
    {/* Body horizontal */}
    <line x1="18" y1="22" x2="75" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Arms up (holding bar) */}
    <line x1="35" y1="22" x2="30" y2="5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="55" y1="22" x2="60" y2="5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bar */}
    <line x1="22" y1="5" x2="68" y2="5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* Legs */}
    <line x1="75" y1="22" x2="90" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="75" y1="22" x2="88" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="90" y1="32" x2="105" y2="35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="88" y1="18" x2="104" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FigureLyingBarDown = ({ className }: FigureProps) => (
  <svg viewBox="0 0 120 60" className={className} fill="none">
    <circle cx="10" cy="22" r="8" stroke="currentColor" strokeWidth="2.5" />
    <line x1="18" y1="22" x2="75" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Arms down to chest (bar low) */}
    <line x1="35" y1="22" x2="32" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="55" y1="22" x2="58" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bar at chest */}
    <line x1="24" y1="15" x2="66" y2="15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <line x1="75" y1="22" x2="90" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="75" y1="22" x2="88" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="90" y1="32" x2="105" y2="35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="88" y1="18" x2="104" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FigureDeadliftSet = ({ className }: FigureProps) => (
  <svg viewBox="0 0 80 100" className={className} fill="none">
    <circle cx="30" cy="8" r="7" stroke="currentColor" strokeWidth="2.5" />
    {/* Bent torso */}
    <line x1="30" y1="15" x2="20" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="25" x2="50" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="25" x2="10" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Hands to bar */}
    <line x1="50" y1="32" x2="52" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="10" y1="32" x2="8" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bar */}
    <line x1="2" y1="62" x2="58" y2="62" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* Bent knees */}
    <line x1="20" y1="48" x2="16" y2="72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="20" y1="48" x2="32" y2="68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="16" y1="72" x2="14" y2="88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="68" x2="34" y2="88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FigureDeadliftTop = ({ className }: FigureProps) => (
  <svg viewBox="0 0 80 100" className={className} fill="none">
    <circle cx="35" cy="8" r="7" stroke="currentColor" strokeWidth="2.5" />
    <line x1="35" y1="15" x2="35" y2="55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Arms down holding bar */}
    <line x1="35" y1="28" x2="16" y2="58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="35" y1="28" x2="54" y2="58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="10" y1="58" x2="60" y2="58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* Legs */}
    <line x1="35" y1="55" x2="24" y2="80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="35" y1="55" x2="46" y2="80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="24" y1="80" x2="20" y2="94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="46" y1="80" x2="50" y2="94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FigureOverheadPress = ({ className }: FigureProps) => (
  <svg viewBox="0 0 60 120" className={className} fill="none">
    <circle cx="30" cy="10" r="8" stroke="currentColor" strokeWidth="2.5" />
    <line x1="30" y1="18" x2="30" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Arms up overhead */}
    <line x1="30" y1="28" x2="12" y2="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="28" x2="48" y2="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bar overhead */}
    <line x1="6" y1="8" x2="54" y2="8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <line x1="30" y1="62" x2="18" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="62" x2="42" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="18" y1="90" x2="14" y2="110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="42" y1="90" x2="46" y2="110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FigurePressAtShoulders = ({ className }: FigureProps) => (
  <svg viewBox="0 0 60 120" className={className} fill="none">
    <circle cx="30" cy="10" r="8" stroke="currentColor" strokeWidth="2.5" />
    <line x1="30" y1="18" x2="30" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Arms bent at shoulders */}
    <line x1="30" y1="28" x2="10" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="28" x2="50" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="10" y1="28" x2="12" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="50" y1="28" x2="48" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="6" y1="14" x2="54" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <line x1="30" y1="62" x2="18" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="62" x2="42" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="18" y1="90" x2="14" y2="110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="42" y1="90" x2="46" y2="110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FigureBentOverRow = ({ className }: FigureProps) => (
  <svg viewBox="0 0 100 80" className={className} fill="none">
    <circle cx="20" cy="15" r="7" stroke="currentColor" strokeWidth="2.5" />
    {/* Bent torso */}
    <line x1="20" y1="22" x2="60" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Arms hanging */}
    <line x1="35" y1="30" x2="35" y2="55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="50" y1="36" x2="52" y2="56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="26" y1="55" x2="60" y2="55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* Legs */}
    <line x1="60" y1="40" x2="55" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="60" y1="40" x2="72" y2="65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="55" y1="70" x2="52" y2="78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="72" y1="65" x2="74" y2="78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FigureBentOverRowTop = ({ className }: FigureProps) => (
  <svg viewBox="0 0 100 80" className={className} fill="none">
    <circle cx="20" cy="15" r="7" stroke="currentColor" strokeWidth="2.5" />
    <line x1="20" y1="22" x2="60" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Arms pulled back */}
    <line x1="35" y1="30" x2="30" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="50" y1="36" x2="48" y2="47" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="24" y1="44" x2="54" y2="46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <line x1="60" y1="40" x2="55" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="60" y1="40" x2="72" y2="65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="55" y1="70" x2="52" y2="78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="72" y1="65" x2="74" y2="78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FigureCurlDown = ({ className }: FigureProps) => (
  <svg viewBox="0 0 60 110" className={className} fill="none">
    <circle cx="30" cy="10" r="8" stroke="currentColor" strokeWidth="2.5" />
    <line x1="30" y1="18" x2="30" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Arms down */}
    <line x1="30" y1="28" x2="14" y2="55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="28" x2="46" y2="55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Dumbbells */}
    <rect x="10" y="55" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="42" y="55" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
    <line x1="30" y1="60" x2="18" y2="88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="60" x2="42" y2="88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="18" y1="88" x2="14" y2="102" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="42" y1="88" x2="46" y2="102" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FigureCurlUp = ({ className }: FigureProps) => (
  <svg viewBox="0 0 60 110" className={className} fill="none">
    <circle cx="30" cy="10" r="8" stroke="currentColor" strokeWidth="2.5" />
    <line x1="30" y1="18" x2="30" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Arms bent up */}
    <line x1="30" y1="28" x2="12" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="28" x2="48" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="12" y1="30" x2="10" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="48" y1="30" x2="50" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="6" y="14" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="46" y="14" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
    <line x1="30" y1="60" x2="18" y2="88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="60" x2="42" y2="88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="18" y1="88" x2="14" y2="102" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="42" y1="88" x2="46" y2="102" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FigurePlank = ({ className }: FigureProps) => (
  <svg viewBox="0 0 140 60" className={className} fill="none">
    <circle cx="15" cy="18" r="8" stroke="currentColor" strokeWidth="2.5" />
    {/* Body diagonal */}
    <line x1="22" y1="20" x2="115" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Forearms on ground */}
    <line x1="40" y1="23" x2="38" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="60" y1="25" x2="58" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="32" y1="40" x2="65" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Legs */}
    <line x1="115" y1="30" x2="125" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="108" y1="29" x2="118" y2="47" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="112" y1="47" x2="130" y2="48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FigurePullUpHang = ({ className }: FigureProps) => (
  <svg viewBox="0 0 60 120" className={className} fill="none">
    {/* Bar */}
    <line x1="5" y1="5" x2="55" y2="5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* Arms up */}
    <line x1="20" y1="5" x2="22" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="40" y1="5" x2="38" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="30" cy="28" r="8" stroke="currentColor" strokeWidth="2.5" />
    <line x1="30" y1="36" x2="30" y2="78" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="48" x2="14" y2="65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="48" x2="46" y2="65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="78" x2="22" y2="105" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="78" x2="38" y2="105" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const FigurePullUpTop = ({ className }: FigureProps) => (
  <svg viewBox="0 0 60 120" className={className} fill="none">
    <line x1="5" y1="5" x2="55" y2="5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* Short arms — chin near bar */}
    <line x1="16" y1="5" x2="16" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="44" y1="5" x2="44" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="30" cy="22" r="8" stroke="currentColor" strokeWidth="2.5" />
    <line x1="30" y1="30" x2="30" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="38" x2="14" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="38" x2="46" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="60" x2="20" y2="88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="60" x2="40" y2="88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Map exercise IDs to their frame sequences
type FrameSequence = { label: string; component: React.FC<FigureProps> }[];

const EXERCISE_FRAMES: Record<string, FrameSequence> = {
  "bench-press": [
    { label: "Set Up", component: FigureLying },
    { label: "Lower", component: FigureLyingBarDown },
    { label: "Press", component: FigureLying },
  ],
  "squat": [
    { label: "Stand", component: FigureStanding },
    { label: "Descent", component: FigureSquatDown },
    { label: "Drive", component: FigureStanding },
  ],
  "deadlift": [
    { label: "Set", component: FigureDeadliftSet },
    { label: "Pull", component: FigureDeadliftTop },
    { label: "Lockout", component: FigureDeadliftTop },
  ],
  "overhead-press": [
    { label: "Rack", component: FigurePressAtShoulders },
    { label: "Press", component: FigureOverheadPress },
    { label: "Lockout", component: FigureOverheadPress },
  ],
  "barbell-row": [
    { label: "Hinge", component: FigureBentOverRow },
    { label: "Pull", component: FigureBentOverRowTop },
    { label: "Top", component: FigureBentOverRowTop },
  ],
  "pull-up": [
    { label: "Hang", component: FigurePullUpHang },
    { label: "Pull", component: FigurePullUpTop },
    { label: "Top", component: FigurePullUpTop },
  ],
  "lat-pulldown": [
    { label: "Reach", component: FigurePressAtShoulders },
    { label: "Pull", component: FigureBentOverRowTop },
    { label: "Finish", component: FigureBentOverRowTop },
  ],
  "dumbbell-curl": [
    { label: "Down", component: FigureCurlDown },
    { label: "Mid", component: FigureCurlUp },
    { label: "Up", component: FigureCurlUp },
  ],
  "tricep-pushdown": [
    { label: "Up", component: FigureStanding },
    { label: "Push", component: FigureStanding },
    { label: "Lockout", component: FigureStanding },
  ],
  "leg-press": [
    { label: "Down", component: FigureSquatDown },
    { label: "Press", component: FigureStanding },
    { label: "Up", component: FigureStanding },
  ],
  "romanian-deadlift": [
    { label: "Stand", component: FigureStanding },
    { label: "Hinge", component: FigureBentOverRow },
    { label: "Stretch", component: FigureBentOverRow },
  ],
  "hip-thrust": [
    { label: "Down", component: FigurePlank },
    { label: "Drive", component: FigurePlank },
    { label: "Top", component: FigurePlank },
  ],
  "dumbbell-shoulder-press": [
    { label: "Start", component: FigurePressAtShoulders },
    { label: "Press", component: FigureOverheadPress },
    { label: "Top", component: FigureOverheadPress },
  ],
  "cable-fly": [
    { label: "Open", component: FigureStanding },
    { label: "Mid", component: FigureBentOverRowTop },
    { label: "Close", component: FigureStanding },
  ],
  "face-pull": [
    { label: "Extend", component: FigureStanding },
    { label: "Pull", component: FigureBentOverRowTop },
    { label: "Finish", component: FigureBentOverRowTop },
  ],
  "lunges": [
    { label: "Stand", component: FigureStanding },
    { label: "Step", component: FigureSquatDown },
    { label: "Down", component: FigureSquatDown },
  ],
  "plank": [
    { label: "Hold", component: FigurePlank },
    { label: "Breathe", component: FigurePlank },
  ],
  "seated-cable-row": [
    { label: "Reach", component: FigureBentOverRow },
    { label: "Pull", component: FigureBentOverRowTop },
    { label: "Contract", component: FigureBentOverRowTop },
  ],
  "incline-db-press": [
    { label: "Down", component: FigurePressAtShoulders },
    { label: "Press", component: FigureOverheadPress },
    { label: "Top", component: FigureOverheadPress },
  ],
};

export function ExerciseStickFigures({ exerciseId }: { exerciseId: string }) {
  const frames = EXERCISE_FRAMES[exerciseId] ?? [
    { label: "Start", component: FigureStanding },
    { label: "End", component: FigureStanding },
  ];

  return (
    <div className="flex items-end gap-2">
      {frames.map((frame, i) => {
        const Component = frame.component;
        const isLandscape = ["bench-press", "barbell-row", "plank", "hip-thrust", "seated-cable-row", "romanian-deadlift"].includes(exerciseId);
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`text-green-400 ${
                isLandscape ? "w-16 h-10" : "w-10 h-14"
              } flex items-center justify-center`}
            >
              <Component className={`w-full h-full ${i === 1 ? "opacity-100" : "opacity-60"}`} />
            </div>
            <span className="text-[10px] text-gray-500">{frame.label}</span>
            {i < frames.length - 1 && (
              <div className="absolute" style={{ display: "none" }} />
            )}
          </div>
        );
      })}
      {/* Arrow separators */}
    </div>
  );
}

export function ExerciseStickFiguresWithArrows({ exerciseId }: { exerciseId: string }) {
  const frames = EXERCISE_FRAMES[exerciseId] ?? [
    { label: "Start", component: FigureStanding },
    { label: "End", component: FigureStanding },
  ];

  const isLandscape = ["bench-press", "barbell-row", "plank", "hip-thrust", "seated-cable-row", "romanian-deadlift"].includes(exerciseId);

  return (
    <div className="flex items-center gap-1">
      {frames.map((frame, i) => {
        const Component = frame.component;
        return (
          <div key={i} className="flex items-center gap-1">
            <div className="flex flex-col items-center gap-1">
              <div className={`text-green-400 ${isLandscape ? "w-20 h-12" : "w-12 h-16"} flex items-center justify-center`}>
                <Component className="w-full h-full" />
              </div>
              <span className="text-[10px] text-gray-500 whitespace-nowrap">{frame.label}</span>
            </div>
            {i < frames.length - 1 && (
              <svg viewBox="0 0 16 16" className="w-4 h-4 text-gray-600 flex-shrink-0 -mt-4" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
