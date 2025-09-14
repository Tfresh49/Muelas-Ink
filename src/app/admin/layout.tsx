
"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Use the provided UID for secure admin access check.
  const isAdmin = user?.uid === "2GrdxGWNt0VEQqCpCDR4e8AcZG03";

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-center">
        <div className="flex flex-col items-center gap-4">
            <Shield className="h-12 w-12 text-destructive" />
            <h1 className="font-headline text-3xl">Access Denied</h1>
            <p className="text-muted-foreground max-w-sm">
                You do not have permission to view this page. This area is for administrators only.
            </p>
            <Button onClick={() => router.push('/')}>Return to Homepage</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-secondary/50">
      <div className="hidden lg:block w-64 border-r bg-background">
         <AdminSidebar />
      </div>
      <div className="flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 lg:hidden">
            <h1 className="font-headline text-xl font-bold">Admin Panel</h1>
            <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    <SheetHeader className="p-4 border-b">
                        <SheetTitle className="text-lg font-semibold">Admin Menu</SheetTitle>
                    </SheetHeader>
                    <AdminSidebar onLinkClick={() => setSidebarOpen(false)} />
                </SheetContent>
            </Sheet>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
            {children}
        </main>
      </div>
    </div>
  );
}
