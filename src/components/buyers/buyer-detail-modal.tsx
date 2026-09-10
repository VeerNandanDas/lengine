"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CompanyBuyer, BillOfLadingRecord } from "@/lib/buyers-data";
import {
  getMaskedContacts,
  type MaskedDecisionMaker,
  type UnlockedDecisionMaker,
} from "@/lib/contacts-data";
import { unlockAllContacts } from "@/app/dashboard/buyers/actions/unlock-contact";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BuyerSparkline } from "./buyer-sparkline";
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
  Sparkles,
  Coins,
  Loader2,
  Check,
  Copy,
  X,
  Building2,
  CheckCircle2,
  PlusCircle,
  TrendingUp,
  Lock,
  Mail,
  Phone,
  Package,
} from "lucide-react";

const DEMO_CREDITS_KEY = "lengine_demo_credits";
const DEMO_UNLOCKS_KEY = "lengine_demo_unlocks";

function getDemoCredits(): number {
  if (typeof window === "undefined") return 15;
  const stored = localStorage.getItem(DEMO_CREDITS_KEY);
  if (stored !== null) {
    const val = parseInt(stored, 10);
    return isNaN(val) ? 15 : val;
  }
  localStorage.setItem(DEMO_CREDITS_KEY, "15");
  return 15;
}

function setDemoCredits(balance: number): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(DEMO_CREDITS_KEY, String(balance));
}

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

function addDemoUnlockedBuyer(buyerId: string): void {
  if (typeof window === "undefined") return;
  const unlocks = getDemoUnlockedBuyers();
  unlocks.add(buyerId);
  localStorage.setItem(DEMO_UNLOCKS_KEY, JSON.stringify([...unlocks]));
}

export type BuyerModalTab = "manifests" | "contacts" | "analytics";

interface BuyerDetailModalProps {
  buyer: CompanyBuyer | null;
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: BuyerModalTab;
}

