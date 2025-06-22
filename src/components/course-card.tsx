import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Course } from '@/lib/types';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="relative h-40 w-full mb-4">
          <Image 
            src={`https://placehold.co/600x400.png`} 
            alt={course.title}
            data-ai-hint="online course" 
            fill 
            className="rounded-t-lg object-cover"
           />
        </div>
        <CardTitle className="font-headline">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Badge variant={course.price === 'Free' ? 'secondary' : 'default'}>
          {course.price}
        </Badge>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={course.href}>Start Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
