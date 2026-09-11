"use client";

import { useState, useEffect } from "react";
import { BUYERS_DATA } from "@/lib/buyers-data";
import {
  INITIAL_CAMPAIGNS,
  Campaign,
  DYNAMIC_VARIABLES,
} from "@/lib/campaigns-data";
import { AudienceSelector } from "@/components/campaigns/audience-selector";
import { EmailComposer } from "@/components/campaigns/email-composer";
import { SequenceBuilder } from "@/components/campaigns/sequence-builder";
import { CampaignAnalytics } from "@/components/campaigns/campaign-analytics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Megaphone,
  Plus,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Rocket,
  X,
  Layers,
  Users,
  Mail,
  GitBranch,
} from "lucide-react";

const DEFAULT_SUBJECT =
  "Sourcing Inquiry: Export Supply to {{recent_port}} ({{buyer_company}})";

const DEFAULT_BODY = `Dear {{decision_maker_name}},

I noticed {{buyer_company}}'s recurring import shipments entering through {{recent_port}} (most recently on {{latest_bol_date}} aboard {{carrier_vessel}}).

We are a primary manufacturer specializing in {{primary_commodity}} (declared under HS Code {{top_hs_code}}). With your derived annual import volume of {{import_volume}}, our facilities can offer:

- Direct manufacturer pricing with guaranteed CIF / FOB freight to {{recent_port}}
- Audited trade compliance (OEKO-TEX, GOTS, ISO 9001 certifications)
- Scaled container MOQs with 14-day dispatch windows

Would you be open to a brief 10-minute introduction this week to review our certified sample specs?

Best regards,
Global Trade Operations Desk • Export Intelligence`;

