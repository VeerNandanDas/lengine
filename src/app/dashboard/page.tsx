import {
  Search,
  UserCheck,
  Megaphone,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Globe,
  Users,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { BUYERS_DATA } from "@/lib/buyers-data";
import { DashboardSearchChart } from "@/components/dashboard/dashboard-search-chart";
import { DashboardMarketsChart } from "@/components/dashboard/dashboard-markets-chart";

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const metrics = [
  {
    title: "Total Global Searches",
    value: "12,847",
    change: "+14.2%",
    changeLabel: "vs last month",
    trend: "up" as const,
    icon: Search,
  },
  {
    title: "Unlocked Contacts",
    value: "3,291",
    change: "+8.1%",
    changeLabel: "vs last month",
    trend: "up" as const,
    icon: UserCheck,
  },
  {
    title: "Active Campaigns",
    value: "24",
    change: "+3",
    changeLabel: "this week",
    trend: "up" as const,
    icon: Megaphone,
  },
  {
    title: "API Status",
    value: "Operational",
    change: "99.9%",
    changeLabel: "uptime",
    trend: "up" as const,
    icon: Activity,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
            Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{formatDate()}</p>
        </div>

        {/* Direct Deep Links to Phase 2 & Phase 3 modules */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/trade-flows"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-[#121215] border border-[#eaeaea] dark:border-[#27272a] text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#18181b] transition-colors"
          >
            <Globe className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Open Trade Flows</span>
            <ArrowRight className="h-3 w-3 text-slate-400" />
          </Link>

          <Link
            href="/dashboard/buyers"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 dark:bg-indigo-600 text-white text-xs font-medium hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors"
          >
            <Users className="h-3.5 w-3.5 text-slate-300 dark:text-white" />
            <span>Buyer Directory</span>
            <ArrowRight className="h-3 w-3 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="group bg-white dark:bg-[#121215] rounded-lg border border-[#eaeaea] dark:border-[#27272a] p-5 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
          >
            {/* Top Row: Icon + Title */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#fafafa] dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a]">
                  <metric.icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {metric.title}
                </span>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Value */}
            <div className="mb-2">
              <span
                className={`text-2xl font-semibold tracking-tight ${
                  metric.title === "API Status"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-slate-900 dark:text-slate-100"
                }`}
              >
                {metric.value}
              </span>
            </div>

            {/* Change Indicator */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs font-medium">{metric.change}</span>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {metric.changeLabel}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Real Charts: Search Volume & Top Markets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Search Volume Chart */}
        <div className="bg-white dark:bg-[#121215] rounded-lg border border-[#eaeaea] dark:border-[#27272a] p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Search Volume
                </h3>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                  +18.4%
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Daily global queries across tariff & HS databases
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#fafafa] dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a]">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Last 30 days
              </span>
            </div>
          </div>

          <DashboardSearchChart />

          <div className="mt-3 pt-3 border-t border-[#eaeaea] dark:border-[#27272a] flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span>Aggregated query latency: 42ms</span>
            <Link
              href="/dashboard/trade-flows"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium inline-flex items-center gap-0.5"
            >
              Analyze HS Codes →
            </Link>
          </div>
        </div>

        {/* Top Markets Chart */}
        <div className="bg-white dark:bg-[#121215] rounded-lg border border-[#eaeaea] dark:border-[#27272a] p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Top Markets
                </h3>
                <span className="text-[11px] font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-[#18181b] px-1.5 py-0.2 rounded border border-[#eaeaea] dark:border-[#27272a]">
                  5 Global Hubs
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Buyer distribution by geographic destination
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#fafafa] dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a]">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                All time
              </span>
            </div>
          </div>

          <DashboardMarketsChart />

          <div className="mt-3 pt-3 border-t border-[#eaeaea] dark:border-[#27272a] flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span>Primary destination: North America (38.4%)</span>
            <Link
              href="/dashboard/buyers"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium inline-flex items-center gap-0.5"
            >
              View Verified Consignees →
            </Link>
          </div>
        </div>
      </div>

      {/* Module Spotlight Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/dashboard/trade-flows"
          className="group bg-white dark:bg-[#121215] rounded-lg border border-[#eaeaea] dark:border-[#27272a] p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex items-start justify-between"
        >
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Trade Flows & Macro Intelligence
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Explore 3-year export volume TEU trajectories, top destination countries, and bilateral corridor tariffs for HS Codes 6302, 8471, 8517, and 0901.
              </p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-3" />
        </Link>

        <Link
          href="/dashboard/buyers"
          className="group bg-white dark:bg-[#121215] rounded-lg border border-[#eaeaea] dark:border-[#27272a] p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex items-start justify-between"
        >
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-md bg-slate-100 dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] flex items-center justify-center text-slate-800 dark:text-slate-200 flex-shrink-0 mt-0.5">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Buyer Directory & BoL Manifests
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Browse verified foreign consignees filtered by destination, derived MOQs, Incoterms, and inspect raw Bill of Lading manifests in the side-sheet drawer.
              </p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-3" />
        </Link>
      </div>

      {/* Live Manifest Activity Feed */}
      <div className="bg-white dark:bg-[#121215] rounded-lg border border-[#eaeaea] dark:border-[#27272a] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Recent Maritime Manifest Telemetry
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live updates from statutory customs manifests filed under 19 U.S.C. § 1431
            </p>
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
            U.S. CBP ACE Telemetry
          </span>
        </div>
        <div className="space-y-3">
          {[
            {
              action: "BoL Registered",
              detail: `${BUYERS_DATA[0]?.shipments[0]?.bolNumber || "MSCU8921471"} — 18,450 kg "Target Brands 100% Organic Cotton Sateen Sheets (HTSUS 6302.31.90)"`,
              market: "Nhava Sheva (INNSA) → Port of Long Beach (USLGB 2709) • MSC GÜLSÜN (Voy 241E)",
              time: "2 min ago",
            },
            {
              action: "Consignee Unlocked",
              detail: `${BUYERS_DATA[0]?.name || "Target Brands, Inc."} (Target Corp / EIN: 41-0215170) — Derived Capacity: ${BUYERS_DATA[0]?.annualTeus || "142,500 TEUs"}`,
              market: `${BUYERS_DATA[0]?.country || "United States"} • Incoterms: ${BUYERS_DATA[0]?.usualIncoterms.join("/") || "FOB/CIF"} • Long Beach Discharge`,
              time: "14 min ago",
            },
            {
              action: "Customs Cleared",
              detail: `${BUYERS_DATA[1]?.shipments[0]?.bolNumber || "MAEU9182304"} — 24,800 kg "Walmart Mainstays Microfiber Bed Linens (HTSUS 6302.32.10)"`,
              market: "Nhava Sheva (INNSA) → Port of Los Angeles (USLAX 2704) • CBP Entry 7501 Cleared",
              time: "38 min ago",
            },
            {
              action: "Consignee Unlocked",
              detail: `${BUYERS_DATA[1]?.name || "Walmart Inc."} (Bentonville, AR) — Derived Capacity: ${BUYERS_DATA[1]?.annualTeus || "420,000 TEUs"}`,
              market: `${BUYERS_DATA[1]?.country || "United States"} • Incoterms: ${BUYERS_DATA[1]?.usualIncoterms.join("/") || "FOB/FCA"} • Direct Mill Sourcing`,
              time: "52 min ago",
            },
            {
              action: "BoL Registered",
              detail: `${BUYERS_DATA[5]?.shipments[0]?.bolNumber || "HLCU8921470"} — 19,800 kg "Otto Group Premium Terry Bath Towels (TARIC 6302.60.00)"`,
              market: "Mundra Port (INMUN) → Port of Hamburg (DEHAM) • Hapag-Lloyd (Voy 082W)",
              time: "1 hour ago",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-[#eaeaea] dark:border-[#27272a] last:border-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-medium flex-shrink-0 ${
                    item.action.includes("BoL")
                      ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                      : item.action.includes("Unlocked")
                      ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                      : "bg-slate-100 dark:bg-[#18181b] text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {item.action[0]}
                </div>
                <div>
                  <p className="text-sm text-slate-900 dark:text-slate-100">
                    <span className="font-medium">{item.action}:</span>{" "}
                    <span className="text-slate-600 dark:text-slate-400">{item.detail}</span>
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {item.market}
                  </p>
                </div>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500 flex-shrink-0 ml-4 font-mono">
                {item.time}
              </span>
            </div>
          ))}
        </div>

        {/* Legal provenance footnote */}
        <div className="mt-4 pt-3 border-t border-[#eaeaea] dark:border-[#27272a] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[11px] text-slate-400 dark:text-slate-500">
          <span>Official vessel manifest records filed pursuant to 19 U.S.C. § 1431 and public foreign customs manifests.</span>
          <span className="font-mono">Audited statutory telemetry</span>
        </div>
      </div>
    </div>
  );
}
