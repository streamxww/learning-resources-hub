import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useResources } from '../context/ResourceContext';
import { FilterOptions } from '../types';
import ResourceCard from '../components/ResourceCard';
import FilterPanel from '../components/FilterPanel';
import StatsPanel from '../components/StatsPanel';

const Home: React.FC = () => {
  const { resources } = useResources();
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!resource.title.toLowerCase().includes(query) &&
            !resource.description.toLowerCase().includes(query) &&
            !resource.tags.some(tag => tag.toLowerCase().includes(query))) {
          return false;
        }
      }

      // Type filter
      if (filters.type && resource.type !== filters.type) {
        return false;
      }

      // Category filter
      if (filters.category && resource.category !== filters.category) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty && resource.difficulty !== filters.difficulty) {
        return false;
      }

      // Rating filter
      if (filters.rating && resource.rating < filters.rating) {
        return false;
      }

      return true;
    });
  }, [resources, filters, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gradient">
          我的学习资源库
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          收集和管理你发现的所有优质学习资源，让知识管理变得简单高效
        </p>
      </motion.div>

      {/* Stats Panel */}
      <StatsPanel resources={resources} />

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-white/10"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="搜索资源..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-dark-700/80 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Filter and View Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                showFilters
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/80 dark:bg-dark-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <Filter size={18} />
              <span>筛选</span>
            </motion.button>

            <div className="flex bg-white/80 dark:bg-dark-700/80 rounded-xl p-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <Grid size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <List size={18} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
          >
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Resources Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`${
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }`}
      >
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              viewMode={viewMode}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              暂无资源
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery || Object.keys(filters).length > 0
                ? '没有找到匹配的资源，尝试调整搜索条件'
                : '开始添加你的第一个学习资源吧！'
              }
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
