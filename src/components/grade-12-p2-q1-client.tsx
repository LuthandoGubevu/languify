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

const extractA = `A letter, Stephen.
The little girl came out of her reverie with a start. A letter, umfundisi.
A white man’s letter.
He took the letter with trembling hands. It was dirty. On the back of it, in a child’s sprawling hand, was written his name. He recognised the sprawling hand of the child of the woman who kept the store at Ndotsheni. The child was a Zulu, but she had been to the school of the white people at the place of the store and she could write the English letters. He turned the letter over, and saw the stamp. It had been posted in Johannesburg.
He put on his spectacles, and a friend who was with him, seeing his trembling hands, said, 'Let me open it for you, umfundisi.'
'Thank you, my friend.'
He opened it, and Stephen Kumalo said, 'Read it.'
So the friend read out the letter, 'The Mission House, Sophiatown, Johannesburg.' He paused. 'Have you a son there, umfundisi?'
'Yes, I have a son there.'
'Is it well with him?'
'It is not well with him,' said Kumalo. He looked at the letter. 'Go on, read on.'
[Cry, the Beloved Country, Chapter 2]`;

const extractB = `The small boy stood up and said, 'When I go, I shall not come back.'
'You will not? '
'I shall not.'
'I shall be lonely,' said the old man. 'There will be no one to visit me.'
He said it with a deep and moving simplicity. The small boy was deflected from his purpose. 'I shall write you a letter,' he said. 'A letter, eh? '
'I shall write you a letter.'
'Perhaps I shall not be able to read it.'
'I shall get someone to read it to you.'
'That will be a good thing,' said the old man. 'For I am lonely. And when you go, I shall be lonely.' He looked at the small boy with his deep and quiet eyes. 'You will be my second son.'
The small boy was silent. He picked up his book and opened it. He looked at his father from under his brows. Then he said, 'I do not know what you mean by that.'
'Did you not know that you had a brother?'
'I heard it,' said the small boy. 'But I did not know it.'
'He was a young man,' said Jarvis. 'But he is dead.'
[Cry, the Beloved Country, Chapter 25]`;


const questions = [
  {
    id: '1.1.1',
    extract: 'A',
    type: 'match',
    prompt: 'Match the descriptions in COLUMN B with the names in COLUMN A. Write only the letter (A–E) next to the question numbers (1.1.1(a) to 1.1.1(d)).',
    columnA: [
      { id: 'a', text: 'Johannesburg' },
      { id: 'b', text: 'Ndotsheni' },
      { id: 'c', text: 'Sophiatown' },
      { id: 'd', text: 'Stephen Kumalo' },
    ],
    columnB: [
      { id: 'A', text: 'The place where Stephen Kumalo lives' },
      { id: 'B', text: 'A priest' },
      { id: 'C', text: 'The place where the letter was posted' },
      { id: 'D', text: 'The child of the woman who kept the store' },
      { id: 'E', text: 'A place where the Mission House is situated' },
    ],
    marks: 4,
  },
  { id: '1.1.2', extract: 'A', type: 'text', prompt: 'Refer to lines 1–2 (‘A letter, Stephen. … A letter, umfundisi.’). Whose voice is heard in these lines?', marks: 1 },
  { id: '1.1.3', extract: 'A', type: 'textarea', prompt: 'Explain why Stephen Kumalo’s hands were ‘trembling’ (line 4). State TWO points.', marks: 2 },
  { id: '1.1.4', extract: 'A', type: 'textarea', prompt: 'Refer to line 11 (‘Have you a … there, umfundisi?’). What does the word, ‘umfundisi’ reveal about Stephen Kumalo? ', marks: 2 },
  { id: '1.1.5', extract: 'A', type: 'textarea', prompt: 'Refer to lines 13–14 (‘It is not … read on.’). What does Stephen Kumalo’s response suggest about his relationship with his son? State TWO points.', marks: 2 },
  { id: '1.1.6', extract: 'A', type: 'textarea', prompt: 'One of the themes in Cry, the Beloved Country is the suffering of the Black people. Discuss this theme as it is evident in this extract.', marks: 3 },
  { id: '1.1.7', extract: 'A', type: 'textarea', prompt: 'In your opinion, is Stephen Kumalo’s friend a caring person? Discuss your view.', marks: 3 },
  { id: '1.2.1', extract: 'B', type: 'text', prompt: 'To whom does ‘the small boy’ (line 1) refer?', marks: 1 },
  { id: '1.2.2', extract: 'B', type: 'text', prompt: 'Who is the ‘old man’ (line 4) mentioned in this extract?', marks: 1 },
  { id: '1.2.3', extract: 'B', type: 'textarea', prompt: 'Explain why the small boy is visiting the old man.', marks: 2 },
  { id: '1.2.4', extract: 'B', type: 'textarea', prompt: 'Refer to line 7 (‘I shall get … to read it to you.’). What does this line tell you about the old man?', marks: 2 },
  { id: '1.2.5', extract: 'B', type: 'textarea', prompt: 'Choose the correct answer to complete the following sentence: The word, ‘deflected’ in line 6 suggests that the small boy has been …', options: ['A) distracted', 'B) disturbed', 'C) delayed', 'D) destroyed'], isMcq: true, marks: 1 },
  { id: '1.2.6', extract: 'B', type: 'textarea', prompt: 'What impression do you have of the small boy? Substantiate your answer.', marks: 3 },
  { id: '1.2.7', extract: 'B', type: 'textarea', prompt: 'Discuss the suitability of the title, Cry, the Beloved Country, by referring to this extract and your knowledge of the novel as a whole.', marks: 4 },
];

const totalQuestions = questions.length;

export function Grade12P2Q1Client() {
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
            description: "Your answers for 'Cry, the Beloved Country' have been saved.",
        });
        router.push('/grade-12/english-p2');
    };

    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Cry, the Beloved Country</CardTitle>
                    <CardDescription>Answer all questions related to the extracts. Total Marks: 35</CardDescription>
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
                        <AccordionTrigger className="text-lg font-semibold">📖 EXTRACT A</AccordionTrigger>
                        <AccordionContent className="whitespace-pre-wrap text-muted-foreground p-2">{extractA}</AccordionContent>
                    </AccordionItem>
                </Accordion>
                 <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-semibold">📖 EXTRACT B</AccordionTrigger>
                        <AccordionContent className="whitespace-pre-wrap text-muted-foreground p-2">{extractB}</AccordionContent>
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
                                         <div key={itemA.id}>
                                             <Label className="mb-2 block">{itemA.id}) {itemA.text}</Label>
                                             <RadioGroup 
                                                onValueChange={(value) => handleMatchChange(currentQuestion.id, itemA.id, value)}
                                                className="flex flex-wrap gap-4"
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
                        {currentQuestion.type === 'textarea' && !currentQuestion.isMcq && (
                            <Textarea 
                                placeholder="Write your answer here..."
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                                rows={6}
                            />
                        )}
                         {currentQuestion.type === 'textarea' && currentQuestion.isMcq && currentQuestion.options && (
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
