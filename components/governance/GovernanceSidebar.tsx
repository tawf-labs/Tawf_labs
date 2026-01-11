"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Proposal } from "@/lib/governance"
import {
  Users,
  Wallet,
  Settings,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  BarChart3,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface GovernanceSidebarProps {
  proposals: Proposal[]
  activeTab: "community" | "treasury" | "protocol" | "sharia"
  onTabChange: (tab: "community" | "treasury" | "protocol" | "sharia") => void
  searchTerm?: string
  collapsed?: boolean
  setCollapsed?: (collapsed: boolean) => void
}

interface CategoryTab {
  id: "community" | "treasury" | "protocol" | "sharia"
  label: string
  icon: LucideIcon
  count: number
}

function SidebarContent({
  proposals,
  activeTab,
  onTabChange,
  searchTerm = "",
  collapsed = false,
  setCollapsed,
  isMobile = false,
  onClose,
}: GovernanceSidebarProps & { isMobile?: boolean; onClose?: () => void }) {
  const tabs: CategoryTab[] = [
    { 
      id: "community", 
      label: "Community", 
      icon: Users,
      count: proposals.filter(p => p.category === "community" || p.category === "sharia_election").length 
    },
    { 
      id: "treasury", 
      label: "Treasury", 
      icon: Wallet,
      count: proposals.filter(p => p.category === "treasury").length 
    },
    { 
      id: "protocol", 
      label: "Protocol", 
      icon: Settings,
      count: proposals.filter(p => p.category === "protocol").length 
    },
    { 
      id: "sharia", 
      label: "Sharia", 
      icon: BookOpen,
      count: proposals.filter(p => p.category.includes("sharia")).length 
    },
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

  const handleTabClick = (tab: "community" | "treasury" | "protocol" | "sharia") => {
    onTabChange(tab)
    if (isMobile && onClose) {
      onClose()
    }
  }

  const showFullContent = isMobile || !collapsed

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <Link href="/" className="flex items-center group">
          <img
            src="/logos/tawflogo.png"
            alt="TAWF Logo"
            className="w-10 h-10 rounded-full shadow-lg shadow-amber-500/20 transform group-hover:rotate-12 transition-transform duration-300 object-contain"
          />
          {showFullContent && (
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
              Governance
            </span>
          )}
        </Link>
        {!isMobile && setCollapsed && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Category Navigation */}
      <nav className="p-3 space-y-1 border-b border-gray-800">
        {showFullContent && (
          <p className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2">Categories</p>
        )}
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-gradient-to-r from-amber-600/20 to-amber-500/10 border border-amber-600/30 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              )}
              title={collapsed ? tab.label : undefined}
            >
              <Icon
                className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "text-amber-500" : "text-gray-400 group-hover:text-white"
                )}
              />
              {showFullContent && (
                <>
                  <span className="ml-3 text-sm font-medium whitespace-nowrap flex-1 text-left">
                    {tab.label}
                  </span>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded",
                    isActive ? "bg-amber-600/30 text-amber-300" : "bg-gray-800 text-gray-400"
                  )}>
                    {tab.count}
                  </span>
                </>
              )}
            </button>
          )
        })}
      </nav>

      {/* Active Proposals List - Only show when expanded */}
      {showFullContent && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="px-4 py-3 border-b border-gray-800">
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Proposals
            </p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-3 space-y-2">
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
        </div>
      )}

      {/* Quick Stats - Collapsed shows icon only */}
      <div className="p-3 border-t border-gray-800">
        {showFullContent ? (
          <div className="space-y-2 text-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Portal Stats</p>
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
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center" title="Portal Stats">
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        {showFullContent && (
          <div className="text-xs text-gray-500 text-center">
            © 2026 TAWF Labs
          </div>
        )}
      </div>
    </div>
  )
}

export function GovernanceSidebar(props: GovernanceSidebarProps) {
  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-black/95 border-r border-gray-800 transition-all duration-300",
        props.collapsed ? "w-[72px]" : "w-80"
      )}
    >
      <SidebarContent {...props} />
    </aside>
  )
}

export function MobileGovernanceTrigger(props: GovernanceSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="md:hidden h-10 w-10 flex items-center justify-center rounded-md text-white hover:bg-gray-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 bg-black/95 border-gray-800">
        <SheetHeader className="sr-only">
          <SheetTitle>Governance Navigation</SheetTitle>
        </SheetHeader>
        <SidebarContent
          {...props}
          collapsed={false}
          isMobile
        />
      </SheetContent>
    </Sheet>
  )
}

export default GovernanceSidebar
