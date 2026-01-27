"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Grid3X3,
  Filter,
  ArrowUpRight,
  ExternalLink,
  TrendingUp,
  Shield,
  Users,
  Wrench,
  Coins,
  ArrowRight
} from "lucide-react"

interface DApp {
  id: string
  name: string
  description: string
  category: "DeFi" | "Identity" | "Governance" | "Utilities"
  icon: string
  status: "live" | "beta" | "coming-soon"
  link: string
  tags: string[]
}

const mockDApps: DApp[] = [
  {
    id: "1",
    name: "zkt.app",
    description: "Calculate, verify, and distribute Zakat with auditability and privacy via ZK proofs.",
    category: "DeFi",
    icon: "🕌",
    status: "live",
    link: "https://zkt.app",
    tags: ["Zakat", "DeFi", "ZK Proofs"]
  },
  {
    id: "2",
    name: "qrbn.app",
    description: "End-to-end Qurbani procurement and proof-of-fulfillment using blockchain.",
    category: "Utilities",
    icon: "🐑",
    status: "live",
    link: "https://qrbn.app",
    tags: ["Qurban", "Utilities", "Tracking"]
  },
  // {
  //   id: "4",
  //   name: "Identity Verifier",
  //   description: "Verify your identity with zkPassport while maintaining privacy.",
  //   category: "Identity",
  //   icon: "🔐",
  //   status: "beta",
  //   link: "/identity",
  //   tags: ["Identity", "zkPassport", "Privacy"]
  // },
  // {
  //   id: "5",
  //   name: "Governance Portal",
  //   description: "Participate in community governance and vote on proposals.",
  //   category: "Governance",
  //   icon: "🗳️",
  //   status: "live",
  //   link: "/governance",
  //   tags: ["Governance", "Voting", "DAO"]
  // },
  // {
  //   id: "6",
  //   name: "Forum",
  //   description: "Join community discussions, proposal deliberations, and delegate accountability threads.",
  //   category: "Governance",
  //   icon: "💬",
  //   status: "live",
  //   link: "/forum",
  //   tags: ["Forum", "Discussion", "Community"]
  // },
  // {
  //   id: "7",
  //   name: "Delegation Manager",
  //   description: "Delegate your TAWF Points to trusted representatives.",
  //   category: "Governance",
  //   icon: "🤝",
  //   status: "beta",
  //   link: "/delegation",
  //   tags: ["Delegation", "Governance", "Voting"]
  // },
  // {
  //   id: "8",
  //   name: "Sharia Compliance Scanner",
  //   description: "Verify if smart contracts and transactions comply with Sharia principles.",
  //   category: "Utilities",
  //   icon: "⚖️",
  //   status: "coming-soon",
  //   link: "#",
  //   tags: ["Sharia", "Compliance", "Audit"]
  // },
  // {
  //   id: "9",
  //   name: "Treasury Dashboard",
  //   description: "View and manage TAWF treasury across multiple chains.",
  //   category: "DeFi",
  //   icon: "💰",
  //   status: "live",
  //   link: "/treasury",
  //   tags: ["Treasury", "DeFi", "Multi-chain"]
  // },
  // {
  //   id: "10",
  //   name: "Reputation Tracker",
  //   description: "Track your on-chain reputation and participation metrics.",
  //   category: "Identity",
  //   icon: "⭐",
  //   status: "beta",
  //   link: "/reputation",
  //   tags: ["Reputation", "Identity", "Analytics"]
  // },
]

const categories = ["All", "DeFi", "Identity", "Governance", "Utilities"]

const getStatusColor = (status: string) => {
  switch (status) {
    case "live": return "bg-green-600/30 text-green-400"
    case "beta": return "bg-blue-600/30 text-blue-400"
    case "coming-soon": return "bg-gray-600/30 text-gray-400"
    default: return "bg-gray-600/30 text-gray-400"
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "DeFi": return Coins
    case "Identity": return Shield
    case "Governance": return Users
    case "Utilities": return Wrench
    default: return Grid3X3
  }
}

export function DAppsPanel({ connected }: { connected: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  if (!connected) {
    return (
      <div className="text-center py-12">
        <Grid3X3 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h3 className="text-white font-semibold mb-2">Connect to View DApps</h3>
        <p className="text-gray-400 text-sm">Connect your wallet to explore the TAWF ecosystem</p>
      </div>
    )
  }

  const filteredDApps = selectedCategory === "All"
    ? mockDApps
    : mockDApps.filter(dapp => dapp.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">TAWF Ecosystem</h2>
          <p className="text-gray-400 text-sm mt-1">Explore Sharia-compliant decentralized applications</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <div className="flex gap-2">
          {categories.map(category => {
            const Icon = getCategoryIcon(category)
            const isActive = selectedCategory === category
            return (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={isActive ? "default" : "outline"}
                className={`flex-shrink-0 ${
                  isActive
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : "border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-900/80 border border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Live DApps</p>
                <p className="text-white font-bold text-lg">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/80 border border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-600/20 flex items-center justify-center">
                <Coins className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Sharia-Compliant</p>
                <p className="text-white font-bold text-lg">100%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DApps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDApps.map(dapp => (
          <Card
            key={dapp.id}
            className="bg-gray-900/80 border border-gray-800 hover:border-gray-700 transition-all hover:scale-[1.02] group"
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center text-2xl">
                    {dapp.icon}
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{dapp.name}</CardTitle>
                    <Badge className={`${getStatusColor(dapp.status)} text-xs mt-1`}>
                      {dapp.status === "live" ? "● Live" :
                       dapp.status === "beta" ? "β Beta" : "Coming Soon"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {dapp.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {dapp.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              {dapp.status !== "coming-soon" ? (
                <a
                  href={dapp.link}
                  className="flex items-center justify-center w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors group-hover:bg-amber-500"
                >
                  Launch DApp
                  <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ) : (
                <Button
                  variant="outline"
                  disabled
                  className="w-full border-gray-700 text-gray-500"
                >
                  Coming Soon
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Build Section */}
      <Card className="bg-gradient-to-br from-amber-900/20 to-amber-600/10 border-amber-600/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Build on TAWF</h3>
              <p className="text-gray-300 text-sm">
                Create your own Sharia-compliant dApp on the TAWF ecosystem
              </p>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
