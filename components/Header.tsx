
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Mic, Bot, LayoutDashboard, Search, Menu, X, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-primary text-white' : 'text-tertiary hover:bg-accent'
    }`;
  
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-3 py-2 rounded-md text-base font-medium ${
    isActive ? 'bg-primary text-white' : 'text-tertiary hover:bg-accent'
  }`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Mic className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-tertiary">namluv.to</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <nav className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/browse" className={navLinkClass}>
                <Search className="mr-2 h-4 w-4" />
                Hledat hlasy
              </NavLink>
              <NavLink to="/ai-voice" className={navLinkClass}>
                <Bot className="mr-2 h-4 w-4" />
                AI Hlas
              </NavLink>
              {currentUser && (
                <NavLink to="/dashboard" className={navLinkClass}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Můj panel
                </NavLink>
              )}
            </nav>
          </div>
          <div className="hidden md:block">
            {currentUser ? (
              <div className="ml-4 flex items-center space-x-4">
                 <Link
                  to="/post-job"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary"
                >
                  Zadat poptávku
                </Link>
                <button onClick={handleLogout} className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-tertiary hover:bg-accent">
                  <LogOut className="mr-2 h-4 w-4" />
                  Odhlásit se
                </button>
              </div>
            ) : (
              <div className="ml-4 flex items-center space-x-2">
                <Link to="/login" className="px-4 py-2 rounded-md text-sm font-medium text-tertiary hover:bg-accent">
                  Přihlásit se
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary"
                >
                  Registrovat se
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-tertiary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <span className="sr-only">Otevřít hlavní menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/browse" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Hledat hlasy</NavLink>
            <NavLink to="/ai-voice" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>AI Hlas</NavLink>
            {currentUser && <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Můj panel</NavLink>}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {currentUser ? (
               <div className="px-2 space-y-2">
                 <Link
                  to="/post-job"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-3 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary"
                >
                  Zadat poptávku
                </Link>
                 <button onClick={handleLogout} className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-tertiary hover:bg-accent">
                   <LogOut className="mr-3 h-5 w-5"/>
                   Odhlásit se
                 </button>
               </div>
            ) : (
              <div className="px-2 space-y-2">
                 <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 rounded-md text-base font-medium text-tertiary hover:bg-accent">
                    <LogIn className="mr-3 h-5 w-5" /> Přihlásit se
                 </Link>
                 <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 rounded-md text-base font-medium text-tertiary hover:bg-accent">
                    <UserPlus className="mr-3 h-5 w-5" /> Registrovat se
                 </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
