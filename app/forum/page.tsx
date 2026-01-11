"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { ConnectButton } from "@xellar/kit"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  MessageSquare,
  Users,
  TrendingUp,
  Pin,
  Clock,
  User,
  Tag,
  Search,
  Plus,
  ExternalLink,
  ChevronRight,
  Shield
} from "lucide-react"
import Link from "next/link"

// Mock data for forum categories and threads
interface ForumThread {
  id: string
  title: string
  category: "general" | "proposals" | "accountability" | "governance"
  author: string
  authorRole: string
  replies: number
  views: number
  lastActivity: string
  isPinned: boolean
  tags: string[]
}

interface ForumCategory {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  threadCount: number
  color: string // explicitly typed as string
}

const forumCategories: ForumCategory[] = [
  {
    id: "general",
    name: "General Discussion",
    description: "Community discussions about TAWF ecosystem and updates",
    icon: MessageSquare,
    threadCount: 156,
    color: "text-blue-400"
  },
  {
    id: "proposals",
    name: "Proposal Deliberation",
    description: "Discuss and debate active and upcoming governance proposals",
    icon: TrendingUp,
    threadCount: 89,
    color: "text-amber-400"
  },
  {
    id: "accountability",
    name: "Delegate Accountability",
    description: "Hold delegates accountable and track their performance",
    icon: Shield,
    threadCount: 34,
    color: "text-green-400"
  },
  {
    id: "governance",
    name: "Governance Process",
    description: "Discussions about governance improvements and processes",
    icon: Users,
    threadCount: 67,
    color: "text-purple-400"
  }
]

const mockThreads: ForumThread[] = [
  {
    id: "1",
    title: "Welcome to the TAWF Forum - Introduce Yourself!",
    category: "general",
    author: "TawfTeam",
    authorRole: "maintainer",
    replies: 234,
    views: 5670,
    lastActivity: "2 hours ago",
    isPinned: true,
    tags: ["introduction", "community"]
  },
  {
    id: "2",
    title: "Discussion: Proposal #42 - Zakat Distribution Protocol Upgrade",
    category: "proposals",
    author: "Ahmed_Al_Hassan",
    authorRole: "sharia_council",
    replies: 89,
    views: 2340,
    lastActivity: "4 hours ago",
    isPinned: true,
    tags: ["proposal", "zakat", "active"]
  },
  {
    id: "3",
    title: "Delegate Performance Review - Q4 2025",
    category: "accountability",
    author: "Community_Watcher",
    authorRole: "user",
    replies: 56,
    views: 1890,
    lastActivity: "6 hours ago",
    isPinned: false,
    tags: ["delegate", "review", "q4"]
  },
  {
    id: "4",
    title: "How does the Sharia Council review process work?",
    category: "governance",
    author: "NewUser123",
    authorRole: "user",
    replies: 45,
    views: 1230,
    lastActivity: "8 hours ago",
    isPinned: false,
    tags: ["sharia", "process", "faq"]
  },
  {
    id: "5",
    title: "Ideas for improving community participation in governance",
    category: "general",
    author: "Governance_Guru",
    authorRole: "user",
    replies: 67,
    views: 1560,
    lastActivity: "12 hours ago",
    isPinned: false,
    tags: ["ideas", "participation"]
  },
  {
    id: "6",
    title: "Concerns about recent treasury management decision",
    category: "accountability",
    author: "Concerned_Citizen",
    authorRole: "user",
    replies: 123,
    views: 3450,
    lastActivity: "1 day ago",
    isPinned: false,
    tags: ["treasury", "concerns"]
  },
  {
    id: "7",
    title: "Proposal #38 Analysis - Waqf Smart Contract Audit Results",
    category: "proposals",
    author: "Tech_Lead",
    authorRole: "maintainer",
    replies: 34,
    views: 890,
    lastActivity: "1 day ago",
    isPinned: false,
    tags: ["proposal", "audit", "technical"]
  }
]

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "sharia_council":
      return "bg-amber-600/30 text-amber-400 border-amber-600/50"
    case "maintainer":
      return "bg-blue-600/30 text-blue-400 border-blue-600/50"
    case "ngo":
      return "bg-green-600/30 text-green-400 border-green-600/50"
    default:
      return "bg-gray-600/30 text-gray-400 border-gray-600/50"
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "general": return "bg-blue-600/30 text-blue-400"
    case "proposals": return "bg-amber-600/30 text-amber-400"
    case "accountability": return "bg-green-600/30 text-green-400"
    case "governance": return "bg-purple-600/30 text-purple-400"
    default: return "bg-gray-600/30 text-gray-400"
  }
}

