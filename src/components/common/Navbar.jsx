import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { User, LogOut, ChevronDown, ShoppingBag, Clock } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    const userEmail = localStorage.getItem('userEmail') || 'User';    
    // Show toast before clearing storage
    toast.success(`Goodbye, ${userEmail}! 👋`, {
      duration: 2000,
      position: 'top-center',
    });
    
    // Clear storage after toast
    setTimeout(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userEmail');
      setIsLoggedIn(false);
      setIsOpen(false);
      window.location.href = '/';
    }, 1000);
  };

  return (
    <nav className="bg-white shadow-lg px-6 py-3 sticky top-0 z-50 border-b border-stone-200">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="KIDAVE Data Services" 
            className="h-10 w-10 rounded-full object-cover border border-stone-200 shadow-sm"
          />
          <span className="text-xl font-bold text-green-900 hidden sm:inline">
            KIDAVE Data Services
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className={`transition-colors duration-200 ${
              location.pathname === '/' 
                ? 'text-green-900 font-semibold' 
                : 'text-stone-600 hover:text-green-900'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/track" 
            className={`transition-colors duration-200 ${
              location.pathname === '/track' 
                ? 'text-green-900 font-semibold' 
                : 'text-stone-600 hover:text-green-900'
            }`}
          >
            Track Orders
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              {isLoggedIn ? (
                <>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-green-800 to-green-900 flex items-center justify-center text-white font-semibold shadow-md">
                    <User size={18} />
                  </div>
                  <ChevronDown size={16} className={`text-stone-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-950 transition-colors text-sm font-semibold shadow-md shadow-green-900/20"
                >
                  Sign In
                </Link>
              )}
            </button>

            {isLoggedIn && isOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden z-50">
                <div className="p-3 border-b border-stone-100">
                  <p className="text-sm font-semibold text-stone-800">My Account</p>
                  <p className="text-xs text-stone-500 truncate">
                    {localStorage.getItem('userEmail') || 'guest@kidave.com'}
                  </p>
                </div>
                
                <div className="py-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={16} className="text-stone-400" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/my-orders"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingBag size={16} className="text-stone-400" />
                    <span>My Orders</span>
                  </Link>
                  <Link
                    to="/track"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Clock size={16} className="text-stone-400" />
                    <span>Track Order</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-stone-100 mt-1"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;