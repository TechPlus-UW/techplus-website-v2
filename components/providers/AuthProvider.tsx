'use client';

import React, { useEffect, useCallback, useState } from 'react';
import { useAppDispatch } from '@/lib/store/hooks';
import { setUser, clearUser } from '@/lib/store/slices/userSlice';
import { supabase } from '@/lib/supabase/client';
import { authRepository } from '@/lib/repositories/authRepository';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  const loadUserProfile = useCallback(async (userId: string) => {
    try {
      const profile = await authRepository.getProfile(userId);
      if (profile) {
        dispatch(
          setUser({
            userId: profile.id,
            email: profile.email,
            firstName: profile.first_name,
            lastName: profile.last_name,
            userRole: profile.role,
          })
        );
      } else {
        // If no profile exists, try to get user from auth
        const user = await authRepository.getCurrentUser();
        if (user) {
          dispatch(
            setUser({
              userId: user.id,
              email: user.email || '',
              firstName: (user.user_metadata?.first_name as string) || '',
              lastName: (user.user_metadata?.last_name as string) || '',
              userRole: 'default',
            })
          );
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      // Check if session still exists before clearing
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        dispatch(clearUser());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    let mounted = true;
    let sessionRestored = false;

    // Set up auth state change listener - this handles session restoration
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log('Auth state changed:', event, session?.user?.id);

      // INITIAL_SESSION fires when Supabase restores a session from localStorage
      if (event === 'INITIAL_SESSION') {
        sessionRestored = true;
        if (session?.user) {
          console.log('Session restored from storage, loading profile...');
          await loadUserProfile(session.user.id);
        } else {
          console.log('No session found in storage');
          dispatch(clearUser());
        }
        if (mounted) {
          setIsInitialized(true);
        }
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          await loadUserProfile(session.user.id);
        }
        if (mounted && !isInitialized) {
          setIsInitialized(true);
        }
      } else if (event === 'SIGNED_OUT') {
        dispatch(clearUser());
        if (mounted) {
          setIsInitialized(true);
        }
      }
    });

    // Also check session after a short delay to ensure Supabase has initialized
    // This is a fallback in case INITIAL_SESSION doesn't fire
    const checkSession = async () => {
      // Wait a bit for Supabase to restore session from localStorage
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (!mounted) return;

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) {
            dispatch(clearUser());
            setIsInitialized(true);
          }
          return;
        }

        // Only process if INITIAL_SESSION hasn't fired yet
        if (!sessionRestored) {
          if (session?.user && mounted) {
            console.log('Session found on manual check, loading profile...');
            await loadUserProfile(session.user.id);
          } else if (mounted) {
            console.log('No session found on manual check');
            dispatch(clearUser());
          }
          
          if (mounted) {
            setIsInitialized(true);
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
        if (mounted) {
          dispatch(clearUser());
          setIsInitialized(true);
        }
      }
    };

    // Check session after a delay to allow Supabase to initialize
    const timeoutId = setTimeout(() => {
      checkSession();
    }, 200);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [dispatch, loadUserProfile, isInitialized]);

  // Don't render children until we've checked for a session
  // This prevents flash of logged-out state
  if (!isInitialized) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
