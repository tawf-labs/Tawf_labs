"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SwapPanelProps {
  connected: boolean
  onConnect: () => void
}

export function SwapPanel({ connected, onConnect }: SwapPanelProps) {
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
          Swap
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Exchange tokens instantly with low fees
        </p>
      </div>

      <Card className="bg-black/95 border border-gray-800">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300">From</Label>
                <span className="text-sm text-gray-400">Balance: 0.00</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <Input
                  type="number"
                  placeholder="0.0"
                  className="border-0 bg-transparent text-2xl p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-gray-600 h-auto"
                />
                <Button
                  variant="outline"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700 h-10"
                >
                  <span className="mr-2 font-medium">ETH</span>
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

            <div className="flex justify-center -my-2">
              <Button
                variant="outline"
                size="icon"
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

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300">To</Label>
                <span className="text-sm text-gray-400">Balance: 0.00</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <Input
                  type="number"
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
              <div className="text-xs text-gray-500 px-1">≈ $0.00</div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Price</span>
                <span>1 ETH = 2,500 TWF</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Price Impact</span>
                <span className="text-green-400">0.05%</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Network Fee</span>
                <span>$1.23</span>
              </div>
            </div>

            {connected ? (
              <Button className="w-full h-14 bg-gradient-to-r from-[#FFC700] to-[#ffe38a] text-black hover:opacity-90 text-lg font-semibold rounded-xl mt-4">
                Swap
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

      {/* Market Data */}
      <Card className="bg-black/95 border border-gray-800 mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Market Data</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-4 font-medium">Pair</th>
                  <th className="pb-4 text-right font-medium">Price</th>
                  <th className="pb-4 text-right font-medium">24h</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {[
                  { pair: "TWF/ETH", price: "0.00042", change: "+2.4%" },
                  { pair: "TWF/USDC", price: "1.42", change: "-0.8%" },
                  { pair: "TWF/ISLM", price: "0.85", change: "+0.5%" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-800/50 cursor-pointer">
                    <td className="py-3 font-medium">{row.pair}</td>
                    <td className="py-3 text-right font-mono">{row.price}</td>
                    <td
                      className={`py-3 text-right font-mono ${
                        row.change.startsWith("+")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {row.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SwapPanel
