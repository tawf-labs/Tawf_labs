"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { ConnectButton } from "@xellar/kit"
import {
  GovernanceSidebar,
  MobileGovernanceTrigger,
  ProposalCard,
  DIDConnectPrompt,
  ShariaProposalCard,
  DiscussionSection,
} from "@/components/governance"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, FileText, Landmark, ChevronRight, ChevronDown, ChevronUp, ExternalLink, Shield, MessageSquare, CheckCircle, XCircle, Clock } from "lucide-react"
import Link from "next/link"
import {
  mockProposals,
  mockShariaProposals,
  mockCurrentUser,
  mockConnectedDIDUser,
  mockShariaCouncilMember,
  getMockUserByAddress,
  TEST_ADDRESSES,
  getRoleDisplayName,
  getRoleBadgeColor,
  mockDAOStats,
  mockTopContributors,
  mockFundVaults,
  formatNumber,
  calculateVotePercentage,
  getStatusBadgeColor,
  getStatusDisplayName,
} from "@/lib/governance"

export default function GovernancePage() {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<
    "community" | "treasury" | "protocol" | "sharia"
  >("community")
  const [searchTerm, setSearchTerm] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [user, setUser] = useState(mockCurrentUser)
  const [userVotes, setUserVotes] = useState<Record<string, "for" | "against" | "abstain">>({})
  const [didConnected, setDidConnected] = useState(false)
  const [showDIDPrompt, setShowDIDPrompt] = useState(true)
  const [expandedProposal, setExpandedProposal] = useState<string | null>(null)
  const [newDiscussionContent, setNewDiscussionContent] = useState<Record<string, string>>({})

  // Simulate user based on connected address
  useEffect(() => {
    if (address && isConnected) {
      if (address === TEST_ADDRESSES.SHARIA_COUNCIL) {
        setUser(mockShariaCouncilMember)
        setDidConnected(true)
      } else if (address === TEST_ADDRESSES.MAINTAINER) {
        setUser({ ...mockConnectedDIDUser, role: "maintainer" })
        setDidConnected(true)
      } else if (address === TEST_ADDRESSES.NGO) {
        setUser({ ...mockConnectedDIDUser, role: "ngo" })
        setDidConnected(true)
      } else if (address === TEST_ADDRESSES.USER) {
        setUser(mockConnectedDIDUser)
        setDidConnected(true)
      } else {
        const mockUser = getMockUserByAddress(address)
        setUser(mockUser)
        setDidConnected(mockUser.did !== null)
      }
      setShowDIDPrompt(false)
    } else {
      setUser(mockCurrentUser)
      setShowDIDPrompt(true)
      setDidConnected(false)
    }
  }, [address, isConnected])

  const handleConnectDID = () => {
    setUser(prev => ({
      ...prev,
      did: `did:ethr:${address || "0x0000"}`,
      points: Math.max(prev.points, 1000),
    }))
    setDidConnected(true)
    setShowDIDPrompt(false)
  }

  const handleVote = (proposalId: string, vote: "for" | "against" | "abstain") => {
    if (!didConnected) {
      alert("Please connect your DID to vote")
      return
    }
    setUserVotes(prev => ({
      ...prev,
      [proposalId]: vote,
    }))
  }

  const handleAddDiscussion = (proposalId: string) => {
    if (!didConnected) {
      alert("Please connect your DID to participate in discussions")
      return
    }
    const content = newDiscussionContent[proposalId]?.trim()
    if (!content) return

    // In a real app, this would be an API call
    // For now, we'll just log it
    console.log(`Adding discussion to ${proposalId}: ${content}`)
    
    // Clear the input
    setNewDiscussionContent(prev => ({
      ...prev,
      [proposalId]: "",
    }))
  }

  const handleToggleDetails = (proposalId: string) => {
    setExpandedProposal(prev => prev === proposalId ? null : proposalId)
  }

  const handleShariaApprove = (proposalId: string) => {
    alert(`Proposal ${proposalId} approved by Sharia Council (mock)`)
  }

  const handleShariaReject = (proposalId: string) => {
    alert(`Proposal ${proposalId} rejected by Sharia Council (mock)`)
  }

  const isShariaCouncil = user.role === "sharia_council"
  const canVote = didConnected

  const filteredProposals = mockProposals.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Show connect screen if not connected (like dashboard)
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black/95 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <div className="flex justify-center mb-6">
            <img src="/tawflogo.png" alt="TAWF Logo" className="w-16 h-16 rounded-full shadow-lg shadow-amber-500/20" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            TAWF Governance
          </h2>
          <p className="text-gray-400 mb-2">
            Community-driven Sharia-compliant governance
          </p>
          <p className="text-xs text-gray-500 mb-8">
            Governance is separate from staking. This is an institutional decision-making body.
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    )
  }

  // Calculate total treasury
  const totalTreasury = mockFundVaults.reduce((sum, vault) => sum + vault.balance, 0)

  return (
    <div className="relative min-h-screen bg-black/95 text-white">
      {/* Tally-style Header Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* DAO Info Header */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Logo and Name */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src="/tawflogo.png" 
                  alt="TAWF" 
                  className="w-16 h-16 rounded-full border-2 border-amber-500/30"
                />
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                  DAO
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">TAWF</h1>
                  <Badge className="bg-gray-700 text-gray-300 text-xs">ERC20</Badge>
                </div>
                <p className="text-gray-400 text-sm">{formatNumber(totalTreasury)} USDC Treasury</p>
              </div>
            </div>
          </div>

          {/* Stats Row - Tally Style */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Users className="w-4 h-4" />
                  <span>Members</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>
              <div className="text-2xl font-bold text-white mt-1">{formatNumber(mockDAOStats.totalMembers)}</div>
              <div className="text-xs text-gray-500">{formatNumber(mockDAOStats.didHolders)} DID holders</div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <FileText className="w-4 h-4" />
                  <span>Proposals</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>
              <div className="text-2xl font-bold text-white mt-1">{mockDAOStats.totalProposals}</div>
              <div className="text-xs text-gray-500">{mockDAOStats.activeProposals} active proposals</div>
            </div>

            <Link href="/treasury" className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Landmark className="w-4 h-4" />
                  <span>Treasury</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>
              <div className="text-2xl font-bold text-amber-400 mt-1">${formatNumber(totalTreasury)}</div>
              <div className="text-xs text-gray-500">{mockFundVaults.length} fund vaults</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - My Voting Power (Tally-style sidebar info) */}
          <div className="lg:w-80 space-y-4">
            {/* My Voting Power Card */}
            <Card className="bg-gray-900/80 border border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <img 
                    src="/tawflogo.png" 
                    alt="TAWF" 
                    className="w-10 h-10 rounded-full"
                  />
                  <Badge className={`${getRoleBadgeColor(user.role)} text-white text-xs`}>
                    {getRoleDisplayName(user.role)}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-400 text-sm">My Tawf Points</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">{formatNumber(user.points)} TP</span>
                    <Button variant="outline" size="sm" className="text-xs border-gray-700 text-gray-300">
                      View details
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {user.points} TP to: myself
                  </p>
                </div>

                {!didConnected && (
                  <Button
                    onClick={handleConnectDID}
                    variant="warning"
                    className="w-full text-sm"
                  >
                    Connect DID to Vote
                  </Button>
                )}

                {didConnected && (
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    DID Connected - Voting Enabled
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-gray-900/80 border border-gray-800">
              <CardContent className="p-4 space-y-2">
                <Link href="/treasury" className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <span className="text-gray-300 text-sm">Treasury Policy</span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </Link>
                {isShariaCouncil && (
                  <Link href="/sharia" className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <span className="text-amber-400 text-sm">Sharia Council Panel</span>
                    <ChevronRight className="w-4 h-4 text-amber-500" />
                  </Link>
                )}
                <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <span className="text-gray-300 text-sm">Notifications</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Proposals */}
          <div className="flex-1">
            {/* Proposals Header with Tabs */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Proposals</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-gray-400 hover:text-white text-sm border-transparent">
                  My Drafts
                </Button>
                <Button variant="outline" size="sm" className="text-amber-400 border-b-2 border-amber-400 rounded-none text-sm">
                  Proposals
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search proposals..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-gray-900/80 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-600"
            />

            {/* DID Connect Prompt */}
            {showDIDPrompt && (
              <DIDConnectPrompt onConnect={handleConnectDID} />
            )}

            {/* Proposal List - Tally Style */}
            <div className="space-y-3">
              {filteredProposals.length === 0 ? (
                <Card className="bg-gray-900/80 border border-gray-800">
                  <CardContent className="p-12 text-center">
                    <p className="text-gray-400">No proposals found matching your search</p>
                  </CardContent>
                </Card>
              ) : (
                filteredProposals.map(proposal => {
                  const votePercentages = calculateVotePercentage(
                    proposal.votesFor,
                    proposal.votesAgainst,
                    proposal.votesAbstain
                  )
                  const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain
                  const isExpanded = expandedProposal === proposal.id
                  const isActive = proposal.status === "active"
                  
                  return (
                    <Card 
                      key={proposal.id}
                      className="bg-gray-900/80 border border-gray-800 hover:border-gray-700 transition-colors"
                    >
                      {/* Proposal Header - Clickable */}
                      <div 
                        className="p-4 cursor-pointer"
                        onClick={() => handleToggleDetails(proposal.id)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge 
                                className={`${getStatusBadgeColor(proposal.status)} text-white text-xs`}
                              >
                                {getStatusDisplayName(proposal.status)}
                              </Badge>
                              {proposal.shariaReview && (
                                <Badge className={`text-xs ${
                                  proposal.shariaReview.status === "approved" 
                                    ? "bg-green-600/30 text-green-400" 
                                    : proposal.shariaReview.status === "pending"
                                      ? "bg-yellow-600/30 text-yellow-400"
                                      : "bg-red-600/30 text-red-400"
                                }`}>
                                  {proposal.shariaReview.status === "approved" ? "Sharia ✓" : 
                                   proposal.shariaReview.status === "pending" ? "Sharia Review" : "Sharia ✗"}
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-semibold text-white hover:text-amber-400 transition-colors text-lg">
                              {proposal.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <span>{new Date(proposal.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              <span>•</span>
                              <span>{proposal.discussions.length} discussions</span>
                            </div>
                          </div>
                          
                          {/* Vote Bar - Tally Style */}
                          <div className="text-right min-w-[180px]">
                            <div className="flex items-center gap-2 text-xs mb-1 justify-end">
                              <span className="text-green-400">{formatNumber(proposal.votesFor)}</span>
                              <span className="text-gray-500">·</span>
                              <span className="text-red-400">{formatNumber(proposal.votesAgainst)}</span>
                              <span className="text-gray-500">·</span>
                              <span className="text-gray-400">{formatNumber(proposal.votesAbstain)}</span>
                            </div>
                            {/* Progress bar */}
                            <div className="flex h-2 rounded-full overflow-hidden bg-gray-700">
                              <div 
                                className="bg-green-500" 
                                style={{ width: `${votePercentages.for}%` }}
                              />
                              <div 
                                className="bg-red-500" 
                                style={{ width: `${votePercentages.against}%` }}
                              />
                              <div 
                                className="bg-gray-500" 
                                style={{ width: `${votePercentages.abstain}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-end gap-2 mt-1">
                              <span className="text-xs text-gray-500">
                                {formatNumber(totalVotes)} votes
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="border-t border-gray-800 p-4 space-y-4">
                          {/* Description */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Description</h4>
                            <p className="text-sm text-gray-300">{proposal.description}</p>
                          </div>

                          {/* Proposal Info */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-gray-800/50 rounded-lg">
                            <div>
                              <p className="text-xs text-gray-500">Author</p>
                              <p className="text-sm text-white">{proposal.author}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Role</p>
                              <p className="text-sm text-white">{getRoleDisplayName(proposal.authorRole)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Created</p>
                              <p className="text-sm text-white">{proposal.createdAt}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Quorum</p>
                              <p className="text-sm text-white">{formatNumber(proposal.totalVoters)}/{formatNumber(proposal.requiredQuorum)}</p>
                            </div>
                          </div>

                          {/* Sharia Review (if applicable) */}
                          {proposal.shariaReview && proposal.shariaReview.ruling && (
                            <div className="p-3 bg-amber-900/20 rounded-lg border border-amber-600/30">
                              <div className="flex items-center gap-2 mb-2">
                                <Shield className="w-4 h-4 text-amber-400" />
                                <h4 className="text-sm font-medium text-amber-400">Sharia Council Ruling</h4>
                              </div>
                              <p className="text-sm text-gray-300">{proposal.shariaReview.ruling}</p>
                              {proposal.shariaReview.reviewer && (
                                <p className="text-xs text-gray-500 mt-2">
                                  Reviewed by: {proposal.shariaReview.reviewer} • {proposal.shariaReview.createdAt}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Discussions */}
                          <DiscussionSection
                            proposal={proposal}
                            currentUserRole={user.role}
                            userDID={user.did}
                            isShariaCouncil={false}
                            onAddDiscussion={(proposalId: string, content: string) => {
                              console.log(`Adding discussion to ${proposalId}: ${content}`)
                              // In real app, add to state or API
                            }}
                          />

                          {/* Add Discussion */}
                          {/* {didConnected && (
                            <div className="pt-4 border-t border-gray-700">
                              <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                Add Discussion
                              </h4>
                              <div className="space-y-3">
                                <textarea
                                  value={newDiscussionContent[proposal.id] || ""}
                                  onChange={(e) => setNewDiscussionContent(prev => ({
                                    ...prev,
                                    [proposal.id]: e.target.value
                                  }))}
                                  placeholder="Share your thoughts on this proposal..."
                                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 resize-none"
                                  rows={3}
                                />
                                <Button
                                  onClick={(e) => { e.stopPropagation(); handleAddDiscussion(proposal.id); }}
                                  disabled={!newDiscussionContent[proposal.id]?.trim()}
                                  variant="warning"
                                  size="sm"
                                >
                                  Post Comment
                                </Button>
                              </div>
                            </div>
                          )} */}

                          {/* Voting Actions */}
                          {isActive && canVote && (
                            <div className="pt-4 border-t border-gray-700">
                              <h4 className="text-sm font-medium text-gray-400 mb-3">Cast Your Vote</h4>
                              <div className="flex gap-3">
                                <Button
                                  onClick={(e) => { e.stopPropagation(); handleVote(proposal.id, "for"); }}
                                  variant={userVotes[proposal.id] === "for" ? "success" : "outline"}
                                  className={`flex-1 ${
                                    userVotes[proposal.id] !== "for"
                                      ? "border-green-600 text-green-400 hover:bg-green-600/20"
                                      : ""
                                  }`}
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  For
                                </Button>
                                <Button
                                  onClick={(e) => { e.stopPropagation(); handleVote(proposal.id, "against"); }}
                                  variant={userVotes[proposal.id] === "against" ? "danger" : "outline"}
                                  className={`flex-1 ${
                                    userVotes[proposal.id] !== "against"
                                      ? "border-red-600 text-red-400 hover:bg-red-600/20"
                                      : ""
                                  }`}
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Against
                                </Button>
                                <Button
                                  onClick={(e) => { e.stopPropagation(); handleVote(proposal.id, "abstain"); }}
                                  variant={userVotes[proposal.id] === "abstain" ? "ghost" : "outline"}
                                  className={`flex-1 ${
                                    userVotes[proposal.id] === "abstain"
                                      ? "bg-gray-600 hover:bg-gray-700 text-white"
                                      : "border-gray-600 text-gray-400 hover:bg-gray-600/20"
                                  }`}
                                >
                                  <Clock className="w-4 h-4 mr-2" />
                                  Abstain
                                </Button>
                              </div>
                            </div>
                          )}

                          {isActive && !canVote && (
                            <div className="p-3 bg-amber-900/20 rounded-lg border border-amber-600/30 text-center">
                              <p className="text-sm text-amber-400">Connect your DID to vote on this proposal</p>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  )
                })
              )}
            </div>

            {/* View All Proposals Link */}
            <div className="text-center mt-4">
              <Button variant="outline" className="text-amber-400 hover:text-amber-300 border-transparent">
                View all proposals
              </Button>
            </div>

            {/* Top Contributors Section - Tally "Rising Delegates" Style */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Top Contributors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mockTopContributors.slice(0, 6).map((contributor, index) => (
                  <div 
                    key={contributor.address}
                    className="flex items-center justify-between p-3 bg-gray-900/80 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                        <span className="text-xs font-bold text-black">{contributor.displayName.charAt(0).toUpperCase()}</span>
                      </div>
                      <span className="text-sm text-white">{contributor.displayName}</span>
                    </div>
                    <span className="text-sm text-gray-400">{formatNumber(contributor.tawfPoints)} TP</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <Button variant="outline" className="text-amber-400 hover:text-amber-300 border-transparent">
                  View all contributors
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards at Bottom */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gray-900/80 border border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Dual-Layer DAO Model</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-300">
              <div>
                <h4 className="font-semibold text-white mb-1">Community Governance Layer</h4>
                <p className="text-xs">
                  Proposal creation, community voting, election of Sharia Council members, and oversight decisions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Sharia Stewardship Layer</h4>
                <p className="text-xs">
                  Reviews proposals for Sharia alignment, issues rulings, operates independently with legitimacy derived from community election.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">TAWF Points (TP)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Non-transferable</span>
                <span className="text-amber-400">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Bound to your TAWF DID</span>
                <span className="text-amber-400">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Earned through participation</span>
                <span className="text-amber-400">✓</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-700">
                <span>Your Tawf Points</span>
                <span className="text-amber-400 font-semibold">{user.points} TP</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Governance vs Staking Separation Notice */}
        <div className="mt-6 p-4 bg-gray-900/60 border border-gray-700 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 text-sm">ℹ</span>
            </div>
            <div>
              <p className="text-gray-300 text-sm font-medium">Governance ≠ Staking</p>
              <p className="text-gray-500 text-xs mt-1">
                Governance is an institutional decision-making body for the TAWF protocol. 
                Staking occurs on external networks and is a separate action. 
                <Link href="/dashboard" className="text-amber-400 hover:text-amber-300 ml-1">
                  View External Network Staking →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
