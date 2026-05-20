import { useState } from 'react';
import { api } from '../services/api';

export const useTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  const trackOrder = async (number) => {
    if (!number.trim()) return;

    setLoading(true);
    setError('');
    setNotFound(false);
    setOrder(null);

    try {
      const result = await api.trackOrder(number);
      
      if (result.success) {
        setOrder(result.data);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    trackOrder(orderNumber);
  };

  return {
    orderNumber,
    setOrderNumber,
    order,
    loading,
    error,
    notFound,
    handleSubmit,
    trackOrder
  };
};
