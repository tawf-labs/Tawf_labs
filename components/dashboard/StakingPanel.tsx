"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface StakingPanelProps {
  connected: boolean
  onConnect: () => void
}

const stakingPools = [
  {
    name: "Haqq Network",
    apy: "12.5%",
    tvl: "$4.2M",
    chain: "Haqq",
    halal: true,
    link: "https://haqq.network",
  },
  {
    name: "Base Network",
    apy: "8.9%",
    tvl: "$12.7M",
    chain: "Base",
    halal: true,
    link: "https://base.org",
  },
  {
    name: "Inshallah Finance",
    apy: "15.2%",
    tvl: "$6.8M",
    chain: "Ethereum",
    halal: true,
    link: "https://inshallah.fi",
  },
  {
    name: "Islamic Coin Staking",
    apy: "10.3%",
    tvl: "$8.5M",
    chain: "Haqq",
    halal: true,
    link: "https://islamiccoin.net",
  },
]

export function StakingPanel({ connected, onConnect }: StakingPanelProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
          Halal Staking Pools
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Stake your assets in Shariah-compliant pools
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="bg-black/95 border border-gray-800">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400">Total Value Locked</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
              $32.2M
            </div>
          </CardContent>
        </Card>
        <Card className="bg-black/95 border border-gray-800">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400">Average APY</div>
            <div className="text-2xl font-bold text-green-400">11.7%</div>
          </CardContent>
        </Card>
        <Card className="bg-black/95 border border-gray-800">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400">Your Staked</div>
            <div className="text-2xl font-bold text-white">$0.00</div>
          </CardContent>
        </Card>
      </div>

      {/* Staking Pools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stakingPools.map((pool, index) => (
          <Card
            key={index}
            className="bg-black/95 border border-gray-800 hover:border-[#FFC700]/30 transition-colors"
          >
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{pool.name}</h3>
                    {pool.halal && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        Halal Certified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                    {pool.chain}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
                    {pool.apy} APY
                  </div>
                  <div className="text-xs text-gray-400">TVL: {pool.tvl}</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Your Stake</span>
                  <span>0.00 TWF</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-[#FFC700] to-[#ffe38a] h-2.5 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <div className="flex justify-between mt-3">
                  {connected ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-gray-700 hover:bg-gray-800"
                    >
                      Stake
                    </Button>
                  ) : (
                    <Button
                      onClick={onConnect}
                      variant="outline"
                      size="sm"
                      className="text-xs border-gray-700 hover:bg-gray-800"
                    >
                      Connect to Stake
                    </Button>
                  )}
                  <a
                    href={pool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center text-[#FFC700] hover:text-[#ffe38a] transition-colors"
                  >
                    View Pool <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="bg-black/95 border border-gray-800 mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-3">About Halal Staking</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            All staking pools listed on TAWF have been reviewed for
            Shariah-compliance. We partner with certified Islamic finance
            scholars to ensure that staking mechanisms do not involve riba
            (interest), gharar (excessive uncertainty), or haram activities.
            Each pool displays its certification status and audit reports for
            full transparency.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default StakingPanel
