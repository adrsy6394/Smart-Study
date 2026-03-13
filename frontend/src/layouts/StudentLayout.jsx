import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogOut, BookOpen, LineChart, Target, Compass, Menu, X } from 'lucide-react';

const StudentLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/student/dashboard', icon: LineChart },
    { name: 'Study Plan', href: '/student/plan', icon: Target },
    { name: 'Weak Subjects', href: '/student/analysis', icon: BookOpen },
    { name: 'Resources', href: '/student/resources', icon: Compass },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          
          <div className="flex items-center gap-6">
             {/* Logo / Branding */}
            <span className="text-xl font-bold text-foreground mr-4">
              SmartStudy <span className="text-primary">AI</span>
            </span>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const isActive = location.pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground hidden sm:block">
              {user?.name || 'Student'}
            </div>
            <button
              onClick={logout}
              className="flex items-center text-sm font-medium text-destructive hover:text-destructive/80 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
            <div className="flex md:hidden items-center ml-2">
              <button 
                className="p-2 -mr-2 text-foreground focus:outline-none focus:bg-secondary rounded-md"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Slide-down Navigation */}
        {mobileMenuOpen && (
           <div className="md:hidden border-t border-border bg-card absolute w-full left-0 z-40 shadow-lg">
             <nav className="flex flex-col px-4 pt-2 pb-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = location.pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${
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
                  <div className="border-t border-border mt-2 pt-2 pb-1">
                     <div className="px-3 py-2 text-sm text-foreground font-medium">
                       Logged in as: {user?.name || 'Student'}
                     </div>
                     <button
                        onClick={() => {
                           setMobileMenuOpen(false);
                           logout();
                        }}
                        className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        Sign Out
                      </button>
                  </div>
             </nav>
           </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden min-w-[320px]">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
