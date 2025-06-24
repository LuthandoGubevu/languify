import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PoetryPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">SECTION D: POETRY</h1>
        <p className="text-muted-foreground">
          Poetry questions will be available here soon.
        </p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">We're working hard to bring you the Poetry section. Check back later!</p>
        </CardContent>
      </Card>
    </div>
  );
}
