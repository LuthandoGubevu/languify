
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle, PieChart, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.05, boxShadow: `0px 0px 15px ${color}` }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="overflow-hidden bg-card border-border/50 hover:border-primary/50 transition-all">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div style={{ color }}>{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface StatsOverviewProps {
    totalStudents: number;
    activeStudents: number;
    avgCompletion: number;
    totalSubmissions: number;
}

export function StatsOverview({ totalStudents, activeStudents, avgCompletion, totalSubmissions }: StatsOverviewProps) {
  const stats = [
    { title: 'Total Students', value: totalStudents, icon: <Users className="h-5 w-5" />, color: 'hsl(var(--chart-1))' },
    { title: 'Active Students (Today)', value: activeStudents, icon: <CheckCircle className="h-5 w-5" />, color: 'hsl(var(--chart-2))' },
    { title: 'Avg. Exam Completion', value: `${avgCompletion}%`, icon: <PieChart className="h-5 w-5" />, color: 'hsl(var(--chart-3))' },
    { title: 'Total Exams Submitted', value: totalSubmissions, icon: <FileText className="h-5 w-5" />, color: 'hsl(var(--chart-4))' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
