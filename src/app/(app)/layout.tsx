
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { BookText } from 'lucide-react';

function FullPageLoader() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
            <BookText className="h-12 w-12 text-primary animate-pulse" />
            <p className="text-muted-foreground">Loading your Languify experience...</p>
        </div>
    )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { authUser, loading } = useUser();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/login');
    }
  }, [loading, authUser, router]);

  if (loading) {
    return <FullPageLoader />;
  }

  // To prevent flicker, we can show the loader while redirecting
  if (!authUser) {
    return <FullPageLoader />;
  }
  
  return (
    <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
            <AppHeader />
            <main className="flex-1 overflow-y-auto bg-muted/30">{children}</main>
        </div>
    </SidebarProvider>
  );
}
