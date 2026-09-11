"use client";

import { Campaign } from "@/lib/campaigns-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Mail,
  MessageSquare,
  Users,
  ArrowUpRight,
  Flame,
  Megaphone,
  Inbox,
  Plus,
} from "lucide-react";

interface CampaignAnalyticsProps {
  campaigns: Campaign[];
  onNewCampaignClick: () => void;
}

export function CampaignAnalytics({
  campaigns,
  onNewCampaignClick,
}: CampaignAnalyticsProps) {
  // Aggregate stats strictly computed from active user campaigns
  const totalSent = campaigns.reduce((acc, c) => acc + c.stats.sent, 0);
  const totalOpened = campaigns.reduce((acc, c) => acc + c.stats.opened, 0);
  const totalReplied = campaigns.reduce((acc, c) => acc + c.stats.replied, 0);
  const totalMeetings = campaigns.reduce((acc, c) => acc + c.stats.meetings, 0);

  const avgOpenRate = totalSent ? Math.round((totalOpened / totalSent) * 1000) / 10 : 0;
  const avgReplyRate = totalSent ? Math.round((totalReplied / totalSent) * 1000) / 10 : 0;
  const avgMeetingRate = totalSent ? Math.round((totalMeetings / totalSent) * 1000) / 10 : 0;

  // Build stream from real active campaigns if any exist
  const activities = campaigns.flatMap((camp) => [
    {
      contact: camp.targetAudience,
      company: camp.name,
      event: `Dispatched multi-channel sequence (${camp.contactsCount} verified contacts)`,
      time: camp.createdAt,
      channel: camp.channels[0] || "Email",
    },
  ]);

  const hasCampaigns = campaigns.length > 0;

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#121215] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Total Contacted
            </span>
            <Users className="h-4 w-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
              {totalSent}
            </span>
            {totalSent > 0 && (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight className="h-3.5 w-3.5" />
                Active
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Verified Decision Makers
          </span>
        </div>

        <div className="bg-white dark:bg-[#121215] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Email Relay
            </span>
            <Mail className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
              {hasCampaigns ? "100%" : "Connected"}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              Operational
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Dedicated SMTP & DKIM
          </span>
        </div>

        <div className="bg-white dark:bg-[#121215] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              WhatsApp Channel
            </span>
            <MessageSquare className="h-4 w-4 text-[#008069]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
              {hasCampaigns ? "Active" : "Ready"}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              Meta Cloud API
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Direct Mobile Dispatch
          </span>
        </div>

        <div className="bg-white dark:bg-[#121215] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Pipeline Opportunities
            </span>
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
              {totalMeetings > 0 ? `${totalMeetings} Meetings` : "$0.00"}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Derived
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            From Consignee Sourcing MOQs
          </span>
        </div>
      </div>

      {/* Conversion Benchmarks Card */}
      <div className="bg-white dark:bg-[#121215] rounded-2xl border border-[#eaeaea] dark:border-[#27272a] p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[#eaeaea] dark:border-[#27272a]">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              Cross-Border Conversion Performance
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live engagement metrics computed across your deployed multi-channel outreach campaigns.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className={`h-2 w-2 rounded-full ${hasCampaigns ? "bg-emerald-500 animate-pulse" : "bg-slate-300 dark:bg-slate-600"}`} />
            <span className="font-mono">{hasCampaigns ? "Live Telemetry" : "Awaiting Campaigns"}</span>
          </div>
        </div>

        {/* 3 Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Progress Bar 1: Open Rate */}
          <div className="space-y-3 bg-[#fafafa] dark:bg-[#18181b] p-5 rounded-xl border border-[#eaeaea] dark:border-[#27272a]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Email Open Rate
              </span>
              <span className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100">
                {avgOpenRate}%
              </span>
            </div>

            <div className="h-2.5 w-full bg-slate-200 dark:bg-[#27272a] rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(avgOpenRate, 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-1">
              <span>Benchmark: 21.5%</span>
              <span className="font-mono text-slate-600 dark:text-slate-400">
                {hasCampaigns ? `${(avgOpenRate / 21.5).toFixed(1)}x baseline` : "No data"}
              </span>
            </div>
          </div>

          {/* Progress Bar 2: Reply Rate */}
          <div className="space-y-3 bg-[#fafafa] dark:bg-[#18181b] p-5 rounded-xl border border-[#eaeaea] dark:border-[#27272a]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Response & Inquiry Rate
              </span>
              <span className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100">
                {avgReplyRate}%
              </span>
            </div>

            <div className="h-2.5 w-full bg-slate-200 dark:bg-[#27272a] rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(avgReplyRate * 2.5, 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-1">
              <span>Benchmark: 5.2%</span>
              <span className="font-mono text-slate-600 dark:text-slate-400">
                {hasCampaigns ? `${(avgReplyRate / 5.2).toFixed(1)}x baseline` : "No data"}
              </span>
            </div>
          </div>

          {/* Progress Bar 3: Meeting Booked Rate */}
          <div className="space-y-3 bg-[#fafafa] dark:bg-[#18181b] p-5 rounded-xl border border-[#eaeaea] dark:border-[#27272a]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Meeting Booked Rate
              </span>
              <span className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100">
                {avgMeetingRate}%
              </span>
            </div>

            <div className="h-2.5 w-full bg-slate-200 dark:bg-[#27272a] rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(avgMeetingRate * 5, 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-1">
              <span>Benchmark: 1.8%</span>
              <span className="font-mono text-slate-600 dark:text-slate-400">
                {hasCampaigns ? `${(avgMeetingRate / 1.8).toFixed(1)}x baseline` : "No data"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign List & Live Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Campaigns List (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#121215] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Active Campaigns ({campaigns.length})
            </h4>
            <Button
              size="sm"
              onClick={onNewCampaignClick}
              className="h-8 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-medium"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Create Campaign
            </Button>
          </div>

          {campaigns.length === 0 ? (
            <div className="text-center py-10 px-4 border border-dashed border-[#eaeaea] dark:border-[#27272a] rounded-xl">
              <div className="h-10 w-10 mx-auto rounded-full bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
                <Megaphone className="h-5 w-5" />
              </div>
              <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                No Outreach Campaigns Launched
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                Select verified enterprise consignees and launch personalized multi-channel sequences with automated customs manifest tokens.
              </p>
              <Button
                size="sm"
                onClick={onNewCampaignClick}
                className="bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-medium"
              >
                + Create First Campaign
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="bg-[#fafafa] dark:bg-[#18181b] hover:bg-white dark:hover:bg-[#202025] border border-[#eaeaea] dark:border-[#27272a] rounded-xl p-4 transition-all shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                          {camp.name}
                        </h5>
                        <Badge className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-[10px]">
                          {camp.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {camp.targetAudience}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {camp.channels.map((ch) => (
                        <span
                          key={ch}
                          className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium ${
                            ch === "WhatsApp"
                              ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                              : "bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300"
                          }`}
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Micro Stats Bar */}
                  <div className="pt-2 border-t border-[#eaeaea] dark:border-[#27272a] grid grid-cols-4 gap-2 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Recipients</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{camp.contactsCount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Opened</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{camp.stats.openRate}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Replied</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{camp.stats.replyRate}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Meetings</span>
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{camp.stats.meetings}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Activity Feed (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#121215] rounded-xl border border-[#eaeaea] dark:border-[#27272a] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Real-Time Outreach Stream
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">
              Live Feed
            </span>
          </div>

          {activities.length === 0 ? (
            <div className="text-center py-10 px-4 border border-dashed border-[#eaeaea] dark:border-[#27272a] rounded-xl">
              <div className="h-10 w-10 mx-auto rounded-full bg-slate-100 dark:bg-[#18181b] flex items-center justify-center text-slate-400 mb-3">
                <Inbox className="h-5 w-5" />
              </div>
              <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Stream Standby
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-1">
                Real-time recipient events (catalog downloads, email reads, and WhatsApp replies) will stream here once sequences are deployed.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {activities.map((act, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border border-[#eaeaea] dark:border-[#27272a] bg-[#fafafa] dark:bg-[#18181b] flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 dark:text-slate-100 truncate">
                        {act.company}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                      {act.event}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] font-mono font-semibold block text-indigo-600 dark:text-indigo-400">
                      {act.channel}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
