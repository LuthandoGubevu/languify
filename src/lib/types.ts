export type PracticePaperStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface PracticePaper {
  id: string;
  title: string;
  description: string;
  status: PracticePaperStatus;
  score?: number;
  totalQuestions: number;
  path: string;
}

export type QuestionType = 'multiple-choice' | 'essay';

export interface Question {
  id: string;
  questionText: string;
  type: QuestionType;
  options?: string[];
}

export interface Exam {
  id:string;
  title: string;
  questions: Question[];
  duration: number; // in minutes
}

export interface Feedback {
  examId: string;
  overallScore: number;
  scoreBreakdown: { section: string; score: number }[];
  questionFeedback: {
    questionId: string;
    studentAnswer: string;
    tutorComment: string;
    score: number;
  }[];
}

export interface Course {
    id: string;
    title: string;
    description: string;
    price: string;
    href: string;
}
