import BundleCard from './BundleCard';

function BundleList({ bundles, onBuy }) {
  if (!bundles || bundles.length === 0) {
    return <div className="text-center py-10 text-gray-500">No bundles available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bundles.map(bundle => (
        <BundleCard key={bundle.id} bundle={bundle} onBuy={onBuy} />
      ))}
    </div>
  );
}
export default BundleList;
