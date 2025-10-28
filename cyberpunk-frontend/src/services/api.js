import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Configuration axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Services API
export const apiService = {
  // Categories
  getCategories: () => api.get('/categories/'),
  getCategory: (slug) => api.get(`/categories/${slug}/`),

  // Products
  getProducts: (params = {}) => api.get('/products/', { params }),
  getProduct: (slug) => api.get(`/products/${slug}/`),
  getFeaturedProducts: () => api.get('/products/featured/'),
  searchProducts: (query) => api.get(`/products/search/?q=${query}`),

  // Reviews
  createReview: (productSlug, reviewData) => 
    api.post(`/products/${productSlug}/add_review/`, reviewData),
  getReviews: () => api.get('/reviews/'),

  // Cart
  getCart: () => api.get('/cart/'),
  addToCart: (productId, quantity = 1) => 
    api.post('/cart/add_item/', { product_id: productId, quantity }),
  removeFromCart: (productId) => 
    api.post('/cart/remove_item/', { product_id: productId }),
  updateCartItem: (productId, quantity) => 
    api.post('/cart/update_quantity/', { product_id: productId, quantity }),

  // User
  getUser: () => api.get('/users/'),
};

export default api;
