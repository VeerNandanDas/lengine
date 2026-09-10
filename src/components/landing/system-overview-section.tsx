"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Database,
  Cpu,
  LineChart,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ArrowRight,
  Server,
  Zap,
  Globe2,
  GitBranch,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const systemLayers = [
  {
    id: "ingestion",
    number: "01",
    label: "Data Ingestion & Extraction",
    icon: Database,
    title: "Global Maritime & Customs Feeds",
    desc: "Ingests raw Bills of Lading, automated container manifests, Port Authority filings, and live AIS vessel positioning from 140+ sovereign customs jurisdictions in real-time.",
    features: [
      "Daily automated customs manifest parsing (2.4B+ historical records)",
      "Automated OCR & NLP normalization of messy carrier paperwork",
      "Live satellite AIS telemetry for 120,000+ active container vessels",
      "Direct API integrations with major port authorities & carrier EDIs",
    ],
    telemetry: {
      stat1: "2.4B+",
      label1: "Indexed Manifests",
      stat2: "140+",
      label2: "Countries Covered",
      stat3: "< 24h",
      label3: "Manifest Ingest Latency",
    },
  },
  {
    id: "resolution",
    number: "02",
    label: "Entity Resolution & Graph",
    icon: Cpu,
    title: "Consignee & Commodity Disambiguation",
    desc: "Transforms fragmented carrier paperwork into canonical corporate profiles. Resolves corporate aliases, subsidiaries, and correlates raw commodity descriptions with strict 6-to-10 digit HS codes.",
    features: [
      "Deterministic fuzzy entity deduplication across international parent companies",
      "Deep semantic HS code classification (Chapters 01 through 99)",
      "Automated extraction of declared Incoterms (FOB, CIF, CFR, DDP, EXW)",
      "Calculation of true empirical MOQ (Minimum Order Quantity) from port filings",
    ],
    telemetry: {
      stat1: "99.98%",
      label1: "Entity Match Precision",
      stat2: "12.8M+",
      label2: "Canonical Profiles",
      stat3: "98.4%",
      label3: "Incoterm Accuracy",
    },
  },
  {
    id: "analytics",
    number: "03",
    label: "Telemetry & Trajectories",
    icon: LineChart,
    title: "Predictive Trade Corridor Intelligence",
    desc: "Aggregates multi-year TEU shipment volumes across bilateral freight corridors. Models seasonal demand surges, freight rate sensitivities, and real-time MFN vs. FTA tariff impacts.",
    features: [
      "3-Year rolling quarterly volume trends with YoY and QoQ deltas",
      "Consignee market concentration Herfindahl-Hirschman Index (HHI)",
      "Bilateral tariff calculation including duty exemptions and preferential rates",
      "Port congestion and turnaround telemetry across 450+ global container terminals",
    ],
    telemetry: {
      stat1: "18,500+",
      label1: "Active Trade Corridors",
      stat2: "3-Year",
      label2: "Audited Historical Depth",
      stat3: "100%",
      label3: "Tariff Matrix Verification",
    },
  },
  {
    id: "execution",
    number: "04",
    label: "Terminal & API Layer",
    icon: Terminal,
    title: "Institutional Decision Surface",
    desc: "Delivers institutional-grade intelligence via a sub-second web terminal and low-latency REST/GraphQL APIs, empowering trade desks to identify verified buyers and negotiate optimal terms.",
    features: [
      "Sub-100ms full-text manifest search across billions of trade records",
      "Master-detail Buyer Directory with instant Bill of Lading drawer drill-downs",
      "High-throughput enterprise REST & GraphQL streaming endpoints",
      "Export capabilities to Excel, CSV, or direct Snowflake/BigQuery sync",
    ],
    telemetry: {
      stat1: "< 85ms",
      label1: "Median Search Latency",
      stat2: "99.99%",
      label2: "API SLA Guarantee",
      stat3: "SOC 2",
      label3: "Certified Infrastructure",
    },
  },
];

