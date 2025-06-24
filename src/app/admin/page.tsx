'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AdminClient } from '@/components/admin-client';
import { AppHeader } from '@/components/layout/app-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/sidebar';

// IMPORTANT: In a production application, this email should be stored in a
// secure environment variable, not hardcoded in the source code.
const ADMIN_EMAIL = 'Dumisa.t@curro.co.za';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        setIsAdmin(true);
        setLoading(false);
      } else {
        // If user is not admin or not logged in, redirect them.
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <p className="text-foreground">Verifying access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    // This state is briefly shown while redirecting
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <p className="text-foreground">Access Denied. Redirecting...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
            <AppHeader />
            <main className="flex-1 overflow-y-auto">
                <AdminClient />
            </main>
        </div>
    </SidebarProvider>
  );
}
