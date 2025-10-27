import React from 'react';
import { motion } from 'framer-motion';
import { FilterOptions } from '../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const typeOptions = [
    { value: 'video', label: '视频', icon: '🎥' },
    { value: 'article', label: '文章', icon: '📄' },
    { value: 'course', label: '课程', icon: '🎓' },
    { value: 'book', label: '书籍', icon: '📚' },
    { value: 'tool', label: '工具', icon: '🛠️' },
  ];

  const difficultyOptions = [
    { value: 'beginner', label: '初级', color: 'text-green-500' },
    { value: 'intermediate', label: '中级', color: 'text-yellow-500' },
    { value: 'advanced', label: '高级', color: 'text-red-500' },
  ];

  const ratingOptions = [
    { value: 5, label: '5星' },
    { value: 4, label: '4星以上' },
    { value: 3, label: '3星以上' },
    { value: 2, label: '2星以上' },
    { value: 1, label: '1星以上' },
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value === filters[key] ? undefined : value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          筛选条件
        </h3>
        {hasActiveFilters && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
          >
            清除所有筛选
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            资源类型
          </label>
          <div className="space-y-2">
            {typeOptions.map((option) => (
              <motion.label
                key={option.value}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  filters.type === option.value
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={option.value}
                  checked={filters.type === option.value}
                  onChange={() => handleFilterChange('type', option.value)}
                  className="sr-only"
                />
                <span className="text-lg">{option.icon}</span>
                <span className="text-sm">{option.label}</span>
              </motion.label>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            难度等级
          </label>
          <div className="space-y-2">
            {difficultyOptions.map((option) => (
              <motion.label
                key={option.value}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  filters.difficulty === option.value
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="difficulty"
                  value={option.value}
                  checked={filters.difficulty === option.value}
                  onChange={() => handleFilterChange('difficulty', option.value)}
                  className="sr-only"
                />
                <div className={`w-3 h-3 rounded-full ${option.color.replace('text-', 'bg-')}`} />
                <span className="text-sm">{option.label}</span>
              </motion.label>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            评分
          </label>
          <div className="space-y-2">
            {ratingOptions.map((option) => (
              <motion.label
                key={option.value}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  filters.rating === option.value
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="rating"
                  value={option.value}
                  checked={filters.rating === option.value}
                  onChange={() => handleFilterChange('rating', option.value)}
                  className="sr-only"
                />
                <span className="text-sm">{option.label}</span>
              </motion.label>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            分类
          </label>
          <input
            type="text"
            placeholder="输入分类名称..."
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
            className="w-full p-2 bg-white/80 dark:bg-dark-700/80 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FilterPanel;
