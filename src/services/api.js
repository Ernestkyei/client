const API_BASE = 'http://localhost:5000/api';

export const api = {
  // ==================== AUTH ====================
  async login(credentials) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return res.json();
  },

  async register(userData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  async getProfile(token) {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  async refreshToken(refreshToken) {
    const res = await fetch(`${API_BASE}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    return res.json();
  },

  async logout(token) {
    const res = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  // ==================== BUNDLES ====================
  async getBundles() {
    const res = await fetch(`${API_BASE}/bundles`);
    return res.json();
  },

  async getBundleById(id) {
    const res = await fetch(`${API_BASE}/bundles/${id}`);
    return res.json();
  },

  // ==================== ORDERS ====================
  async createOrder(bundleId, phoneNumber) {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bundleId, phoneNumber })
    });
    return res.json();
  },

  async initializePayment(orderId) {
    const res = await fetch(`${API_BASE}/orders/${orderId}/pay`, {
      method: 'POST'
    });
    return res.json();
  },

  async trackOrder(orderNumber) {
    const res = await fetch(`${API_BASE}/orders/track/${orderNumber}`);
    return res.json();
  },

  async getOrdersByPhone(phoneNumber) {
    const res = await fetch(`${API_BASE}/orders/customer/${phoneNumber}`);
    return res.json();
  },

  async checkOrderStatus(orderId) {
    const res = await fetch(`${API_BASE}/orders/status/${orderId}`);
    return res.json();
  },

  // ==================== NOTIFICATIONS ====================
  async getNotifications(token) {
    const res = await fetch(`${API_BASE}/notifications`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  async getUnreadCount(token) {
    const res = await fetch(`${API_BASE}/notifications/unread/count`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  async markNotificationAsRead(notificationId, token) {
    const res = await fetch(`${API_BASE}/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  async markAllNotificationsAsRead(token) {
    const res = await fetch(`${API_BASE}/notifications/read/all`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  async deleteNotification(notificationId, token) {
    const res = await fetch(`${API_BASE}/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` } 
    });
    return res.json();
  }
};
