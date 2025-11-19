import React, { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { mockUsers } from '@utils/mockData';
import { UserRole, type User } from '@types';

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (payload: { email: string; password: string; role: UserRole }) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(mockUsers[0]);

  const login = async (email: string) => {
    const nextUser = mockUsers.find((mockUser) => mockUser.email === email) ?? null;
    setUser(nextUser);
  };

  const logout = () => setUser(null);

  const signup = async ({ email, role }: { email: string; password: string; role: UserRole }) => {
    const newUser: User = {
      id: `${Date.now()}`,
      email,
      name: email.split('@')[0],
      role,
    };
    setUser(newUser);
  };

  const value = useMemo(() => ({ user, login, logout, signup }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
