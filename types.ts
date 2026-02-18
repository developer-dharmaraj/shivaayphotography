
export type Category = 'Wedding' | 'Pre-Wedding' | 'Events' | 'Commercial' | 'Portrait';

export interface GalleryItem {
  id: string;
  title: string;
  category: Category;
  imageUrl: string;
  featured: boolean;
  aspectRatio: 'square' | 'portrait' | 'landscape';
}

export interface Reel {
  id: string;
  title: string;
  category: Category;
  videoUrl: string;
  thumbnailUrl: string;
  location: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  date: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  message: string;
  createdAt: string;
}
