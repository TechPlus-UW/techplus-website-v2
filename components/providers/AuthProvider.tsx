'use client';

import React, { useEffect, useCallback } from 'react';
import { useAppDispatch } from '@/lib/store/hooks';
import { setUser, clearUser } from '@/lib/store/slices/userSlice';
import { supabase } from '@/lib/supabase/client';
import { authRepository } from '@/lib/repositories/authRepository';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

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

    // Set up auth state change listener - this handles session restoration
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          dispatch(clearUser());
        }
      } else if (event === 'SIGNED_OUT') {
        dispatch(clearUser());
      }
    });

    // Also check session immediately as a fallback
    // This ensures we restore the session even if onAuthStateChange hasn't fired yet
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) {
            dispatch(clearUser());
          }
          return;
        }

        if (session?.user && mounted) {
          await loadUserProfile(session.user.id);
        } else if (mounted) {
          dispatch(clearUser());
        }
      } catch (error) {
        console.error('Error checking session:', error);
        if (mounted) {
          dispatch(clearUser());
        }
      }
    };

    checkSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [dispatch, loadUserProfile]);

  return <>{children}</>;
}
