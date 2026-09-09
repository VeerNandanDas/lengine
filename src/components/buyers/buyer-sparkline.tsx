"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { MonthlySparklinePoint } from "@/lib/buyers-data";

interface BuyerSparklineProps {
  data: MonthlySparklinePoint[];
  color?: string;
  gradientId: string;
}

interface CustomSparklineTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: MonthlySparklinePoint }>;
}

function CustomSparklineTooltip({ active, payload }: CustomSparklineTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-white border border-[#eaeaea] rounded px-2 py-1 shadow-xs text-[11px] font-mono">
        <span className="text-slate-500 mr-1.5">{item.month}:</span>
        <span className="font-semibold text-slate-900">
          {item.teus.toLocaleString()} TEUs
        </span>
      </div>
    );
  }
  return null;
}

export function BuyerSparkline({
  data,
  color = "#4F46E5",
  gradientId,
}: BuyerSparklineProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-9 w-full bg-[#fafafa] rounded-sm" />;
  }

  return (
    <div className="h-9 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.12} />
              <stop offset="100%" stopColor={color} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <Tooltip content={<CustomSparklineTooltip />} />
          <Area
            type="monotone"
            dataKey="teus"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
