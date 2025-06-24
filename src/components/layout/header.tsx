
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BookText } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookText className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Languify
            </span>
          </Link>
        </div>

        <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                 <SheetTitle className="sr-only">Menu</SheetTitle>
                <Link href="/" className="flex items-center space-x-2 mb-6">
                  <BookText className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">Languify</span>
                </Link>
                <div className="flex flex-col gap-4">
                    <Button asChild variant="outline">
                        <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </div>
              </SheetContent>
            </Sheet>
        </div>


        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden items-center gap-2 text-sm md:flex">
            <Button asChild variant="ghost">
                <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
