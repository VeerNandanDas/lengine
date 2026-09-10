"use client";

import { Search, CreditCard, LogOut, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

interface TopNavProps {
  userEmail?: string;
}

export function TopNav({ userEmail }: TopNavProps) {
  const router = useRouter();

  async function handleSignOut() {
    document.cookie = "demo_session=; path=/; max-age=0";
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-[#eaeaea] dark:border-[#27272a] bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl px-4">
      {/* Sidebar Toggle */}
      <SidebarTrigger className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#18181b] rounded-md transition-colors" />

      <Separator orientation="vertical" className="h-5 bg-[#eaeaea] dark:bg-[#27272a]" />

      {/* Global Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
        <Input
          type="search"
          placeholder="Search buyers, flows, campaigns..."
          className="h-9 pl-9 pr-4 bg-[#fafafa] dark:bg-[#18181b] border-[#eaeaea] dark:border-[#27272a] text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 rounded-md"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Credits Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#fafafa] dark:bg-[#18181b] border border-[#eaeaea] dark:border-[#27272a]">
          <CreditCard className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Credits</span>
          <Badge
            variant="secondary"
            className="bg-slate-900 text-white dark:bg-indigo-600 text-[10px] font-semibold px-1.5 py-0 h-5 hover:bg-slate-900 dark:hover:bg-indigo-600"
          >
            500
          </Badge>
        </div>

        <Separator orientation="vertical" className="h-5 bg-[#eaeaea] dark:bg-[#27272a]" />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex items-center gap-2 outline-none rounded-md px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-[#18181b] transition-colors" />
            }
          >
            <Avatar className="h-7 w-7 border border-[#eaeaea] dark:border-[#27272a]">
              <AvatarFallback className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
                {userEmail ? userEmail[0].toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden md:inline-block max-w-[120px] truncate">
              {userEmail || "User"}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white dark:bg-[#121215] border border-[#eaeaea] dark:border-[#27272a] shadow-sm"
          >
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Account</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {userEmail || "user@example.com"}
              </p>
            </div>
            <DropdownMenuSeparator className="bg-[#eaeaea] dark:bg-[#27272a]" />
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/settings")}
              className="cursor-pointer text-sm text-slate-600 dark:text-slate-300 dark:hover:bg-[#18181b]"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/settings")}
              className="cursor-pointer text-sm text-slate-600 dark:text-slate-300 dark:hover:bg-[#18181b]"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#eaeaea] dark:bg-[#27272a]" />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-sm text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
