'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useUser } from '@/hooks/use-user';
import { db } from '@/lib/firebase';
import { BookText, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { authUser, loading } = useUser();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (loading) {
      return; // Wait until user auth state is determined
    }

    if (!authUser) {
      // If user is not logged in, redirect to login page.
      // They need to log in to have their plan updated.
      setErrorMessage('You must be logged in to upgrade your account. Please log in and try again.');
      setStatus('error');
      return;
    }

    const upgradeAccount = async () => {
      try {
        const userRef = doc(db, 'users', authUser.uid);
        await updateDoc(userRef, {
          plan: 'premium',
          upgradedAt: serverTimestamp(),
        });
        setStatus('success');
        // Redirect after a short delay to show the success message
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      } catch (error: any) {
        console.error('Error upgrading account:', error);
        setErrorMessage('There was an error upgrading your account. Please contact support.');
        setStatus('error');
      }
    };

    upgradeAccount();
  }, [authUser, loading, router]);

  const StatusDisplay = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="flex flex-col items-center gap-4 text-center">
            <BookText className="h-12 w-12 animate-pulse text-primary" />
            <CardTitle>Processing Your Upgrade</CardTitle>
            <CardDescription>Please wait while we upgrade your account to Premium...</CardDescription>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center gap-4 text-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <CardTitle>Upgrade Successful!</CardTitle>
            <CardDescription>Welcome to Languify Premium! You will be redirected to your new dashboard shortly.</CardDescription>
          </div>
        );
      case 'error':
        return (
          <div className="flex flex-col items-center gap-4 text-center">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <CardTitle>An Error Occurred</CardTitle>
            <CardDescription>{errorMessage}</CardDescription>
            <Button asChild>
                <Link href="/login">Go to Login</Link>
            </Button>
          </div>
        );
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
        </CardHeader>
        <CardContent className="p-8">
            <StatusDisplay />
        </CardContent>
      </Card>
    </div>
  );
}
