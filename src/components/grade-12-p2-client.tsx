'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { List, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const sections = [
  { title: 'Cry, the Beloved Country', href: '/grade-12/english-p2/q1' },
  { title: 'Strange Case of Dr Jekyll and Mr Hyde', href: '#' },
  { title: 'Macbeth', href: '#' },
  { title: 'My Children! My Africa!', href: '#' },
  { title: 'Short Stories', href: '#' },
  { title: 'Poetry', href: '#' },
];

export function Grade12P2Client() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Do NOT attempt to read the entire question paper. Consult the TABLE OF CONTENTS and mark the numbers of the questions set on the texts you have studied this year.</p>
            <div>
              <h3 className="font-semibold text-foreground mb-2">SECTION BREAKDOWN</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>SECTION A: NOVEL (35 marks)</li>
                <li>SECTION B: DRAMA (35 marks)</li>
                <li>SECTION C: SHORT STORIES (35 marks)</li>
                <li>SECTION D: POETRY (35 marks)</li>
              </ul>
            </div>
            <p className="font-bold text-foreground">Answer TWO QUESTIONS in all, ONE from any TWO sections.</p>
            <p>Start each section on a NEW page. Spend about 50 minutes on each section. Write neatly and legibly.</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <List className="h-6 w-6" /> Table of Contents
            </CardTitle>
            <CardDescription>Choose ONE question from any TWO sections.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section, index) => (
              <Link href={section.href} key={index} passHref>
                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <span className="font-medium">{section.title}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </motion.div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
