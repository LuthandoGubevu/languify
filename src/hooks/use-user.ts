
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User as AuthUser } from 'firebase/auth';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
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
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, now get their profile from Firestore.
        const userRef = doc(db, 'users', user.uid);
        
        // Check if document exists before setting up a listener
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
            console.warn("User profile not found for UID:", user.uid);
             setUserData({ authUser: user, userProfile: null, loading: false });
             return;
        }

        const unsubscribeProfile = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            setUserData({
              authUser: user,
              userProfile: doc.data() as UserProfile,
              loading: false,
            });
          } else {
            // This case might happen if the document is deleted after the check
            console.warn("User profile was deleted for UID:", user.uid);
            setUserData({ authUser: user, userProfile: null, loading: false });
          }
        });

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
