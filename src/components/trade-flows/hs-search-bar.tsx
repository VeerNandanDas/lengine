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
      <div className="bg-white dark:bg-[#121215] rounded-lg border border-[#eaeaea] dark:border-[#27272a] p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <Input
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            placeholder="Search HS Code (e.g. 6302, 8471) or commodity description..."
            className="h-11 pl-10 pr-10 bg-[#fafafa] dark:bg-[#18181b] border-[#eaeaea] dark:border-[#27272a] text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-indigo-500 rounded-md"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Autocomplete Suggestions Dropdown */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white dark:bg-[#121215] rounded-lg border border-[#eaeaea] dark:border-[#27272a] shadow-sm overflow-hidden divide-y divide-[#eaeaea] dark:divide-[#27272a]">
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
                    className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-[#18181b] transition-colors ${
                      item.code === selectedCode ? "bg-indigo-50/50 dark:bg-indigo-950/40" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#18181b] text-slate-800 dark:text-slate-200 border border-[#eaeaea] dark:border-[#27272a]">
                        {item.code}
                      </span>
                      <div className="truncate">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                          {item.shortName}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {item.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 text-right">
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {item.totalAnnualTeus}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-[10px] bg-slate-100 dark:bg-[#18181b] text-slate-600 dark:text-slate-300 font-normal dark:border-[#27272a]"
                      >
                        {item.category}
                      </Badge>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-xs text-slate-400 dark:text-slate-500">
                  No matching HS code or product found. Try "6302", "8471", or "textiles".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Filter Chips */}
        <div className="mt-3 flex items-center gap-2 flex-wrap pt-2 border-t border-[#eaeaea] dark:border-[#27272a]">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 mr-1">
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
                    ? "bg-slate-900 dark:bg-indigo-600 text-white shadow-xs"
                    : "bg-[#fafafa] dark:bg-[#18181b] text-slate-600 dark:text-slate-300 border border-[#eaeaea] dark:border-[#27272a] hover:bg-slate-100 dark:hover:bg-[#202025] hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span>{preset.label}</span>
                <span
                  className={`text-[10px] ${
                    isSelected ? "text-slate-300 dark:text-indigo-200" : "text-slate-400 dark:text-slate-500"
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
      <div className="bg-white dark:bg-[#121215] rounded-lg border border-[#eaeaea] dark:border-[#27272a] p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fafafa] dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] flex-shrink-0 mt-0.5">
            <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-100">
                HS {activeProduct.code}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {activeProduct.shortName}
              </span>
              <Badge
                variant="outline"
                className="text-[11px] font-normal border-[#eaeaea] dark:border-[#27272a] text-slate-600 dark:text-slate-300"
              >
                {activeProduct.category}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {activeProduct.chapter} — Lead Origin: {activeProduct.leadExportingNation}
            </p>
          </div>
        </div>

        {/* Mini stats inline */}
        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-[#eaeaea] dark:border-[#27272a] pt-3 md:pt-0 md:pl-6">
          <div>
            <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-xs">
              <Box className="h-3 w-3" />
              <span>Global Volume</span>
            </div>
            <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
              {activeProduct.totalAnnualTeus}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-xs">
              <DollarSign className="h-3 w-3" />
              <span>Trade Value</span>
            </div>
            <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
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
