import { useState } from 'react';
import UserView from './pages/UserView';
import AdminView from './pages/AdminView';

function App() {
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const handleLogin = (role: 'user' | 'admin') => {
    if (role === 'user') {
      // Simulate user login (User ID 1 for demo)
      setUserId(1);
    } else {
      // Simulate admin login (User ID 2 for demo)
      setUserId(2);
    }
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserId(null);
  };

  if (!userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg text-center max-w-md w-full">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout Manager</h1>
          <div className="space-y-4">
            <button
              onClick={() => handleLogin('user')}
              className="w-full bg-blue-600 text-white py-3 rounded text-lg hover:bg-blue-700 transition"
            >
              Login as User
            </button>
            <button
              onClick={() => handleLogin('admin')}
              className="w-full bg-gray-800 text-white py-3 rounded text-lg hover:bg-gray-900 transition"
            >
              Login as Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {userRole === 'user' && userId && (
        <UserView userId={userId} onLogout={handleLogout} />
      )}
      {userRole === 'admin' && userId && (
        <AdminView userId={userId} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
