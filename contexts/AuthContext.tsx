// FIX: Removed typo 'a,' from the import statement to correctly import React hooks and context functions.
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, pass: string) => Promise<User>;
  signup: (email: string, pass: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('currentUser');
    }
  }, []);

  const login = async (email: string, pass: string): Promise<User> => {
    // This is a simulation. In a real app, you'd call an API.
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find((u: any) => u.email === email && u.password === pass);

    if (user) {
      const userData: User = { id: user.id, email: user.email };
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setCurrentUser(userData);
      return userData;
    } else {
      throw new Error("Nesprávný e-mail nebo heslo.");
    }
  };

  const signup = async (email: string, pass: string): Promise<User> => {
    // This is a simulation.
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = storedUsers.find((u: any) => u.email === email);

    if (existingUser) {
      throw new Error("Uživatel s tímto e-mailem již existuje.");
    }
    
    const newUser = { id: Date.now().toString(), email, password: pass };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    
    const userData: User = { id: newUser.id, email: newUser.email };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setCurrentUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};