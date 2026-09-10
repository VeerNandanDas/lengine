import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TopNav } from "@/components/top-nav";

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  let userEmail: string | undefined;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    userEmail = data?.user?.email;
  } catch {
    // Supabase client may throw if URL/key is placeholder
  }

  if (!userEmail) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const demo = cookieStore.get("demo_session")?.value;
    if (demo) {
      userEmail = demo;
    } else {
      redirect("/login");
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar userEmail={userEmail} />
      <SidebarInset>
        <TopNav userEmail={userEmail} />
        <main className="flex-1 bg-[#fafafa] dark:bg-[#09090b] text-slate-900 dark:text-slate-100 min-h-screen">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
