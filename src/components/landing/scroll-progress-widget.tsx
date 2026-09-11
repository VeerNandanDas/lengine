"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Check } from "lucide-react";

export function ScrollProgressWidget() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const totalScrollable = scrollHeight - clientHeight;

      if (totalScrollable <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = Math.min(100, Math.max(0, Math.round((scrollY / totalScrollable) * 100)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG circular stroke calculation
  // Radius = 19, Circumference = 2 * PI * 19 ≈ 119.38
  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * scrollProgress) / 100;

  return (
    <aside
      aria-label="Scroll percentage indicator"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none print:hidden flex items-center gap-2"
    >
      <button
        type="button"
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={`Page scrolled ${scrollProgress}% — Click to jump to top`}
        className="group relative flex items-center gap-2.5 px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-full bg-white/90 dark:bg-[#121215]/90 backdrop-blur-md border border-[#eaeaea] dark:border-[#27272a] shadow-lg hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {/* Circular Progress Gauge */}
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
            {/* Background track circle */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="stroke-slate-200 dark:stroke-zinc-800"
              strokeWidth="3"
              fill="none"
            />
            {/* Active progress circle */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="stroke-indigo-600 dark:stroke-indigo-400 transition-all duration-150 ease-out"
              strokeWidth="3.2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* Center Content: Percentage or Hover Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isHovered && scrollProgress > 0 ? (
              <ArrowUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400 animate-bounce" />
            ) : scrollProgress === 100 ? (
              <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <span className="font-mono text-[10px] sm:text-[11px] font-bold text-slate-800 dark:text-slate-100">
                {scrollProgress}
                <span className="text-[8px] font-sans text-slate-400 dark:text-slate-500">%</span>
              </span>
            )}
          </div>
        </div>

        {/* Expandable Context Label / Callout */}
        <div className="hidden sm:flex flex-col items-start pr-1 text-left">
          <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
            {isHovered ? "Jump to top" : scrollProgress === 100 ? "Page complete" : "Page progress"}
          </span>
          <div className="flex items-center gap-1">
            <span className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
              {scrollProgress}%
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              scrolled
            </span>
          </div>
        </div>

        {/* Ambient subtle glow when scrolled */}
        {scrollProgress > 0 && (
          <div
            className="absolute inset-0 -z-10 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity"
            style={{
              background: "radial-gradient(circle, rgba(79, 70, 229, 0.45) 0%, transparent 70%)",
            }}
          />
        )}
      </button>
    </aside>
  );
}
