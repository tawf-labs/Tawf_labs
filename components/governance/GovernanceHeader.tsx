"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GovernanceUser, getRoleDisplayName, getRoleBadgeColor } from "@/lib/governance"

interface GovernanceHeaderProps {
  user: GovernanceUser | null
  onConnectDID: () => void
}

export function GovernanceHeader({ user, onConnectDID }: GovernanceHeaderProps) {
  return (
    <div className="bg-black/95 border-b border-gray-800 p-6 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
              TAWF Governance Portal
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Community-driven Sharia-compliant governance
            </p>
          </div>

          {user ? (
            <Card className="bg-gray-900/80 border border-gray-700 p-4 w-full md:w-auto">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Role</p>
                    <Badge
                      className={`${getRoleBadgeColor(user.role)} text-white mt-1`}
                    >
                      {getRoleDisplayName(user.role)}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Governance Points</p>
                    <p className="text-lg font-bold text-amber-400">
                      {user.points.toLocaleString()}
                    </p>
                  </div>
                </div>

                {!user.did && (
                  <Button
                    onClick={onConnectDID}
                    variant="warning"
                    className="w-full text-sm"
                  >
                    Connect DID to Vote
                  </Button>
                )}

                {user.did && (
                  <div className="text-xs text-green-400">
                    ✓ DID Connected - Voting Enabled
                  </div>
                )}

                <div className="text-xs text-gray-500 pt-2 border-t border-gray-700">
                  <p>Joined: {user.joinedAt}</p>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="bg-gray-900/80 border border-gray-700 p-4">
              <p className="text-gray-300 mb-3">Connect wallet to participate</p>
              <Button
                onClick={onConnectDID}
                variant="warning"
                className="w-full"
              >
                Connect Wallet
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
