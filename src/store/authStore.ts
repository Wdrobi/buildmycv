import { create } from 'zustand';
import { AuthContext, User } from '@/types/auth';

interface AuthStore extends AuthContext {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const result = await response.json();
      const { user, token } = result.data;
      set({ user, isAuthenticated: true });
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (email: string, password: string, name: string) => {
    try {
      set({ isLoading: true });
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const result = await response.json();
      const { user, token } = result.data;
      set({ user, isAuthenticated: true });
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const token = localStorage.getItem('token');
      if (!token) {
        set({ user: null, isAuthenticated: false });
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const result = await response.json();
        const user = result.data.user;
        set({ user, isAuthenticated: true });
      } else {
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
