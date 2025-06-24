import { ExamClient } from '@/components/exam-client';
import { use } from 'react';

export default function ExamPage({ params }: { params: { id: string } }) {
  const resolvedParams = use(params);
  return <ExamClient examId={resolvedParams.id} />;
}
