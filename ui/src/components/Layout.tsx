import { useNavigate } from 'react-router-dom';
import { FileText, LogOut } from 'lucide-react';
import FloatingIcons from './FloatingIcons';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="min-h-screen relative">
      <FloatingIcons />
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl shadow-2xl border-b-2 border-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="p-2 bg-blue-600 rounded-xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <div className="text-xl font-bold text-blue-700 leading-tight pb-0.5">
                  MargaDarshi
                </div>
                <div className="text-xs text-gray-500 -mt-0.5">Paper Correction System</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {userEmail && (
                <>
                  <span className="text-sm font-medium">
                    Welcome, <span className="font-bold text-blue-800">{userEmail}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 border-2 border-red-300 rounded-xl hover:bg-red-50 transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;

