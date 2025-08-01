import { useEffect, useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/layout/Layout';
import { ToastContainer } from './components/ui/Toast';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Login } from './pages/Login';
import { useAuthStore } from './store/authStore';
import { useAppStore } from './store/appStore';
import MyComponent from '../frontend-test-submission/MyComponent';
import { logInfo } from '../logging-middleware/logger';

type Page = 'dashboard' | 'products' | 'test-submission';

function App() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { addNotification } = useAppStore();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  useEffect(() => {
    // Log app initialization - First function uses logging middleware as required
    logInfo('App', 'Application initialized');
    
    // Welcome notification for authenticated users
    if (isAuthenticated && user) {
      addNotification({
        title: 'Welcome back!',
        message: `Hello ${user.name}, welcome to your dashboard.`,
        type: 'success',
      });
    }
  }, [isAuthenticated, user, addNotification]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'test-submission':
        return <MyComponent />;
      default:
        return <Dashboard />;
    }
  };

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'products', name: 'Products', icon: '📦' },
    { id: 'test-submission', name: 'Test Submission', icon: '🧪' },
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50">
          <div style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            height: '100%'
          }} />
        </div>
        
        <ToastContainer />
        
        {isAuthenticated ? (
          <>
            {/* Navigation Header */}
            <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  {/* Logo */}
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg glow">
                      <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gradient font-poppins">
                      React Pro
                    </h1>
                  </div>

                  {/* Navigation Tabs */}
                  <nav className="hidden md:flex space-x-1">
                    {navigation.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setCurrentPage(item.id as Page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                          currentPage === item.id
                            ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </nav>

                  {/* User Actions */}
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-semibold">{user?.name?.[0] || 'U'}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* Mobile Navigation */}
            <div className="md:hidden bg-white/5 backdrop-blur-sm border-b border-white/10">
              <div className="flex space-x-1 p-2">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as Page)}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 flex flex-col items-center space-y-1 text-xs ${
                      currentPage === item.id
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <main className="relative z-10">
              <Layout>
                <div className="animate-fade-in">
                  {renderPage()}
                </div>
              </Layout>
            </main>
          </>
        ) : (
          <div className="relative z-10">
            <Login />
          </div>
        )}

        {/* Floating Elements */}
        <div className="fixed top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
