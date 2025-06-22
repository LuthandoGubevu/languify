'use client';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpenCheck, Calendar, ArrowRight, MessageSquare, Pencil, Sparkles } from 'lucide-react';
import type { PracticePaper, Course } from '@/lib/types';
import { motion } from 'framer-motion';

const mockPapers: PracticePaper[] = [
  { id: 'p1-2024', title: 'Grade 12 English P1', description: 'Comprehension practice.', status: 'In Progress', totalQuestions: 14, path: '/grade-12/english-p1', progress: 75 },
  { id: 'p2-2024', title: 'Grade 12 English P2', description: 'Poetry and Literature.', status: 'Not Started', totalQuestions: 20, path: '/grade-12/english-p2', progress: 0 },
  { id: 'p3-2024', title: 'Grade 12 English P3', description: 'Creative writing.', status: 'Not Started', totalQuestions: 10, path: '/grade-12/english-p3', progress: 0 },
];

const mockCourses: (Course & { progress: number })[] = [
    {
        id: '1',
        title: 'Mastering the Essay',
        description: 'A deep dive into writing compelling essays for Paper 3.',
        price: 'Free',
        href: '#',
        progress: 40,
    }
]

const upcomingSessions = [
    {
        id: 'session-1',
        title: 'Paper 2 Revision',
        date: '2024-07-15T14:00:00',
        status: 'Confirmed',
    }
]

const recentFeedback = [
    {
        id: 'fb-1',
        paper: 'English Paper 1',
        score: 88,
        status: 'New'
    }
]

const cardVariants = {
  hover: {
    scale: 1.03,
    transition: { type: 'spring', stiffness: 300 },
  },
};

export function DashboardClient() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl space-y-8">
        
      {/* Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 p-8 text-white overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-headline">🔥 Master Grade 12 English in 30 Days</h1>
          <p className="mt-2 text-indigo-100">Includes Paper 1–3 Video & Practice Resources</p>
          <Button asChild className="mt-4 bg-white text-indigo-600 hover:bg-gray-100 font-bold group">
            <Link href="/courses">
                Explore Courses <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Learning Overview */}
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Your Learning Overview</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            
            {/* Exam Progress */}
            <motion.div variants={cardVariants} whileHover="hover">
                <Card className="h-full flex flex-col rounded-2xl shadow-md transition-shadow hover:shadow-lg">
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg"><Pencil className="h-6 w-6 text-primary" /></div>
                        <CardTitle className="font-headline">Exam Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                       {mockPapers.slice(0, 2).map(paper => (
                           <div key={paper.id}>
                               <div className="flex justify-between items-center mb-1">
                                   <p className="font-semibold text-sm">{paper.title}</p>
                                   <span className="text-xs text-muted-foreground">{paper.progress}%</span>
                               </div>
                               <Progress value={paper.progress} />
                               <Button variant="link" size="sm" asChild className="p-0 h-auto mt-1"><Link href={paper.path}>
                               {paper.status === 'Not Started' ? 'Start Exam' : 'Continue'} <ArrowRight className="ml-1 h-3 w-3"/>
                               </Link></Button>
                           </div>
                       ))}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Courses In Progress */}
            <motion.div variants={cardVariants} whileHover="hover">
                 <Card className="h-full flex flex-col rounded-2xl shadow-md transition-shadow hover:shadow-lg">
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-emerald-500/10 rounded-lg"><BookOpenCheck className="h-6 w-6 text-emerald-500" /></div>
                        <CardTitle className="font-headline">Courses</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        {mockCourses.map(course => (
                            <div key={course.id}>
                               <p className="font-semibold">{course.title}</p>
                               <p className="text-sm text-muted-foreground mb-2">Next: Module 3</p>
                               <Progress value={course.progress} className="[&>*]:bg-emerald-500" />
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                       <Button variant="secondary" className="w-full">
                           Continue Course <ArrowRight className="ml-2 h-4 w-4"/>
                       </Button>
                    </CardFooter>
                </Card>
            </motion.div>

            {/* Upcoming Tutor Sessions */}
            <motion.div variants={cardVariants} whileHover="hover">
                 <Card className="h-full flex flex-col rounded-2xl shadow-md transition-shadow hover:shadow-lg">
                    <CardHeader className="flex-row items-center gap-4">
                       <div className="p-3 bg-amber-500/10 rounded-lg"><Calendar className="h-6 w-6 text-amber-500" /></div>
                        <CardTitle className="font-headline">Tutor Sessions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        {upcomingSessions.map(session => (
                            <div key={session.id} className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{session.title}</p>
                                    <p className="text-sm text-muted-foreground">{new Date(session.date).toLocaleString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                                <Badge variant={session.status === 'Confirmed' ? 'default' : 'secondary'} className="bg-emerald-500/80">{session.status}</Badge>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <Button variant="secondary" className="w-full">
                           Reschedule or Join <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>

            {/* Recent Feedback */}
            <motion.div variants={cardVariants} whileHover="hover">
                 <Card className="h-full flex flex-col rounded-2xl shadow-md transition-shadow hover:shadow-lg">
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-rose-500/10 rounded-lg"><MessageSquare className="h-6 w-6 text-rose-500" /></div>
                        <CardTitle className="font-headline">Recent Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                       {recentFeedback.map(fb => (
                           <div key={fb.id} className="flex justify-between items-center">
                               <div>
                                   <p className="font-semibold">{fb.paper}</p>
                                   <p className="text-sm text-muted-foreground">Score: {fb.score}%</p>
                               </div>
                               <Badge variant={fb.status === 'New' ? 'destructive' : 'outline'} className="bg-rose-500 text-white">{fb.status}</Badge>
                           </div>
                       ))}
                    </CardContent>
                     <CardFooter>
                        <Button variant="secondary" className="w-full">
                           View Feedback <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
      </div>
      
      {/* Smart Recommendations */}
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Smart Recommendations</h2>
        <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-primary/5 border-primary/20 flex items-center p-6">
                <Sparkles className="h-8 w-8 text-primary mr-4" />
                <div>
                    <CardTitle className="text-lg font-headline">Start Paper 2 Now</CardTitle>
                    <CardDescription>We noticed you haven't started Paper 2. Why not give it a try?</CardDescription>
                </div>
                <Button className="ml-auto">Start Now</Button>
            </Card>
            <Card className="bg-muted/50 flex items-center p-6">
                <Sparkles className="h-8 w-8 text-muted-foreground mr-4" />
                <div>
                    <CardTitle className="text-lg font-headline">Finish your course</CardTitle>
                    <CardDescription>Only 3 lessons left in "Mastering the Essay"!</CardDescription>
                </div>
                <Button variant="secondary" className="ml-auto">Continue</Button>
            </Card>
        </div>
      </div>

    </div>
  );
}
