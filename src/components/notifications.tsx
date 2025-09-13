
"use client";

import { Bell, BookHeart, MessageCircle, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const notifications = [
    {
        icon: <Star className="h-6 w-6 text-yellow-500" />,
        title: "New Rating",
        description: "'The Whispering Woods' received a 5-star rating from Bookworm_88.",
        time: "5m ago",
    },
    {
        icon: <MessageCircle className="h-6 w-6 text-blue-500" />,
        title: "New Comment",
        description: "FantasyFanatic commented on 'Emberwing'.",
        time: "1h ago",
    },
    {
        icon: <BookHeart className="h-6 w-6 text-red-500" />,
        title: "New Follower",
        description: "Cyberpunk_Sam started following you.",
        time: "3h ago",
    },
    {
        icon: <Bell className="h-6 w-6 text-primary" />,
        title: "Story Update",
        description: "A new chapter of 'Chronos' Echo' has been released.",
        time: "1d ago",
    }
];

export default function Notifications() {
  return (
    <div>
        <div className="flex justify-between items-center mb-4">
             <h2 className="font-headline text-2xl font-bold">Notifications</h2>
             <Button variant="link" className="text-sm">Mark all as read</Button>
        </div>
        <div className="space-y-4">
            {notifications.map((notification, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary transition-colors">
                    <div className="flex-shrink-0">
                        {notification.icon}
                    </div>
                    <div className="flex-grow">
                        <p className="font-semibold">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-6 text-center">
            <Button variant="outline">View All Notifications</Button>
        </div>
    </div>
  );
}
