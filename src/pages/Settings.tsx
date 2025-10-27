import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cloud, CloudOff, Wifi, WifiOff, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useResources } from '../context/ResourceContext';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { 
    enableCloudSync, 
    setEnableCloudSync, 
    syncStatus, 
    lastSync, 
    syncToCloud, 
    loadFromCloud 
  } = useResources();
  
  const [binId, setBinId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isOnline] = useState(navigator.onLine);

  const handleSaveSettings = () => {
    if (binId && apiKey) {
      localStorage.setItem('binId', binId);
      localStorage.setItem('apiKey', apiKey);
      setEnableCloudSync(true);
      alert('设置已保存！云端同步已启用。');
    } else {
      alert('请填写完整的配置信息！');
    }
  };

  const handleSyncNow = async () => {
    await syncToCloud();
  };

  const handleLoadFromCloud = async () => {
    await loadFromCloud();
  };

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Cloud className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSyncStatusText = () => {
    switch (syncStatus) {
      case 'syncing':
        return '正在同步...';
      case 'success':
        return '同步成功';
      case 'error':
        return '同步失败';
      default:
        return '未同步';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="p-2 rounded-lg bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <ArrowLeft size={20} />
        </motion.button>
        <div>
          <h1 className="text-3xl font-bold text-gradient">设置</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            配置云端同步和系统设置
          </p>
        </div>
      </motion.div>

      {/* 云端同步设置 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-white/10"
      >
        <div className="flex items-center space-x-3 mb-6">
          {enableCloudSync ? (
            <Cloud className="w-6 h-6 text-blue-500" />
          ) : (
            <CloudOff className="w-6 h-6 text-gray-500" />
          )}
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            云端同步
          </h2>
        </div>

        <div className="space-y-6">
          {/* 网络状态 */}
          <div className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
            {isOnline ? (
              <Wifi className="w-5 h-5 text-green-500" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-500" />
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              网络状态: {isOnline ? '已连接' : '未连接'}
            </span>
          </div>

          {/* 同步状态 */}
          <div className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
            {getSyncStatusIcon()}
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                同步状态: {getSyncStatusText()}
              </span>
              {lastSync && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  最后同步: {lastSync.toLocaleString('zh-CN')}
                </p>
              )}
            </div>
          </div>

          {/* 配置表单 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                JSONBin.io Bin ID
              </label>
              <input
                type="text"
                value={binId}
                onChange={(e) => setBinId(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 dark:bg-dark-700/80 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="输入你的 Bin ID"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                在 JSONBin.io 创建 bin 后获取 ID
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 dark:bg-dark-700/80 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="输入你的 API Key"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                在 JSONBin.io 获取你的 Master Key
              </p>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveSettings}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
            >
              保存设置
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSyncNow}
              disabled={!enableCloudSync}
              className={`flex-1 px-6 py-3 rounded-xl transition-all duration-200 ${
                enableCloudSync
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              立即同步
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadFromCloud}
              disabled={!enableCloudSync}
              className={`flex-1 px-6 py-3 rounded-xl transition-all duration-200 ${
                enableCloudSync
                  ? 'bg-purple-500 text-white hover:bg-purple-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              从云端加载
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* 使用说明 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-blue-50 dark:bg-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
      >
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          📖 如何设置云端同步
        </h3>
        <div className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
          <p><strong>步骤 1:</strong> 访问 <a href="https://jsonbin.io" target="_blank" rel="noopener noreferrer" className="underline">JSONBin.io</a> 并注册账号</p>
          <p><strong>步骤 2:</strong> 创建一个新的 bin</p>
          <p><strong>步骤 3:</strong> 复制 bin ID 和 Master Key</p>
          <p><strong>步骤 4:</strong> 在上方表单中填入信息并保存</p>
          <p><strong>步骤 5:</strong> 启用云端同步，数据将自动同步</p>
        </div>
        <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>注意:</strong> 云端同步需要网络连接。数据会实时同步到云端，同事可以通过相同的配置访问共享数据。
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
