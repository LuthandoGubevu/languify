import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Question } from '@/lib/types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

export function QuestionCard({ question, questionNumber, totalQuestions, answer, onAnswerChange }: QuestionCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-headline">Question {questionNumber}</CardTitle>
          <span className="text-sm text-muted-foreground">
            {questionNumber} of {totalQuestions}
          </span>
        </div>
        <CardDescription className="pt-2 text-base">{question.questionText}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="answer">Your Answer</Label>
          <Textarea
            id="answer"
            placeholder="Type your response here..."
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            rows={10}
            className="text-base"
          />
        </div>
      </CardContent>
    </Card>
  );
}
