// src/services/api.js
import { 
  AUTH, 
  BUNDLES, 
  ORDERS, 
  NOTIFICATIONS 
} from '../endpoints/endpoints';

export const api = {
  // ==================== AUTH ====================
  async login(credentials) {
    const res = await fetch(AUTH.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return res.json();
  },

  async register(userData) {
    const res = await fetch(AUTH.REGISTER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  async getProfile(token) {
    const res = await fetch(AUTH.GET_PROFILE, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  async refreshToken(refreshToken) {
    const res = await fetch(AUTH.REFRESH_TOKEN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    return res.json();
  },

  async logout(token) {
    const res = await fetch(AUTH.LOGOUT, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  // ==================== BUNDLES ====================
  async getBundles() {
    const res = await fetch(BUNDLES.GET_ALL);
    return res.json();
  },

  async getBundleById(id) {
    const res = await fetch(BUNDLES.GET_BY_ID(id));
    return res.json();
  },

  // ==================== ORDERS ====================
  async createOrder(bundleId, phoneNumber) {
    const res = await fetch(ORDERS.CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bundleId, phoneNumber })
    });
    return res.json();
  },

  async initializePayment(orderId) {
    const res = await fetch(ORDERS.INITIALIZE_PAYMENT(orderId), {
      method: 'POST'
    });
    return res.json();
  },

  async trackOrder(orderNumber) {
    const res = await fetch(ORDERS.TRACK(orderNumber));
    return res.json();
  },

  async getOrdersByPhone(phoneNumber) {
    const res = await fetch(ORDERS.GET_BY_PHONE(phoneNumber));
    return res.json();
  },

  async checkOrderStatus(orderId) {
    const res = await fetch(ORDERS.CHECK_STATUS(orderId));
    return res.json();
  },

  // ==================== NOTIFICATIONS ====================
  async getNotifications(token) {
    const res = await fetch(NOTIFICATIONS.GET_ALL, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  async getUnreadCount(token) {
    const res = await fetch(NOTIFICATIONS.UNREAD_COUNT, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  async markNotificationAsRead(notificationId, token) {
    const res = await fetch(NOTIFICATIONS.MARK_READ(notificationId), {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  async markAllNotificationsAsRead(token) {
    const res = await fetch(NOTIFICATIONS.MARK_ALL_READ, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  async deleteNotification(notificationId, token) {
    const res = await fetch(NOTIFICATIONS.DELETE(notificationId), {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` } 
    });
    return res.json();
  }
};