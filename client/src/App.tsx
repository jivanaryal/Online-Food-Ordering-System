import { AppSidebar } from "./components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import MyRoutes from "./Routers";

const App = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <MyRoutes />
        </main>
      </SidebarProvider>
    </>
  );
};

export default App;
