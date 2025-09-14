
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function AdminAuthorPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
            <User className="h-8 w-8 text-primary" />
            <div>
                <CardTitle className="font-headline text-2xl">Author Profile</CardTitle>
                <CardDescription>Manage the author's public information.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This page is under construction. Soon, you will be able to edit the author's bio, avatar, and other profile details right here.
        </p>
      </CardContent>
    </Card>
  );
}
