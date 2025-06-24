
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const extractG = `ISABEL: Eighteen years old. I think I want to be a writer. My favourite subject is English and my favourite sport, as you might have guessed, is hockey...

THAMI: Yes. What did you have for breakfast this morning?

ISABEL: Auntie, our maid, put down in front of me a plate of steaming, delicious Jungle Oats over which I sprinkled a crust of golden, brown sugar...

THAMI: Amos and Lilian Mbikwane. They’re in Cape Town. My mother is a domestic and my father works for the railways... 
I was sent to school here in the peaceful platteland because it is so much safer, you see, than the big city with all its temptations and troubles.`;

const extractH = `MR M: How many young souls do I have present this morning?  
There are a lot of well-aimed stray bullets flying around on the streets...  
Oh my children! I have no lessons that will be of use to you now...  
[Stones land in the classroom]  
THAMI: [Quietly] Stop ringing that bell, Mr M.  
MR M: Why? It’s only the school bell...  
THAMI: You are provoking the Comrades with it.  
MR M: No Thami. I am summoning the Comrades with it.`;

const questions = [
  {
    id: '4.1.1',
    extract: 'G',
    type: 'match',
    prompt: 'Match the descriptions in COLUMN B with the names in COLUMN A. Write only the letter (A–E) next to the question numbers (4.1.1(a) to 4.1.1(d)).',
    columnA: [
      { id: 'a', text: 'Mrs Makatini' },
      { id: 'b', text: 'Mr Myalatya' },
      { id: 'c', text: 'Thami Mbikwana' },
      { id: 'd', text: 'Isabel Dyson' },
    ],
    columnB: [
      { id: 'A', text: 'Organises a debating competition' },
      { id: 'B', text: 'Wins the debating competition' },
      { id: 'C', text: 'Vetkoek seller' },
      { id: 'D', text: 'Debating competition spectator' },
      { id: 'E', text: 'Abandons the literature quiz' },
    ],
    marks: 4,
  },
  { id: '4.1.2', extract: 'G', type: 'textarea', prompt: 'Describe the time and place where this extract is set.', marks: 2 },
  { id: '4.1.3', extract: 'G', type: 'text', prompt: 'What is Thami’s favourite sport?', marks: 1 },
  { id: '4.1.4', extract: 'G', type: 'radio', prompt: 'Choose the correct answer to complete the following sentence:\nAuntie lives in…', options: ['A) Cradock', 'B) Brakwater', 'C) Camdeboo', 'D) Cookhouse'], marks: 1 },
  { id: '4.1.5', extract: 'G', type: 'textarea', prompt: "Refer to: 'Mbikwana! [He clears his throat...]'\n(a) What tone does Thami use in these lines?\n(b) Why would he use this tone?", marks: 2 },
  { id: '4.1.6', extract: 'G', type: 'textarea', prompt: 'What do Isabel’s parents do for a living?', marks: 2 },
  { id: '4.1.7', extract: 'G', type: 'textarea', prompt: 'Explain the irony in Thami’s words:\n"I was sent to school here in the peaceful platteland..."', marks: 2 },
  { id: '4.1.8', extract: 'G', type: 'textarea', prompt: 'Thami is an exemplary pupil.\nDiscuss your view.', marks: 3 },
  { id: '4.2.1', extract: 'H', type: 'textarea', prompt: 'Why does Mr M say "this silence is so ... heavy"?', marks: 2 },
  { id: '4.2.2', extract: 'H', type: 'textarea', prompt: 'As a director, suggest 2 actions Mr M might take while saying:\n"Mr M and all his wonderful words are ... useless, useless, useless!"', marks: 2 },
  { id: '4.2.3', extract: 'H', type: 'textarea', prompt: 'What does Thami’s line “Stop ringing that bell, Mr M” reveal about his state of mind?', marks: 2 },
  { id: '4.2.4', extract: 'H', type: 'textarea', prompt: 'Refer to: "You once told me that it was almost as good as music..."\n(a) Identify the figure of speech. (1)\n(b) Explain why it\'s relevant. (2)', marks: 3 },
  { id: '4.2.5', extract: 'H', type: 'textarea', prompt: 'What does "No Thami. I am summoning the Comrades with it." reveal about Mr M’s character?', marks: 2 },
  { id: '4.2.6', extract: 'H', type: 'text', prompt: 'Change ONE word to make this statement TRUE:\n"Renee is Isabel’s sister."', marks: 1 },
  { id: '4.2.7', extract: 'H', type: 'textarea', prompt: 'Theme: Teamwork\nDiscuss this theme.', marks: 3 },
  { id: '4.2.8', extract: 'H', type: 'textarea', prompt: 'The debating contest is a good idea.\nDiscuss your view.', marks: 3 },
];

const totalQuestions = questions.length;

