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

const dailySearchData = [
  { day: "Aug 11", searches: 342, topCommodity: "HS 6302 - Bed Linens" },
  { day: "Aug 13", searches: 388, topCommodity: "HS 8471 - Computing Machinery" },
  { day: "Aug 15", searches: 365, topCommodity: "HS 8517 - Smartphones" },
  { day: "Aug 17", searches: 412, topCommodity: "HS 6302 - Table Linens" },
  { day: "Aug 19", searches: 430, topCommodity: "HS 0901 - Coffee Beans" },
  { day: "Aug 21", searches: 395, topCommodity: "HS 6204 - Apparel" },
  { day: "Aug 23", searches: 445, topCommodity: "HS 8471 - Servers" },
  { day: "Aug 25", searches: 470, topCommodity: "HS 8517 - Transceivers" },
  { day: "Aug 27", searches: 492, topCommodity: "HS 6302 - Terry Towels" },
  { day: "Aug 29", searches: 460, topCommodity: "HS 7208 - Hot-rolled Steel" },
  { day: "Aug 31", searches: 510, topCommodity: "HS 6302 - Organic Sateen" },
  { day: "Sep 02", searches: 525, topCommodity: "HS 8471 - Laptops" },
  { day: "Sep 04", searches: 498, topCommodity: "HS 0901 - Arabica Coffee" },
  { day: "Sep 06", searches: 540, topCommodity: "HS 8517 - 5G Equipment" },
  { day: "Sep 08", searches: 565, topCommodity: "HS 6302 - Bed Sheets" },
  { day: "Sep 09", searches: 582, topCommodity: "HS 8471 - High-density Computing" },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: (typeof dailySearchData)[0] }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-white dark:bg-[#121215] border border-[#eaeaea] dark:border-[#27272a] rounded-lg p-2.5 shadow-xs text-xs">
        <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{item.day}</p>
        <div className="flex items-center justify-between gap-3 text-slate-500 dark:text-slate-400">
          <span>Daily Queries:</span>
          <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
            {item.searches.toLocaleString()}
          </span>
        </div>
        <p className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-1 truncate max-w-[200px]">
          Lead: {item.topCommodity}
        </p>
      </div>
    );
  }
  return null;
}

export function DashboardSearchChart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full min-h-[220px] flex items-center justify-center text-xs text-slate-400">
        Loading search volume...
      </div>
    );
  }

  return (
    <div className="w-full h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={dailySearchData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="searchVolumeGradient" x1="0" y1="0" x2="0" y2="1">
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
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            dy={4}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "#94A3B8" }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="searches"
            stroke="#4F46E5"
            strokeWidth={1.75}
            fill="url(#searchVolumeGradient)"
            activeDot={{
              r: 4,
              fill: "#4F46E5",
              stroke: "#FFFFFF",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
