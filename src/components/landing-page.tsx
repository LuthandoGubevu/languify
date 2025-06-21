import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, Award } from 'lucide-react';

export function LandingPage() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Interactive Exam Simulator',
      description: 'Experience real exam conditions with our timed, interactive tests that mimic the actual exam format.',
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: 'AI-Powered Feedback',
      description: 'Receive detailed, instant feedback on your performance, with comments and suggestions for improvement.',
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: 'Track Your Progress',
      description: 'Monitor your scores and completion status on your personal dashboard to see how you improve over time.',
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.14))]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 place-items-center">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Master Your Language Exams with Languify
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our platform provides realistic practice tests and AI-driven feedback to help you ace your language proficiency exams.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">Start Practicing</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="language learning"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Why Choose Languify?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We provide the tools you need to build confidence and achieve your target score.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              {features.map((feature, index) => (
                <Card key={index} className="bg-background">
                  <CardHeader className="flex flex-col items-center text-center">
                    {feature.icon}
                    <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Ready to Get Started?</h2>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Sign up now and take the first step towards your language certification. It's time to unlock your potential.
                    </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                    <Button asChild size="lg" className="w-full">
                        <Link href="/dashboard">View Dashboard</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Languify. All rights reserved.</p>
      </footer>
    </div>
  );
}
