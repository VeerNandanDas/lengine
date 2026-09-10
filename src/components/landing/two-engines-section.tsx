"use client";

import Link from "next/link";
import {
  Globe,
  Users,
  ArrowRight,
  TrendingUp,
  FileText,
  Anchor,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RadarChartDemo } from "@/components/ui/radar-chart";

export function TwoEnginesSection() {
  return (
    <section id="engines" className="py-20 border-t border-[#eaeaea] dark:border-[#27272a] bg-white dark:bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <Badge
            variant="secondary"
            className="bg-slate-100 dark:bg-[#18181b] text-slate-700 dark:text-slate-300 border border-[#eaeaea] dark:border-[#27272a] text-xs font-normal mb-3"
          >
            Unified Architecture
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
            Two institutional engines built for one cross-border trade workflow
          </h2>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            Combine macro commodity telemetry with granular customs manifest inspection to discover buyers, quantify demand, and negotiate optimal freight terms.
          </p>
        </div>

        {/* 2-Column Product Engine Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Engine 1: Trade Flows */}
          <div className="bg-[#fafafa] dark:bg-[#0e0e11] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-8 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-10 w-10 rounded-lg bg-white dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-xs">
                  <Globe className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-slate-400 dark:text-slate-500">ENGINE 01</span>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Macro Trade Flows Engine
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Benchmark 3-year export volumes (TEUs), destination market concentration, and bilateral tariff schedules across HS codes.
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>3-Year quarterly TEU volume trajectories with YoY deltas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Top 5 destination market concentration bar analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Bilateral freight corridors with MFN / FTA tariff rates</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#eaeaea] dark:border-[#27272a] flex items-center justify-between">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                Coverage: HS 0101 – 9999
              </span>
              <Link
                href="/dashboard/trade-flows"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <span>Launch Trade Flows</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Engine 2: Buyer Directory */}
          <div className="bg-[#fafafa] dark:bg-[#0e0e11] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-8 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-10 w-10 rounded-lg bg-white dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-xs">
                  <Users className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-slate-400 dark:text-slate-500">ENGINE 02</span>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Buyer Directory & BoL Manifests
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct customs manifest ingestion providing verified foreign consignees, derived import MOQs, and raw Bill of Lading histories.
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Derived MOQ ranges and preferred Incoterms (FOB / CIF)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>12-Month import consistency sparkline telemetry</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Side-sheet Bill of Lading inspector (containers & weights)</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#eaeaea] dark:border-[#27272a] flex items-center justify-between">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                Records: 4.8M+ Verified BoLs
              </span>
              <Link
                href="/dashboard/buyers"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <span>Browse Buyer Directory</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Minimal Cross-Sector Demand Radar Telemetry */}
        <div className="mt-10 bg-[#fafafa] dark:bg-[#0e0e11] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
              <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wider">
                Cross-Category Telemetry
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Multi-Sector Volume Velocity Radar
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Synthesizing customs manifests across major trade categories to benchmark demand concentration, tariff exposure, and quarterly growth trajectories.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] text-slate-700 dark:text-slate-300 font-medium shadow-2xs">
                HS 85 • Electronics
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] text-slate-700 dark:text-slate-300 font-medium shadow-2xs">
                HS 61-62 • Apparel
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] text-slate-700 dark:text-slate-300 font-medium shadow-2xs">
                HS 09-21 • Groceries
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] text-slate-700 dark:text-slate-300 font-medium shadow-2xs">
                HS 94 • Furniture
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] text-slate-700 dark:text-slate-300 font-medium shadow-2xs">
                HS 95 • Toys
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] text-slate-700 dark:text-slate-300 font-medium shadow-2xs">
                HS 33 • Beauty
              </span>
            </div>
          </div>

          <div className="w-full max-w-[340px] flex justify-center">
            <RadarChartDemo
              title="By Category"
              description="Sales performance by category (Jan - Jun 2024)"
              className="w-full bg-white dark:bg-[#121215] border border-[#eaeaea] dark:border-[#27272a]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
