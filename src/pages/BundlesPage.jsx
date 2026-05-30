import { useParams, useNavigate } from 'react-router-dom';
import { useBundles } from '../hooks/useBundles';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { ShoppingCart, Zap, ChevronRight, CheckCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function BundlesPage() {
  const { network } = useParams();
  const navigate = useNavigate();
  const { bundles, loading, error } = useBundles(network);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPorted, setIsPorted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  
  // Create ref for the bundle section
  const bundleSectionRef = useRef(null);

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (showSummary || isProcessing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSummary, isProcessing]);

  const getNetworkColor = () => {
    const colors = {
      MTN: 'text-yellow-600',
      VODAFONE: 'text-red-600',
      AIRTELTIGO: 'text-blue-600',
      GLO: 'text-purple-600',
    };
    return colors[network] || 'text-green-600';
  };

  const networkColor = getNetworkColor();
  const prices = bundles.map(b => b.sellingPrice);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const sortedBundles = [...bundles].sort((a, b) => parseInt(a.dataSize) - parseInt(b.dataSize));

  const handleSizeSelect = (bundle) => {
    setSelectedSize(bundle.dataSize);
    setSelectedBundle(bundle);
    setErrorMsg('');
  };

  const handleProceedToPayment = async () => {
    setShowSummary(false);
    setIsProcessing(true);

    try {
      const orderResult = await api.createOrder(selectedBundle.id, phoneNumber);
      
      if (!orderResult.success) {
        setErrorMsg(orderResult.message || 'Failed to create order');
        setIsProcessing(false);
        return;
      }

      const paymentResult = await api.initializePayment(orderResult.data.orderId);
      
      if (paymentResult.success && paymentResult.data.authorization_url) {
        window.location.href = paymentResult.data.authorization_url;
      } else {
        setErrorMsg(paymentResult.message || 'Payment initialization failed');
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setErrorMsg('Network error. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleBuyClick = () => {
    if (!selectedBundle) {
      setErrorMsg('Please select a bundle size');
      return;
    }

    if (!phoneNumber || phoneNumber.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit phone number');
      return;
    }

    setShowSummary(true);
    setErrorMsg('');
  };

  const handlePhoneChange = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(cleaned);
    if (errorMsg) setErrorMsg('');
  };

  // Function to scroll to the bundle selection section
  const scrollToBundleSection = () => {
    if (bundleSectionRef.current) {
      bundleSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 px-4 py-8 md:py-14 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-1.5 mb-7">
            <Skeleton className="h-4 w-12" />
            <ChevronRight size={13} className="text-gray-300" />
            <Skeleton className="h-4 w-10" />
            <ChevronRight size={13} className="text-gray-300" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="mb-8">
            <Skeleton className="h-8 w-96 mb-2" />
            <Skeleton className="h-4 w-full max-w-md" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-8 w-40 mb-6" />
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2.5">
                  {[...Array(12)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-xl" />
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sticky top-4">
                <Skeleton className="h-5 w-16 mb-4" />
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-10 w-full rounded-xl mb-4" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div className="text-center text-red-500 py-16 text-sm">{error}</div>;

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-8 md:py-14 overflow-y-auto">
      <div className="max-w-7xl mx-auto">

        {/* Order Summary Modal - shadcn Dialog with solid background */}
        <Dialog open={showSummary} onOpenChange={setShowSummary}>
          <DialogContent className="sm:max-w-md bg-white border-stone-200 shadow-xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <DialogHeader className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-green-900 flex items-center justify-center mx-auto">
                  <ShoppingCart size={24} className="text-green-300" />
                </div>
                <DialogTitle className="text-2xl font-bold text-center text-green-950">Order Summary</DialogTitle>
                <DialogDescription className="text-center text-stone-500 text-sm">
                  Review your order details before proceeding to payment
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="bg-stone-50 rounded-xl p-4 space-y-3 border border-stone-200">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600 text-sm">Bundle:</span>
                    <span className="font-semibold text-stone-900">{selectedBundle?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600 text-sm">Data Size:</span>
                    <span className="font-semibold text-stone-900">{selectedBundle?.dataSize}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600 text-sm">Network:</span>
                    <span className="font-semibold text-stone-900">{selectedBundle?.network}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600 text-sm">Phone Number:</span>
                    <span className="font-mono font-semibold text-stone-900">{phoneNumber}</span>
                  </div>
                  <div className="border-t border-stone-200 pt-3 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-stone-800">Total:</span>
                      <span className="text-2xl font-bold text-green-900">GH₵{selectedBundle?.sellingPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                  <div className="flex items-center gap-2 text-sm text-green-800">
                    <Zap size={16} />
                    <span className="font-semibold">Instant Delivery</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Data will be sent immediately after payment confirmation
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowSummary(false)} 
                  className="flex-1 border-stone-300 text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                >
                  Edit
                </Button>
                <Button 
                  onClick={handleProceedToPayment} 
                  disabled={isProcessing}
                  className="flex-1 bg-green-900 hover:bg-green-950 text-green-100"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} className="mr-2" />
                      Confirm & Pay
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Processing Modal with solid background */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full shadow-2xl border border-stone-200 my-8">
              <div className="w-20 h-20 border-4 border-stone-200 border-t-green-900 rounded-full animate-spin mx-auto mb-5"></div>
              <h3 className="text-xl font-semibold text-green-950 mb-2">Processing Payment</h3>
              <p className="text-stone-500 text-sm">Please wait while we prepare Paystack...</p>
              <p className="text-xs text-green-800 mt-4 font-medium">Do not close this window</p>
            </div>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-7 flex-wrap">
          <button onClick={() => navigate('/')} className="hover:text-green-900 transition-colors">Home</button>
          <ChevronRight size={13} />
          <button 
            onClick={scrollToBundleSection}
            className="hover:text-green-900 transition-colors cursor-pointer"
          >
            Buy Now
          </button>
          <ChevronRight size={13} />
          <span className={networkColor}>{network} Non-Expiry</span>
        </div>

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-green-900 flex items-center justify-center mx-auto mb-4">
            <Zap size={24} className="text-green-300" />
          </div>
          <p className="text-[11px] tracking-widest uppercase text-green-600 font-semibold mb-2">Data bundles</p>
          <h1 className="text-3xl md:text-4xl font-bold text-green-950 tracking-tight mb-3">
            Buy {network} Non-Expiry Data Bundles
          </h1>
          <p className="text-sm text-stone-500 leading-relaxed max-w-2xl mx-auto">
            Choose a bundle size, enter the beneficiary number, and complete checkout instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: Bundle Sizes */}
          <div className="lg:col-span-2">
            <div ref={bundleSectionRef} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
              <div className="mb-5">
                <h2 className="text-base font-semibold text-green-950 mb-0.5">{network} Non-Expiry</h2>
                <p className="text-xs text-stone-400">Home / Shop / {network} Non-Expiry</p>
              </div>

              <div className="mb-6">
                <p className="text-xs text-stone-400 mb-1 font-medium uppercase tracking-wide">Price range</p>
                <h3 className="text-2xl font-bold text-green-900 tracking-tight font-mono">
                  GH₵{minPrice} – GH₵{maxPrice}
                </h3>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-stone-700 mb-3">Select your preferred bundle size:</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
                  {sortedBundles.map((bundle) => (
                    <button
                      key={bundle.id}
                      onClick={() => handleSizeSelect(bundle)}
                      className={`
                        py-3 px-2 rounded-xl border-2 font-semibold text-sm transition-all text-center
                        ${selectedSize === bundle.dataSize
                          ? 'border-green-900 bg-green-50 text-green-900 shadow-sm'
                          : 'border-stone-200 hover:border-stone-300 bg-white text-stone-600 hover:bg-stone-50'
                        }
                      `}
                    >
                      {bundle.dataSize}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2.5 p-3.5 bg-green-50 border border-green-200 rounded-xl">
                <Zap size={15} className="text-green-700 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-green-800 leading-relaxed">
                  <span className="font-semibold">Instant delivery</span> — data is sent immediately after payment confirmation.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Price & Checkout */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sticky top-4">
              <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-4">Order Summary</h3>

              <div className="mb-6 p-4 rounded-xl bg-stone-50 border border-stone-200">
                {selectedBundle ? (
                  <>
                    <span className="text-3xl font-bold text-green-900 font-mono tracking-tight">
                      GH₵{selectedBundle.sellingPrice}
                    </span>
                    <p className="text-xs text-stone-500 mt-1">{selectedBundle.dataSize} · Non-expiry data</p>
                  </>
                ) : (
                  <>
                    <span className="text-xl font-bold text-stone-700 font-mono tracking-tight">
                      GH₵{minPrice} – GH₵{maxPrice}
                    </span>
                    <p className="text-xs text-stone-400 mt-1">Select a bundle size to see price</p>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5 uppercase tracking-wide">
                    Beneficiary Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="024 XXX XXXX"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    maxLength={10}
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-900/20 focus:border-green-900 transition-all placeholder:text-stone-300 font-mono tracking-wide"
                  />
                  <p className="text-xs text-stone-400 mt-1.5">Must be exactly 10 digits starting with 0</p>
                </div>

                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="ported"
                    checked={isPorted}
                    onChange={(e) => setIsPorted(e.target.checked)}
                    className="rounded border-stone-300 text-green-900 focus:ring-green-900"
                  />
                  <label htmlFor="ported" className="text-sm text-stone-600 cursor-pointer select-none">
                    This is a ported number
                  </label>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                    {errorMsg}
                  </div>
                )}

                <Button
                  onClick={handleBuyClick}
                  disabled={!selectedBundle}
                  className="w-full h-12 bg-green-900 hover:bg-green-950 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-green-900/20 text-green-100"
                >
                  <ShoppingCart size={15} />
                  {selectedBundle ? `Review Order` : 'Select a bundle'}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full h-10 text-sm text-stone-400 hover:text-stone-600 hover:bg-stone-50 rounded-xl"
                  onClick={() => { 
                    setSelectedSize(null); 
                    setSelectedBundle(null);
                    setPhoneNumber('');
                    setErrorMsg('');
                  }}
                >
                  Clear selection
                </Button>
              </div>

              <div className="mt-5 pt-5 border-t border-stone-200">
                <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Delivery</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Data is delivered instantly after successful payment. A confirmation SMS will be sent to the beneficiary number.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BundlesPage;