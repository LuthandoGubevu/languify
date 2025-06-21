import { ExamClient } from '@/components/exam-client';

export default function ExamPage({ params }: { params: { id: string } }) {
  return <ExamClient examId={params.id} />;
}
