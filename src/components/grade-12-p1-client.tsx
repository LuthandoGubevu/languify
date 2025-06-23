
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
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
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

const textFContent = `AN ODE TO SOUTH AFRICA'S VIBRANT BRAAI CULTURE

1. South Africans enjoy a braai. Its the perfect occasion to enjoy the South African sunshine.
2. Simba teamed up with Chef Benny to create a brand-new flavour in chips. He wanted to capture the essense of the braai.
3. Chef Benny believe Simba’s Steakhouse Beef flavour is perfect for a braai.
4. 'It is a perfect filler before a braai,' he said. He describes this taste has a smoky beef flavour with sweet barbecue notes.
5. 'They roped me in as a chef who is synonymous with braai; I had to test it out,' he said. He often meets people that tell him they enjoy the new flavour.
6. 'Simba has created a delicious braai companion,' Giulia Iorio-Ndlovu, marketing director said. She added that the brand presents a flavour that bridges the gap between starters and braai. The new Steakhouse Beef stands out as distinct. Unlike the traditional Smoked Beef flavour, it boasts premium spices.

[Adapted from www.iol.co.za]`;

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

const questions_sec_c_q3 = [
  { id: '3.1', prompt: 'Choose the correct answer to complete the following sentence:\nThe ® next to the word Sinutab indicates that this is a … trademark.', type: 'radio', options: ['recorded', 'renewing', 'registered', 'recovering'], marks: 1 },
  { id: '3.2.1', prompt: 'To which need does the advertiser appeal?', type: 'text', marks: 1 },
  { id: '3.2.2', prompt: 'Explain the advertiser\'s intention in using the word, ‘yourself’.', type: 'textarea', marks: 2 },
  { id: '3.3', prompt: 'Why has the advertiser included the visual of the bottle and the box? Give TWO points.', type: 'textarea', marks: 2 },
  { id: '3.4', prompt: 'Quote TWO consecutive words from the text that indicate that this is not an oral treatment.', type: 'text', marks: 1 },
  { id: '3.5', prompt: "Provide a synonym for the word 'blocked' in the following sentence:\n“For a blocked nose caused by colds, use Sinutab.”", type: 'text', marks: 1 },
  { id: '3.6', prompt: 'Does the visual of the curved arrow support the message of the advertisement? Substantiate your answer.', type: 'textarea', marks: 2 },
];

const questions_sec_c_q4 = [
  { id: '4.1.1', prompt: "Choose the correct answer to complete the following sentence:\n\nIn the context of this cartoon, the words 'finally gave in' suggest that Mr Wilson is usually …", type: 'radio', options: ['obliging', 'stubborn', 'agreeable', 'unfriendly'], marks: 1 },
  { id: '4.1.2', prompt: "Identify the punctuation mark used in the following:\n\nWow!", type: 'text', marks: 1 },
  { id: '4.2', prompt: 'Explain why the visual is different in Frame 4. State TWO points.', type: 'textarea', marks: 2 },
  { id: '4.3', prompt: 'Explain how the cartoonist conveys that Mr Wilson is unhappy.\n\nRefer to ONE verbal and ONE visual clue in your answer.', type: 'textarea', marks: 2 },
  { id: '4.4', prompt: 'How does the cartoonist succeed in stereotyping Mr and Mrs Wilson as elderly? Make reference to BOTH Mr and Mrs Wilson.', type: 'textarea', marks: 2 },
  { id: '4.5', prompt: 'Do you think Mrs Wilson’s comment is humorous? Substantiate your answer.', type: 'textarea', marks: 2 },
];

