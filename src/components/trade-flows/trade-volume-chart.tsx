"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { VolumeDataPoint } from "@/lib/trade-data";
import { TrendingUp, Activity } from "lucide-react";

interface TradeVolumeChartProps {
  data: VolumeDataPoint[];
  productName: string;
}

function formatTeuAxis(val: number) {
  if (val >= 1000000) {
    return `${(val / 1000000).toFixed(1)}M`;
  }
  return `${(val / 1000).toFixed(0)}k`;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: VolumeDataPoint }>;
  label?: string;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-white dark:bg-[#121215] border border-[#eaeaea] dark:border-[#27272a] rounded-lg p-3 shadow-xs text-xs">
        <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{item.period}</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4 text-slate-500 dark:text-slate-400">
            <span>Export Volume:</span>
            <span className="font-mono font-medium text-slate-900 dark:text-slate-100">
              {item.teus.toLocaleString()} TEUs
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 text-slate-500 dark:text-slate-400">
            <span>Cargo Value:</span>
            <span className="font-mono font-medium text-slate-900 dark:text-slate-100">
              ${(item.valueUsdMillions / 1000).toFixed(2)}B
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 text-slate-500 dark:text-slate-400 pt-1 border-t border-[#eaeaea] dark:border-[#27272a]">
            <span>YoY Trajectory:</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
              +{item.yoyDelta}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function TradeVolumeChart({ data, productName }: TradeVolumeChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Compute stats
  const latestPoint = data[data.length - 1];
  const firstPoint = data[0];
  const totalGrowth =
    firstPoint && latestPoint
      ? (((latestPoint.teus - firstPoint.teus) / firstPoint.teus) * 100).toFixed(1)
      : "0";

  return (
    <div className="bg-white dark:bg-[#121215] rounded-lg border border-[#eaeaea] dark:border-[#27272a] p-5 flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Global Export Volume (TEUs)
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-50 dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] text-slate-600 dark:text-slate-300 font-mono">
              3-Year Horizon
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Quarterly cross-border freight volume for {productName}
          </p>
        </div>

        {/* Aggregate metric badge */}
        <div className="text-right">
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <TrendingUp className="h-3 w-3" />
            <span>+{totalGrowth}%</span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">3Y cumulative expansion</p>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-[280px]">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="tradeVolumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border, #F1F5F9)"
                vertical={false}
              />

              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                dy={6}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={formatTeuAxis}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="teus"
                stroke="#4F46E5"
                strokeWidth={1.75}
                fill="url(#tradeVolumeGradient)"
                activeDot={{
                  r: 4,
                  fill: "#4F46E5",
                  stroke: "var(--background, #FFFFFF)",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 dark:text-slate-500">
            <Activity className="h-4 w-4 animate-spin mr-2" />
            Loading volume telemetry...
          </div>
        )}
      </div>

      {/* Bottom context caption */}
      <div className="mt-3 pt-3 border-t border-[#eaeaea] dark:border-[#27272a] flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
        <span>Source: UN Comtrade & Global Port Telemetry</span>
        <span>Unit: 20-Foot Equivalent Units (TEUs)</span>
      </div>
    </div>
  );
}
