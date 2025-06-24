
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

const poemA = `From ocean’s wave a Wanderer came,
With visage tanned and dun:
His Mother, when he told his name,
Scarce knew her long-lost son;
So altered was his face and frame
By the ill course he had run.

There was hot fever in his blood,
And dark thoughts in his brain;
And oh! to turn his heart to good
That Mother strove in vain,
For fierce and fearful was his mood,
Racked by remorse and pain.

And if, at times, a gleam more mild
Would o’er his features stray,
When knelt the Widow near her Child,
And he tried with her to pray,
It lasted not – for visions wild
Still scared good thoughts away.

“There’s blood upon my hands!” he said,
“Which water cannot wash;
It was not shed where warriors bled—
It dropped from the gory lash,
As I whirled it o’er and o’er my head,
And with each stroke left a gash.

With every stroke I left a gash,
While Negro blood sprang high;
And now all ocean cannot wash
My soul from murder’s dye;
Nor e’en thy prayer, dear Mother, quash
That Woman’s wild death-cry!

Her cry is ever in my ear,
And it will not let me pray;
Her look I see – her voice I hear –
As when in death she lay,
And said, “With me thou must appear
On God’s great Judgment-day!”`;

const poemB = `Words are everywhere
daily
we read them, and they fly out
like nobody’s business when we are provoked …

but there’s always something hard to understand …

they are hard to find
when they are needed by the heart;
when the heart feels,
words hide like they are not part of life.

While words are busy playing some twisted game
my heart looks sadly through the glass windows
as the raindrops slowly slide down, gently
on a cloudy lifetime,
hoping that one day,
words will realize what my heart wants to say.`;


const questions = [
  {
    id: '6.1.1',
    extract: 'A',
    type: 'textarea',
    prompt: 'Complete the following sentences by using the words in the list below. Write only the word next to the question numbers (6.1.1(a) to 6.1.1(d)).\n\n(pain, judgment, remorse, vain, wanderer, mother)\n\n(a) The ... came from the ocean.\n(b) The man was in a bad mood, because he was racked with ... and pain.\n(c) The mother tried in ... to turn her son’s heart to good.\n(d) The slave woman said that the man must appear with her on God’s great ... day.',
    marks: 4,
  },
  { id: '6.1.2', extract: 'A', type: 'textarea', prompt: 'State TWO things that show that the man is not in good health.', marks: 2 },
  { id: '6.1.3', extract: 'A', type: 'textarea', prompt: 'Refer to stanza 3. Explain the irony in the phrase ‘good thoughts’.', marks: 2 },
  { id: '6.1.4', extract: 'A', type: 'radio', prompt: 'Choose the correct answer to complete the following sentence:\n\nIn line 20, ‘gory lash’ refers to a …', options: ['A) whip covered in blood.', 'B) journey that is filled with blood.', 'C) war that is bloody.', 'D) an infectious disease.'], marks: 1 },
  { id: '6.1.5', extract: 'A', type: 'textarea', prompt: 'Why is the Wanderer unable to pray?', marks: 2 },
  { id: '6.1.6', extract: 'A', type: 'text', prompt: 'Correct the following statement to be TRUE, by changing ONE word.\n\nGod will forgive the Wanderer for his sins.', marks: 1 },
  { id: '6.1.7', extract: 'A', type: 'textarea', prompt: 'One of the themes in ‘The Slave Dealer’ is guilt.\n\nDiscuss this theme.', marks: 3 },
  { id: '6.1.8', extract: 'A', type:textarea', prompt: 'In your opinion, can the mother of the Wanderer be pitied? Discuss your view.', marks: 3 },

  { id: '6.2.1', extract: 'B', type: 'textarea', prompt: 'Refer to lines 1–4 (‘Words are everywhere … we are provoked …’).\n(a) Explain what the speaker means in these lines.\n(b) What does this reveal about the speaker’s character?', marks: 3 },
  { id: '6.2.2', extract: 'B', type: 'text', prompt: 'What is the meaning of ‘we are provoked’ in line 4?', marks: 1 },
  { id: '6.2.3', extract: 'B', type: 'textarea', prompt: 'Refer to lines 6–9 (‘they are hard … part of life.’).\n(a) What tone would the speaker use in these lines?\n(b) Why is this tone appropriate?', marks: 2 },
  { id: '6.2.4', extract: 'B', type: 'textarea', prompt: 'Refer to lines 11–13 (‘my heart looks … cloudy lifetime,’).\n(a) Identify the figure of speech in these lines.\n(b) Explain why this figure of speech is relevant.', marks: 3 },
  { id: '6.2.5', extract: 'B', type: 'textarea', prompt: 'Explain what is meant by ‘twisted game’ (line 10).', marks: 2 },
  { id: '6.2.6', extract: 'B', type: 'radio', prompt: 'Which ONE of the following lines contains an example of alliteration?\nA) ‘when the heart feels,’\nB) ‘words hide like they are not part of life.’\nC) ‘While words are busy playing some twisted game’\nD) ‘as the raindrops slowly slide down, gently’', marks: 1 },
  { id: '6.2.7', extract: 'B', type: 'textarea', prompt: 'What is the speaker’s state of mind in this poem?', marks: 2 },
  { id: '6.2.8', extract: 'B', type: 'textarea', prompt: 'Do you agree that the title, ‘Hard to Find’, is relevant to the poem? Substantiate your answer.', marks: 3 },
];

const totalQuestions = questions.length;

export function Grade12P2PoetryClient() {
    const router = useRouter();
    const { toast } = useToast();
    const [answers, setAnswers] = useState<{ [key: string]: any }>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleAnswerChange = (id: string, value: any) => {
        setAnswers(prev => ({...prev, [id]: value}));
    };

    const handleSubmit = () => {
        console.log("Submitted Answers:", answers);
        toast({
            title: "Submission Successful!",
            description: "Your answers for the Poetry section have been saved.",
        });
        router.push('/grade-12/english-p2');
    };

    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">SECTION D: POETRY</CardTitle>
                    <CardDescription>In this section, you must answer the questions set on both the following poems: 'The Slave Dealer' and 'Hard to Find'. Total Marks: 35</CardDescription>
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
                        <AccordionTrigger className="text-lg font-semibold">📖 'The Slave Dealer' by Thomas Pringle</AccordionTrigger>
                        <AccordionContent className="whitespace-pre-wrap text-muted-foreground p-2">{poemA}</AccordionContent>
                    </AccordionItem>
                </Accordion>
                 <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-semibold">📖 'Hard to Find' by Sinesipo Jojo</AccordionTrigger>
                        <AccordionContent className="whitespace-pre-wrap text-muted-foreground p-2">{poemB}</AccordionContent>
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
