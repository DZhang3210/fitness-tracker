"use client";

import { useState } from "react";
import { X, User, Save } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

type Props = {
  existing?: {
    height?: number;
    weight?: number;
    gender?: "male" | "female" | "other";
    heightUnit?: "cm" | "ft";
    weightUnit?: "kg" | "lbs";
  } | null;
  onClose: () => void;
  isOnboarding?: boolean;
};

function cmToFtIn(cm: number) {
  const totalInches = cm / 2.54;
  return {
    ft: Math.floor(totalInches / 12).toString(),
    inches: Math.round(totalInches % 12).toString(),
  };
}

export default function ProfileModal({ existing, onClose, isOnboarding }: Props) {
  const [gender, setGender] = useState<"male" | "female" | "other">(existing?.gender ?? "male");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">(existing?.heightUnit ?? "cm");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">(existing?.weightUnit ?? "lbs");

  const [heightCmVal, setHeightCmVal] = useState(() => {
    if (!existing?.height) return "";
    return Math.round(existing.height).toString();
  });

  const [heightFt, setHeightFt] = useState(() => {
    if (!existing?.height || existing.heightUnit !== "ft") return "";
    return cmToFtIn(existing.height).ft;
  });

  const [heightIn, setHeightIn] = useState(() => {
    if (!existing?.height || existing.heightUnit !== "ft") return "";
    return cmToFtIn(existing.height).inches;
  });

  const [weightVal, setWeightVal] = useState(() => {
    if (!existing?.weight) return "";
    if (existing.weightUnit === "lbs") return Math.round(existing.weight * 2.20462).toString();
    return Math.round(existing.weight).toString();
  });

  const [saving, setSaving] = useState(false);
  const upsertProfile = useMutation(api.users.upsertProfile);

  const isValid = (() => {
    const w = parseFloat(weightVal);
    if (isNaN(w) || w <= 0) return false;
    if (heightUnit === "cm") {
      const h = parseFloat(heightCmVal);
      return !isNaN(h) && h > 0;
    } else {
      const ft = parseFloat(heightFt || "0");
      const ins = parseFloat(heightIn || "0");
      return ft > 0 || ins > 0;
    }
  })();

  const handleSave = async () => {
    if (!isValid) return;
    const w = parseFloat(weightVal);

    let heightCm: number;
    if (heightUnit === "cm") {
      heightCm = parseFloat(heightCmVal);
    } else {
      const ft = parseFloat(heightFt || "0");
      const ins = parseFloat(heightIn || "0");
      heightCm = ft * 30.48 + ins * 2.54;
    }

    const weightKg = weightUnit === "lbs" ? w * 0.453592 : w;

    setSaving(true);
    try {
      await upsertProfile({
        height: Math.round(heightCm * 10) / 10,
        weight: Math.round(weightKg * 10) / 10,
        gender,
        heightUnit,
        weightUnit,
        onboardingComplete: true,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="modal-overlay absolute inset-0 bg-black/50"
        onClick={!isOnboarding ? onClose : undefined}
      />
      <div className="modal-panel relative bg-white border border-gray-100 rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 w-full sm:max-w-md shadow-xl">
        {!isOnboarding && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-indigo-50 rounded-xl">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              {isOnboarding ? "Quick profile setup" : "Edit Profile"}
            </h2>
            <p className="text-xs text-gray-500">Used to calculate your strength percentile</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Gender */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
              Biological sex
            </label>
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
              {(["male", "female", "other"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-150 ${
                    gender === g
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-800 hover:bg-white/60"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Height */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Height</label>
              <div className="flex bg-gray-100 p-0.5 rounded-lg">
                {(["cm", "ft"] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setHeightUnit(u)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                      heightUnit === u
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {heightUnit === "cm" ? (
              <input
                type="number"
                value={heightCmVal}
                onChange={(e) => setHeightCmVal(e.target.value)}
                placeholder="e.g. 178"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-sm transition-shadow"
              />
            ) : (
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    placeholder="5"
                    min="3"
                    max="8"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-sm transition-shadow"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">ft</span>
                </div>
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    placeholder="11"
                    min="0"
                    max="11"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-sm transition-shadow"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">in</span>
                </div>
              </div>
            )}
          </div>

          {/* Weight */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Body weight</label>
              <div className="flex bg-gray-100 p-0.5 rounded-lg">
                {(["lbs", "kg"] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setWeightUnit(u)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                      weightUnit === u
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="number"
              value={weightVal}
              onChange={(e) => setWeightVal(e.target.value)}
              placeholder={weightUnit === "kg" ? "e.g. 80" : "e.g. 176"}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-sm transition-shadow"
            />
          </div>

          <div className="flex gap-3 pt-1">
            {!isOnboarding && (
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={!isValid || saving}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium transition-colors text-sm flex items-center justify-center gap-2"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  Save Profile
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
