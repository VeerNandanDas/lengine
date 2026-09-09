"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, Layers, TrendingUp, DollarSign, Box } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TRADE_PRODUCTS, PRESET_HS_CODES, HSProductData } from "@/lib/trade-data";

interface HSSearchBarProps {
  selectedCode: string;
  onSelectCode: (code: string) => void;
}

export function HSSearchBar({ selectedCode, onSelectCode }: HSSearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProduct: HSProductData =
    TRADE_PRODUCTS[selectedCode] || TRADE_PRODUCTS["6302"];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = Object.values(TRADE_PRODUCTS).filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.code.includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.shortName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4" ref={containerRef}>
      {/* Search Input Card */}
      <div className="bg-white rounded-lg border border-[#eaeaea] p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            placeholder="Search HS Code (e.g. 6302, 8471) or commodity description..."
            className="h-11 pl-10 pr-10 bg-[#fafafa] border-[#eaeaea] text-sm text-slate-900 placeholder:text-slate-400 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Autocomplete Suggestions Dropdown */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white rounded-lg border border-[#eaeaea] shadow-sm overflow-hidden divide-y divide-[#eaeaea]">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      onSelectCode(item.code);
                      setQuery("");
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      item.code === selectedCode ? "bg-slate-50/80" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-[#eaeaea]">
                        {item.code}
                      </span>
                      <div className="truncate">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {item.shortName}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {item.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 text-right">
                      <span className="text-xs text-slate-400">
                        {item.totalAnnualTeus}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-[10px] bg-slate-100 text-slate-600 font-normal"
                      >
                        {item.category}
                      </Badge>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-xs text-slate-400">
                  No matching HS code or product found. Try "6302", "8471", or "textiles".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Filter Chips */}
        <div className="mt-3 flex items-center gap-2 flex-wrap pt-2 border-t border-[#eaeaea]">
          <span className="text-xs font-medium text-slate-400 mr-1">
            Commonly Searched:
          </span>
          {PRESET_HS_CODES.map((preset) => {
            const isSelected = preset.code === selectedCode;
            return (
              <button
                key={preset.code}
                onClick={() => onSelectCode(preset.code)}
                className={`text-xs px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-[#fafafa] text-slate-600 border border-[#eaeaea] hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span>{preset.label}</span>
                <span
                  className={`text-[10px] ${
                    isSelected ? "text-slate-300" : "text-slate-400"
                  }`}
                >
                  • {preset.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Commodity Header & Quick Meta */}
      <div className="bg-white rounded-lg border border-[#eaeaea] p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fafafa] border border-[#eaeaea] flex-shrink-0 mt-0.5">
            <Layers className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-slate-900">
                HS {activeProduct.code}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-semibold text-slate-900">
                {activeProduct.shortName}
              </span>
              <Badge
                variant="outline"
                className="text-[11px] font-normal border-[#eaeaea] text-slate-600"
              >
                {activeProduct.category}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {activeProduct.chapter} — Lead Origin: {activeProduct.leadExportingNation}
            </p>
          </div>
        </div>

        {/* Mini stats inline */}
        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-[#eaeaea] pt-3 md:pt-0 md:pl-6">
          <div>
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Box className="h-3 w-3" />
              <span>Global Volume</span>
            </div>
            <p className="text-base font-semibold text-slate-900 mt-0.5">
              {activeProduct.totalAnnualTeus}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <DollarSign className="h-3 w-3" />
              <span>Trade Value</span>
            </div>
            <p className="text-base font-semibold text-slate-900 mt-0.5">
              {activeProduct.totalAnnualValueUsd}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <TrendingUp className="h-3 w-3" />
              <span>YoY Shift</span>
            </div>
            <p className="text-base font-semibold text-emerald-600 mt-0.5 flex items-center gap-0.5">
              +{activeProduct.yoyGrowth}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
