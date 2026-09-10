"use client";

import { useState, useMemo } from "react";
import { BUYERS_DATA, CompanyBuyer } from "@/lib/buyers-data";
import { BuyerFilters, FilterState } from "@/components/buyers/buyer-filters";
import { CompanyCard } from "@/components/buyers/company-card";
import { ShipmentHistorySheet } from "@/components/buyers/shipment-history-sheet";
import { DecisionMakersModal } from "@/components/buyers/decision-makers-modal";
import { Database, Download, RefreshCw, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialFilters: FilterState = {
  search: "",
  country: "all",
  moqRange: "all",
  incoterm: "all",
  certification: "all",
};

export default function BuyerDirectoryPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selectedBuyer, setSelectedBuyer] = useState<CompanyBuyer | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [enrichmentBuyer, setEnrichmentBuyer] = useState<CompanyBuyer | null>(null);
  const [isEnrichmentModalOpen, setIsEnrichmentModalOpen] = useState(false);

  function handleFilterChange(key: keyof FilterState, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleResetFilters() {
    setFilters(initialFilters);
  }

  function handleSelectBuyer(buyer: CompanyBuyer) {
    setSelectedBuyer(buyer);
    setIsSheetOpen(true);
  }

  function handleOpenDecisionMakers(buyer: CompanyBuyer) {
    setEnrichmentBuyer(buyer);
    setIsEnrichmentModalOpen(true);
  }

  function handleCloseSheet() {
    setIsSheetOpen(false);
  }

  // Filter evaluation logic
  const filteredBuyers = useMemo(() => {
    return BUYERS_DATA.filter((buyer) => {
      // Search term
      if (filters.search) {
        const q = filters.search.toLowerCase().trim();
        const matchesSearch =
          buyer.name.toLowerCase().includes(q) ||
          buyer.city.toLowerCase().includes(q) ||
          buyer.portOfUnlading.toLowerCase().includes(q) ||
          buyer.primaryCommodity.toLowerCase().includes(q) ||
          buyer.legalEntity.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Country
      if (filters.country !== "all" && buyer.country !== filters.country) {
        return false;
      }

      // MOQ Range
      if (filters.moqRange !== "all") {
        if (filters.moqRange === "tier-low" && buyer.moqNumeric >= 1000) {
          return false;
        }
        if (
          filters.moqRange === "tier-mid" &&
          (buyer.moqNumeric < 1000 || buyer.moqNumeric > 2500)
        ) {
          return false;
        }
        if (filters.moqRange === "tier-high" && buyer.moqNumeric <= 2500) {
          return false;
        }
      }

      // Incoterm
      if (
        filters.incoterm !== "all" &&
        !buyer.usualIncoterms.includes(
          filters.incoterm as "FOB" | "CIF" | "DDP" | "EXW" | "FCA"
        )
      ) {
        return false;
      }

      // Certification
      if (
        filters.certification !== "all" &&
        !buyer.certifications.includes(filters.certification)
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
              Buyer Directory
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 border border-[#eaeaea] text-slate-600 font-mono">
              Maritime Manifest Database
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Verified foreign consignees, derived import MOQs, and raw customs Bill of Lading histories.
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
            Sync Customs Feed
          </Button>

          <Button
            size="sm"
            onClick={() => {}}
            className="h-8 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export Consignees
          </Button>
        </div>
      </div>

      {/* Filters Component */}
      <BuyerFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        totalMatches={filteredBuyers.length}
        totalBuyers={BUYERS_DATA.length}
      />

      {/* Main Feed of Company Profile Cards */}
      {filteredBuyers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBuyers.map((buyer) => (
            <CompanyCard
              key={buyer.id}
              buyer={buyer}
              onSelect={handleSelectBuyer}
              onOpenDecisionMakers={handleOpenDecisionMakers}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[#eaeaea] p-12 text-center">
          <div className="h-10 w-10 rounded-lg bg-[#fafafa] border border-[#eaeaea] flex items-center justify-center text-slate-400 mx-auto mb-3">
            <Layers className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            No matching foreign consignees found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Try adjusting your search keywords, destination country, or loosening your MOQ and Incoterm filters.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetFilters}
            className="h-8 border-[#eaeaea] text-xs font-normal"
          >
            Reset All Filters
          </Button>
        </div>
      )}

      {/* Master-Detail Side-Sheet Drawer (Shipment BoL History) */}
      <ShipmentHistorySheet
        buyer={selectedBuyer}
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        onOpenDecisionMakers={(buyer) => {
          setIsSheetOpen(false);
          handleOpenDecisionMakers(buyer);
        }}
      />

      {/* Executive Decision Makers Center Modal (5 Credits Batch Unlock) */}
      <DecisionMakersModal
        buyer={enrichmentBuyer}
        isOpen={isEnrichmentModalOpen}
        onClose={() => setIsEnrichmentModalOpen(false)}
      />
    </div>
  );
}

