import { useNavigate } from 'react-router-dom';
import { Zap, Clock, ShieldCheck, Smartphone } from "lucide-react";

const NETWORK_CONFIG = {
  MTN: {
    accent: '#FDB931',
    button: 'bg-gradient-to-r from-[#FDB931] to-[#F5A623] text-[#5a3800]',
    logoText: 'MTN',
    logoColor: 'text-[#c47f00]',
  },
  VODAFONE: {
    accent: '#e3001b',
    button: 'bg-gradient-to-r from-[#e3001b] to-[#c4001a] text-white',
    logoText: 'VODA',
    logoColor: 'text-[#c4001a]',
  },
  AIRTELTIGO: {
    accent: '#4f46e5',
    button: 'bg-gradient-to-r from-[#4f46e5] to-[#4338ca] text-white',
    logoText: 'AT',
    logoColor: 'text-[#4f46e5]',
  },
  GLO: {
    accent: '#16a34a',
    button: 'bg-gradient-to-r from-[#16a34a] to-[#15803d] text-white',
    logoText: 'GLO',
    logoColor: 'text-[#16a34a]',
  },
};

const FEATURES = [
  { icon: Zap,        label: 'Instant'  },
  { icon: Clock,      label: '24/7'     },
  { icon: ShieldCheck, label: 'Secure'  },
];

function NetworkCard({ network }) {
  const navigate = useNavigate();
  const key = network.name?.toUpperCase();
  const config = NETWORK_CONFIG[key] ?? NETWORK_CONFIG.MTN;

  const handleShopNow = () => {
    const safeNetworkName = encodeURIComponent(network.name.replace(/\s+/g, ''));
    
    // Navigate to the bundles page
    navigate(`/bundles/${safeNetworkName}`);
    
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div
      className="
        group relative flex flex-col items-center
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        rounded-2xl pt-7 pb-5 px-5
        hover:-translate-y-0.5 hover:border-gray-300 dark:hover:border-gray-700
        transition-all duration-200 cursor-pointer
        overflow-hidden
      "
    >
      {/* Brand accent bar */}
      <span
        className="absolute top-0 inset-x-0 h-[3px] rounded-t-2xl"
        style={{ background: config.accent }}
      />

      {/* Logo */}
      <div className="
        w-13 h-13 mb-4 rounded-[14px]
        bg-gray-100 dark:bg-gray-800
        flex items-center justify-center
      ">
        {network.image ? (
          <img
            src={network.image}
            alt={`${network.name} logo`}
            className="w-8 h-8 object-contain"
          />
        ) : (
          <span className={`text-[13px] font-bold tracking-wide font-mono ${config.logoColor}`}>
            {config.logoText}
          </span>
        )}
      </div>

      {/* Name & subtitle */}
      <h3 className="text-[15px] font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-0.5">
        {network.name}
      </h3>
      <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-gray-400 mb-4">
        Data Provider
      </p>

      {/* Feature row */}
      <div className="
        w-full grid grid-cols-3
        border border-gray-200 dark:border-gray-700
        rounded-xl overflow-hidden mb-4
        bg-gray-50 dark:bg-gray-800/60
      ">
        {FEATURES.map(({ icon: Icon, label }, i) => (
          <div
            key={label}
            className={`
              flex flex-col items-center gap-1 py-2.5
              text-[10px] font-semibold text-gray-500 dark:text-gray-400
              ${i < FEATURES.length - 1 ? 'border-r border-gray-200 dark:border-gray-700' : ''}
            `}
          >
            <Icon className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
            {label}
          </div>
        ))}
      </div>

      {/* Online status */}
      <div className="flex items-center gap-1.5 mb-4">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[11px] font-medium text-gray-400">In Stock</span>
      </div>

      {/* CTA button - keeping original network colors */}
      <button
        type="button"
        onClick={handleShopNow}
        className={`
          w-full ${config.button}
          flex items-center justify-center gap-1.5
          text-[13px] font-semibold
          rounded-[10px] py-2.5 px-4
          border-0 outline-none
          transition-all duration-150
          hover:opacity-90 active:scale-[0.99]
          focus:ring-2 focus:ring-offset-1 focus:ring-gray-300
        `}
      >
        <Smartphone className="w-3.5 h-3.5" strokeWidth={2} />
        Browse bundles
      </button>
    </div>
  );
}

export default NetworkCard;