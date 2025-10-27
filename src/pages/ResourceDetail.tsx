import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, Clock, User, Tag, Heart, Edit, Trash2, Calendar } from 'lucide-react';
import { useResources } from '../context/ResourceContext';

const ResourceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { resources, updateResource, deleteResource } = useResources();

  const resource = resources.find(r => r.id === id);

  if (!resource) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
          资源未找到
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          您要查看的资源可能已被删除或不存在
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors duration-200"
        >
          返回首页
        </motion.button>
      </div>
    );
  }

  const handleToggleFavorite = () => {
    updateResource(resource.id, { isFavorite: !resource.isFavorite });
  };

  const handleDelete = () => {
    if (window.confirm('确定要删除这个资源吗？此操作无法撤销。')) {
      deleteResource(resource.id);
      navigate('/');
    }
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
      case 'beginner': return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'intermediate': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
      case 'advanced': return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30';
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

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="p-2 rounded-lg bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold text-gradient">资源详情</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              查看和管理学习资源
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleFavorite}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              resource.isFavorite
                ? 'bg-red-100 dark:bg-red-900/30 text-red-500'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-red-500'
            }`}
          >
            <Heart size={20} className={resource.isFavorite ? 'fill-current' : ''} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
          >
            <Trash2 size={20} />
          </motion.button>
        </div>
      </motion.div>

      {/* Resource Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden"
      >
        {/* Thumbnail */}
        <div className="relative h-64 bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
          <div className="text-8xl">{getTypeIcon(resource.type)}</div>
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              {resource.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(resource.difficulty)}`}>
              {getDifficultyText(resource.difficulty)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {resource.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {resource.description}
              </p>
            </div>
            <div className="flex items-center space-x-1 ml-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${
                    i < resource.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
              <span className="ml-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                {resource.rating}/5
              </span>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {resource.author && (
              <div className="flex items-center space-x-2">
                <User size={18} className="text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">作者</p>
                  <p className="font-medium text-gray-900 dark:text-white">{resource.author}</p>
                </div>
              </div>
            )}

            {resource.duration && (
              <div className="flex items-center space-x-2">
                <Clock size={18} className="text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">时长</p>
                  <p className="font-medium text-gray-900 dark:text-white">{resource.duration}</p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Tag size={18} className="text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">类型</p>
                <p className="font-medium text-gray-900 dark:text-white capitalize">{resource.type}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar size={18} className="text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">添加时间</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(resource.addedDate).toLocaleDateString('zh-CN')}
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          {resource.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">标签</h3>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg"
            >
              <ExternalLink size={18} />
              <span>访问资源</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <Edit size={18} />
              <span>编辑资源</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResourceDetail;
