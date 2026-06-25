import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-6">
        <h1 className="text-3xl font-bold">EXtrack</h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="space-y-1">
          <h2 className="px-2 text-sm font-semibold text-muted-foreground">
            General
          </h2>

          <Link
            href="/profile/dashboard"
            className="rounded-md p-2 hover:bg-muted"
          >
            Dashboard
          </Link>

          <Link
            href="/profile/subscriptions"
            className="rounded-md p-2 hover:bg-muted"
          >
            Subscriptions
          </Link>

          <Link
            href="/profile/budgets"
            className="rounded-md p-2 hover:bg-muted"
          >
            Budgets
          </Link>

          <Link
            href="/profile/expensepage"
            className="rounded-md p-2 hover:bg-muted"
          >
            Add Expense
          </Link>

          <Link
            href="/profile/incomepage"
            className="rounded-md p-2 hover:bg-muted"
          >
            Add Income
          </Link>
        </SidebarGroup>

        <SidebarGroup className="space-y-1 mt-6">
          <h2 className="px-2 text-sm font-semibold text-muted-foreground">
            Tools
          </h2>

          <Link
            href="/profile/insights"
            className="rounded-md p-2 hover:bg-muted"
          >
            Insights
          </Link>

          <Link
            href="/profile/analytics"
            className="rounded-md p-2 hover:bg-muted"
          >
            Analytics
          </Link>
        </SidebarGroup>

        <SidebarGroup className="space-y-1 mt-6">
          <h2 className="px-2 text-sm font-semibold text-muted-foreground">
            Other
          </h2>

          <Link
            href="/profile/settings"
            className="rounded-md p-2 hover:bg-muted"
          >
            Settings
          </Link>

          <Link
            href="/profile/profile"
            className="rounded-md p-2 hover:bg-muted"
          >
            Profile
          </Link>

          <Link
            href="/profile/logout"
            className="rounded-md p-2 text-red-500 hover:bg-red-100"
          >
            Logout
          </Link>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white font-bold">
            G
          </div>

          <div>
            <p className="font-medium">Jsondoe</p>
            <p className="text-xs text-muted-foreground">Jsondoe@gmail.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
