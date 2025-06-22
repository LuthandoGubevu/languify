import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Grade12P2Page() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Grade 12 English Paper 2</h1>
        <p className="text-muted-foreground">
          Poetry and Literature analysis practice.
        </p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">We're working hard to bring you Paper 2 content. Check back later!</p>
        </CardContent>
      </Card>
    </div>
  );
}
