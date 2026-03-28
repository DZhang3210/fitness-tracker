"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Dumbbell, User, Search, Pin, BarChart2, Calendar, Zap,
  ArrowRight, Check,
} from "lucide-react";
import Link from "next/link";

// ─── Mini mockup components ───────────────────────────────────────────────────

function ProfileMockup() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm w-64">
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Your profile</p>
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-4">
        {["Male", "Female", "Other"].map((g) => (
          <div key={g} className={`flex-1 py-1.5 rounded-lg text-xs text-center font-medium ${g === "Male" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400"}`}>{g}</div>
        ))}
      </div>
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Height</span>
          <div className="flex bg-gray-100 rounded-md overflow-hidden text-[10px]">
            <span className="px-2 py-0.5 bg-white shadow-sm text-gray-700 font-medium">cm</span>
            <span className="px-2 py-0.5 text-gray-400">ft</span>
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700">178</div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Body weight</span>
          <div className="flex bg-gray-100 rounded-md overflow-hidden text-[10px]">
            <span className="px-2 py-0.5 bg-white shadow-sm text-gray-700 font-medium">lbs</span>
            <span className="px-2 py-0.5 text-gray-400">kg</span>
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700">176</div>
      </div>
      <div className="bg-indigo-600 rounded-xl py-2 text-center text-xs text-white font-semibold">Save Profile</div>
    </div>
  );
}

function LibraryMockup() {
  const exercises = [
    { name: "Bench Press", cat: "Chest", catColor: "bg-pink-50 text-pink-700", muscles: "Pectorals · Triceps", pinned: true },
    { name: "Barbell Squat", cat: "Legs", catColor: "bg-blue-50 text-blue-700", muscles: "Quads · Glutes", pinned: false },
    { name: "Pull-Up", cat: "Back", catColor: "bg-emerald-50 text-emerald-700", muscles: "Lats · Biceps", pinned: true },
    { name: "Overhead Press", cat: "Shoulders", catColor: "bg-orange-50 text-orange-700", muscles: "Delts · Triceps", pinned: false },
  ];
  return (
    <div className="space-y-2 w-64">
      {exercises.map((ex) => (
        <div key={ex.name} className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3 shadow-sm">
          <div className="flex-1 min-w-0">
            <span className={`inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded-full mb-0.5 ${ex.catColor}`}>{ex.cat}</span>
            <p className="text-xs font-semibold text-gray-900 truncate">{ex.name}</p>
            <p className="text-[10px] text-gray-400">{ex.muscles}</p>
          </div>
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${ex.pinned ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
            <Pin className="w-3.5 h-3.5" fill={ex.pinned ? "currentColor" : "none"} />
          </div>
        </div>
      ))}
    </div>
  );
}

function PinMockup() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm w-64">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 bg-green-50 rounded-xl">
          <Pin className="w-4 h-4 text-green-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-900">Pin Exercise</p>
          <p className="text-[11px] text-gray-400">Bench Press</p>
        </div>
      </div>
      <p className="text-[10px] text-gray-400 mb-1.5">Weight <span className="text-gray-300">(optional)</span></p>
      <div className="flex gap-2 mb-3">
        <div className="flex-1 bg-gray-50 border border-indigo-300 rounded-xl px-3 py-2 text-xs text-gray-900">135</div>
        <div className="flex border border-gray-200 rounded-xl overflow-hidden text-xs">
          <div className="px-2.5 py-2 bg-indigo-600 text-white font-medium">lbs</div>
          <div className="px-2.5 py-2 text-gray-400">kg</div>
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-[10px] text-gray-500 mb-3">
        <span className="text-amber-500 font-medium">psst...</span> the average is{" "}
        <span className="text-gray-900 font-semibold">145 lbs</span>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 border border-gray-200 rounded-xl py-2 text-center text-xs text-gray-500">Cancel</div>
        <div className="flex-1 bg-indigo-600 rounded-xl py-2 text-center text-xs text-white font-semibold">Pin</div>
      </div>
    </div>
  );
}

