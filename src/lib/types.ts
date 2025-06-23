export type PracticePaperStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface PracticePaper {
  id: string;
  title: string;
  description: string;
  status: PracticePaperStatus;
  score?: number;
  totalQuestions: number;
  path: string;
  progress?: number;
}

export type QuestionType = 'multiple-choice' | 'essay' | 'radio' | 'text' | 'textarea';

export interface Question {
  id: string;
  questionText: string;
  type: QuestionType;
  options?: string[];
  marks?: number;
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
    progress?: number;
}

export interface TutorSession {
    id: string;
    title: string;
    date: string;
    status: 'Confirmed' | 'Pending';
}

export interface Notification {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    time: string;
}
