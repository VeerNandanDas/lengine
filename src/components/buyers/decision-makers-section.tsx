"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  Mail,
  Phone,
  ExternalLink,
  ShieldCheck,
  Coins,
  Loader2,
  Sparkles,
  Check,
  Copy,
  Building2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  PlusCircle,
} from "lucide-react";

const DEMO_CREDITS_KEY = "lengine_demo_credits";
const DEMO_UNLOCKS_KEY = "lengine_demo_unlocks";
const DEMO_SINGLE_UNLOCKS_KEY = "lengine_demo_single_unlocks";

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

function getStoredSingleUnlocks(): Record<string, UnlockedDecisionMaker> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(DEMO_SINGLE_UNLOCKS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveStoredSingleUnlock(contact: UnlockedDecisionMaker): void {
  if (typeof window === "undefined") return;
  const existing = getStoredSingleUnlocks();
  existing[contact.id] = contact;
  localStorage.setItem(DEMO_SINGLE_UNLOCKS_KEY, JSON.stringify(existing));
}

interface DecisionMakersSectionProps {
  buyerId: string;
}

export function DecisionMakersSection({ buyerId }: DecisionMakersSectionProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockedContacts, setUnlockedContacts] = useState<UnlockedDecisionMaker[]>([]);
  const [maskedContacts, setMaskedContacts] = useState<MaskedDecisionMaker[]>([]);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [credits, setCredits] = useState(15);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Single Contact Unlock & Waterfall Flow State
  const [singleUnlockedData, setSingleUnlockedData] = useState<Record<string, UnlockedDecisionMaker>>({});
  const [unlockingContactId, setUnlockingContactId] = useState<string | null>(null);
  const [failedContactStates, setFailedContactStates] = useState<Record<string, boolean>>({});
  const [humanResearchTickets, setHumanResearchTickets] = useState<Record<string, { ticketId: string; role: string }>>({});
  const [requestingHumanResearchId, setRequestingHumanResearchId] = useState<string | null>(null);
  const [simulateFailure, setSimulateFailure] = useState(false);

  useEffect(() => {
    setCredits(getDemoCredits());
    setSingleUnlockedData(getStoredSingleUnlocks());
    const masked = getMaskedContacts(buyerId);
    setMaskedContacts(masked);

    const unlocked = getDemoUnlockedBuyers();
    if (unlocked.has(buyerId)) {
      setIsUnlocked(true);
      unlockAllContacts(buyerId).then((res) => {
        if (res.success && res.contacts) {
          setUnlockedContacts(res.contacts);
        }
      });
    } else {
      setIsUnlocked(false);
      setUnlockedContacts([]);
    }
  }, [buyerId]);

  const handleCopy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }, []);

  const handleAddCredits = () => {
    const newBal = credits + 15;
    setDemoCredits(newBal);
    setCredits(newBal);
  };

  // Full Suite Unlock (5 credits)
  const handleUnlockAll = async () => {
    const currentCredits = getDemoCredits();
    if (currentCredits < 5) {
      setError("Insufficient credits (5 needed). Click '+15 Credits' to top up.");
      return;
    }

    setIsUnlocking(true);
    setError(null);

    try {
      const result = await unlockAllContacts(buyerId);
      if (result.success && result.contacts) {
        const newBalance = Math.max(0, currentCredits - 5);
        setDemoCredits(newBalance);
        setCredits(newBalance);
        addDemoUnlockedBuyer(buyerId);
        setUnlockedContacts(result.contacts);
        setIsUnlocked(true);
      } else {
        setError(result.error || "Failed to unlock.");
      }
    } catch {
      setError("Failed to unlock.");
    } finally {
      setIsUnlocking(false);
    }
  };

  // Single Contact Unlock (1 Credit Waterfall Route)
  const handleUnlockSingle = async (contactId: string) => {
    const currentCredits = getDemoCredits();
    if (currentCredits < 1) {
      setError("You need at least 1 credit to unlock a direct contact. Click '+15 Credits' to top up.");
      return;
    }

    setError(null);
    setUnlockingContactId(contactId);

    // Reset failure state if previously failed
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
          buyerId,
          contactId,
          userCredits: currentCredits,
          simulateFailure,
        }),
      });

      const data = await res.json();

      if (data.status === "deducted" && data.contact) {
        // Scenario A: Success
        const newBalance = data.remainingCredits ?? Math.max(0, currentCredits - 1);
        setDemoCredits(newBalance);
        setCredits(newBalance);
        saveStoredSingleUnlock(data.contact);
        setSingleUnlockedData((prev) => ({ ...prev, [contactId]: data.contact }));
      } else if (data.status === "refunded" || data.refunded) {
        // Scenario B: Fallback triggered (0 credits deducted)
        const refundedBalance = data.remainingCredits ?? currentCredits;
        setDemoCredits(refundedBalance);
        setCredits(refundedBalance);
        setFailedContactStates((prev) => ({ ...prev, [contactId]: true }));
      } else {
        setError(data.error || "Could not unlock contact. Please try again.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error querying data registries.";
      setError(message);
    } finally {
      setUnlockingContactId(null);
    }
  };

  // Fallback: Send to Human Research Team (3 Credits)
  const handleRequestHumanResearch = async (contactId: string, role: string) => {
    const currentCredits = getDemoCredits();
    if (currentCredits < 3) {
      setError("Human research team inquiry requires 3 credits. Click '+15 Credits' to top up.");
      return;
    }

    setRequestingHumanResearchId(contactId);
    setError(null);

    try {
      const res = await fetch("/api/contacts/human-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerId,
          contactId,
          role,
          userCredits: currentCredits,
        }),
      });

      const data = await res.json();

      if (data.success) {
        const newBalance = data.remainingCredits ?? Math.max(0, currentCredits - 3);
        setDemoCredits(newBalance);
        setCredits(newBalance);
        setHumanResearchTickets((prev) => ({
          ...prev,
          [contactId]: { ticketId: data.ticketId, role },
        }));
      } else {
        setError(data.error || "Failed to submit human research inquiry.");
      }
    } catch {
      setError("Failed to reach research ticketing system.");
    } finally {
      setRequestingHumanResearchId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with 5-Credit Unlock Action & Controls */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <h4 className="text-sm font-bold text-white">Executive Decision Makers</h4>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-400/30 text-[10px]">
                1 Credit Single • 5 Credits Full Suite
              </Badge>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Direct emails, phone numbers, and LinkedIn contacts for key procurement officers.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Credit Balance Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
              <Coins className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span className="font-mono font-bold text-white">{credits}</span>
              <span className="text-amber-200/80">Credits</span>
            </div>

            {!isUnlocked ? (
              <Button
                size="sm"
                onClick={handleUnlockAll}
                disabled={isUnlocking}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 h-8 shadow-md flex items-center gap-1.5"
              >
                {isUnlocking ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Coins className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
                )}
                Unlock All ({maskedContacts.length}) for 5 Credits
              </Button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="h-4 w-4" />
                <span>Suite Unlocked ({unlockedContacts.length})</span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-3 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
            <span>{error}</span>
            {error.includes("credit") && (
              <button onClick={handleAddCredits} className="underline text-rose-200 ml-2 font-medium">
                Add 15 credits
              </button>
            )}
          </div>
        )}
      </div>

      {/* Grid of Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isUnlocked
          ? unlockedContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-xl border border-[#eaeaea] p-4 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {contact.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-slate-900">{contact.name}</span>
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      </div>
                      <span className="text-xs text-indigo-600 font-medium block">
                        {contact.role}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded w-fit mb-3">
                    {contact.department}
                  </div>

                  <div className="space-y-2 text-xs pt-2 border-t border-[#eaeaea]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-700 truncate pr-2">
                        <Mail className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                        <span className="font-mono truncate">{contact.email}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(contact.email, `e-${contact.id}`)}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800"
                      >
                        {copiedKey === `e-${contact.id}` ? "Copied" : "Copy"}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-700 truncate pr-2">
                        <Phone className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                        <span className="font-mono truncate">{contact.phone}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(contact.phone, `p-${contact.id}`)}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800"
                      >
                        {copiedKey === `p-${contact.id}` ? "Copied" : "Copy"}
                      </button>
                    </div>

                    <div className="pt-1">
                      <a
                        href={contact.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        <span>LinkedIn Profile</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : maskedContacts.map((contact) => {
              const singleData = singleUnlockedData[contact.id];
              const isSingleUnlocked = Boolean(singleData);
              const isCurrentlyUnlocking = unlockingContactId === contact.id;
              const failedState = failedContactStates[contact.id];
              const researchTicket = humanResearchTickets[contact.id];

              if (isSingleUnlocked && singleData) {
                return (
                  <div
                    key={contact.id}
                    className="bg-white rounded-xl border-2 border-emerald-500/30 p-4 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="h-9 w-9 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                            {singleData.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-bold text-slate-900">{singleData.name}</span>
                              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                            </div>
                            <span className="text-xs text-emerald-600 font-medium block">
                              {singleData.role}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-medium">
                          1 Credit Unlocked
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded w-fit mb-3">
                        {singleData.department}
                      </div>

                      <div className="space-y-2 text-xs pt-2 border-t border-[#eaeaea]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-slate-700 truncate pr-2">
                            <Mail className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                            <span className="font-mono truncate">{singleData.email}</span>
                          </div>
                          <button
                            onClick={() => handleCopy(singleData.email, `e-${contact.id}`)}
                            className="text-[11px] text-emerald-700 hover:text-emerald-900 font-medium"
                          >
                            {copiedKey === `e-${contact.id}` ? "Copied" : "Copy"}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-slate-700 truncate pr-2">
                            <Phone className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                            <span className="font-mono truncate">{singleData.phone}</span>
                          </div>
                          <button
                            onClick={() => handleCopy(singleData.phone, `p-${contact.id}`)}
                            className="text-[11px] text-emerald-700 hover:text-emerald-900 font-medium"
                          >
                            {copiedKey === `p-${contact.id}` ? "Copied" : "Copy"}
                          </button>
                        </div>

                        <div className="pt-1">
                          <a
                            href={singleData.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-emerald-700 hover:text-emerald-900 font-medium"
                          >
                            <span>LinkedIn Profile</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={contact.id}
                  className="bg-white rounded-xl border border-[#eaeaea] p-4 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="h-9 w-9 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center flex-shrink-0">
                        <Lock className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-800 font-mono">
                          {contact.maskedName}
                        </span>
                        <span className="text-xs text-slate-600 block">
                          {contact.role}
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded w-fit mb-3">
                      {contact.department}
                    </div>

                    <div className="space-y-2 text-xs pt-2 border-t border-[#eaeaea]">
                      <div className="flex items-center justify-between text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="font-mono blur-[2px]">{contact.maskedEmail}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">1 Credit</span>
                      </div>

                      <div className="flex items-center justify-between text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          <span className="font-mono blur-[2px]">{contact.maskedPhone}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">1 Credit</span>
                      </div>
                    </div>

                    {/* Action Section */}
                    <div className="mt-3 pt-2.5 border-t border-[#eaeaea]">
                      {failedState ? (
                        <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 text-amber-950 space-y-2 text-xs">
                          <div className="flex items-start gap-1.5">
                            <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <p className="leading-tight font-medium text-amber-900 text-[11px]">
                              We couldn't find a verified direct contact for this company. 0 Credits were deducted.
                            </p>
                          </div>

                          {researchTicket ? (
                            <div className="p-1.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] flex items-center gap-1.5">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                              <span>Queued: Ticket #{researchTicket.ticketId} (48hr turnaround)</span>
                            </div>
                          ) : (
                            <div className="space-y-1 pt-0.5">
                              <Button
                                size="sm"
                                onClick={() => handleRequestHumanResearch(contact.id, contact.role)}
                                disabled={requestingHumanResearchId === contact.id}
                                className="w-full h-7 text-[10px] font-semibold bg-amber-700 hover:bg-amber-800 text-white rounded flex items-center justify-center gap-1 shadow-xs"
                              >
                                {requestingHumanResearchId === contact.id ? (
                                  <>
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                    <span>Submitting...</span>
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
                                className="w-full text-center text-[10px] text-slate-500 hover:text-slate-800 underline"
                              >
                                Try Search Again
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleUnlockSingle(contact.id)}
                          disabled={isCurrentlyUnlocking}
                          className="w-full h-8 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-medium rounded flex items-center justify-center gap-1.5 shadow-xs transition-all disabled:opacity-85"
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
                </div>
              );
            })}
      </div>
    </div>
  );
}
