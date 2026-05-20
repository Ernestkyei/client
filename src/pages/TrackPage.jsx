import { useState } from 'react';
import { useTracking } from '../hooks/useTracking';
import OrderStatus from '../components/tracking/OrderStatus';
import Loader from '../components/common/Loader';
import { Search, PackageSearch, AlertCircle, Phone } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { api } from '../services/api';

function TrackPage() {
  const { orderNumber, setOrderNumber, order, loading, error, notFound, handleSubmit } = useTracking();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneOrders, setPhoneOrders] = useState(null);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneSearch = async (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length !== 10) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return;
    }
    
    setPhoneLoading(true);
    setPhoneError('');
    
    try {
      const result = await api.getOrdersByPhone(phoneNumber);
      if (result.success && result.data.length > 0) {
        setPhoneOrders(result.data);
      } else {
        setPhoneError('No orders found for this phone number');
      }
    } catch (err) {
      setPhoneError('Network error. Please try again.');
    }
    setPhoneLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-14">
      <div className="max-w-xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <div className="w-12 h-12 rounded-2xl bg-green-900 flex items-center justify-center mx-auto mb-1 text-green-300">
            <PackageSearch size={22} />
          </div>
          <p className="text-[11px] tracking-widest uppercase text-green-600 font-semibold">Order tracking</p>
          <h1 className="text-3xl font-bold text-green-950 tracking-tight">Track your order</h1>
          <p className="text-sm text-stone-500 leading-relaxed">
            Enter your order number or phone number to check delivery status
          </p>
        </div>

        {/* Tabs for search method */}
        <Tabs defaultValue="order" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-stone-100">
            <TabsTrigger value="order" className="data-[state=active]:bg-green-900 data-[state=active]:text-white">
              Order Number
            </TabsTrigger>
            <TabsTrigger value="phone" className="data-[state=active]:bg-green-900 data-[state=active]:text-white">
              Phone Number
            </TabsTrigger>
          </TabsList>

          {/* Search by Order Number */}
          <TabsContent value="order">
            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
                      Order number
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                      <Input
                        type="text"
                        placeholder="e.g. ORD-123456"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        required
                        className="pl-10 font-mono"
                      />
                    </div>
                    <p className="text-xs text-stone-400 mt-1.5">Order numbers start with ORD- followed by digits</p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-green-900 hover:bg-green-950 text-green-100"
                  >
                    {loading ? <Loader /> : (
                      <>
                        <Search size={15} />
                        Track order
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Search by Phone Number */}
          <TabsContent value="phone">
            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-6">
                <form onSubmit={handlePhoneSearch} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
                      Phone number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                      <Input
                        type="tel"
                        placeholder="024XXXXXXX"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        maxLength={10}
                        required
                        className="pl-10 font-mono"
                      />
                    </div>
                    <p className="text-xs text-stone-400 mt-1.5">Enter the phone number used for purchase</p>
                  </div>

                  <Button
                    type="submit"
                    disabled={phoneLoading}
                    className="w-full h-12 bg-green-900 hover:bg-green-950 text-green-100"
                  >
                    {phoneLoading ? <Loader /> : (
                      <>
                        <PackageSearch size={15} />
                        Find orders
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Error state */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {phoneError && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{phoneError}</span>
          </div>
        )}

        {/* Not found state */}
        {notFound && (
          <div className="flex flex-col items-center gap-3 p-8 bg-amber-50 border border-amber-200 rounded-2xl text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-500">
              <PackageSearch size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-800">Order not found</p>
              <p className="text-xs text-amber-600 mt-1">
                We couldn't find an order matching <span className="font-mono font-medium">{orderNumber}</span>.
              </p>
            </div>
          </div>
        )}

        {/* Order result */}
        {order && <OrderStatus order={order} />}

        {/* Phone Orders Results */}
        {phoneOrders && phoneOrders.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
              <PackageSearch size={18} className="text-green-700" />
              <h3 className="text-sm font-semibold text-green-800">Your Orders ({phoneOrders.length})</h3>
            </div>
            {phoneOrders.map((ord) => (
              <OrderStatus key={ord.id} order={ord} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackPage;
