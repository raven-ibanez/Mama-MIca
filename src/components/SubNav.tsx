import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface SubNavProps {
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const SubNav: React.FC<SubNavProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading } = useCategories();

  return (
    <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-purple-200 shadow-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 overflow-x-auto py-4 scrollbar-hide">
          {loading ? (
            <div className="flex space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-10 w-24 bg-purple-200 rounded-full animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => onCategoryClick('all')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-purple ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-purple text-white transform scale-105'
                    : 'bg-white text-purple-600 border-2 border-purple-200 hover:border-purple-400 hover:scale-105'
                }`}
              >
                All Products
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onCategoryClick(c.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-purple flex items-center space-x-2 ${
                    selectedCategory === c.id
                      ? 'bg-gradient-purple text-white transform scale-105'
                      : 'bg-white text-purple-600 border-2 border-purple-200 hover:border-purple-400 hover:scale-105'
                  }`}
                >
                  <span className="text-lg">{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubNav;


