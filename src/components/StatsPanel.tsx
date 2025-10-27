import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, Clock, TrendingUp, Heart, Eye } from 'lucide-react';
import { LearningResource } from '../types';

interface StatsPanelProps {
  resources: LearningResource[];
}

const StatsPanel: React.FC<StatsPanelProps> = ({ resources }) => {
  const stats = React.useMemo(() => {
    const totalResources = resources.length;
    const favoriteResources = resources.filter(r => r.isFavorite).length;
    const averageRating = resources.length > 0 
      ? (resources.reduce((sum, r) => sum + r.rating, 0) / resources.length).toFixed(1)
      : '0.0';
    
    const typeStats = resources.reduce((acc, resource) => {
      acc[resource.type] = (acc[resource.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categoryStats = resources.reduce((acc, resource) => {
      acc[resource.category] = (acc[resource.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const difficultyStats = resources.reduce((acc, resource) => {
      acc[resource.difficulty] = (acc[resource.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalResources,
      favoriteResources,
      averageRating,
      typeStats,
      categoryStats,
      difficultyStats,
    };
  }, [resources]);

  const statCards = [
    {
      title: '总资源数',
      value: stats.totalResources,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-700 dark:text-blue-300',
    },
    {
      title: '收藏资源',
      value: stats.favoriteResources,
      icon: Heart,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      textColor: 'text-red-700 dark:text-red-300',
    },
    {
      title: '平均评分',
      value: stats.averageRating,
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      textColor: 'text-yellow-700 dark:text-yellow-300',
    },
    {
      title: '学习进度',
      value: '85%',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-700 dark:text-green-300',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Main Stats */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              whileHover="hover"
              className={`${stat.bgColor} rounded-2xl p-6 border border-white/20 dark:border-white/10 backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.title}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Detailed Stats */}
      <motion.div
        variants={cardVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Type Distribution */}
        <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-white/10">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            资源类型分布
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.typeStats).map(([type, count]) => {
              const percentage = stats.totalResources > 0 
                ? ((count / stats.totalResources) * 100).toFixed(1)
                : '0';
              
              const typeIcons: Record<string, string> = {
                video: '🎥',
                article: '📄',
                course: '🎓',
                book: '📚',
                tool: '🛠️',
              };

              return (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{typeIcons[type] || '📄'}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                      {count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-white/10">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            分类分布
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.categoryStats)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([category, count]) => {
                const percentage = stats.totalResources > 0 
                  ? ((count / stats.totalResources) * 100).toFixed(1)
                  : '0';
                
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                        {count}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Difficulty Distribution */}
        <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-white/10">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            难度分布
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.difficultyStats).map(([difficulty, count]) => {
              const percentage = stats.totalResources > 0 
                ? ((count / stats.totalResources) * 100).toFixed(1)
                : '0';
              
              const difficultyColors: Record<string, string> = {
                beginner: 'from-green-500 to-green-600',
                intermediate: 'from-yellow-500 to-yellow-600',
                advanced: 'from-red-500 to-red-600',
              };

              const difficultyLabels: Record<string, string> = {
                beginner: '初级',
                intermediate: '中级',
                advanced: '高级',
              };

              return (
                <div key={difficulty} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {difficultyLabels[difficulty] || difficulty}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${difficultyColors[difficulty] || 'from-gray-500 to-gray-600'} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                      {count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatsPanel;