export function Grade12P2Q4Client() {
    const router = useRouter();
    const { toast } = useToast();
    const [answers, setAnswers] = useState<{ [key: string]: any }>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleAnswerChange = (id: string, value: any) => {
        setAnswers(prev => ({...prev, [id]: value}));
    };
    
    const handleMatchChange = (questionId: string, columnAId: string, columnBId: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: {
                ...(prev[questionId] || {}),
                [columnAId]: columnBId
            }
        }));
    };

    const handleSubmit = () => {
        console.log("Submitted Answers:", answers);
        toast({
            title: "Submission Successful!",
            description: "Your answers for 'My Children! My Africa!' have been saved.",
        });
        router.push('/grade-12/english-p2');
    };

    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">QUESTION 4: MY CHILDREN! MY AFRICA!</CardTitle>
                    <CardDescription>Read the extracts from the play below and answer the questions set on each. The number of marks allocated to each question serves as a guide to the expected length of your answer. NOTE: Answer the questions set on BOTH extracts, i.e., QUESTION 4.1 AND QUESTION 4.2. Total Marks: 35</CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                        You are on Question {currentQuestion.id} ({currentQuestionIndex + 1} of {totalQuestions})
                    </p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-semibold">📖 EXTRACT G</AccordionTrigger>
                        <AccordionContent className="whitespace-pre-wrap text-muted-foreground p-2">{extractG}</AccordionContent>
                    </AccordionItem>
                </Accordion>
                 <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-semibold">📖 EXTRACT H</AccordionTrigger>
                        <AccordionContent className="whitespace-pre-wrap text-muted-foreground p-2">{extractH}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            
            <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Question {currentQuestion.id}</CardTitle>
                        <CardDescription className="whitespace-pre-wrap">{currentQuestion.prompt}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {currentQuestion.type === 'match' && currentQuestion.columnA && currentQuestion.columnB && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold mb-2">COLUMN A</h4>
                                    <ul className="space-y-2">
                                        {currentQuestion.columnA.map(item => <li key={item.id}>{item.id}) {item.text}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">COLUMN B</h4>
                                    <ul className="space-y-2">
                                        {currentQuestion.columnB.map(item => <li key={item.id}>{item.id}. {item.text}</li>)}
                                    </ul>
                                </div>
                                <div className="md:col-span-2 mt-4">
                                     <Label className="font-bold">Your Answers</Label>
                                     <div className="space-y-4 mt-2">
                                     {currentQuestion.columnA.map(itemA => (
                                         <div key={itemA.id} className="p-4 border rounded-md">
                                             <Label className="mb-2 block font-semibold">{itemA.id}) {itemA.text}</Label>
                                             <RadioGroup 
                                                onValueChange={(value) => handleMatchChange(currentQuestion.id, itemA.id, value)}
                                                className="flex flex-wrap gap-4"
                                                value={answers[currentQuestion.id]?.[itemA.id] || ''}
                                             >
                                                {currentQuestion.columnB?.map(itemB => (
                                                    <div key={itemB.id} className="flex items-center space-x-2">
                                                        <RadioGroupItem value={itemB.id} id={`${itemA.id}-${itemB.id}`} />
                                                        <Label htmlFor={`${itemA.id}-${itemB.id}`}>{itemB.id}</Label>
                                                    </div>
                                                ))}
                                             </RadioGroup>
                                         </div>
                                     ))}
                                     </div>
                                </div>
                            </div>
                        )}
                        {currentQuestion.type === 'radio' && currentQuestion.options && (
                             <RadioGroup 
                                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                                value={answers[currentQuestion.id] || ''}
                                className="space-y-2"
                             >
                                 {currentQuestion.options.map(option => (
                                     <div key={option} className="flex items-center space-x-2">
                                         <RadioGroupItem value={option} id={`${currentQuestion.id}-${option}`} />
                                         <Label htmlFor={`${currentQuestion.id}-${option}`}>{option}</Label>
                                     </div>
                                 ))}
                             </RadioGroup>
                         )}
                        {currentQuestion.type === 'textarea' && (
                            <Textarea 
                                placeholder="Write your answer here..."
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                                rows={6}
                            />
                        )}
                        {currentQuestion.type === 'text' && (
                             <Input 
                                placeholder="Write your answer here..."
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                            />
                        )}
                         <p className="text-right font-bold text-muted-foreground">[{currentQuestion.marks} {currentQuestion.marks > 1 ? 'marks' : 'mark'}]</p>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="mt-6 flex justify-between items-center">
                <Button variant="outline" onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))} disabled={currentQuestionIndex === 0}>
                    Previous
                </Button>
                {currentQuestionIndex < totalQuestions - 1 ? (
                    <Button onClick={() => setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1))}>
                        Next
                    </Button>
                ) : (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="default">Save & Submit</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Ready to Submit?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    You are about to submit your answers for this section. You will not be able to make changes after submission.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleSubmit}>Confirm Submission</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>
        </div>
    );
}
