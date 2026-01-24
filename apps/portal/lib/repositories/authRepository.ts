import { supabase } from '../supabase/client';

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export type UserRole = 'default' | 'mentor' | 'mentee' | 'admin';

export interface ProfileData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

class AuthRepository {
  async signUp(data: SignUpData) {
    const { email, password, firstName, lastName } = data;
    
    // Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error('Failed to create user');
    }

    // Create profile - only if user is confirmed (or if email confirmation is disabled)
    // If email confirmation is required, profile will be created via database trigger or after confirmation
    if (authData.session) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email,
          first_name: firstName,
          last_name: lastName,
        });

      if (profileError) {
        // Log error but don't fail signup - profile can be created later
        console.error('Profile creation error:', profileError);
      }
    }

    return authData;
  }

  async signIn(data: SignInData) {
    const { email, password } = data;
    
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return authData;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  async resetPassword(email: string) {
    const redirectTo = typeof window !== 'undefined' 
      ? `${window.location.origin}/reset-password`
      : '/reset-password';
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error(error.message);
    }
    return user;
  }

  async getProfile(userId: string): Promise<ProfileData | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(error.message);
    }

    return data;
  }

  async updateProfile(userId: string, updates: Partial<ProfileData>) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}

export const authRepository = new AuthRepository();
