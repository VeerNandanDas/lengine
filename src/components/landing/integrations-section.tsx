"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Landmark,
  Radio,
  FileSpreadsheet,
  Ship,
  Layers,
  Database,
  ArrowRight,
  CheckCircle2,
  Zap,
  Activity,
  ShieldCheck,
  Globe,
  Terminal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Integration,
  IntegrationCard,
  type IntegrationItem,
  defaultIntegrations,
} from "@/components/ui/integration-card";

// Maritime & Sovereign Trade Data Integrations
const tradeDataIntegrations: IntegrationItem[] = [
  {
    id: "customs",
    label: "Sovereign Customs (US CBP / EU TARIC / ICEGATE)",
    icon: Landmark,
    x: 110,
    y: 90,
    path: "M 270 205 V 105 Q 270 90 255 90 H 110",
    delay: 0.1,
  },
  {
    id: "satellite-ais",
    label: "Orbital AIS Satellite Feeds (120k+ Vessels)",
    icon: Radio,
    x: 360,
    y: 70,
    path: "M 294 205 V 85 Q 294 70 309 70 H 360",
    delay: 0.2,
  },
  {
    id: "manifests-edi",
    label: "Ocean Carrier EDI 304 / 310 Bills of Lading",
    icon: FileSpreadsheet,
    x: 160,
    y: 205,
    path: "M 250 205 H 160",
    delay: 0.3,
  },
  {
    id: "terminals",
    label: "Port TOS & Container Gate Indices",
    icon: Ship,
    x: 480,
    y: 205,
    path: "M 314 205 H 480",
    delay: 0.4,
  },
  {
    id: "tariffs",
    label: "WCO HS Code & Bilateral Tariff Engines",
    icon: Layers,
    x: 282,
    y: 330,
    path: "M 282 235 V 330",
    delay: 0.5,
  },
  {
    id: "lakehouse",
    label: "ClickHouse Manifest Lakehouse Cluster",
    icon: Database,
    x: 420,
    y: 330,
    path: "M 294 225 V 315 Q 294 330 309 330 H 420",
    delay: 0.6,
  },
];

const connectionHighlights = [
  {
    title: "140+ Sovereign Customs Ingests",
    desc: "Real-time automated sync with US CBP Automated Commercial Environment (ACE), EU TARIC, India ICEGATE, and ASEAN Single Window manifests.",
    badge: "Daily EDI Sync",
  },
  {
    title: "Live Vessel AIS Satellite Telemetry",
    desc: "120,000+ container vessels tracked worldwide with automated port arrival, berth congestion, and maritime transit estimates.",
    badge: "15-Min Latency",
  },
  {
    title: "ClickHouse Analytical Trade Lakehouse",
    desc: "Petabyte-scale analytical store providing sub-100ms multi-dimensional aggregations across historical TEUs, consignees, and product codes.",
    badge: "2.4B+ Records",
  },
  {
    title: "Enterprise ERP & API Delivery",
    desc: "Stream normalized HS classifications, supplier profiles, and landed tariff calculations straight to your trading desk via REST, Webhooks, or Snowflake.",
    badge: "REST & Webhooks",
  },
];

export function IntegrationsSection() {
  const [viewMode, setViewMode] = useState<"trade" | "stack">("trade");

  return (
    <section
      id="integrations"
      className="py-24 border-t border-[#eaeaea] dark:border-[#27272a] bg-slate-50/50 dark:bg-[#09090b] relative overflow-hidden"
    >
      {/* Background Subtle Grid */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="secondary"
            className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800 text-xs font-medium mb-3 px-3 py-1"
          >
            <Zap className="h-3 w-3 mr-1.5 inline text-indigo-600 dark:text-indigo-400" />
            Live Ingestion & Data Ecosystem
          </Badge>

          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
            Connected to every trade source.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Delivered clean to your terminal.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Raw maritime manifests, sovereign customs filings, and orbital AIS telemetry are hopelessly fragmented.
            Lengine acts as the central intelligence bus—ingesting raw streams from everywhere and delivering verified trade signals.
          </p>

          {/* Toggle between Trade Data Feeds & Tech Stack */}
          <div className="mt-6 inline-flex items-center p-1 rounded-lg bg-white dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] shadow-xs text-xs font-medium">
            <button
              onClick={() => setViewMode("trade")}
              className={`px-3.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === "trade"
                  ? "bg-slate-900 dark:bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              Maritime & Customs Feeds
            </button>
            <button
              onClick={() => setViewMode("stack")}
              className={`px-3.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === "stack"
                  ? "bg-slate-900 dark:bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              Developer Ecosystem
            </button>
          </div>
        </div>

        {/* 2-Column Grid: Feature Highlights & Interactive Integration Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Connection Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              {connectionHighlights.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#121215] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-5 shadow-xs hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="h-6 w-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                        {item.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-[#18181b] text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-8 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center h-10 px-5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm"
              >
                Inspect Live Ingestion Pipeline
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                Stream status: Operational (4.8M ops/sec)
              </span>
            </div>
          </div>

          {/* Right Column: The Integrated Component */}
          <div className="lg:col-span-6 flex justify-center">
            {viewMode === "trade" ? (
              <IntegrationCard
                className="w-full shadow-lg border-slate-200 dark:border-[#27272a] bg-white dark:bg-[#121215]"
                title="Global Trade Data Ingestion Hub"
                description="Lengine continuously connects to sovereign customs bureaus, AIS satellite feeds, ocean carrier EDIs, and terminal operating systems—synthesizing raw records into verified trade intelligence."
                url="/dashboard"
                buttonText="Explore Data Feeds"
                visual={
                  <Integration
                    items={tradeDataIntegrations}
                    centerLogo={
                      <div className="border border-indigo-100 dark:border-indigo-900 bg-white dark:bg-[#18181b] p-2 sm:p-2.5 rounded-lg sm:rounded-xl shadow-xs flex items-center justify-center">
                        <div className="h-6 w-6 sm:h-9 sm:w-9 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                          L
                        </div>
                      </div>
                    }
                  />
                }
              />
            ) : (
              <IntegrationCard
                className="w-full shadow-lg border-slate-200 dark:border-[#27272a] bg-white dark:bg-[#121215]"
                title="Modern Developer Integrations"
                description="Seamlessly bridge your frontend workflows, UI design libraries, and predictive machine learning models into high-performance trade applications."
                url="/demo"
                buttonText="View Component Demo"
                visual={<Integration items={defaultIntegrations} />}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntegrationsSection;
