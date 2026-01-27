"use client"

import { useState } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { ConnectButton } from "@xellar/kit"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  MobileSidebarTrigger,
  SwapPanel,
  BridgePanel,
  StakingPanel,
  PortfolioPanel,
  SettingsPanel,
  ZakatCalculatorPanel,
  NewsPanel,
  ProfilePanel,
  DAppsPanel,
  SupportUsPanel,
  type PanelType,
} from "@/components/dashboard"

export default function DashboardPage() {
  const [activePanel, setActivePanel] = useState<PanelType>("support us")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const handleConnect = () => {
    if (!isConnected && connectors.length > 0) {
      connect({ connector: connectors[0] })
    }
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const renderContent = () => {
    switch (activePanel) {
      case "swap":
        return <SwapPanel connected={isConnected} onConnect={handleConnect} />
      case "bridge":
        return <BridgePanel connected={isConnected} onConnect={handleConnect} />
      case "staking":
        return <StakingPanel connected={isConnected} onConnect={handleConnect} />
      case "portfolio":
        return <PortfolioPanel connected={isConnected} onConnect={handleConnect} />
      case "zakat calculator":
        return <ZakatCalculatorPanel connected={isConnected} onConnect={handleConnect} />
      case "support us":
        return <SupportUsPanel connected={isConnected} />
      case "news":
        return <NewsPanel connected={isConnected} />
      case "profile":
        return <ProfilePanel connected={isConnected} account={address || null} />
      case "dapps":
        return <DAppsPanel connected={isConnected} />
      case "settings":
        return (
          <SettingsPanel
            connected={isConnected}
            account={address || null}
            onDisconnect={handleDisconnect}
          />
        )
      default:
        return <SupportUsPanel connected={isConnected} />
    }
  }

  // Show connect screen if not connected (optional - can remove if you want access without connection)
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black/95 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <div className="flex justify-center mb-6">
            <img src="/tawflogo.png" alt="TAWF Logo" className="w-16 h-16 rounded-full shadow-lg shadow-amber-500/20" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Welcome to TAWF
          </h1>
          <p className="text-gray-400 mb-8">
            Connect your wallet to access the dashboard and start exploring
            Shariah-compliant DeFi
          </p>
          <div className="flex justify-center">
            <ConnectButton />
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
        <main id="main-content" className="flex-1 overflow-y-auto bg-black/95" tabIndex={-1}>
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
              onClick={handleDisconnect}
              variant="outline"
              size="sm"
              className="bg-transparent border-gray-700 hover:bg-gray-800 text-white text-xs"
            >
              {address?.slice(0, 6)}...
            </Button>
          </div>

          {/* Desktop Header */}
          <header className="hidden md:flex items-center justify-end p-4 border-b border-gray-800">
            <ConnectButton />
          </header>

          {/* Panel Content */}
          <div className="p-4 sm:p-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
