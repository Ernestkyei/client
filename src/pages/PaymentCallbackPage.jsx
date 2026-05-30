import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Smartphone, Package, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

function PaymentCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying payment...');
  const [orderDetails, setOrderDetails] = useState(null);
  const reference = searchParams.get('reference') || searchParams.get('trxref');

  // Get API URL from environment variable
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setMessage('Verifying your payment...');
        
        console.log('Verifying reference:', reference);
        console.log('API URL:', API_URL);
        
        // FIXED: Use environment variable instead of hardcoded localhost
        const res = await fetch(`${API_URL}/orders/verify-payment/${reference}`);
        const data = await res.json();
        
        console.log('Verification response:', data);
        
        if (data.success === true) {
          setStatus('success');
          setMessage('Payment successful!');
          setOrderDetails(data.order || data.data);
        } else {
          setStatus('failed');
          setMessage(data.message || 'Payment verification failed.');
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('failed');
        setMessage('Error verifying payment.');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      }
    };
    
    if (reference) {
      verifyPayment();
    } else {
      setStatus('failed');
      setMessage('No payment reference found.');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  }, [reference, API_URL]);

  // Rest of your component remains exactly the same...
  if (status === 'verifying') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-900 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{message}</h2>
          <p className="text-gray-500 text-sm">Please wait...</p>
        </div>
      </div>
    );
  }

  if (status === 'success' && orderDetails) {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
          <div className="bg-green-900 px-6 py-8 text-center">
            <div className="w-20 h-20 bg-green-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-300" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Payment Successful! 🎉</h1>
            <p className="text-green-200 text-sm">Your order has been confirmed</p>
          </div>
          
          <div className="p-6">
            <div className="bg-stone-50 rounded-xl p-4 space-y-3 mb-6">
              <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                <span className="text-stone-500 text-sm">Order Number</span>
                <span className="font-mono font-bold text-green-900">{orderDetails.orderNumber || orderDetails.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500 text-sm">Network</span>
                <span className="font-semibold text-stone-900">{orderDetails.network || orderDetails.bundle?.network}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500 text-sm">Bundle Size</span>
                <span className="font-semibold text-stone-900">{orderDetails.dataSize || orderDetails.bundle?.dataSize}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500 text-sm">Amount Paid</span>
                <span className="font-bold text-green-900 text-lg">GH₵{orderDetails.amount || orderDetails.sellingPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500 text-sm">Phone Number</span>
                <span className="font-mono font-semibold text-stone-900 flex items-center gap-1">
                  <Smartphone size={14} />
                  {orderDetails.phoneNumber}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-stone-200">
                <span className="text-stone-500 text-sm">Status</span>
                <span className="text-green-700 text-sm font-semibold">Delivered ✅</span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <p className="text-xs text-yellow-800 text-center">
                🧪 This is a DEMO transaction. No real payment was processed.
                <br />
                📱 Use the phone number above to track your order.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-green-800 mb-2">How to track your order:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-green-700">
                  <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold">1</span>
                  <span>Go to <strong>Track Orders</strong> page</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-700">
                  <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold">2</span>
                  <span>Select <strong>Phone Number</strong> tab</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-700">
                  <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold">3</span>
                  <span>Enter: <strong className="font-mono">{orderDetails.phoneNumber}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/track')}
                className="flex-1 bg-green-900 hover:bg-green-950 text-green-100"
              >
                <Package size={16} className="mr-2" />
                Track Order
              </Button>
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="flex-1 border-stone-300 text-stone-700 hover:bg-stone-50"
              >
                Continue Shopping
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'success' && !orderDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful! 🎉</h2>
          <p className="text-gray-500 mb-4">{message}</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate('/track')} className="bg-green-900 hover:bg-green-950">
              Track Your Order
            </Button>
            <Button onClick={() => navigate('/')} variant="outline">
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-white px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
        <p className="text-gray-500 mb-4">{message}</p>
        <Button onClick={() => navigate('/')} className="bg-green-900 hover:bg-green-950">
          Return to Home
        </Button>
      </div>
    </div>
  );
}

export default PaymentCallbackPage;