
"use client";

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    // Also clear reading history for full simulation
    localStorage.removeItem('hasHadFirstRead');
    localStorage.removeItem('bookmarkedStories');
    localStorage.removeItem('likedStories');
    router.push('/');
  }

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
                <p className="text-muted-foreground mb-4">
                    Welcome back!
                </p>
                <p className="font-semibold text-lg mb-6 break-words">{user?.email}</p>
                <Button variant="destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
