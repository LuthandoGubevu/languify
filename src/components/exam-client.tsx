'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { QuestionCard } from './question-card';
import type { Exam } from '@/lib/types';

const mockExam: Exam = {
  id: '2',
  title: 'TOEFL Reading Comprehension',
  duration: 60, // minutes
  questions: [
    { id: 'q1', type: 'essay', questionText: 'Summarize the passage about the industrial revolution in your own words. Focus on the main causes and effects discussed.' },
    { id: 'q2', type: 'essay', questionText: 'Based on the text, what can be inferred about the social changes that occurred during this period? Provide specific examples.' },
    { id: 'q3', type: 'essay', questionText: 'The author presents two viewpoints on the impact of technology. Which viewpoint do you find more convincing, and why? Support your answer with evidence from the passage.' },
  ],
};

export function ExamClient({ examId }: { examId: string }) {
  const router = useRouter();
  const [exam, setExam] = useState<Exam | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // In a real app, you would fetch the exam data based on examId
    setExam(mockExam);
    setTimeLeft(mockExam.duration * 60);
    setAnswers(new Array(mockExam.questions.length).fill(''));
  }, [examId]);

  useEffect(() => {
    if (!exam) return;

    if (timeLeft <= 0) {
      handleSubmit(true); // Force submit when time is up
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, exam]);
  
  // Autosave simulation
  useEffect(() => {
    if (answers.some(a => a.length > 0)) {
        const autosaveTimer = setTimeout(() => {
            console.log('Autosaving progress...');
        }, 5000);
        return () => clearTimeout(autosaveTimer);
    }
  }, [answers]);


  if (!exam) {
    return <div className="flex justify-center items-center h-screen">Loading exam...</div>;
  }
  
  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = (timeUp = false) => {
    console.log('Submitting exam:', answers);
    if(timeUp) {
        alert("Time's up! Your exam has been submitted automatically.");
    }
    router.push(`/feedback/${exam.id}`);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;
  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <div className="bg-card p-6 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-headline">{exam.title}</h1>
            <p className="text-muted-foreground">Complete all questions before the time runs out.</p>
          </div>
          <div className="flex items-center gap-2 text-lg font-semibold text-primary p-2 border rounded-md">
            <Clock className="h-5 w-5" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="mt-4">
          <Progress value={progress} />
        </div>
      </div>

      <QuestionCard 
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={exam.questions.length}
        answer={answers[currentQuestionIndex]}
        onAnswerChange={handleAnswerChange}
      />

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={goToPrevQuestion} disabled={currentQuestionIndex === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>

        <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Submit Exam</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You cannot make any changes after submitting. Make sure you have answered all questions to your satisfaction.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleSubmit()}>Submit</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {currentQuestionIndex === exam.questions.length - 1 ? null :
              <Button onClick={goToNextQuestion}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            }
        </div>
      </div>
    </div>
  );
}
