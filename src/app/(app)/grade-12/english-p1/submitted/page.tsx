import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function SubmissionConfirmationPage() {
  return (
    <div className="flex items-center justify-center min-h-full p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="flex flex-col items-center gap-4">
            <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500" />
            <span className="text-xl sm:text-2xl font-headline">Exam Submitted Successfully!</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">Your answers have been recorded.</p>
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
