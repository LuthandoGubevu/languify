
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Lock, ArrowRight } from 'lucide-react';
import type { PracticePaper } from '@/lib/types';
import { motion } from 'framer-motion';

const mockPapers: PracticePaper[] = [
  { id: 'p1-2024', title: 'Grade 12 English P1', description: 'Comprehension practice.', status: 'Not Started', totalQuestions: 14, path: '/grade-12/english-p1' },
  { id: 'p2-2024', title: 'Grade 12 English P2', description: 'Poetry and Literature.', status: 'Not Started', totalQuestions: 20, path: '/grade-12/english-p2' },
  { id: 'p3-2024', title: 'Grade 12 English P3', description: 'Creative writing.', status: 'Not Started', totalQuestions: 10, path: '/grade-12/english-p3' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.02, transition: { type: 'spring', stiffness: 300 } },
};

const FeatureLockCard = ({ title, description, linkText, href }: { title: string, description: string, linkText: string, href: string }) => (
    <motion.div variants={cardVariants} whileHover="hover">
        <Card className="h-full flex flex-col rounded-2xl shadow-sm transition-shadow bg-muted/30">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2 text-muted-foreground">
                    <Lock className="h-5 w-5" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
            <CardContent>
                 <Button asChild className="w-full">
                    <Link href={href}>
                        {linkText} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </motion.div>
);


export function DashboardFreeClient() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl space-y-8">
      
      {/* Upgrade Banner */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="relative rounded-2xl bg-primary/10 border border-primary/20 p-6 sm:p-8 text-foreground overflow-hidden"
       >
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold font-headline">🚀 Unlock Your Full Potential</h1>
          <p className="mt-2 text-muted-foreground">Upgrade to Premium to submit exams, get tutor feedback, and access exclusive courses.</p>
          <Button asChild className="mt-4 font-bold group">
            <Link href="/#pricing">
                Upgrade Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        animate="visible"
      >
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
            {/* My Exams */}
            <motion.div variants={cardVariants} whileHover="hover">
                <Card className="h-full flex flex-col rounded-2xl shadow-sm transition-shadow">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><FileText className="h-5 w-5 text-primary"/>My Exams</CardTitle>
                        <CardDescription>Practice past papers to sharpen your skills. Upgrade to submit for feedback.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                       {mockPapers.map(paper => (
                           <div key={paper.id} className="p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                               <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                                   <p className="font-semibold">{paper.title}</p>
                                   <Badge variant='outline'>{paper.status}</Badge>
                               </div>
                               <div className="flex justify-end gap-2 mt-2">
                                   <Button size="sm" asChild><Link href={paper.path}>Start Practice</Link></Button>
                               </div>
                           </div>
                       ))}
                    </CardContent>
                </Card>
            </motion.div>
        </div>

        {/* Side Column with Locked Features */}
        <div className="lg:col-span-1 space-y-6">
            <FeatureLockCard
                title="Tutor Feedback"
                description="Get detailed comments and a score breakdown from expert tutors."
                linkText="Unlock Feedback"
                href="/#pricing"
            />
            <FeatureLockCard
                title="1-on-1 Sessions"
                description="Book live sessions with a tutor to focus on your specific needs."
                linkText="Unlock Sessions"
                href="/#pricing"
            />
             <FeatureLockCard
                title="Exclusive Courses"
                description="Access in-depth courses on essay writing, poetry analysis, and more."
                linkText="Unlock Courses"
                href="/#pricing"
            />
        </div>
      </motion.div>
    </div>
  );
}
