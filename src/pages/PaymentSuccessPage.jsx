import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Smartphone, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get from location state first
    let orderData = location.state?.order;
    
    // If not, try sessionStorage
    if (!orderData) {
      const savedOrder = sessionStorage.getItem('lastOrder');
      if (savedOrder) {
        orderData = JSON.parse(savedOrder);
        sessionStorage.removeItem('lastOrder');
      }
    }
    
    if (orderData) {
      setOrderDetails(orderData);
      setLoading(false);
    } else {
      setTimeout(() => navigate('/'), 3000);
    }
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Payment Successful! 🎉</h1>
          <p className="text-green-100">Your data bundle has been purchased</p>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Order Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Order Number:</span>
                <span className="font-mono font-semibold">{orderDetails?.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bundle:</span>
                <span className="font-semibold">{orderDetails?.bundleName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount Paid:</span>
                <span className="font-semibold text-green-600">GH₵{orderDetails?.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Beneficiary Phone:</span>
                <span>{orderDetails?.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="text-green-600 font-semibold">✓ Delivered</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-800 text-sm">Data Delivered</p>
                <p className="text-xs text-blue-600 mt-1">
                  Your data bundle has been sent to {orderDetails?.phoneNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={() => navigate('/')} className="w-full bg-green-600 hover:bg-green-700">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
            <Button variant="outline" onClick={() => navigate('/track')} className="w-full">
              Track Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
