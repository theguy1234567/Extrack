import { AppSidebar } from "@/components/AppSidebar.jsx";
import Toolbar from "@/components/Toolbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "./globals.css";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProvider>
        {/* Left */}
        <AppSidebar />
        <SidebarTrigger />

        {/* Right */}
        <div className="flex-1 flex flex-col">
          <Toolbar />

          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
