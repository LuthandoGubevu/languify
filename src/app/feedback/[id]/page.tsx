import { FeedbackClient } from '@/components/feedback-client';
import { use } from 'react';

export default function FeedbackPage({ params }: { params: { id: string } }) {
  const resolvedParams = use(params);
  return <FeedbackClient examId={resolvedParams.id} />;
}
