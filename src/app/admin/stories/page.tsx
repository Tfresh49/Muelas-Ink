
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookText } from "lucide-react";

export default function AdminStoriesPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
            <BookText className="h-8 w-8 text-primary" />
            <div>
                <CardTitle className="font-headline text-2xl">Manage Stories</CardTitle>
                <CardDescription>Create, edit, and delete stories.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This page is under construction. The content management interface for stories will be available here soon.
        </p>
      </CardContent>
    </Card>
  );
}
