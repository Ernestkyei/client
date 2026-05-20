import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/common/HeroSection';
import FeaturesSection from '../components/common/FeaturesSection';
import NetworkSelector from '../components/common/NetworkSelector';
import { Zap, Clock, ShieldCheck, Sparkles } from 'lucide-react';

function HomePage() {
  const navigate = useNavigate();
  const networksRef = useRef(null);

  const handleSelectNetwork = (network) => {
    navigate(`/bundles/${network}`);
  };

  const scrollToNetworks = () => {
    if (networksRef.current) {
      networksRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-white">
      <HeroSection onShopNow={scrollToNetworks} onLearnMore={scrollToNetworks} />
      
      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-green-900 to-green-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-xs text-green-300 uppercase tracking-wide">Happy customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">Instant</div>
              <div className="text-xs text-green-300 uppercase tracking-wide">Delivery</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-xs text-green-300 uppercase tracking-wide">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-xs text-green-300 uppercase tracking-wide">Secure</div>
            </div>
          </div>
        </div>
      </div>
      
      <FeaturesSection />
      
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

      {/* Trust Badges */}
      <div className="py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="flex items-center gap-2 text-gray-500">
              <ShieldCheck size={18} className="text-green-600" />
              <span className="text-sm">Secure SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Zap size={18} className="text-green-600" />
              <span className="text-sm">Instant Activation</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
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
