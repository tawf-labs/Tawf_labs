"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Proposal, getRoleDisplayName, getRoleBadgeColor } from "@/lib/governance"

interface ShariaProposalCardProps {
  proposal: Proposal
  canReview: boolean
  onApprove?: (proposalId: string) => void
  onReject?: (proposalId: string) => void
}

export function ShariaProposalCard({
  proposal,
  canReview,
  onApprove,
  onReject,
}: ShariaProposalCardProps) {
  return (
    <Card className="bg-gradient-to-br from-amber-900/30 to-transparent border border-amber-600/30">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Badge className="bg-amber-600 text-white mb-2">Sharia Review</Badge>
            <h3 className="text-lg font-semibold text-white mb-2">{proposal.title}</h3>
            <p className="text-sm text-gray-300">{proposal.description}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Sharia Review Status */}
        {proposal.shariaReview && (
          <div className="space-y-2 p-3 bg-black/40 rounded-lg border border-amber-600/20">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Review Status:</span>
              <Badge
                className={
                  proposal.shariaReview.status === "approved"
                    ? "bg-green-600 text-white"
                    : proposal.shariaReview.status === "rejected"
                      ? "bg-red-600 text-white"
                      : "bg-yellow-600 text-white"
                }
              >
                {proposal.shariaReview.status === "pending"
                  ? "Pending"
                  : proposal.shariaReview.status === "approved"
                    ? "Approved"
                    : "Rejected"}
              </Badge>
            </div>

            {proposal.shariaReview.ruling && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Ruling:</p>
                <p className="text-sm text-gray-200">{proposal.shariaReview.ruling}</p>
              </div>
            )}

            {proposal.shariaReview.evidence && proposal.shariaReview.evidence.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-2">Evidence/References:</p>
                <ul className="space-y-1 text-xs text-gray-300">
                  {proposal.shariaReview.evidence.map((ev, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Community Voting Stats */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-black/40 rounded-lg border border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-400">For</p>
            <p className="text-lg font-bold text-green-400">
              {proposal.votesFor.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">Against</p>
            <p className="text-lg font-bold text-red-400">
              {proposal.votesAgainst.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">Abstain</p>
            <p className="text-lg font-bold text-gray-400">
              {proposal.votesAbstain.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Review Actions */}
        {canReview && proposal.shariaReview?.status === "pending" && (
          <div className="flex gap-2 pt-3 border-t border-gray-700">
            <Button
              onClick={() => onApprove?.(proposal.id)}
              variant="success"
              className="flex-1"
            >
              Approve Ruling
            </Button>
            <Button
              onClick={() => onReject?.(proposal.id)}
              variant="outline"
              className="flex-1 border-red-600/30 text-red-400 hover:bg-red-600/10 hover:border-red-500"
            >
              Reject Ruling
            </Button>
          </div>
        )}

        {!canReview && (
          <div className="text-xs text-gray-400 bg-gray-800/50 p-2 rounded text-center">
            Only Sharia Council members can review proposals
          </div>
        )}
      </CardContent>
    </Card>
  )
}
