
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookText, MicVocal, Calendar, Clapperboard, Newspaper } from "lucide-react";

const stats = [
    { title: "Total Stories", value: "0", icon: BookText },
    { title: "Total Podcasts", value: "0", icon: MicVocal },
    { title: "Upcoming Events", value: "0", icon: Calendar },
    { title: "Total Reels", value: "0", icon: Clapperboard },
    { title: "Feed Items", value: "0", icon: Newspaper },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-headline text-3xl md:text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                Ready to be populated.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

       <Card className="mt-8">
        <CardHeader>
            <CardTitle>Welcome to the Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">
                This is your central hub for managing all content on Muelas Ink. Use the sidebar to navigate between sections. <br />
                To get started, you can add new stories, create events, post to the feed, and much more.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
