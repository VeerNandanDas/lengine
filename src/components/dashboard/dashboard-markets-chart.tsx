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

const regionalMarketsData = [
  { region: "North America", code: "NA", share: 38.4, buyers: "1,264", growth: "+14.2%" },
  { region: "European Union", code: "EU", share: 26.8, buyers: "882", growth: "+9.6%" },
  { region: "Middle East / GCC", code: "ME", share: 18.2, buyers: "598", growth: "+21.4%" },
  { region: "Asia-Pacific", code: "APAC", share: 11.1, buyers: "365", growth: "+12.0%" },
  { region: "Latin America", code: "LATAM", share: 5.5, buyers: "182", growth: "+6.8%" },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: (typeof regionalMarketsData)[0] }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-white border border-[#eaeaea] rounded-lg p-2.5 shadow-xs text-xs">
        <p className="font-semibold text-slate-900 mb-1">{item.region}</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-3 text-slate-500">
            <span>Market Share:</span>
            <span className="font-mono font-semibold text-slate-900">{item.share}%</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-slate-500">
            <span>Active Buyers:</span>
            <span className="font-mono text-slate-700">{item.buyers}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-slate-500 pt-1 border-t border-[#eaeaea]">
            <span>YoY Expansion:</span>
            <span className="font-medium text-emerald-600">{item.growth}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function DashboardMarketsChart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full min-h-[220px] flex items-center justify-center text-xs text-slate-400">
        Loading regional markets...
      </div>
    );
  }

  return (
    <div className="w-full h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={regionalMarketsData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#F1F5F9"
            vertical={false}
          />
          <XAxis
            dataKey="code"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            dy={4}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `${val}%`}
            tick={{ fontSize: 11, fill: "#94A3B8" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="share" radius={[4, 4, 0, 0]} maxBarSize={44}>
            {regionalMarketsData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? "#4F46E5" : index === 1 ? "#334155" : "#64748B"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
