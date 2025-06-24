
'use client';

import { useUser } from '@/hooks/use-user';
import { DashboardFreeClient } from './dashboard-free-client';
import { DashboardPremiumClient } from './dashboard-premium-client';
import { BookText } from 'lucide-react';

function DashboardLoader() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-background">
            <BookText className="h-12 w-12 text-primary animate-pulse" />
            <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
    )
}

export function DashboardClient() {
    const { userProfile, loading } = useUser();

    if (loading || !userProfile) {
        return <DashboardLoader />;
    }

    if (userProfile.plan === 'premium') {
        return <DashboardPremiumClient />;
    }
    
    return <DashboardFreeClient />;
}
