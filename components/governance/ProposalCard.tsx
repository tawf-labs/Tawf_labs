"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { MessageSquare } from "lucide-react"
import {
  Proposal,
  getStatusBadgeColor,
  getStatusDisplayName,
  calculateVotePercentage,
  UserRole,
} from "@/lib/governance"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"

interface ProposalCardProps {
  proposal: Proposal
  onVote?: (proposalId: string, vote: "for" | "against" | "abstain") => void
  userVote?: "for" | "against" | "abstain" | null
  canVote?: boolean
  onShowDetails?: (proposalId: string) => void
}

interface DiscussionSectionProps {
  proposal: Proposal
  currentUserRole: UserRole
  userDID: string | null
  isShariaCouncil?: boolean
  onAddDiscussion?: (proposalId: string, content: string) => void
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
              variant={userVote === "for" ? "success" : "outline"}
              size="sm"
              className={`flex-1 ${
                userVote === "for"
                  ? ""
                  : "border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400"
              }`}
            >
              For
            </Button>
            <Button
              onClick={() => onVote?.("against", "against")}
              variant={userVote === "against" ? "danger" : "outline"}
              size="sm"
              className={`flex-1 ${
                userVote === "against"
                  ? ""
                  : "border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400"
              }`}
            >
              Against
            </Button>
            <Button
              onClick={() => onVote?.("abstain", "abstain")}
              variant={userVote === "abstain" ? "ghost" : "outline"}
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

function DiscussionSection({
  proposal,
  currentUserRole,
  userDID,
  isShariaCouncil = false,
  onAddDiscussion,
}: DiscussionSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const canPost = isShariaCouncil
    ? currentUserRole === "sharia_council" && userDID !== null
    : userDID !== null // For general governance, require DID to post

  const handlePostComment = async () => {
    if (!newComment.trim() || !userDID) return
    setIsPosting(true)
    await onAddDiscussion?.(proposal.id, newComment.trim())
    setNewComment("")
    setIsPosting(false)
  }

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-white">Discussions</h4>
      {proposal.discussions.length === 0 ? (
        <p className="text-gray-400 text-sm">No discussions yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-3">
          {proposal.discussions.map((discussion) => (
            <div key={discussion.id} className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-white">{discussion.author}</span>
                <Badge className="text-xs" variant="outline">
                  {discussion.authorRole.replace("_", " ")}
                </Badge>
                <span className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(discussion.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-gray-300">{discussion.content}</p>
            </div>
          ))}
        </div>
      )}
      {canPost && (
        <div className="pt-4 border-t border-gray-700">
          <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Add Discussion
          </h4>
          <div className="space-y-3">
            <textarea
              placeholder="Share your thoughts on this proposal..."
              value={newComment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 resize-none text-sm"
              rows={3}
            />
            <Button
              onClick={handlePostComment}
              disabled={!newComment.trim() || isPosting}
              variant="warning"
              size="sm"
            >
              {isPosting ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </div>
      )}
      {!canPost && (
        <p className="text-xs text-amber-400">
          {isShariaCouncil
            ? "Only Sharia Council members can comment on this proposal."
            : "Connect your DID to participate in discussions."}
        </p>
      )}
    </div>
  )
}

export { DiscussionSection }
