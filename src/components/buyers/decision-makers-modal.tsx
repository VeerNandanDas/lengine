"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CompanyBuyer } from "@/lib/buyers-data";
import {
  getMaskedContacts,
  type MaskedDecisionMaker,
  type UnlockedDecisionMaker,
} from "@/lib/contacts-data";
import { unlockAllContacts } from "@/app/dashboard/buyers/actions/unlock-contact";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Lock,
  Unlock,
  Mail,
  Phone,
  ExternalLink,
  ShieldCheck,
  Coins,
  Loader2,
  Sparkles,
  Check,
  Copy,
  X,
  Building2,
  Anchor,
  CheckCircle2,
  PlusCircle,
  AlertCircle,
  Search,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

const DEMO_CREDITS_KEY = "lengine_demo_credits";
const DEMO_UNLOCKS_KEY = "lengine_demo_unlocks";

function getDemoCredits(): number {
  if (typeof window === "undefined") return 500;
  const stored = localStorage.getItem(DEMO_CREDITS_KEY);
  if (stored !== null) {
    const val = parseInt(stored, 10);
    return isNaN(val) ? 500 : val;
  }
  localStorage.setItem(DEMO_CREDITS_KEY, "500");
  return 500;
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

interface DecisionMakersModalProps {
  buyer: CompanyBuyer | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DecisionMakersModal({
  buyer,
  isOpen,
  onClose,
}: DecisionMakersModalProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockedContacts, setUnlockedContacts] = useState<UnlockedDecisionMaker[]>([]);
  const [maskedContacts, setMaskedContacts] = useState<MaskedDecisionMaker[]>([]);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [credits, setCredits] = useState(15);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Single Contact Waterfall States
  const [singleUnlockedData, setSingleUnlockedData] = useState<Record<string, UnlockedDecisionMaker>>({});
  const [unlockingContactId, setUnlockingContactId] = useState<string | null>(null);
  const [failedContactStates, setFailedContactStates] = useState<
    Record<string, { message: string; canRequestHumanResearch: boolean }>
  >({});
  const [humanResearchTickets, setHumanResearchTickets] = useState<
    Record<string, { ticketId: string; status: string }>
  >({});
  const [requestingHumanResearchId, setRequestingHumanResearchId] = useState<string | null>(null);
  const [simulateFailure, setSimulateFailure] = useState(false);

  // Close on Escape key
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

    const currentCredits = getDemoCredits();
    setCredits(currentCredits);
    setError(null);
    setFailedContactStates({});
    setHumanResearchTickets({});

    const masked = getMaskedContacts(buyer.id);
    setMaskedContacts(masked);

    // Check if previously unlocked
    const unlockedBuyers = getDemoUnlockedBuyers();
    if (unlockedBuyers.has(buyer.id)) {
      setIsUnlocked(true);
      // Fetch full contacts
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

  // Handle Copy to clipboard
  const handleCopy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }, []);

  // Unlock single contact (costs 1 credit) with soft-lock and Apollo -> PDL waterfall
  const handleUnlockSingle = async (contactId: string) => {
    if (!buyer) return;
    const currentCredits = getDemoCredits();
    if (currentCredits < 1) {
      setError("Insufficient credits. You need at least 1 credit to unlock this contact.");
      return;
    }

    setUnlockingContactId(contactId);
    setError(null);
    // Clear any previous failure message on this specific card
    setFailedContactStates((prev) => {
      const next = { ...prev };
      delete next[contactId];
      return next;
    });

    try {
      const res = await fetch("/api/contacts/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerId: buyer.id,
          contactId,
          simulateFailure,
        }),
      });

      const data = await res.json();

      if (data.success && data.contact) {
        // Scenario A: Success - 1 Credit permanently deducted
        const newBalance = Math.max(0, currentCredits - 1);
        setDemoCredits(newBalance);
        setCredits(newBalance);

        setSingleUnlockedData((prev) => ({
          ...prev,
          [contactId]: data.contact,
        }));
      } else if (data.scenario === "not_found") {
        // Scenario B: Failure across waterfall - hold cancelled, 0 credits deducted
        setFailedContactStates((prev) => ({
          ...prev,
          [contactId]: {
            message:
              data.message ||
              "We couldn't find a verified direct contact for this company. 0 Credits were deducted.",
            canRequestHumanResearch: Boolean(data.canRequestHumanResearch),
          },
        }));
      } else {
        setError(data.message || "An unexpected error occurred during verification.");
      }
    } catch {
      setError("Failed to reach verification registry. Please try again.");
    } finally {
      setUnlockingContactId(null);
    }
  };

  // Human Research Request (costs 3 credits, 48hr turnaround)
  const handleRequestHumanResearch = async (contactId: string, role: string) => {
    if (!buyer) return;
    const currentCredits = getDemoCredits();
    if (currentCredits < 3) {
      setError("Insufficient credits. Human Research requires 3 credits.");
      return;
    }

    setRequestingHumanResearchId(contactId);
    setError(null);

    try {
      const res = await fetch("/api/contacts/human-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerId: buyer.id,
          contactId,
          role,
          companyName: buyer.name,
        }),
      });

      const data = await res.json();

      if (data.success) {
        const newBalance = Math.max(0, currentCredits - 3);
        setDemoCredits(newBalance);
        setCredits(newBalance);

        setHumanResearchTickets((prev) => ({
          ...prev,
          [contactId]: {
            ticketId: data.ticketId,
            status: "queued",
          },
        }));
      } else {
        setError(data.message || "Failed to dispatch human research request.");
      }
    } catch {
      setError("Failed to queue request with research desk.");
    } finally {
      setRequestingHumanResearchId(null);
    }
  };

  // Unlock all contacts (costs 5 credits)
  const handleUnlockAll = async () => {
    if (!buyer) return;

    const currentCredits = getDemoCredits();
    if (currentCredits < 5) {
      setError("Insufficient credits. You need 5 credits to unlock all decision makers for this company.");
      return;
    }

    setIsUnlocking(true);
    setError(null);

    try {
      const result = await unlockAllContacts(buyer.id);

      if (result.success && result.contacts) {
        // Deduct 5 credits in demo mode
        const newBalance = Math.max(0, currentCredits - 5);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop with rich blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
      />

      {/* Centered Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl bg-white rounded-2xl border border-[#eaeaea] shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 sm:px-8 border-b border-[#eaeaea] bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-50 to-slate-100 border border-indigo-100 flex items-center justify-center text-lg shadow-xs flex-shrink-0">
              {buyer.countryFlag}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  {buyer.name}
                </h2>
                <Badge
                  variant="secondary"
                  className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium px-2 py-0.5 flex items-center gap-1"
                >
                  <ShieldCheck className="h-3 w-3" />
                  Verified Foreign Consignee
                </Badge>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <span>{buyer.legalEntity}</span>
                <span className="text-slate-300">•</span>
                <Anchor className="h-3 w-3 text-slate-400" />
                <span>{buyer.portOfUnlading} ({buyer.portCode})</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Credit Balance Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 text-xs font-medium">
              <Coins className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              <span className="font-mono font-bold text-amber-950">{credits}</span>
              <span className="text-amber-700">Credits Available</span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-lg border border-[#eaeaea] bg-[#fafafa] hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#fafafa]">
          {/* Executive Intelligence Value Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 p-6 sm:p-7 text-white shadow-md">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/20 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    High-Intent Sourcing Intelligence
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {maskedContacts.length} Key Executives Available
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-white">
                  Verified Decision Makers & Direct Leadership Suite
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Gain immediate access to verified procurement heads, supply chain directors, and merchandising buyers directly responsible for customs import clearance and vendor vendor selection at {buyer.name}.
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

              {/* Unlock Action Button */}
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
                          <span>Unlock All Decision Makers (5 Credits)</span>
                        </>
                      )}
                    </Button>
                    <p className="text-[11px] text-slate-400">
                      One single unlock grants lifetime access to all {maskedContacts.length} contacts
                    </p>
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
                {error.includes("Insufficient") && (
                  <button
                    onClick={handleAddCredits}
                    className="underline text-rose-200 font-medium ml-2"
                  >
                    Add 15 demo credits
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                Executive Roster ({isUnlocked ? unlockedContacts.length : maskedContacts.length} Profiles)
              </h4>
              <p className="text-xs text-slate-500">
                {isUnlocked
                  ? "Direct verified coordinates for procurement and logistics leadership."
                  : "All contacts unlock together. Sourced from B2B identity databases & shipping manifests."}
              </p>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Status: {isUnlocked ? (
                <span className="text-emerald-600 font-semibold">● Active & Unlocked</span>
              ) : (
                <span className="text-amber-600 font-semibold">🔒 Locked Suite (5 Credits)</span>
              )}
            </div>
          </div>

          {/* Decision Makers Cards Grid - High Spacing & Clean Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {isUnlocked
                ? unlockedContacts.map((contact, index) => (
                    <motion.div
                      key={contact.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.06 }}
                      className="bg-white rounded-xl border border-[#eaeaea] hover:border-slate-300 transition-all p-6 shadow-xs flex flex-col justify-between"
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
                                <h5 className="text-base font-bold text-slate-900 tracking-tight">
                                  {contact.name}
                                </h5>
                                <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                              </div>
                              <span className="text-xs font-medium text-indigo-600">
                                {contact.role}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Department Badge */}
                        <div className="mb-5">
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 border border-[#eaeaea] px-2.5 py-0.5 rounded-md">
                            <Building2 className="h-3 w-3 text-slate-400" />
                            {contact.department}
                          </span>
                        </div>

                        {/* Contact Data Rows (Email, Phone, LinkedIn) */}
                        <div className="space-y-3 pt-1 border-t border-[#eaeaea]">
                          {/* Work Email Row */}
                          <div className="flex items-center justify-between text-xs py-1">
                            <div className="flex items-center gap-2 min-w-0 pr-2">
                              <div className="h-7 w-7 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                                <Mail className="h-3.5 w-3.5" />
                              </div>
                              <div className="truncate">
                                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                                  Direct Work Email
                                </span>
                                <a
                                  href={`mailto:${contact.email}`}
                                  className="font-mono text-slate-800 hover:text-indigo-600 truncate block font-medium"
                                >
                                  {contact.email}
                                </a>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopy(contact.email, `email-${contact.id}`)}
                              className="h-7 px-2 border-[#eaeaea] text-[11px] text-slate-600 hover:text-slate-900 bg-white flex-shrink-0"
                            >
                              {copiedKey === `email-${contact.id}` ? (
                                <>
                                  <Check className="h-3 w-3 mr-1 text-emerald-600" />
                                  <span className="text-emerald-600 font-medium">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3 mr-1 text-slate-400" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>

                          {/* Direct Phone Row */}
                          <div className="flex items-center justify-between text-xs py-1">
                            <div className="flex items-center gap-2 min-w-0 pr-2">
                              <div className="h-7 w-7 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                <Phone className="h-3.5 w-3.5" />
                              </div>
                              <div className="truncate">
                                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                                  Direct Line / Desk
                                </span>
                                <a
                                  href={`tel:${contact.phone}`}
                                  className="font-mono text-slate-800 hover:text-indigo-600 truncate block font-medium"
                                >
                                  {contact.phone}
                                </a>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopy(contact.phone, `phone-${contact.id}`)}
                              className="h-7 px-2 border-[#eaeaea] text-[11px] text-slate-600 hover:text-slate-900 bg-white flex-shrink-0"
                            >
                              {copiedKey === `phone-${contact.id}` ? (
                                <>
                                  <Check className="h-3 w-3 mr-1 text-emerald-600" />
                                  <span className="text-emerald-600 font-medium">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3 mr-1 text-slate-400" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>

                          {/* LinkedIn Profile */}
                          <div className="flex items-center justify-between text-xs py-1">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="h-7 w-7 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                                <ExternalLink className="h-3.5 w-3.5" />
                              </div>
                              <div>
                                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                                  Executive Network
                                </span>
                                <span className="text-slate-800 font-medium">
                                  Verified LinkedIn Profile
                                </span>
                              </div>
                            </div>
                            <a
                              href={contact.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 px-2.5 py-1 rounded-md transition-colors flex-shrink-0"
                            >
                              Connect
                              <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="mt-5 pt-3 border-t border-[#eaeaea] flex items-center justify-between text-[10px] text-slate-400">
                        <span className="flex items-center gap-1 text-emerald-600 font-medium">
                          <CheckCircle2 className="h-3 w-3" />
                          Verified Active Q3 2026
                        </span>
                        <span>Authority: Direct Sign-off</span>
                      </div>
                    </motion.div>
                  ))
                : maskedContacts.map((contact, index) => {
                    const singleData = singleUnlockedData[contact.id];
                    const isSingleUnlocked = Boolean(singleData);
                    const isCurrentlyUnlocking = unlockingContactId === contact.id;
                    const failedState = failedContactStates[contact.id];
                    const researchTicket = humanResearchTickets[contact.id];

                    if (isSingleUnlocked && singleData) {
                      return (
                        <motion.div
                          key={contact.id}
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25 }}
                          className="bg-white rounded-xl border-2 border-emerald-500/30 hover:border-emerald-500/50 transition-all p-6 shadow-xs flex flex-col justify-between"
                        >
                          <div>
                            {/* Profile Header (Unlocked) */}
                            <div className="flex items-start justify-between gap-3 mb-4">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white font-bold text-sm flex items-center justify-center shadow-xs flex-shrink-0">
                                  {singleData.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join("")}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <h5 className="text-base font-bold text-slate-900 tracking-tight">
                                      {singleData.name}
                                    </h5>
                                    <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                                  </div>
                                  <span className="text-xs font-medium text-emerald-600">
                                    {singleData.role}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                Unlocked (1 Credit)
                              </span>
                            </div>

                            {/* Department Badge */}
                            <div className="mb-5">
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 border border-[#eaeaea] px-2.5 py-0.5 rounded-md">
                                <Building2 className="h-3 w-3 text-slate-400" />
                                {singleData.department}
                              </span>
                            </div>

                            {/* Unmasked Data Rows */}
                            <div className="space-y-3 pt-1 border-t border-[#eaeaea]">
                              {/* Work Email Row */}
                              <div className="flex items-center justify-between text-xs py-1">
                                <div className="flex items-center gap-2 min-w-0 pr-2">
                                  <div className="h-7 w-7 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                    <Mail className="h-3.5 w-3.5" />
                                  </div>
                                  <div className="truncate">
                                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                                      Direct Work Email
                                    </span>
                                    <a
                                      href={`mailto:${singleData.email}`}
                                      className="font-mono text-slate-800 hover:text-emerald-700 truncate block font-medium"
                                    >
                                      {singleData.email}
                                    </a>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCopy(singleData.email, `email-${contact.id}`)}
                                  className="h-7 px-2 border-[#eaeaea] text-[11px] text-slate-600 hover:text-slate-900 bg-white flex-shrink-0"
                                >
                                  {copiedKey === `email-${contact.id}` ? (
                                    <>
                                      <Check className="h-3 w-3 mr-1 text-emerald-600" />
                                      <span className="text-emerald-600 font-medium">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3 w-3 mr-1 text-slate-400" />
                                      Copy
                                    </>
                                  )}
                                </Button>
                              </div>

                              {/* Direct Phone Row */}
                              <div className="flex items-center justify-between text-xs py-1">
                                <div className="flex items-center gap-2 min-w-0 pr-2">
                                  <div className="h-7 w-7 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                    <Phone className="h-3.5 w-3.5" />
                                  </div>
                                  <div className="truncate">
                                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                                      Direct Line / Desk
                                    </span>
                                    <a
                                      href={`tel:${singleData.phone}`}
                                      className="font-mono text-slate-800 hover:text-emerald-700 truncate block font-medium"
                                    >
                                      {singleData.phone}
                                    </a>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCopy(singleData.phone, `phone-${contact.id}`)}
                                  className="h-7 px-2 border-[#eaeaea] text-[11px] text-slate-600 hover:text-slate-900 bg-white flex-shrink-0"
                                >
                                  {copiedKey === `phone-${contact.id}` ? (
                                    <>
                                      <Check className="h-3 w-3 mr-1 text-emerald-600" />
                                      <span className="text-emerald-600 font-medium">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3 w-3 mr-1 text-slate-400" />
                                      Copy
                                    </>
                                  )}
                                </Button>
                              </div>

                              {/* LinkedIn Profile */}
                              <div className="flex items-center justify-between text-xs py-1">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="h-7 w-7 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                                      Executive Network
                                    </span>
                                    <span className="text-slate-800 font-medium">
                                      Verified LinkedIn Profile
                                    </span>
                                  </div>
                                </div>
                                <a
                                  href={singleData.linkedinUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-md transition-colors flex-shrink-0"
                                >
                                  Connect
                                  <ExternalLink className="h-2.5 w-2.5" />
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Card Footer */}
                          <div className="mt-5 pt-3 border-t border-[#eaeaea] flex items-center justify-between text-[10px] text-slate-400">
                            <span className="flex items-center gap-1 text-emerald-600 font-medium">
                              <CheckCircle2 className="h-3 w-3" />
                              Single Verified Lead
                            </span>
                            <span>Direct Procurement Contact</span>
                          </div>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.div
                        key={contact.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: index * 0.06 }}
                        className="bg-white rounded-xl border border-[#eaeaea] p-6 shadow-xs flex flex-col justify-between relative overflow-hidden"
                      >
                        <div>
                          {/* Profile Header (Masked) */}
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-xl bg-slate-100 border border-[#eaeaea] text-slate-400 font-bold text-sm flex items-center justify-center flex-shrink-0">
                                <Lock className="h-5 w-5 text-slate-400" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h5 className="text-base font-bold text-slate-800 font-mono tracking-tight select-none">
                                    {contact.maskedName}
                                  </h5>
                                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                                    Locked
                                  </span>
                                </div>
                                <span className="text-xs font-semibold text-slate-700 block mt-0.5">
                                  {contact.role}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Department Badge */}
                          <div className="mb-5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 border border-[#eaeaea] px-2.5 py-0.5 rounded-md">
                              <Building2 className="h-3 w-3 text-slate-400" />
                              {contact.department}
                            </span>
                          </div>

                          {/* Masked Data Rows */}
                          <div className="space-y-3 pt-1 border-t border-[#eaeaea]">
                            {/* Work Email Row */}
                            <div className="flex items-center justify-between text-xs py-1">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="h-7 w-7 rounded-md bg-slate-100 border border-[#eaeaea] flex items-center justify-center text-slate-400 flex-shrink-0">
                                  <Mail className="h-3.5 w-3.5" />
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                                    Direct Work Email
                                  </span>
                                  <span className="font-mono text-slate-400 select-none blur-[2.5px] hover:blur-none transition-all">
                                    {contact.maskedEmail}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-[#eaeaea]">
                                1 Credit
                              </span>
                            </div>

                            {/* Direct Phone Row */}
                            <div className="flex items-center justify-between text-xs py-1">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="h-7 w-7 rounded-md bg-slate-100 border border-[#eaeaea] flex items-center justify-center text-slate-400 flex-shrink-0">
                                  <Phone className="h-3.5 w-3.5" />
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                                    Direct Line / Desk
                                  </span>
                                  <span className="font-mono text-slate-400 select-none blur-[2.5px] hover:blur-none transition-all">
                                    {contact.maskedPhone}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-[#eaeaea]">
                                1 Credit
                              </span>
                            </div>

                            {/* LinkedIn Profile */}
                            <div className="flex items-center justify-between text-xs py-1">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="h-7 w-7 rounded-md bg-slate-100 border border-[#eaeaea] flex items-center justify-center text-slate-400 flex-shrink-0">
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                                    Executive Network
                                  </span>
                                  <span className="text-slate-400 text-xs">
                                    LinkedIn Profile
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-[#eaeaea]">
                                Locked
                              </span>
                            </div>
                          </div>

                          {/* Action Button / Graceful Failure State */}
                          <div className="mt-4 pt-3 border-t border-[#eaeaea]">
                            {failedState ? (
                              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950 space-y-2.5 text-xs">
                                <div className="flex items-start gap-2">
                                  <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                  <p className="leading-snug font-medium text-amber-900">
                                    We couldn't find a verified direct contact for this company. 0 Credits were deducted.
                                  </p>
                                </div>

                                {researchTicket ? (
                                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                                    <div>
                                      <span className="font-semibold block">Queued with Research Team</span>
                                      <span className="text-[10px] text-emerald-700 font-mono">
                                        Ticket #{researchTicket.ticketId} • 48hr turnaround
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-1.5 pt-1">
                                    <Button
                                      size="sm"
                                      onClick={() => handleRequestHumanResearch(contact.id, contact.role)}
                                      disabled={requestingHumanResearchId === contact.id}
                                      className="w-full h-8 text-[11px] font-semibold bg-amber-700 hover:bg-amber-800 text-white rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                                    >
                                      {requestingHumanResearchId === contact.id ? (
                                        <>
                                          <Loader2 className="h-3 w-3 animate-spin text-white" />
                                          <span>Submitting to Research Team...</span>
                                        </>
                                      ) : (
                                        <>
                                          <Search className="h-3 w-3 text-amber-200" />
                                          <span>Send to Human Research Team (Requires 3 Credits, 48hr turnaround)</span>
                                        </>
                                      )}
                                    </Button>

                                    <button
                                      onClick={() => handleUnlockSingle(contact.id)}
                                      className="w-full text-center text-[10px] text-slate-500 hover:text-slate-800 underline pt-0.5"
                                    >
                                      Try Waterfall Search Again
                                    </button>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => handleUnlockSingle(contact.id)}
                                disabled={isCurrentlyUnlocking}
                                className="w-full h-9 bg-slate-900 hover:bg-indigo-600 text-white font-medium text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-xs disabled:opacity-85"
                              >
                                {isCurrentlyUnlocking ? (
                                  <>
                                    <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-200" />
                                    <span>Searching global registries...</span>
                                  </>
                                ) : (
                                  <>
                                    <Coins className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                                    <span>Unlock Contact (1 Credit)</span>
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="mt-4 pt-3 border-t border-[#eaeaea] flex items-center justify-between text-[10px] text-slate-400">
                          <span className="flex items-center gap-1 text-slate-500 font-medium">
                            <Coins className="h-3 w-3 text-slate-400" />
                            1 Credit Per Lead
                          </span>
                          <span>Key Sourcing Contact</span>
                        </div>
                      </motion.div>
                    );
                  })}
            </AnimatePresence>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-4 sm:px-8 border-t border-[#eaeaea] bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sticky bottom-0 z-20">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Encrypted Trade Intelligence • All contacts cross-referenced with Bill of Lading consignee records.</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="h-8 border-[#eaeaea] text-xs font-normal"
            >
              Close
            </Button>

            {!isUnlocked && (
              <Button
                size="sm"
                onClick={handleUnlockAll}
                disabled={isUnlocking}
                className="h-8 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-4 shadow-sm flex items-center gap-1.5"
              >
                {isUnlocking ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Coins className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
                )}
                Unlock All (5 Credits)
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
