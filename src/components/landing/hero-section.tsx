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
    <section className="relative pt-12 pb-20 overflow-hidden">
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

        {/* Interactive Terminal Mockup Container */}
        <div className="mt-10 bg-white rounded-xl border border-[#eaeaea] shadow-sm overflow-hidden text-left">
          {/* Terminal Window Header */}
          <div className="px-4 py-3 bg-[#fafafa] border-b border-[#eaeaea] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-slate-200 border border-slate-300" />
              <span className="h-3 w-3 rounded-full bg-slate-200 border border-slate-300" />
              <span className="h-3 w-3 rounded-full bg-slate-200 border border-slate-300" />
              <span className="ml-2 font-mono text-xs text-slate-500">
                lengine-terminal://corridors/live-telemetry
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-500 font-mono text-[11px]">FEED ACTIVE</span>
            </div>
          </div>

          {/* Terminal Body Preview */}
          <div className="p-5 sm:p-6 bg-white space-y-4">
            {/* Search query representation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-lg bg-[#fafafa] border border-[#eaeaea]">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded bg-white border border-[#eaeaea] flex items-center justify-center text-indigo-600">
                  <Search className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-slate-900">
                      HS 6302.31
                    </span>
                    <span className="text-xs text-slate-600 font-medium">
                      Bed & Bath Linens (Organic Sateen)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Lead Corridor: Nhava Sheva (IN) → Long Beach (US)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs sm:justify-end">
                <div>
                  <span className="text-slate-400 text-[10px] block">Global TEUs</span>
                  <span className="font-mono font-semibold text-slate-900">4.82M</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">YoY Growth</span>
                  <span className="font-mono font-semibold text-emerald-600">+11.4%</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Tariff Rate</span>
                  <span className="font-mono font-semibold text-slate-900">6.0% MFN</span>
                </div>
              </div>
            </div>

            {/* Quick row of verified foreign consignees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-lg border border-[#eaeaea] bg-white">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-900 truncate">Pacific Textiles LLC</span>
                  <span className="text-xs">🇺🇸</span>
                </div>
                <p className="text-[11px] text-slate-500">Port of Long Beach (USLGB)</p>
                <div className="mt-2 flex items-center justify-between text-[11px] pt-1.5 border-t border-[#eaeaea]">
                  <span className="text-slate-400">MOQ: 1,200 TEUs</span>
                  <span className="font-mono text-indigo-600 font-medium">FOB / CIF</span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[#eaeaea] bg-white">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-900 truncate">Meridian Nordic AG</span>
                  <span className="text-xs">🇩🇪</span>
                </div>
                <p className="text-[11px] text-slate-500">Port of Hamburg (DEHAM)</p>
                <div className="mt-2 flex items-center justify-between text-[11px] pt-1.5 border-t border-[#eaeaea]">
                  <span className="text-slate-400">MOQ: 850 TEUs</span>
                  <span className="font-mono text-indigo-600 font-medium">CIF / DDP</span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[#eaeaea] bg-white">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-900 truncate">Al-Mansoor Gulf FZE</span>
                  <span className="text-xs">🇦🇪</span>
                </div>
                <p className="text-[11px] text-slate-500">Port of Jebel Ali (AEJEA)</p>
                <div className="mt-2 flex items-center justify-between text-[11px] pt-1.5 border-t border-[#eaeaea]">
                  <span className="text-slate-400">MOQ: 2,400 TEUs</span>
                  <span className="font-mono text-indigo-600 font-medium">FOB / EXW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
