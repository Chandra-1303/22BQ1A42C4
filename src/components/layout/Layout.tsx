import type { ReactNode } from 'react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isOnline } = useAppStore();
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="glass rounded-2xl shadow-2xl overflow-hidden backdrop-blur-glass">
          <div className="p-6 sm:p-8">
            {/* Status Indicator */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                <span className="text-white/70 text-sm">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              
              {user && (
                <div className="flex items-center space-x-4 text-white/80">
                  <span className="text-sm">Welcome, {user.name}</span>
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">{user.name[0]}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
