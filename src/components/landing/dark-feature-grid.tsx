"use client";

import {
  FileSearch,
  Container,
  Layers,
  ShieldCheck,
  Clock,
  CheckSquare,
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Automated HS Code Telemetry",
    desc: "Instant resolution and cross-referencing of 6-digit and 10-digit tariff classifications across 180+ global customs jurisdictions.",
  },
  {
    icon: Container,
    title: "Raw Bill of Lading Ingestion",
    desc: "Daily automated parsing of carrier manifests, container IDs, vessel tracking, and verified gross shipment weights.",
  },
  {
    icon: Layers,
    title: "Derived Consignee MOQs",
    desc: "Empirical minimum order quantities and import cadences calculated directly from multi-year historical port filings.",
  },
  {
    icon: ShieldCheck,
    title: "Bilateral Tariff Verification",
    desc: "Up-to-date duty schedules, MFN baseline rates, FTA preferential exemptions, and retaliatory trade action tracking.",
  },
  {
    icon: Clock,
    title: "Corridor Transit Telemetry",
    desc: "Accurate tracking of average transit days and port of discharge clearance timelines across major maritime lanes.",
  },
  {
    icon: CheckSquare,
    title: "Verified Consignee Registry",
    desc: "Complete counterparty audit trails including ISO, OEKO-TEX, GOTS, and C-TPAT customs compliance badges.",
  },
];

export function DarkFeatureGrid() {
  return (
    <section id="features" className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-2">
            Institutional Matrix
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Built for precision, auditability, and speed
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Engineered from the ground up to replace fragmented customs portals with a unified, high-throughput trade terminal.
          </p>
        </div>

        {/* 6-Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={feat.title}
              className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all group"
            >
              <div className="h-9 w-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <feat.icon className="h-4 w-4" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
