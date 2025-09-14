
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clapperboard } from "lucide-react";

export default function AdminReelsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
            <Clapperboard className="h-8 w-8 text-primary" />
            <div>
                <CardTitle className="font-headline text-2xl">Manage Reels</CardTitle>
                <CardDescription>Upload and manage short-form video reels.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This page is under construction. The content management interface for reels will be available here soon.
        </p>
      </CardContent>
    </Card>
  );
}
