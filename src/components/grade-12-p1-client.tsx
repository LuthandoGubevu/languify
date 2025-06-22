'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const comprehensionText = `
The words artificial intelligence (AI) seem to be on the tip of everyone's tongue lately. Once the subject of science fiction fantasies, AI is now a reality that is reshaping our world in profound ways. From the algorithms that recommend our next movie to the complex systems that can diagnose diseases, AI is fast becoming one of the most important technologies of our time. At its core, artificial intelligence is a branch of computer science that aims to create machines capable of intelligent behaviour. This includes learning, reasoning, problem-solving, perception, and language understanding.

Industries are using AI to streamline their operations, with manufacturing robots assembling products with precision and financial institutions using AI to detect fraudulent transactions. In Africa, AI is being used to address some of the continent's most pressing challenges, such as predicting crop yields to combat food insecurity and improving access to healthcare in remote areas. The impact of AI on businesses is also creating a demand for new skills, boosting economic change. A recent study found that companies that have integrated AI into their core business processes have seen a 270 per cent increase in their return on investment.

The future of AI is exciting and transforms the way we interact with technology. Imagine being able to design a professional-looking website simply by describing what you want, or having a personal assistant that can manage your schedule and anticipate your needs. Tools like ChatGPT, developed by OpenAI, allow you to have human-like 'conversations' to generate text, write code, or even compose music. Recently, a 'bold glamour' filter on social media has taken AI's ability to alter reality to a new level, using machine learning to create a flawless and almost undetectable new face for its users. This is different from previous filters that simply laid a new image over the existing one.

However, like any powerful tool, AI has its limitations and must be used responsibly. It is important to be aware of the potential biases in AI algorithms and to ensure that the technology is used in a way that is fair and equitable. As we continue to embrace AI, it is crucial that we do so with a critical eye, ensuring that it serves humanity in a positive and beneficial way.
`;

const questions = [
  { id: '1.1.1', prompt: 'Why is artificial intelligence considered one of the most important technologies?', marks: 1 },
  { id: '1.1.2', prompt: "What do the words ‘science fiction fantasies’ suggest about the common perception of artificial intelligence?", marks: 2 },
  { id: '1.2.1', prompt: 'Using your OWN words, explain what artificial intelligence is. State TWO points.', marks: 2 },
  { id: '1.2.2', prompt: 'State TWO benefits of using artificial intelligence in industries.', marks: 2 },
  { id: '1.3', prompt: 'Identify TWO challenging areas that artificial intelligence addresses in Africa.', marks: 2 },
  { id: '1.4.1', prompt: 'Why is the following statement FALSE? Skills are no longer required to boost economic change due to the impact of artificial intelligence on businesses.', marks: 1 },
  { id: '1.4.2', prompt: 'Why does the writer refer to “270 per cent”? Give TWO reasons.', marks: 2 },
  { id: '1.5.1', prompt: 'What do the words “exciting” and “transforms” suggest about the use of AI?', marks: 2 },
  { id: '1.5.2', prompt: 'In your OWN words, explain how you can create a professional-looking website by using artificial intelligence.', marks: 2 },
  { id: '1.6', prompt: 'What do the words “allows you to have human-like ‘conversations’” suggest about ChatGPT? State TWO points.', marks: 2 },
  { id: '1.7', prompt: 'How does the bold glamour filter differ from previous filters?', marks: 1 },
  { id: '1.8.1', prompt: 'Quote ONE word which indicates that AI is not perfect.', marks: 1 },
  { id: '1.8.2', prompt: 'What advice does the writer give regarding the use of artificial intelligence? State TWO points.', marks: 2 },
  { id: '1.9', prompt: 'Discuss the suitability of the title, EMBRACING ARTIFICIAL INTELLIGENCE.', marks: 2 },
];
const TOTAL_QUESTIONS = questions.length;
const EXAM_DURATION = 60 * 60; // 60 minutes in seconds

export function Grade12P1Client() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(0); // 0 is intro, 1-15 are questions
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [examStarted, setExamStarted] = useState(false);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('comprehensionAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('comprehensionAnswers', JSON.stringify(answers));
    }
  }, [answers]);

  useEffect(() => {
    if (!examStarted || timeLeft <= 0) {
      if (timeLeft <= 0 && examStarted) {
        toast({
          title: "Time's Up!",
          description: "Your exam has been submitted automatically.",
          variant: "destructive",
        });
        handleSubmit(true);
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [examStarted, timeLeft]);

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleStartExam = () => {
    setStep(1);
    setExamStarted(true);
  };

  const handleNext = () => {
    if (step < TOTAL_QUESTIONS) {
      setStep(step + 1);
    }
  };
  
  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (force = false) => {
    if (!force) {
      const unansweredQuestions = questions.filter(q => !answers[q.id]?.trim());
      if (unansweredQuestions.length > 0) {
        toast({
          title: "Incomplete Exam",
          description: `Please answer all questions before submitting. You have ${unansweredQuestions.length} remaining.`,
          variant: "destructive",
        });
        return;
      }
    }
    localStorage.removeItem('comprehensionAnswers');
    router.push('/grade-12/english-p1/submitted');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (step === 0) {
    return (
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">SECTION A: COMPREHENSION</CardTitle>
            <CardDescription className="text-foreground">Read the following passage carefully and then answer the questions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-w-none text-foreground whitespace-pre-wrap text-sm leading-relaxed">
                {comprehensionText}
            </div>
            <Button onClick={handleStartExam} size="lg" className="w-full md:w-auto">Start Questions</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[step - 1];
  const progress = (step / TOTAL_QUESTIONS) * 100;
  
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold font-headline">Grade 12 English FAL P1 2024</h1>
                <p className="text-muted-foreground">Question {step} of {TOTAL_QUESTIONS}</p>
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold text-primary p-2 border rounded-md">
                <Clock className="h-5 w-5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="font-headline text-xl">Question {currentQuestion.id}</CardTitle>
            <CardDescription className="pt-2 text-base text-foreground">{currentQuestion.prompt}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-2">
            <Label htmlFor={`question-${currentQuestion.id}`} className="font-bold">
              Your Answer ({currentQuestion.marks} {currentQuestion.marks > 1 ? 'marks' : 'mark'})
            </Label>
            <Textarea
              id={`question-${currentQuestion.id}`}
              placeholder="Type your answer here..."
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              rows={8}
              className="text-base"
            />
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-between">
        <Button
          onClick={handlePrev}
          disabled={step === 1}
          variant="outline"
        >
          <ChevronLeft className="mr-2" /> Previous
        </Button>

        {step < TOTAL_QUESTIONS ? (
          <Button onClick={handleNext}>
            Next <ChevronRight className="ml-2" />
          </Button>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Submit Exam</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
                <AlertDialogDescription>
                  Please ensure all questions are answered. You cannot make changes after submitting.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleSubmit(false)}>Submit</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}
