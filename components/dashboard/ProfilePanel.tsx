"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Award,
  TrendingUp,
  Shield,
  Users,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Wallet,
  Activity
} from "lucide-react"

interface EcosystemApp {
  id: string
  name: string
  category: string
  connected: boolean
  lastUsed: string
}

interface ReputationMetric {
  id: string
  label: string
  value: number
  max: number
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const mockEcosystemApps: EcosystemApp[] = [
  { id: "1", name: "Zakat", category: "Islamic Obligations", connected: true, lastUsed: "2 hours ago" },
  { id: "2", name: "Qurbani", category: "Islamic Obligations", connected: true, lastUsed: "1 day ago" },
  { id: "3", name: "Governance", category: "Governance", connected: true, lastUsed: "5 hours ago" },
  { id: "4", name: "Transparency", category: "Explorer", connected: true, lastUsed: "1 week ago" }
]

const mockReputationMetrics: ReputationMetric[] = [
  { id: "1", label: "Participation Score", value: 75, max: 100, icon: Activity, color: "bg-blue-500" },
  { id: "2", label: "Delegation Trust", value: 60, max: 100, icon: Shield, color: "bg-green-500" },
  { id: "3", label: "Community Impact", value: 85, max: 100, icon: Users, color: "bg-purple-500" },
  { id: "4", label: "Sharia Compliance", value: 95, max: 100, icon: Award, color: "bg-amber-500" }
]

export function ProfilePanel({ connected, account }: { connected: boolean; account: string | null }) {
  const [hasTawfDID, setHasTawfDID] = useState(false)

  if (!connected) {
    return (
      <div className="text-center py-12">
        <User className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h3 className="text-white font-semibold mb-2">Connect to View Profile</h3>
        <p className="text-gray-400 text-sm">Connect your wallet to view your profile and reputation</p>
      </div>
    )
  }

  // Onboarding flow if no TAWF DID
  if (!hasTawfDID) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to TAWF</h2>
          <p className="text-gray-400">Create your TAWF DID to start participating in the ecosystem</p>
        </div>

        {/* Onboarding Steps */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Getting Started</h3>

          <Card className="bg-gray-900/80 border border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">Create Your TAWF DID</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Your Decentralized Identity (DID) is your unique identifier in the Sharia Web3 ecosystem. It's required for voting, delegation, and reputation tracking.
                  </p>
                  <Button variant="warning">
                    Create DID
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border border-gray-800 opacity-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">Verify with zkPassport</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Use zkPassport to verify your identity while maintaining privacy. This enables enhanced features and governance participation.
                  </p>
                  <Button variant="outline" disabled className="border-gray-700 text-gray-500">
                    Verify Identity (Locked)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border border-gray-800 opacity-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">Start Participating</h4>
                  <p className="text-gray-400 text-sm">
                    Join governance, delegate your TAWF Points, and start building your reputation in the ecosystem.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* zkPassport Demo */}
        <Card className="bg-gradient-to-br from-amber-900/20 to-orange-600/10 border-amber-600/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              zkPassport Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-sm mb-4">
              Experience privacy-preserving identity verification with zkPassport. Generate zero-knowledge proofs to verify your identity without revealing sensitive information.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="border-amber-600/50 text-amber-400 hover:bg-amber-600/10">
                Try Demo
              </Button>
              <Button variant="link" className="text-amber-400 p-0 h-auto">
                Learn More <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Profile view with TAWF DID
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">My Profile</h2>
          <p className="text-gray-400 text-sm mt-1">Manage your identity and reputation</p>
        </div>
        <Button variant="outline" className="text-amber-400 border-transparent">
          <ExternalLink className="w-4 h-4 mr-2" />
          View Public Profile
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="bg-gray-900/80 border border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-white">TAWF User</h3>
                <Badge className="bg-green-600/30 text-green-400 border-green-600/50">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                DID: did:ethr:{account?.slice(0, 8)}...
              </p>
              <div className="flex gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Member Since</p>
                  <p className="text-white">January 2025</p>
                </div>
                <div>
                  <p className="text-gray-500">TAWF Points</p>
                  <p className="text-amber-400 font-semibold">1,250 TP</p>
                </div>
                <div>
                  <p className="text-gray-500">Reputation</p>
                  <p className="text-green-400 font-semibold">High</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reputation Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Reputation Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockReputationMetrics.map(metric => {
            const Icon = metric.icon
            return (
              <Card key={metric.id} className="bg-gray-900/80 border border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg ${metric.color}/20 flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${metric.color.replace('bg-', 'text-')}` as string} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{metric.label}</p>
                      <p className="text-gray-500 text-xs">{metric.value}/{metric.max}</p>
                    </div>
                  </div>
                  <Progress value={(metric.value / metric.max) * 100} className="h-2" />
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Ecosystem Apps */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Ecosystem Apps</h3>
          <Button variant="link" className="text-amber-400 p-0 h-auto text-sm">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockEcosystemApps.map(app => (
            <Card key={app.id} className="bg-gray-900/80 border border-gray-800 hover:border-gray-700 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">{app.name}</h4>
                    <p className="text-gray-500 text-xs">{app.category}</p>
                  </div>
                  {app.connected ? (
                    <Badge className="bg-green-600/30 text-green-400 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-600/30 text-gray-400 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Not Connected
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Last used: {app.lastUsed}</span>
                  {app.connected ? (
                    <Button variant="link" className="text-amber-400 p-0 h-auto text-xs">
                      Open <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Delegation Status */}
      <Card className="bg-gray-900/80 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Delegation Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-white text-sm font-medium">Self-delegated</p>
                <p className="text-gray-500 text-xs">You are voting with your own TAWF Points</p>
              </div>
            </div>
            <Badge className="bg-blue-600/30 text-blue-400 text-xs">Active</Badge>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Voting Power</span>
            <span className="text-white font-medium">1,250 TAWF Points</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Delegated To</span>
            <span className="text-white font-medium">None</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Delegated From</span>
            <span className="text-white font-medium">0 users</span>
          </div>

          <Button variant="outline" className="w-full">
            Delegate TAWF Points
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
