import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  isOwner: boolean;
  isGuest: boolean;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  accessAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserRole(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await loadUserRole(session.user.id);
        setIsGuest(false);
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserRole = async (userId: string) => {
    try {
      // First check if user exists in profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profile) {
        // For now, we'll assume all authenticated users are owners
        // You can modify this logic based on your needs
        setUserRole('owner');
        return;
      }

      // Check custom users table for role information
      const { data: customUser } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();

      if (customUser) {
        setUserRole(customUser.role);
      } else {
        // Default role for authenticated users
        setUserRole('owner');
      }
    } catch (error) {
      console.error('Error loading user role:', error);
      // Default to owner for authenticated users
      setUserRole('owner');
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      // First, check if this is an email or username
      const isEmail = username.includes('@');
      
      if (isEmail) {
        // Use Supabase auth directly for email
        const { data, error } = await supabase.auth.signInWithPassword({
          email: username,
          password: password,
        });

        if (error) {
          return { error };
        }

        return { error: null };
      } else {
        // For username-based login, we need to find the email first
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('username', username)
          .eq('password', password)
          .single();

        if (userError || !userData) {
          return { error: { message: 'Invalid login credentials' } };
        }

        // Check if this user exists in Supabase auth
        // For now, we'll create a temporary session approach
        // In production, you should migrate to email-based auth or use a custom JWT
        
        // Try to sign in with a constructed email (username@domain.com)
        const constructedEmail = `${username}@portfolio.local`;
        
        // First try to sign up the user (this will fail if they already exist)
        const { error: signUpError } = await supabase.auth.signUp({
          email: constructedEmail,
          password: password,
        });

        // Then try to sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email: constructedEmail,
          password: password,
        });

        if (error) {
          return { error: { message: 'Authentication failed. Please contact administrator.' } };
        }

        // Update the user's profile with custom data
        if (data.user) {
          await supabase
            .from('profiles')
            .upsert({
              id: data.user.id,
              email: constructedEmail,
              full_name: userData.username,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
        }

        return { error: null };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: { message: 'Login failed. Please try again.' } };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsGuest(false);
  };

  const accessAsGuest = () => {
    setIsGuest(true);
    signOut(); // This will clear the session
  };

  const value = {
    user,
    session,
    userRole,
    isOwner: userRole === 'owner',
    isGuest,
    loading,
    signIn,
    signOut,
    accessAsGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};