"use client";

import { useState } from "react";
import { CompanyBuyer } from "@/lib/buyers-data";
import { WhatsAppPreview } from "./whatsapp-preview";
import { DynamicVariablesSidebar } from "./dynamic-variables-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MessageSquare,
  Clock,
  ArrowDown,
  Sparkles,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  FileText,
} from "lucide-react";

interface SequenceBuilderProps {
  emailSubject: string;
  emailBody: string;
  whatsAppText: string;
  setWhatsAppText: (text: string) => void;
  selectedBuyers: CompanyBuyer[];
}

export function SequenceBuilder({
  emailSubject,
  emailBody,
  whatsAppText,
  setWhatsAppText,
  selectedBuyers,
}: SequenceBuilderProps) {
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const targetBuyer = selectedBuyers[activePreviewIndex] || null;

  return (
    <div className="space-y-6">
      {/* Sequence Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-xl border border-[#eaeaea] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Multi-Channel Sequence Blueprint
            </h3>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono border border-[#eaeaea]">
              2 Touchpoints
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated progression: initial personalized email followed by context-aware WhatsApp document dispatch.
          </p>
        </div>

        {/* Recipient Simulation Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-slate-500 font-medium">
            Previewing:
          </span>
          <select
            value={activePreviewIndex}
            onChange={(e) => setActivePreviewIndex(Number(e.target.value))}
            className="text-xs font-semibold bg-[#fafafa] border border-[#eaeaea] rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden"
          >
            {selectedBuyers.map((b, i) => (
              <option key={b.id} value={i}>
                {b.name} ({b.portOfUnlading})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Vertical Timeline on Left / Center, WhatsApp Mobile Mockup on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Vertical Timeline Nodes (7 cols) */}
        <div className="lg:col-span-7 space-y-0 relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-indigo-500 via-emerald-500 to-emerald-600 -z-0" />

          {/* NODE 1: Day 1 - Send Cold Email */}
          <div className="relative z-10 bg-white rounded-xl border border-[#eaeaea] p-5 shadow-xs transition-all hover:border-slate-300">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
                      Step 1 • Day 1
                    </span>
                    <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[10px] font-medium">
                      Cold Email Dispatch
                    </Badge>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                    Send Personalized Customs-Injected Cold Email
                  </h4>
                </div>
              </div>

              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
                T = 0 Hours
              </span>
            </div>

            {/* Email Summary Box */}
            <div className="bg-[#fafafa] rounded-lg p-3 border border-[#eaeaea] text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500">
                <span className="font-semibold text-slate-400 text-[10px] uppercase w-14">Subject:</span>
                <span className="font-bold text-slate-900 truncate">
                  {emailSubject || "Sourcing Inquiry: Shipments to {{recent_port}} ({{buyer_company}})"}
                </span>
              </div>
              <div className="flex items-start gap-2 text-slate-500">
                <span className="font-semibold text-slate-400 text-[10px] uppercase w-14 pt-0.5">Body:</span>
                <p className="text-slate-700 line-clamp-2 italic leading-relaxed">
                  &ldquo;{emailBody.slice(0, 140)}...&rdquo;
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#eaeaea] flex items-center justify-between text-[11px] text-slate-400">
              <span>Trigger: Batch dispatch via verified SMTP relay</span>
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Open Tracking Enabled
              </span>
            </div>
          </div>

          {/* DELAY & CONDITION CONNECTOR */}
          <div className="relative z-10 py-5 pl-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs shadow-xs">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-medium">Wait 48 Hours</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-300 font-semibold flex items-center gap-1">
                Condition: If Email Opened
              </span>
            </div>
          </div>

          {/* NODE 2: Day 3 - If Email Opened, Send WhatsApp Template */}
          <div className="relative z-10 bg-white rounded-xl border border-emerald-200 p-5 shadow-xs transition-all hover:border-emerald-300">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#008069] text-white flex items-center justify-center shadow-xs flex-shrink-0">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#008069] font-mono">
                      Step 2 • Day 3
                    </span>
                    <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] font-medium">
                      WhatsApp Verified Business API
                    </Badge>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                    Send Context-Injected WhatsApp Follow-up & PDF Catalog
                  </h4>
                </div>
              </div>

              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
                T + 48 Hours
              </span>
            </div>

            {/* Editable WhatsApp Text Box */}
            <div className="space-y-2 mt-3">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>WhatsApp Template Content</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  Live updates in phone preview ➔
                </span>
              </label>

              <textarea
                value={whatsAppText}
                onChange={(e) => setWhatsAppText(e.target.value)}
                rows={5}
                className="w-full p-3 text-xs text-slate-800 rounded-lg border border-[#eaeaea] focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 leading-relaxed font-sans"
              />

              {/* PDF Catalog Attachment Note */}
              <div className="rounded-lg bg-emerald-50/70 border border-emerald-200 p-2.5 flex items-center justify-between text-xs text-emerald-950">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-rose-500 text-white flex items-center justify-center text-[9px] font-bold">
                    PDF
                  </div>
                  <div>
                    <span className="font-semibold block">Attached: Lengine_Export_Catalog_Q3.pdf</span>
                    <span className="text-[10px] text-emerald-700">Auto-appends your product catalog and factory certifications</span>
                  </div>
                </div>
                <Badge className="bg-emerald-600 text-white text-[10px]">
                  Verified Media
                </Badge>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#eaeaea] flex items-center justify-between text-[11px] text-slate-400">
              <span>Channel: Meta Verified WhatsApp Cloud API</span>
              <span className="text-emerald-700 font-semibold font-mono">
                98% Guaranteed Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Pixel-Perfect WhatsApp Phone Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center sticky top-6">
          <div className="w-full text-center mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Live Device Preview (WhatsApp)
            </span>
          </div>

          <WhatsAppPreview
            buyer={targetBuyer}
            messageText={whatsAppText}
          />

          <p className="text-[11px] text-slate-400 text-center mt-3 max-w-xs leading-tight">
            Recipients receive direct PDF download access without leaving the chat.
          </p>
        </div>
      </div>
    </div>
  );
}
