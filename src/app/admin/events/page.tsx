
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function AdminEventsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
            <Calendar className="h-8 w-8 text-primary" />
            <div>
                <CardTitle className="font-headline text-2xl">Manage Events</CardTitle>
                <CardDescription>Create and manage author events.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This page is under construction. The content management interface for events will be available here soon.
        </p>
      </CardContent>
    </Card>
  );
}
