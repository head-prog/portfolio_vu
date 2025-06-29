import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: any | null;
  session: any | null;
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
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('portfolio_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setSession({ user: userData });
      setUserRole(userData.role);
    }
    
    setLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      // Query the custom users table
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !userData) {
        return { error: { message: 'Invalid login credentials' } };
      }

      // Create a session-like object
      const userSession = {
        id: userData.id,
        username: userData.username,
        role: userData.role,
        created_at: userData.created_at
      };

      setUser(userSession);
      setSession({ user: userSession });
      setUserRole(userData.role);
      setIsGuest(false);

      // Store in localStorage for persistence
      localStorage.setItem('portfolio_user', JSON.stringify(userSession));

      return { error: null };
    } catch (error) {
      return { error: { message: 'Login failed. Please try again.' } };
    }
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    setUserRole(null);
    setIsGuest(false);
    localStorage.removeItem('portfolio_user');
  };

  const accessAsGuest = () => {
    setIsGuest(true);
    setUser(null);
    setSession(null);
    setUserRole(null);
    localStorage.removeItem('portfolio_user');
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