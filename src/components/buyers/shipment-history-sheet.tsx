"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CompanyBuyer, BillOfLadingRecord } from "@/lib/buyers-data";
import {
  Anchor,
  Download,
  ShieldCheck,
  Container,
  Ship,
  FileText,
  Calendar,
  ArrowRight,
  ExternalLink,
  Layers,
} from "lucide-react";

interface ShipmentHistorySheetProps {
  buyer: CompanyBuyer | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ShipmentHistorySheet({
  buyer,
  isOpen,
  onClose,
}: ShipmentHistorySheetProps) {
  if (!buyer) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl md:max-w-3xl bg-white border-l border-[#eaeaea] p-0 flex flex-col h-full overflow-hidden"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#eaeaea] bg-white flex-shrink-0">
          <div className="flex items-start justify-between gap-4 pr-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{buyer.countryFlag}</span>
                <SheetTitle className="text-lg font-semibold text-slate-900 tracking-tight">
                  {buyer.name}
                </SheetTitle>
                <Badge
                  variant="secondary"
                  className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium"
                >
                  <ShieldCheck className="h-3 w-3 mr-0.5" />
                  Verified Customs Profile
                </Badge>
              </div>
              <SheetDescription className="text-xs text-slate-500">
                {buyer.legalEntity} • {buyer.city} • Discharge Port: {buyer.portOfUnlading} ({buyer.portCode})
              </SheetDescription>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {}}
              className="h-8 border-[#eaeaea] text-xs font-normal text-slate-600 hover:text-slate-900"
            >
              <Download className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
              Export BoL Manifests
            </Button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#eaeaea]">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                Total Volume
              </span>
              <span className="font-semibold text-slate-900 font-mono text-sm">
                {buyer.annualTeus}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                Annual BoLs
              </span>
              <span className="font-semibold text-slate-900 font-mono text-sm">
                {buyer.annualShipments} records
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                Derived MOQ
              </span>
              <span className="font-semibold text-slate-900 font-mono text-sm">
                {buyer.derivedMoq}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                Volume Reliability
              </span>
              <span className="font-semibold text-emerald-600 font-mono text-sm">
                {buyer.consistencyScore}%
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Manifest Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fafafa]">
          {/* Section: Raw Bill of Lading Manifest Records */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-600" />
                <h4 className="text-sm font-semibold text-slate-900">
                  Raw Bill of Lading (BoL) Customs Manifests
                </h4>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Showing {buyer.shipments.length} latest entries
              </span>
            </div>

            <div className="space-y-3">
              {buyer.shipments.map((bol: BillOfLadingRecord) => (
                <div
                  key={bol.bolNumber}
                  className="bg-white rounded-lg border border-[#eaeaea] p-4 transition-all hover:border-slate-300"
                >
                  {/* Top Bar: BoL Number, Date, Status */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#eaeaea] text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-[11px]">BoL No:</span>
                      <span className="font-mono font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-[#eaeaea]">
                        {bol.bolNumber}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
                        <Calendar className="h-3 w-3" />
                        {bol.date}
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-normal"
                      >
                        {bol.customsStatus}
                      </Badge>
                    </div>
                  </div>

                  {/* Route & Vessel Telemetry */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-b border-[#eaeaea] text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                        Freight Corridor
                      </span>
                      <div className="flex items-center gap-1.5 font-medium text-slate-800">
                        <span className="font-mono text-xs px-1.5 py-0.2 rounded bg-[#fafafa] border border-[#eaeaea]">
                          {bol.portOfLoadingCode}
                        </span>
                        <span>{bol.portOfLoading}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                        <span className="font-mono text-xs px-1.5 py-0.2 rounded bg-[#fafafa] border border-[#eaeaea]">
                          {bol.portOfUnladingCode}
                        </span>
                        <span>{bol.portOfUnlading}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                        Vessel & Voyage
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Ship className="h-3.5 w-3.5 text-indigo-600" />
                        <span className="font-medium">{bol.vessel}</span>
                        <span className="font-mono text-slate-400">({bol.voyage})</span>
                      </div>
                    </div>
                  </div>

                  {/* Cargo & Shipper Details */}
                  <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                        Commodity & Customs Declaration
                      </span>
                      <p className="text-slate-800 text-xs leading-relaxed font-medium">
                        {bol.commodityDesc}
                      </p>
                      <p className="text-slate-400 text-[11px] font-mono mt-1">
                        Declared HS Code: {bol.hsCode}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                          Shipper / Exporter
                        </span>
                        <p className="font-medium text-slate-900 text-xs">
                          {bol.shipper}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {bol.shipperOrigin}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-[#eaeaea] text-[11px]">
                        <span className="text-slate-500">Container:</span>
                        <span className="font-mono font-medium text-slate-900">
                          {bol.containerId} ({bol.containerType})
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Gross Weight:</span>
                        <span className="font-mono font-medium text-slate-900">
                          {bol.grossWeightKg}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supplier Diversity & Certifications Card */}
          <div className="bg-white rounded-lg border border-[#eaeaea] p-4 text-xs">
            <h5 className="font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-indigo-600" />
              Verified Compliance & Trade Standards
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {buyer.certifications.map((cert) => (
                <Badge
                  key={cert}
                  variant="outline"
                  className="bg-[#fafafa] border-[#eaeaea] text-slate-700 px-2 py-0.5 text-xs font-normal"
                >
                  {cert}
                </Badge>
              ))}
              <Badge
                variant="outline"
                className="bg-[#fafafa] border-[#eaeaea] text-slate-700 px-2 py-0.5 text-xs font-normal"
              >
                Incoterms: {buyer.usualIncoterms.join(", ")}
              </Badge>
              <Badge
                variant="outline"
                className="bg-[#fafafa] border-[#eaeaea] text-slate-700 px-2 py-0.5 text-xs font-normal"
              >
                {buyer.verifiedSuppliersCount} Active Global Shippers
              </Badge>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
