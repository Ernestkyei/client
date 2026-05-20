import { Button } from "../ui/button";
import { Shield, Zap, CreditCard, ArrowRight } from "lucide-react";

function HeroSection({ onShopNow, onLearnMore }) {
  return (
    <div className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-20 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm mb-6 mx-auto border border-white/20">
            <Zap size={14} className="text-green-300" />
            <span>Instant Data Delivery</span>
          </div>
          
          {/* Headings */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Buy Mobile Data
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            Quickly & <span className="text-green-300">Securely</span>
          </h2>
          
          {/* Description */}
          <p className="text-base md:text-lg mb-8 opacity-90 leading-relaxed max-w-2xl mx-auto">
            Fast, reliable data bundles across all major networks. 
            Get connected instantly with our secure platform.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button 
              onClick={onShopNow}
              className="bg-white text-green-900 hover:bg-stone-100 font-semibold px-6 py-5 text-base rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              Buy Now
              <ArrowRight size={16} />
            </Button>
            <Button 
              onClick={onLearnMore}
              variant="outline" 
              className="border-white/30 text-green-900  hover:bg-white/10 hover:border-white/50 px-6 py-5 text-base rounded-xl transition-all"
            >
              Learn More
            </Button>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-green-300" />
              <span>Trusted Service</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-green-300" />
              <span>Fast Activation</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="w-4 h-4 text-green-300" />
              <span>Secure Purchase</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;