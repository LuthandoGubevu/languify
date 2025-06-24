
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpenCheck, Calendar, ArrowRight, Sparkles, CheckCircle, Clock, FileText, BarChart2 } from 'lucide-react';
import type { PracticePaper, TutorSession, Feedback, Task, PerformanceHistory } from '@/lib/types';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockPapers: PracticePaper[] = [
  { id: 'p1-2024', title: 'Grade 12 English P1', description: 'Comprehension practice.', status: 'Completed', score: 88, totalQuestions: 14, path: '/grade-12/english-p1', progress: 100 },
  { id: 'p2-2024', title: 'Grade 12 English P2', description: 'Poetry and Literature.', status: 'In Progress', totalQuestions: 20, path: '/grade-12/english-p2', progress: 45 },
  { id: 'p3-2024', title: 'Grade 12 English P3', description: 'Creative writing.', status: 'Not Started', totalQuestions: 10, path: '/grade-12/english-p3', progress: 0 },
];

const mockTasks: Task[] = [
    { id: 't1', title: 'Revise Macbeth Act 2', dueDate: 'Tomorrow', status: 'Not Started', href: '#' },
    { id: 't2', title: 'Submit Creative Writing piece', dueDate: '3 days', status: 'Submitted', href: '#' },
    { id: 't3', title: 'Review Paper 1 Feedback', dueDate: '1 day', status: 'Needs Revision', href: '#' },
];

const recentFeedback: (Omit<Feedback['questionFeedback'][0], 'studentAnswer' | 'score'> & { paper: string, date: string, status: 'Unread' | 'Reviewed' }) = {
    questionId: 'fb-1',
    paper: 'English Paper 1',
    tutorComment: 'Great work on the summary, but let\'s focus on improving your use of comparative language...',
    date: '2 days ago',
    status: 'Unread'
};

const performanceHistory: PerformanceHistory[] = [
    { name: 'Mar P1', score: 75 },
    { name: 'Apr P1', score: 82 },
    { name: 'May P1', score: 88 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.02, transition: { type: 'spring', stiffness: 300 }, boxShadow: "0px 10px 20px hsl(var(--primary-foreground) / 0.1)" },
};

