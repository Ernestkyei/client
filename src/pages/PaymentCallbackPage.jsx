import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function PaymentCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying payment...');
  const reference = searchParams.get('reference') || searchParams.get('trxref');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setMessage('Verifying your payment...');
        
        console.log('Verifying reference:', reference);
        
        const res = await fetch(`http://localhost:5000/api/orders/verify-payment/${reference}`);
        const data = await res.json();
        
        console.log('Verification response:', data);
        
        if (data.success === true) {
          setStatus('success');
          setMessage('Payment successful! Redirecting to home...');
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        } else {
          setStatus('failed');
          setMessage(data.message || 'Payment verification failed. Redirecting...');
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('failed');
        setMessage('Error verifying payment. Redirecting...');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      }
    };
    
    if (reference) {
      verifyPayment();
    } else {
      setStatus('failed');
      setMessage('No payment reference found. Redirecting...');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  }, [reference]);

  if (status === 'verifying') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{message}</h2>
          <p className="text-gray-500 text-sm">Please wait...</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful! 🎉</h2>
          <p className="text-gray-500 mb-4">{message}</p>
          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <div className="w-full h-full bg-green-600 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-white px-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
        <p className="text-gray-500 mb-4">{message}</p>
        <p className="text-sm text-gray-400">Redirecting to home page...</p>
      </div>
    </div>
  );
}

export default PaymentCallbackPage;
