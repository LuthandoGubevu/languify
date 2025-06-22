'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <div className="flex items-center md:hidden">
          <SidebarTrigger />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Add user menu or other actions here */}
        </div>
      </div>
    </header>
  );
}
