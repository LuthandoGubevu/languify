import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/sidebar';
import { AppHeader } from '@/components/layout/app-header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
            <AppHeader />
            <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
    </SidebarProvider>
  );
}