export default function ForumPage() {
  const { isConnected } = useAccount()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Show connect screen if not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black/95 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <div className="flex justify-center mb-6">
            <img src="/tawflogo.png" alt="TAWF Logo" className="w-16 h-16 rounded-full shadow-lg shadow-amber-500/20" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            TAWF Forum
          </h2>
          <p className="text-gray-400 mb-8">
            Join the community discussion. Connect your wallet to participate.
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    )
  }

  const filteredThreads = mockThreads.filter(thread => {
    const matchesCategory = selectedCategory === "all" || thread.category === selectedCategory
    const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-black/95 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="/tawflogo.png"
                  alt="TAWF"
                  className="w-16 h-16 rounded-full border-2 border-amber-500/30"
                />
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                  Forum
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Community Forum</h1>
                <p className="text-gray-400 text-sm mt-1">
                  Discuss proposals, hold delegates accountable, and shape the future of TAWF
                </p>
              </div>
            </div>
            <Link href="/governance">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                Visit Governance
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800/50 border border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Threads</p>
                    <p className="text-2xl font-bold text-white">346</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Posts</p>
                    <p className="text-2xl font-bold text-white">2,847</p>
                  </div>
                  <Users className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Members</p>
                    <p className="text-2xl font-bold text-white">1,234</p>
                  </div>
                  <User className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Now</p>
                    <p className="text-2xl font-bold text-white">89</p>
                  </div>
                  <Clock className="w-8 h-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Categories */}
          <div className="lg:w-80 space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Categories</h2>

            {/* Category Cards */}
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                  selectedCategory === "all"
                    ? "bg-amber-600/20 border-amber-600/50"
                    : "bg-gray-900/80 border-gray-800 hover:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <div className="text-left">
                    <p className="text-white font-medium">All Categories</p>
                    <p className="text-xs text-gray-500">View all discussions</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">346</span>
              </button>

              {forumCategories.map(category => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                      selectedCategory === category.id
                        ? "bg-amber-600/20 border-amber-600/50"
                        : "bg-gray-900/80 border-gray-800 hover:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${category.color}`} />
                      <div className="text-left">
                        <p className="text-white font-medium">{category.name}</p>
                        <p className="text-xs text-gray-500">{category.description}</p>
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm">{category.threadCount}</span>
                  </button>
                )
              })}
            </div>

            {/* Create Thread Button */}
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Thread
            </Button>
          </div>

          {/* Right Column - Threads */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search threads, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900/80 border-gray-800 text-white placeholder-gray-500 focus:border-amber-600"
              />
            </div>

            {/* Threads List */}
            <div className="space-y-3">
              {filteredThreads.length === 0 ? (
                <Card className="bg-gray-900/80 border border-gray-800">
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No threads found matching your search</p>
                  </CardContent>
                </Card>
              ) : (
                filteredThreads.map(thread => (
                  <Card
                    key={thread.id}
                    className="bg-gray-900/80 border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Thread Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            {thread.isPinned && (
                              <Badge className="bg-amber-600/30 text-amber-400 text-xs">
                                <Pin className="w-3 h-3 mr-1" />
                                Pinned
                              </Badge>
                            )}
                            <Badge className={`${getCategoryColor(thread.category)} text-xs`}>
                              {forumCategories.find(c => c.id === thread.category)?.name}
                            </Badge>
                            <Badge className={`${getRoleBadgeColor(thread.authorRole)} text-xs border`}>
                              {thread.authorRole === "sharia_council" ? "Sharia Council" :
                               thread.authorRole === "maintainer" ? "Team" :
                               thread.authorRole === "ngo" ? "NGO" : "User"}
                            </Badge>
                          </div>

                          <h3 className="text-white font-semibold hover:text-amber-400 transition-colors mb-2">
                            {thread.title}
                          </h3>

                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>by {thread.author}</span>
                            <span>•</span>
                            <span>{thread.replies} replies</span>
                            <span>•</span>
                            <span>{thread.views} views</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {thread.lastActivity}
                            </span>
                          </div>

                          {/* Tags */}
                          <div className="flex items-center gap-2 mt-3">
                            {thread.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded"
                              >
                                <Tag className="w-3 h-3 inline mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Chevron */}
                        <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0 mt-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Load More */}
            <div className="text-center mt-6">
              <Button variant="outline" className="text-amber-400 border-transparent hover:bg-gray-800">
                Load More Threads
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Forum Guidelines */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <Card className="bg-gray-900/60 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Forum Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-300">
            <p>• Be respectful and constructive in all discussions</p>
            <p>• Stay on topic and contribute meaningfully to conversations</p>
            <p>• Use appropriate categories and tags for your threads</p>
            <p>• Follow Sharia principles in all interactions</p>
            <p>• Report violations to the moderation team</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
