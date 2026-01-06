"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { ConnectButton } from "@xellar/kit"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Landmark, 
  Shield, 
  AlertTriangle,
  ExternalLink 
} from "lucide-react"
import Link from "next/link"
import {
  mockFundVaults,
  mockTreasuryPolicy,
  formatNumber,
} from "@/lib/governance"

export default function TreasuryPolicyPage() {
  const { isConnected } = useAccount()
  const totalTreasury = mockFundVaults.reduce((sum, vault) => sum + vault.balance, 0)

  return (
    <div className="min-h-screen bg-black/95 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/governance" 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Governance</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Landmark className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Treasury Policy</h1>
              <p className="text-gray-400 text-sm">Sharia-compliant funding and spending guidelines</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Treasury Overview */}
        <Card className="bg-gray-900/80 border border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-amber-400" />
              Treasury Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <p className="text-gray-400 text-sm">Total Treasury Balance</p>
              <p className="text-4xl font-bold text-amber-400">${formatNumber(totalTreasury)}</p>
              <p className="text-gray-500 text-xs mt-1">Last updated: {mockTreasuryPolicy.lastUpdated}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockFundVaults.map((vault) => (
                <div 
                  key={vault.id}
                  className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{vault.name}</h4>
                    <Badge className="bg-gray-700 text-gray-300 text-xs">
                      {vault.percentage}%
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-white">${formatNumber(vault.balance)}</p>
                  <Progress 
                    value={vault.percentage} 
                    className="h-1 mt-2 bg-gray-700"
                  />
                  <p className="text-xs text-gray-500 mt-2">{vault.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Allowed Funding Sources */}
        <Card className="bg-gray-900/80 border border-green-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              Allowed Funding Sources
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Treasury is funded exclusively through these Sharia-compliant sources
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockTreasuryPolicy.allowedSources.map((source) => (
                <div 
                  key={source.id}
                  className="p-4 bg-green-900/20 rounded-lg border border-green-800/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <h4 className="font-medium text-white">{source.name}</h4>
                    {source.isActive && (
                      <Badge className="bg-green-600/30 text-green-400 text-xs">Active</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{source.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prohibited Funding Sources */}
        <Card className="bg-gray-900/80 border border-red-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <XCircle className="w-5 h-5" />
              Prohibited Funding Sources
            </CardTitle>
            <p className="text-gray-400 text-sm">
              These funding sources are strictly prohibited to maintain Sharia compliance
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockTreasuryPolicy.prohibitedSources.map((source, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-red-900/20 rounded-lg border border-red-800/30"
                >
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{source}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Spending Categories */}
        <Card className="bg-gray-900/80 border border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              Spending Categories
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Treasury funds may only be allocated to these approved categories
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTreasuryPolicy.spendingCategories.map((category) => (
                <div 
                  key={category.id}
                  className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{category.name}</h4>
                    <Badge className="bg-amber-600/30 text-amber-400 text-xs">
                      Max {category.maxAllocation}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400">{category.description}</p>
                  <Progress 
                    value={category.maxAllocation} 
                    className="h-2 mt-3 bg-gray-700"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Policy Principles */}
        <Card className="bg-gray-900/80 border border-amber-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
              Core Treasury Principles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-800/50 rounded-lg text-center">
                <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center mx-auto mb-3">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">No Speculation</h4>
                <p className="text-xs text-gray-400">
                  Treasury funds are never used for speculative trading or investments
                </p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg text-center">
                <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center mx-auto mb-3">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">No Yield Farming</h4>
                <p className="text-xs text-gray-400">
                  Treasury is never deposited in DeFi protocols for yield generation
                </p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg text-center">
                <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center mx-auto mb-3">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">No Lending</h4>
                <p className="text-xs text-gray-400">
                  Treasury funds are never lent out for interest or any form of riba
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
              <h4 className="text-amber-400 font-medium mb-2">Spending Only</h4>
              <p className="text-sm text-gray-300">
                The treasury operates on a "spending only" model. Funds are allocated to approved 
                categories through community governance proposals and Sharia Council oversight. 
                All allocations must have clear, measurable outcomes and serve the community's benefit.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Governance Integration */}
        <Card className="bg-gray-900/80 border border-gray-800">
          <CardHeader>
            <CardTitle>Treasury Governance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                All treasury allocations require approval through the TAWF governance process:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-400 mb-2">1</div>
                  <h4 className="font-medium text-white mb-1">Community Proposal</h4>
                  <p className="text-xs text-gray-400">
                    Any member can submit a treasury allocation proposal with clear justification
                  </p>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-400 mb-2">2</div>
                  <h4 className="font-medium text-white mb-1">Community Vote</h4>
                  <p className="text-xs text-gray-400">
                    DID holders vote using their Tawf Points. Minimum quorum required for passage
                  </p>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-400 mb-2">3</div>
                  <h4 className="font-medium text-white mb-1">Sharia Review</h4>
                  <p className="text-xs text-gray-400">
                    Sharia Council reviews passed proposals to ensure alignment with Islamic principles
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Link href="/governance">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    View Treasury Proposals
                  </Button>
                </Link>
                <Link href="/transparency">
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    View Full Transparency Report
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
