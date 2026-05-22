import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table"
import { 
  TrendingUp, 
  Wallet, 
  Plus, 
  RefreshCw, 
  ShoppingCart, 
  FileText,
  AlertTriangle,
  Copy,
  CheckCircle
} from "lucide-react"
import AddBundleModal from "../components/AddBundleModal"
import SyncBundlesModal from "../components/SyncBundlesModal"

// Network brand colors
const networkColors = {
  MTN: { bg: "bg-yellow-500", light: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", hover: "hover:bg-yellow-600" },
  Vodafone: { bg: "bg-red-500", light: "bg-red-50", text: "text-red-700", border: "border-red-200", hover: "hover:bg-red-600" },
  AirtelTigo: { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", hover: "hover:bg-blue-600" },
  Telecel: { bg: "bg-green-500", light: "bg-green-50", text: "text-green-700", border: "border-green-200", hover: "hover:bg-green-600" },
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [isAddBundleModalOpen, setIsAddBundleModalOpen] = useState(false)
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false)
  const [copiedOrderId, setCopiedOrderId] = useState(null)

  const recentOrders = [
    { id: "#ORD001", customer: "John Doe", phone: "024XXXXXXX", bundle: "MTN 5GB", amount: "GHS 15", status: "Completed", network: "MTN" },
    { id: "#ORD002", customer: "Jane Smith", phone: "055XXXXXXX", bundle: "Voda 3GB", amount: "GHS 10", status: "Processing", network: "Vodafone" },
    { id: "#ORD003", customer: "Mary Amoah", phone: "020XXXXXXX", bundle: "MTN 10GB", amount: "GHS 25", status: "Pending", network: "MTN" },
    { id: "#ORD004", customer: "Kwame A.", phone: "054XXXXXXX", bundle: "AT 6GB", amount: "GHS 20", status: "Completed", network: "AirtelTigo" },
    { id: "#ORD005", customer: "Esi Mensah", phone: "024YYYYYYY", bundle: "Telecel 5GB", amount: "GHS 18", status: "Pending", network: "Telecel" },
  ]

  const networkStats = [
    { name: "MTN", profit: "GHS 1,200", percent: 45, color: networkColors.MTN, icon: "📱", sales: 234 },
    { name: "Vodafone", profit: "GHS 650", percent: 25, color: networkColors.Vodafone, icon: "📶", sales: 156 },
    { name: "AirtelTigo", profit: "GHS 500", percent: 19, color: networkColors.AirtelTigo, icon: "🌐", sales: 98 },
    { name: "Telecel", profit: "GHS 300", percent: 11, color: networkColors.Telecel, icon: "📡", sales: 67 },
  ]

  const handleCopyOrderId = (orderId) => {
    navigator.clipboard.writeText(orderId)
    setCopiedOrderId(orderId)
    setTimeout(() => setCopiedOrderId(null), 2000)
  }

  const handleSaveBundle = (bundleData) => {
    console.log("Saving bundle:", bundleData)
    alert(`Bundle "${bundleData.name}" saved successfully!`)
  }

  const handleSyncComplete = () => {
    alert("Bundles synced successfully from provider!")
  }

  const handleTopUpWallet = () => {
    alert("Redirecting to payment page to top up RemaData wallet...")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Admin: John</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/reports')}>
            <FileText className="h-4 w-4 mr-2" />
            Reports
          </Button>
        </div>
      </div>

      {/* Network Stats Cards - 4 vertical blocks with network colors */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {networkStats.map((network) => (
          <Card key={network.name} className={`${network.color.light} border-l-4 ${network.color.border} hover:shadow-lg transition-all duration-300`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <span className="text-xl">{network.icon}</span>
                {network.name}
              </CardTitle>
              <div className={`${network.color.bg} rounded-full p-2 text-white text-xs font-bold shadow-md`}>
                {network.percent}%
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{network.profit}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {network.sales} orders • {network.percent}% of total
              </p>
              {/* Progress bar */}
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`${network.color.bg} h-1.5 rounded-full transition-all duration-500`}
                  style={{ width: `${network.percent}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Cards - Total Sales, Today's Sales, Total Profit, Wallet */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GHS 12,450</div>
            <p className="text-xs text-green-600 mt-1">+15% this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GHS 850</div>
            <p className="text-xs text-green-600 mt-1">+8% vs yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GHS 2,345</div>
            <p className="text-xs text-green-600 mt-1">+12% this week</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-500 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RemaData Wallet</CardTitle>
            <Wallet className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">GHS 820</div>
            <p className="text-xs text-yellow-700 mt-1 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Low — top up
            </p>
            <Button size="sm" className="mt-3 w-full bg-yellow-600 hover:bg-yellow-700" onClick={handleTopUpWallet}>
              Top Up Wallet
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Warning Banner */}
      <Card className="border-red-500 bg-red-50">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-semibold text-red-800">RemaData wallet is below GHS 1,000</p>
              <p className="text-sm text-red-600">Top up to avoid failed orders.</p>
            </div>
          </div>
          <Button className="bg-red-600 hover:bg-red-700" onClick={handleTopUpWallet}>Top Up Now</Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Button 
          className="h-24 flex flex-col gap-2"
          onClick={() => setIsAddBundleModalOpen(true)}
        >
          <Plus className="h-6 w-6" />
          Add bundle
        </Button>
        <Button 
          variant="outline" 
          className="h-24 flex flex-col gap-2"
          onClick={() => setIsSyncModalOpen(true)}
        >
          <RefreshCw className="h-6 w-6" />
          Sync from API
        </Button>
        <Button 
          variant="outline" 
          className="h-24 flex flex-col gap-2"
          onClick={() => navigate('/orders')}
        >
          <ShoppingCart className="h-6 w-6" />
          View orders
        </Button>
        <Button 
          variant="outline" 
          className="h-24 flex flex-col gap-2"
          onClick={() => navigate('/reports')}
        >
          <FileText className="h-6 w-6" />
          View reports
        </Button>
      </div>

      {/* Recent Orders Table with Copy Button */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate('/orders')}>View all</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Bundle</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{order.id}</span>
                      <button
                        onClick={() => handleCopyOrderId(order.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Copy order number"
                      >
                        {copiedOrderId === order.id ? (
                          <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${networkColors[order.network]?.light} ${networkColors[order.network]?.text}`}>
                      {order.bundle}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{order.amount}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "Completed" ? "bg-green-100 text-green-800" :
                      order.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Bundle Modal */}
      <AddBundleModal 
        isOpen={isAddBundleModalOpen}
        onClose={() => setIsAddBundleModalOpen(false)}
        onSave={handleSaveBundle}
      />

      {/* Sync from API Modal */}
      <SyncBundlesModal 
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onSyncComplete={handleSyncComplete}
      />
    </div>
  )
}
