'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Clock, ChevronLeft, ChevronRight, BookText, ZoomIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

const comprehensionText = `
The words artificial intelligence (AI) seem to be on the tip of everyone's tongue lately. Once the subject of science fiction fantasies, AI is now a reality that is reshaping our world in profound ways. From the algorithms that recommend our next movie to the complex systems that can diagnose diseases, AI is fast becoming one of the most important technologies of our time. At its core, artificial intelligence is a branch of computer science that aims to create machines capable of intelligent behaviour. This includes learning, reasoning, problem-solving, perception, and language understanding.

Industries are using AI to streamline their operations, with manufacturing robots assembling products with precision and financial institutions using AI to detect fraudulent transactions. In Africa, AI is being used to address some of the continent's most pressing challenges, such as predicting crop yields to combat food insecurity and improving access to healthcare in remote areas. The impact of AI on businesses is also creating a demand for new skills, boosting economic change. A recent study found that companies that have integrated AI into their core business processes have seen a 270 per cent increase in their return on investment.

The future of AI is exciting and transforms the way we interact with technology. Imagine being able to design a professional-looking website simply by describing what you want, or having a personal assistant that can manage your schedule and anticipate your needs. Tools like ChatGPT, developed by OpenAI, allow you to have human-like 'conversations' to generate text, write code, or even compose music. Recently, a 'bold glamour' filter on social media has taken AI's ability to alter reality to a new level, using machine learning to create a flawless and almost undetectable new face for its users. This is different from previous filters that simply laid a new image over the existing one.

However, like any powerful tool, AI has its limitations and must be used responsibly. It is important to be aware of the potential biases in AI algorithms and to ensure that the technology is used in a way that is fair and equitable. As we continue to embrace AI, it is crucial that we do so with a critical eye, ensuring that it serves humanity in a positive and beneficial way.
`;

const summaryTextContent = `HOW TO GET ACTIVE

Being physically active is important for one's well-being. Keeping active does not have to be strenuous or time-consuming.

Regular walking can make a big difference to your overall health. A twenty-minute walk with your dog will not only make your pet happy, but it will also get your heart pumping.

Take every opportunity to move your feet and you will be surprised at how much more active you will be. It is as easy as pacing while you talk on your cellphone. If walking is not an option, consider cycling. When you cycle to work or school, it is not only good for your health, but also for the environment.

Make it a rule to always take the stairs instead of the escalator or lift. You do not have to climb twenty floors – even one or two floors will have you feeling stronger than before.

Jogging is another effective way of keeping physically active. You can choose to jog alone or in a group.

Housework is good exercise as well. You can get a real workout by mopping floors, cleaning windows and handwashing clothes.

Rethink the way you work. Instead of slumping in your office chair every day, remember to get up and stretch and take a few steps every half an hour.

Have a dance party. You can set one up in your home. Just dim the lights, play your favourite music and have fun. Dancing is a fantastic workout as it gets you moving.

Every bit counts!

[Adapted from https://magazines.dischem.co.za/]`;

const questions_part_a = [
  { id: '1.1.1', prompt: 'Why is artificial intelligence considered one of the most important technologies?', marks: 1, type: 'textarea' },
  { id: '1.1.2', prompt: "What do the words ‘science fiction fantasies’ suggest about the common perception of artificial intelligence?", marks: 2, type: 'textarea' },
  { id: '1.2.1', prompt: 'Using your OWN words, explain what artificial intelligence is. State TWO points.', marks: 2, type: 'textarea' },
  { id: '1.2.2', prompt: 'State TWO benefits of using artificial intelligence in industries.', marks: 2, type: 'textarea' },
  { id: '1.3', prompt: 'Identify TWO challenging areas that artificial intelligence addresses in Africa.', marks: 2, type: 'textarea' },
  { id: '1.4.1', prompt: 'Why is the following statement FALSE? Skills are no longer required to boost economic change due to the impact of artificial intelligence on businesses.', marks: 1, type: 'textarea' },
  { id: '1.4.2', prompt: 'Why does the writer refer to “270 per cent”? Give TWO reasons.', marks: 2, type: 'textarea' },
  { id: '1.5.1', prompt: 'What do the words “exciting” and “transforms” suggest about the use of AI?', marks: 2, type: 'textarea' },
  { id: '1.5.2', prompt: 'In your OWN words, explain how you can create a professional-looking website by using artificial intelligence.', marks: 2, type: 'textarea' },
  { id: '1.6', prompt: 'What do the words “allows you to have human-like ‘conversations’” suggest about ChatGPT? State TWO points.', marks: 2, type: 'textarea' },
  { id: '1.7', prompt: 'How does the bold glamour filter differ from previous filters?', marks: 1, type: 'textarea' },
  { id: '1.8.1', prompt: 'Quote ONE word which indicates that AI is not perfect.', marks: 1, type: 'textarea' },
  { id: '1.8.2', prompt: 'What advice does the writer give regarding the use of artificial intelligence? State TWO points.', marks: 2, type: 'textarea' },
  { id: '1.9', prompt: 'Discuss the suitability of the title, EMBRACING ARTIFICIAL INTELLIGENCE.', marks: 2, type: 'textarea' },
];

