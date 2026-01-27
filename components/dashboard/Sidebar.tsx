"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  ArrowLeftRight,
  Layers,
  Coins,
  Wallet,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  Calculator,
  HandHeart,
  Heart,
  Newspaper,
  User,
  Grid3X3,
  AppWindow,
  ExternalLink,
  Scale,
  MessageSquare,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export type PanelType = "swap" | "bridge" | "staking" | "portfolio" | "zakat calculator" | "qurban" | "support us" | "settings" | "news" | "profile" | "dapps" 

interface SidebarProps {
  activePanel: PanelType
  setActivePanel: (panel: PanelType) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

interface NavItemDef {
  id: PanelType
  label: string
  icon: LucideIcon
}

const navItems: NavItemDef[] = [
  // { id: "swap", label: "Swap", icon: ArrowLeftRight },
  // { id: "bridge", label: "Bridge", icon: Layers },
  // { id: "staking", label: "Staking", icon: Coins },
  // { id: "portfolio", label: "Portfolio", icon: Wallet },
  // { id: "zakat calculator", label: "Zakat Calculator", icon: Calculator },
  // { id: "qurban", label: "Qurban", icon: HandHeart },
  { id: "news", label: "News", icon: Newspaper },
  { id: "profile", label: "Profile", icon: User },
  { id: "dapps", label: "DApps", icon: AppWindow },
  { id: "support us", label: "Support Us", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
]

function NavItem({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: NavItemDef
  active: boolean
  collapsed: boolean
  onClick: () => void
}) {
  const Icon = item.icon
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 group",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC700]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active
          ? "bg-gradient-to-r from-[#FFC700]/20 to-[#ffe38a]/10 border border-[#FFC700]/30 text-white"
          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
      )}
      aria-current={active ? "page" : undefined}
      aria-label={`${item.label} panel${active ? " (active)" : ""}`}
    >
      <Icon
        className={cn(
          "w-5 h-5 flex-shrink-0",
          active ? "text-[#FFC700]" : "text-gray-400 group-hover:text-white"
        )}
        aria-hidden="true"
      />
      {!collapsed && (
        <span className="ml-3 text-sm font-medium whitespace-nowrap">
          {item.label}
        </span>
      )}
    </button>
  )
}

function SidebarContent({
  activePanel,
  setActivePanel,
  collapsed,
  setCollapsed,
  isMobile = false,
  onClose,
}: SidebarProps & { isMobile?: boolean; onClose?: () => void }) {
  const handleClick = (panel: PanelType) => {
    setActivePanel(panel)
    if (isMobile && onClose) {
      onClose()
    }
  }

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
          {!collapsed && (
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
              TAWF
            </span>
          )}
        </Link>
        {!isMobile && (
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

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={activePanel === item.id}
            collapsed={collapsed && !isMobile}
            onClick={() => handleClick(item.id)}
          />
        ))}

        {/* External Links Divider */}
        {/* {!collapsed && (
          <div className="pt-4 mt-4 border-t border-gray-800">
            <p className="px-3 text-xs text-gray-600 font-medium mb-2">EXTERNAL</p>
          </div>
        )} */}

        {/* External Links */}
        <Link href="/governance" className="block">
          <div
            className={cn(
              "flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 group",
              "text-gray-400 hover:text-white hover:bg-gray-800/50"
            )}
          >
            <Scale className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="ml-3 text-sm font-medium whitespace-nowrap flex-1 text-left">
                  Governance
                </span>
                <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-amber-400 transition-colors" />
              </>
            )}
          </div>
        </Link>

        <Link href="/forum" className="block">
          <div
            className={cn(
              "flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 group",
              "text-gray-400 hover:text-white hover:bg-gray-800/50"
            )}
          >
            <MessageSquare className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="ml-3 text-sm font-medium whitespace-nowrap flex-1 text-left">
                  Forum
                </span>
                <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-amber-400 transition-colors" />
              </>
            )}
          </div>
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        {!collapsed && (
          <div className="text-xs text-gray-500 text-center">
            © 2026 TAWF Labs
          </div>
        )}
      </div>
    </div>
  )
}

export function Sidebar(props: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-black/95 border-r border-gray-800 transition-all duration-300",
          props.collapsed ? "w-[72px]" : "w-64"
        )}
      >
        <SidebarContent {...props} />
      </aside>
    </>
  )
}

export function MobileSidebarTrigger({
  activePanel,
  setActivePanel,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="md:hidden h-10 w-10 flex items-center justify-center rounded-md text-white hover:bg-gray-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-black/95 border-gray-800">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <SidebarContent
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          collapsed={false}
          setCollapsed={setCollapsed}
          isMobile
        />
      </SheetContent>
    </Sheet>
  )
}

export default Sidebar
