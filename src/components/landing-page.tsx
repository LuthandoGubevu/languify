import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Users, Zap, Award, BookOpenCheck, CheckCircle2, XCircle } from 'lucide-react';

export function LandingPage() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: 'Interactive Exam Simulator',
      description: 'Experience real exam conditions with our timed, interactive tests that mimic the actual exam format.',
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: 'Expert Teacher Feedback',
      description: 'Receive detailed feedback from qualified teachers, with comments and suggestions for improvement.',
    },
    {
      icon: <Award className="h-8 w-8 text-white" />,
      title: 'Track Your Progress',
      description: 'Monitor your scores and completion status on your personal dashboard to see how you improve over time.',
    },
    {
      icon: <BookOpenCheck className="h-8 w-8 text-white" />,
      title: 'Purchase Expert Courses',
      description: 'Access premium courses designed by experts to master specific subjects and exam sections.',
    },
  ];

  return (
      <>
        <section
          className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center text-white"
          style={{ backgroundImage: `url('/tutor-image.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 opacity-40"></div>
          <div className="relative z-10 container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center gap-8 text-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none font-headline">
                  Master Your Language Exams with Languify
                </h1>
                <p className="mx-auto max-w-[600px] text-indigo-100 md:text-xl">
                  Our platform provides realistic practice tests and feedback from real teachers to help you ace your language proficiency exams.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 font-bold">
                  <Link href="/login">Start Practicing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Choose Your Plan</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Simple, transparent pricing. Get started for free or unlock powerful new features.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-4xl items-stretch gap-8 pt-16 lg:grid-cols-2">
                    {/* Free Card */}
                    <Card className="flex h-full flex-col rounded-2xl border-2 border-transparent transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
                        <CardHeader className="pb-4">
                            <CardTitle className="font-headline text-2xl">Free Plan</CardTitle>
                            <p className="text-4xl font-bold">R0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    <span>Access to all past papers</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    <span>Practice exams & track progress</span>
                                </li>
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <XCircle className="h-5 w-5" />
                                    <span>No answer submissions for review</span>
                                </li>
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <XCircle className="h-5 w-5" />
                                    <span>No personalised tutor feedback</span>
                                </li>
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <XCircle className="h-5 w-5" />
                                    <span>No 1:1 tutor sessions</span>
                                </li>
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <XCircle className="h-5 w-5" />
                                    <span>No free access to courses</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="secondary" className="w-full">
                                <Link href="/signup">Start Practicing</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Premium Card */}
                    <Card className="relative flex h-full flex-col rounded-2xl border-2 border-primary/50 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:border-primary">
                       <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                          <div className="rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                            Most Popular
                          </div>
                        </div>
                        <CardHeader className="pb-4 pt-8">
                            <CardTitle className="font-headline text-2xl">Premium Plan</CardTitle>
                            <p className="text-4xl font-bold">R750</p>
                            <p className="text-muted-foreground">Once-off payment</p>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    <span>All Free Plan features</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    <span>Free access to courses</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    <span>Submit answers for tutor review</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    <span>Receive personalised feedback</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    <span>Book a 1:1 tutor session per paper</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href="https://paystack.shop/pay/3ljajyf3-i">Get Premium Access</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-background">Why Choose Languify?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-background">
                  We provide the tools you need to build confidence and achieve your target score.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 mt-12">
              {features.map((feature, index) => (
                <Card key={index} className="bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 text-white border-none shadow-lg">
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="p-3 bg-white/20 rounded-lg">{feature.icon}</div>
                    <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-indigo-100">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </>
  );
}
