
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { StudentPerformance } from '@/lib/types';
import { motion } from 'framer-motion';

interface PerformanceTableProps {
    students: StudentPerformance[];
}

export function PerformanceTable({ students }: PerformanceTableProps) {
  const [filter, setFilter] = useState<'All' | 'Top Performer' | 'At Risk'>('All');

  const filteredStudents = students.filter(student => {
    if (filter === 'All') return true;
    return student.status === filter;
  });

  const getStatusBadge = (status: StudentPerformance['status']) => {
    switch (status) {
      case 'Top Performer':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30';
      case 'At Risk':
        return 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30';
      default:
        return 'secondary';
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div 
        variants={cardVariants}
        whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.1)" }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <Card>
        <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <CardTitle className="font-headline">Student Performance Snapshot</CardTitle>
                    <CardDescription>An overview of student grades and activity.</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Button variant={filter === 'All' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('All')}>All</Button>
                    <Button variant={filter === 'Top Performer' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('Top Performer')}>Top</Button>
                    <Button variant={filter === 'At Risk' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('At Risk')}>At Risk</Button>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                    <TableHead className="text-center">Exams Completed</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredStudents.map(student => (
                    <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell className="text-center">{student.grade}%</TableCell>
                        <TableCell className="text-center">{student.examsCompleted}</TableCell>
                        <TableCell className="text-muted-foreground">{student.lastActivity}</TableCell>
                        <TableCell>
                        <Badge variant="outline" className={cn('font-semibold', getStatusBadge(student.status))}>
                            {student.status}
                        </Badge>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
        </CardContent>
        </Card>
    </motion.div>
  );
}
