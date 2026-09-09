"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-[#eaeaea] bg-white text-xs text-slate-500 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-900 text-white text-xs font-bold">
                L
              </div>
              <span className="text-sm font-semibold text-slate-900 tracking-tight">
                Lengine
              </span>
            </div>
            <p className="text-slate-400 text-xs">
              Cross-Border Trade Intelligence & Maritime Customs Manifest Telemetry.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600">
            <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
              Terminal
            </Link>
            <Link href="/dashboard/trade-flows" className="hover:text-slate-900 transition-colors">
              Trade Flows
            </Link>
            <Link href="/dashboard/buyers" className="hover:text-slate-900 transition-colors">
              Buyer Directory
            </Link>
            <Link href="/login" className="hover:text-slate-900 transition-colors">
              Sign In
            </Link>
          </div>
        </div>

        {/* Compliance Badges Strip */}
        <div className="pt-6 border-t border-[#eaeaea] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1 text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              SOC2 Type II
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              ISO/IEC 27001
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              C-TPAT Tier III Verified
            </span>
          </div>

          <p>© {new Date().getFullYear()} Lengine Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
