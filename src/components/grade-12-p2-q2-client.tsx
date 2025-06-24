
'use client';

import { useState, useMemo } from 'react';
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

const extractC = `It was a week later that Mr Utterson was sitting by his fireside one evening after dinner, when he was surprised to receive a visit from Poole.
‘Bless me, Poole, what brings you here?’ he cried; and then taking a second look at him, ‘What ails you?’ he added; ‘is the doctor ill?’
‘Mr Utterson,’ said the man, ‘there is something wrong.’
‘Take a seat, and here is a glass of wine for you,’ said the lawyer. ‘Now, take your time, and tell me plainly what you want.’
‘You know the doctor’s ways, sir,’ replied Poole, ‘and how he shuts himself up. Well, he’s shut up again in the cabinet; and I don’t like it, sir – I wish I may die if I like it. Mr Utterson, sir, I’m afraid.’
‘Now, my good man,’ said the lawyer, ‘be explicit. What are you afraid of?’
‘I’ve been afraid for about a week,’ returned Poole, doggedly disregarding the question, ‘and I can bear it no more.’
The man’s appearance amply bore out his words; his manner was altered for the worse; and except for the moment when he had first announced his terror, he had not once looked the lawyer in the face. Even now, he sat with the glass of wine untasted on his knee, and his eyes directed to a corner of the floor. ‘I can bear it no more,’ he repeated.
‘Come,’ said the lawyer, ‘I see you have some good reason, Poole; I see there is something seriously amiss. Try to tell me what it is.’`;

const extractD = `‘My TRANSLATION. Dear Lanyon, you are one of my oldest friends; and although we may have differed at times on scientific questions, I cannot remember, at least on my side, any break in our affection. There was never a day when, if you had said to me, “Jekyll, my life, my honour, my reason, depend upon you,” I would not have sacrificed my left hand to help you. Lanyon, my life, my honour, my reason, are all at your mercy; if you fail me tonight, I am lost. You might suppose, after this preface, that I am going to ask you for something dishonourable to grant. Judge for yourself.
I want you to postpone all other engagements for tonight – aye, even if you were summoned to the bedside of an emperor; to take a cab, unless your carriage should be actually at the door; and with this letter in your hand for consultation, to drive straight to my house.`;

const questions = [
  {
    id: '2.1.1',
    extract: 'C',
    type: 'match',
    prompt: 'Match the descriptions in COLUMN B with the names in COLUMN A. Write only the letter (A–E) next to the question numbers (2.1.1(a) to 2.1.1(d)).',
    columnA: [
      { id: 'a', text: 'Carew' },
      { id: 'b', text: 'Jekyll' },
      { id: 'c', text: 'Enfield' },
      { id: 'd', text: 'Utterson' },
    ],
    columnB: [
      { id: 'A', text: 'transforms and shocks friends' },
      { id: 'B', text: 'minds his own business' },
      { id: 'C', text: 'is murdered by Hyde' },
      { id: 'D', text: 'witnesses the murder secretly' },
      { id: 'E', text: 'recognises the murder weapon' },
    ],
    marks: 4,
  },
  { id: '2.1.2', extract: 'C', type: 'textarea', prompt: 'Refer to lines 1−3 (‘It was a … is the doctor ill?’).\nExplain why Mr Utterson is relieved when Poole visits him.', marks: 2 },
  { id: '2.1.3(a)', extract: 'C', type: 'text', prompt: 'Correct the SINGLE error in the following sentence. Write down ONLY the question number and the correct word.\n\nPoole is offered a glass of whine by Mr Utterson.', marks: 1 },
  { id: '2.1.3(b)', extract: 'C', type: 'textarea', prompt: 'Refer to lines 6−7 (‘You know the … shuts himself up’). \nWhat does Jekyll’s state of mind reveal about his character?', marks: 2 },
  { id: '2.1.4', extract: 'C', type: 'radio_textarea', prompt: 'Identify the figure of speech in ‘I wish I may die’ (line 8). \nExplain the relevance of this figure of speech.', options: ['Simile', 'Metaphor', 'Hyperbole', 'Personification'], marks: 3 },
  { id: '2.1.5(a)', extract: 'C', type: 'text', prompt: 'Refer to line 11 (‘I’ve been afraid … it no more’).\nTo whom does ‘I’ refer?', marks: 1 },
  { id: '2.1.5(b)', extract: 'C', type: 'radio', prompt: 'Choose the correct answer to complete the following sentence:\n\nMr Utterson is a/an … person.\nA) generous\nB) honest\nC) loyal\nD) patient', marks: 1 },
  { id: '2.1.6', extract: 'C', type: 'textarea', prompt: 'Discuss the theme of secrecy as evident in this extract. Refer to the novel as a whole.', marks: 3 },
  { id: '2.2.1', extract: 'D', type: 'textarea', prompt: 'Refer to line 2 (‘although we may … on scientific questions’). \nWhere is Dr Jekyll when he writes this letter to Lanyon?', marks: 2 },
  { id: '2.2.2', extract: 'D', type: 'textarea', prompt: 'Explain why Dr Jekyll addresses this letter to Lanyon.', marks: 2 },
  { id: '2.2.3', extract: 'D', type: 'textarea', prompt: 'What tone would Dr Jekyll use in lines 4−6 (‘There was never … to help you’)?\nSubstantiate your answer.', marks: 2 },
  { id: '2.2.4', extract: 'D', type: 'radio', prompt: 'Choose the correct answer to complete the following sentence. The word ‘drawers’ refers to …\n\nA) clothing.\nB) artists.\nC) furniture.\nD) lawyers.', note: "Please answer based on your knowledge of the novel, as 'drawers' is not in this specific extract.", marks: 1 },
  { id: '2.2.5', extract: 'D', type: 'textarea', prompt: 'Why is the following statement FALSE?\nDr Jekyll is confident that Dr Lanyon will assist him.', marks: 1 },
  { id: '2.2.6', extract: 'D', type: 'textarea', prompt: 'Who is the messenger that Dr Jekyll sends to Dr Lanyon’s house? Give a reason for your answer.', marks: 2 },
  { id: '2.2.7', extract: 'D', type: 'textarea', prompt: 'Do you feel any sympathy for Dr Lanyon? Discuss your view.', marks: 3 },
  { id: '2.2.8', extract: 'D', type: 'textarea', prompt: 'Discuss the suitability of the title, Strange Case of Dr Jekyll and Mr Hyde, with reference to the novel as a whole.', marks: 3 },
];

