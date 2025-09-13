
import { allNotifications } from "@/lib/notifications-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NotificationItem from "@/components/notification-item";

export default function NotificationsPage() {
  return (
    <div className="container py-16 md:py-24 max-w-2xl">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-4xl">All Notifications</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {allNotifications.map((notification, index) => (
                        <NotificationItem notification={notification} key={index} />
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
