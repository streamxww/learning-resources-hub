// 使用 JSONBin.io 作为免费的数据存储服务
const API_BASE_URL = 'https://api.jsonbin.io/v3/b';
const BIN_ID = 'your-bin-id'; // 需要替换为实际的bin ID
const API_KEY = 'your-api-key'; // 需要替换为实际的API key

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 获取所有资源
export async function fetchResources(): Promise<ApiResponse<any[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch resources');
    }
    
    const data = await response.json();
    return { success: true, data: data.record || [] };
  } catch (error) {
    console.error('Error fetching resources:', error);
    return { success: false, error: 'Failed to fetch resources' };
  }
}

// 保存所有资源
export async function saveResources(resources: any[]): Promise<ApiResponse<boolean>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'X-Master-Key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resources)
    });
    
    if (!response.ok) {
      throw new Error('Failed to save resources');
    }
    
    return { success: true, data: true };
  } catch (error) {
    console.error('Error saving resources:', error);
    return { success: false, error: 'Failed to save resources' };
  }
}

// 获取所有分类
export async function fetchCategories(): Promise<ApiResponse<any[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${BIN_ID}-categories/latest`, {
      headers: {
        'X-Master-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    const data = await response.json();
    return { success: true, data: data.record || [] };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { success: false, error: 'Failed to fetch categories' };
  }
}

// 保存所有分类
export async function saveCategories(categories: any[]): Promise<ApiResponse<boolean>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${BIN_ID}-categories`, {
      method: 'PUT',
      headers: {
        'X-Master-Key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(categories)
    });
    
    if (!response.ok) {
      throw new Error('Failed to save categories');
    }
    
    return { success: true, data: true };
  } catch (error) {
    console.error('Error saving categories:', error);
    return { success: false, error: 'Failed to save categories' };
  }
}
