"use client";

import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Search,
  TrendingUp,
  Globe,
  Anchor,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-0 overflow-hidden">
      {/* Ambient Warmth Glow Aura (inspired by reference image) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] pointer-events-none -z-10 opacity-70">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/40 via-rose-100/30 to-amber-100/30 blur-3xl rounded-full transform -translate-y-1/2" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Release / Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#eaeaea] shadow-xs text-xs text-slate-600 mb-6">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-slate-900">
            Lengine 2.4 Live
          </span>
          <span className="text-slate-300">•</span>
          <span>4.8M+ Maritime Manifests & Derived MOQs</span>
          <ArrowRight className="h-3 w-3 text-slate-400" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.12]">
          Trade intelligence that{" "}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">
            actually unlocks
          </span>{" "}
          global markets
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Direct maritime manifest ingestion, derived consignee MOQs, and bilateral tariff optimization engineered for high-volume exporters and global trading desks.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center h-11 px-6 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-lg shadow-sm transition-colors"
          >
            Enter Live Terminal
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

          <Link
            href="/dashboard/trade-flows"
            className="inline-flex items-center justify-center h-11 px-6 border border-[#eaeaea] bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-lg transition-colors"
          >
            <Globe className="mr-2 h-4 w-4 text-slate-400" />
            Explore Trade Corridors
          </Link>
        </div>

        {/* Verified Data Sources Strip */}
        <div className="mt-12 pt-6 border-t border-[#eaeaea]/80">
          <p className="text-[11px] uppercase tracking-widest font-mono text-slate-400 mb-4">
            Ingesting Telemetry From Global Carriers & Customs Registries
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold text-slate-400 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
            <span className="tracking-wider">MAERSK LINE</span>
            <span>•</span>
            <span className="tracking-wider">MSC MEDITERRANEAN</span>
            <span>•</span>
            <span className="tracking-wider">CMA CGM</span>
            <span>•</span>
            <span className="tracking-wider">HAPAG-LLOYD</span>
            <span>•</span>
            <span className="tracking-wider">ONE NETWORK</span>
            <span>•</span>
            <span className="tracking-wider">UN COMTRADE</span>
          </div>
        </div>

        {/* Interactive MacBook Terminal Mockup Container - Attached to bottom edge of Hero Section (Dark Mode) */}
        <div className="mt-12 bg-[#0B0F19] rounded-t-2xl sm:rounded-t-3xl rounded-b-none border-t border-x border-slate-800/90 border-b-0 shadow-[0_-12px_32px_-8px_rgba(15,23,42,0.18),0_-4px_12px_-2px_rgba(15,23,42,0.08),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden text-left mb-0">
          {/* macOS Terminal Window Chrome Header (Dark Mode) */}
          <div className="px-4 py-3 bg-[#131826] border-b border-slate-800 flex items-center justify-between select-none">
            {/* macOS Window Controls (Traffic Lights) */}
            <div className="flex items-center gap-2 group/controls">
              {/* Close (Red) */}
              <button
                type="button"
                aria-label="Close"
                className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center text-[#8e1d17] hover:brightness-110 transition-all cursor-default"
              >
                <svg
                  className="w-1.5 h-1.5 opacity-0 group-hover/controls:opacity-100 transition-opacity"
                  viewBox="0 0 6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                >
                  <path d="M1 1L5 5M5 1L1 5" />
                </svg>
              </button>

              {/* Minimize (Yellow) */}
              <button
                type="button"
                aria-label="Minimize"
                className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center text-[#8f610a] hover:brightness-110 transition-all cursor-default"
              >
                <svg
                  className="w-1.5 h-1.5 opacity-0 group-hover/controls:opacity-100 transition-opacity"
                  viewBox="0 0 6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                >
                  <path d="M1 3H5" />
                </svg>
              </button>

              {/* Maximize/Zoom (Green) */}
              <button
                type="button"
                aria-label="Maximize"
                className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center text-[#0e6118] hover:brightness-110 transition-all cursor-default"
              >
                <svg
                  className="w-1.5 h-1.5 opacity-0 group-hover/controls:opacity-100 transition-opacity"
                  viewBox="0 0 6 6"
                  fill="currentColor"
                >
                  <path d="M1 1.5V5H4.5L1 1.5ZM5 4.5V1H1.5L5 4.5Z" />
                </svg>
              </button>

              {/* Title / Path Pill */}
              <div className="ml-3 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0B0F19] border border-slate-700/80 shadow-inner font-mono text-[11px] text-slate-300">
                <span className="text-slate-500 font-sans">⌘</span>
                <span>lengine-terminal://corridors/live-telemetry</span>
              </div>
            </div>

            {/* Mobile Fallback Title */}
            <span className="sm:hidden font-mono text-[11px] text-slate-400 truncate max-w-[170px]">
              live-telemetry
            </span>

            {/* Right Status Badge */}
            <div className="flex items-center gap-2 text-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-mono text-[11px] font-medium bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                FEED ACTIVE
              </span>
            </div>
          </div>

          {/* Terminal Body Preview (Dark Mode) */}
          <div className="p-5 sm:p-6 bg-[#0B0F19] space-y-4">
            {/* Search query representation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#131826] border border-slate-800/90 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-950/80 border border-indigo-800/50 flex items-center justify-center text-indigo-400 flex-shrink-0">
                  <Search className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-white">
                      HS 6302.31
                    </span>
                    <span className="text-xs text-slate-300 font-medium">
                      Bed & Bath Linens (Organic Sateen)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Lead Corridor: Nhava Sheva (IN) → Long Beach (US)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 text-xs sm:justify-end">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase tracking-wider font-mono">Global TEUs</span>
                  <span className="font-mono font-semibold text-white">4.82M</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase tracking-wider font-mono">YoY Growth</span>
                  <span className="font-mono font-semibold text-emerald-400">+11.4%</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase tracking-wider font-mono">Tariff Rate</span>
                  <span className="font-mono font-semibold text-slate-200">6.0% MFN</span>
                </div>
              </div>
            </div>

            {/* Quick row of verified foreign consignees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl border border-slate-800/80 bg-[#111625] hover:border-indigo-500/40 hover:bg-[#151c2e] transition-all group">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">Pacific Textiles LLC</span>
                  <span className="text-xs">🇺🇸</span>
                </div>
                <p className="text-[11px] text-slate-400">Port of Long Beach (USLGB)</p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400">MOQ: 1,200 TEUs</span>
                  <span className="font-mono text-indigo-400 font-medium bg-indigo-950/70 border border-indigo-800/40 px-1.5 py-0.5 rounded text-[10px]">
                    FOB / CIF
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-800/80 bg-[#111625] hover:border-indigo-500/40 hover:bg-[#151c2e] transition-all group">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">Meridian Nordic AG</span>
                  <span className="text-xs">🇩🇪</span>
                </div>
                <p className="text-[11px] text-slate-400">Port of Hamburg (DEHAM)</p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400">MOQ: 850 TEUs</span>
                  <span className="font-mono text-indigo-400 font-medium bg-indigo-950/70 border border-indigo-800/40 px-1.5 py-0.5 rounded text-[10px]">
                    CIF / DDP
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-800/80 bg-[#111625] hover:border-indigo-500/40 hover:bg-[#151c2e] transition-all group">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">Al-Mansoor Gulf FZE</span>
                  <span className="text-xs">🇦🇪</span>
                </div>
                <p className="text-[11px] text-slate-400">Port of Jebel Ali (AEJEA)</p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400">MOQ: 2,400 TEUs</span>
                  <span className="font-mono text-indigo-400 font-medium bg-indigo-950/70 border border-indigo-800/40 px-1.5 py-0.5 rounded text-[10px]">
                    FOB / EXW
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