const DEFAULT_WHATSAPP = `Hi {{decision_maker_name}}, following up on our email regarding {{buyer_company}}'s recent container arrivals at {{recent_port}}.

We have specialized production runs for {{primary_commodity}} with volume pricing tailored to your derived MOQ.

I've attached our certified export catalog and technical specs below for your team's review.`;

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Load user campaigns from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("lengine_user_campaigns");
      if (stored) {
        setCampaigns(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Wizard State
  const [selectedBuyerIds, setSelectedBuyerIds] = useState<string[]>([
    "buyer-target",
    "buyer-walmart",
  ]);
  const [emailSubject, setEmailSubject] = useState(DEFAULT_SUBJECT);
  const [emailBody, setEmailBody] = useState(DEFAULT_BODY);
  const [whatsAppText, setWhatsAppText] = useState(DEFAULT_WHATSAPP);
  const [campaignName, setCampaignName] = useState(
    "US & European Consignee Direct Inbound"
  );
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchSuccess, setLaunchSuccess] = useState(false);

  const selectedBuyers = BUYERS_DATA.filter((b) =>
    selectedBuyerIds.includes(b.id)
  );

  const handleToggleBuyer = (id: string) => {
    setSelectedBuyerIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (ids: string[]) => {
    setSelectedBuyerIds(ids);
  };

  const handleDeselectAll = () => {
    setSelectedBuyerIds([]);
  };

  const handleLaunchCampaign = () => {
    setIsLaunching(true);

    setTimeout(() => {
      const newCampaign: Campaign = {
        id: `camp-${Date.now()}`,
        name: campaignName || "New Cross-Border Campaign",
        targetAudience: `${selectedBuyers.length} Consignees (${selectedBuyers.map((b) => b.name.slice(0, 10)).join(", ")}...)`,
        buyersCount: selectedBuyers.length,
        contactsCount: selectedBuyers.length * 2,
        status: "Active",
        createdAt: new Date().toISOString().split("T")[0],
        channels: ["Email", "WhatsApp"],
        stats: {
          sent: selectedBuyers.length * 2,
          delivered: selectedBuyers.length * 2,
          opened: 0,
          replied: 0,
          meetings: 0,
          openRate: 0.0,
          replyRate: 0.0,
          meetingRate: 0.0,
        },
      };

      setCampaigns((prev) => {
        const updated = [newCampaign, ...prev];
        try {
          localStorage.setItem("lengine_user_campaigns", JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });

      setIsLaunching(false);
      setIsWizardOpen(false);
      setLaunchSuccess(true);
      setCurrentStep(1);

      setTimeout(() => setLaunchSuccess(false), 5000);
    }, 900);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              Campaigns & Outreach
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-mono">
              Customs-Injected Multi-Channel
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Execute cold email and WhatsApp sequences with verified maritime manifest data injected per recipient.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            onClick={() => setIsWizardOpen(true)}
            className="h-9 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-semibold px-4 shadow-xs flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4 text-indigo-400 dark:text-indigo-200" />
            <span>New Campaign Wizard</span>
          </Button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {launchSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <div>
              <span className="font-bold">Campaign Launched Successfully!</span>
              <p className="text-emerald-700 dark:text-emerald-300 mt-0.5">
                Emails dispatched via SMTP relay. WhatsApp Day 3 condition scheduled upon email open tracking.
              </p>
            </div>
          </div>
          <button
            onClick={() => setLaunchSuccess(false)}
            className="text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-emerald-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Analytics Dashboard (Task 6) */}
      <CampaignAnalytics
        campaigns={campaigns}
        onNewCampaignClick={() => setIsWizardOpen(true)}
      />

      {/* NEW CAMPAIGN SETUP WIZARD (STEPPER MODAL) */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Frosted Backdrop */}
          <div
            onClick={() => setIsWizardOpen(false)}
            className="fixed inset-0 bg-slate-950/70 dark:bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Stepper Modal Container */}
          <div className="relative z-10 w-full max-w-5xl bg-white dark:bg-[#121215] rounded-2xl border border-[#eaeaea] dark:border-[#27272a] shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
            {/* Modal Header & Stepper Progress Bar */}
            <div className="px-6 py-4 sm:px-8 border-b border-[#eaeaea] dark:border-[#27272a] bg-white dark:bg-[#121215] sticky top-0 z-20 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    New Outreach Campaign Wizard
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Step {currentStep} of 3:{" "}
                    {currentStep === 1
                      ? "Select Unlocked Consignees"
                      : currentStep === 2
                      ? "Context-Injected Email Composer"
                      : "Sequence Builder & WhatsApp Preview"}
                  </p>
                </div>

                <button
                  onClick={() => setIsWizardOpen(false)}
                  className="h-8 w-8 rounded-lg border border-[#eaeaea] dark:border-[#27272a] bg-[#fafafa] dark:bg-[#18181b] hover:bg-slate-100 dark:hover:bg-[#222226] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* 3-Step Stepper Bar */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className={`text-left p-2.5 rounded-lg border text-xs transition-all flex items-center gap-2.5 ${
                    currentStep === 1
                      ? "bg-slate-900 text-white border-slate-900 dark:bg-indigo-600 dark:border-indigo-600 font-semibold"
                      : "bg-[#fafafa] dark:bg-[#18181b] text-slate-600 dark:text-slate-300 border-[#eaeaea] dark:border-[#27272a] hover:bg-slate-100 dark:hover:bg-[#222226]"
                  }`}
                >
                  <span className="h-5 w-5 rounded-full bg-white/20 dark:bg-white/20 flex items-center justify-center text-[11px] font-mono">
                    1
                  </span>
                  <div className="truncate">
                    <span className="block text-[10px] text-slate-400 dark:text-slate-400 uppercase tracking-wider">Step 1</span>
                    <span className="truncate block">Audience Selection</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => selectedBuyerIds.length > 0 && setCurrentStep(2)}
                  disabled={selectedBuyerIds.length === 0}
                  className={`text-left p-2.5 rounded-lg border text-xs transition-all flex items-center gap-2.5 ${
                    currentStep === 2
                      ? "bg-slate-900 text-white border-slate-900 dark:bg-indigo-600 dark:border-indigo-600 font-semibold"
                      : "bg-[#fafafa] dark:bg-[#18181b] text-slate-600 dark:text-slate-300 border-[#eaeaea] dark:border-[#27272a] hover:bg-slate-100 dark:hover:bg-[#222226] disabled:opacity-50"
                  }`}
                >
                  <span className="h-5 w-5 rounded-full bg-white/20 dark:bg-white/20 flex items-center justify-center text-[11px] font-mono">
                    2
                  </span>
                  <div className="truncate">
                    <span className="block text-[10px] text-slate-400 dark:text-slate-400 uppercase tracking-wider">Step 2</span>
                    <span className="truncate block">Email Composer</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => selectedBuyerIds.length > 0 && setCurrentStep(3)}
                  disabled={selectedBuyerIds.length === 0}
                  className={`text-left p-2.5 rounded-lg border text-xs transition-all flex items-center gap-2.5 ${
                    currentStep === 3
                      ? "bg-slate-900 text-white border-slate-900 dark:bg-indigo-600 dark:border-indigo-600 font-semibold"
                      : "bg-[#fafafa] dark:bg-[#18181b] text-slate-600 dark:text-slate-300 border-[#eaeaea] dark:border-[#27272a] hover:bg-slate-100 dark:hover:bg-[#222226] disabled:opacity-50"
                  }`}
                >
                  <span className="h-5 w-5 rounded-full bg-white/20 dark:bg-white/20 flex items-center justify-center text-[11px] font-mono">
                    3
                  </span>
                  <div className="truncate">
                    <span className="block text-[10px] text-slate-400 dark:text-slate-400 uppercase tracking-wider">Step 3</span>
                    <span className="truncate block">Sequence & WhatsApp</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Stepper Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#fafafa] dark:bg-[#09090b]">
              {/* STEP 1: Audience Selector */}
              {currentStep === 1 && (
                <AudienceSelector
                  selectedBuyerIds={selectedBuyerIds}
                  onToggleBuyer={handleToggleBuyer}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleDeselectAll}
                />
              )}

              {/* STEP 2: Email Composer & Dynamic Variables */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-white dark:bg-[#121215] p-3.5 rounded-xl border border-[#eaeaea] dark:border-[#27272a] shadow-xs flex items-center justify-between gap-4">
                    <div className="flex-1 max-w-md">
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold block mb-1">
                        Campaign Reference Title
                      </label>
                      <input
                        type="text"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        className="w-full text-xs font-bold text-slate-900 dark:text-slate-100 bg-transparent border-b border-slate-200 dark:border-[#27272a] focus:outline-hidden focus:border-indigo-500 dark:focus:border-indigo-400 pb-0.5"
                      />
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>{selectedBuyers.length} Consignees in this sequence</span>
                    </div>
                  </div>

                  <EmailComposer
                    selectedBuyers={selectedBuyers}
                    subject={emailSubject}
                    setSubject={setEmailSubject}
                    body={emailBody}
                    setBody={setEmailBody}
                  />
                </div>
              )}

              {/* STEP 3: Sequence Builder & WhatsApp Preview */}
              {currentStep === 3 && (
                <SequenceBuilder
                  emailSubject={emailSubject}
                  emailBody={emailBody}
                  whatsAppText={whatsAppText}
                  setWhatsAppText={setWhatsAppText}
                  selectedBuyers={selectedBuyers}
                />
              )}
            </div>

            {/* Stepper Bottom Navigation Footer */}
            <div className="px-6 py-4 sm:px-8 border-t border-[#eaeaea] dark:border-[#27272a] bg-white dark:bg-[#121215] flex items-center justify-between sticky bottom-0 z-20">
              <div>
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3)}
                    className="h-8.5 text-xs text-slate-700 dark:text-slate-300 border-[#eaeaea] dark:border-[#27272a] bg-white dark:bg-[#18181b] hover:bg-slate-50 dark:hover:bg-[#222226]"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                    Back
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsWizardOpen(false)}
                  className="h-8.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Cancel
                </Button>

                {currentStep < 3 ? (
                  <Button
                    size="sm"
                    disabled={selectedBuyerIds.length === 0}
                    onClick={() => setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3)}
                    className="h-8.5 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-semibold px-4 shadow-xs flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>
                      {currentStep === 1
                        ? `Continue to Composer (${selectedBuyerIds.length} Selected)`
                        : "Continue to Sequence Builder"}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleLaunchCampaign}
                    disabled={isLaunching}
                    className="h-8.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 shadow-sm flex items-center gap-2"
                  >
                    <Rocket className="h-3.5 w-3.5" />
                    <span>{isLaunching ? "Launching Sequence..." : "Launch Campaign"}</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
