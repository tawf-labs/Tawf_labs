"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  TrendingUp,
  GitPullRequest,
  DollarSign,
  ExternalLink,
  ArrowRight
} from "lucide-react"

interface NewsItem {
  id: string
  title: string
  category: "announcement" | "update" | "partnership" | "event"
  date: string
  excerpt: string
  link: string
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "TAWF DAO Launches Dual-Layer Governance Model",
    category: "announcement",
    date: "2025-01-10",
    excerpt: "We're excited to announce the launch of our revolutionary dual-layer governance system combining community voting with Sharia council oversight.",
    link: "#"
  },
  {
    id: "2",
    title: "Zakat Distribution System v1.0 Beta Live on Testnet",
    category: "update",
    date: "2025-01-08",
    excerpt: "The zakat distribution system features automated calculations, enhanced transparency, and multi-asset support.",
    link: "#"
  },
  {
    id: "3",
    title: "Strategic Partnership with Islamic Relief Global",
    category: "partnership",
    date: "2025-01-05",
    excerpt: "TAWF partners with Islamic Relief to expand waqf initiatives and bring Sharia-compliant DeFi to millions worldwide.",
    link: "#"
  },
  {
    id: "4",
    title: "Qurban 2025 Registration Now Open",
    category: "event",
    date: "2025-01-03",
    excerpt: "Register for Qurban 2025 with enhanced tracking, verified beneficiaries, and real-time delivery updates.",
    link: "#"
  },
  {
    id: "5",
    title: "Community Governance Results: Q4 2024",
    category: "update",
    date: "2024-12-28",
    excerpt: "Review the outcomes of Q4 governance proposals and see how your TAWF Points shaped the ecosystem's direction.",
    link: "#"
  }
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case "announcement": return "bg-amber-600/30 text-amber-400"
    case "update": return "bg-blue-600/30 text-blue-400"
    case "partnership": return "bg-green-600/30 text-green-400"
    case "event": return "bg-purple-600/30 text-purple-400"
    default: return "bg-gray-600/30 text-gray-400"
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "announcement": return TrendingUp
    case "update": return GitPullRequest
    case "partnership": return DollarSign
    case "event": return Calendar
    default: return TrendingUp
  }
}

export function NewsPanel({ connected }: { connected: boolean }) {
  if (!connected) {
    return (
      <div className="text-center py-12">
        <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h3 className="text-white font-semibold mb-2">Connect to View News</h3>
        <p className="text-gray-400 text-sm">Connect your wallet to stay updated with the latest TAWF news</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Latest News</h2>
          <p className="text-gray-400 text-sm mt-1">Stay updated with TAWF ecosystem announcements and updates</p>
        </div>
        <Button variant="outline" className="text-amber-400 border-transparent">
          View All
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Featured News */}
      <Card variant="gradient">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <Badge className="bg-amber-600/30 text-amber-400 mb-3">
                <TrendingUp className="w-3 h-3 mr-1" />
                Featured
              </Badge>
              <h3 className="text-xl font-bold text-white mb-2">
                TAWF DAO Launches Dual-Layer Governance Model
              </h3>
              <p className="text-gray-300 mb-4">
                We're excited to announce the launch of our revolutionary dual-layer governance system combining community voting with Sharia council oversight.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  January 10, 2025
                </span>
                <Button variant="link" className="text-amber-400 p-0 h-auto">
                  Read More <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockNews.slice(1).map(item => {
          const Icon = getCategoryIcon(item.category)
          return (
            <Card key={item.id} variant="glass" interactive>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${getCategoryColor(item.category)} text-xs`}>
                    <Icon className="w-3 h-3 mr-1" />
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </Badge>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <CardTitle className="text-white text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-4">{item.excerpt}</p>
                <Button variant="link" className="text-amber-400 p-0 h-auto text-sm">
                  Read More <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Links */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-white">Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <a href="#" className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors group">
            <div>
              <p className="text-white text-sm font-medium">Research</p>
              <p className="text-gray-500 text-xs">Our latest innovation and technical updates</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors" />
          </a>
          <a href="#" className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors group">
            <div>
              <p className="text-white text-sm font-medium">Documentation</p>
              <p className="text-gray-500 text-xs">Technical guides and API references</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors" />
          </a>
          <a href="#" className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors group">
            <div>
              <p className="text-white text-sm font-medium">Social Media</p>
              <p className="text-gray-500 text-xs">Follow us on Twitter and Discord</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors" />
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
