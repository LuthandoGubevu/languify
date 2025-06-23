import { Header } from '@/components/layout/header';
import Link from 'next/link';
import { BookText, Twitter, Facebook, Linkedin } from 'lucide-react';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
             <Link href="/" className="flex items-center space-x-2">
                <BookText className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold font-headline">Languify</span>
            </Link>
            <p className="text-muted-foreground text-sm">
                Master your language exams with confidence.
            </p>
            <div className="flex gap-4 mt-2">
                <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
                <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
                <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">Dashboard</Link></li>
                <li><Link href="/courses" className="text-sm text-muted-foreground hover:text-primary">Courses</Link></li>
                <li><Link href="/book-tutor" className="text-sm text-muted-foreground hover:text-primary">Book a Tutor</Link></li>
                <li><Link href="/#features" className="text-sm text-muted-foreground hover:text-primary">Features</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Company</h4>
             <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
            </ul>
          </div>
           <div>
            <h4 className="font-headline font-semibold mb-4">Legal</h4>
             <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 py-6">
            <p className="text-center text-xs text-muted-foreground">&copy; 2024 Languify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
