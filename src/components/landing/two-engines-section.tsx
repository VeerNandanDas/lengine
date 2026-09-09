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

export function TwoEnginesSection() {
  return (
    <section id="engines" className="py-20 border-t border-[#eaeaea] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-700 text-xs font-normal mb-3"
          >
            Unified Architecture
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 leading-tight">
            Two institutional engines built for one cross-border trade workflow
          </h2>
          <p className="mt-3 text-base text-slate-500">
            Combine macro commodity telemetry with granular customs manifest inspection to discover buyers, quantify demand, and negotiate optimal freight terms.
          </p>
        </div>

        {/* 2-Column Product Engine Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Engine 1: Trade Flows */}
          <div className="bg-[#fafafa] rounded-xl border border-[#eaeaea] p-8 flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-10 w-10 rounded-lg bg-white border border-[#eaeaea] flex items-center justify-center text-indigo-600 shadow-xs">
                  <Globe className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-slate-400">ENGINE 01</span>
              </div>

              <h3 className="text-xl font-semibold text-slate-900">
                Macro Trade Flows Engine
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Benchmark 3-year export volumes (TEUs), destination market concentration, and bilateral tariff schedules across HS codes.
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>3-Year quarterly TEU volume trajectories with YoY deltas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Top 5 destination market concentration bar analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Bilateral freight corridors with MFN / FTA tariff rates</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#eaeaea] flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Coverage: HS 0101 – 9999
              </span>
              <Link
                href="/dashboard/trade-flows"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 hover:text-indigo-600 transition-colors"
              >
                <span>Launch Trade Flows</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Engine 2: Buyer Directory */}
          <div className="bg-[#fafafa] rounded-xl border border-[#eaeaea] p-8 flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-10 w-10 rounded-lg bg-white border border-[#eaeaea] flex items-center justify-center text-indigo-600 shadow-xs">
                  <Users className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-slate-400">ENGINE 02</span>
              </div>

              <h3 className="text-xl font-semibold text-slate-900">
                Buyer Directory & BoL Manifests
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Direct customs manifest ingestion providing verified foreign consignees, derived import MOQs, and raw Bill of Lading histories.
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Derived MOQ ranges and preferred Incoterms (FOB / CIF)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>12-Month import consistency sparkline telemetry</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Side-sheet Bill of Lading inspector (containers & weights)</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#eaeaea] flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Records: 4.8M+ Verified BoLs
              </span>
              <Link
                href="/dashboard/buyers"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 hover:text-indigo-600 transition-colors"
              >
                <span>Browse Buyer Directory</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
