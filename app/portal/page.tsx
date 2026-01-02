"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  MobileSidebarTrigger,
  SwapPanel,
  BridgePanel,
  StakingPanel,
  PortfolioPanel,
  SettingsPanel,
  type PanelType,
} from "@/components/dashboard"

export default function PortalPage() {
  const [activePanel, setActivePanel] = useState<PanelType>("swap")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)

  const toggleConnect = () => {
    if (!connected) {
      // mock connect
      const mock = "0xDEADbeefC0FFEE123456"
      setAccount(mock)
      setConnected(true)
    } else {
      setAccount(null)
      setConnected(false)
    }
  }

  const renderContent = () => {
    switch (activePanel) {
      case "swap":
        return <SwapPanel connected={connected} onConnect={toggleConnect} />
      case "bridge":
        return <BridgePanel connected={connected} onConnect={toggleConnect} />
      case "staking":
        return <StakingPanel connected={connected} onConnect={toggleConnect} />
      case "portfolio":
        return <PortfolioPanel connected={connected} onConnect={toggleConnect} />
      case "settings":
        return (
          <SettingsPanel
            connected={connected}
            account={account}
            onDisconnect={toggleConnect}
          />
        )
      default:
        return <SwapPanel connected={connected} onConnect={toggleConnect} />
    }
  }

  // Show connect screen if not connected (optional - can remove if you want access without connection)
  if (!connected) {
    return (
      <div className="min-h-screen bg-black/95 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <span className="text-amber-100 font-bold text-2xl">T</span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Welcome to TAWF
          </h2>
          <p className="text-gray-400 mb-8">
            Connect your wallet to access the portal and start exploring
            Shariah-compliant DeFi
          </p>
          <div className="flex justify-center">
            <Button
              onClick={toggleConnect}
              className="bg-gradient-to-r from-[#FFC700] to-[#ffe38a] text-black hover:opacity-90 font-semibold px-8 py-3 h-12"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black/95 text-white">
      <div className="w-full flex h-screen">
        {/* Desktop Sidebar */}
        <Sidebar
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-black/95">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800">
            <MobileSidebarTrigger
              activePanel={activePanel}
              setActivePanel={setActivePanel}
              collapsed={sidebarCollapsed}
              setCollapsed={setSidebarCollapsed}
            />
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-amber-100 font-bold text-sm">T</span>
              </div>
              <span className="ml-2 font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                TAWF
              </span>
            </div>
            <Button
              onClick={toggleConnect}
              variant="outline"
              size="sm"
              className="bg-transparent border-gray-700 hover:bg-gray-800 text-white text-xs"
            >
              {account?.slice(0, 6)}...
            </Button>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-end p-4 border-b border-gray-800">
            <Button
              onClick={toggleConnect}
              variant="outline"
              className="bg-transparent border-gray-700 hover:bg-gray-800 text-white text-sm"
            >
              {account?.slice(0, 6)}...{account?.slice(-4)}
            </Button>
          </div>

          {/* Panel Content */}
          <div className="p-4 sm:p-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
