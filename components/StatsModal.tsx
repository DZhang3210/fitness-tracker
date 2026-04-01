"use client";

import { X, TrendingUp, Users } from "lucide-react";
import { Exercise } from "@/lib/exercises";
import {
  calcPercentile,
  adjustedMean,
  getStrengthLevel,
  heightAdjustmentLabel,
  kgToLbs,
  cmToFtDisplay,
} from "@/lib/stats";

type Props = {
  exercise: Exercise;
  resistance: number;
  resistanceUnit: "lbs" | "kg";
  userWeight: number;
  userHeight: number;
  userGender: "male" | "female" | "other";
  onClose: () => void;
};

export default function StatsModal({
  exercise,
  resistance,
  resistanceUnit,
  userWeight,
  userHeight,
  userGender,
  onClose,
}: Props) {
  const gender = userGender === "other" ? "male" : userGender;
  const avgData = exercise.averages[gender];

  const resistanceInLbs =
    resistanceUnit === "kg" ? resistance * 2.20462 : resistance;

  const adjustedAvg = adjustedMean(avgData.mean, userWeight);
  const percentile = calcPercentile(resistanceInLbs, adjustedAvg, avgData.sd);
  const level = getStrengthLevel(percentile);
  const heightNote = heightAdjustmentLabel(userHeight, exercise.id);

  const bwRatio = (resistanceInLbs / kgToLbs(userWeight)).toFixed(2);

  const dist = [10, 25, 50, 75, 90].map((pct) => {
    const z =
      pct === 50 ? 0 :
      pct === 25 ? -0.674 :
      pct === 10 ? -1.282 :
      pct === 75 ? 0.674 : 1.282;
    const val = Math.round(adjustedAvg + z * avgData.sd);
    return { pct, val };
  });

  const maxVal = dist[dist.length - 1].val;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="modal-overlay absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="modal-panel relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 w-full sm:max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-violet-50 dark:bg-violet-950 rounded-xl">
            <TrendingUp className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">{exercise.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your strength stats</p>
          </div>
        </div>

        {/* Your stat */}
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 mb-4">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-gray-400 dark:text-gray-500 text-xs mb-1">Your weight</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {resistance} <span className="text-lg text-gray-400 dark:text-gray-500 font-normal">{resistanceUnit}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 dark:text-gray-500 text-xs mb-1">Percentile</p>
              <p className={`text-3xl font-bold ${level.color}`}>{percentile}th</p>
            </div>
          </div>

          <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all"
              style={{ width: `${Math.min(percentile, 99)}%` }}
            />
            <div
              className="absolute top-0 h-full w-0.5 bg-white/70 dark:bg-gray-900/70"
              style={{ left: `${Math.min(percentile, 99)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-1">
            <span>0th</span>
            <span>50th</span>
            <span>100th</span>
          </div>

          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <span className={`text-sm font-semibold ${level.color}`}>{level.label}</span>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{bwRatio}× bodyweight</span>
            {heightNote && (
              <>
                <span className="text-gray-300 dark:text-gray-600">·</span>
                <span className="text-xs text-gray-400 dark:text-gray-500 italic">{heightNote}</span>
              </>
            )}
          </div>
        </div>

        {/* Distribution */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            Distribution for {gender === "male" ? "men" : "women"} (~{Math.round(userWeight)}kg)
          </h3>
          <div className="space-y-2.5">
            {dist.map(({ pct, val }) => {
              const isUser = Math.abs(
                calcPercentile(resistanceInLbs, adjustedAvg, avgData.sd) - pct
              ) < 13;
              return (
                <div key={pct} className="flex items-center gap-3">
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 w-14 flex-shrink-0">{pct}th %ile</span>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isUser ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"}`}
                      style={{ width: `${(val / maxVal) * 100}%` }}
                    />
                  </div>
                  <span className={`text-[11px] w-16 text-right flex-shrink-0 ${isUser ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-gray-400 dark:text-gray-500"}`}>
                    {val} lbs
                    {avgData.unit === "reps" && " reps"}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2">
            Averages are for intermediate-level gym-goers, body-weight adjusted.
            {userGender === "other" && " Using male standards as reference."}
          </p>
        </div>

        {/* User context */}
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3 text-xs text-gray-400 dark:text-gray-500 flex gap-4">
          <span>Height: {cmToFtDisplay(userHeight)} / {Math.round(userHeight)}cm</span>
          <span>Weight: {Math.round(userWeight)}kg / {Math.round(kgToLbs(userWeight))}lbs</span>
        </div>
      </div>
    </div>
  );
}
