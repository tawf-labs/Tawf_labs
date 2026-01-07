"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface DIDConnectPromptProps {
  onConnect: () => void
}

export function DIDConnectPrompt({ onConnect }: DIDConnectPromptProps) {
  return (
    <Card className="bg-gradient-to-br from-amber-900/20 to-transparent border border-amber-600/30">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Connect Your Decentralized Identity (DID)
            </h3>
            <p className="text-sm text-gray-300">
              To participate in voting and earn Governance Points, you need to register and connect a DID.
              You can still view proposals and discussions without a DID.
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-400 text-left bg-black/40 p-4 rounded-lg border border-amber-600/20">
            <h4 className="font-semibold text-amber-400 mb-2">Benefits of connecting a DID:</h4>
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                <span className="text-amber-400">✓</span>
                <span>Vote on proposals and governance decisions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">✓</span>
                <span>Earn TAWF Governance Points</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">✓</span>
                <span>Create and sponsor proposals</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">✓</span>
                <span>Participate in Sharia Council elections</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">✓</span>
                <span>Points are non-transferable and bound to your DID</span>
              </li>
            </ul>
          </div>

          <Button
            onClick={onConnect}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-6 text-base"
          >
            Connect DID Now
          </Button>

          <p className="text-xs text-gray-500">
            Your privacy is important. DID connection is secure and decentralized.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
