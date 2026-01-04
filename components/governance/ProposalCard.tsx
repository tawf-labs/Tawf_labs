"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Proposal,
  getStatusBadgeColor,
  getStatusDisplayName,
  calculateVotePercentage,
} from "@/lib/governance"
import { formatDistanceToNow } from "date-fns"

interface ProposalCardProps {
  proposal: Proposal
  onVote?: (proposalId: string, vote: "for" | "against" | "abstain") => void
  userVote?: "for" | "against" | "abstain" | null
  canVote?: boolean
  onShowDetails?: (proposalId: string) => void
}

export function ProposalCard({
  proposal,
  onVote,
  userVote,
  canVote,
  onShowDetails,
}: ProposalCardProps) {
  const votePercentages = calculateVotePercentage(
    proposal.votesFor,
    proposal.votesAgainst,
    proposal.votesAbstain
  )

  const isActive = proposal.status === "active"
  const endDateDisplay = new Date(proposal.endDate)

  return (
    <Card className="bg-gray-900/80 border border-gray-800 hover:border-amber-500/30 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${getStatusBadgeColor(proposal.status)} text-white`}>
                {getStatusDisplayName(proposal.status)}
              </Badge>
              {proposal.shariaReview && (
                <Badge
                  className={
                    proposal.shariaReview.status === "approved"
                      ? "bg-green-600 text-white"
                      : proposal.shariaReview.status === "pending"
                        ? "bg-yellow-600 text-white"
                        : "bg-red-600 text-white"
                  }
                >
                  {proposal.shariaReview.status === "pending"
                    ? "Sharia Review"
                    : proposal.shariaReview.status === "approved"
                      ? "Sharia ✓"
                      : "Sharia ✗"}
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">{proposal.title}</h3>
            <p className="text-sm text-gray-400">{proposal.description}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Vote Summary */}
        {isActive && (
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">For</span>
                <span className="text-green-400 font-semibold">
                  {proposal.votesFor.toLocaleString()} ({votePercentages.for}%)
                </span>
              </div>
              <Progress
                value={votePercentages.for}
                className="h-2 bg-gray-700"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Against</span>
                <span className="text-red-400 font-semibold">
                  {proposal.votesAgainst.toLocaleString()} ({votePercentages.against}%)
                </span>
              </div>
              <Progress
                value={votePercentages.against}
                className="h-2 bg-gray-700"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Abstain</span>
                <span className="text-gray-400 font-semibold">
                  {proposal.votesAbstain.toLocaleString()} ({votePercentages.abstain}%)
                </span>
              </div>
              <Progress
                value={votePercentages.abstain}
                className="h-2 bg-gray-700"
              />
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-700">
          <div className="text-sm">
            <p className="text-gray-400 text-xs">Total Votes</p>
            <p className="text-white font-semibold">{proposal.totalVoters.toLocaleString()}</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-400 text-xs">Discussions</p>
            <p className="text-white font-semibold">{proposal.discussions.length}</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-400 text-xs">Category</p>
            <p className="text-white font-semibold capitalize">{proposal.category}</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-400 text-xs">Ends in</p>
            <p className="text-white font-semibold">
              {formatDistanceToNow(endDateDisplay, { addSuffix: false })}
            </p>
          </div>
        </div>

        {/* Voting Buttons */}
        {isActive && canVote && (
          <div className="flex gap-2 pt-3 border-t border-gray-700">
            <Button
              onClick={() => onVote?.("for", "for")}
              variant={userVote === "for" ? "default" : "outline"}
              size="sm"
              className={`flex-1 ${
                userVote === "for"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "border-gray-600 text-gray-300 hover:border-green-500"
              }`}
            >
              For
            </Button>
            <Button
              onClick={() => onVote?.("against", "against")}
              variant={userVote === "against" ? "default" : "outline"}
              size="sm"
              className={`flex-1 ${
                userVote === "against"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "border-gray-600 text-gray-300 hover:border-red-500"
              }`}
            >
              Against
            </Button>
            <Button
              onClick={() => onVote?.("abstain", "abstain")}
              variant={userVote === "abstain" ? "default" : "outline"}
              size="sm"
              className={`flex-1 ${
                userVote === "abstain"
                  ? "bg-gray-600 hover:bg-gray-700 text-white"
                  : "border-gray-600 text-gray-300 hover:border-gray-500"
              }`}
            >
              Abstain
            </Button>
          </div>
        )}

        {isActive && !canVote && (
          <div className="text-xs text-amber-400 bg-amber-900/20 p-2 rounded border border-amber-600/20">
            Connect a DID and wallet to vote on this proposal
          </div>
        )}

        {/* View Details */}
        <Button
          onClick={() => onShowDetails?.(proposal.id)}
          variant="outline"
          className="w-full border-gray-600 text-gray-300 hover:border-amber-500/50 hover:text-amber-400"
          size="sm"
        >
          View Details & Discussions
        </Button>
      </CardContent>
    </Card>
  )
}
