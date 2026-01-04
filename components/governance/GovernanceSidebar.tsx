"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Proposal, getRoleDisplayName, getRoleBadgeColor } from "@/lib/governance"

interface GovernameSidebarProps {
  proposals: Proposal[]
  activeTab: "community" | "treasury" | "protocol" | "sharia"
  onTabChange: (tab: "community" | "treasury" | "protocol" | "sharia") => void
  searchTerm?: string
}

export function GovernanceSidebar({
  proposals,
  activeTab,
  onTabChange,
  searchTerm = "",
}: GovernameSidebarProps) {
  const tabs = [
    { id: "community", label: "Community", count: proposals.filter(p => p.category === "community" || p.category === "sharia_election").length },
    { id: "treasury", label: "Treasury", count: proposals.filter(p => p.category === "treasury").length },
    { id: "protocol", label: "Protocol", count: proposals.filter(p => p.category === "protocol").length },
    { id: "sharia", label: "Sharia", count: proposals.filter(p => p.category.includes("sharia")).length },
  ]

  const activeProposals = proposals.filter(p => {
    const matchesTab =
      activeTab === "community"
        ? p.category === "community" || p.category === "sharia_election"
        : activeTab === "treasury"
          ? p.category === "treasury"
          : activeTab === "protocol"
            ? p.category === "protocol"
            : p.category.includes("sharia")
    const matchesSearch =
      !searchTerm || p.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className="w-full lg:w-80 flex flex-col gap-4">
      {/* Category Tabs */}
      <Card className="bg-gray-900/80 border border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                onClick={() => onTabChange(tab.id as typeof activeTab)}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`justify-between ${
                  activeTab === tab.id
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : "border-gray-600 text-gray-300 hover:border-amber-500"
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-xs bg-black/40 px-2 py-0.5 rounded">
                  {tab.count}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Proposals List */}
      <Card className="bg-gray-900/80 border border-gray-800 flex-1 flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Proposals
          </CardTitle>
        </CardHeader>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {activeProposals.length === 0 ? (
              <p className="text-gray-400 text-sm py-8 text-center">
                No proposals in this category
              </p>
            ) : (
              activeProposals.map(proposal => (
                <div
                  key={proposal.id}
                  className="p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-amber-500/30 cursor-pointer transition-colors"
                >
                  <h4 className="text-sm font-semibold text-white line-clamp-2">
                    {proposal.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      className={`${
                        proposal.status === "active" ? "bg-green-600" : "bg-gray-600"
                      } text-white text-xs`}
                    >
                      {proposal.status === "active" ? "Active" : "Closed"}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {proposal.totalVoters.toLocaleString()} votes
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-gray-900/80 border border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Portal Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Proposals</span>
              <span className="text-white font-semibold">{proposals.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Active</span>
              <span className="text-green-400 font-semibold">
                {proposals.filter(p => p.status === "active").length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Passed</span>
              <span className="text-blue-400 font-semibold">
                {proposals.filter(p => p.status === "passed").length}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-700">
              <span className="text-gray-400">Total Votes</span>
              <span className="text-amber-400 font-semibold">
                {proposals.reduce((sum, p) => sum + p.totalVoters, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
