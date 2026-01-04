"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { ConnectButton } from "@xellar/kit"
import {
  GovernanceSidebar,
  ProposalCard,
  DIDConnectPrompt,
  ShariaProposalCard,
} from "@/components/governance"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
} from "@/lib/governance"

export default function GovernancePage() {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<
    "community" | "treasury" | "protocol" | "sharia"
  >("community")
  const [searchTerm, setSearchTerm] = useState("")
  const [user, setUser] = useState(mockCurrentUser)
  const [userVotes, setUserVotes] = useState<Record<string, "for" | "against" | "abstain">>({})
  const [didConnected, setDidConnected] = useState(false)
  const [showDIDPrompt, setShowDIDPrompt] = useState(true)

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
            TAWF Governance Portal
          </h2>
          <p className="text-gray-400 mb-8">
            Connect your wallet to participate in Sharia-compliant community governance
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
        <div className="hidden lg:block">
          <GovernanceSidebar
            proposals={mockProposals}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchTerm={searchTerm}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-black/95">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-amber-100 font-bold text-sm">T</span>
              </div>
              <span className="ml-2 font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                Governance
              </span>
            </div>
            <ConnectButton />
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between p-4 border-b border-gray-800">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                TAWF Governance Portal
              </h1>
              <p className="text-gray-400 text-sm">Community-driven Sharia-compliant governance</p>
            </div>
            <div className="flex items-center gap-4">
              {/* User Stats */}
              <div className="flex items-center gap-3 bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-2">
                <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                  {getRoleDisplayName(user.role)}
                </Badge>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Points</p>
                  <p className="text-amber-400 font-bold">{user.points.toLocaleString()}</p>
                </div>
              </div>
              <ConnectButton />
            </div>
          </div>

          {/* Panel Content */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Mobile Sidebar */}
            <div className="lg:hidden">
              <GovernanceSidebar
                proposals={mockProposals}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                searchTerm={searchTerm}
              />
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search proposals..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900/80 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-600"
            />

            {/* DID Connect Prompt */}
            {showDIDPrompt && (
              <DIDConnectPrompt onConnect={handleConnectDID} />
            )}

            {/* Tabs */}
            <Tabs defaultValue="proposals" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900/80 border border-gray-800">
                <TabsTrigger value="proposals" className="text-white data-[state=active]:bg-amber-600">
                  Community Proposals
                </TabsTrigger>
                {isShariaCouncil && (
                  <TabsTrigger value="sharia" className="text-white data-[state=active]:bg-amber-600">
                    Sharia Review Panel
                  </TabsTrigger>
                )}
              </TabsList>

              {/* Community Proposals Tab */}
              <TabsContent value="proposals" className="space-y-4">
                {filteredProposals.length === 0 ? (
                  <Card className="bg-gray-900/80 border border-gray-800">
                    <CardContent className="p-12 text-center">
                      <p className="text-gray-400">No proposals found matching your search</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredProposals.map(proposal => (
                    <ProposalCard
                      key={proposal.id}
                      proposal={proposal}
                      onVote={handleVote}
                      userVote={userVotes[proposal.id] || null}
                      canVote={canVote && proposal.status === "active"}
                      onShowDetails={proposalId => {
                        alert(`Viewing details for proposal: ${proposalId}`)
                      }}
                    />
                  ))
                )}
              </TabsContent>

              {/* Sharia Review Tab */}
              {isShariaCouncil && (
                <TabsContent value="sharia" className="space-y-4">
                  <div className="p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
                    <h3 className="text-amber-400 font-semibold mb-2">Sharia Council Review Panel</h3>
                    <p className="text-sm text-gray-300">
                      As a Sharia Council member, you can review proposals for Sharia compliance and issue rulings.
                    </p>
                  </div>

                  {mockShariaProposals.length === 0 ? (
                    <Card className="bg-gray-900/80 border border-gray-800">
                      <CardContent className="p-12 text-center">
                        <p className="text-gray-400">No proposals pending Sharia review</p>
                      </CardContent>
                    </Card>
                  ) : (
                    mockShariaProposals.map(proposal => (
                      <ShariaProposalCard
                        key={proposal.id}
                        proposal={proposal}
                        canReview={isShariaCouncil}
                        onApprove={handleShariaApprove}
                        onReject={handleShariaReject}
                      />
                    ))
                  )}
                </TabsContent>
              )}
            </Tabs>

            {/* Info Cards */}
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
                  <CardTitle className="text-sm">TAWF Governance Points</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Non-transferable</span>
                    <span className="text-amber-400">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bound to your DID</span>
                    <span className="text-amber-400">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Earned through participation</span>
                    <span className="text-amber-400">✓</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-700">
                    <span>Your Points</span>
                    <span className="text-amber-400 font-semibold">{user.points}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
