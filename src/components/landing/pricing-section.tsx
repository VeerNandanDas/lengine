"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, HelpCircle, ShieldCheck, Zap, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Analyst",
    badge: null,
    popular: false,
    monthlyPrice: 149,
    annualPrice: 119,
    description: "For independent trade researchers, market analysts, and boutique sourcing agencies.",
    features: [
      "1,000 HS Code lookups / month",
      "Full macro trade flow trajectories (3-Year depth)",
      "Standard maritime consignee directory",
      "Basic Incoterm & MOQ extraction",
      "Bill of Lading manifest previews (up to 200/mo)",
      "Standard CSV data export",
      "Single analyst seat",
      "Standard email support (24h turnaround)",
    ],
    cta: "Start 14-Day Free Trial",
    href: "/login",
  },
  {
    name: "Trade Desk",
    badge: "Institutional Standard",
    popular: true,
    monthlyPrice: 499,
    annualPrice: 399,
    description: "For active export-import houses, freight forwarders, and commercial commodity desks.",
    features: [
      "Unlimited HS Code telemetry & corridor lookups",
      "Full 3-Year TEU historical volume trends & YoY deltas",
      "Complete Maritime Buyer Directory with Side-Drawer drilldown",
      "Raw Bill of Lading inspection (carrier, vessel, weight, ports)",
      "Granular filters: Destination Country, MOQ range, Incoterms",
      "Automated counterparty compliance badges (ISO, OEKO-TEX)",
      "Up to 5 analyst seats with team workspace",
      "Priority SLA support with dedicated Trade Data Specialist",
      "Daily manifest update alerts & corridor notifications",
    ],
    cta: "Deploy Trade Desk",
    href: "/login",
  },
  {
    name: "Enterprise & Sovereign",
    badge: "Custom Integration",
    popular: false,
    monthlyPrice: 1299,
    annualPrice: 999,
    description: "For multinational trading corporations, institutional banks, and sovereign trade agencies.",
    features: [
      "Everything in Trade Desk without limits",
      "Direct Data Warehouse sync (Snowflake, BigQuery, AWS S3)",
      "High-throughput REST & GraphQL API access (100k+ req/day)",
      "Real-time Webhook notifications on custom Bill of Lading filings",
      "Sanctions screening & OFAC/EU watch list automation",
      "Custom HS Code derivation & proprietary ML training models",
      "Unlimited analyst seats with SSO & SCIM directory sync",
      "Dedicated Enterprise Account Director & 99.99% uptime SLA",
    ],
    cta: "Contact Sovereign Desk",
    href: "/login",
  },
];

const faqs = [
  {
    q: "How frequently is the customs manifest data updated?",
    a: "Our data ingestion pipeline synchronizes daily with over 140 sovereign customs authorities, port authorities, and maritime carrier EDIs at 02:00 UTC. New Bills of Lading typically appear within 24 to 48 hours of vessel discharge.",
  },
  {
    q: "Can we export the shipment and buyer data into our internal ERP or CRM?",
    a: "Yes. All plans support one-click CSV and Excel exports. The Trade Desk and Enterprise tiers also provide structured API endpoints and direct cloud data warehouse integration (Snowflake, BigQuery).",
  },
  {
    q: "How are the derived MOQs and Incoterms calculated?",
    a: "Our entity resolution engine computes derived Minimum Order Quantities from historical declared gross weights and container counts over a rolling 24-month horizon. Incoterms (FOB, CIF, CFR, etc.) are extracted and validated against official commercial manifests.",
  },
  {
    q: "Is there a long-term contract requirement?",
    a: "No. Monthly plans can be canceled anytime with zero penalties. Annual contracts provide a 20% discount and include locked-in seat guarantees and priority onboarding.",
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-white border-t border-[#eaeaea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-700 text-xs font-normal mb-3"
          >
            Institutional Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
            Transparent plans for high-velocity trade desks
          </h2>
          <p className="mt-3 text-base text-slate-500">
            Access institutional-grade customs manifests, verified buyer directories, and predictive trade corridor telemetry. No hidden fees or arbitrary seat markups.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-full border border-[#eaeaea] bg-[#fafafa]">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                !isAnnual
                  ? "bg-white text-slate-900 shadow-xs border border-[#eaeaea]"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                isAnnual
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded-full bg-emerald-500 text-white">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-2xl p-8 transition-all ${
                  plan.popular
                    ? "bg-[#fafafa] border-2 border-slate-900 shadow-sm"
                    : "bg-white border border-[#eaeaea] hover:border-slate-300"
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-semibold px-3 py-0.5 rounded-full tracking-wider uppercase">
                    Institutional Standard
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                    {plan.badge && !plan.popular && (
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-[#eaeaea]">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 min-h-[36px] leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold font-mono text-slate-900 tracking-tight">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      / month {isAnnual ? "(billed annually)" : ""}
                    </span>
                  </div>

                  <hr className="my-6 border-[#eaeaea]" />

                  {/* Feature List */}
                  <div className="space-y-3 text-xs text-slate-700">
                    <p className="font-semibold text-slate-900 uppercase tracking-wider text-[10px]">
                      Plan Includes:
                    </p>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 leading-snug">
                        <Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-4">
                  <Link
                    href={plan.href}
                    className={`w-full py-2.5 px-4 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-xs ${
                      plan.popular
                        ? "bg-slate-900 hover:bg-slate-800 text-white"
                        : "bg-white hover:bg-slate-50 text-slate-900 border border-[#eaeaea]"
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    14-day full access &bull; No credit card required
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Compliance Badges */}
        <div className="mt-16 p-6 rounded-xl border border-[#eaeaea] bg-[#fafafa] flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-white border border-[#eaeaea] flex items-center justify-center text-emerald-600 shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">
                Institutional Security & Compliance
              </h4>
              <p className="text-xs text-slate-500">
                Enterprise data encryption at rest (AES-256) and in transit (TLS 1.3). SOC 2 Type II and GDPR compliant.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
            <span className="px-2 py-1 rounded bg-white border border-[#eaeaea]">SOC 2 TYPE II</span>
            <span className="px-2 py-1 rounded bg-white border border-[#eaeaea]">ISO 27001</span>
            <span className="px-2 py-1 rounded bg-white border border-[#eaeaea]">99.99% SLA</span>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold text-slate-900">Frequently Asked Questions</h3>
            <p className="mt-2 text-xs text-slate-500">
              Clear answers regarding data sources, refresh rates, and enterprise integrations.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-[#eaeaea] bg-[#fafafa] hover:border-slate-300 transition-all"
              >
                <div className="text-sm font-semibold text-slate-900 mb-1.5 flex items-start gap-2">
                  <span className="text-indigo-600 font-mono text-xs mt-0.5">0{i + 1}.</span>
                  {faq.q}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
