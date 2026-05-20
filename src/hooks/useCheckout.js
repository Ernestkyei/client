import { useState } from 'react';
import { api } from '../services/api';
import { validatePhoneNumber } from '../services/validation';

export const useCheckout = (bundle, onSuccess) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneChange = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(cleaned);
    if (error) setError('');
  };

  const processPayment = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Enter valid 10-digit phone number starting with 0');
      return false;
    }

    setLoading(true);
    setError('');

    try {
      const orderResult = await api.createOrder(bundle.id, phoneNumber);
      
      if (!orderResult.success) {
        setError(orderResult.message);
        setLoading(false);
        return false;
      }

      const paymentResult = await api.initializePayment(orderResult.data.orderId);
      
      if (paymentResult.success) {
        if (onSuccess) onSuccess(paymentResult.data.paymentUrl);
        return true;
      } else {
        setError(paymentResult.message || 'Payment initialization failed');
        setLoading(false);
        return false;
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
      return false;
    }
  };

  return {
    phoneNumber,
    loading,
    error,
    handlePhoneChange,
    processPayment
  };
};