export function SystemOverviewSection() {
  const [activeLayer, setActiveLayer] = useState(systemLayers[0].id);
  const current = systemLayers.find((l) => l.id === activeLayer) || systemLayers[0];

  return (
    <section id="system" className="py-24 bg-white dark:bg-[#09090b] border-t border-[#eaeaea] dark:border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <Badge
            variant="secondary"
            className="bg-slate-100 dark:bg-[#18181b] text-slate-700 dark:text-slate-300 border border-[#eaeaea] dark:border-[#27272a] text-xs font-normal mb-3"
          >
            End-to-End Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
            The Complete Cross-Border Trade Intelligence System
          </h2>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            From raw customs manifests and AIS satellite telemetry to institutional analytics and API delivery. Explore how every layer of the Lengine pipeline operates in concert.
          </p>
        </div>

        {/* 4 Pipeline Layer Navigation Tabs */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {systemLayers.map((layer) => {
            const Icon = layer.icon;
            const isSelected = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm"
                    : "bg-[#fafafa] dark:bg-[#0e0e11] text-slate-700 dark:text-slate-300 border-[#eaeaea] dark:border-[#27272a] hover:bg-slate-50 dark:hover:bg-[#18181b] hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span
                    className={`font-mono text-xs font-semibold ${
                      isSelected ? "text-indigo-300 dark:text-indigo-600" : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    LAYER {layer.number}
                  </span>
                  <Icon
                    className={`h-4 w-4 ${
                      isSelected ? "text-indigo-400 dark:text-indigo-600" : "text-slate-500 dark:text-slate-400"
                    }`}
                  />
                </div>
                <div className="text-xs font-medium line-clamp-1">{layer.label}</div>
              </button>
            );
          })}
        </div>

        {/* Active Layer Deep Dive Card */}
        <div className="mt-6 bg-[#fafafa] dark:bg-[#0e0e11] rounded-2xl border border-[#eaeaea] dark:border-[#27272a] p-8 lg:p-10 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Explanation & Feature Checklist */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 mb-2 font-semibold">
                <span>LAYER {current.number}</span>
                <span>/</span>
                <span className="uppercase">{current.label}</span>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                {current.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {current.desc}
              </p>

              <div className="mt-6 space-y-3">
                {current.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 px-4 py-2 rounded-lg transition-colors shadow-xs"
                >
                  Explore in Terminal
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
                <a
                  href="#pricing"
                  className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  View Tier Entitlements &rarr;
                </a>
              </div>
            </div>

            {/* Right Col: Telemetry Dashboard & Architecture Badges */}
            <div className="lg:col-span-5 bg-white dark:bg-[#121215] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#eaeaea] dark:border-[#27272a]">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Operational Telemetry
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live System Active
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 my-6 text-center">
                  <div className="p-3 rounded-lg bg-[#fafafa] dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a]">
                    <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">
                      {current.telemetry.stat1}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase font-medium">
                      {current.telemetry.label1}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#fafafa] dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a]">
                    <div className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                      {current.telemetry.stat2}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase font-medium">
                      {current.telemetry.label2}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#fafafa] dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a]">
                    <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      {current.telemetry.stat3}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase font-medium">
                      {current.telemetry.label3}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-2 pt-2 border-t border-[#eaeaea] dark:border-[#27272a]">
                  <div className="flex justify-between">
                    <span className="font-mono text-slate-400 dark:text-slate-500">Security Standard</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">SOC 2 Type II / ISO 27001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-slate-400 dark:text-slate-500">Data Pipeline</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Apache Kafka & ClickHouse</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-slate-400 dark:text-slate-500">Sync Cadence</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Automated Daily Refresh (02:00 UTC)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#eaeaea] dark:border-[#27272a] flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1">
                  <Server className="h-3 w-3" /> US-East & EU-West Edge
                </span>
                <span className="font-mono text-slate-500 dark:text-slate-400">v2.4-STABLE</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Bottom Architectural Core Capabilities */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-[#eaeaea] dark:border-[#27272a] bg-white dark:bg-[#0e0e11] hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div className="flex items-center gap-2.5 text-slate-900 dark:text-slate-100 font-medium text-sm mb-1.5">
              <Globe2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              180+ Sovereign Tariff Schedules
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Real-time synchronization with WCO, USITC, and European TARIC schedules ensures zero tariff mismatch during corridor analysis.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#eaeaea] dark:border-[#27272a] bg-white dark:bg-[#0e0e11] hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div className="flex items-center gap-2.5 text-slate-900 dark:text-slate-100 font-medium text-sm mb-1.5">
              <GitBranch className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              Multi-Tier Consignee Lineage
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Inspect parent organizations, intermediate logistics forwarders, and end consignees to bypass intermediary broker markups.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#eaeaea] dark:border-[#27272a] bg-white dark:bg-[#0e0e11] hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div className="flex items-center gap-2.5 text-slate-900 dark:text-slate-100 font-medium text-sm mb-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Real-Time Sanction & Risk Radar
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Automated screening against OFAC, EU Sanctions Map, and BIS Denied Persons Lists to safeguard cross-border transactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
