import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCloudSync } from '../hooks/useCloudSync';
import { LearningResource, Category } from '../types';

interface ResourceContextType {
  resources: LearningResource[];
  setResources: (resources: LearningResource[]) => void;
  addResource: (resource: Omit<LearningResource, 'id' | 'addedDate'>) => void;
  updateResource: (id: string, updates: Partial<LearningResource>) => void;
  deleteResource: (id: string) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  // 云端同步相关
  enableCloudSync: boolean;
  setEnableCloudSync: (enable: boolean) => void;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  lastSync: Date | null;
  syncToCloud: () => Promise<void>;
  loadFromCloud: () => Promise<void>;
}

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

const defaultCategories: Category[] = [
  { id: '1', name: '前端开发', color: '#3b82f6', icon: '💻' },
  { id: '2', name: '后端开发', color: '#10b981', icon: '⚙️' },
  { id: '3', name: '数据科学', color: '#f59e0b', icon: '📊' },
  { id: '4', name: '设计', color: '#ef4444', icon: '🎨' },
  { id: '5', name: '工具', color: '#8b5cf6', icon: '🛠️' },
];

export function ResourceProvider({ children }: { children: React.ReactNode }) {
  const [resources, setResources] = useLocalStorage<LearningResource[]>('resources', []);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', defaultCategories);
  const [enableCloudSync, setEnableCloudSync] = useLocalStorage<boolean>('enableCloudSync', false);
  const [binId] = useLocalStorage<string>('binId', '');
  const [apiKey] = useLocalStorage<string>('apiKey', '');
  
  const { isOnline, lastSync, syncStatus, loadFromCloud, saveToCloud } = useCloudSync({
    enableSync: enableCloudSync,
    binId,
    apiKey
  });

  const addResource = (resourceData: Omit<LearningResource, 'id' | 'addedDate'>) => {
    const newResource: LearningResource = {
      ...resourceData,
      id: Date.now().toString(),
      addedDate: new Date().toISOString(),
    };
    setResources([...resources, newResource]);
  };

  const updateResource = (id: string, updates: Partial<LearningResource>) => {
    setResources(resources.map(resource => 
      resource.id === id ? { ...resource, ...updates } : resource
    ));
  };

  const deleteResource = (id: string) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  // 同步到云端
  const syncToCloud = async () => {
    if (enableCloudSync && isOnline) {
      await saveToCloud(resources, categories);
    }
  };

  // 从云端加载
  const loadFromCloudData = async () => {
    if (enableCloudSync && isOnline) {
      const cloudData = await loadFromCloud();
      if (cloudData.resources.length > 0) {
        setResources(cloudData.resources);
      }
      if (cloudData.categories.length > 0) {
        setCategories(cloudData.categories);
      }
    }
  };

  // 当数据变化时自动同步到云端
  useEffect(() => {
    if (enableCloudSync && isOnline) {
      const timeoutId = setTimeout(() => {
        syncToCloud();
      }, 1000); // 延迟1秒同步，避免频繁请求

      return () => clearTimeout(timeoutId);
    }
  }, [resources, categories, enableCloudSync, isOnline]);

  return (
    <ResourceContext.Provider value={{
      resources,
      setResources,
      addResource,
      updateResource,
      deleteResource,
      categories,
      setCategories,
      enableCloudSync,
      setEnableCloudSync,
      syncStatus,
      lastSync,
      syncToCloud,
      loadFromCloud: loadFromCloudData,
    }}>
      {children}
    </ResourceContext.Provider>
  );
}

export function useResources() {
  const context = useContext(ResourceContext);
  if (context === undefined) {
    throw new Error('useResources must be used within a ResourceProvider');
  }
  return context;
}
