
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AdminClient } from '@/components/admin-client';
import { AppHeader } from '@/components/layout/app-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/sidebar';
import { BookText } from 'lucide-react';

// IMPORTANT: In a production application, this email should be stored in a
// secure environment variable, not hardcoded in the source code.
const ADMIN_EMAIL = 'Dumisa.t@curro.co.za';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is authenticated, now check if they are an admin.
        if (currentUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          setIsAdmin(true);
          setLoading(false);
        } else {
          // User is not an admin, redirect them to the student dashboard.
          router.push('/dashboard');
        }
      } else {
        // No user is logged in, redirect to the login page.
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
        <BookText className="h-12 w-12 text-primary animate-pulse" />
        <p className="text-muted-foreground">Verifying access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    // This state is briefly shown while redirecting
    return (
       <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
        <BookText className="h-12 w-12 text-destructive" />
        <p className="text-muted-foreground">Access Denied. Redirecting...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
            <AppHeader />
            <main className="flex-1 overflow-y-auto admin-light-theme bg-background">
                <AdminClient />
            </main>
        </div>
    </SidebarProvider>
  );
}
