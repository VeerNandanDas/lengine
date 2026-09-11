"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TradeCorridor } from "@/lib/trade-data";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Clock,
  ShieldCheck,
  AlertCircle,
  Scale,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Building2,
} from "lucide-react";

interface TradeCorridorsTableProps {
  corridors: TradeCorridor[];
  productName: string;
}

export function TradeCorridorsTable({
  corridors,
  productName,
}: TradeCorridorsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-white dark:bg-[#121215] rounded-lg border border-[#eaeaea] dark:border-[#27272a] overflow-hidden">
      {/* Statutory Provenance Top Bar */}
      <div className="bg-[#fafafa] dark:bg-[#18181b] border-b border-[#eaeaea] dark:border-[#27272a] px-5 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
          <Scale className="h-4 w-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          <span>Statutory Data Provenance: UN Comtrade (HS 2022 Rev.), USITC DataWeb & WTO Tariff Profiles</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>19 U.S.C. § 1431 Public Declarations</span>
        </div>
      </div>

      {/* Table Header Section */}
      <div className="p-5 border-b border-[#eaeaea] dark:border-[#27272a] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Top Global Trade Corridors
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Active bilateral freight lanes, statutory tariff classifications, and market concentration for {productName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-[#fafafa] dark:bg-[#18181b] text-slate-600 dark:text-slate-300 border border-[#eaeaea] dark:border-[#27272a] text-xs font-normal"
          >
            {corridors.length} Statutory Corridors
          </Badge>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-[#fafafa] dark:bg-[#18181b]">
            <TableRow className="hover:bg-[#fafafa] dark:hover:bg-[#18181b] border-b border-[#eaeaea] dark:border-[#27272a]">
              <TableHead className="text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wider py-3.5 pl-5 w-[28%] min-w-[210px]">
                Trade Corridor
              </TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wider py-3.5 w-[18%] min-w-[130px]">
                Annual Volume
              </TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wider py-3.5 w-[13%] min-w-[95px]">
                YoY Growth
              </TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wider py-3.5 w-[18%] min-w-[130px]">
                Tariff Rate
              </TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wider py-3.5 w-[13%] min-w-[100px]">
                Market Share
              </TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wider py-3.5 pr-5 text-right w-[10%] min-w-[85px]">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-[#eaeaea] dark:divide-[#27272a]">
            {corridors.map((corridor) => {
              const isPositive = corridor.yoyGrowth >= 0;
              const isExpanded = expandedId === corridor.id;

              return (
                <React.Fragment key={corridor.id}>
                  <TableRow
                    onClick={() => toggleExpand(corridor.id)}
                    className="hover:bg-slate-50 dark:hover:bg-[#18181b] transition-colors cursor-pointer border-b border-[#eaeaea] dark:border-[#27272a]"
                  >
                    {/* Corridor */}
                    <TableCell className="py-4 pl-5">
                      <div className="flex items-center gap-1.5 font-medium text-slate-900 dark:text-slate-100 text-sm">
                        <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] text-slate-700 dark:text-slate-300">
                          {corridor.originCode}
                        </span>
                        <span>{corridor.origin}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                        <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] text-slate-700 dark:text-slate-300">
                          {corridor.destCode}
                        </span>
                        <span>{corridor.destination}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                        <Clock className="h-3 w-3 flex-shrink-0" />
                        <span>Avg transit: {corridor.avgTransitDays} days</span>
                      </div>
                    </TableCell>

                    {/* Volume */}
                    <TableCell className="py-4">
                      <span className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {corridor.annualVolumeTeus}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">TEUs</span>
                    </TableCell>

                    {/* YoY Growth */}
                    <TableCell className="py-4">
                      <div
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded ${
                          isPositive
                            ? "text-emerald-700 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800"
                            : "text-red-700 dark:text-red-300 bg-red-50/80 dark:bg-red-950/40 border border-red-200 dark:border-red-800"
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>
                          {isPositive ? `+${corridor.yoyGrowth}%` : `${corridor.yoyGrowth}%`}
                        </span>
                      </div>
                    </TableCell>

                    {/* Tariff Rate */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-100">
                          {corridor.tariffRate}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-normal px-1.5 py-0 h-4 border-[#eaeaea] dark:border-[#27272a] ${
                            corridor.tariffType === "FTA"
                              ? "bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                              : "bg-slate-50 dark:bg-[#18181b] text-slate-600 dark:text-slate-300"
                          }`}
                        >
                          {corridor.tariffType}
                        </Badge>
                      </div>
                      <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 truncate max-w-[150px] mt-0.5" title={corridor.legalTariffCode}>
                        {corridor.legalTariffCode}
                      </p>
                    </TableCell>

                    {/* Market Share */}
                    <TableCell className="py-4">
                      <div className="w-32">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-medium text-slate-900 dark:text-slate-100 font-mono">
                            {corridor.marketShare}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-[#27272a] overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(corridor.marketShare * 2.5, 100)}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>

                    {/* Status & Expansion trigger */}
                    <TableCell className="py-4 pr-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Badge
                          variant="secondary"
                          className={`text-xs font-normal border ${
                            corridor.status === "Optimal"
                              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                              : corridor.status === "High Demand"
                              ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
                              : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                          }`}
                        >
                          {corridor.status === "Optimal" && (
                            <ShieldCheck className="h-3 w-3 mr-1" />
                          )}
                          {corridor.status === "Scrutiny" && (
                            <AlertCircle className="h-3 w-3 mr-1" />
                          )}
                          {corridor.status}
                        </Badge>
                        <button
                          type="button"
                          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          title="Toggle statutory compliance details"
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Expandable Statutory Compliance Details Row */}
                  {isExpanded && (
                    <TableRow className="bg-slate-50/70 dark:bg-[#151518] hover:bg-slate-50/70 dark:hover:bg-[#151518] border-b border-[#eaeaea] dark:border-[#27272a]">
                      <TableCell colSpan={6} className="p-4 pl-6 pr-6 whitespace-normal">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          <div className="space-y-1">
                            <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                              <FileCheck className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                              Harmonized Classification
                            </span>
                            <p className="font-mono text-slate-600 dark:text-slate-400">
                              {corridor.legalTariffCode}
                            </p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Authority: {corridor.regulatoryAuthority}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                              <Building2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                              Statutory Data Provenance
                            </span>
                            <p className="text-slate-600 dark:text-slate-400">
                              {corridor.statutorySource}
                            </p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Bilateral regime: {corridor.tariffType} schedule
                            </p>
                          </div>

                          <div className="space-y-1 md:col-span-1">
                            <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                              <Scale className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                              Customs Telemetry & Compliance
                            </span>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                              {corridor.complianceNote}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Table Footer Summary */}
      <div className="p-4 bg-[#fafafa] dark:bg-[#18181b] border-t border-[#eaeaea] dark:border-[#27272a] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span>Sovereign freight lanes derived under statutory public customs declarations (19 U.S.C. § 1431 & WCO Harmonized System)</span>
        <span className="font-mono">Tariff schedule: 2026 Sovereign Revision</span>
      </div>
    </div>
  );
}
