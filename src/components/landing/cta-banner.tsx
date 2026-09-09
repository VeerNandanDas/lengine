"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="py-20 bg-white border-t border-[#eaeaea]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#fafafa] rounded-2xl border border-[#eaeaea] p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle Ambient Aura */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold block mb-3">
              Institutional Access
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Ready to modernize your cross-border trade operations?
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Join leading global exporters, freight forwarders, and trade desks analyzing macroeconomic freight flows and verified foreign consignees with Lengine.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center h-11 px-6 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
              >
                Launch Lengine Terminal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center h-11 px-6 border border-[#eaeaea] bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors"
              >
                Sign In to Existing Account
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                No setup fee
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-indigo-600" />
                Instant terminal access
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
