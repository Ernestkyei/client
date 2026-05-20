function OrderSummary({ bundle }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h3 className="font-bold text-lg mb-3">Order Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Bundle:</span>
          <span className="font-semibold">{bundle.name}</span>
        </div>
        <div className="flex justify-between">
          <span>Network:</span>
          <span>{bundle.network}</span>
        </div>
        <div className="flex justify-between">
          <span>Data Size:</span>
          <span>{bundle.dataSize}</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-green-600">{bundle.sellingPrice} GHS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderSummary;
