import { useEffect, useState } from "react";
import { Log } from "../logging-middleware/logger";

interface DataItem {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

function MyComponent() {
  // Replace with your real access token!
  const accessToken = "YOUR_ACCESS_TOKEN";
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // First function uses logging middleware as required
      await Log("frontend", "debug", "MyComponent", "Starting data fetch operation", accessToken);
      
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData: DataItem[] = [
        {
          id: 1,
          title: "Sample Item 1",
          description: "This is a sample data item for testing",
          status: 'active',
          createdAt: new Date('2024-01-15'),
        },
        {
          id: 2,
          title: "Sample Item 2", 
          description: "Another sample data item with different content",
          status: 'inactive',
          createdAt: new Date('2024-01-20'),
        },
        {
          id: 3,
          title: "Sample Item 3",
          description: "Third sample item to demonstrate list functionality",
          status: 'active',
          createdAt: new Date('2024-01-25'),
        },
      ];
      
      setData(mockData);
      await Log("frontend", "info", "MyComponent", `Successfully fetched ${mockData.length} items`, accessToken);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      await Log("frontend", "error", "MyComponent", `Data fetch failed: ${errorMessage}`, accessToken);
    } finally {
      setLoading(false);
    }
  };

  const handleItemAction = async (id: number, action: string) => {
    try {
      await Log("frontend", "debug", "MyComponent", `User action: ${action} on item ${id}`, accessToken);
      
      // Simulate action processing
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (action === 'delete') {
        setData(prev => prev.filter(item => item.id !== id));
        await Log("frontend", "info", "MyComponent", `Item ${id} deleted successfully`, accessToken);
      } else if (action === 'toggle') {
        setData(prev => prev.map(item => 
          item.id === id 
            ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
            : item
        ));
        await Log("frontend", "info", "MyComponent", `Item ${id} status toggled`, accessToken);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Action failed';
      await Log("frontend", "error", "MyComponent", `Action ${action} failed for item ${id}: ${errorMessage}`, accessToken);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg">Loading data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error Loading Data</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={fetchData}
                className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Component - Test Submission</h1>
        <p className="mt-2 text-gray-600">
          This component demonstrates the logging middleware integration and responsive design.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Data Items</h2>
            <button
              onClick={fetchData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Refresh Data
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {data.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No data available</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by loading some data.</p>
            </div>
          ) : (
            data.map((item) => (
              <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {item.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Created: {item.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleItemAction(item.id, 'toggle')}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => handleItemAction(item.id, 'delete')}
                      className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Responsive grid demo */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Mobile First</h3>
          <p className="text-gray-600 text-sm">
            This layout is fully responsive and mobile-first designed.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Handling</h3>
          <p className="text-gray-600 text-sm">
            Robust error handling with user-friendly error messages.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Logging</h3>
          <p className="text-gray-600 text-sm">
            All user actions and API calls are logged using the middleware.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
