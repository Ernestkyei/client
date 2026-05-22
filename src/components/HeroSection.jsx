import { Button } from "../ui/button";
import { Shield, Zap, CreditCard, ArrowRight } from "lucide-react";
// Import the image from assets folder
import kidaveBg from "../assets/kidave.png";

function HeroSection({ onShopNow, onLearnMore }) {
  return (
    <div className="relative text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${kidaveBg})`,
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Subtle green gradient overlay for brand touch */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-emerald-900/20"></div>
      </div>
      
      {/* Floating bubbles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/5 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-white/5 rounded-full animate-float-fast"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full animate-float-medium"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
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
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-6 py-5 text-base rounded-xl transition-all"
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
      
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(-15px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(10px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default HeroSection;
