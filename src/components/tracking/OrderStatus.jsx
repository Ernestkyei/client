function OrderStatus({ order }) {
  const isDelivered = order.deliveryStatus === 'DELIVERED';
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">Order #{order.orderNumber}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {isDelivered ? '✅ Delivered' : '⏳ Processing'}
        </span>
      </div>
      
      <div className="space-y-2">
        <p><strong>Bundle:</strong> {order.bundleName}</p>
        <p><strong>Amount:</strong> {order.amount} GHS</p>
        <p><strong>Phone:</strong> {order.phoneNumber}</p>
        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        {order.deliveredAt && (
          <p><strong>Delivered:</strong> {new Date(order.deliveredAt).toLocaleString()}</p>
        )}
        {order.deliveryMessage && (
          <p className="text-green-600 mt-2">{order.deliveryMessage}</p>
        )}
      </div>
    </div>
  );
}
export default OrderStatus;