const questions_sec_5_q5_1 = [
    { id: '5.1.1', prompt: 'Correct the SINGLE error in EACH of the following sentences. Write down only the question numbers (a) to (d) and the corrected words.\n(a) Its the perfect occasion to enjoy the South African sunshine.\n(b) Simba teamed up with Chef Benny to create a brand-new flavour in chips.\n(c) He wanted to capture the essense of the braai.\n(d) Chef Benny believe Simba’s Steakhouse Beef flavour is perfect for a braai.', marks: 4, type: 'textarea' },
    { id: '5.1.2', prompt: 'Complete the following tag question. Write down only the missing words.\n\n“It is a perfect filler before a braai, ___?”', marks: 1, type: 'text' },
    { id: '5.1.3', prompt: 'Rewrite the following sentence correctly:\n\n“He describes this taste has a smoky beef flavour with sweet barbecue notes.”', marks: 1, type: 'textarea' },
    { id: '5.1.4', prompt: 'Rewrite the following sentence in reported speech:\n\nChef Benny said, “They roped me in as a chef who is synonymous with braai.”', marks: 2, type: 'textarea' },
    { id: '5.1.5', prompt: 'Use a homophone for the word new in a sentence of your own.', marks: 2, type: 'textarea' },
    { id: '5.1.6', prompt: 'Rewrite the following sentence in the passive voice:\n\n“Simba has created a delicious braai companion.”', marks: 1, type: 'textarea' },
    { id: '5.1.7', prompt: 'Identify the part of speech for each of the underlined words in the sentence below:\n\n“She added that the brand presents a flavour that bridges the gap...”\n(a) the\n(b) flavour', marks: 2, type: 'textarea' },
    { id: '5.1.8', prompt: 'Rewrite the following sentence in the negative form:\n\n“The new Steakhouse Beef stands out as distinct.”', marks: 1, type: 'textarea' },
];

const questions_sec_5_q5_2 = [
  { id: '5.2.1', prompt: 'Combine the following sentences by using the words as well as:\n\nGoogle is the most visited website.\nGoogle is the most popular search engine.', marks: 2, type: 'textarea' },
  { id: '5.2.2', prompt: 'Give the correct form of the word in brackets:\n\nGoogle is the (create) of two university students, Larry Page and Sergey Brin.', marks: 1, type: 'text' },
  { id: '5.2.3', prompt: 'Give the correct degree of comparison in the following sentence:\n\nGoogle offers (many) services than any other search engine.', marks: 1, type: 'text' },
  { id: '5.2.4', prompt: 'Write the number ‘0’ in full.', marks: 1, type: 'text' },
  { id: '5.2.5', prompt: 'Rewrite the following sentence in the present continuous tense:\n\nI used Google for my research.', marks: 1, type: 'textarea' },
];


const allComprehensionQuestions = [...questions_part_a, ...questions_part_b];
const allSectionC_Q3_Questions = [...questions_sec_c_q3];
const allSectionC_Q4_Questions = [...questions_sec_c_q4];
const allSection5_Q5_1_Questions = [...questions_sec_5_q5_1];
const allSection5_Q5_2_Questions = [...questions_sec_5_q5_2];

const TEXT_A_QUESTIONS_COUNT = questions_part_a.length;
const COMPREHENSION_TEXT_B_STEP = 1 + TEXT_A_QUESTIONS_COUNT;
const COMPREHENSION_Q_B_START_STEP = COMPREHENSION_TEXT_B_STEP + 1;
const SUMMARY_STEP = COMPREHENSION_Q_B_START_STEP + questions_part_b.length;
const SECTION_C_AD_STEP = SUMMARY_STEP + 1;
const SECTION_C_Q3_START_STEP = SECTION_C_AD_STEP + 1;
const SECTION_C_CARTOON_STEP = SECTION_C_Q3_START_STEP + allSectionC_Q3_Questions.length;
const SECTION_C_Q4_START_STEP = SECTION_C_CARTOON_STEP + 1;
const SECTION_5_TEXT_F_STEP = SECTION_C_Q4_START_STEP + allSectionC_Q4_Questions.length;
const SECTION_5_Q5_1_START_STEP = SECTION_5_TEXT_F_STEP + 1;
const SECTION_5_TEXT_G_STEP = SECTION_5_Q5_1_START_STEP + allSection5_Q5_1_Questions.length;
const SECTION_5_Q5_2_START_STEP = SECTION_5_TEXT_G_STEP + 1;
const LAST_QUESTION_STEP = SECTION_5_Q5_2_START_STEP + allSection5_Q5_2_Questions.length - 1;
const TOTAL_STEPS = LAST_QUESTION_STEP + 1;

