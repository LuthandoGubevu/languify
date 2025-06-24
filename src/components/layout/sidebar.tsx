
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { BookText, Home, GraduationCap, Pencil, Calendar, BookOpenCheck, LogOut } from 'lucide-react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { userProfile } = useUser();
  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: 'Logout Failed',
        description: 'An error occurred while logging out. Please try again.',
        variant: 'destructive',
      });
    }
  };


  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center space-x-2">
          <BookText className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">Languify</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/dashboard')} className="transition-all hover:shadow-lg hover:shadow-primary/20">
              <Link href="/dashboard">
                <Home />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Accordion type="multiple" defaultValue={["grade-12"]} className="w-full px-2">
            <AccordionItem value="grade-11" className="border-none">
              <AccordionTrigger className="w-full hover:no-underline rounded-md hover:bg-sidebar-accent p-2 justify-start gap-2 text-sm [&[data-state=open]>svg]:rotate-90">
                <GraduationCap className="h-4 w-4 shrink-0" />
                <span>Grade 11</span>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pl-7">
                 <p className="text-xs text-muted-foreground p-2">Coming Soon</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="grade-12" className="border-none">
              <AccordionTrigger className="w-full hover:no-underline rounded-md hover:bg-sidebar-accent p-2 justify-start gap-2 text-sm [&[data-state=open]>svg]:rotate-90">
                 <GraduationCap className="h-4 w-4 shrink-0" />
                 <span>Grade 12</span>
              </AccordionTrigger>
              <AccordionContent className="pl-7 space-y-1">
                <SidebarMenuButton asChild variant="ghost" size="sm" className={cn("w-full justify-start", isActive('/grade-12/english-p1') && 'bg-sidebar-accent')}>
                  <Link href="/grade-12/english-p1"><Pencil className="mr-2 h-4 w-4"/> English Paper 1</Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild variant="ghost" size="sm" className={cn("w-full justify-start", isActive('/grade-12/english-p2') && 'bg-sidebar-accent')}>
                  <Link href="/grade-12/english-p2"><Pencil className="mr-2 h-4 w-4"/> English Paper 2</Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild variant="ghost" size="sm" className={cn("w-full justify-start", isActive('/grade-12/english-p3') && 'bg-sidebar-accent')}>
                  <Link href="/grade-12/english-p3"><Pencil className="mr-2 h-4 w-4"/> English Paper 3</Link>
                </SidebarMenuButton>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/courses')} className="transition-all hover:shadow-lg hover:shadow-primary/20">
              <Link href="/courses">
                <BookOpenCheck />
                <span>Courses</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/book-tutor')} className="transition-all hover:shadow-lg hover:shadow-primary/20">
              <Link href="/book-tutor">
                <Calendar />
                <span>Book a Tutor</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
