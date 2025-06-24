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

const extractI = `So I told him, I expected him to feel sorry for me and offer his help but instead he said:
'You cannot allow your home situation to control you. You have to control your situation.'
I was very angry. How could he say that? It was so easy for him to judge me when he lived in a nice house, drove a nice car and didn't worry about where his next meal was going to come from.
'But how?' was all I could manage to say to him.
'Focus,' he said, and that drove me up the wall.
'Sir I really think that I should leave now; it is one thing to act concerned but making a mockery of me is more that I am willing to take,' I said and walked towards the door.
'Thulisile wait ...' he said, but I kept on walking.
The following day I did not go to school, and I told myself that I was never going back.
I knew that Mr Nkwane would tell everybody about my situation and the last thing I wanted from them was their pity, because it was not going to feed me, put clothes on my back or even help me in getting my school work on track.
Besides the fact that I was poor didn't mean that I didn't have pride.`;

const extractJ = `'Oh, he's no trouble,' Sejosenye would reply.
They began to laugh at his third phase. Almost overnight he turned into a tall spindly-legged, graceful gazelle with large, grave eyes.
There was an odd, musical lilt to his speech and when he teased, or was up to mischief, he moved his head on his long thin neck from side to side like a cobra.
It was he who became the king of kings of all the boys in his area; he could turn his hand to anything and made the best wire cars with their wheels of shoe-polish tins.
All his movements were neat, compact, decisive, and for his age he was a boy who knew his own mind.
They laughed at his knowingness and certainty on all things, for he was like the grandmother who had had a flaming youth all her own too.
Sejosenye had scandalised the whole village in her days of good morals by leaving her own village ward to live with a married man in Ga-Sefete-Molemo ward.
She had won him from his wife and married him and then lived down the scandal in the way only natural queens can.
Even in old age, she was still impressive. She sailed through the village, head in the air, with a quiet, almost expressionless face.`;


const questions = [
  {
    id: '5.1.1',
    extract: 'I',
    type: 'match',
    prompt: 'Match the descriptions in COLUMN B with the names in COLUMN A. Write only the letter (A–E) next to the question numbers.',
    columnA: [
      { id: 'a', text: 'Thulisile' },
      { id: 'b', text: 'Principal' },
      { id: 'c', text: 'Mr Nkwane' },
      { id: 'd', text: 'Gogo' },
    ],
    columnB: [
      { id: 'A', text: 'is a responsible person' },
      { id: 'B', text: 'is an orphan' },
      { id: 'C', text: 'is a sympathetic person' },
      { id: 'D', text: 'is a caring teacher' },
      { id: 'E', text: 'is a judgemental person' },
    ],
    marks: 4,
  },
  { id: '5.1.2', extract: 'I', type: 'textarea', prompt: 'Describe the time and place where this extract is set.', marks: 2 },
  { id: '5.1.3', extract: 'I', type: 'textarea', prompt: 'Refer to line 3 ("I was very...nice car"). State TWO challenges that Thulisile faces.', marks: 2 },
  { id: '5.1.4', extract: 'I', type: 'textarea', prompt: 'Explain the expression, "that drove me up the wall" (line 6), in the context of the extract.', marks: 2 },
  { id: '5.1.5', extract: 'I', type: 'textarea', prompt: 'Explain the irony in Thulisile not wanting pity from others (line 15).', marks: 2 },
  { id: '5.1.6', extract: 'I', type: 'textarea', prompt: 'One of the themes in "Triumph in the Face of Adversity" is kindness. Discuss this theme.', marks: 3 },
  { id: '5.1.7', extract: 'I', type: 'textarea', prompt: 'In your opinion, is Thulisile a good role model? Discuss your view.', marks: 3 },

  { id: '5.2.1', extract: 'J', type: 'textarea', prompt: 'Refer to line 1 ("\'Oh, he\'s no trouble,\' Sejosenye would reply."). Explain Sejosenye\'s state of mind in this line.', marks: 2 },
  { id: '5.2.2', extract: 'J', type: 'text', prompt: 'To whom does "They" (line 2) refer?', marks: 1 },
  { id: '5.2.3', extract: 'J', type: 'radio', prompt: 'Choose the correct answer to complete the following sentence: Friedman\'s transformation into a "graceful gazelle" means he...', options: ['A) became shy and withdrawn.', 'B) became clumsy and awkward.', 'C) grew tall and graceful quickly.', 'D) started playing with gazelles.'], marks: 1 },
  { id: '5.2.4', extract: 'J', type: 'textarea', prompt: '(a) Identify the figure of speech in "he moved his head on his long thin neck from side to side like a cobra" (lines 4-5).\n(b) Explain why this figure of speech is relevant.', marks: 3 },
  { id: '5.2.5', extract: 'J', type: 'textarea', prompt: '(a) What tone would be used in lines 6–8 ("It was he ... shoe-polish tins.")?\n(b) Why is this tone appropriate?', marks: 2 },
  { id: '5.2.6', extract: 'J', type: 'textarea', prompt: 'Explain the significance of Friedman’s name.', marks: 2 },
  { id: '5.2.7', extract: 'J', type: 'textarea', prompt: 'What do lines 15–16 ("Even in old age ... expressionless face.") reveal about Sejosenye’s character?', marks: 2 },
  { id: '5.2.8', extract: 'J', type: 'text', prompt: 'Correct the following statement to be TRUE by changing ONE word. "Friedman is the son of Robinson."', marks: 1 },
  { id: '5.2.9', extract: 'J', type: 'textarea', prompt: 'Do you think Friedman has a wonderful childhood? Discuss your view.', marks: 3 },
];

const totalQuestions = questions.length;

export function Grade12P2Q5Client() {
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
            description: "Your answers for 'Short Stories' have been saved.",
        });
        router.push('/grade-12/english-p2');
    };

    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">SECTION C: SHORT STORIES</CardTitle>
                    <CardDescription>Answer all the questions on the short stories that you have studied. NOTE: Answer the questions set on BOTH extracts, i.e. QUESTION 5.1 AND QUESTION 5.2. Total Marks: 35</CardDescription>
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
                        <AccordionTrigger className="text-lg font-semibold">📖 EXTRACT I: 'Triumph in the Face of Adversity'</AccordionTrigger>
                        <AccordionContent className="whitespace-pre-wrap text-muted-foreground p-2">{extractI}</AccordionContent>
                    </AccordionItem>
                </Accordion>
                 <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-semibold">📖 EXTRACT J: 'The Wind and a Boy'</AccordionTrigger>
                        <AccordionContent className="whitespace-pre-wrap text-muted-foreground p-2">{extractJ}</AccordionContent>
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
                             <div className="md:col-span-2 mt-4">
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
                                </div>
                                 <div className="space-y-4 mt-6">
                                 <Label className="font-bold">Your Answers</Label>
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
