
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";

export default function EditStoryPage({ params }: { params: { id: string } }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
            <Edit className="h-8 w-8 text-primary" />
            <div>
                <CardTitle className="font-headline text-2xl">Edit Story</CardTitle>
                <CardDescription>Editing story with ID: {params.id}</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This page is under construction. The form to edit this story will be available here soon.
        </p>
      </CardContent>
    </Card>
  );
}
