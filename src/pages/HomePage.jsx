import { useRef, useState, useEffect } from 'react';
import HeroSection from '../components/common/HeroSection';
import FeaturesSection from '../components/common/FeaturesSection';
import NetworkSelector from '../components/common/NetworkSelector';
import { Zap, Clock, ShieldCheck, Sparkles } from 'lucide-react';

function HomePage() {
  const networksRef = useRef(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  // Telcos original colors only (MTN, Vodafone, AirtelTigo)
  const networkColors = [
    { name: 'MTN', from: 'from-yellow-500', to: 'to-yellow-700', accent: 'text-yellow-200', bg: 'bg-yellow-500' },
    { name: 'Vodafone', from: 'from-red-500', to: 'to-red-700', accent: 'text-red-200', bg: 'bg-red-500' },
    { name: 'AirtelTigo', from: 'from-blue-500', to: 'to-blue-700', accent: 'text-blue-200', bg: 'bg-blue-500' },
  ];

  // Rotate colors every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % networkColors.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [networkColors.length]);

  const currentColor = networkColors[currentColorIndex];

  const scrollToNetworks = () => {
    if (networksRef.current) {
      networksRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white">
      <HeroSection onShopNow={scrollToNetworks} onLearnMore={scrollToNetworks} />
      
      {/* Animated Stats Banner - Rotates through telco colors */}
      <div className={`bg-gradient-to-r ${currentColor.from} ${currentColor.to} text-white py-8 transition-all duration-1000 ease-in-out`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-2">
            <span className={`text-xs font-semibold uppercase tracking-wider ${currentColor.accent}`}>
              Featured Network: {currentColor.name}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold">50K+</div>
              <div className={`text-xs ${currentColor.accent} uppercase tracking-wide`}>Happy customers</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold">Instant</div>
              <div className={`text-xs ${currentColor.accent} uppercase tracking-wide`}>Delivery</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold">24/7</div>
              <div className={`text-xs ${currentColor.accent} uppercase tracking-wide`}>Support</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold">100%</div>
              <div className={`text-xs ${currentColor.accent} uppercase tracking-wide`}>Secure</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated color indicator dots */}
      <div className="flex justify-center gap-2 py-3 bg-white">
        {networkColors.map((color, index) => (
          <button
            key={color.name}
            onClick={() => setCurrentColorIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentColorIndex === index 
                ? `w-6 ${color.bg}` 
                : 'bg-gray-300'
            }`}
            aria-label={`Show ${color.name} colors`}
          />
        ))}
      </div>

  {/* Network Selection Section */}
      <div ref={networksRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Sparkles size={14} />
              <span>All Major Networks</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Network</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Select your network to browse available data bundles
            </p>
          </div>
          <NetworkSelector />
        </div>
      </div>

      
      <FeaturesSection />
      
    
      {/* Trust Badges */}
      <div className="py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors duration-300">
              <ShieldCheck size={18} className="text-green-600" />
              <span className="text-sm">Secure SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors duration-300">
              <Zap size={18} className="text-green-600" />
              <span className="text-sm">Instant Activation</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors duration-300">
              <Clock size={18} className="text-green-600" />
              <span className="text-sm">24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
