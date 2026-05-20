function BundleCard({ bundle, onBuy }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 text-center">
      <h3 className="text-lg font-bold text-gray-800">{bundle.name}</h3>
      <p className="text-gray-500 text-sm mt-1">{bundle.network} | {bundle.dataSize}</p>
      <p className="text-2xl font-bold text-green-600 mt-3">{bundle.sellingPrice} GHS</p>
      <button
        onClick={() => onBuy(bundle)}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        Buy Now
      </button>
    </div>
  );
}
export default BundleCard;
