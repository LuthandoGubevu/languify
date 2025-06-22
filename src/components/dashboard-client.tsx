'use client';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ArrowRight, Eye } from 'lucide-react';
import type { PracticePaper } from '@/lib/types';

const mockPapers: PracticePaper[] = [
  { id: 'p1-2024', title: 'Grade 12 English FAL P1 2024', description: 'Section A: Comprehension practice.', status: 'Not Started', totalQuestions: 14, path: '/grade-12/english-p1' },
  { id: 'p2-2024', title: 'Grade 12 English FAL P2 2024', description: 'Poetry and Literature analysis.', status: 'Not Started', totalQuestions: 20, path: '/grade-12/english-p2' },
  { id: 'p3-2024', title: 'Grade 12 English FAL P3 2024', description: 'Creative and transactional writing.', status: 'Not Started', totalQuestions: 10, path: '/grade-12/english-p3' },
];

const getStatusVariant = (status: PracticePaper['status']) => {
  switch (status) {
    case 'Completed': return 'default';
    case 'In Progress': return 'secondary';
    case 'Not Started': return 'outline';
    default: return 'default';
  }
};

export function DashboardClient() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Student Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here are your available practice papers.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPapers.map((paper) => (
          <Card key={paper.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="font-headline text-xl">{paper.title}</CardTitle>
                    <CardDescription>{paper.description}</CardDescription>
                  </div>
                <Badge variant={getStatusVariant(paper.status)} className="h-fit">{paper.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              {paper.status === 'Completed' && paper.score !== undefined && (
                <div>
                  <p className="text-sm font-medium mb-1">Your Score: {paper.score}%</p>
                  <Progress value={paper.score} className="w-full" />
                </div>
              )}
               {paper.status === 'In Progress' && (
                 <div>
                  <p className="text-sm font-medium mb-1">Progress</p>
                  <Progress value={33} className="w-full" />
                </div>
              )}
               {paper.status === 'Not Started' && (
                 <div className="text-sm text-muted-foreground">
                    {paper.totalQuestions} questions
                 </div>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                {paper.status === 'Completed' ? (
                  <Link href={`/feedback/${paper.id}`}>
                    <Eye className="mr-2 h-4 w-4" /> View Feedback
                  </Link>
                ) : (
                  <Link href={paper.path}>
                    {paper.status === 'In Progress' ? 'Continue' : 'Start Exam'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
