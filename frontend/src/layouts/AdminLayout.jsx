import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Users,
  BarChart,
  Settings,
  Database,
  LogOut,
  UserCircle,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', href: '/admin/students', icon: Users },
    // Mock links as per design-prd.md
    { name: 'Recent Activity', href: '/admin/activity', icon: BarChart },
    { name: 'Merchant History', href: '/admin/merchants', icon: BarChart },
    { name: 'Reports', href: '/admin/reports', icon: BarChart },
    { name: 'Management', href: '/admin/management', icon: Settings },
    { name: 'Main Database', href: '/admin/database', icon: Database },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex md:flex-col">
        <div className="flex items-center h-16 px-6 border-b border-border">
          <span className="text-xl font-bold text-foreground">
            SmartStudy <span className="text-primary">Admin</span>
          </span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-border space-y-2">
          <Link
            to="/admin/profile"
            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <UserCircle className="w-5 h-5 mr-3" />
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background flex flex-col relative w-full">
        {/* Mobile Header */}
        <div className="flex z-20 items-center justify-between h-16 px-4 border-b border-border md:hidden bg-card sticky top-0 w-full">
           <span className="text-lg font-bold text-foreground">
            SmartStudy <span className="text-primary">Admin</span>
          </span>
          <button 
            className="p-2 -mr-2 text-foreground focus:outline-none focus:bg-secondary rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Slide-Over Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-card border-b border-border z-10 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
              
              <div className="pt-4 mt-4 border-t border-border">
                <Link
                  to="/admin/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <UserCircle className="w-5 h-5 mr-3" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                     setMobileMenuOpen(false);
                     handleLogout();
                  }}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </div>
            </nav>
          </div>
        )}

        <div className="p-4 sm:p-6 w-full max-w-[100vw] overflow-hidden min-w-[320px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
