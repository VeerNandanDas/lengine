"use client";

import { useState, useEffect } from "react";
import { BUYERS_DATA, CompanyBuyer } from "@/lib/buyers-data";
import { getMaskedContacts, getAllUnmaskedContacts } from "@/lib/contacts-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Building2,
  Anchor,
  CheckCircle2,
  Users,
  Search,
  Lock,
  Unlock,
  Coins,
  Sparkles,
} from "lucide-react";

interface AudienceSelectorProps {
  selectedBuyerIds: string[];
  onToggleBuyer: (buyerId: string) => void;
  onSelectAll: (buyerIds: string[]) => void;
  onDeselectAll: () => void;
}

const DEMO_UNLOCKS_KEY = "lengine_demo_unlocks";

function getDemoUnlockedBuyers(): Set<string> {
  if (typeof window === "undefined") return new Set();
  const stored = localStorage.getItem(DEMO_UNLOCKS_KEY);
  if (!stored) return new Set();
  try {
    const parsed = JSON.parse(stored);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

export function AudienceSelector({
  selectedBuyerIds,
  onToggleBuyer,
  onSelectAll,
  onDeselectAll,
}: AudienceSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [unlockedSet, setUnlockedSet] = useState<Set<string>>(new Set());

  // Load unlocked buyers from localStorage demo state
  useEffect(() => {
    const unlocked = getDemoUnlockedBuyers();
    // Default fallback: if empty, pre-populate 3 buyers for demo convenience
    if (unlocked.size === 0) {
      const defaultUnlocked = new Set(["buyer-pac-tex", "buyer-meridian-nordic", "buyer-al-mansoor"]);
      setUnlockedSet(defaultUnlocked);
      localStorage.setItem(DEMO_UNLOCKS_KEY, JSON.stringify([...defaultUnlocked]));
    } else {
      setUnlockedSet(unlocked);
    }
  }, []);

  const filteredBuyers = BUYERS_DATA.filter((buyer) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      buyer.name.toLowerCase().includes(q) ||
      buyer.country.toLowerCase().includes(q) ||
      buyer.primaryCommodity.toLowerCase().includes(q) ||
      buyer.portOfUnlading.toLowerCase().includes(q)
    );
  });

  const allFilteredSelected =
    filteredBuyers.length > 0 &&
    filteredBuyers.every((b) => selectedBuyerIds.includes(b.id));

  // Compute total decision makers in selected buyers
  const totalDecisionMakers = selectedBuyerIds.reduce((acc, id) => {
    const contacts = getAllUnmaskedContacts(id);
    return acc + (contacts.length || 2);
  }, 0);

  const handleQuickUnlockAll = () => {
    const allIds = BUYERS_DATA.map((b) => b.id);
    setUnlockedSet(new Set(allIds));
    localStorage.setItem(DEMO_UNLOCKS_KEY, JSON.stringify(allIds));
  };

  return (
    <div className="space-y-4">
      {/* Search & Selection Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#eaeaea] shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search consignees by company, country, port, or cargo..."
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#eaeaea] text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Quick unlock demo helper if needed */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleQuickUnlockAll}
            className="h-8 text-xs text-slate-500 hover:text-slate-900 px-2.5"
            title="Mark all buyers unlocked for testing"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-indigo-600" />
            Unlock All in Demo
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (allFilteredSelected) {
                onDeselectAll();
              } else {
                onSelectAll(filteredBuyers.map((b) => b.id));
              }
            }}
            className="h-8 border-[#eaeaea] text-xs font-medium text-slate-700 bg-white"
          >
            {allFilteredSelected ? "Deselect All" : "Select All Filtered"}
          </Button>
        </div>
      </div>

      {/* Target Audience Summary Strip */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs font-medium">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-indigo-600" />
          <span>
            <strong>{selectedBuyerIds.length}</strong> Consignees Selected
          </span>
          <span className="text-indigo-300">•</span>
          <span>
            Targeting <strong>{totalDecisionMakers}</strong> Verified Decision Makers
          </span>
        </div>
        <span className="text-[11px] text-indigo-600 font-mono">
          Ready for context injection
        </span>
      </div>

      {/* Data Table */}
      <div className="rounded-xl border border-[#eaeaea] bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#eaeaea] text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={allFilteredSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onSelectAll(filteredBuyers.map((b) => b.id));
                      } else {
                        onDeselectAll();
                      }
                    }}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">Foreign Consignee</th>
                <th className="py-3 px-4">Country & Discharge Port</th>
                <th className="py-3 px-4">Primary Cargo / Commodity</th>
                <th className="py-3 px-4">Annual TEUs</th>
                <th className="py-3 px-4 text-right">Enriched Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eaeaea]">
              {filteredBuyers.map((buyer) => {
                const isSelected = selectedBuyerIds.includes(buyer.id);
                const isUnlocked = unlockedSet.has(buyer.id);
                const contacts = isUnlocked
                  ? getAllUnmaskedContacts(buyer.id)
                  : getMaskedContacts(buyer.id);

                return (
                  <tr
                    key={buyer.id}
                    onClick={() => onToggleBuyer(buyer.id)}
                    className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                      isSelected ? "bg-indigo-50/30" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleBuyer(buyer.id)}
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                    </td>

                    {/* Consignee Name */}
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{buyer.countryFlag}</span>
                        <div>
                          <span className="font-bold text-slate-900 block tracking-tight">
                            {buyer.name}
                          </span>
                          <span className="text-[11px] text-slate-500 font-normal block truncate max-w-xs">
                            {buyer.legalEntity}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Port */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="flex items-center gap-1 font-medium">
                        <Anchor className="h-3 w-3 text-slate-400 flex-shrink-0" />
                        <span>{buyer.portOfUnlading}</span>
                        <span className="font-mono text-slate-400 text-[10px]">({buyer.portCode})</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {buyer.city}, {buyer.country}
                      </span>
                    </td>

                    {/* Commodity */}
                    <td className="py-3.5 px-4 text-slate-700">
                      <span className="font-medium block truncate max-w-xs">
                        {buyer.primaryCommodity}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400 block mt-0.5">
                        HS: {buyer.hsCodes.slice(0, 2).join(", ")}
                      </span>
                    </td>

                    {/* Volume */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {buyer.annualTeus}
                    </td>

                    {/* Enriched Decision Makers */}
                    <td className="py-3.5 px-4 text-right">
                      {isUnlocked ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>{contacts.length} Contacts Ready</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-[#eaeaea] text-slate-600 text-[11px] font-medium">
                          <Lock className="h-3 w-3 text-slate-400" />
                          <span>Locked (5 Credits)</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
