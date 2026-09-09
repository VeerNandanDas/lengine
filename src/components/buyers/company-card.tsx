"use client";

import { CompanyBuyer } from "@/lib/buyers-data";
import { Badge } from "@/components/ui/badge";
import { BuyerSparkline } from "./buyer-sparkline";
import {
  Anchor,
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
  Package,
  Calendar,
} from "lucide-react";

interface CompanyCardProps {
  buyer: CompanyBuyer;
  onSelect: (buyer: CompanyBuyer) => void;
}

export function CompanyCard({ buyer, onSelect }: CompanyCardProps) {
  return (
    <div
      onClick={() => onSelect(buyer)}
      className="group bg-white rounded-lg border border-[#eaeaea] p-5 hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Name + Verified Badge */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">
                {buyer.name}
              </h3>
              <Badge
                variant="secondary"
                className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium px-1.5 py-0 h-4 flex items-center gap-0.5"
              >
                <ShieldCheck className="h-2.5 w-2.5" />
                Verified Consignee
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{buyer.legalEntity}</p>
          </div>

          <div className="h-7 w-7 rounded-md bg-[#fafafa] border border-[#eaeaea] flex items-center justify-center text-slate-400 group-hover:text-slate-900 group-hover:border-slate-300 transition-all flex-shrink-0">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* Location & Port of Unlading */}
        <div className="flex items-center gap-2 text-xs text-slate-600 mb-3.5">
          <span>{buyer.countryFlag}</span>
          <span className="font-medium text-slate-800">{buyer.city}</span>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1 text-slate-500">
            <Anchor className="h-3 w-3 text-slate-400" />
            <span>{buyer.portOfUnlading}</span>
            <span className="font-mono text-[10px] text-slate-400">({buyer.portCode})</span>
          </div>
        </div>

        {/* Minimal Muted Pill Badges (MOQ, Incoterms, Certifications) */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-800 text-[11px] font-medium border border-[#eaeaea] px-2 py-0.5"
          >
            MOQ: {buyer.derivedMoq}
          </Badge>

          {buyer.usualIncoterms.map((term) => (
            <Badge
              key={term}
              variant="outline"
              className="text-[11px] font-normal border-[#eaeaea] text-slate-600 bg-white px-2 py-0.5"
            >
              {term}
            </Badge>
          ))}

          {buyer.certifications.slice(0, 2).map((cert) => (
            <Badge
              key={cert}
              variant="outline"
              className="text-[10px] font-normal border-[#eaeaea] text-slate-500 bg-[#fafafa] px-1.5 py-0.5"
            >
              {cert}
            </Badge>
          ))}
          {buyer.certifications.length > 2 && (
            <span className="text-[10px] text-slate-400">
              +{buyer.certifications.length - 2}
            </span>
          )}
        </div>

        {/* 12-Month Import Sparkline */}
        <div className="bg-[#fafafa] border border-[#eaeaea] rounded-md p-3 mb-4">
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-indigo-600" />
              12M Import Consistency
            </span>
            <span className="font-semibold text-slate-900 font-mono">
              {buyer.consistencyScore}% score
            </span>
          </div>
          <BuyerSparkline
            data={buyer.sparkline}
            gradientId={`sparkline-${buyer.id}`}
            color="#4F46E5"
          />
        </div>
      </div>

      {/* Manifest Stats Footer */}
      <div className="pt-3 border-t border-[#eaeaea] flex items-center justify-between text-xs text-slate-500">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase">Annual Volume</span>
          <span className="font-semibold text-slate-900 font-mono text-sm">
            {buyer.annualTeus}
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[10px] uppercase">Manifests</span>
          <span className="font-semibold text-slate-900 font-mono text-sm">
            {buyer.annualShipments} BoLs
          </span>
        </div>

        <div className="text-right">
          <span className="text-slate-400 block text-[10px] uppercase">Latest BoL</span>
          <span className="font-medium text-slate-700 flex items-center gap-1 justify-end text-[11px]">
            <Calendar className="h-3 w-3 text-slate-400" />
            {buyer.lastShipmentDate}
          </span>
        </div>
      </div>
    </div>
  );
}
