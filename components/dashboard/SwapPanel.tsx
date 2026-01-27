"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUpDown, ChevronDown } from "lucide-react"

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
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="space-y-3">
              <legend className="sr-only">From amount</legend>
              <div className="flex justify-between items-center">
                <Label htmlFor="from-amount" className="text-gray-300">From</Label>
                <span className="text-sm text-gray-400" id="from-balance">Balance: 0.00</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <Input
                  id="from-amount"
                  type="number"
                  placeholder="0.0"
                  aria-describedby="from-balance from-usd"
                  className="border-0 bg-transparent text-2xl p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-gray-600 h-auto"
                />
                <Button
                  variant="outline"
                  type="button"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700 h-10 focus-visible:ring-2 focus-visible:ring-gray-500"
                  aria-label="Select source token"
                >
                  <span className="mr-2 font-medium">ETH</span>
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
              <div className="flex justify-between text-xs text-gray-500 px-1">
                <span id="from-usd">≈ $0.00</span>
                <button
                  type="button"
                  className="text-[#FFC700] hover:text-[#ffe38a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC700]/50 rounded px-1"
                  aria-label="Set maximum amount"
                >
                  Max
                </button>
              </div>
            </fieldset>

            <div className="flex justify-center -my-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full border-gray-700 bg-gray-900 hover:bg-gray-800 h-10 w-10 focus-visible:ring-2 focus-visible:ring-[#FFC700]/50"
                aria-label="Swap token direction"
              >
                <ArrowUpDown className="w-5 h-5 text-[#FFC700]" aria-hidden="true" />
              </Button>
            </div>

            <fieldset className="space-y-3">
              <legend className="sr-only">To amount</legend>
              <div className="flex justify-between items-center">
                <Label htmlFor="to-amount" className="text-gray-300">To</Label>
                <span className="text-sm text-gray-400" id="to-balance">Balance: 0.00</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <Input
                  id="to-amount"
                  type="number"
                  placeholder="0.0"
                  aria-describedby="to-balance to-usd"
                  readOnly
                  className="border-0 bg-transparent text-2xl p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-gray-600 h-auto"
                />
                <Button
                  variant="outline"
                  type="button"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700 h-10 focus-visible:ring-2 focus-visible:ring-gray-500"
                  aria-label="Select destination token"
                >
                  <span className="mr-2 font-medium">TWF</span>
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
              <div className="text-xs text-gray-500 px-1" id="to-usd">≈ $0.00</div>
            </fieldset>

            <div className="space-y-3 pt-2" role="list" aria-label="Swap details">
              <div className="flex justify-between text-sm text-gray-400" role="listitem">
                <span>Price</span>
                <span>1 ETH = 2,500 TWF</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400" role="listitem">
                <span>Price Impact</span>
                <span className="text-green-400">0.05%</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400" role="listitem">
                <span>Network Fee</span>
                <span>$1.23</span>
              </div>
            </div>

            {connected ? (
              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-[#FFC700] to-[#ffe38a] text-black hover:opacity-90 text-lg font-semibold rounded-xl mt-4"
              >
                Swap
              </Button>
            ) : (
              <Button
                type="button"
                onClick={onConnect}
                className="w-full h-14 bg-gradient-to-r from-[#FFC700] to-[#ffe38a] text-black hover:opacity-90 text-lg font-semibold rounded-xl mt-4"
              >
                Connect Wallet
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Market Data */}
      <Card className="bg-black/95 border border-gray-800 mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Market Data</h3>
          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label="Trading pairs market data">
              <thead>
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-4 font-medium" scope="col">Pair</th>
                  <th className="pb-4 text-right font-medium" scope="col">Price</th>
                  <th className="pb-4 text-right font-medium" scope="col">24h</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {[
                  { pair: "TWF/ETH", price: "0.00042", change: "+2.4%" },
                  { pair: "TWF/USDC", price: "1.42", change: "-0.8%" },
                  { pair: "TWF/ISLM", price: "0.85", change: "+0.5%" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-800/50 cursor-pointer focus-visible:bg-gray-800/50"
                    tabIndex={0}
                    role="row"
                  >
                    <td className="py-3 font-medium" scope="row">{row.pair}</td>
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
