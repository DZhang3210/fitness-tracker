// Normal distribution CDF approximation (Abramowitz & Stegun)
function normalCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  const poly =
    t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  const p = 1 - d * poly;
  return x > 0 ? p : 1 - p;
}

export function calcPercentile(value: number, mean: number, sd: number): number {
  const z = (value - mean) / sd;
  return Math.round(normalCDF(z) * 100);
}

// Body-weight adjusted mean — scale average based on user's weight vs reference (75kg)
export function adjustedMean(mean: number, userWeightKg: number): number {
  const referenceBW = 75; // kg reference bodyweight for averages
  const ratio = userWeightKg / referenceBW;
  // Scale linearly with diminishing returns above reference
  const scaleFactor = ratio < 1 ? ratio * 0.9 + 0.1 : 1 + (ratio - 1) * 0.6;
  return mean * scaleFactor;
}

// Height adjustment — taller people have slightly more leverage advantages on certain lifts
export function heightAdjustmentLabel(
  heightCm: number,
  exerciseId: string
): string | null {
  const tallExercises = ["deadlift", "squat", "barbell-row"];
  const shortExercises = ["bench-press", "overhead-press"];

  if (heightCm > 185) {
    if (tallExercises.includes(exerciseId)) return "Longer limbs add challenge";
    if (shortExercises.includes(exerciseId)) return "Shorter ROM is an advantage";
  } else if (heightCm < 165) {
    if (tallExercises.includes(exerciseId)) return "Shorter ROM is an advantage";
    if (shortExercises.includes(exerciseId)) return "Longer ROM adds challenge";
  }
  return null;
}

export function getStrengthLevel(percentile: number): {
  label: string;
  color: string;
} {
  if (percentile >= 95) return { label: "Elite", color: "text-yellow-500" };
  if (percentile >= 80) return { label: "Advanced", color: "text-green-500" };
  if (percentile >= 60) return { label: "Intermediate", color: "text-blue-500" };
  if (percentile >= 35) return { label: "Novice", color: "text-gray-400" };
  return { label: "Beginner", color: "text-gray-300" };
}

// Convert lbs to kg
export function lbsToKg(lbs: number): number {
  return Math.round(lbs * 0.453592 * 10) / 10;
}

// Convert kg to lbs
export function kgToLbs(kg: number): number {
  return Math.round(kg * 2.20462 * 10) / 10;
}

// Convert height: feet decimal to cm (e.g. 5.11 → 5 ft 11 in)
export function ftToCm(ftDecimal: number): number {
  const feet = Math.floor(ftDecimal);
  const inches = Math.round((ftDecimal - feet) * 100);
  return Math.round((feet * 30.48) + (inches * 2.54));
}

export function cmToFtDisplay(cm: number): string {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
}
