"use client";

import { useState } from "react";
import { TRADE_PRODUCTS } from "@/lib/trade-data";
import { HSSearchBar } from "@/components/trade-flows/hs-search-bar";
import { TradeVolumeChart } from "@/components/trade-flows/trade-volume-chart";
import { DestinationBarChart } from "@/components/trade-flows/destination-bar-chart";
import { TradeCorridorsTable } from "@/components/trade-flows/trade-corridors-table";
import { Download, RefreshCw, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TradeFlowsPage() {
  const [selectedCode, setSelectedCode] = useState("6302");

  const product = TRADE_PRODUCTS[selectedCode] || TRADE_PRODUCTS["6302"];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
            Trade Flows
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Global macroeconomic cargo volumes, tariff schedules, and bilateral freight corridor intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {}}
            className="h-8 border-[#eaeaea] bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-normal"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
            Sync Telemetry
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {}}
            className="h-8 border-[#eaeaea] bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-normal"
          >
            <Share2 className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
            Share Brief
          </Button>

          <Button
            size="sm"
            onClick={() => {}}
            className="h-8 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* 1. HS Code Search & Preset Pills */}
      <HSSearchBar
        selectedCode={selectedCode}
        onSelectCode={(code) => setSelectedCode(code)}
      />

      {/* 2. Visualizations Grid (Charts 1 & 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TradeVolumeChart
          data={product.volumeTimeline}
          productName={product.shortName}
        />
        <DestinationBarChart
          data={product.topDestinations}
          productName={product.shortName}
        />
      </div>

      {/* 3. Trade Corridors Data Table */}
      <TradeCorridorsTable
        corridors={product.topCorridors}
        productName={product.shortName}
      />
    </div>
  );
}