const totalQuestions = questions.length;
const TOTAL_MARKS = 35;

export function Grade12P2Q2Client() {
    const router = useRouter();
    const { toast } = useToast();
    const [answers, setAnswers] = useState<{ [key: string]: any }>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const attemptedMarks = useMemo(() => {
        return questions.reduce((total, question) => {
            const answer = answers[question.id];
            if (answer) {
                 if (question.type === 'match' && typeof answer === 'object' && Object.values(answer).some(v => v)) {
                    return total + question.marks;
                 }
                 if(typeof answer === 'string' && answer.trim() !== '') {
                    return total + question.marks;
                 }
                 if(question.type === 'radio_textarea' && answer.radio && answer.text) {
                     return total + question.marks;
                 }
            }
            return total;
        }, 0);
    }, [answers]);

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

    const handleRadioTextChange = (id: string, field: 'radio' | 'text', value: string) => {
        setAnswers(prev => ({
            ...prev,
            [id]: {
                ...(prev[id] || {}),
                [field]: value,
            }
        }));
    };


    const handleSubmit = () => {
        console.log("Submitted Answers:", answers);
        toast({
            title: "Submission Successful!",
            description: "Your answers for 'Dr Jekyll and Mr Hyde' have been saved.",
        });
        router.push('/grade-12/english-p2');
    };

    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Strange Case of Dr Jekyll and Mr Hyde</CardTitle>
                    <CardDescription>
                        Read the extracts from the novel below and answer the questions set on each. The number of marks allocated to each question serves as a guide to the expected length of your answer.
                        NOTE: Answer the questions set on BOTH extracts, i.e., QUESTION 2.1 AND QUESTION 2.2.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={progress} className="w-full mb-2" />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>Question {currentQuestion.id} ({currentQuestionIndex + 1} of {totalQuestions})</span>
                        <span className="font-semibold">Attempted: {attemptedMarks}/{TOTAL_MARKS} Marks</span>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-semibold">📖 EXTRACT C</AccordionTrigger>
                        <AccordionContent className="whitespace-pre-wrap text-muted-foreground p-2">{extractC}</AccordionContent>
                    </AccordionItem>
                </Accordion>
                 <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-semibold">📖 EXTRACT D</AccordionTrigger>
                        <AccordionContent className="whitespace-pre-wrap text-muted-foreground p-2">{extractD}</AccordionContent>
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
                         {currentQuestion.note && <CardDescription className="mt-2 text-primary italic">{currentQuestion.note}</CardDescription>}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {currentQuestion.type === 'match' && currentQuestion.columnA && currentQuestion.columnB && (
                             <div className="md:col-span-2 mt-4">
                                 <div className="space-y-4 mt-2">
                                 {currentQuestion.columnA.map(itemA => (
                                     <div key={itemA.id} className="p-4 border rounded-md">
                                         <Label className="mb-2 block font-semibold">{itemA.id.toUpperCase()}) {itemA.text}</Label>
                                         <RadioGroup 
                                            onValueChange={(value) => handleMatchChange(currentQuestion.id, itemA.id, value)}
                                            value={answers[currentQuestion.id]?.[itemA.id]}
                                            className="flex flex-wrap gap-x-6 gap-y-2"
                                         >
                                            {currentQuestion.columnB?.map(itemB => (
                                                <div key={itemB.id} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={itemB.id} id={`${itemA.id}-${itemB.id}`} />
                                                    <Label htmlFor={`${itemA.id}-${itemB.id}`}>{itemB.id}) {itemB.text}</Label>
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
                        {currentQuestion.type === 'radio_textarea' && currentQuestion.options && (
                           <div className="space-y-4">
                                <RadioGroup
                                    onValueChange={(value) => handleRadioTextChange(currentQuestion.id, 'radio', value)}
                                    value={answers[currentQuestion.id]?.radio || ''}
                                    className="space-y-2"
                                >
                                    {currentQuestion.options.map(option => (
                                     <div key={option} className="flex items-center space-x-2">
                                         <RadioGroupItem value={option} id={`${currentQuestion.id}-${option}`} />
                                         <Label htmlFor={`${currentQuestion.id}-${option}`}>{option}</Label>
                                     </div>
                                    ))}
                                </RadioGroup>
                                <Textarea
                                    placeholder="Explain your answer..."
                                    value={answers[currentQuestion.id]?.text || ''}
                                    onChange={(e) => handleRadioTextChange(currentQuestion.id, 'text', e.target.value)}
                                    rows={4}
                                />
                           </div>
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
