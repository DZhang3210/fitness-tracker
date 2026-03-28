"use client";

import { useState } from "react";
import { Pin, Youtube, ChevronDown, ChevronUp, Info, Dumbbell } from "lucide-react";
import { Exercise, CATEGORIES } from "@/lib/exercises";
import { calcPercentile, adjustedMean, getStrengthLevel } from "@/lib/stats";

type Props = {
  exercise: Exercise;
  pinned?: { _id: string; resistance?: number; resistanceUnit?: "lbs" | "kg"; sets?: number; reps?: number } | null;
  userWeight?: number; // kg
  userGender?: "male" | "female" | "other";
  onPin: (exercise: Exercise) => void;
  onViewStats: (exercise: Exercise) => void;
};

function DistributionBar({
  exercise,
  userWeight,
  userGender,
  userResistanceLbs,
}: {
  exercise: Exercise;
  userWeight?: number;
  userGender?: "male" | "female" | "other";
  userResistanceLbs?: number;
}) {
  const gender = userGender === "other" ? "male" : (userGender ?? "male");
  const avgData = exercise.averages[gender];
  const refWeight = userWeight ?? 75;
  const mean = adjustedMean(avgData.mean, refWeight);
  const sd = avgData.sd;

  const zScores = [-1.282, -0.524, 0, 0.524, 1.282];
  const buckets = zScores.map((z) => Math.round(mean + z * sd));

  let userBucket = -1;
  if (userResistanceLbs !== undefined) {
    const pct = calcPercentile(userResistanceLbs, mean, sd);
    userBucket = pct < 20 ? 0 : pct < 40 ? 1 : pct < 60 ? 2 : pct < 80 ? 3 : 4;
  }

  return (
    <div>
      <div className="flex gap-0.5 mb-1">
        {buckets.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
            <div
              className={`w-full rounded-sm transition-colors ${
                userBucket === i
                  ? "bg-emerald-500"
                  : userBucket === -1
                  ? "bg-gray-200"
                  : i < userBucket
                  ? "bg-gray-300"
                  : "bg-gray-150"
              }`}
              style={{ height: `${8 + i * 3}px` }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-0.5">
        {buckets.map((val, i) => (
          <div key={i} className="flex-1 text-center">
            <span className="text-[9px] text-gray-400">{val}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-0.5 mt-0.5">
        {["10%", "30%", "50%", "70%", "90%"].map((l, i) => (
          <div key={i} className="flex-1 text-center">
            <span className="text-[8px] text-gray-300">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ExerciseCard({
  exercise,
  pinned,
  userWeight,
  userGender,
  onPin,
  onViewStats,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showYouTube, setShowYouTube] = useState(false);

  const category = CATEGORIES.find((c) => c.id === exercise.category);
  const hasResistance = pinned && pinned.resistance !== undefined && pinned.resistance !== null;

  let percentileInfo: { percentile: number; label: string; color: string } | null = null;
  let userResistanceLbs: number | undefined;

  if (hasResistance && pinned.resistance !== undefined) {
    userResistanceLbs =
      pinned.resistanceUnit === "kg"
        ? pinned.resistance * 2.20462
        : pinned.resistance;

    if (userWeight && userGender && userGender !== "other") {
      const avgData = exercise.averages[userGender];
      const adjustedAvg = adjustedMean(avgData.mean, userWeight);
      const pct = calcPercentile(userResistanceLbs, adjustedAvg, avgData.sd);
      const level = getStrengthLevel(pct);
      percentileInfo = { percentile: pct, ...level };
    }
  }

  const gender = userGender === "other" ? "male" : (userGender ?? "male");
  const avgData = exercise.averages[gender];
  const hintAvgLbs = userWeight ? Math.round(adjustedMean(avgData.mean, userWeight)) : avgData.mean;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all shadow-sm">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {category && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full text-white uppercase tracking-wide ${category.color}`}
                >
                  {category.label}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-base text-gray-900 truncate">{exercise.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{exercise.muscleGroups.slice(0, 2).join(", ")}</p>
          </div>
          <button
            onClick={() => onPin(exercise)}
            title={pinned ? "Update pin" : "Pin to dashboard"}
            className={`p-2 rounded-xl transition-colors flex-shrink-0 ${
              pinned
                ? "bg-green-50 text-green-600 hover:bg-green-100"
                : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
            }`}
          >
            <Pin className="w-4 h-4" fill={pinned ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Pinned state */}
        {pinned && (
          <div className="mt-2.5 space-y-2">
            {hasResistance ? (
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-2.5 py-1">
                  <Dumbbell className="w-3 h-3 text-green-600" />
                  <span className="text-green-700 text-xs font-medium">
                    {pinned.resistance} {pinned.resistanceUnit}
                  </span>
                </div>
                {(pinned.sets || pinned.reps) && (
                  <div className="flex items-center gap-1 bg-indigo-50 border border-indigo-100 rounded-lg px-2.5 py-1">
                    <span className="text-indigo-700 text-xs font-medium">
                      {pinned.sets ?? "—"} × {pinned.reps ?? "—"}
                    </span>
                  </div>
                )}
                {percentileInfo ? (
                  <button
                    onClick={() => onViewStats(exercise)}
                    className={`text-xs font-medium ${percentileInfo.color} flex items-center gap-1 hover:opacity-70 transition-opacity`}
                  >
                    <span>{percentileInfo.percentile}th %ile</span>
                    <span className="text-gray-300">·</span>
                    <span>{percentileInfo.label}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onPin(exercise)}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Add profile for percentile →
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                    Distribution ({avgData.unit})
                  </span>
                  <button
                    onClick={() => onPin(exercise)}
                    className="text-[10px] text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    + Add your weight
                  </button>
                </div>
                <DistributionBar
                  exercise={exercise}
                  userWeight={userWeight}
                  userGender={userGender}
                  userResistanceLbs={userResistanceLbs}
                />
                <div className="flex items-start gap-1 mt-1">
                  <span className="text-amber-500 text-[10px] flex-shrink-0">psst...</span>
                  <span className="text-[10px] text-gray-400">
                    the average is{" "}
                    <span className="text-gray-900 font-medium">{hintAvgLbs} lbs</span>
                    {avgData.unit === "reps" ? " reps" : ""}
                    {userWeight ? " for your body weight" : ""}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors text-xs border-t border-gray-100"
      >
        <span>{expanded ? "Less" : "More info"}</span>
        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
          <p className="text-gray-500 text-xs leading-relaxed pt-3">{exercise.description}</p>

          <div>
            <h4 className="text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1">
              <Info className="w-3 h-3" /> How to
            </h4>
            <ol className="space-y-1">
              {exercise.instructions.map((step, i) => (
                <li key={i} className="text-xs text-gray-500 flex gap-2">
                  <span className="text-emerald-600 font-bold flex-shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-600 mb-1.5">Tips</h4>
            <ul className="space-y-1">
              {exercise.tips.map((tip, i) => (
                <li key={i} className="text-xs text-gray-500 flex gap-2">
                  <span className="text-amber-500 flex-shrink-0">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <button
              onClick={() => setShowYouTube(!showYouTube)}
              className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1.5 transition-colors"
            >
              <Youtube className="w-3.5 h-3.5" />
              {showYouTube ? "Hide" : "Show"} video guides ({exercise.youtubeIds.length})
            </button>
            {showYouTube && (
              <div className="mt-2 flex flex-col gap-1.5">
                {exercise.youtubeIds.map((id, i) => (
                  <a
                    key={id}
                    href={`https://www.youtube.com/watch?v=${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1.5 transition-colors"
                  >
                    <Youtube className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">Guide {i + 1}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {exercise.equipment.map((eq) => (
              <span
                key={eq}
                className="text-[10px] text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 bg-gray-50"
              >
                {eq}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