const questions_part_b = [
  { id: '1.10', prompt: 'Identify the suggested benefit of reading shown in visual 1. Give a reason for your answer.', marks: 2, type: 'textarea' },
  { id: '1.11', prompt: 'Refer to visual 4. What does the light bulb above the emoticon suggest about reading? Give a reason for your answer.', marks: 2, type: 'textarea' },
  { id: '1.12', prompt: 'In your opinion, is it easier to understand the visuals used in TEXT B or the written text in TEXT B? Substantiate your answer.', marks: 2, type: 'textarea' },
];

const questions_sec_c = [
  { id: '3.1', prompt: 'Choose the correct answer to complete the following sentence:\nThe ® next to the word Sinutab indicates that this is a … trademark.', type: 'radio', options: ['recorded', 'renewing', 'registered', 'recovering'], marks: 1 },
  { id: '3.2.1', prompt: 'To which need does the advertiser appeal?', type: 'text', marks: 1 },
  { id: '3.2.2', prompt: 'Explain the advertiser\'s intention in using the word, ‘yourself’.', type: 'textarea', marks: 2 },
  { id: '3.3', prompt: 'Why has the advertiser included the visual of the bottle and the box? Give TWO points.', type: 'textarea', marks: 2 },
  { id: '3.4', prompt: 'Quote TWO consecutive words from the text that indicate that this is not an oral treatment.', type: 'text', marks: 1 },
  { id: '3.5', prompt: "Provide a synonym for the word 'blocked' in the following sentence:\n“For a blocked nose caused by colds, use Sinutab.”", type: 'text', marks: 1 },
  { id: '3.6', prompt: 'Does the visual of the curved arrow support the message of the advertisement? Substantiate your answer.', type: 'textarea', marks: 2 },
];

const allComprehensionQuestions = [...questions_part_a, ...questions_part_b];

const TEXT_A_QUESTIONS_COUNT = questions_part_a.length;
const COMPREHENSION_TEXT_B_STEP = TEXT_A_QUESTIONS_COUNT + 1;
const COMPREHENSION_QUESTIONS_END_STEP = COMPREHENSION_TEXT_B_STEP + questions_part_b.length;
const SUMMARY_STEP = COMPREHENSION_QUESTIONS_END_STEP + 1;
const SECTION_C_AD_STEP = SUMMARY_STEP + 1;
const SECTION_C_START_STEP = SECTION_C_AD_STEP + 1;
const TOTAL_STEPS = SECTION_C_AD_STEP + questions_sec_c.length;

const EXAM_DURATION = 90 * 60; // 90 minutes in seconds

