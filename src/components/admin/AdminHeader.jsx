import { Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center md:hidden">
        <button className="text-gray-500 hover:text-gray-700">
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex-1"></div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-sm text-gray-500">
          Logged in as <span className="font-medium text-gray-900">{user?.email}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {user?.email?.[0].toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
