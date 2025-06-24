
'use client';

import { motion } from 'framer-motion';
import { StatsOverview } from './admin/StatsOverview';
import { ExamEngagementChart } from './admin/ExamEngagementChart';
import { PerformanceTable } from './admin/PerformanceTable';
import { ActionsPanel } from './admin/ActionsPanel';
import type { StudentPerformance, EngagementData, PerformanceData, ActionItem } from '@/lib/types';


// MOCK DATA (to be replaced with live data from Firebase/Firestore)

const mockStudents: StudentPerformance[] = [
  { id: '1', name: 'Alice Johnson', grade: 92, examsCompleted: 5, lastActivity: '2 hours ago', status: 'Top Performer' },
  { id: '2', name: 'Bob Williams', grade: 78, examsCompleted: 4, lastActivity: '1 day ago', status: 'Average' },
  { id: '3', name: 'Charlie Brown', grade: 65, examsCompleted: 2, lastActivity: '5 days ago', status: 'At Risk' },
  { id: '4', name: 'Diana Miller', grade: 88, examsCompleted: 5, lastActivity: '3 hours ago', status: 'Average' },
  { id: '5', name: 'Ethan Davis', grade: 95, examsCompleted: 5, lastActivity: '1 hour ago', status: 'Top Performer' },
  { id: '6', name: 'Fiona Garcia', grade: 71, examsCompleted: 3, lastActivity: '2 days ago', status: 'Average' },
  { id: '7', name: 'George Rodriguez', grade: 58, examsCompleted: 1, lastActivity: '1 week ago', status: 'At Risk' },
];

const mockEngagementData: EngagementData[] = [
    { week: 'Week 1', p1: 40, p2: 24, p3: 20 },
    { week: 'Week 2', p1: 30, p2: 13, p3: 22 },
    { week: 'Week 3', p1: 50, p2: 68, p3: 29 },
    { week: 'Week 4', p1: 47, p2: 39, p3: 45 },
];

const mockPerformanceData: PerformanceData[] = [
    { name: 'Paper 1', avgScore: 78, fill: 'hsl(var(--chart-1))' },
    { name: 'Paper 2', avgScore: 65, fill: 'hsl(var(--chart-2))' },
    { name: 'Paper 3', avgScore: 72, fill: 'hsl(var(--chart-3))' },
];

const mockActionItems: ActionItem[] = [
    { id: 's1', type: 'Feedback', studentName: 'Charlie Brown', title: 'English Paper 1', date: '2 days ago' },
    { id: 's2', type: 'Feedback', studentName: 'George Rodriguez', title: 'Creative Writing', date: '1 day ago' },
    { id: 'b1', type: 'Booking', studentName: 'Fiona Garcia', title: '1-on-1 Session', date: 'Tomorrow at 2 PM' },
    { id: 'm1', type: 'Message', studentName: 'Alice Johnson', title: 'Question about Macbeth', date: '3 hours ago' },
];

export function AdminClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="container mx-auto p-4 md:p-8 max-w-7xl space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Hello Dumisa</h1>
        <p className="text-muted-foreground">Here’s a snapshot of your students' progress and platform activity.</p>
      </div>
      
      {/* Overview Cards */}
      <StatsOverview 
        totalStudents={125}
        activeStudents={88}
        avgCompletion={76}
        totalSubmissions={342}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            {/* Charts */}
            <ExamEngagementChart engagementData={mockEngagementData} performanceData={mockPerformanceData} />

            {/* Student Insights Table */}
            <PerformanceTable students={mockStudents} />
        </div>
        <div className="lg:col-span-1">
            {/* Actions Panel */}
            <ActionsPanel items={mockActionItems} />
        </div>
      </div>

    </motion.div>
  );
}
