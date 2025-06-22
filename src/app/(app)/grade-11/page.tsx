import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Grade11Page() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Grade 11 Resources</h1>
        <p className="text-muted-foreground">
          Exam papers and courses for Grade 11 will be available here soon.
        </p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">We're working hard to bring you Grade 11 content. Check back later!</p>
        </CardContent>
      </Card>
    </div>
  );
}
