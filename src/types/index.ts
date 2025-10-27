export interface LearningResource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'video' | 'article' | 'course' | 'book' | 'tool';
  category: string;
  tags: string[];
  addedDate: string;
  rating: number;
  isFavorite: boolean;
  thumbnail?: string;
  duration?: string; // for videos
  author?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface FilterOptions {
  type?: string;
  category?: string;
  difficulty?: string;
  rating?: number;
  search?: string;
}

export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
}
