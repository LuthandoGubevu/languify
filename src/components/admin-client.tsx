'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function AdminClient() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage exams and view student submissions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Actions</CardTitle>
          <CardDescription>
            This is a placeholder for admin functionalities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Future features like creating new exams, viewing results, and managing users will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
