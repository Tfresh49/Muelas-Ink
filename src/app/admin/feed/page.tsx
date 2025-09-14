
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

export default function AdminFeedPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
            <Newspaper className="h-8 w-8 text-primary" />
            <div>
                <CardTitle className="font-headline text-2xl">Manage Feed</CardTitle>
                <CardDescription>Post and manage updates to the author's feed.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This page is under construction. The content management interface for the feed will be available here soon.
        </p>
      </CardContent>
    </Card>
  );
}
