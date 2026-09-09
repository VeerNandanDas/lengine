"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Users,
  Megaphone,
  Settings,
  LogOut,
  ChevronUp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Trade Flows",
    href: "/dashboard/trade-flows",
    icon: ArrowLeftRight,
  },
  {
    title: "Buyer Directory",
    href: "/dashboard/buyers",
    icon: Users,
  },
  {
    title: "Campaigns",
    href: "/dashboard/campaigns",
    icon: Megaphone,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

interface AppSidebarProps {
  userEmail?: string;
}

export function AppSidebar({ userEmail }: AppSidebarProps) {
  const pathname = usePathname();
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
    <Sidebar collapsible="icon" className="border-r border-[#eaeaea]">
      {/* Header — Branding */}
      <SidebarHeader className="px-4 py-5 border-b border-[#eaeaea]">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 group-data-[collapsible=icon]:justify-center"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-white text-xs font-bold flex-shrink-0">
            L
          </div>
          <span className="text-base font-semibold tracking-tight text-slate-900 group-data-[collapsible=icon]:hidden">
            Lengine
          </span>
        </Link>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-medium uppercase tracking-wider text-slate-400 px-4">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      tooltip={item.title}
                      className="h-9 px-3 text-sm font-normal text-slate-600 hover:text-slate-900 hover:bg-slate-50 data-[active=true]:bg-slate-100 data-[active=true]:text-slate-900 data-[active=true]:font-medium transition-colors rounded-md"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer — User */}
      <SidebarFooter className="border-t border-[#eaeaea] p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button className="flex w-full items-center gap-2 h-10 px-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors text-left group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0" />
                }
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium flex-shrink-0">
                  {userEmail ? userEmail[0].toUpperCase() : "U"}
                </div>
                <span className="truncate text-sm group-data-[collapsible=icon]:hidden">
                  {userEmail || "User"}
                </span>
                <ChevronUp className="ml-auto h-4 w-4 text-slate-400 group-data-[collapsible=icon]:hidden" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-56 bg-white border border-[#eaeaea] shadow-sm"
              >
                <div className="px-2 py-1.5 text-xs text-slate-500 truncate border-b border-[#eaeaea] mb-1">
                  {userEmail || "User"}
                </div>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-sm text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
