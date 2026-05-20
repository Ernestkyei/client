import { Card, CardContent } from "../ui/card";
import { Zap, Globe, Shield, Clock } from "lucide-react";

const features = [
  {
    title: 'Instant Data Delivery',
    description: 'Get your data delivered instantly after payment — no delays.',
    icon: Zap,
    color: 'bg-orange-50 text-orange-600',
  },
  {
    title: 'All Networks Supported',
    description: 'MTN, Vodafone, AirtelTigo, Glo — all in one place.',
    icon: Globe,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Secure Payments',
    description: 'Your payments are protected with secure gateways.',
    icon: Shield,
    color: 'bg-green-50 text-green-600',
  },
  {
    title: '24/7 Support',
    description: 'Our team is always ready to help you.',
    icon: Clock,
    color: 'bg-purple-50 text-purple-600',
  }
];

function FeaturesSection() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Zap size={14} />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Fast, secure mobile data services</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We provide reliable data bundles with instant delivery and secure payments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all group bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FeaturesSection;
