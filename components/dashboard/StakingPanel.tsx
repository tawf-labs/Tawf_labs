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
    estimatedYield: "12.5%",
    tvl: "$4.2M",
    chain: "Haqq",
    shariaReviewed: true,
    stakingType: "Proof of Stake",
    link: "https://haqq.network",
  },
  {
    name: "Base Network",
    estimatedYield: "8.9%",
    tvl: "$12.7M",
    chain: "Base",
    shariaReviewed: true,
    stakingType: "Proof of Stake",
    link: "https://base.org",
  },
  {
    name: "Inshallah Finance",
    estimatedYield: "15.2%",
    tvl: "$6.8M",
    chain: "Ethereum",
    shariaReviewed: true,
    stakingType: "Protocol Staking",
    link: "https://inshallah.fi",
  },
  {
    name: "Islamic Coin Staking",
    estimatedYield: "10.3%",
    tvl: "$8.5M",
    chain: "Haqq",
    shariaReviewed: true,
    stakingType: "Proof of Stake",
    link: "https://islamiccoin.net",
  },
]

export function StakingPanel({ connected, onConnect }: StakingPanelProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
          Sharia-Reviewed Network Staking
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Protocol staking on external networks (No Lending, No Debt)
        </p>
      </div>

      {/* External Custody Disclaimer */}
      <div className="mb-6 p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 mt-0.5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-amber-400 text-xs">!</span>
          </div>
          <div>
            <p className="text-amber-200 text-sm font-medium">External Network Staking</p>
            <p className="text-amber-200/70 text-xs mt-1">
              Staking occurs on external networks. Tawf does not custody funds. Returns are non-guaranteed protocol issuance rates, not interest or yield from lending.
            </p>
          </div>
        </div>
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
            <div className="text-sm text-gray-400">Avg. Estimated Yield</div>
            <div className="text-2xl font-bold text-green-400">11.7%</div>
            <div className="text-xs text-gray-500 mt-1">Non-guaranteed</div>
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
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                    <h3 className="text-lg font-semibold">{pool.name}</h3>
                    {pool.shariaReviewed && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        Sharia-Reviewed
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                    {pool.chain} • {pool.stakingType}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
                    {pool.estimatedYield}
                  </div>
                  <div className="text-xs text-gray-500">Est. Network Yield</div>
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
          <h3 className="text-lg font-semibold mb-3">About Protocol Staking</h3>
          <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
            <p>
              Protocol staking involves locking tokens to help secure a blockchain network through Proof of Stake consensus. 
              This is fundamentally different from lending or yield farming.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
                <h4 className="text-green-400 font-medium text-sm mb-2">What Protocol Staking IS:</h4>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Network validation participation</li>
                  <li>• Token issuance from protocol (not interest)</li>
                  <li>• No lending or borrowing involved</li>
                  <li>• No counterparty debt relationship</li>
                </ul>
              </div>
              <div className="p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
                <h4 className="text-red-400 font-medium text-sm mb-2">What Protocol Staking is NOT:</h4>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Lending your tokens for interest</li>
                  <li>• Yield farming or liquidity provision</li>
                  <li>• Guaranteed returns (APY)</li>
                  <li>• Custodied by Tawf platform</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Note: Sharia scholars have varying opinions on staking. The pools listed here have been reviewed, 
              but users should consult their own scholars for personal guidance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StakingPanel
