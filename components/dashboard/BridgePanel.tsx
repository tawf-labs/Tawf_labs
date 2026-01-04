"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BridgePanelProps {
  connected: boolean
  onConnect: () => void
}

const chains = ["Base Sepolia", "Lisk Sepolia"]

export function BridgePanel({ connected, onConnect }: BridgePanelProps) {
  const [bridgeFrom, setBridgeFrom] = useState("Base Sepolia")
  const [bridgeTo, setBridgeTo] = useState("Lisk Sepolia")
  const [bridgeAmount, setBridgeAmount] = useState("")
  const [bridgeMessage, setBridgeMessage] = useState<string | null>(null)

  const handleBridge = () => {
    if (!bridgeAmount || Number(bridgeAmount) <= 0) {
      setBridgeMessage("Enter a valid amount")
      return
    }
    setBridgeMessage(
      `Bridged ${bridgeAmount} from ${bridgeFrom} → ${bridgeTo} (mock)`
    )
    setBridgeAmount("")
    setTimeout(() => setBridgeMessage(null), 3000)
  }

  const handleSwapChains = () => {
    const temp = bridgeFrom
    setBridgeFrom(bridgeTo)
    setBridgeTo(temp)
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
          Bridge
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Transfer assets across chains seamlessly
        </p>
      </div>

      <Card className="bg-black/95 border border-gray-800">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* From Chain */}
            <div className="space-y-3">
              <Label className="text-gray-300">From</Label>
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <select
                  value={bridgeFrom}
                  onChange={(e) => setBridgeFrom(e.target.value)}
                  className="w-full bg-transparent text-white text-lg font-medium focus:outline-none cursor-pointer"
                >
                  {chains.map((chain) => (
                    <option
                      key={chain}
                      value={chain}
                      className="bg-gray-900 text-white"
                    >
                      {chain}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwapChains}
                className="rounded-full border-gray-700 bg-gray-900 hover:bg-gray-800 h-10 w-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#FFC700]"
                >
                  <path d="m3 16 4 4 4-4" />
                  <path d="M7 4v16" />
                  <path d="m21 8-4-4-4 4" />
                  <path d="M17 4v16" />
                </svg>
              </Button>
            </div>

            {/* To Chain */}
            <div className="space-y-3">
              <Label className="text-gray-300">To</Label>
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <select
                  value={bridgeTo}
                  onChange={(e) => setBridgeTo(e.target.value)}
                  className="w-full bg-transparent text-white text-lg font-medium focus:outline-none cursor-pointer"
                >
                  {chains.map((chain) => (
                    <option
                      key={chain}
                      value={chain}
                      className="bg-gray-900 text-white"
                    >
                      {chain}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300">Amount</Label>
                <span className="text-sm text-gray-400">Balance: 0.00</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <Input
                  type="number"
                  value={bridgeAmount}
                  onChange={(e) => setBridgeAmount(e.target.value)}
                  placeholder="0.0"
                  className="border-0 bg-transparent text-2xl p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-gray-600 h-auto"
                />
                <Button
                  variant="outline"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700 h-10"
                >
                  <span className="mr-2 font-medium">TWF</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-down"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Button>
              </div>
              <div className="flex justify-between text-xs text-gray-500 px-1">
                <span>≈ $0.00</span>
                <button className="text-[#FFC700] hover:text-[#ffe38a] transition-colors">
                  Max
                </button>
              </div>
            </div>

            {/* Bridge Info */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Estimated Time</span>
                <span>~2-5 minutes</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Bridge Fee</span>
                <span>0.1%</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>You will receive</span>
                <span className="text-white">
                  {bridgeAmount ? `~${bridgeAmount} TWF` : "0.00 TWF"}
                </span>
              </div>
            </div>

            {/* Message */}
            {bridgeMessage && (
              <div
                className={`text-sm p-3 rounded-lg ${
                  bridgeMessage.includes("Enter")
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : "bg-green-500/10 text-green-400 border border-green-500/20"
                }`}
              >
                {bridgeMessage}
              </div>
            )}

            {/* Action Button */}
            {connected ? (
              <Button
                onClick={handleBridge}
                className="w-full h-14 bg-gradient-to-r from-[#FFC700] to-[#ffe38a] text-black hover:opacity-90 text-lg font-semibold rounded-xl mt-4"
              >
                Bridge
              </Button>
            ) : (
              <Button
                onClick={onConnect}
                className="w-full h-14 bg-gradient-to-r from-[#FFC700] to-[#ffe38a] text-black hover:opacity-90 text-lg font-semibold rounded-xl mt-4"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Supported Networks */}
      <Card className="bg-black/95 border border-gray-800 mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Supported Networks</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {chains.map((chain) => (
              <div
                key={chain}
                className="flex items-center space-x-2 p-3 rounded-lg bg-gray-900/50 border border-gray-800"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FFC700] to-[#ffe38a] flex items-center justify-center text-xs font-bold text-black">
                  {chain.charAt(0)}
                </div>
                <span className="text-sm font-medium">{chain}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BridgePanel
