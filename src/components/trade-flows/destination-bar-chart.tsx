"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { DestinationCountry } from "@/lib/trade-data";
import { Globe, TrendingUp } from "lucide-react";

interface DestinationBarChartProps {
  data: DestinationCountry[];
  productName: string;
}

function formatBarTeus(val: number) {
  if (val >= 1000000) {
    return `${(val / 1000000).toFixed(1)}M`;
  }
  return `${(val / 1000).toFixed(0)}k`;
}

interface CustomBarTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: DestinationCountry }>;
}

function CustomBarTooltip({ active, payload }: CustomBarTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-white dark:bg-[#121215] border border-[#eaeaea] dark:border-[#27272a] rounded-lg p-3 shadow-xs text-xs">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#18181b] text-slate-700 dark:text-slate-300">
            {item.code}
          </span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.country}</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4 text-slate-500 dark:text-slate-400">
            <span>Import Volume:</span>
            <span className="font-mono font-medium text-slate-900 dark:text-slate-100">
              {item.teus.toLocaleString()} TEUs
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 text-slate-500 dark:text-slate-400">
            <span>Market Share:</span>
            <span className="font-mono font-medium text-slate-900 dark:text-slate-100">
              {item.share}% of world imports
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 text-slate-500 dark:text-slate-400 pt-1 border-t border-[#eaeaea] dark:border-[#27272a]">
            <span>Import Growth:</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
              +{item.growth}% YoY
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function DestinationBarChart({
  data,
  productName,
}: DestinationBarChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalTop5Share = data
    .reduce((acc, curr) => acc + curr.share, 0)
    .toFixed(1);

  return (
    <div className="bg-white dark:bg-[#121215] rounded-lg border border-[#eaeaea] dark:border-[#27272a] p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Top 5 Destination Countries
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-50 dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] text-slate-600 dark:text-slate-300 font-mono">
              Market Concentration
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Primary import hubs for {productName}
          </p>
        </div>

        {/* Concentration badge */}
        <div className="text-right">
          <div className="flex items-center gap-1 text-slate-900 dark:text-slate-100 text-xs font-semibold">
            <Globe className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
            <span>{totalTop5Share}%</span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">combined global share</p>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-[280px]">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border, #F1F5F9)"
                vertical={false}
              />
              <XAxis
                dataKey="country"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                dy={6}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={formatBarTeus}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar
                dataKey="teus"
                radius={[4, 4, 0, 0]}
                maxBarSize={48}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#4F46E5" : "#64748b"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 dark:text-slate-500">
            Loading destinations telemetry...
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-[#eaeaea] dark:border-[#27272a] flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-xs bg-[#4F46E5] inline-block" />
            Leading Destination
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-xs bg-[#64748b] inline-block" />
            Key Corridors
          </span>
        </div>
        <span>Source: USITC DataWeb & Eurostat Comext</span>
      </div>
    </div>
  );
}
