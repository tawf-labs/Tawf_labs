"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import { mockFundVaults } from "@/lib/governance"
import { Footer } from "@/components/footer"

export default function TransparencyPage() {
  const totalBalance = mockFundVaults.reduce((sum, vault) => sum + vault.balance, 0)

  return (
    <div className="min-h-screen bg-black/95">
      <Header />
    <div className="mt-22" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent mb-4">
            Transparency & Fund Vaults
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            View the complete financial status of TAWF fund vaults. All funds are managed transparently and distributed according to Sharia principles and community governance.
          </p>
        </div>

        {/* Total Balance Summary */}
        <Card className="bg-gradient-to-br from-amber-900/20 to-transparent border border-amber-600/30 mb-8">
          <CardContent className="p-8">
            <div className="text-center">
              <p className="text-gray-400 mb-2">Total Fund Balance</p>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                ${(totalBalance / 1000000).toFixed(2)}M
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Across {mockFundVaults.length} fund vaults
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Fund Vaults Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {mockFundVaults.map(vault => (
            <Card key={vault.id} className="bg-gray-900/80 border border-gray-800 hover:border-amber-500/30 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-white">{vault.name}</CardTitle>
                <p className="text-sm text-gray-400 mt-1">{vault.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Balance Display */}
                <div className="bg-black/40 p-4 rounded-lg border border-amber-600/20">
                  <p className="text-sm text-gray-400 mb-1">Current Balance</p>
                  <p className="text-3xl font-bold text-amber-400">
                    ${(vault.balance / 1000000).toFixed(2)}M
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{vault.currency}</p>
                </div>

                {/* Percentage of Total */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Percentage of Total Funds</span>
                    <span className="text-lg font-bold text-amber-400">{(vault.percentage * 100).toFixed(1)}%</span>
                  </div>
                  <Progress
                    value={vault.percentage * 100}
                    className="h-3 bg-gray-700"
                  />
                </div>

                {/* Fund Details */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-700 text-xs">
                  <div>
                    <p className="text-gray-500">Last Updated</p>
                    <p className="text-white font-semibold">{vault.lastUpdated}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fund ID</p>
                    <p className="text-white font-mono text-xs">{vault.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fund Details Section */}
        <div className="grid grid-cols-1 gap-6 mb-12">
          {mockFundVaults.map(vault => (
            <Card key={`detail-${vault.id}`} className="bg-gray-900/80 border border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">{vault.name} - Details</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Purpose</h4>
                  <p className="text-gray-300 text-sm">{vault.description}</p>
                </div>

                {vault.id === "vault-zakat" && (
                  <div className="space-y-3 p-4 bg-black/40 rounded-lg border border-gray-700">
                    <h4 className="font-semibold text-amber-400">Distribution Guidelines</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Distributed to the 8 asnaf (eligible categories) according to Islamic law</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Priority given to those in need (fuqara and masakeeen)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Annual distribution following Islamic calendar</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Community oversight through governance voting</span>
                      </li>
                    </ul>
                  </div>
                )}

                {vault.id === "vault-qurban" && (
                  <div className="space-y-3 p-4 bg-black/40 rounded-lg border border-gray-700">
                    <h4 className="font-semibold text-amber-400">Distribution Guidelines</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Used for purchasing and sacrificing animals during Eid al-Adha</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Meat distributed to those in need (poor and destitute)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Partnerships with certified halal slaughterhouses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Slaughter conducted according to Islamic standards</span>
                      </li>
                    </ul>
                  </div>
                )}

                {vault.id === "vault-treasury" && (
                  <div className="space-y-3 p-4 bg-black/40 rounded-lg border border-gray-700">
                    <h4 className="font-semibold text-amber-400">Allocation Categories</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Platform operations and maintenance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Strategic partnerships with Islamic organizations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Community-approved initiatives and grants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Fund allocations require community governance approval</span>
                      </li>
                    </ul>
                  </div>
                )}

                {vault.id === "vault-dev" && (
                  <div className="space-y-3 p-4 bg-black/40 rounded-lg border border-gray-700">
                    <h4 className="font-semibold text-amber-400">Development Focus</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Protocol security audits and upgrades</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Research into Sharia-compliant DeFi innovations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Infrastructure improvements and scaling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>Development allocations require governance approval</span>
                      </li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transparency Info */}
        <Card className="bg-gray-900/80 border border-gray-800">
          <CardHeader>
            <CardTitle>Commitment to Transparency</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm text-gray-300">
            <p>
              TAWF is committed to complete financial transparency. All fund movements are recorded on-chain and accessible to the community. Regular audits are conducted by independent Sharia scholars to ensure compliance with Islamic principles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-black/40 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-amber-400 mb-2">On-Chain Tracking</h4>
                <p className="text-xs text-gray-400">
                  All transactions are recorded on blockchain for immutable tracking
                </p>
              </div>

              <div className="p-4 bg-black/40 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-amber-400 mb-2">Community Governance</h4>
                <p className="text-xs text-gray-400">
                  Fund allocations require community voting and approval
                </p>
              </div>

              <div className="p-4 bg-black/40 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-amber-400 mb-2">Sharia Compliance</h4>
                <p className="text-xs text-gray-400">
                  Sharia Council reviews all distributions for Islamic alignment
                </p>
              </div>
            </div>

            <p className="pt-4 border-t border-gray-700">
              For detailed audit reports and transaction history, visit our community governance portal and connect your wallet to access the full audit trail.
            </p>
          </CardContent>
        </Card>
      </div>
    <div className="mt-22" />
    <Footer />
    </div>
  )
}
