import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LandingPage } from '@/components/landing-page';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}