const imageIntroSteps = [
  COMPREHENSION_TEXT_B_STEP,
  SECTION_C_AD_STEP,
  SECTION_C_CARTOON_STEP,
  SECTION_5_TEXT_G_STEP,
];

const textIntroSteps = [
  SECTION_5_TEXT_F_STEP
];

const EXAM_DURATION = 120 * 60; // 120 minutes in seconds

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
    const savedAnswers = localStorage.getItem('p1Answers');
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
      localStorage.setItem('p1Answers', JSON.stringify(answers));
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
      const allQuestions = [
        ...allComprehensionQuestions,
        ...allSectionC_Q3_Questions,
        ...allSectionC_Q4_Questions,
        ...allSection5_Q5_1_Questions,
        ...allSection5_Q5_2_Questions
      ];
      const unansweredQuestions = allQuestions.filter(q => !answers[q.id]?.trim());

      if (unansweredQuestions.length > 0 || !summary.trim()) {
        toast({
          title: "Incomplete Exam",
          description: `Please answer all questions before submitting.`,
          variant: "destructive",
        });
        return;
      }
    }
    localStorage.removeItem('p1Answers');
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
            <CardTitle className="font-headline text-xl sm:text-2xl">Grade 12 English FAL Paper 1</CardTitle>
            <CardDescription className="text-foreground">This paper consists of three sections: Comprehension, Summary, and Language. You have 2 hours to complete it.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Button onClick={handleStartExam} size="lg" className="w-full md:w-auto">Start Exam</Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const progressValue = (step / LAST_QUESTION_STEP) * 100;

  let pageTitle: string;
  let totalMarks = 0;

 if (step > 0 && step < COMPREHENSION_TEXT_B_STEP) {
    const question = questions_part_a[step - 1];
    pageTitle = `Comprehension Question ${question.id}`;
    totalMarks = 30;
  } else if (step === COMPREHENSION_TEXT_B_STEP) {
    pageTitle = 'Comprehension Text B';
    totalMarks = 30;
  } else if (step >= COMPREHENSION_Q_B_START_STEP && step < SUMMARY_STEP) {
    const questionIndex = step - COMPREHENSION_Q_B_START_STEP;
    const question = questions_part_b[questionIndex];
    if (question) {
        pageTitle = `Comprehension Question ${question.id}`;
    } else {
        pageTitle = "Comprehension Question"
    }
    totalMarks = 30;
  } else if (step === SUMMARY_STEP) {
    pageTitle = 'Section B: Summary';
    totalMarks = 10;
  } else if (step === SECTION_C_AD_STEP) {
    pageTitle = 'Section C: Analysing an Advertisement';
    totalMarks = 10;
  } else if (step > SECTION_C_AD_STEP && step < SECTION_C_CARTOON_STEP) {
      const questionIndex = step - SECTION_C_Q3_START_STEP;
      const question = questions_sec_c_q3[questionIndex];
      pageTitle = `Language Question ${question.id}`;
      totalMarks = 10;
  } else if (step === SECTION_C_CARTOON_STEP) {
      pageTitle = 'Section C: Analysing a Cartoon';
      totalMarks = 10;
  } else if (step > SECTION_C_CARTOON_STEP && step < SECTION_5_TEXT_F_STEP) {
      const questionIndex = step - SECTION_C_Q4_START_STEP;
      const question = questions_sec_c_q4[questionIndex];
      pageTitle = `Language Question ${question.id}`;
      totalMarks = 10;
  } else if (step === SECTION_5_TEXT_F_STEP) {
      pageTitle = 'Section 5: Language and Editing Skills';
      totalMarks = 20;
  } else if (step > SECTION_5_TEXT_F_STEP && step < SECTION_5_TEXT_G_STEP) {
      const questionIndex = step - SECTION_5_Q5_1_START_STEP;
      const question = allSection5_Q5_1_Questions[questionIndex];
      pageTitle = `Language & Editing Question ${question.id}`;
      totalMarks = 20;
  } else if (step === SECTION_5_TEXT_G_STEP) {
      pageTitle = 'Section 5: Language and Editing Skills';
      totalMarks = 20;
  } else if (step > SECTION_5_TEXT_G_STEP && step <= LAST_QUESTION_STEP) {
      const questionIndex = step - SECTION_5_Q5_2_START_STEP;
      const question = allSection5_Q5_2_Questions[questionIndex];
      pageTitle = `Language & Editing Question ${question.id}`;
      totalMarks = 20;
  } else {
      pageTitle = 'Instructions';
  }

  const HeaderSection = () => {
    let currentImage: { src: string, alt: string, buttonText: string, width: number, height: number } | null = null;
    let showTextFSheet = false;

    if (step >= COMPREHENSION_TEXT_B_STEP && step < SUMMARY_STEP) {
        currentImage = { src: '/Text-B-Image.png', alt: 'Text B: The Benefits of Reading', buttonText: 'View Text B', width: 720, height: 1024 };
    } else if (step > SUMMARY_STEP && step < SECTION_C_CARTOON_STEP) {
        currentImage = { src: '/Text-D.png', alt: 'Sinutab Advertisement for Analysis', buttonText: 'View Text D', width: 1000, height: 1414 };
    } else if (step >= SECTION_C_CARTOON_STEP && step < SECTION_5_TEXT_F_STEP) {
        currentImage = { src: '/Text-E.png', alt: 'Cartoon for Analysis', buttonText: 'View Cartoon', width: 1000, height: 750 };
    } else if (step >= SECTION_5_Q5_1_START_STEP && step < SECTION_5_TEXT_G_STEP) {
        showTextFSheet = true;
    } else if (step >= SECTION_5_TEXT_G_STEP) {
        currentImage = { src: '/Text-g-image.png', alt: 'Text G for Analysis', buttonText: 'View Text G', width: 1000, height: 750 };
    }

    return (
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold font-headline">Grade 12 English FAL P1 2024</h1>
                <p className="text-muted-foreground">{pageTitle}</p>
              </div>
              <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-2 flex-wrap">
                {totalMarks > 0 && <Badge variant="secondary">Total Marks: {totalMarks}</Badge>}
                
                {step < SUMMARY_STEP && (
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
                )}

                {showTextFSheet && (
                    <Sheet>
                    <SheetTrigger asChild>
                        <Button className="bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 text-white hover:opacity-90 transition-all hover:shadow-lg">
                        <BookText className="mr-2 h-4 w-4" />
                        View Text F
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full sm:max-w-2xl overflow-y-auto">
                        <SheetHeader>
                        <SheetTitle>Text F</SheetTitle>
                        </SheetHeader>
                        <div className="py-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                        {textFContent}
                        </div>
                    </SheetContent>
                    </Sheet>
                )}

                {currentImage && !imageIntroSteps.includes(step) && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 text-white hover:opacity-90 transition-all hover:shadow-lg">
                                <BookText className="mr-2 h-4 w-4" />
                                {currentImage.buttonText}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-full sm:max-w-4xl p-0 border-none">
                            <DialogTitle className="sr-only">{currentImage.alt}</DialogTitle>
                            <Image
                                src={currentImage.src}
                                alt={currentImage.alt}
                                width={currentImage.width}
                                height={currentImage.height}
                                className="rounded-md w-full h-auto"
                            />
                        </DialogContent>
                    </Dialog>
                )}
                
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
  )};

  if (imageIntroSteps.includes(step)) {
    let imageSrc = '';
    let imageAlt = '';
    let title = '';
    let description = '';
    let dataAiHint = '';
    let width = 800;
    let height = 1131;

    switch(step) {
        case COMPREHENSION_TEXT_B_STEP:
            imageSrc = "/Text-B-Image.png";
            imageAlt = "The Benefits of Reading";
            title = "Text B: The Benefits of Reading";
            description = "Adapted from www.google.co.za";
            dataAiHint = "infographic benefits";
            width = 720;
            height = 1024;
            break;
        case SECTION_C_AD_STEP:
            imageSrc = "/Text-D.png";
            imageAlt = "Sinutab Advertisement for Analysis";
            title = "SECTION C: LANGUAGE – QUESTION 3: ANALYSING AN ADVERTISEMENT";
            description = "Study the advertisement (TEXT D) below and answer the set questions.";
            dataAiHint = "medicine advertisement";
            width = 800;
            height = 1131;
            break;
        case SECTION_C_CARTOON_STEP:
            imageSrc = "/Text-E.png";
            imageAlt = "Cartoon for Analysis";
            title = "SECTION C: LANGUAGE – QUESTION 4: ANALYSING A CARTOON";
            description = "Study the cartoon (TEXT E) below and answer the set questions.";
            dataAiHint = "comic strip";
            width = 800;
            height = 600;
            break;
        case SECTION_5_TEXT_G_STEP:
            imageSrc = "/Text-g-image.png";
            imageAlt = "Text G for Analysis";
            title = "SECTION C: LANGUAGE – QUESTION 5: LANGUAGE AND EDITING SKILLS";
            description = "Study the text (TEXT G) below and answer the set questions.";
            dataAiHint = "text passage";
            width = 800;
            height = 600;
            break;
    }

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
                    <CardTitle className="font-headline text-xl">{title}</CardTitle>
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="relative w-full max-w-2xl cursor-zoom-in group">
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    data-ai-hint={dataAiHint}
                                    width={width}
                                    height={height}
                                    className="rounded-md w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                                    <ZoomIn className="h-12 w-12 text-white" />
                                </div>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-full sm:max-w-4xl p-0 border-none">
                            <DialogTitle className="sr-only">{imageAlt}</DialogTitle>
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                width={width}
                                height={height}
                                className="rounded-md w-full h-auto"
                            />
                        </DialogContent>
                    </Dialog>
                     {description && <p className="text-muted-foreground text-sm mt-4">{description}</p>}
                </CardContent>
            </Card>
            <div className="mt-6 flex justify-between">
                <Button onClick={handlePrev} variant="outline" className="transition-all hover:shadow-lg">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button onClick={handleNext} className="transition-all hover:shadow-lg">
                    Start Questions <ChevronRight className="ml-2 h-4 w-4" />
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

  if (textIntroSteps.includes(step)) {
    let title = '';
    let description = '';
    let textContent = '';

    if (step === SECTION_5_TEXT_F_STEP) {
      title = 'SECTION C: LANGUAGE – QUESTION 5: LANGUAGE AND EDITING SKILLS';
      description = 'Read the text (TEXT F) below and answer the set questions.';
      textContent = textFContent;
    }

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
            <CardTitle className="font-headline text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ScrollArea className="h-96 w-full rounded-md border p-4 whitespace-pre-wrap text-sm leading-relaxed">
              {textContent}
            </ScrollArea>
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
    if (step > 0 && step < COMPREHENSION_TEXT_B_STEP) {
      currentQuestion = questions_part_a[step - 1];
  } else if (step >= COMPREHENSION_Q_B_START_STEP && step < SUMMARY_STEP) {
      currentQuestion = questions_part_b[step - COMPREHENSION_Q_B_START_STEP];
  } else if (step > SECTION_C_AD_STEP && step < SECTION_C_CARTOON_STEP) {
      currentQuestion = questions_sec_c_q3[step - SECTION_C_Q3_START_STEP];
  } else if (step > SECTION_C_CARTOON_STEP && step < SECTION_5_TEXT_F_STEP) {
      currentQuestion = questions_sec_c_q4[step - SECTION_C_Q4_START_STEP];
  } else if (step > SECTION_5_TEXT_F_STEP && step < SECTION_5_TEXT_G_STEP) {
      currentQuestion = allSection5_Q5_1_Questions[step - SECTION_5_Q5_1_START_STEP];
  } else if (step > SECTION_5_TEXT_G_STEP && step <= LAST_QUESTION_STEP) {
      currentQuestion = allSection5_Q5_2_Questions[step - SECTION_5_Q5_2_START_STEP];
  }

  if (!currentQuestion) {
      return <div className="container mx-auto p-4 md:p-8 max-w-4xl">Loading...</div>
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
            <CardTitle className="font-headline text-lg md:text-xl">Question {currentQuestion.id}</CardTitle>
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
        
        {step === LAST_QUESTION_STEP ? (
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
