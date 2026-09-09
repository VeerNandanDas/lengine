"use client";

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
import { ArrowRight, TrendingUp, TrendingDown, Clock, ShieldCheck, AlertCircle } from "lucide-react";

interface TradeCorridorsTableProps {
  corridors: TradeCorridor[];
  productName: string;
}

export function TradeCorridorsTable({
  corridors,
  productName,
}: TradeCorridorsTableProps) {
  return (
    <div className="bg-white rounded-lg border border-[#eaeaea] overflow-hidden">
      {/* Table Header Section */}
      <div className="p-5 border-b border-[#eaeaea] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Top Global Trade Corridors
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Active bilateral freight lanes, prevailing tariff regimes, and market concentration for {productName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-[#fafafa] text-slate-600 border border-[#eaeaea] text-xs font-normal"
          >
            {corridors.length} Verified Corridors
          </Badge>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#fafafa]">
            <TableRow className="hover:bg-[#fafafa] border-b border-[#eaeaea]">
              <TableHead className="text-slate-500 font-medium text-xs uppercase tracking-wider py-3.5 pl-5">
                Trade Corridor
              </TableHead>
              <TableHead className="text-slate-500 font-medium text-xs uppercase tracking-wider py-3.5">
                Annual Volume
              </TableHead>
              <TableHead className="text-slate-500 font-medium text-xs uppercase tracking-wider py-3.5">
                YoY Growth
              </TableHead>
              <TableHead className="text-slate-500 font-medium text-xs uppercase tracking-wider py-3.5">
                Tariff Rate
              </TableHead>
              <TableHead className="text-slate-500 font-medium text-xs uppercase tracking-wider py-3.5">
                Market Share
              </TableHead>
              <TableHead className="text-slate-500 font-medium text-xs uppercase tracking-wider py-3.5 pr-5 text-right">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-[#eaeaea]">
            {corridors.map((corridor) => {
              const isPositive = corridor.yoyGrowth >= 0;

              return (
                <TableRow
                  key={corridor.id}
                  className="hover:bg-slate-50 transition-colors border-b border-[#eaeaea]"
                >
                  {/* Corridor */}
                  <TableCell className="py-4 pl-5">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 font-medium text-slate-900 text-sm">
                        <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 border border-[#eaeaea] text-slate-700">
                          {corridor.originCode}
                        </span>
                        <span>{corridor.origin}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                        <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 border border-[#eaeaea] text-slate-700">
                          {corridor.destCode}
                        </span>
                        <span>{corridor.destination}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                      <Clock className="h-3 w-3" />
                      <span>Avg transit: {corridor.avgTransitDays} days</span>
                    </div>
                  </TableCell>

                  {/* Volume */}
                  <TableCell className="py-4">
                    <span className="font-mono text-sm font-semibold text-slate-900">
                      {corridor.annualVolumeTeus}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">TEUs</span>
                  </TableCell>

                  {/* YoY Growth */}
                  <TableCell className="py-4">
                    <div
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded ${
                        isPositive
                          ? "text-emerald-700 bg-emerald-50/80 border border-emerald-200"
                          : "text-red-700 bg-red-50/80 border border-red-200"
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
                      <span className="font-mono text-sm font-medium text-slate-900">
                        {corridor.tariffRate}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-normal px-1.5 py-0 h-4 border-[#eaeaea] ${
                          corridor.tariffType === "FTA"
                            ? "bg-emerald-50/50 text-emerald-700 border-emerald-200"
                            : "bg-slate-50 text-slate-600"
                        }`}
                      >
                        {corridor.tariffType}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* Market Share */}
                  <TableCell className="py-4">
                    <div className="w-36">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium text-slate-900 font-mono">
                          {corridor.marketShare}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(corridor.marketShare * 2.5, 100)}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="py-4 pr-5 text-right">
                    <Badge
                      variant="secondary"
                      className={`text-xs font-normal border ${
                        corridor.status === "Optimal"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : corridor.status === "High Demand"
                          ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
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
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Table Footer Summary */}
      <div className="p-4 bg-[#fafafa] border-t border-[#eaeaea] flex items-center justify-between text-xs text-slate-500">
        <span>Displaying primary maritime and intermodal freight corridors</span>
        <span className="font-mono">Tariff schedule: 2026 Revision</span>
      </div>
    </div>
  );
}
