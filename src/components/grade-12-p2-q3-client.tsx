
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

const extractE = `MACBETH: What man dare, I dare!
Approach thou like the rugged Russian bear,
The armed rhinoceros, or the Hyrcan tiger.
Take any shape but that, and my firm nerves
Shall never tremble; or be alive again,
And dare me to the desert with thy sword.
If trembling I inhabit then, protest me
The baby of a girl. Hence, horrible shadow!
Unreal mockery, hence! Exit Ghost.
Why, so; being gone,
I am a man again. Pray you, sit still.
LADY M: You have displaced the mirth, broke the good meeting,
With most admired disorder.
MACBETH: Can such things be,
And overcome us like a summer's cloud,
Without our special wonder? You make me strange
Even to the disposition that I owe,
When now I think you can behold such sights,
And keep the natural ruby of your cheeks,
When mine is blanched with fear.
ROSS: What sights, my lord?
LADY M: I pray you, speak not. He grows worse and worse;
Question enrages him. At once, good night.
Stand not upon the order of your going,
But go at once.
LENNOX: Good night, and better health
Attend his majesty!`;

const extractF = `MACBETH: But get thee back; my soul is too much charged
With blood of thine already.
MACDUFF: I have no words.
My voice is in my sword, thou bloodier villain
Than terms can give thee out! They fight.
MACBETH: Thou losest labour.
As easy mayst thou the intrenchant air
With thy keen sword impress as make me bleed.
Let fall thy blade on vulnerable crests –
I bear a charmed life, which must not yield
To one of woman born!
MACDUFF: Despair thy charm,
And let the angel whom thou still hast served
Tell thee, Macduff was from his mother’s womb
Untimely ripped.
MACBETH: Accursèd be that tongue that tells me so,
For it hath cowed my better part of man!
And be these juggling fiends no more believed,
That palter with us in a double sense;
That keep the word of promise to our ear,
And break it to our hope. I’ll not fight with thee.
MACDUFF: Then yield thee, coward,
And live to be the show and gaze o’th’ time.
We’ll have thee, as our rarer monsters are,
Painted upon a pole, and underwrit,
‘HERE YOU MAY SEE THE TYRANT!’`;


const questions = [
  {
    id: '3.1.1',
    extract: 'E',
    type: 'match',
    prompt: 'Match the descriptions in COLUMN B with the names in COLUMN A. Write only the letter (A–E) next to the question numbers (3.1.1(a) to 3.1.1(d)).',
    columnA: [
      { id: 'a', text: 'Macbeth' },
      { id: 'b', text: 'Lady Macbeth' },
      { id: 'c', text: 'Ross' },
      { id: 'd', text: 'Ghost of Banquo' },
    ],
    columnB: [
      { id: 'A', text: 'expresses guilt' },
      { id: 'B', text: 'is a nobleman' },
      { id: 'C', text: 'is overcome by fear' },
      { id: 'D', text: 'experiences hallucinations' },
      { id: 'E', text: 'is the host' },
    ],
    marks: 4,
  },
  { id: '3.1.2', extract: 'E', type: 'text', prompt: 'Where does this scene take place?', marks: 1 },
  { id: '3.1.3', extract: 'E', type: 'textarea', prompt: 'Refer to lines 1–4 (‘What man dare … Shall never tremble’). Explain what Macbeth means in these lines.', marks: 2 },
  { id: '3.1.4', extract: 'E', type: 'radio', prompt: 'Choose the correct answer to complete the following sentence: The word, ‘hence’ (line 8) means...', options: ['go away', 'therefore', 'however', 'from now on'], marks: 1 },
  { id: '3.1.5', extract: 'E', type: 'textarea', prompt: 'What does Lady Macbeth’s tone in lines 11–12 (‘You have displaced … admired disorder’) reveal about her character?', marks: 2 },
  { id: '3.1.6', extract: 'E', type: 'textarea', prompt: 'Refer to lines 17–19 (‘When now I … blanched with fear’). (a) Identify the figure of speech in these lines. (b) Explain this figure of speech.', marks: 3 },
  { id: '3.1.7', extract: 'E', type: 'textarea', prompt: 'One of the themes in Macbeth is appearance versus reality. Discuss this theme as it is evident in this extract.', marks: 3 },
  { id: '3.1.8', extract: 'E', type: 'textarea', prompt: 'In your opinion, is Lady Macbeth’s behaviour towards her husband in this extract justifiable? Discuss your view.', marks: 3 },
  { id: '3.2.1', extract: 'F', type: 'textarea', prompt: 'Explain why Macduff says, ‘My voice is in my sword’ (line 3).', marks: 3 },
  { id: '3.2.2', extract: 'F', type: 'textarea', prompt: 'Refer to line 5 (‘As easy mayst … make me bleed’). What does Macbeth mean?', marks: 2 },
  { id: '3.2.3', extract: 'F', type: 'textarea', prompt: 'What is meant by, ‘I bear a charmed life’ (line 7)?', marks: 2 },
  { id: '3.2.4', extract: 'F', type: 'textarea', prompt: 'How does Macduff’s response in lines 9–11 (‘Despair thy charm … Untimely ripped’) crush Macbeth’s confidence?', marks: 2 },
  { id: '3.2.5', extract: 'F', type: 'text', prompt: 'Who are the ‘juggling fiends’ (line 14) to whom Macbeth refers?', marks: 1 },
  { id: '3.2.6', extract: 'F', type: 'textarea', prompt: 'Do you feel any sympathy for Macbeth at this point in the play? Discuss your view.', marks: 3 },
  { id: '3.2.7', extract: 'F', type: 'textarea', prompt: 'Discuss the suitability of the title, Macbeth.', marks: 3 },
];

const totalQuestions = questions.length;

export function Grade12P2Q3Client() {
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
            description: "Your answers for 'Macbeth' have been saved.",
        });
        router.push('/grade-12/english-p2');
    };

    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">SECTION B: DRAMA - Macbeth</CardTitle>
                    <CardDescription>Answer ALL the questions on the drama that you have studied. Read the extracts from the PLAY below and answer the questions set on each. The number of marks allocated to each question serves as a guide to the expected length of your answer. NOTE: Answer the questions set on BOTH extracts, i.e. QUESTION 3.1 AND QUESTION 3.2. Total Marks: 35</CardDescription>
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
                        <AccordionTrigger className="text-lg font-semibold">📖 EXTRACT E</AccordionTrigger>
                        <AccordionContent className="whitespace-pre-wrap text-muted-foreground p-2">{extractE}</AccordionContent>
                    </AccordionItem>
                </Accordion>
                 <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-semibold">📖 EXTRACT F</AccordionTrigger>
                        <AccordionContent className="whitespace-pre-wrap text-muted-foreground p-2">{extractF}</AccordionContent>
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
                        <CardDescription>{currentQuestion.prompt}</CardDescription>
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
