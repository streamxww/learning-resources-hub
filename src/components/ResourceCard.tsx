import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Star, Clock, User, Tag, Heart } from 'lucide-react';
import { LearningResource } from '../types';
import { useResources } from '../context/ResourceContext';

interface ResourceCardProps {
  resource: LearningResource;
  viewMode: 'grid' | 'list';
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, viewMode }) => {
  const { updateResource } = useResources();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateResource(resource.id, { isFavorite: !resource.isFavorite });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'article': return '📄';
      case 'course': return '🎓';
      case 'book': return '📚';
      case 'tool': return '🛠️';
      default: return '📄';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-500';
      case 'intermediate': return 'text-yellow-500';
      case 'advanced': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '初级';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '未知';
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
      transition: { duration: 0.2 }
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <Link to={`/resource/${resource.id}`} className="block">
          <div className="flex items-center p-6 space-x-4">
            {/* Thumbnail */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-2xl">
                {getTypeIcon(resource.type)}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                    {resource.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {resource.category}
                    </span>
                    <span className={`text-xs ${getDifficultyColor(resource.difficulty)}`}>
                      {getDifficultyText(resource.difficulty)}
                    </span>
                    {resource.duration && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {resource.duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < resource.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleToggleFavorite}
                    className={`p-1 rounded-full transition-colors duration-200 ${
                      resource.isFavorite
                        ? 'text-red-500'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart size={16} className={resource.isFavorite ? 'fill-current' : ''} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/resource/${resource.id}`} className="block">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
          <div className="text-6xl">{getTypeIcon(resource.type)}</div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleFavorite}
            className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full transition-colors duration-200"
          >
            <Heart 
              size={18} 
              className={`${
                resource.isFavorite
                  ? 'text-red-500 fill-current'
                  : 'text-white'
              }`} 
            />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
              {resource.title}
            </h3>
            <div className="flex items-center space-x-1 ml-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < resource.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {resource.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
              {resource.category}
            </span>
            <span className={`text-xs ${getDifficultyColor(resource.difficulty)}`}>
              {getDifficultyText(resource.difficulty)}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-3">
              {resource.duration && (
                <span className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  {resource.duration}
                </span>
              )}
              {resource.author && (
                <span className="flex items-center">
                  <User size={12} className="mr-1" />
                  {resource.author}
                </span>
              )}
            </div>
            <div className="flex items-center">
              <ExternalLink size={12} className="mr-1" />
              查看详情
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ResourceCard;
