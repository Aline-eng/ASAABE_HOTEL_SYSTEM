import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: any) => api.post('/auth/register/', userData),
  login: (credentials: any) => api.post('/auth/login/', credentials),
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (data: any) => api.patch('/auth/profile/', data),
};

// Rooms API
export const roomsAPI = {
  getRooms: (params?: any) => api.get('/rooms/', { params }),
  getRoom: (id: number) => api.get(`/rooms/${id}/`),
  getFeaturedRooms: () => api.get('/rooms/featured/'),
  addReview: (roomId: number, review: any) => api.post(`/rooms/${roomId}/add_review/`, review),
  getRoomTypes: () => api.get('/room-types/'),
  getAmenities: () => api.get('/amenities/'),
};

// Bookings API
export const bookingsAPI = {
  getBookings: () => api.get('/bookings/'),
  createBooking: (bookingData: any) => api.post('/bookings/', bookingData),
  getBooking: (id: number) => api.get(`/bookings/${id}/`),
  confirmBooking: (id: number) => api.post(`/bookings/${id}/confirm/`),
  checkIn: (id: number) => api.post(`/bookings/${id}/check_in/`),
  checkOut: (id: number) => api.post(`/bookings/${id}/check_out/`),
  cancelBooking: (id: number) => api.post(`/bookings/${id}/cancel/`),
};

// Payments API
export const paymentsAPI = {
  createPaymentIntent: (bookingId: number) => 
    api.post('/payments/create-intent/', { booking_id: bookingId }),
  confirmPayment: (paymentIntentId: string) => 
    api.post('/payments/confirm/', { payment_intent_id: paymentIntentId }),
  getPayments: () => api.get('/payments/'),
};

export default api;