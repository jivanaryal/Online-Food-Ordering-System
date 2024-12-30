import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full">
        <SidebarTrigger />
        <nav className="border-b-[1px] h-16">
          <div>hello</div>
        </nav>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
