"use client";

import {
  Activity,
  Atom,
  BookOpen,
  FileText,
  Menu,
  Orbit,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import AmbientAudio from "./AmbientAudio";
const navigation = [
  { name: "Overview", icon: Activity, href: "/experiments" },
  { name: "Experiments", icon: Atom, href: "/experiments" },
  { name: "Research notebook", icon: BookOpen, href: "/notebook" },
  { name: "Observation archive", icon: Orbit, href: "/archive" },
  { name: "Final report", icon: FileText, href: "/final-report" },
];

export default function AppShell({
  children,
  active = "Overview",
}: {
  children: React.ReactNode;
  active?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d1b] text-[#edf0fa]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-[#26324b]
        bg-[#0d1425] p-5 transition-transform md:translate-x-0
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-10 flex items-center gap-3">
          <div className="rounded-2xl border border-[#3b3470] bg-[#1d1a36] p-3">
            <Sparkles className="text-[#b8a8ff]" size={22} />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide">
              THE OBSERVABLE UNIVERSE
            </p>
            <p className="text-xs text-[#7685a7]">
              RITU-001 · PRIVATE INITIATIVE
            </p>
          </div>
        </div>

        <p className="lab-label mb-4">Laboratory</p>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const selected = active === item.name;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition
                ${
                  selected
                    ? "border border-[#3b3470] bg-[#292443] text-[#d4c9ff]"
                    : "text-[#929fbd] hover:bg-[#18223a] hover:text-[#edf0fa]"
                }`}
              >
                <Icon size={18} />
                {item.name}
                {selected && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#b8a8ff]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-5 right-5 rounded-2xl border border-[#26324b] bg-[#0b1224] p-4">
          <p className="lab-label">Principal investigator</p>
          <p className="mt-1 font-medium">Ritu Maurya</p>
          <p className="mt-2 text-xs text-[#929fbd]">
            Engineering Physics · IIT Delhi
          </p>
          <p className="mt-1 text-xs text-emerald-300">
            Research ongoing · 19 Nov
          </p>
        </div>
      </aside>

      <main className="min-h-screen md:ml-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#26324b] bg-[#090d1b]/90 px-5 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
              aria-label="Toggle navigation"
            >
              <Menu size={20} />
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg border border-[#26324b]
                px-3 py-2 text-xs text-[#b8a4ff] transition hover:bg-[#18223a]"
            >
              <ArrowLeft size={14} />
              Universe
            </Link>

            <span className="hidden text-xs tracking-widest text-[#929fbd] md:inline">
              PRIVATE RESEARCH LAB
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            SYSTEM ONLINE
          </div>
        </header>

        <div className="mx-auto max-w-7xl p-5 md:p-8">{children}</div>
    <AmbientAudio/>
      </main>
    </div>
  );
}