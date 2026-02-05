// frontend/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  NewUser, 
  LoginUser, 
  UserUpdate,
  PasswordReset,
  UserDelete,
  getCurrentUser, 
  login as apiLogin, 
  signup as apiSignup, 
  logout as apiLogout,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
  resetPassword as apiResetPassword
} from '@/services/api';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (loginUser: LoginUser) => Promise<void>;
  signup: (newUser: NewUser) => Promise<void>;
  logout: () => void;
  updateUser: (userUpdate: UserUpdate) => Promise<void>;
  deleteUser: (userDelete: UserDelete) => Promise<void>;
  resetPassword: (passwordReset: PasswordReset) => Promise<void>;
  todosLastUpdated: number; // Added for triggering todo updates
  triggerTodosUpdate: () => void; // Added for triggering todo updates
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [todosLastUpdated, setTodosLastUpdated] = useState(Date.now()); // New state

  useEffect(() => {
    const loadUserFromCookies = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Failed to fetch user from cookie token', error);
          Cookies.remove('token');
        }
      }
      setLoading(false);
    };
    loadUserFromCookies();
  }, []);

  const login = async (loginUser: LoginUser) => {
    const { access_token } = await apiLogin(loginUser);
    Cookies.set('token', access_token);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    triggerTodosUpdate(); // Trigger update on login
  };

  const signup = async (newUser: NewUser) => {
    const { access_token } = await apiSignup(newUser);
    Cookies.set('token', access_token);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    triggerTodosUpdate(); // Trigger update on signup
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    triggerTodosUpdate(); // Trigger update on logout
  };

  const updateUser = async (userUpdate: UserUpdate) => {
    const { access_token, ...updatedUser } = await apiUpdateUser(userUpdate);
    Cookies.set('token', access_token);
    setUser(updatedUser);
    // No specific todos update needed here directly, as user state changes
  };

  const deleteUser = async (userDelete: UserDelete) => {
    await apiDeleteUser(userDelete);
    setUser(null);
    Cookies.remove('token');
    triggerTodosUpdate(); // Trigger update on user delete (todos also deleted)
  };

  const resetPassword = async (passwordReset: PasswordReset) => {
    await apiResetPassword(passwordReset);
  };

  const triggerTodosUpdate = () => {
    setTodosLastUpdated(Date.now());
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser, deleteUser, resetPassword, todosLastUpdated, triggerTodosUpdate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
