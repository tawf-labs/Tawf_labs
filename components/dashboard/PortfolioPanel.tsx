"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PortfolioPanelProps {
  connected: boolean
  onConnect: () => void
}

const assets = [
  { asset: "TWF", balance: "0.00", value: "0.00", color: "from-[#FFC700] to-[#ffe38a]" },
  { asset: "USDC", balance: "0.00", value: "0.00", color: "from-gray-400 to-gray-500" },
  { asset: "ETH", balance: "0.00", value: "0.00", color: "from-gray-500 to-gray-600" },
  { asset: "ISLM", balance: "0.00", value: "0.00", color: "from-amber-500 to-amber-600" },
]

const recentActivity = [
  { type: "Swap", description: "ETH → TWF", amount: "+250 TWF", time: "2 hours ago" },
  { type: "Stake", description: "Haqq Network", amount: "-100 TWF", time: "1 day ago" },
  { type: "Bridge", description: "Ethereum → Haqq", amount: "500 TWF", time: "3 days ago" },
]

export function PortfolioPanel({ connected, onConnect }: PortfolioPanelProps) {
  if (!connected) {
    return (
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20 flex items-center justify-center mb-6">
          <span className="text-amber-100 font-bold text-3xl">T</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Connect Your Wallet
        </h2>
        <p className="text-gray-400 mb-6 max-w-sm">
          Connect your wallet to view your portfolio, track your assets, and
          manage your positions.
        </p>
        <Button
          onClick={onConnect}
          className="bg-gradient-to-r from-[#FFC700] to-[#ffe38a] text-black hover:opacity-90 font-medium px-8 py-3 h-12 text-base"
        >
          Connect Wallet
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
          Portfolio
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Track and manage your assets
        </p>
      </div>

      {/* Portfolio Value Card */}
      <Card className="bg-black/95 border border-gray-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Total Portfolio Value</CardTitle>
          <div className="text-4xl font-bold bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
            $0.00
          </div>
          <div className="text-sm text-gray-400">0.00 TWF</div>
        </CardHeader>
        <CardContent className="flex space-x-3">
          <Button className="flex-1 bg-gradient-to-r from-[#FFC700] to-[#ffe38a] text-black hover:opacity-90 font-medium">
            Deposit
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-gray-700 text-white hover:bg-gray-800"
          >
            Withdraw
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets List */}
        <Card className="bg-black/95 border border-gray-800">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Your Assets</CardTitle>
              <span className="text-xs text-gray-400">Value in USD</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assets.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center`}
                    >
                      <span className="text-xs font-bold text-black">
                        {item.asset}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{item.asset}</div>
                      <div className="text-xs text-gray-400">
                        ${item.value}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{item.balance}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-black/95 border border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 hover:bg-gray-800/50 rounded-lg transition-colors"
                  >
                    <div>
                      <div className="font-medium">{activity.type}</div>
                      <div className="text-xs text-gray-400">
                        {activity.description}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-medium ${
                          activity.amount.startsWith("+")
                            ? "text-green-400"
                            : activity.amount.startsWith("-")
                            ? "text-red-400"
                            : "text-white"
                        }`}
                      >
                        {activity.amount}
                      </div>
                      <div className="text-xs text-gray-400">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No recent activity
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Network Staking Positions */}
      <Card className="bg-black/95 border border-gray-800 mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Network Staking Positions</CardTitle>
            <span className="text-xs text-gray-500">External Networks</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-400">
            <p>No active staking positions</p>
            <p className="text-xs text-gray-500 mt-2">Staking occurs on external networks. Tawf does not custody funds.</p>
            <Button
              variant="outline"
              className="mt-4 border-gray-700 text-white hover:bg-gray-800"
            >
              Explore Network Staking
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PortfolioPanel
