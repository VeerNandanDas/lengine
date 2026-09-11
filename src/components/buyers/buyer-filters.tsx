"use client";

import { Search, X, RotateCcw, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface FilterState {
  search: string;
  country: string;
  moqRange: string;
  incoterm: string;
  certification: string;
}

interface BuyerFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
  totalMatches: number;
  totalBuyers: number;
}

const COUNTRIES = [
  { value: "all", label: "All Destinations" },
  { value: "United States", label: "🇺🇸 United States" },
  { value: "Germany", label: "🇩🇪 Germany" },
  { value: "United Arab Emirates", label: "🇦🇪 UAE" },
  { value: "United Kingdom", label: "🇬🇧 UK" },
  { value: "Japan", label: "🇯🇵 Japan" },
  { value: "Italy", label: "🇮🇹 Italy" },
  { value: "Spain", label: "🇪🇸 Spain" },
];

const MOQ_RANGES = [
  { value: "all", label: "All MOQs" },
  { value: "tier-low", label: "< 1,000 TEUs" },
  { value: "tier-mid", label: "1,000 – 2,500 TEUs" },
  { value: "tier-high", label: "> 2,500 TEUs" },
];

const INCOTERMS = ["all", "FOB", "CIF", "DDP", "EXW", "FCA"];

const CERTIFICATIONS = [
  "all",
  "OEKO-TEX",
  "GOTS",
  "ISO 9001",
  "C-TPAT",
  "FDA Registered",
];

export function BuyerFilters({
  filters,
  onFilterChange,
  onReset,
  totalMatches,
  totalBuyers,
}: BuyerFiltersProps) {
  const hasActiveFilters =
    filters.search !== "" ||
    filters.country !== "all" ||
    filters.moqRange !== "all" ||
    filters.incoterm !== "all" ||
    filters.certification !== "all";

  return (
    <div className="bg-white dark:bg-[#121215] rounded-lg border border-[#eaeaea] dark:border-[#27272a] p-4 space-y-4">
      {/* Top Search Bar & Counter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <Input
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            placeholder="Search foreign buyers by company, port, or product..."
            className="h-9 pl-9 pr-8 bg-[#fafafa] dark:bg-[#18181b] border-[#eaeaea] dark:border-[#27272a] text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange("search", "")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 justify-between md:justify-end text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Showing <strong className="font-semibold text-slate-900 dark:text-slate-100">{totalMatches}</strong> of {totalBuyers} consignees
          </span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-8 px-2 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#18181b]"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {/* Filter Selectors Bar */}
      <div className="pt-3 border-t border-[#eaeaea] dark:border-[#27272a] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Destination Country */}
        <div className="space-y-1.5">
          <label className="text-slate-500 dark:text-slate-400 font-medium text-[11px] uppercase tracking-wider block">
            Destination Country
          </label>
          <select
            value={filters.country}
            onChange={(e) => onFilterChange("country", e.target.value)}
            className="w-full h-8 px-2.5 bg-[#fafafa] dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] rounded-md text-slate-700 dark:text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            {COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* MOQ Range */}
        <div className="space-y-1.5">
          <label className="text-slate-500 dark:text-slate-400 font-medium text-[11px] uppercase tracking-wider block">
            Derived MOQ Range
          </label>
          <select
            value={filters.moqRange}
            onChange={(e) => onFilterChange("moqRange", e.target.value)}
            className="w-full h-8 px-2.5 bg-[#fafafa] dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] rounded-md text-slate-700 dark:text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            {MOQ_RANGES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Incoterms */}
        <div className="space-y-1.5">
          <label className="text-slate-500 dark:text-slate-400 font-medium text-[11px] uppercase tracking-wider block">
            Primary Incoterms
          </label>
          <select
            value={filters.incoterm}
            onChange={(e) => onFilterChange("incoterm", e.target.value)}
            className="w-full h-8 px-2.5 bg-[#fafafa] dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] rounded-md text-slate-700 dark:text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            {INCOTERMS.map((term) => (
              <option key={term} value={term}>
                {term === "all" ? "All Incoterms (FOB/CIF/etc.)" : term}
              </option>
            ))}
          </select>
        </div>

        {/* Certifications */}
        <div className="space-y-1.5">
          <label className="text-slate-500 dark:text-slate-400 font-medium text-[11px] uppercase tracking-wider block">
            Required Certification
          </label>
          <select
            value={filters.certification}
            onChange={(e) => onFilterChange("certification", e.target.value)}
            className="w-full h-8 px-2.5 bg-[#fafafa] dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] rounded-md text-slate-700 dark:text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            {CERTIFICATIONS.map((cert) => (
              <option key={cert} value={cert}>
                {cert === "all" ? "All Standards (ISO/OEKO-TEX)" : cert}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
