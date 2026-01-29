"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Heart,
  DollarSign,
  Users,
  Target,
  Zap,
  CheckCircle,
  Copy,
  ExternalLink
} from "lucide-react"
import { useState } from "react"

interface DonationTier {
  id: string
  name: string
  amount: string
  benefits: string[]
  popular: boolean
}

const donationTiers: DonationTier[] = [
  {
    id: "supporter",
    name: "Supporter",
    amount: "10 USDC",
    benefits: [
      "Your name on our supporters list",
      "Exclusive TAWF badge",
      "Monthly newsletter"
    ],
    popular: false
  },
  {
    id: "contributor",
    name: "Contributor",
    amount: "50 USDC",
    benefits: [
      "All Supporter benefits",
      "Early access to new features",
      "Discord supporter role",
      "Voting rights on minor proposals"
    ],
    popular: true
  },
  {
    id: "patron",
    name: "Patron",
    amount: "100 USDC",
    benefits: [
      "All Contributor benefits",
      "Priority support",
      "Exclusive governance access",
      "Special TAWF NFT",
      "Quarterly AMA access"
    ],
    popular: false
  }
]

const impactStats = [
  { label: "Users Served", value: "10,000+", icon: Users },
  { label: "Countries Reached", value: "50+", icon: Target },
  { label: "Zakat Distributed", value: "$500K+", icon: DollarSign },
  { label: "Active Projects", value: "25+", icon: Zap }
]

export function SupportUsPanel({ connected }: { connected: boolean }) {
  const [copiedAddress, setCopiedAddress] = useState(false)
  const donationAddress = "0x1234567890abcdef1234567890abcdef12345678"

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(donationAddress)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Support TAWF</h2>
          <p className="text-gray-400 text-sm mt-1">Help us build Sharia-compliant DeFi for the Ummah</p>
        </div>
      </div>

      {/* Mission Statement */}
      <Card className="bg-gradient-to-br from-amber-900/20 to-amber-600/10 border-amber-600/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-gray-300 mb-4">
                TAWF is building the future of Sharia-compliant decentralized finance. Your support helps us:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Develop innovative DeFi solutions compliant with Islamic principles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Provide financial tools to the unbanked and underserved communities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Advance Islamic finance through blockchain technology</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Educate and empower the Ummah in Web3 technologies</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impact Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {impactStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-gray-900/80 border border-gray-800">
              <CardContent className="p-4">
                <Icon className="w-8 h-8 text-amber-400 mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Donation Tiers */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Choose Your Impact Level</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {donationTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`bg-gray-900/80 border transition-all ${
                tier.popular
                  ? "border-amber-500/50 hover:border-amber-400/70 relative"
                  : "border-gray-800 hover:border-gray-700"
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-600">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-white text-lg">{tier.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-white">{tier.amount}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={tier.popular ? "warning" : "ghost"}
                  className={`w-full ${
                    tier.popular ? "" : "bg-gray-800 hover:bg-gray-700 text-white"
                  }`}
                  onClick={() => {
                    /* Handle donation */
                  }}
                >
                  Donate {tier.amount}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Direct Donation */}
      <Card className="bg-gray-900/80 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Direct Donation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-gray-300 mb-2">Send your donation directly to our address:</p>
            <div className="flex items-center gap-2 p-3 bg-black/50 rounded-lg border border-gray-700">
              <code className="flex-1 text-amber-400 text-sm truncate">
                {donationAddress}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyAddress}
                className="flex-shrink-0"
              >
                {copiedAddress ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="p-4 bg-amber-900/20 rounded-lg border border-amber-600/30">
            <p className="text-amber-400 text-sm">
              <strong>Note:</strong> All donations are used to further TAWF's mission of building Sharia-compliant DeFi infrastructure.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Other Ways to Support */}
      <Card className="bg-gray-900/80 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Other Ways to Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* <a href="#" className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors group">
            <div>
              <p className="text-white text-sm font-medium">Become a Validator</p>
              <p className="text-gray-500 text-xs">Stake stablecoins and earn TAWF Points while helping secure the network</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors" />
          </a> */}
          <a href="https://github.com/tawf-labs" className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors group">
            <div>
              <p className="text-white text-sm font-medium">Contribute Code</p>
              <p className="text-gray-500 text-xs">Join our GitHub and help build features</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors" />
          </a>
          <a href="#" className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors group">
            <div>
              <p className="text-white text-sm font-medium">Spread the Word</p>
              <p className="text-gray-500 text-xs">Share TAWF with your community</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors" />
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
