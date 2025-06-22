'use client';
import type { Course } from '@/lib/types';
import { CourseCard } from './course-card';

const mockCourses: Course[] = [
    {
        id: '1',
        title: 'Mastering the Essay',
        description: 'A deep dive into writing compelling essays for Paper 3.',
        price: 'Free',
        href: '#',
    },
    {
        id: '2',
        title: 'Unlocking Shakespeare',
        description: 'Understand and analyze Shakespearean texts with ease.',
        price: 'R150',
        href: '#',
    },
    {
        id: '3',
        title: 'Poetry for Beginners',
        description: 'Learn the fundamentals of poetic analysis.',
        price: 'Free',
        href: '#',
    },
];

export function CoursesClient() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Courses</h1>
        <p className="text-muted-foreground">
          Interactive lessons to help you master key concepts.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
