import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  isOnline: boolean;
  notifications: Notification[];
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setOnlineStatus: (online: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read?: boolean;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      sidebarOpen: false,
      theme: 'light',
      isOnline: navigator.onLine,
      notifications: [],

      setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
      
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      setTheme: (theme: 'light' | 'dark') => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },
      
      setOnlineStatus: (online: boolean) => set({ isOnline: online }),
      
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
          read: false,
        };
        
        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 10), // Keep only latest 10
        }));
      },
      
      removeNotification: (id: string) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      
      clearNotifications: () => set({ notifications: [] }),
    }),
    { name: 'AppStore' }
  )
);

// Set up online/offline listeners
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    useAppStore.getState().setOnlineStatus(true);
    useAppStore.getState().addNotification({
      title: 'Connection Restored',
      message: 'You are back online',
      type: 'success',
    });
  });

  window.addEventListener('offline', () => {
    useAppStore.getState().setOnlineStatus(false);
    useAppStore.getState().addNotification({
      title: 'Connection Lost',
      message: 'You are currently offline',
      type: 'warning',
    });
  });
}
