"use client";

import { Quote, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-[#fafafa] dark:bg-[#0a0a0c] border-t border-[#eaeaea] dark:border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge
            variant="secondary"
            className="bg-white dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] text-slate-700 dark:text-slate-300 text-xs font-normal mb-3"
          >
            Verified Track Record
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Trusted by institutional exporters and global trading desks
          </h2>
          <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400">
            How leading trade enterprises use Lengine to negotiate freight, unlock active consignees, and optimize cross-border margins.
          </p>
        </div>

        {/* Split Grid: Metrics + Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Big Stat Card 1 */}
          <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-mono text-slate-400 dark:text-slate-500">
                Sourcing Acceleration
              </span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  3.4x
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                  Velocity
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Faster qualification of active overseas consignees by replacing cold outreach with verified customs manifests and derived MOQs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#eaeaea] dark:border-[#27272a] text-xs text-slate-400 dark:text-slate-500">
              Benchmark across 420+ institutional export teams
            </div>
          </div>

          {/* Testimonial Card 1 */}
          <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <Quote className="h-6 w-6 text-indigo-400 mb-4 opacity-50" />
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                &ldquo;Having single-source access to raw Bill of Lading records and derived buyer MOQs eliminated three months of blind outbound. We secured two verified US distributors in our first week on Lengine.&rdquo;
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#eaeaea] dark:border-[#27272a] flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-950 border border-[#eaeaea] dark:border-indigo-800/40 flex items-center justify-center text-xs font-semibold text-indigo-700 dark:text-indigo-300 flex-shrink-0">
                MV
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">Marcus Vance</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  VP Global Sourcing, Meridian Trade Group
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial Card 2 */}
          <div className="bg-white dark:bg-[#0f0f12] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <Quote className="h-6 w-6 text-indigo-400 mb-4 opacity-50" />
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                &ldquo;The corridor-level tariff scheduling and TEU volume tracking gave our trading desk unprecedented clarity on shipping margins. It is essentially Bloomberg for maritime commerce.&rdquo;
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#eaeaea] dark:border-[#27272a] flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a] flex items-center justify-center text-xs font-semibold text-slate-700 dark:text-slate-300 flex-shrink-0">
                ER
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">Elena Rostova</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Head of Supply Chain, Pacific Retail Holdings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
