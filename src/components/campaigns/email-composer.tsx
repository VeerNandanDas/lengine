"use client";

import { useState, useRef, useCallback } from "react";
import { DynamicVariablesSidebar } from "./dynamic-variables-sidebar";
import { substituteVariables } from "@/lib/campaigns-data";
import { CompanyBuyer } from "@/lib/buyers-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  Eye,
  Edit3,
  Sparkles,
  Send,
  Mail,
  CheckCircle2,
  FileText,
  Quote,
} from "lucide-react";

interface EmailComposerProps {
  selectedBuyers: CompanyBuyer[];
  subject: string;
  setSubject: (sub: string) => void;
  body: string;
  setBody: (b: string) => void;
}

export function EmailComposer({
  selectedBuyers,
  subject,
  setSubject,
  body,
  setBody,
}: EmailComposerProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [activeTargetIndex, setActiveTargetIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);
  const [lastFocusedInput, setLastFocusedInput] = useState<"subject" | "body">("body");

  const targetBuyer = selectedBuyers[activeTargetIndex] || null;

  // Insert variable at cursor or end
  const handleInsertVariable = useCallback(
    (tag: string) => {
      if (lastFocusedInput === "subject") {
        const input = subjectInputRef.current;
        if (!input) {
          setSubject(subject + " " + tag);
          return;
        }
        const start = input.selectionStart || subject.length;
        const end = input.selectionEnd || subject.length;
        const updated = subject.substring(0, start) + tag + subject.substring(end);
        setSubject(updated);
        setTimeout(() => {
          input.focus();
          input.setSelectionRange(start + tag.length, start + tag.length);
        }, 0);
      } else {
        const textarea = textareaRef.current;
        if (!textarea) {
          setBody(body + "\n" + tag);
          return;
        }
        const start = textarea.selectionStart || body.length;
        const end = textarea.selectionEnd || body.length;
        const updated = body.substring(0, start) + tag + body.substring(end);
        setBody(updated);
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + tag.length, start + tag.length);
        }, 0);
      }
    },
    [body, subject, lastFocusedInput, setBody, setSubject]
  );

  // Formatting helpers
  const handleFormat = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = body.substring(start, end);
    const replacement = `${prefix}${selected || "text"}${suffix}`;
    const updated = body.substring(0, start) + replacement + body.substring(end);
    setBody(updated);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 0);
  };

  // Drop handlers for drag and drop
  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const tag = e.dataTransfer.getData("text/plain");
    if (!tag) return;

    const textarea = textareaRef.current;
    if (!textarea) {
      setBody(body + " " + tag);
      return;
    }

    const cursorPos = textarea.selectionStart || body.length;
    const updated = body.substring(0, cursorPos) + tag + body.substring(cursorPos);
    setBody(updated);
  };

  const handleSubjectDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    const tag = e.dataTransfer.getData("text/plain");
    if (!tag) return;
    setSubject(subject + " " + tag);
  };

  // Substitute values for preview
  const previewSubject = substituteVariables(subject, targetBuyer);
  const previewBody = substituteVariables(body, targetBuyer);

  return (
    <div className="space-y-4">
      {/* Top Controls: Mode Switcher & Audience Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-[#eaeaea]">
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg bg-slate-100 p-1 border border-[#eaeaea]">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                activeTab === "edit"
                  ? "bg-white text-slate-900 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Edit3 className="h-3.5 w-3.5" />
              Template Composer
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                activeTab === "preview"
                  ? "bg-white text-slate-900 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Eye className="h-3.5 w-3.5 text-indigo-600" />
              Live Customs Preview
            </button>
          </div>

          <span className="text-xs text-slate-400 font-mono hidden md:inline">
            • Drag manifest variables directly into text
          </span>
        </div>

        {/* Selected Recipients Counter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            Target Audience:
          </span>
          <Badge
            variant="secondary"
            className="bg-indigo-50 text-indigo-700 border-indigo-200 text-xs font-mono font-medium"
          >
            {selectedBuyers.length} Consignees Selected
          </Badge>
        </div>
      </div>

      {activeTab === "edit" ? (
        /* Edit Mode: Subject + Body Editor + Dynamic Variables Sidebar */
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* Main Composer Area */}
          <div className="flex-1 w-full space-y-4">
            {/* Subject Line Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span>Email Subject Line</span>
                <span className="text-[10px] font-normal text-slate-400 lowercase font-mono">
                  supports &#123;&#123;variables&#125;&#125;
                </span>
              </label>

              <div className="relative">
                <input
                  ref={subjectInputRef}
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  onFocus={() => setLastFocusedInput("subject")}
                  onDrop={handleSubjectDrop}
                  onDragOver={(e) => e.preventDefault()}
                  placeholder="e.g. Sourcing Inquiry: Shipments to {{recent_port}} ({{buyer_company}})"
                  className="w-full h-10 px-3.5 rounded-lg border border-[#eaeaea] bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium transition-all"
                />
              </div>
            </div>

            {/* Rich Text Editor Container */}
            <div className="rounded-xl border border-[#eaeaea] bg-white shadow-xs overflow-hidden">
              {/* Formatting Toolbar */}
              <div className="px-3 py-2 border-b border-[#eaeaea] bg-[#fafafa] flex items-center justify-between gap-2 flex-wrap text-slate-600">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleFormat("**", "**")}
                    className="h-7 w-7 rounded hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold"
                    title="Bold (**text**)"
                  >
                    <Bold className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFormat("*", "*")}
                    className="h-7 w-7 rounded hover:bg-slate-200 flex items-center justify-center text-slate-700 italic"
                    title="Italic (*text*)"
                  >
                    <Italic className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFormat("<u>", "</u>")}
                    className="h-7 w-7 rounded hover:bg-slate-200 flex items-center justify-center text-slate-700 underline"
                    title="Underline"
                  >
                    <Underline className="h-3.5 w-3.5" />
                  </button>

                  <span className="h-4 w-px bg-slate-200 mx-1" />

                  <button
                    type="button"
                    onClick={() => handleFormat("- ")}
                    className="h-7 w-7 rounded hover:bg-slate-200 flex items-center justify-center text-slate-700"
                    title="Bullet List"
                  >
                    <List className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFormat("1. ")}
                    className="h-7 w-7 rounded hover:bg-slate-200 flex items-center justify-center text-slate-700"
                    title="Numbered List"
                  >
                    <ListOrdered className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFormat("> ")}
                    className="h-7 w-7 rounded hover:bg-slate-200 flex items-center justify-center text-slate-700"
                    title="Quote"
                  >
                    <Quote className="h-3.5 w-3.5" />
                  </button>

                  <span className="h-4 w-px bg-slate-200 mx-1" />

                  <button
                    type="button"
                    onClick={() => handleFormat("[", "](https://)")}
                    className="h-7 w-7 rounded hover:bg-slate-200 flex items-center justify-center text-slate-700"
                    title="Insert Link"
                  >
                    <LinkIcon className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="text-[10px] text-slate-400 font-mono">
                  Markdown & Variable Syntax
                </div>
              </div>

              {/* Textarea with Drag & Drop */}
              <textarea
                ref={textareaRef}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onFocus={() => setLastFocusedInput("body")}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                rows={12}
                placeholder="Write your email pitch here... Drag dynamic manifest variables into this box."
                className="w-full p-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden resize-y leading-relaxed font-sans"
              />

              {/* Editor Footer Bar */}
              <div className="px-4 py-2 bg-[#fafafa] border-t border-[#eaeaea] flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Customs variables highlighted automatically per recipient.</span>
                </div>
                <span className="font-mono text-slate-400">
                  {body.length} characters
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Variables Sidebar */}
          <DynamicVariablesSidebar onInsertVariable={handleInsertVariable} />
        </div>
      ) : (
        /* Live Preview Mode: Shows actual substituted email for a selected recipient */
        <div className="space-y-4">
          {/* Recipient Selector Strip */}
          <div className="flex items-center justify-between bg-white rounded-xl border border-[#eaeaea] p-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">
                Simulate Recipient:
              </span>
              <select
                value={activeTargetIndex}
                onChange={(e) => setActiveTargetIndex(Number(e.target.value))}
                className="text-xs font-medium bg-slate-50 border border-[#eaeaea] rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden"
              >
                {selectedBuyers.map((b, i) => (
                  <option key={b.id} value={i}>
                    {b.name} ({b.portOfUnlading})
                  </option>
                ))}
              </select>
            </div>

            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Dynamic Manifest Context Injected
            </span>
          </div>

          {/* Email Preview Client UI */}
          <div className="rounded-2xl border border-[#eaeaea] bg-white shadow-md overflow-hidden max-w-3xl mx-auto">
            {/* Window bar */}
            <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="ml-2 font-mono text-slate-300 text-[11px]">
                  Email Client Preview — Day 1 Outreach
                </span>
              </div>
              <Badge className="bg-indigo-500/30 text-indigo-200 border-none text-[10px]">
                Direct SMTP Relay
              </Badge>
            </div>

            {/* Email Headers */}
            <div className="p-6 border-b border-[#eaeaea] bg-[#fafafa] space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 uppercase font-semibold w-16 text-[10px]">To:</span>
                <span className="font-semibold text-slate-900">
                  {targetBuyer?.name || "Target Brands, Inc."} Leadership
                </span>
                <span className="text-slate-400 font-mono">
                  &lt;procurement@{targetBuyer?.name.toLowerCase().replace(/[^a-z]/g, "") || "target"}.com&gt;
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 uppercase font-semibold w-16 text-[10px]">From:</span>
                <span className="font-semibold text-slate-900">Alex Chen</span>
                <span className="text-slate-400 font-mono">&lt;alex.chen@meridian-trade.com&gt;</span>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-[#eaeaea]">
                <span className="text-slate-400 uppercase font-semibold w-16 text-[10px]">Subject:</span>
                <span className="font-bold text-slate-900 text-sm">
                  {previewSubject || "No subject specified"}
                </span>
              </div>
            </div>

            {/* Email Body Preview */}
            <div className="p-8 bg-white space-y-4 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap font-sans min-h-[220px]">
              {previewBody || "Start typing in the editor to see your email template preview..."}
            </div>

            {/* Email Footer */}
            <div className="px-8 py-4 bg-slate-50 border-t border-[#eaeaea] text-xs text-slate-500 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Alex Chen</p>
                <p className="text-[11px] text-slate-400">Head of Global Trade Accounts • Meridian Trade Sourcing</p>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Sent via Lengine Trade Engine
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
