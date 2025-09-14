
"use client";

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="container py-16 md:py-24 text-center">
        <User className="h-16 w-16 mx-auto text-primary animate-pulse" />
        <p className="text-muted-foreground mt-4">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="container py-16 md:py-24 max-w-lg mx-auto">
        <Card>
            <CardHeader className="text-center">
                <User className="h-20 w-20 mx-auto text-primary mb-4" />
                <CardTitle className="font-headline text-3xl">My Profile</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                    Welcome, reader! This is your personal profile page.
                </p>
                <Button variant="destructive" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
