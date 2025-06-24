
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FilePen, BookUser, MessageSquare } from 'lucide-react';
import type { ActionItem } from '@/lib/types';
import { motion } from 'framer-motion';

interface ActionsPanelProps {
    items: ActionItem[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const getIconForType = (type: ActionItem['type']) => {
    switch(type) {
        case 'Feedback': return <FilePen className="h-5 w-5 text-blue-400" />;
        case 'Booking': return <BookUser className="h-5 w-5 text-amber-400" />;
        case 'Message': return <MessageSquare className="h-5 w-5 text-purple-400" />;
    }
}

export function ActionsPanel({ items }: ActionsPanelProps) {

  const renderItems = (type: ActionItem['type']) => {
    const filteredItems = items.filter(item => item.type === type);
    if (filteredItems.length === 0) {
        return <p className="text-sm text-muted-foreground text-center py-8">No {type.toLowerCase()} items.</p>
    }
    return (
        <div className="space-y-4">
            {filteredItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50">
                   <div className="flex-shrink-0">{getIconForType(item.type)}</div>
                   <div className="flex-grow">
                        <p className="font-semibold">{item.studentName}</p>
                        <p className="text-sm text-muted-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                   </div>
                   <Button variant="outline" size="sm">View</Button>
                </div>
            ))}
        </div>
    );
  }

  return (
    <motion.div 
        variants={cardVariants}
        whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.1)" }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Real-Time Actions</CardTitle>
                <CardDescription>Manage feedback, bookings, and messages.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="feedback" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="feedback">Feedback</TabsTrigger>
                    <TabsTrigger value="bookings">Bookings</TabsTrigger>
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                </TabsList>
                <TabsContent value="feedback" className="mt-4">
                    {renderItems('Feedback')}
                </TabsContent>
                <TabsContent value="bookings" className="mt-4">
                    {renderItems('Booking')}
                </TabsContent>
                <TabsContent value="messages" className="mt-4">
                    {renderItems('Message')}
                </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </motion.div>
  );
}
