import NetworkCard from './NetworkCard';

const networks = [
  { name: 'MTN', image: '/mtn.png' },
  { name: 'VODAFONE', image: '/telecel.jpeg' },
  { name: 'AIRTELTIGO', image: '/airteltigo.png' },
  { name: 'GLO', image: '/glo.jpeg' }
];

function NetworkSelector() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {networks.map((network) => (
        <NetworkCard 
          key={network.name} 
          network={network} 
        />
      ))}
    </div>
  );
}

export default NetworkSelector;
