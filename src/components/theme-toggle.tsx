"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render a placeholder to avoid layout shift
    return (
      <button
        type="button"
        className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-[#eaeaea] dark:border-[#27272a] bg-white dark:bg-[#18181b] text-slate-500"
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-[#eaeaea] dark:border-[#27272a] bg-white dark:bg-[#18181b] text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#27272a] hover:text-slate-900 dark:hover:text-white transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
