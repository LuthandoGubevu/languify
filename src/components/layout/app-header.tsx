'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Bell, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '../ui/badge';

const notifications = [
  {
    id: 1,
    title: 'Feedback received',
    description: 'Your Paper 1 submission has been graded.',
    icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    time: '5m ago'
  },
  {
    id: 2,
    title: 'Session reminder',
    description: 'Your tutor session is in 1 hour.',
    icon: <Clock className="h-5 w-5 text-amber-500" />,
    time: '1h ago'
  }
];


export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <div className="flex items-center md:hidden">
          <SidebarTrigger />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
           <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 justify-center text-xs">
                    {notifications.length}
                  </Badge>
                  <span className="sr-only">Open notifications</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Notifications</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start gap-4">
                      <div className="mt-1">{notification.icon}</div>
                      <div>
                        <p className="font-semibold">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
