"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Dumbbell, LayoutDashboard, Search, Calendar, User, LogOut, ChevronDown, Pencil, ChevronRight, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import ProfileModal from "./ProfileModal";
import { useTheme } from "./ThemeProvider";

type Theme = "light" | "dark";

type Props = {
  user: {
    name?: string | null;
    image?: string | null;
    profile?: {
      height?: number;
      weight?: number;
      gender?: "male" | "female" | "other";
      heightUnit?: "cm" | "ft";
      weightUnit?: "kg" | "lbs";
      onboardingComplete?: boolean;
    } | null;
  } | null;
};

const NAV_LINKS = [
  { href: "/schedule",  label: "Schedule",  icon: <Calendar className="w-5 h-5" /> },
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "/exercises", label: "Exercises", icon: <Search className="w-5 h-5" /> },
];

export default function Navbar({ user }: Props) {
  const { signOut } = useAuthActions();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState(false);

  const handleSignOut = async () => {
    setShowMenu(false);
    setShowMobileProfile(false);
    await signOut();
    router.push("/");
  };

  return (
    <>
      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold flex-shrink-0">
              <Dumbbell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-gray-900 dark:text-gray-100">
                Super <span className="text-indigo-600 dark:text-indigo-400">Simple</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden sm:flex items-center gap-0.5">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    pathname === l.href
                      ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {l.icon}
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme selector */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>

              {showThemeMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowThemeMenu(false)} />
                  <div className="absolute right-0 top-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg w-36 py-1 overflow-hidden z-20">
                    {([
                      { value: "light" as Theme, label: "Light", icon: <Sun className="w-3.5 h-3.5" /> },
                      { value: "dark" as Theme, label: "Dark", icon: <Moon className="w-3.5 h-3.5" /> },
                    ]).map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setTheme(opt.value); setShowThemeMenu(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                          theme === opt.value
                            ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 font-medium"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {opt.icon}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Desktop user menu */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {user?.image ? (
                  <Image src={user.image} alt="" width={28} height={28} className="rounded-full" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300">{user?.name?.split(" ")[0]}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {showMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                  <div className="absolute right-0 top-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg w-48 py-1 overflow-hidden z-20">
                    <button
                      onClick={() => { setShowMenu(false); setShowProfile(true); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Edit Profile
                    </button>
                    <div className="border-t border-gray-100 dark:border-gray-800 my-1" />
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile: avatar in top-right */}
            <button
              onClick={() => setShowMobileProfile(true)}
              className="sm:hidden p-1"
            >
              {user?.image ? (
                <Image src={user.image} alt="" width={30} height={30} className="rounded-full" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile bottom tab bar ─────────────────────────────────────── */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
                  active ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {l.icon}
                <span className="text-[10px] font-medium">{l.label}</span>
              </Link>
            );
          })}
          {/* Profile tab */}
          <button
            onClick={() => setShowMobileProfile(true)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
              showMobileProfile ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-500"
            }`}
          >
            {user?.image ? (
              <Image
                src={user.image}
                alt=""
                width={20}
                height={20}
                className={`rounded-full ${showMobileProfile ? "ring-2 ring-indigo-500" : ""}`}
              />
            ) : (
              <User className="w-5 h-5" />
            )}
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </div>
      </nav>

      {/* ── Mobile profile sheet ──────────────────────────────────────── */}
      {showMobileProfile && (
        <div className="fixed inset-0 z-50 flex items-end sm:hidden">
          <div className="modal-overlay absolute inset-0 bg-black/50" onClick={() => setShowMobileProfile(false)} />
          <div className="modal-panel relative bg-white dark:bg-gray-900 rounded-t-2xl w-full shadow-xl">
            {/* User info */}
            <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800">
              {user?.image ? (
                <Image src={user.image} alt="" width={44} height={44} className="rounded-full" />
              ) : (
                <div className="w-11 h-11 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{user?.name ?? "Athlete"}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {user?.profile?.onboardingComplete ? "Profile complete" : "Profile not set up"}
                </p>
              </div>
            </div>

            {/* Profile stats */}
            {user?.profile?.weight && (
              <div className="flex gap-3 px-5 py-3 border-b border-gray-100 dark:border-gray-800">
                {user.profile.height && (
                  <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 text-center">
                    <p className="text-xs text-gray-400 dark:text-gray-500">Height</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {user.profile.heightUnit === "ft"
                        ? (() => {
                            const totalIn = Math.round((user.profile.height ?? 0) / 2.54);
                            return `${Math.floor(totalIn / 12)}'${totalIn % 12}"`;
                          })()
                        : `${Math.round(user.profile.height ?? 0)} cm`}
                    </p>
                  </div>
                )}
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 text-center">
                  <p className="text-xs text-gray-400 dark:text-gray-500">Weight</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {user.profile.weightUnit === "lbs"
                      ? `${Math.round((user.profile.weight ?? 0) * 2.20462)} lbs`
                      : `${Math.round(user.profile.weight ?? 0)} kg`}
                  </p>
                </div>
                {user.profile.gender && (
                  <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 text-center">
                    <p className="text-xs text-gray-400 dark:text-gray-500">Sex</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 capitalize">{user.profile.gender}</p>
                  </div>
                )}
              </div>
            )}

            {/* Theme selector */}
            <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800">
              <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Appearance</p>
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                {([
                  { value: "light" as Theme, label: "Light", icon: <Sun className="w-3.5 h-3.5" /> },
                  { value: "dark" as Theme, label: "Dark", icon: <Moon className="w-3.5 h-3.5" /> },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                      theme === opt.value
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-3 space-y-1.5">
              <button
                onClick={() => { setShowMobileProfile(false); setShowProfile(true); }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="flex items-center gap-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                  <Pencil className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  Edit Profile
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
              >
                <span className="flex items-center gap-3 text-sm font-medium text-red-600 dark:text-red-400">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </span>
                <ChevronRight className="w-4 h-4 text-red-300 dark:text-red-600" />
              </button>
            </div>

            <div className="pb-4" />
          </div>
        </div>
      )}

      {showProfile && (
        <ProfileModal existing={user?.profile} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
}
