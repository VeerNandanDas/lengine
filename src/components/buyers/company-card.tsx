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
  Coins,
  Sparkles,
} from "lucide-react";

interface CompanyCardProps {
  buyer: CompanyBuyer;
  onSelect: (buyer: CompanyBuyer) => void;
  onOpenDecisionMakers?: (buyer: CompanyBuyer) => void;
}

export function CompanyCard({
  buyer,
  onSelect,
  onOpenDecisionMakers,
}: CompanyCardProps) {
  return (
    <div
      onClick={() => onSelect(buyer)}
      className="group bg-white dark:bg-[#121215] rounded-lg border border-[#eaeaea] dark:border-[#27272a] p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between shadow-xs"
    >
      <div>
        {/* Top Header: Name + Verified Badge */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">
                {buyer.name}
              </h3>
              <Badge
                variant="secondary"
                className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-medium px-1.5 py-0 h-4 flex items-center gap-0.5"
              >
                <ShieldCheck className="h-2.5 w-2.5" />
                Verified Consignee
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{buyer.legalEntity}</p>
          </div>

          <div className="h-7 w-7 rounded-md bg-[#fafafa] dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100 group-hover:border-slate-300 dark:group-hover:border-slate-600 transition-all flex-shrink-0">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* Location & Port of Unlading */}
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-3.5">
          <span>{buyer.countryFlag}</span>
          <span className="font-medium text-slate-800 dark:text-slate-200">{buyer.city}</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <Anchor className="h-3 w-3 text-slate-400 dark:text-slate-500" />
            <span>{buyer.portOfUnlading}</span>
            <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">({buyer.portCode})</span>
          </div>
        </div>

        {/* Minimal Muted Pill Badges (MOQ, Incoterms, Certifications) */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          <Badge
            variant="secondary"
            className="bg-slate-100 dark:bg-[#18181b] text-slate-800 dark:text-slate-200 text-[11px] font-medium border border-[#eaeaea] dark:border-[#27272a] px-2 py-0.5"
          >
            MOQ: {buyer.derivedMoq}
          </Badge>

          {buyer.usualIncoterms.map((term) => (
            <Badge
              key={term}
              variant="outline"
              className="text-[11px] font-normal border-[#eaeaea] dark:border-[#27272a] text-slate-600 dark:text-slate-300 bg-white dark:bg-[#18181b] px-2 py-0.5"
            >
              {term}
            </Badge>
          ))}

          {buyer.certifications.slice(0, 2).map((cert) => (
            <Badge
              key={cert}
              variant="outline"
              className="text-[10px] font-normal border-[#eaeaea] dark:border-[#27272a] text-slate-500 dark:text-slate-400 bg-[#fafafa] dark:bg-[#18181b] px-1.5 py-0.5"
            >
              {cert}
            </Badge>
          ))}
          {buyer.certifications.length > 2 && (
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              +{buyer.certifications.length - 2}
            </span>
          )}
        </div>

        {/* 12-Month Import Sparkline */}
        <div className="bg-[#fafafa] dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] rounded-md p-3 mb-4">
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
              12M Import Consistency
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono">
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
      <div className="pt-3 border-t border-[#eaeaea] dark:border-[#27272a] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div>
          <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase">Annual Volume</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono text-sm">
            {buyer.annualTeus}
          </span>
        </div>

        <div>
          <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase">Manifests</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono text-sm">
            {buyer.annualShipments} BoLs
          </span>
        </div>

        <div className="text-right">
          <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase">Latest BoL</span>
          <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1 justify-end text-[11px]">
            <Calendar className="h-3 w-3 text-slate-400 dark:text-slate-500" />
            {buyer.lastShipmentDate}
          </span>
        </div>
      </div>

      {/* Action CTA Bar */}
      <div className="mt-3.5 pt-3 border-t border-[#eaeaea] dark:border-[#27272a] flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDecisionMakers?.(buyer);
          }}
          className="flex-1 bg-slate-900 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-semibold py-2 px-3 rounded-md transition-all flex items-center justify-center gap-1.5 shadow-xs group/btn cursor-pointer"
        >
          <Coins className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
          <span>Decision Makers</span>
          <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-mono font-normal">
            5 Credits
          </span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(buyer);
          }}
          className="h-8 px-2.5 rounded-md border border-[#eaeaea] dark:border-[#27272a] bg-[#fafafa] dark:bg-[#18181b] hover:bg-white dark:hover:bg-[#202025] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
          title="View Customs Manifest Records"
        >
          <span>BoLs</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
        </button>
      </div>
    </div>
  );
}
