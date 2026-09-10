"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function LandingNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#eaeaea] dark:border-[#27272a] bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold flex-shrink-0">
            L
          </div>
          <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
            Lengine
          </span>
          <span className="hidden sm:inline-flex text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] text-slate-600 dark:text-slate-400">
            Institutional
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
          <a
            href="#system"
            className="hover:text-slate-900 dark:hover:text-white transition-colors font-medium text-slate-900 dark:text-white"
          >
            System Architecture
          </a>
          <a
            href="#integrations"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Integrations
          </a>
          <a
            href="#engines"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Dual Engines
          </a>
          <Link
            href="/dashboard/trade-flows"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Trade Flows
          </Link>
          <Link
            href="/dashboard/buyers"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Buyer Directory
          </Link>
          <a
            href="#pricing"
            className="hover:text-slate-900 dark:hover:text-white transition-colors font-medium text-indigo-600 dark:text-indigo-400"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Track Record
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/login"
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-[#18181b] transition-colors font-medium"
          >
            Sign In
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center h-8 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-medium px-3.5 rounded-lg shadow-xs transition-colors"
          >
            Access Terminal
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
