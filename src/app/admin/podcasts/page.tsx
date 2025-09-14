
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MicVocal } from "lucide-react";

export default function AdminPodcastsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
            <MicVocal className="h-8 w-8 text-primary" />
            <div>
                <CardTitle className="font-headline text-2xl">Manage Podcasts</CardTitle>
                <CardDescription>Manage live and on-demand podcast episodes.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This page is under construction. The content management interface for podcasts will be available here soon.
        </p>
      </CardContent>
    </Card>
  );
}
