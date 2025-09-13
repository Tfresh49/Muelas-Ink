
"use client";

import { Bell, BookHeart, MessageCircle, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Notification } from "@/lib/notifications-data";

const iconMap = {
    star: <Star className="h-6 w-6 text-yellow-500" />,
    comment: <MessageCircle className="h-6 w-6 text-blue-500" />,
    follower: <BookHeart className="h-6 w-6 text-red-500" />,
    update: <Bell className="h-6 w-6 text-primary" />,
}

export default function NotificationItem({ notification }: { notification: Notification }) {
    const icon = iconMap[notification.icon];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                    <div className="flex-shrink-0 mt-1">
                        {icon}
                    </div>
                    <div className="flex-grow">
                        <p className="font-semibold">{notification.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{notification.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-4">
                        {icon}
                        <DialogTitle className="font-headline text-2xl">{notification.title}</DialogTitle>
                    </div>
                </DialogHeader>
                <DialogDescription className="text-base text-foreground">
                    {notification.description}
                </DialogDescription>
                <p className="text-sm text-muted-foreground mt-4">{notification.time}</p>
            </DialogContent>
        </Dialog>
    )
}
