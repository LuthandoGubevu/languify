'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Feedback, Exam } from '@/lib/types';
import { CheckCircle, XCircle } from 'lucide-react';

const mockExam: Exam = {
    id: '1',
    title: 'IELTS Academic Writing Task 1',
    duration: 20,
    questions: [
        { id: 'q1', type: 'essay', questionText: 'The chart below shows the changes in three different areas of crime in Manchester city centre from 2003-2012. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.' }
    ]
};

const mockFeedback: Feedback = {
  examId: '1',
  overallScore: 85,
  scoreBreakdown: [
    { section: 'Task Achievement', score: 80 },
    { section: 'Coherence', score: 90 },
    { section: 'Lexical Resource', score: 85 },
    { section: 'Grammar', score: 85 },
  ],
  questionFeedback: [
    {
      questionId: 'q1',
      studentAnswer: 'The graph shows crime in Manchester from 2003 to 2012. Burglary went down a lot. Theft was high but also went down. Robbery stayed low. Overall, crime decreased over the period.',
      tutorComment: 'Good summary of the main trends. To improve, try using more varied vocabulary (e.g., "declined significantly," "fluctuated before decreasing"). Also, include specific data points for the start and end of the period to support your claims. The overview is clear, but could be more developed.',
      score: 85,
    },
  ],
};

export function FeedbackClient({ examId }: { examId: string }) {
  // Fetch real data based on examId in a real app
  const exam = mockExam;
  const feedback = mockFeedback;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Feedback for: {exam.title}</h1>
        <p className="text-muted-foreground">Review your performance and read the tutor's comments to improve.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Overall Score</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-10">
            <div className="text-7xl font-bold text-primary">{feedback.overallScore}<span className="text-4xl text-muted-foreground">%</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Score Breakdown</CardTitle>
            <CardDescription>Performance by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={feedback.scoreBreakdown} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="section" width={100} tick={{ fontSize: 12 }} interval={0} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} />
                <Bar dataKey="score" fill="hsl(var(--primary))" barSize={20} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="font-headline">Detailed Feedback</CardTitle>
          <CardDescription>Review of each question and answer.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {exam.questions.map((question, index) => {
              const qFeedback = feedback.questionFeedback.find(f => f.questionId === question.id);
              if (!qFeedback) return null;
              
              const isGoodScore = qFeedback.score >= 75;

              return (
                <AccordionItem value={`item-${index}`} key={question.id}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-4">
                        {isGoodScore ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-destructive" />}
                        <span className="text-left font-semibold">Question {index + 1}: Score {qFeedback.score}%</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-medium">Question</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{question.questionText}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-medium">Your Answer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{qFeedback.studentAnswer || "No answer provided."}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-base font-medium text-primary">Tutor Feedback</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-primary/90">{qFeedback.tutorComment}</p>
                        </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