export function DashboardClient() {
    const [upcomingSession, setUpcomingSession] = useState<TutorSession | null>(null);
    const [countdown, setCountdown] = useState('Loading...');
    const [sessionTime, setSessionTime] = useState('');

    useEffect(() => {
        // This effect runs only once on the client after the component mounts.
        // It prevents hydration errors by ensuring date calculations happen only in the browser.
        const sessionDate = new Date(new Date().getTime() + 2 * 60 * 60 * 1000 + 13 * 60 * 1000);
        const session = {
            id: 'session-1',
            title: 'Paper 2 Revision',
            date: sessionDate.toISOString(),
            status: 'Confirmed' as 'Confirmed',
        };
        setUpcomingSession(session);
        setSessionTime(sessionDate.toLocaleString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit' }));

        const timer = setInterval(() => {
            const now = new Date();
            const difference = sessionDate.getTime() - now.getTime();

            if (difference <= 0) {
                setCountdown('Session has started');
                clearInterval(timer);
                return;
            }

            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setCountdown(`${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl space-y-8">
        
      {/* Hero Banner */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="relative rounded-2xl bg-primary/10 border border-primary/20 p-6 sm:p-8 text-foreground overflow-hidden"
       >
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold font-headline">🔥 Master Grade 12 English in 30 Days</h1>
          <p className="mt-2 text-muted-foreground">Includes Paper 1–3 Video & Practice Resources</p>
          <Button asChild className="mt-4 font-bold group">
            <Link href="/courses">
                Explore Courses <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                        <CardDescription>Your practice papers and submission history.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                       {mockPapers.map(paper => (
                           <div key={paper.id} className="p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                               <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                                   <p className="font-semibold">{paper.title}</p>
                                   <div className="flex items-center gap-2">
                                    {paper.status === 'Completed' && <Badge variant="secondary">Score: {paper.score}%</Badge>}
                                    <Badge variant={paper.status === 'Completed' ? 'default' : 'outline'}>{paper.status}</Badge>
                                   </div>
                               </div>
                               {paper.progress !== undefined && paper.progress < 100 && (
                                   <Progress value={paper.progress} className="my-2" />
                               )}
                               <div className="flex justify-end gap-2 mt-2">
                                {paper.status === 'Completed' ? (
                                    <Button variant="outline" size="sm" asChild><Link href={`/feedback/${paper.id}`}>View Feedback</Link></Button>
                                ) : (
                                    <Button size="sm" asChild><Link href={paper.path}>{paper.status === 'Not Started' ? 'Start Exam' : 'Continue'}</Link></Button>
                                )}
                               </div>
                           </div>
                       ))}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Your Tasks */}
             <motion.div variants={cardVariants} whileHover="hover">
                <Card className="h-full flex flex-col rounded-2xl shadow-sm transition-shadow">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary"/>Your Tasks</CardTitle>
                        <CardDescription>Action items and assignments from your tutor.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                       {mockTasks.map(task => (
                           <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                               <div>
                                   <p className="font-semibold">{task.title}</p>
                                   <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                               </div>
                               <div className="flex items-center gap-2">
                                <Badge variant="secondary">{task.status}</Badge>
                                <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowRight className="h-4 w-4"/></Button>
                               </div>
                           </div>
                       ))}
                    </CardContent>
                </Card>
            </motion.div>
        </div>

        {/* Side Column */}
        <div className="lg:col-span-1 space-y-6">
            {/* My Performance */}
            <motion.div variants={cardVariants} whileHover="hover">
                 <Card className="h-full flex flex-col rounded-2xl shadow-sm transition-shadow">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><BarChart2 className="h-5 w-5 text-primary"/>My Performance</CardTitle>
                        <CardDescription>Your recent exam scores and feedback.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                        <div>
                            <h4 className="text-sm font-semibold mb-2">Score History (Paper 1)</h4>
                            <ResponsiveContainer width="100%" height={150}>
                                <LineChart data={performanceHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" fontSize={12} />
                                    <YAxis fontSize={12}/>
                                    <Tooltip contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        borderColor: 'hsl(var(--border))',
                                    }}/>
                                    <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-2 pt-2">
                             <h4 className="text-sm font-semibold">Latest Feedback</h4>
                             <div className="p-3 rounded-lg border">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-semibold text-sm">{recentFeedback.paper}</p>
                                    <Badge variant={recentFeedback.status === 'Unread' ? 'destructive' : 'secondary'}>{recentFeedback.status}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground italic">"{recentFeedback.tutorComment}"</p>
                                <Button variant="link" size="sm" asChild className="p-0 h-auto mt-2">
                                    <Link href="#">View full review <ArrowRight className="ml-1 h-3 w-3"/></Link>
                                </Button>
                             </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
            
             {/* Tutor Sessions */}
            <motion.div variants={cardVariants} whileHover="hover">
                 <Card className="h-full flex flex-col rounded-2xl shadow-sm transition-shadow">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Calendar className="h-5 w-5 text-primary"/>Tutor Sessions</CardTitle>
                        <CardDescription>Your scheduled one-on-one sessions.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        {upcomingSession ? (
                            <div className="text-center p-4 border border-dashed rounded-lg">
                                <p className="font-semibold">{upcomingSession.title}</p>
                                <p className="text-2xl font-bold text-primary my-2">{countdown}</p>
                                <p className="text-sm text-muted-foreground">{sessionTime}</p>
                            </div>
                        ) : (
                             <div className="text-center p-4 border border-dashed rounded-lg flex items-center justify-center h-full min-h-[140px]">
                                <p className="text-muted-foreground">Loading session...</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="grid grid-cols-2 gap-2">
                        <Button variant="outline">Reschedule</Button>
                        <Button disabled={!upcomingSession || countdown === 'Session has started'}>Join Now</Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
      </motion.div>
      
      {/* Smart Recommendations */}
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Smart Recommendations</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div variants={cardVariants} whileHover="hover">
                <Card className="bg-primary/5 border-primary/20 flex flex-col sm:flex-row items-start sm:items-center p-6 gap-4">
                    <Sparkles className="h-8 w-8 text-primary mr-4 flex-shrink-0" />
                    <div className="flex-grow">
                        <CardTitle className="text-base sm:text-lg font-headline">Focus on Creative Writing</CardTitle>
                        <CardDescription>We noticed you haven't started Paper 3. Let's practice some creative prompts!</CardDescription>
                    </div>
                    <Button className="ml-auto mt-2 sm:mt-0 shrink-0">Start Now</Button>
                </Card>
            </motion.div>
             <motion.div variants={cardVariants} whileHover="hover">
                <Card className="bg-muted/50 flex flex-col sm:flex-row items-start sm:items-center p-6 gap-4">
                    <Sparkles className="h-8 w-8 text-muted-foreground mr-4 flex-shrink-0" />
                    <div className="flex-grow">
                        <CardTitle className="text-base sm:text-lg font-headline">Finish your course</CardTitle>
                        <CardDescription>Only 3 lessons left in "Mastering the Essay"!</CardDescription>
                    </div>
                    <Button variant="secondary" className="ml-auto mt-2 sm:mt-0 shrink-0">Continue</Button>
                </Card>
            </motion.div>
        </div>
      </div>

    </div>
  );
}
