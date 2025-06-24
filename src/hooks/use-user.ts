
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User as AuthUser } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { UserProfile } from '@/lib/types';

interface UserData {
  authUser: AuthUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

export function useUser(): UserData {
  const [userData, setUserData] = useState<UserData>({
    authUser: null,
    userProfile: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, now get their profile from Firestore.
        const userRef = doc(db, 'users', user.uid);

        const unsubscribeProfile = onSnapshot(
          userRef,
          (doc) => {
            if (doc.exists()) {
              setUserData({
                authUser: user,
                userProfile: doc.data() as UserProfile,
                loading: false,
              });
            } else {
              // This can happen if the user document hasn't been created yet.
              console.warn("User profile not found for UID:", user.uid);
              setUserData({ authUser: user, userProfile: null, loading: false });
            }
          },
          (error) => {
            // This error handler catches issues like permission denied.
            console.error("Firestore snapshot listener error:", error);
            setUserData({ authUser: user, userProfile: null, loading: false });
          }
        );

        // Cleanup the profile listener when auth state changes or component unmounts
        return () => unsubscribeProfile();
      } else {
        // User is signed out.
        setUserData({ authUser: null, userProfile: null, loading: false });
      }
    });

    // Cleanup the auth listener on component unmount
    return () => unsubscribeAuth();
  }, []);

  return userData;
}
