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

  useEffect(() => {
    setCredits(getDemoCredits());
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

  const handleUnlockAll = async () => {
    const currentCredits = getDemoCredits();
    if (currentCredits < 5) {
      setError("Insufficient credits (5 needed).");
      return;
    }

    setIsUnlocking(true);
    setError(null);

    try {
      const result = await unlockAllContacts(buyerId);
      if (result.success && result.contacts) {
        const newBalance = currentCredits - 5;
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

  return (
    <div className="space-y-4">
      {/* Header with 5-Credit Unlock Action */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <h4 className="text-sm font-bold text-white">Executive Decision Makers</h4>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-400/30 text-[10px]">
                5 Credits Full Suite
              </Badge>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Direct emails, phone numbers, and LinkedIn contacts for key procurement officers.
            </p>
          </div>

          <div>
            {!isUnlocked ? (
              <Button
                size="sm"
                onClick={handleUnlockAll}
                disabled={isUnlocking}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 h-9 shadow-md flex items-center gap-1.5"
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
                <span>Unlocked ({unlockedContacts.length} Contacts)</span>
              </div>
            )}
          </div>
        </div>

        {error && <p className="text-rose-400 text-xs mt-2">{error}</p>}
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
          : maskedContacts.map((contact) => (
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
                      <span className="text-[10px] text-slate-400">Locked</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" />
                        <span className="font-mono blur-[2px]">{contact.maskedPhone}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Locked</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
