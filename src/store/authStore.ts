import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { logInfo, logError } from '../../logging-middleware/logger';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  clearError: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

// Mock API functions
const mockLogin = async (email: string, password: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  if (email === 'demo@example.com' && password === 'password123') {
    return {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      role: 'user',
    };
  }
  
  throw new Error('Invalid credentials');
};

const mockRegister = async (userData: Omit<User, 'id'> & { password: string }): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: userData.name,
    email: userData.email,
    role: userData.role,
  };
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null });
          
          try {
            logInfo('AuthStore', `Login attempt for ${email}`);
            const user = await mockLogin(email, password);
            
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false,
              error: null 
            });
            
            logInfo('AuthStore', `Login successful for ${email}`);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            logError('AuthStore', `Login failed for ${email}: ${errorMessage}`);
            
            set({ 
              error: errorMessage, 
              isLoading: false,
              isAuthenticated: false,
              user: null 
            });
          }
        },

        logout: () => {
          const { user } = get();
          logInfo('AuthStore', `Logout for ${user?.email || 'unknown user'}`);
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            error: null 
          });
        },

        register: async (userData) => {
          set({ isLoading: true, error: null });
          
          try {
            logInfo('AuthStore', `Registration attempt for ${userData.email}`);
            const user = await mockRegister(userData);
            
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false,
              error: null 
            });
            
            logInfo('AuthStore', `Registration successful for ${userData.email}`);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Registration failed';
            logError('AuthStore', `Registration failed for ${userData.email}: ${errorMessage}`);
            
            set({ 
              error: errorMessage, 
              isLoading: false,
              isAuthenticated: false,
              user: null 
            });
          }
        },

        clearError: () => set({ error: null }),

        updateProfile: async (userData) => {
          const { user } = get();
          if (!user) return;

          set({ isLoading: true, error: null });
          
          try {
            logInfo('AuthStore', `Profile update for ${user.email}`);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const updatedUser = { ...user, ...userData };
            set({ 
              user: updatedUser, 
              isLoading: false 
            });
            
            logInfo('AuthStore', `Profile update successful for ${user.email}`);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
            logError('AuthStore', `Profile update failed for ${user.email}: ${errorMessage}`);
            
            set({ 
              error: errorMessage, 
              isLoading: false 
            });
          }
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ 
          user: state.user, 
          isAuthenticated: state.isAuthenticated 
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);
