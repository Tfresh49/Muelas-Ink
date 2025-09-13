
"use client";

import { Button } from "./ui/button";
import { allNotifications } from "@/lib/notifications-data";
import Link from "next/link";
import NotificationItem from "./notification-item";

export default function Notifications() {
  const recentNotifications = allNotifications.slice(0, 4);

  return (
    <div>
        <div className="flex justify-between items-center mb-4">
             <h2 className="font-headline text-2xl font-bold">Notifications</h2>
             <Button variant="link" className="text-sm">Mark all as read</Button>
        </div>
        <div className="space-y-2">
            {recentNotifications.map((notification, index) => (
                <NotificationItem notification={notification} key={index} />
            ))}
        </div>
        <div className="mt-6 text-center">
            <Button variant="outline" asChild>
                <Link href="/notifications">View All Notifications</Link>
            </Button>
        </div>
    </div>
  );
}
