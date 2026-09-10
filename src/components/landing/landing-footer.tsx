"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-[#eaeaea] dark:border-[#27272a] bg-white dark:bg-[#09090b] text-xs text-slate-500 dark:text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold">
                L
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                Lengine
              </span>
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-xs">
              Cross-Border Trade Intelligence & Maritime Customs Manifest Telemetry.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
            <Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Terminal
            </Link>
            <Link href="/dashboard/trade-flows" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Trade Flows
            </Link>
            <Link href="/dashboard/buyers" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Buyer Directory
            </Link>
            <Link href="/login" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Sign In
            </Link>
          </div>
        </div>

        {/* Compliance Badges Strip */}
        <div className="pt-6 border-t border-[#eaeaea] dark:border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              SOC2 Type II
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              ISO/IEC 27001
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              C-TPAT Tier III Verified
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2 pt-1 text-[11px]">
            <p>© {new Date().getFullYear()} Lengine Inc. All rights reserved.</p>
            <p className="text-slate-400 dark:text-slate-500">
              In partnership with{" "}
              <a
                href="https://www.panoraexports.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 underline decoration-slate-300 dark:decoration-zinc-700 underline-offset-2 transition-colors"
              >
                Panora Exports Ltd (www.panoraexports.com)
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