function StatsMockup() {
  const bars = [
    { pct: "10th", val: 95, w: 40 },
    { pct: "25th", val: 120, w: 55 },
    { pct: "50th", val: 155, w: 70 },
    { pct: "75th", val: 185, w: 85, active: true },
    { pct: "90th", val: 220, w: 100 },
  ];
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm w-64">
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-[10px] text-gray-400 mb-0.5">Your weight</p>
          <p className="text-xl font-bold text-gray-900">185 <span className="text-sm text-gray-400 font-normal">lbs</span></p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 mb-0.5">Percentile</p>
          <p className="text-xl font-bold text-emerald-600">74th</p>
        </div>
      </div>
      <div className="h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" style={{ width: "74%" }} />
      </div>
      <div className="space-y-2">
        {bars.map((b) => (
          <div key={b.pct} className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 w-10 flex-shrink-0">{b.pct}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className={`h-full rounded-full ${b.active ? "bg-emerald-500" : "bg-gray-300"}`} style={{ width: `${b.w}%` }} />
            </div>
            <span className={`text-[10px] w-12 text-right flex-shrink-0 ${b.active ? "text-emerald-600 font-semibold" : "text-gray-400"}`}>{b.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GroupsMockup() {
  const groups = [
    { title: "Push Day", days: "Mon · Thu", color: "border-l-indigo-500", exercises: ["Bench Press", "OHP", "Tricep Ext"] },
    { title: "Pull Day", days: "Tue · Fri", color: "border-l-emerald-500", exercises: ["Pull-Up", "Barbell Row", "Curl"] },
    { title: "Leg Day", days: "Wed · Sat", color: "border-l-violet-500", exercises: ["Squat", "RDL", "Leg Press"] },
  ];
  return (
    <div className="space-y-2.5 w-64">
      {groups.map((g) => (
        <div key={g.title} className={`bg-white border border-gray-200 rounded-xl p-3 border-l-4 ${g.color} shadow-sm`}>
          <p className="text-xs font-semibold text-gray-900">{g.title}</p>
          <p className="text-[10px] text-gray-400 mb-2">{g.days}</p>
          <div className="space-y-1">
            {g.exercises.map((ex) => (
              <div key={ex} className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2 py-1">
                <div className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                <span className="text-[10px] text-gray-600">{ex}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RoutineMockup() {
  const routines = [
    { name: "Push / Pull / Legs", tag: "Hypertrophy", days: "6 days/week", level: "Intermediate", levelColor: "text-amber-600", applied: false },
    { name: "Upper / Lower", tag: "Strength", days: "4 days/week", level: "Beginner", levelColor: "text-emerald-600", applied: true },
    { name: "Strength Powerlifting", tag: "Strength", days: "4 days/week", level: "Advanced", levelColor: "text-red-500", applied: false },
  ];
  return (
    <div className="space-y-2.5 w-64">
      {routines.map((r) => (
        <div key={r.name} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[9px] bg-indigo-50 text-indigo-600 border border-indigo-100 px-1.5 py-0.5 rounded-full font-medium">{r.tag}</span>
              <span className={`text-[9px] font-medium ${r.levelColor}`}>{r.level}</span>
            </div>
            <p className="text-xs font-semibold text-gray-900 truncate">{r.name}</p>
            <p className="text-[10px] text-gray-400">{r.days}</p>
          </div>
          {r.applied ? (
            <div className="flex-shrink-0 flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-medium px-2 py-1 rounded-lg border border-emerald-100">
              <Check className="w-3 h-3" /> Added!
            </div>
          ) : (
            <div className="flex-shrink-0 bg-indigo-600 text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-lg">
              Use This
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TutorialStep({
  number,
  icon,
  title,
  description,
  flip,
  visual,
}: {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  flip: boolean;
  visual: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col ${flip ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-20`}>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 flex-shrink-0">
            {number}
          </div>
          <div className="p-2 bg-gray-100 rounded-xl flex-shrink-0">{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-500 leading-relaxed">{description}</p>
      </div>
      <div className="flex-shrink-0 flex justify-center">{visual}</div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { signIn } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push("/dashboard");
  }, [isAuthenticated, router]);

  const handleSignIn = () => signIn("github", { redirectTo: "/dashboard" });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Dumbbell className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-900">
              Super <span className="text-indigo-600">Simple</span>
            </span>
          </Link>
          <button
            onClick={handleSignIn}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-1.5 rounded-lg transition-colors text-sm"
          >
            Sign in
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-5 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6 border border-indigo-100">
          <Dumbbell className="w-3.5 h-3.5" />
          Free · No subscriptions · No fluff
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-5 leading-tight">
          The super simple way<br />to track your fitness
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
          Browse 49+ exercises, log your working weights, see your percentile vs. real standards, and plan your week — all in one clean place.
        </p>
        <button
          onClick={handleSignIn}
          className="inline-flex items-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
        >
          Get started
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-xs text-gray-400 mt-3">Sign in with GitHub · takes about 10 seconds</p>
      </section>

      {/* Steps */}
      <section className="bg-white border-y border-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest text-center mb-2">How it works</p>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-16">
            From sign-in to your first workout in minutes
          </h2>

          <div className="space-y-20">
            <TutorialStep
              number={1}
              icon={<User className="w-5 h-5 text-indigo-600" />}
              title="Set up your profile"
              description="Enter your height, weight, and biological sex. We use these to calculate your strength percentile against lifters your size — adjusting averages for body weight. It's quick and completely optional, but unlocks the most useful part of the app."
              flip={false}
              visual={<ProfileMockup />}
            />
            <TutorialStep
              number={2}
              icon={<Search className="w-5 h-5 text-emerald-600" />}
              title="Browse 49+ exercises"
              description="Chest, back, legs, shoulders, arms, core — it's all here. Search by exercise name or muscle group, filter by category, read descriptions, step-by-step instructions, and open tutorial videos right from the card."
              flip={true}
              visual={<LibraryMockup />}
            />
            <TutorialStep
              number={3}
              icon={<Pin className="w-5 h-5 text-amber-600" />}
              title="Pin with your working weight"
              description="Hit the pin icon on any exercise to save it to your library. Enter the weight you currently use — or skip it entirely. If you skip, we still show you the distribution and quietly whisper the average so you have a reference point."
              flip={false}
              visual={<PinMockup />}
            />
            <TutorialStep
              number={4}
              icon={<BarChart2 className="w-5 h-5 text-violet-600" />}
              title="See where you rank"
              description="Once you've logged a weight, we calculate your percentile against people your size using real strength standards. See the full distribution, your exact percentile, and a strength level label — Beginner through Elite."
              flip={true}
              visual={<StatsMockup />}
            />
            <TutorialStep
              number={5}
              icon={<Calendar className="w-5 h-5 text-blue-600" />}
              title="Organize your workout week"
              description="Create named workout groups and assign them to days of the week. Push Day on Monday and Thursday, Leg Day on Wednesday — whatever your split. Drag exercises in, drag to reorder. The dashboard shows everything at a glance."
              flip={false}
              visual={<GroupsMockup />}
            />
            <TutorialStep
              number={6}
              icon={<Zap className="w-5 h-5 text-orange-500" />}
              title="Or start from a premade routine"
              description="Not sure where to start? Choose from 6 expert-designed programs: Push/Pull/Legs, Upper/Lower, Full Body, Bro Split, Strength/Powerlifting, or Athletic. One click — all groups and exercises are added automatically. Weights are optional."
              flip={true}
              visual={<RoutineMockup />}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-lg mx-auto px-5 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to start?</h2>
        <p className="text-gray-500 mb-7 text-sm">
          Sign in with GitHub — it takes about 10 seconds and there&apos;s nothing to fill out except your profile.
        </p>
        <button
          onClick={handleSignIn}
          className="inline-flex items-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
        >
          Sign in
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-400">
        Super Simple Fitness Tracker · Built with Next.js + Convex
      </footer>
    </div>
  );
}
