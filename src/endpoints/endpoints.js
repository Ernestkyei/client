// src/endpoints/endpoints.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const BUNDLES = {
  GET_ALL: `${API_BASE_URL}/bundles`,
  GET_BY_ID: (id) => `${API_BASE_URL}/bundles/${id}`,
};

export const ORDERS = {
  CREATE: `${API_BASE_URL}/orders`,
  TRACK: (orderNumber) => `${API_BASE_URL}/orders/track/${orderNumber}`,
  GET_BY_PHONE: (phoneNumber) => `${API_BASE_URL}/orders/customer/${phoneNumber}`,
  CHECK_STATUS: (orderId) => `${API_BASE_URL}/orders/status/${orderId}`,
  INITIALIZE_PAYMENT: (orderId) => `${API_BASE_URL}/orders/${orderId}/pay`,
  WEBHOOK: `${API_BASE_URL}/orders/webhook/paystack`,
};

export const AUTH = {
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
  GET_PROFILE: `${API_BASE_URL}/auth/me`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
};

export const NOTIFICATIONS = {
  GET_ALL: `${API_BASE_URL}/notifications`,
  UNREAD_COUNT: `${API_BASE_URL}/notifications/unread/count`,
  MARK_READ: (id) => `${API_BASE_URL}/notifications/${id}/read`,
  MARK_ALL_READ: `${API_BASE_URL}/notifications/read/all`,
  DELETE: (id) => `${API_BASE_URL}/notifications/${id}`,
};