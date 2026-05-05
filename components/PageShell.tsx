"use client";

import Navbar from "@/components/Navbar";

type User = {
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

export default function PageShell({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return (
    // h-dvh + overflow-hidden on the outer shell prevents the body from
    // scrolling. Scroll happens in the inner div instead, so the mobile
    // browser never hides its chrome and the fixed bottom nav stays put.
    <div
      className="flex flex-col bg-gray-50 dark:bg-gray-950 overflow-hidden"
      style={{ height: "100dvh" }}
    >
      <Navbar user={user} />
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {children}
      </div>
    </div>
  );
}
