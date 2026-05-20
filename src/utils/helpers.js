export const formatPrice = (price) => {
  return `${price} GHS`;
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleString();
};

export const getStatusBadge = (status) => {
  const badges = {
    DELIVERED: { class: 'bg-green-100 text-green-800', text: '✅ Delivered' },
    PENDING_DELIVERY: { class: 'bg-yellow-100 text-yellow-800', text: '⏳ Processing' },
    FAILED: { class: 'bg-red-100 text-red-800', text: '❌ Failed' }
  };
  return badges[status] || badges.PENDING_DELIVERY;
};
