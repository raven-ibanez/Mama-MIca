import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const { siteSettings, loading } = useSiteSettings();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-200 shadow-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button 
            onClick={onMenuClick}
            className="flex items-center space-x-3 text-neutral-800 hover:text-purple-600 transition-colors duration-200"
          >
            {loading ? (
              <div className="w-12 h-12 bg-purple-200 rounded-full animate-pulse" />
            ) : (
              <div className="w-12 h-12 bg-gradient-purple rounded-full flex items-center justify-center shadow-purple">
                <img 
                  src={siteSettings?.site_logo || "/logo.jpg"} 
                  alt={siteSettings?.site_name || "Mama Mica GLW"}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/logo.jpg";
                  }}
                />
              </div>
            )}
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gradient-purple">
                {loading ? (
                  <div className="w-32 h-8 bg-purple-200 rounded animate-pulse" />
                ) : (
                  "Mama Mica GLW"
                )}
              </h1>
              <p className="text-sm text-purple-600 font-medium">Premium Quality Products</p>
            </div>
          </button>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative p-3 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-full transition-all duration-200 shadow-purple"
            >
              <ShoppingCart className="h-7 w-7" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-purple text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce-gentle shadow-lg">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;