export function BuyerDetailModal({
  buyer,
  isOpen,
  onClose,
  defaultTab = "manifests",
}: BuyerDetailModalProps) {
  const [activeTab, setActiveTab] = useState<BuyerModalTab>(defaultTab);

  // Contacts / Credit State
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockedContacts, setUnlockedContacts] = useState<UnlockedDecisionMaker[]>([]);
  const [maskedContacts, setMaskedContacts] = useState<MaskedDecisionMaker[]>([]);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [credits, setCredits] = useState(15);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sync tab on modal open
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  // Keyboard close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Load state when buyer changes or modal opens
  useEffect(() => {
    if (!buyer || !isOpen) return;

    setCredits(getDemoCredits());
    setError(null);

    const masked = getMaskedContacts(buyer.id);
    setMaskedContacts(masked);

    const unlockedBuyers = getDemoUnlockedBuyers();
    if (unlockedBuyers.has(buyer.id)) {
      setIsUnlocked(true);
      unlockAllContacts(buyer.id).then((res) => {
        if (res.success && res.contacts) {
          setUnlockedContacts(res.contacts);
        }
      });
    } else {
      setIsUnlocked(false);
      setUnlockedContacts([]);
    }
  }, [buyer, isOpen]);

  const handleCopy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }, []);

  const handleUnlockAll = async () => {
    if (!buyer) return;

    const currentCredits = getDemoCredits();
    if (currentCredits < 5) {
      setError("Insufficient credits. You need 5 credits to unlock all decision makers.");
      return;
    }

    setIsUnlocking(true);
    setError(null);

    try {
      const result = await unlockAllContacts(buyer.id);

      if (result.success && result.contacts) {
        const newBalance = currentCredits - 5;
        setDemoCredits(newBalance);
        setCredits(newBalance);
        addDemoUnlockedBuyer(buyer.id);

        setUnlockedContacts(result.contacts);
        setIsUnlocked(true);
      } else {
        setError(result.error || "Failed to unlock decision makers.");
      }
    } catch {
      setError("An unexpected error occurred while unlocking.");
    } finally {
      setIsUnlocking(false);
    }
  };

  const handleAddCredits = () => {
    const updated = credits + 15;
    setDemoCredits(updated);
    setCredits(updated);
    setError(null);
  };

  if (!isOpen || !buyer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
      {/* High-end Backdrop Blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-md transition-opacity"
      />

      {/* Centered Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 14 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl bg-white dark:bg-[#121215] rounded-2xl border border-[#eaeaea] dark:border-[#27272a] shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4.5 sm:px-8 border-b border-[#eaeaea] dark:border-[#27272a] bg-white dark:bg-[#121215] sticky top-0 z-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="h-11 w-11 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] flex items-center justify-center text-xl shadow-xs flex-shrink-0">
                {buyer.countryFlag}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight truncate">
                    {buyer.name}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-medium px-2 py-0.5 flex items-center gap-1 flex-shrink-0"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified Customs Profile
                  </Badge>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1 truncate">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{buyer.legalEntity}</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span>{buyer.city}, {buyer.country}</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <Anchor className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                    {buyer.portOfUnlading} ({buyer.portCode})
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-auto flex-shrink-0">
              {/* Export Manifest Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {}}
                className="h-8.5 border-[#eaeaea] dark:border-[#27272a] text-xs font-normal text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-white dark:bg-[#18181b]"
              >
                <Download className="h-3.5 w-3.5 mr-1.5 text-slate-400 dark:text-slate-500" />
                Export Dossier
              </Button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="h-8.5 w-8.5 rounded-lg border border-[#eaeaea] dark:border-[#27272a] bg-[#fafafa] dark:bg-[#18181b] hover:bg-slate-100 dark:hover:bg-[#202025] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>

          {/* Key Metrics Strip (Spacious 4-column KPI row) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#eaeaea] dark:border-[#27272a]">
            <div className="bg-[#fafafa] dark:bg-[#18181b] rounded-lg p-2.5 border border-[#eaeaea] dark:border-[#27272a]">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold block">
                Total Volume
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-100 font-mono text-base mt-0.5 block">
                {buyer.annualTeus}
              </span>
            </div>

            <div className="bg-[#fafafa] dark:bg-[#18181b] rounded-lg p-2.5 border border-[#eaeaea] dark:border-[#27272a]">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold block">
                Annual Manifests
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-100 font-mono text-base mt-0.5 block">
                {buyer.annualShipments} BoLs
              </span>
            </div>

            <div className="bg-[#fafafa] dark:bg-[#18181b] rounded-lg p-2.5 border border-[#eaeaea] dark:border-[#27272a]">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold block">
                Derived MOQ
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-100 font-mono text-base mt-0.5 block">
                {buyer.derivedMoq}
              </span>
            </div>

            <div className="bg-[#fafafa] dark:bg-[#18181b] rounded-lg p-2.5 border border-[#eaeaea] dark:border-[#27272a]">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold block">
                Volume Reliability
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-base mt-0.5 block">
                {buyer.consistencyScore}% score
              </span>
            </div>
          </div>

          {/* Segmented Tab Navigation */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setActiveTab("manifests")}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "manifests"
                  ? "bg-slate-900 dark:bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-[#18181b] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-[#202025]"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Bill of Lading Manifests</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                activeTab === "manifests" ? "bg-slate-800 dark:bg-indigo-700 text-slate-300 dark:text-white" : "bg-white dark:bg-[#222228] text-slate-500 dark:text-slate-400"
              }`}>
                {buyer.shipments.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("contacts")}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "contacts"
                  ? "bg-slate-900 dark:bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-[#18181b] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-[#202025]"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Executive Decision Makers</span>
              {isUnlocked ? (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                  Unlocked
                </span>
              ) : (
                <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.2 rounded font-mono">
                  5 Credits
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "analytics"
                  ? "bg-slate-900 dark:bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-[#18181b] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-[#202025]"
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Compliance & Analytics</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#fafafa] dark:bg-[#09090b]">
          {/* TAB 1: Customs Bill of Lading Manifests */}
          {activeTab === "manifests" && (
            <div className="space-y-4">
              {/* Executive Decision Makers Quick Banner */}
              {!isUnlocked && (
                <div className="rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/80 via-white to-slate-50 dark:from-indigo-950/40 dark:via-[#121215] dark:to-slate-950/40 p-4.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                        Executive Decision Makers Available
                      </span>
                      <span className="text-[10px] font-mono font-semibold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                        5 Credits Full Suite
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Direct verified emails, phone lines, and LinkedIn profiles for {buyer.name}&apos;s key procurement officers.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setActiveTab("contacts")}
                    className="h-8.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3.5 flex-shrink-0 flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>View Contacts</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {/* BoL Records List */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                      Raw Bill of Lading (BoL) Manifest Records
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                    Showing {buyer.shipments.length} verified customs filings
                  </span>
                </div>

                {buyer.shipments.map((bol: BillOfLadingRecord) => (
                  <div
                    key={bol.bolNumber}
                    className="bg-white dark:bg-[#121215] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-5 transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-xs space-y-4"
                  >
                    {/* Top Row: BoL Number, Date, Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3.5 border-b border-[#eaeaea] dark:border-[#27272a]">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                          BoL ID:
                        </span>
                        <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-xs bg-slate-100 dark:bg-[#18181b] px-2.5 py-1 rounded border border-[#eaeaea] dark:border-[#27272a]">
                          {bol.bolNumber}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-mono text-xs">
                          <Calendar className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                          {bol.date}
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-medium px-2 py-0.5"
                        >
                          {bol.customsStatus}
                        </Badge>
                      </div>
                    </div>

                    {/* Middle Row: Freight Corridor & Vessel Telemetry (Clean, spacious 2 columns) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3.5 border-b border-[#eaeaea] dark:border-[#27272a]">
                      {/* Freight Corridor */}
                      <div className="bg-[#fafafa] dark:bg-[#18181b] p-3 rounded-lg border border-[#eaeaea] dark:border-[#27272a]">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold block mb-1.5">
                          Maritime Freight Corridor
                        </span>
                        <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200 text-xs flex-wrap">
                          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white dark:bg-[#202025] border border-[#eaeaea] dark:border-[#27272a] text-indigo-700 dark:text-indigo-400">
                            {bol.portOfLoadingCode}
                          </span>
                          <span className="text-slate-700 dark:text-slate-300">{bol.portOfLoading}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white dark:bg-[#202025] border border-[#eaeaea] dark:border-[#27272a] text-emerald-700 dark:text-emerald-400">
                            {bol.portOfUnladingCode}
                          </span>
                          <span className="text-slate-700 dark:text-slate-300">{bol.portOfUnlading}</span>
                        </div>
                      </div>

                      {/* Vessel & Voyage */}
                      <div className="bg-[#fafafa] dark:bg-[#18181b] p-3 rounded-lg border border-[#eaeaea] dark:border-[#27272a]">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold block mb-1.5">
                          Carrier & Voyage Telemetry
                        </span>
                        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 text-xs">
                          <Ship className="h-4 w-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                          <span className="font-semibold">{bol.vessel}</span>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <span className="font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-[#202025] px-2 py-0.5 rounded border border-[#eaeaea] dark:border-[#27272a]">
                            Voyage: {bol.voyage}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Commodity Description, Shipper & Container Spec */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="md:col-span-2 space-y-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold block">
                          Declared Commodity & HS Code
                        </span>
                        <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                          {bol.commodityDesc}
                        </p>
                        <div className="inline-block bg-slate-100 dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] px-2 py-0.5 rounded text-[11px] font-mono text-slate-600 dark:text-slate-300">
                          HS Code: {bol.hsCode}
                        </div>
                      </div>

                      <div className="space-y-3 bg-[#fafafa] dark:bg-[#18181b] p-3 rounded-lg border border-[#eaeaea] dark:border-[#27272a]">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold block">
                            Shipper / Exporter
                          </span>
                          <p className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                            {bol.shipper}
                          </p>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            Origin: {bol.shipperOrigin}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-[#eaeaea] dark:border-[#27272a] flex items-center justify-between text-[11px]">
                          <div>
                            <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Container</span>
                            <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                              {bol.containerId} ({bol.containerType})
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Gross Wt</span>
                            <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                              {bol.grossWeightKg}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Executive Decision Makers (5 Credits Batch Unlock) */}
          {activeTab === "contacts" && (
            <div className="space-y-6">
              {/* High-Impact Executive Banner */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 p-6 sm:p-7 text-white shadow-md">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/20 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Executive Contact Suite
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {maskedContacts.length} Key Profiles Available
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-white">
                      Verified Procurement & Supply Chain Decision Makers
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      Gain instant access to direct email addresses, direct desk lines, and LinkedIn profiles for procurement heads and supply chain leadership at {buyer.name}.
                    </p>

                    <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-300 flex-wrap">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        Direct Work Emails
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        Desk & Mobile Direct Lines
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        Verified LinkedIn Profiles
                      </span>
                    </div>
                  </div>

                  {/* Unlock CTA / Status */}
                  <div className="flex-shrink-0 flex flex-col items-start md:items-end gap-2">
                    {!isUnlocked ? (
                      <>
                        <Button
                          size="lg"
                          onClick={handleUnlockAll}
                          disabled={isUnlocking}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-6 py-6 shadow-lg shadow-indigo-900/30 transition-all active:scale-[0.98] border border-indigo-400/30 flex items-center gap-2.5 h-auto rounded-xl"
                        >
                          {isUnlocking ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin text-white" />
                              <span>Verifying & Unlocking...</span>
                            </>
                          ) : (
                            <>
                              <Coins className="h-4 w-4 text-amber-300 fill-amber-300" />
                              <span>Unlock All Contacts (5 Credits)</span>
                            </>
                          )}
                        </Button>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span>Balance: {credits} credits</span>
                          <button
                            onClick={handleAddCredits}
                            className="text-indigo-400 underline hover:text-indigo-300"
                          >
                            +15 Demo Credits
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="px-5 py-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">
                            Executive Suite Unlocked
                          </div>
                          <div className="text-[11px] text-emerald-300">
                            All {unlockedContacts.length} verified contacts revealed below
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
                    <span>{error}</span>
                    <button
                      onClick={handleAddCredits}
                      className="underline text-rose-200 font-medium ml-2"
                    >
                      Top-up 15 demo credits
                    </button>
                  </div>
                )}
              </div>

              {/* Grid of Decision Maker Cards (3 Columns Desktop, Spacious Layout) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="wait">
                  {isUnlocked
                    ? unlockedContacts.map((contact, index) => (
                        <motion.div
                          key={contact.id}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: index * 0.06 }}
                          className="bg-white dark:bg-[#121215] rounded-xl border border-[#eaeaea] dark:border-[#27272a] hover:border-slate-300 dark:hover:border-slate-700 transition-all p-6 shadow-xs flex flex-col justify-between"
                        >
                          <div>
                            {/* Profile Header */}
                            <div className="flex items-start justify-between gap-3 mb-4">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white font-bold text-sm flex items-center justify-center shadow-xs flex-shrink-0">
                                  {contact.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join("")}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <h5 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                                      {contact.name}
                                    </h5>
                                    <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                                  </div>
                                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                    {contact.role}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Department Badge */}
                            <div className="mb-5">
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] px-2.5 py-0.5 rounded-md">
                                <Building2 className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                                {contact.department}
                              </span>
                            </div>

                            {/* Contact Data Rows */}
                            <div className="space-y-3 pt-1 border-t border-[#eaeaea] dark:border-[#27272a]">
                              {/* Work Email Row */}
                              <div className="flex items-center justify-between text-xs py-1">
                                <div className="flex items-center gap-2 min-w-0 pr-2">
                                  <div className="h-7 w-7 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                                    <Mail className="h-3.5 w-3.5" />
                                  </div>
                                  <div className="truncate">
                                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                                      Direct Work Email
                                    </span>
                                    <a
                                      href={`mailto:${contact.email}`}
                                      className="font-mono text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 truncate block font-medium"
                                    >
                                      {contact.email}
                                    </a>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCopy(contact.email, `email-${contact.id}`)}
                                  className="h-7 px-2 border-[#eaeaea] dark:border-[#27272a] text-[11px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-white dark:bg-[#18181b] flex-shrink-0"
                                >
                                  {copiedKey === `email-${contact.id}` ? (
                                    <>
                                      <Check className="h-3 w-3 mr-1 text-emerald-600 dark:text-emerald-400" />
                                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3 w-3 mr-1 text-slate-400 dark:text-slate-500" />
                                      Copy
                                    </>
                                  )}
                                </Button>
                              </div>

                              {/* Direct Phone Row */}
                              <div className="flex items-center justify-between text-xs py-1">
                                <div className="flex items-center gap-2 min-w-0 pr-2">
                                  <div className="h-7 w-7 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                                    <Phone className="h-3.5 w-3.5" />
                                  </div>
                                  <div className="truncate">
                                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                                      Direct Line / Desk
                                    </span>
                                    <a
                                      href={`tel:${contact.phone}`}
                                      className="font-mono text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 truncate block font-medium"
                                    >
                                      {contact.phone}
                                    </a>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCopy(contact.phone, `phone-${contact.id}`)}
                                  className="h-7 px-2 border-[#eaeaea] dark:border-[#27272a] text-[11px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-white dark:bg-[#18181b] flex-shrink-0"
                                >
                                  {copiedKey === `phone-${contact.id}` ? (
                                    <>
                                      <Check className="h-3 w-3 mr-1 text-emerald-600 dark:text-emerald-400" />
                                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3 w-3 mr-1 text-slate-400 dark:text-slate-500" />
                                      Copy
                                    </>
                                  )}
                                </Button>
                              </div>

                              {/* LinkedIn Profile */}
                              <div className="flex items-center justify-between text-xs py-1">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="h-7 w-7 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                                      Executive Network
                                    </span>
                                    <span className="text-slate-800 dark:text-slate-200 font-medium">
                                      LinkedIn Profile
                                    </span>
                                  </div>
                                </div>
                                <a
                                  href={contact.linkedinUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-100 dark:border-indigo-900/60 px-2.5 py-1 rounded-md transition-colors flex-shrink-0"
                                >
                                  Connect
                                  <ExternalLink className="h-2.5 w-2.5" />
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="mt-5 pt-3 border-t border-[#eaeaea] dark:border-[#27272a] flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                              <CheckCircle2 className="h-3 w-3" />
                              Verified Active Q3 2026
                            </span>
                            <span>Authority: Direct Sign-off</span>
                          </div>
                        </motion.div>
                      ))
                    : maskedContacts.map((contact, index) => (
                        <motion.div
                          key={contact.id}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: index * 0.06 }}
                          className="bg-white dark:bg-[#121215] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-6 shadow-xs flex flex-col justify-between relative overflow-hidden"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-3 mb-4">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] text-slate-400 dark:text-slate-500 font-bold text-sm flex items-center justify-center flex-shrink-0">
                                  <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono tracking-tight select-none">
                                      {contact.maskedName}
                                    </h5>
                                    <span className="text-[10px] bg-slate-100 dark:bg-[#18181b] text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded font-medium">
                                      Locked
                                    </span>
                                  </div>
                                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mt-0.5">
                                    {contact.role}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mb-5">
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] px-2.5 py-0.5 rounded-md">
                                <Building2 className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                                {contact.department}
                              </span>
                            </div>

                            <div className="space-y-3 pt-1 border-t border-[#eaeaea] dark:border-[#27272a]">
                              <div className="flex items-center justify-between text-xs py-1">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="h-7 w-7 rounded-md bg-slate-100 dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] flex items-center justify-center text-slate-400 dark:text-slate-500 flex-shrink-0">
                                    <Mail className="h-3.5 w-3.5" />
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                                      Direct Work Email
                                    </span>
                                    <span className="font-mono text-slate-400 dark:text-slate-500 select-none blur-[2.5px]">
                                      {contact.maskedEmail}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono bg-slate-50 dark:bg-[#18181b] px-1.5 py-0.5 rounded border border-[#eaeaea] dark:border-[#27272a]">
                                  5 Credits
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-xs py-1">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="h-7 w-7 rounded-md bg-slate-100 dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] flex items-center justify-center text-slate-400 dark:text-slate-500 flex-shrink-0">
                                    <Phone className="h-3.5 w-3.5" />
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                                      Direct Line / Desk
                                    </span>
                                    <span className="font-mono text-slate-400 dark:text-slate-500 select-none blur-[2.5px]">
                                      {contact.maskedPhone}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono bg-slate-50 dark:bg-[#18181b] px-1.5 py-0.5 rounded border border-[#eaeaea] dark:border-[#27272a]">
                                  5 Credits
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-xs py-1">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="h-7 w-7 rounded-md bg-slate-100 dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] flex items-center justify-center text-slate-400 dark:text-slate-500 flex-shrink-0">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                                      Executive Network
                                    </span>
                                    <span className="text-slate-400 dark:text-slate-500 text-xs">
                                      LinkedIn Profile
                                    </span>
                                  </div>
                                </div>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono bg-slate-50 dark:bg-[#18181b] px-1.5 py-0.5 rounded border border-[#eaeaea] dark:border-[#27272a]">
                                  Locked
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-5 pt-3 border-t border-[#eaeaea] dark:border-[#27272a] flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
                              <Lock className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                              Requires 5 Credits Unlock
                            </span>
                            <span>Key Sourcing Contact</span>
                          </div>
                        </motion.div>
                      ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* TAB 3: Compliance & Trade Standards */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              {/* Consistency Sparkline Card */}
              <div className="bg-white dark:bg-[#121215] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                      12-Month Customs Import Trajectory
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Volume continuity derived from Bill of Lading manifests filed at {buyer.portOfUnlading}.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-semibold block">
                      Consistency Score
                    </span>
                    <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400">
                      {buyer.consistencyScore}%
                    </span>
                  </div>
                </div>

                <div className="bg-[#fafafa] dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] rounded-lg p-4">
                  <BuyerSparkline
                    data={buyer.sparkline}
                    gradientId={`modal-sparkline-${buyer.id}`}
                    color="#4F46E5"
                  />
                </div>
              </div>

              {/* Verified Trade Standards & Certifications */}
              <div className="bg-white dark:bg-[#121215] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                    Verified Compliance & Trade Standards
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2 bg-[#fafafa] dark:bg-[#18181b] p-4 rounded-lg border border-[#eaeaea] dark:border-[#27272a]">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold block">
                      Audited Trade Certifications
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {buyer.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="bg-white dark:bg-[#202025] border border-[#eaeaea] dark:border-[#27272a] text-slate-700 dark:text-slate-200 px-2.5 py-1 rounded-md text-xs font-medium shadow-2xs"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 bg-[#fafafa] dark:bg-[#18181b] p-4 rounded-lg border border-[#eaeaea] dark:border-[#27272a]">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold block">
                      Customary Trade Incoterms
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {buyer.usualIncoterms.map((term) => (
                        <span
                          key={term}
                          className="bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-md text-xs font-mono font-medium"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#eaeaea] dark:border-[#27272a] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Package className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <span>Active Global Shippers in Network: <strong>{buyer.verifiedSuppliersCount} exporters</strong></span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                    Last Port Filing: {buyer.lastShipmentDate}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-4 sm:px-8 border-t border-[#eaeaea] dark:border-[#27272a] bg-white dark:bg-[#121215] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sticky bottom-0 z-20">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Encrypted Trade Intelligence • Sourced directly from US Customs & Border Protection (CBP) manifests.</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="h-8.5 border-[#eaeaea] dark:border-[#27272a] text-xs font-normal text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-white dark:bg-[#18181b]"
            >
              Close Dossier
            </Button>

            {activeTab === "contacts" && !isUnlocked && (
              <Button
                size="sm"
                onClick={handleUnlockAll}
                disabled={isUnlocking}
                className="h-8.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                {isUnlocking ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Coins className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
                )}
                Unlock Suite (5 Credits)
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
