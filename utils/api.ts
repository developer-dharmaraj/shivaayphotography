const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://shivaay-backend.onrender.com/api';

// Get auth token from localStorage
const getToken = () => {
  return localStorage.getItem('adminToken');
};

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
};

// File upload helper
export const uploadFile = async (endpoint: string, formData: FormData) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(error.error || 'Upload failed');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  init: async () => {
    return apiRequest('/auth/init', {
      method: 'POST',
    });
  },
};

// Gallery API
export const galleryAPI = {
  getAll: async (category?: string, featured?: boolean) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (featured) params.append('featured', 'true');
    return apiRequest(`/gallery?${params.toString()}`);
  },
  getById: async (id: string) => {
    return apiRequest(`/gallery/${id}`);
  },
  create: async (data: FormData) => {
    return uploadFile('/gallery', data);
  },
  update: async (id: string, data: FormData) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: data,
    });
    if (!response.ok) throw new Error('Update failed');
    return response.json();
  },
  delete: async (id: string) => {
    return apiRequest(`/gallery/${id}`, { method: 'DELETE' });
  },
};

// Banner API
export const bannerAPI = {
  getAll: async () => {
    return apiRequest('/banners');
  },
  getAllAdmin: async () => {
    return apiRequest('/banners/admin/all');
  },
  getById: async (id: string) => {
    return apiRequest(`/banners/${id}`);
  },
  create: async (data: FormData) => {
    return uploadFile('/banners', data);
  },
  update: async (id: string, data: FormData) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/banners/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: data,
    });
    if (!response.ok) throw new Error('Update failed');
    return response.json();
  },
  delete: async (id: string) => {
    return apiRequest(`/banners/${id}`, { method: 'DELETE' });
  },
};

// Video API
export const videoAPI = {
  getAll: async (category?: string) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    return apiRequest(`/videos?${params.toString()}`);
  },
  getAllAdmin: async () => {
    return apiRequest('/videos/admin/all');
  },
  getById: async (id: string) => {
    return apiRequest(`/videos/${id}`);
  },
  create: async (data: FormData) => {
    return uploadFile('/videos', data);
  },
  update: async (id: string, data: FormData) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: data,
    });
    if (!response.ok) throw new Error('Update failed');
    return response.json();
  },
  delete: async (id: string) => {
    return apiRequest(`/videos/${id}`, { method: 'DELETE' });
  },
};

// Blog API
export const blogAPI = {
  getAll: async () => {
    return apiRequest('/blogs');
  },
  getAllAdmin: async () => {
    return apiRequest('/blogs/admin/all');
  },
  getBySlug: async (slug: string) => {
    return apiRequest(`/blogs/slug/${slug}`);
  },
  getById: async (id: string) => {
    return apiRequest(`/blogs/${id}`);
  },
  create: async (data: FormData) => {
    return uploadFile('/blogs', data);
  },
  update: async (id: string, data: FormData) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: data,
    });
    if (!response.ok) throw new Error('Update failed');
    return response.json();
  },
  delete: async (id: string) => {
    return apiRequest(`/blogs/${id}`, { method: 'DELETE' });
  },
};

// Inquiry API
export const inquiryAPI = {
  getAll: async (status?: string) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    return apiRequest(`/inquiries?${params.toString()}`);
  },
  getById: async (id: string) => {
    return apiRequest(`/inquiries/${id}`);
  },
  create: async (data: any) => {
    return apiRequest('/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, status: string) => {
    return apiRequest(`/inquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
  delete: async (id: string) => {
    return apiRequest(`/inquiries/${id}`, { method: 'DELETE' });
  },
};

// Pricing API
export const pricingAPI = {
  getAll: async () => {
    return apiRequest('/pricing');
  },
  getBySlug: async (slug: string) => {
    return apiRequest(`/pricing/slug/${slug}`);
  },
  getById: async (id: string) => {
    return apiRequest(`/pricing/${id}`);
  },
};

// Team API
export const teamAPI = {
  getAll: async () => {
    return apiRequest('/teams');
  },
  getById: async (id: string) => {
    return apiRequest(`/teams/${id}`);
  },
};