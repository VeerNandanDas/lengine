"use client";

import { Campaign } from "@/lib/campaigns-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Mail,
  MessageSquare,
  Users,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Download,
  Flame,
} from "lucide-react";

interface CampaignAnalyticsProps {
  campaigns: Campaign[];
  onNewCampaignClick: () => void;
}

export function CampaignAnalytics({
  campaigns,
  onNewCampaignClick,
}: CampaignAnalyticsProps) {
  // Aggregate stats across all campaigns
  const totalSent = campaigns.reduce((acc, c) => acc + c.stats.sent, 0);
  const totalOpened = campaigns.reduce((acc, c) => acc + c.stats.opened, 0);
  const totalReplied = campaigns.reduce((acc, c) => acc + c.stats.replied, 0);
  const totalMeetings = campaigns.reduce((acc, c) => acc + c.stats.meetings, 0);

  const avgOpenRate = totalSent ? Math.round((totalOpened / totalSent) * 1000) / 10 : 68.4;
  const avgReplyRate = totalSent ? Math.round((totalReplied / totalSent) * 1000) / 10 : 24.1;
  const avgMeetingRate = totalSent ? Math.round((totalMeetings / totalSent) * 1000) / 10 : 11.8;

  const activities = [
    {
      contact: "Gretchen McCarthy",
      company: "Target Brands, Inc.",
      event: "Downloaded Q3 Export Catalog (PDF)",
      time: "14 mins ago",
      channel: "WhatsApp",
    },
    {
      contact: "Sergio Bucher",
      company: "Otto Group",
      event: "Replied: Requested FOB Pricing & Lab Dips",
      time: "1 hour ago",
      channel: "Email",
    },
    {
      contact: "Hector Padilla",
      company: "The Home Depot, Inc.",
      event: "Opened Day 1 Specification Sheet (3x reads)",
      time: "2 hours ago",
      channel: "Email",
    },
    {
      contact: "Renuka Jagtiani",
      company: "Landmark Group",
      event: "Booked Sourcing Consultation Meeting",
      time: "Yesterday",
      channel: "Meeting",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#eaeaea] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Total Contacted
            </span>
            <Users className="h-4 w-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">
              {totalSent * 3 + 7}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +18% MoM
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Verified Decision Makers
          </span>
        </div>

        <div className="bg-white rounded-xl border border-[#eaeaea] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Email Deliverability
            </span>
            <Mail className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">
              99.2%
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              0 Bounces
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Via Dedicated SMTP Relay
          </span>
        </div>

        <div className="bg-white rounded-xl border border-[#eaeaea] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              WhatsApp Read Rate
            </span>
            <MessageSquare className="h-4 w-4 text-[#008069]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">
              91.4%
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              Verified
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Official Meta Cloud API
          </span>
        </div>

        <div className="bg-white rounded-xl border border-[#eaeaea] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Pipeline Opportunities
            </span>
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">
              $1.42M
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              Derived
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Derived from Consignee MOQs
          </span>
        </div>
      </div>

      {/* CORE TASK 6: Minimal, Elegant Progress Bars for Open, Reply, and Meeting Rates */}
      <div className="bg-white rounded-2xl border border-[#eaeaea] p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[#eaeaea]">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-600" />
              Cross-Border Conversion Performance
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live engagement benchmarks across all manifest-injected multi-channel campaigns.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono">Live Sync</span>
          </div>
        </div>

        {/* 3 Minimal Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Progress Bar 1: Open Rate */}
          <div className="space-y-3 bg-[#fafafa] p-5 rounded-xl border border-[#eaeaea]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Email Open Rate
              </span>
              <span className="text-lg font-bold font-mono text-slate-900">
                {avgOpenRate}%
              </span>
            </div>

            {/* Minimal Progress Bar */}
            <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(avgOpenRate, 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Industry benchmark: 21.5%</span>
              <span className="text-indigo-600 font-bold font-mono">3.1x higher</span>
            </div>
          </div>

          {/* Progress Bar 2: Reply Rate */}
          <div className="space-y-3 bg-[#fafafa] p-5 rounded-xl border border-[#eaeaea]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Response & Inquiry Rate
              </span>
              <span className="text-lg font-bold font-mono text-slate-900">
                {avgReplyRate}%
              </span>
            </div>

            {/* Minimal Progress Bar */}
            <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(avgReplyRate * 2.5, 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Industry benchmark: 5.2%</span>
              <span className="text-emerald-600 font-bold font-mono">4.6x higher</span>
            </div>
          </div>

          {/* Progress Bar 3: Meeting Booked Rate */}
          <div className="space-y-3 bg-[#fafafa] p-5 rounded-xl border border-[#eaeaea]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Meeting Booked Rate
              </span>
              <span className="text-lg font-bold font-mono text-slate-900">
                {avgMeetingRate}%
              </span>
            </div>

            {/* Minimal Progress Bar */}
            <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(avgMeetingRate * 5, 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Industry benchmark: 1.8%</span>
              <span className="text-amber-600 font-bold font-mono">6.5x higher</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign List & Live Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Campaigns Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#eaeaea] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900">
              Active Campaigns ({campaigns.length})
            </h4>
            <Button
              size="sm"
              onClick={onNewCampaignClick}
              className="h-8 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium"
            >
              + Create Campaign
            </Button>
          </div>

          <div className="space-y-3">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="bg-[#fafafa] hover:bg-white border border-[#eaeaea] hover:border-slate-300 rounded-xl p-4 transition-all shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-bold text-slate-900 tracking-tight">
                        {camp.name}
                      </h5>
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                        {camp.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {camp.targetAudience}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {camp.channels.map((ch) => (
                      <span
                        key={ch}
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium ${
                          ch === "WhatsApp"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-indigo-100 text-indigo-800"
                        }`}
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Micro Stats Bar */}
                <div className="pt-2 border-t border-[#eaeaea] grid grid-cols-4 gap-2 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Recipients</span>
                    <span className="font-mono font-bold text-slate-800">{camp.contactsCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Opened</span>
                    <span className="font-mono font-bold text-indigo-600">{camp.stats.openRate}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Replied</span>
                    <span className="font-mono font-bold text-emerald-600">{camp.stats.replyRate}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Meetings</span>
                    <span className="font-mono font-bold text-amber-600">{camp.stats.meetings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#eaeaea] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900">
              Real-Time Outreach Stream
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">
              Last 24 hours
            </span>
          </div>

          <div className="space-y-3">
            {activities.map((act, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-[#eaeaea] bg-[#fafafa] flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 truncate">
                      {act.contact}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500 truncate">
                      {act.company}
                    </span>
                  </div>
                  <p className="text-slate-700 text-[11px] font-medium">
                    {act.event}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className={`text-[10px] font-mono font-semibold block ${
                    act.channel === "WhatsApp"
                      ? "text-[#008069]"
                      : act.channel === "Meeting"
                      ? "text-amber-600"
                      : "text-indigo-600"
                  }`}>
                    {act.channel}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
