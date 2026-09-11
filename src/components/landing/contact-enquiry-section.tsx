"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle2,
  Building2,
  Mail,
  User,
  MessageSquare,
  Globe2,
  ShieldCheck,
  Clock,
  ArrowRight,
  Handshake,
  Sparkles,
} from "lucide-react";

export function ContactEnquirySection() {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    tradeScale: "50-200 TEUs / mo",
    commodity: "Agricultural & Foodstuffs",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate enterprise dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const randomRef = "LENG-" + Math.floor(100000 + Math.random() * 900000);
      setReferenceId(randomRef);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      workEmail: "",
      companyName: "",
      tradeScale: "50-200 TEUs / mo",
      commodity: "Agricultural & Foodstuffs",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="py-24 bg-white dark:bg-[#09090b] border-t border-[#eaeaea] dark:border-[#27272a] relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-100/30 dark:bg-indigo-950/20 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context, SLA & Telemetry */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Institutional Trade Desk</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Get in touch with our trade intelligence desk
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Whether you are looking to ingest sovereign customs telemetry, configure high-volume maritime API feeds, or negotiate freight using active consignee records, our trade specialists are available for bespoke enterprise onboarding.
            </p>

            {/* Feature Highlights Grid */}
            <div className="pt-4 space-y-4">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-[#121215] border border-[#eaeaea] dark:border-[#27272a]">
                <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
                    Rapid Institutional SLA
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Direct reply from our trade intelligence engineers within 2 hours during market hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-[#121215] border border-[#eaeaea] dark:border-[#27272a]">
                <Globe2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
                    85+ Sovereign Customs Pipelines
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Direct access to US CBP, India DGFT, Pan-European NCTS, and Mercosur bilateral registers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-[#121215] border border-[#eaeaea] dark:border-[#27272a]">
                <ShieldCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
                    Enterprise Data Security & NDA
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    All outbound queries and corridor lookups remain strictly isolated and confidential.
                  </p>
                </div>
              </div>
            </div>

            {/* Official Partner Badge */}
            <div className="pt-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-900/40 text-xs">
                <Handshake className="h-4 w-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">
                  Technical Partner: <strong className="text-slate-900 dark:text-white">Panora Exports Ltd</strong> (Institutional Maritime Forwarding)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#0e0e11] rounded-2xl border border-[#eaeaea] dark:border-[#27272a] shadow-xl p-6 sm:p-8">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-5 animate-in fade-in-50 duration-300">
                  <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Enquiry Received
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                      Thank you. Your institutional enquiry has been logged with reference ID{" "}
                      <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                        {referenceId}
                      </span>
                      . A trade engineer will contact you shortly.
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-[#eaeaea] dark:border-[#27272a] bg-slate-50 dark:bg-[#18181b] text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-[#222226] transition-colors"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-[#eaeaea] dark:border-[#27272a] pb-4 mb-5">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      Institutional Trade Desk Enquiry
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Fill out the fields below for priority access, customized telemetry, or API documentation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Elena Rostova"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full h-10 px-3 rounded-lg border border-[#eaeaea] dark:border-[#27272a] bg-[#fafafa] dark:bg-[#18181b] text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {/* Corporate Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        Work / Corporate Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="elena@commoditydesk.com"
                        value={formData.workEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, workEmail: e.target.value })
                        }
                        className="w-full h-10 px-3 rounded-lg border border-[#eaeaea] dark:border-[#27272a] bg-[#fafafa] dark:bg-[#18181b] text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company / Entity */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-slate-400" />
                        Company / Trade Entity
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Baltic Forwarding S.A."
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        className="w-full h-10 px-3 rounded-lg border border-[#eaeaea] dark:border-[#27272a] bg-[#fafafa] dark:bg-[#18181b] text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {/* Outbound Scale */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Monthly Freight / Outbound Scale
                      </label>
                      <select
                        value={formData.tradeScale}
                        onChange={(e) =>
                          setFormData({ ...formData, tradeScale: e.target.value })
                        }
                        className="w-full h-10 px-3 rounded-lg border border-[#eaeaea] dark:border-[#27272a] bg-[#fafafa] dark:bg-[#18181b] text-sm text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-indigo-500 transition-colors"
                      >
                        <option value="Under 50 TEUs / mo">Under 50 TEUs / mo</option>
                        <option value="50-200 TEUs / mo">50-200 TEUs / mo</option>
                        <option value="200-1,000 TEUs / mo">200-1,000 TEUs / mo</option>
                        <option value="1,000+ TEUs / mo (Enterprise)">1,000+ TEUs / mo (Enterprise Desk)</option>
                        <option value="Market Research / Analytics Only">Market Research / Analytics Only</option>
                      </select>
                    </div>
                  </div>

                  {/* Commodity / HS Section */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Primary Trade Sector / Commodity Focus
                    </label>
                    <select
                      value={formData.commodity}
                      onChange={(e) =>
                        setFormData({ ...formData, commodity: e.target.value })
                      }
                      className="w-full h-10 px-3 rounded-lg border border-[#eaeaea] dark:border-[#27272a] bg-[#fafafa] dark:bg-[#18181b] text-sm text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-indigo-500 transition-colors"
                    >
                      <option value="Agricultural & Foodstuffs">Agricultural &amp; Foodstuffs (HS Ch. 01–24)</option>
                      <option value="Mineral & Energy Products">Mineral, Fuels &amp; Energy (HS Ch. 25–27)</option>
                      <option value="Chemicals & Pharmaceuticals">Chemicals &amp; Allied Industries (HS Ch. 28–38)</option>
                      <option value="Base Metals & Metallurgical">Base Metals &amp; Metallurgy (HS Ch. 72–83)</option>
                      <option value="Machinery & Electrical Equipment">Machinery &amp; Electronics (HS Ch. 84–85)</option>
                      <option value="Automotive & Transport">Automotive &amp; Transport Equipment (HS Ch. 86–89)</option>
                      <option value="Multi-Commodity Forwarder">Multi-Commodity / Freight Forwarding</option>
                    </select>
                  </div>

                  {/* Message / Requirements */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                      Specific Requirements or Target Corridors
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. We require verified US buyer manifests for HS 0901 with monthly consignee volumes and contact data."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full p-3 rounded-lg border border-[#eaeaea] dark:border-[#27272a] bg-[#fafafa] dark:bg-[#18181b] text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-200 disabled:opacity-60 shadow-sm transition-colors"
                    >
                      {isSubmitting ? (
                        <span>Logging Institutional Request...</span>
                      ) : (
                        <>
                          <span>Submit Trade Desk Enquiry</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-2.5">
                      Confidential under standard trade desk NDA. No promotional spam.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
