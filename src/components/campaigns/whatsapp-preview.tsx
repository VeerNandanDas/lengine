"use client";

import { CompanyBuyer } from "@/lib/buyers-data";
import { substituteVariables } from "@/lib/campaigns-data";
import {
  Phone,
  Video,
  MoreVertical,
  ArrowLeft,
  FileText,
  Download,
  CheckCheck,
  Smile,
  Paperclip,
  Mic,
  Camera,
  ShieldCheck,
} from "lucide-react";

interface WhatsAppPreviewProps {
  buyer?: CompanyBuyer | null;
  messageText?: string;
}

export function WhatsAppPreview({
  buyer,
  messageText,
}: WhatsAppPreviewProps) {
  const defaultText =
    messageText ||
    "Hi {{decision_maker_name}}, following up on our email regarding {{buyer_company}}'s recent shipments arriving at {{recent_port}}.\n\nWe have specialized capacity for {{primary_commodity}} with volume pricing tailored to your derived MOQ.\n\nI've attached our certified export catalog and technical specs below for your team's review.";

  const resolvedText = substituteVariables(defaultText, buyer);
  const contactName = buyer ? substituteVariables("{{decision_maker_name}}", buyer) : "James Whitfield";

  return (
    <div className="w-full max-w-sm mx-auto rounded-[36px] border-[8px] border-slate-900 shadow-2xl bg-slate-900 overflow-hidden text-slate-800 select-none">
      {/* Phone Speaker & Camera Notch */}
      <div className="h-6 bg-slate-900 flex items-center justify-center">
        <div className="h-4 w-28 bg-slate-950 rounded-b-xl flex items-center justify-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-800" />
          <div className="h-1.5 w-8 rounded-full bg-slate-800" />
        </div>
      </div>

      {/* WhatsApp App Header */}
      <div className="bg-[#008069] text-white px-3 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4 text-white/80 cursor-pointer" />
          <div className="h-8 w-8 rounded-full bg-emerald-100 text-[#008069] font-bold text-xs flex items-center justify-center border border-white/20 flex-shrink-0">
            {contactName.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-xs text-white truncate max-w-[130px]">
                {contactName}
              </span>
              <ShieldCheck className="h-3 w-3 text-emerald-200 flex-shrink-0" />
            </div>
            <span className="text-[10px] text-white/80 block leading-tight">
              Official Business Account
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-white/90">
          <Video className="h-4 w-4 cursor-pointer" />
          <Phone className="h-3.5 w-3.5 cursor-pointer" />
          <MoreVertical className="h-4 w-4 cursor-pointer" />
        </div>
      </div>

      {/* WhatsApp Chat Canvas with Doodle Wallpaper Background */}
      <div
        className="p-3.5 space-y-3 min-h-[380px] max-h-[460px] overflow-y-auto flex flex-col justify-between"
        style={{
          backgroundColor: "#EFEAE2",
          backgroundImage: `radial-gradient(#d3cbbe 0.75px, transparent 0.75px), radial-gradient(#d3cbbe 0.75px, #EFEAE2 0.75px)`,
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      >
        <div>
          {/* Security & Date Pill */}
          <div className="flex justify-center mb-3">
            <span className="px-2.5 py-0.5 rounded-md bg-white/90 shadow-2xs text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Today
            </span>
          </div>

          <div className="flex justify-center mb-3">
            <span className="px-3 py-1 rounded-lg bg-[#FFEECD] shadow-2xs text-[10px] text-amber-900 text-center max-w-xs leading-snug">
              🔒 Messages and calls are end-to-end encrypted.
            </span>
          </div>

          {/* Standard WhatsApp Sent Message Bubble */}
          <div className="relative max-w-[88%] ml-auto bg-[#D9FDD3] rounded-2xl rounded-tr-none p-3 shadow-xs border border-[#C2E8BA] text-[#111B21] space-y-2.5">
            {/* Bubble Corner Tail */}
            <div
              className="absolute -top-[1px] -right-2 w-0 h-0 border-t-[8px] border-t-[#D9FDD3] border-r-[8px] border-r-transparent"
            />

            {/* Message Body Text */}
            <p className="text-[11.5px] leading-relaxed whitespace-pre-wrap font-sans">
              {resolvedText}
            </p>

            {/* Mock PDF Catalog Attachment Card */}
            <div className="bg-white/80 hover:bg-white rounded-xl p-2.5 border border-[#BDE3B5] transition-all shadow-2xs flex items-center justify-between gap-2.5 cursor-pointer group">
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Red PDF File Icon */}
                <div className="h-9 w-9 rounded-lg bg-rose-500 text-white flex flex-col items-center justify-center flex-shrink-0 shadow-2xs">
                  <FileText className="h-4 w-4" />
                  <span className="text-[8px] font-mono font-bold tracking-tighter uppercase -mt-0.5">
                    PDF
                  </span>
                </div>

                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 block truncate group-hover:text-emerald-800 transition-colors">
                    Lengine_Export_Catalog_Q3.pdf
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono">
                    12 pages • 2.4 MB
                  </span>
                </div>
              </div>

              {/* Download Action Badge */}
              <div className="h-7 w-7 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0">
                <Download className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Metadata (Time & Double Blue Checkmarks) */}
            <div className="flex items-center justify-end gap-1 text-[10px] text-slate-500 pt-0.5">
              <span>10:42 AM</span>
              <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />
            </div>
          </div>
        </div>

        {/* Mock Bottom Input Bar */}
        <div className="flex items-center gap-1.5 pt-2">
          <div className="flex-1 bg-white rounded-full px-3 py-1.5 flex items-center justify-between text-slate-400 shadow-2xs">
            <div className="flex items-center gap-2">
              <Smile className="h-4 w-4 text-slate-500" />
              <span className="text-xs text-slate-400">Message</span>
            </div>
            <div className="flex items-center gap-2">
              <Paperclip className="h-4 w-4 text-slate-500" />
              <Camera className="h-4 w-4 text-slate-500" />
            </div>
          </div>

          <div className="h-8 w-8 rounded-full bg-[#008069] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Mic className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
