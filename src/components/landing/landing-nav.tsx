"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { label: "Platform", href: "#system" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "Get in Touch", href: "#contact" },
];

export function LandingNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key press or window resize
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#eaeaea] dark:border-[#27272a] bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* Left: Brand (Name 'lengine' only, no L logo) */}
        <div className="flex items-center flex-shrink-0 z-10">
          <Link
            href="/"
            className="flex items-center select-none group focus-visible:outline-hidden"
          >
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              lengine
            </span>
          </Link>
        </div>

        {/* Center: Perfectly Centered in the navbar */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-600 dark:text-slate-400 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={
                link.href === "#contact"
                  ? "text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-colors whitespace-nowrap"
                  : "hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 z-10">
          <ThemeToggle />

          {/* Sign In button */}
          <Link
            href="/login"
            className="hidden sm:inline-flex text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#18181b] transition-colors"
          >
            Sign In
          </Link>

          {/* Terminal CTA */}
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center justify-center h-8.5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-semibold px-3.5 rounded-lg shadow-xs transition-colors"
          >
            <span>Terminal</span>
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>

          {/* Mobile Hamburger Toggle Button (only on screens < md) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden h-9 w-9 rounded-lg border border-[#eaeaea] dark:border-[#27272a] bg-slate-50 dark:bg-[#18181b] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-hidden"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-slate-950/40 backdrop-blur-xs z-40 md:hidden animate-in fade-in-0 duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-down Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 inset-x-0 z-50 border-b border-[#eaeaea] dark:border-[#27272a] bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-2xl px-5 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100dvh-4rem)] overflow-y-auto space-y-4">
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  link.href === "#contact"
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/40"
                    : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#18181b]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#eaeaea] dark:border-[#27272a] grid grid-cols-2 gap-2.5">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="h-10 rounded-lg border border-[#eaeaea] dark:border-[#27272a] bg-white dark:bg-[#18181b] text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center hover:bg-slate-50 dark:hover:bg-[#222226] transition-colors"
            >
              Sign In
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="h-10 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold flex items-center justify-center hover:bg-slate-800 dark:hover:bg-slate-200 shadow-sm transition-colors"
            >
              Terminal ➔
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
