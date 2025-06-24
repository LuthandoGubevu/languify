'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Lock, ArrowRight, BookText } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  preferredDate: z.date({
    required_error: "A date is required.",
  }),
});

function Loader() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <BookText className="h-12 w-12 text-primary animate-pulse" />
            <p className="text-muted-foreground">Loading...</p>
        </div>
    )
}

export function BookTutorClient() {
  const { toast } = useToast();
  const { userProfile, loading } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Booking Submitted!",
      description: "We've received your request and will be in touch shortly.",
    });
    form.reset();
  }
  
  if (loading) {
    return (
        <div className="container mx-auto p-4 md:p-8 max-w-7xl h-full flex items-center justify-center">
            <Loader />
        </div>
    );
  }

  if (userProfile?.plan !== 'premium') {
      return (
        <div className="container mx-auto p-4 md:p-8 max-w-7xl flex items-center justify-center h-full">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="flex flex-col items-center gap-4">
                        <Lock className="h-8 w-8 text-primary" />
                        <span className="font-headline">Premium Feature</span>
                    </CardTitle>
                    <CardDescription>
                        Upgrade to Premium to schedule one-on-one tutor sessions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Button asChild>
                        <Link href="/#pricing">
                            Upgrade Your Plan <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      )
  }


  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
       <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Book a Tutor</h1>
        <p className="text-muted-foreground">
          Schedule a one-on-one session with one of our expert English tutors.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Booking Form</CardTitle>
            <CardDescription>Fill out the form to request a session.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject to focus on" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="paper-1">English Paper 1 (Comprehension)</SelectItem>
                          <SelectItem value="paper-2">English Paper 2 (Literature)</SelectItem>
                          <SelectItem value="paper-3">English Paper 3 (Writing)</SelectItem>
                          <SelectItem value="general">General Help</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preferred Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">Submit Request</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="bg-muted/30">
            <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Your scheduled tutoring sessions will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">No upcoming sessions.</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
