import { useState, useEffect } from 'react';
import { fetchResources, saveResources, fetchCategories, saveCategories } from '../services/api';
import { LearningResource, Category } from '../types';

interface UseCloudSyncOptions {
  enableSync: boolean;
  binId?: string;
  apiKey?: string;
}

export function useCloudSync(options: UseCloudSyncOptions) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  // 监听网络状态
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 从云端加载数据
  const loadFromCloud = async (): Promise<{ resources: LearningResource[], categories: Category[] }> => {
    if (!options.enableSync || !options.binId || !options.apiKey) {
      return { resources: [], categories: [] };
    }

    setSyncStatus('syncing');
    try {
      const [resourcesResult, categoriesResult] = await Promise.all([
        fetchResources(),
        fetchCategories()
      ]);

      if (resourcesResult.success && categoriesResult.success) {
        setSyncStatus('success');
        setLastSync(new Date());
        return {
          resources: resourcesResult.data || [],
          categories: categoriesResult.data || []
        };
      } else {
        setSyncStatus('error');
        return { resources: [], categories: [] };
      }
    } catch (error) {
      console.error('Error loading from cloud:', error);
      setSyncStatus('error');
      return { resources: [], categories: [] };
    }
  };

  // 保存数据到云端
  const saveToCloud = async (resources: LearningResource[], categories: Category[]): Promise<boolean> => {
    if (!options.enableSync || !options.binId || !options.apiKey) {
      return false;
    }

    setSyncStatus('syncing');
    try {
      const [resourcesResult, categoriesResult] = await Promise.all([
        saveResources(resources),
        saveCategories(categories)
      ]);

      if (resourcesResult.success && categoriesResult.success) {
        setSyncStatus('success');
        setLastSync(new Date());
        return true;
      } else {
        setSyncStatus('error');
        return false;
      }
    } catch (error) {
      console.error('Error saving to cloud:', error);
      setSyncStatus('error');
      return false;
    }
  };

  return {
    isOnline,
    lastSync,
    syncStatus,
    loadFromCloud,
    saveToCloud
  };
}
