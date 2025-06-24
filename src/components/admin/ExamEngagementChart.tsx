
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import type { EngagementData, PerformanceData } from '@/lib/types';

interface ExamEngagementChartProps {
    engagementData: EngagementData[];
    performanceData: PerformanceData[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ExamEngagementChart({ engagementData, performanceData }: ExamEngagementChartProps) {
  return (
    <div className="space-y-8">
      <motion.div 
        variants={cardVariants}
        whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.1)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Exam Engagement Trends</CardTitle>
            <CardDescription>Weekly submission counts per exam paper.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Legend wrapperStyle={{fontSize: "14px"}}/>
                <Line type="monotone" dataKey="p1" name="Paper 1" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                <Line type="monotone" dataKey="p2" name="Paper 2" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                <Line type="monotone" dataKey="p3" name="Paper 3" stroke="hsl(var(--chart-5))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        variants={cardVariants}
        whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.1)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Exam Performance</CardTitle>
            <CardDescription>Average scores per exam paper.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--foreground))'
                  }}
                   cursor={{fill: 'hsl(var(--accent))'}}
                />
                <Bar dataKey="avgScore" name="Average Score" radius={[4, 4, 0, 0]} fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
