"use client";

import { DYNAMIC_VARIABLES, DynamicVariable } from "@/lib/campaigns-data";
import { Badge } from "@/components/ui/badge";
import {
  GripVertical,
  Plus,
  Sparkles,
  Building2,
  UserRound,
  Ship,
  Info,
} from "lucide-react";

interface DynamicVariablesSidebarProps {
  onInsertVariable: (tag: string) => void;
}

export function DynamicVariablesSidebar({
  onInsertVariable,
}: DynamicVariablesSidebarProps) {
  const categories = [
    { key: "contact", label: "Executive Contacts", icon: UserRound },
    { key: "company", label: "Company Profile", icon: Building2 },
    { key: "customs", label: "Manifest & Customs", icon: Ship },
  ];

  return (
    <div className="w-full lg:w-72 bg-[#fafafa] dark:bg-[#121215] border border-[#eaeaea] dark:border-[#27272a] rounded-xl p-4 flex flex-col justify-between flex-shrink-0">
      <div>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#eaeaea] dark:border-[#27272a]">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Dynamic Variables
            </h4>
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
            Drag or Click
          </span>
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 mb-4 leading-relaxed">
          Drag data points into your email subject or body. Customs values are automatically injected per recipient.
        </p>

        {/* Categorized Variable Chips */}
        <div className="space-y-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const vars = DYNAMIC_VARIABLES.filter((v) => v.category === cat.key);

            return (
              <div key={cat.key} className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
                  <Icon className="h-3 w-3" />
                  <span>{cat.label}</span>
                </div>

                <div className="space-y-1.5">
                  {vars.map((v) => (
                    <div
                      key={v.tag}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", v.tag);
                        e.dataTransfer.effectAllowed = "copy";
                      }}
                      className="group bg-white dark:bg-[#18181b] hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 border border-[#eaeaea] dark:border-[#27272a] hover:border-indigo-300 dark:hover:border-indigo-700 rounded-lg p-2 transition-all cursor-grab active:cursor-grabbing shadow-2xs flex items-center justify-between gap-2"
                      title={`Drag to insert ${v.tag} or click '+'`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <GripVertical className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate block">
                              {v.tag}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block truncate">
                            {v.label} • <span className="italic text-slate-500 dark:text-slate-400 font-mono">{v.sampleValue}</span>
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onInsertVariable(v.tag)}
                        className="h-6 w-6 rounded-md bg-[#fafafa] dark:bg-[#222226] group-hover:bg-indigo-600 group-hover:text-white border border-[#eaeaea] dark:border-[#27272a] group-hover:border-indigo-600 flex items-center justify-center text-slate-400 dark:text-slate-500 transition-all flex-shrink-0"
                        title="Click to insert"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info footer */}
      <div className="mt-4 pt-3 border-t border-[#eaeaea] dark:border-[#27272a] text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
        <Info className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
        <span>Values resolve to verified customs Bill of Lading records upon dispatch.</span>
      </div>
    </div>
  );
}