export function Grade12P1Client() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(0); // 0 is intro
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [summary, setSummary] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [examStarted, setExamStarted] = useState(false);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('comprehensionAnswers');
    const savedSummary = localStorage.getItem('summaryAnswer');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
    if (savedSummary) {
      setSummary(savedSummary);
      setWordCount(savedSummary.trim().split(/\s+/).filter(Boolean).length);
    }
  }, []);

  useEffect(() => {
    if (examStarted) {
      localStorage.setItem('comprehensionAnswers', JSON.stringify(answers));
      localStorage.setItem('summaryAnswer', summary);
    }
  }, [answers, summary, examStarted]);

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

  const handleSummaryChange = (value: string) => {
    setSummary(value);
    const words = value.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  };

  const handleStartExam = () => {
    setStep(1);
    setExamStarted(true);
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
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
      const unansweredComprehension = allComprehensionQuestions.filter(q => !answers[q.id]?.trim());
      const unansweredSectionC = questions_sec_c.filter(q => !answers[q.id]?.trim());
      if (unansweredComprehension.length > 0 || unansweredSectionC.length > 0 || !summary.trim()) {
        toast({
          title: "Incomplete Exam",
          description: `Please answer all questions before submitting.`,
          variant: "destructive",
        });
        return;
      }
    }
    localStorage.removeItem('comprehensionAnswers');
    localStorage.removeItem('summaryAnswer');
    router.push('/grade-12/english-p1/submitted');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (step === 0) {
    return (
      <motion.div 
        className="container mx-auto p-4 md:p-8 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">SECTION A: COMPREHENSION</CardTitle>
            <CardDescription className="text-foreground">Read the following passage carefully and then answer the questions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-72 w-full rounded-md border p-4">
              <div className="max-w-none text-foreground whitespace-pre-wrap text-sm leading-relaxed">
                  {comprehensionText}
              </div>
            </ScrollArea>
            <Button onClick={handleStartExam} size="lg" className="w-full md:w-auto">Start Questions</Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const progressValue = (step / TOTAL_STEPS) * 100;

  let pageTitle: string;
  let totalMarks = 0;

  if (step > 0 && step < SUMMARY_STEP) {
      const questionIndex = step <= TEXT_A_QUESTIONS_COUNT ? step - 1 : step - 2;
      const question = allComprehensionQuestions[questionIndex];
      pageTitle = `Comprehension Question ${question.id}`;
  } else if (step === SUMMARY_STEP) {
      pageTitle = 'Section B: Summary';
  } else if (step === SECTION_C_AD_STEP) {
      pageTitle = 'Section C: Advertisement Analysis';
      totalMarks = 10;
  } else if (step >= SECTION_C_START_STEP) {
      const questionIndex = step - SECTION_C_START_STEP;
      const question = questions_sec_c[questionIndex];
      pageTitle = `Language Question ${question.id}`;
      totalMarks = 10;
  } else {
      pageTitle = 'Instructions';
  }

  const HeaderSection = () => (
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold font-headline">Grade 12 English FAL P1 2024</h1>
                <p className="text-muted-foreground">{pageTitle}</p>
              </div>
              <div className="flex items-center gap-4">
                {totalMarks > 0 && <Badge variant="secondary">Total Marks: {totalMarks}</Badge>}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 text-white hover:opacity-90 transition-all hover:shadow-lg">
                      <BookText className="mr-2 h-4 w-4" />
                      View Comprehension
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:max-w-2xl overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Comprehension Passage</SheetTitle>
                    </SheetHeader>
                    <div className="py-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                      {comprehensionText}
                    </div>
                  </SheetContent>
                </Sheet>
                <div className="flex items-center gap-2 text-lg font-semibold text-primary p-2 border rounded-md">
                  <Clock className="h-5 w-5" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>
          </div>
          <div className="mt-4">
            <Progress value={progressValue} />
          </div>
        </CardHeader>
      </Card>
  );

  if (step === COMPREHENSION_TEXT_B_STEP) {
    return (
      <motion.div 
        className="container mx-auto p-4 md:p-8 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeaderSection />
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">Text B: The Benefits of Reading</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
             <div className="w-full max-w-[720px]">
                <Image
                    src="/Text-B-Image.png"
                    alt="The Benefits of Reading"
                    width={720}
                    height={1024}
                    className="rounded-md w-full h-auto"
                />
            </div>
            <p className="text-muted-foreground text-sm mt-4">Adapted from www.google.co.za</p>
          </CardContent>
        </Card>
        <div className="mt-6 flex justify-between">
          <Button onClick={handlePrev} variant="outline" className="transition-all hover:shadow-lg">
            <ChevronLeft className="mr-2" /> Previous
          </Button>
          <Button onClick={handleNext} className="transition-all hover:shadow-lg">
            Next <ChevronRight className="ml-2" />
          </Button>
        </div>
      </motion.div>
    );
  }

  if (step === SUMMARY_STEP) {
    return (
        <motion.div
            className="container mx-auto p-4 md:p-8 max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <HeaderSection />
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Section B: Summary – Question 2</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible defaultValue="instructions" className="w-full mb-4">
                        <AccordionItem value="instructions">
                            <AccordionTrigger className="text-base hover:no-underline">📘 Summary Instructions</AccordionTrigger>
                            <AccordionContent className="space-y-2 pl-2 text-muted-foreground">
                                <p>1. Your summary must be written in point form.</p>
                                <p>2. List your SEVEN points in full sentences, using no more than 70 words.</p>
                                <p>3. Number your sentences from 1 to 7.</p>
                                <p>4. Write only ONE point per sentence.</p>
                                <p>5. Use your OWN words as far as possible.</p>
                                <p>6. Indicate the total number of words you have used in brackets at the end of your summary.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Label className="font-bold mb-2 block">Text C</Label>
                    <ScrollArea className="h-72 w-full rounded-md border p-4 whitespace-pre-wrap text-sm leading-relaxed">
                        {summaryTextContent}
                    </ScrollArea>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Your Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="grid w-full gap-2 relative">
                                    <Textarea
                                        id="summary-answer"
                                        placeholder={`1. ...\n2. ...\n3. ...\n...\n7. ...\n(Total: ___ words)`}
                                        value={summary}
                                        onChange={(e) => handleSummaryChange(e.target.value)}
                                        rows={10}
                                        className="text-base transition focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-2"
                                    />
                                    <div className="text-right text-sm font-medium">
                                        <span className={wordCount > 70 ? 'text-destructive font-bold' : 'text-muted-foreground'}>
                                            Word Count: {wordCount} / 70
                                        </span>
                                        {wordCount > 70 && <span className="text-destructive font-bold ml-2">Word limit exceeded!</span>}
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Write one complete sentence per point. Use your own words.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardContent>
            </Card>

            <div className="mt-6 flex justify-between">
                <Button onClick={handlePrev} variant="outline" className="transition-all hover:shadow-lg">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button onClick={handleNext} className="transition-all hover:shadow-lg">
                    Next Section <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </motion.div>
    );
  }

  if (step === SECTION_C_AD_STEP) {
    return (
      <motion.div 
        className="container mx-auto p-4 md:p-8 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeaderSection />
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">SECTION C: LANGUAGE – QUESTION 3: ANALYSING AN ADVERTISEMENT</CardTitle>
            <CardDescription>Study the advertisement (TEXT D) below and answer the set questions.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative w-full max-w-lg cursor-zoom-in group">
                    <Image
                        src="/SectionC-TextD-Ad.jpg"
                        alt="Sinutab Advertisement for Analysis"
                        width={800}
                        height={1131}
                        className="rounded-md w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                        <ZoomIn className="h-12 w-12 text-white" />
                    </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 border-none">
                 <Image
                    src="/SectionC-TextD-Ad.jpg"
                    alt="Sinutab Advertisement for Analysis"
                    width={1000}
                    height={1414}
                    className="rounded-md w-full h-auto"
                />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        <div className="mt-6 flex justify-between">
          <Button onClick={handlePrev} variant="outline" className="transition-all hover:shadow-lg">
            <ChevronLeft className="mr-2" /> Previous
          </Button>
          <Button onClick={handleNext} className="transition-all hover:shadow-lg">
            Start Questions <ChevronRight className="ml-2" />
          </Button>
        </div>
      </motion.div>
    );
  }

  let currentQuestion: any;
  if (step > 0 && step <= COMPREHENSION_TEXT_B_STEP) {
      currentQuestion = allComprehensionQuestions[step - 1];
  } else if (step > COMPREHENSION_TEXT_B_STEP && step < SUMMARY_STEP) {
      currentQuestion = allComprehensionQuestions[step - 2];
  } else if (step >= SECTION_C_START_STEP && step <= TOTAL_STEPS) {
      currentQuestion = questions_sec_c[step - SECTION_C_START_STEP];
  }

  return (
    <motion.div 
      className="container mx-auto p-4 md:p-8 max-w-4xl"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      key={step}
      transition={{ duration: 0.3 }}
    >
      <HeaderSection />
      <Card>
        <CardHeader>
            <CardTitle className="font-headline text-xl">Question {currentQuestion.id}</CardTitle>
            <CardDescription className="pt-2 text-base text-foreground whitespace-pre-wrap">{currentQuestion.prompt}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-4">
            <Label htmlFor={`question-${currentQuestion.id}`} className="font-bold">
              Your Answer ({currentQuestion.marks} {currentQuestion.marks > 1 ? 'marks' : 'mark'})
            </Label>
            {currentQuestion.type === 'textarea' && (
                <Textarea
                  id={`question-${currentQuestion.id}`}
                  placeholder="Type your answer here..."
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  rows={8}
                  className="text-base transition focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-2"
                />
            )}
            {currentQuestion.type === 'text' && (
                <Input
                  id={`question-${currentQuestion.id}`}
                  placeholder="Type your answer here..."
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="text-base transition focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-2"
                />
            )}
            {currentQuestion.type === 'radio' && (
                <RadioGroup
                    value={answers[currentQuestion.id] || ''}
                    onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                    className="space-y-2"
                >
                    {currentQuestion.options.map((option: string) => (
                        <div key={option} className="flex items-center space-x-2 p-2 rounded-md border has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-muted">
                            <RadioGroupItem value={option} id={`${currentQuestion.id}-${option}`} />
                            <Label htmlFor={`${currentQuestion.id}-${option}`} className="flex-1 cursor-pointer">{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-between">
        <Button
          onClick={handlePrev}
          disabled={step === 1}
          variant="outline"
          className="transition-all hover:shadow-lg"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        
        {step === TOTAL_STEPS ? (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="default" className="transition-all hover:shadow-lg bg-green-600 hover:bg-green-700 text-white">
                       ✅ Submit Exam
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will conclude the exam. You cannot make changes after submitting.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleSubmit(false)}>Submit Exam</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        ) : (
             <Button onClick={handleNext} className="transition-all hover:shadow-lg">
                Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        )}
      </div>
    </motion.div>
  );
}
