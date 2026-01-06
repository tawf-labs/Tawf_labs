"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { ConnectButton } from "@xellar/kit"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Shield, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  Scale
} from "lucide-react"
import Link from "next/link"
import {
  mockShariaProposals,
  mockShariaCouncilMember,
  mockCurrentUser,
  getMockUserByAddress,
  TEST_ADDRESSES,
  getRoleDisplayName,
  getRoleBadgeColor,
  formatNumber,
  getStatusBadgeColor,
  getStatusDisplayName,
  calculateVotePercentage,
} from "@/lib/governance"

export default function ShariaCouncilPage() {
  const { address, isConnected } = useAccount()
  const [user, setUser] = useState(mockCurrentUser)
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({})

  // Simulate user based on connected address
  useEffect(() => {
    if (address && isConnected) {
      if (address === TEST_ADDRESSES.SHARIA_COUNCIL) {
        setUser(mockShariaCouncilMember)
      } else {
        const mockUser = getMockUserByAddress(address)
        setUser(mockUser)
      }
    } else {
      setUser(mockCurrentUser)
    }
  }, [address, isConnected])

  const isShariaCouncil = user.role === "sharia_council"

  const handleApprove = (proposalId: string) => {
    alert(`Proposal ${proposalId} has been APPROVED. The ruling has been recorded.`)
  }

  const handleReject = (proposalId: string) => {
    alert(`Proposal ${proposalId} has been REJECTED. The ruling has been recorded.`)
  }

  const handleRequestRevision = (proposalId: string) => {
    alert(`Revision requested for proposal ${proposalId}. The proposer will be notified.`)
  }

  // Show access denied if not Sharia Council
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black/95 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-amber-400" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Sharia Council Portal
          </h2>
          <p className="text-gray-400 mb-8">
            Connect your wallet to access the Sharia Council review panel
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    )
  }

  if (!isShariaCouncil) {
    return (
      <div className="min-h-screen bg-black/95 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-red-800/50 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Access Restricted
          </h2>
          <p className="text-gray-400 mb-4">
            This portal is only accessible to elected Sharia Council members.
          </p>
          <p className="text-xs text-gray-500 mb-6">
            Connected as: <span className="text-gray-400">{getRoleDisplayName(user.role)}</span>
          </p>
          <Link href="/governance">
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Governance
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Sharia Council Interface
  return (
    <div className="min-h-screen bg-black/95 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900/30 via-gray-900 to-amber-900/30 border-b border-amber-600/30">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/governance" 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Governance</span>
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Sharia Council Portal</h1>
                <p className="text-amber-400/80 text-sm">Sharia Stewardship Layer</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <Badge className="bg-amber-600 text-white">
                  {getRoleDisplayName(user.role)}
                </Badge>
                <p className="text-xs text-gray-400 mt-1">{user.points} Tawf Points</p>
              </div>
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Council Role Description */}
        <Card className="bg-amber-900/20 border border-amber-600/30 mb-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-amber-400 mt-0.5" />
              <div>
                <h3 className="text-amber-400 font-semibold">Your Responsibility</h3>
                <p className="text-sm text-gray-300 mt-1">
                  As a Sharia Council member, you are entrusted to review proposals for alignment with 
                  Islamic principles. Your rulings are binding and should be supported by evidence from 
                  Quran, Sunnah, and established fiqh rulings. The community has elected you for this sacred duty.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-900/80 border border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <Clock className="w-4 h-4" />
                <span>Pending Review</span>
              </div>
              <p className="text-2xl font-bold text-amber-400">
                {mockShariaProposals.filter(p => p.status === "active" || p.status === "pending_sharia").length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <CheckCircle className="w-4 h-4" />
                <span>Approved</span>
              </div>
              <p className="text-2xl font-bold text-green-400">12</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <XCircle className="w-4 h-4" />
                <span>Rejected</span>
              </div>
              <p className="text-2xl font-bold text-red-400">3</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <FileText className="w-4 h-4" />
                <span>Total Rulings</span>
              </div>
              <p className="text-2xl font-bold text-white">15</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900/80 border border-gray-800 mb-6">
            <TabsTrigger value="pending" className="text-white data-[state=active]:bg-amber-600">
              Pending Review
            </TabsTrigger>
            <TabsTrigger value="rulings" className="text-white data-[state=active]:bg-amber-600">
              Internal Rulings
            </TabsTrigger>
            <TabsTrigger value="history" className="text-white data-[state=active]:bg-amber-600">
              History
            </TabsTrigger>
          </TabsList>

          {/* Pending Review Tab */}
          <TabsContent value="pending" className="space-y-4">
            {mockShariaProposals.length === 0 ? (
              <Card className="bg-gray-900/80 border border-gray-800">
                <CardContent className="p-12 text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <p className="text-gray-400">All proposals have been reviewed</p>
                </CardContent>
              </Card>
            ) : (
              mockShariaProposals.map(proposal => (
                <Card 
                  key={proposal.id}
                  className="bg-gray-900/80 border border-gray-800"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${getStatusBadgeColor(proposal.status)} text-white text-xs`}>
                            {getStatusDisplayName(proposal.status)}
                          </Badge>
                          <Badge className="bg-amber-600/30 text-amber-400 text-xs">
                            Sharia Ruling Required
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{proposal.title}</CardTitle>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <p>Created: {proposal.createdAt}</p>
                        <p>Ends: {proposal.endDate}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-400 text-sm">{proposal.description}</p>

                    {/* Community Vote Summary (if applicable) */}
                    {proposal.totalVoters > 0 && (
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <h4 className="text-sm font-medium text-white mb-2">Community Vote Summary</h4>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-green-400 font-bold">{proposal.votesFor}</p>
                            <p className="text-xs text-gray-500">For</p>
                          </div>
                          <div>
                            <p className="text-red-400 font-bold">{proposal.votesAgainst}</p>
                            <p className="text-xs text-gray-500">Against</p>
                          </div>
                          <div>
                            <p className="text-gray-400 font-bold">{proposal.votesAbstain}</p>
                            <p className="text-xs text-gray-500">Abstain</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Review Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Ruling Notes & Evidence
                      </label>
                      <textarea
                        placeholder="Provide your ruling with evidence from Quran, Sunnah, or established fiqh..."
                        value={reviewNotes[proposal.id] || ""}
                        onChange={(e) => setReviewNotes(prev => ({
                          ...prev,
                          [proposal.id]: e.target.value
                        }))}
                        className="w-full h-32 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 text-sm"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-700">
                      <Button
                        onClick={() => handleApprove(proposal.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve - Sharia Compliant
                      </Button>
                      <Button
                        onClick={() => handleRequestRevision(proposal.id)}
                        variant="outline"
                        className="flex-1 border-amber-600 text-amber-400 hover:bg-amber-600/20"
                      >
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Request Revision
                      </Button>
                      <Button
                        onClick={() => handleReject(proposal.id)}
                        variant="outline"
                        className="flex-1 border-red-600 text-red-400 hover:bg-red-600/20"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject - Not Compliant
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Internal Rulings Tab */}
          <TabsContent value="rulings" className="space-y-4">
            <Card className="bg-gray-900/80 border border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Internal Sharia Rulings</CardTitle>
                <p className="text-gray-400 text-sm">
                  Rulings that require internal council deliberation
                </p>
              </CardHeader>
              <CardContent>
                {mockShariaProposals.filter(p => p.category === "sharia_ruling").length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No internal rulings pending</p>
                ) : (
                  <div className="space-y-4">
                    {mockShariaProposals.filter(p => p.category === "sharia_ruling").map(proposal => (
                      <div 
                        key={proposal.id}
                        className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">{proposal.title}</h4>
                          <Badge className="bg-amber-600/30 text-amber-400 text-xs">
                            Council Vote
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{proposal.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <span className="text-green-400">{proposal.votesFor}</span>
                            <span className="text-gray-500">For</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-red-400">{proposal.votesAgainst}</span>
                            <span className="text-gray-500">Against</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-400">{proposal.votesAbstain}</span>
                            <span className="text-gray-500">Abstain</span>
                          </div>
                          <span className="text-gray-500 ml-auto">
                            Quorum: {proposal.totalVoters}/{proposal.requiredQuorum}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card className="bg-gray-900/80 border border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Ruling History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "hist-1", title: "ZK Privacy Features Review", status: "approved", date: "2025-12-22", ruling: "Approved with conditions" },
                    { id: "hist-2", title: "Qurban Distribution Partnership", status: "approved", date: "2025-12-20", ruling: "Fully compliant" },
                    { id: "hist-3", title: "Waqf Management Extension", status: "rejected", date: "2025-11-28", ruling: "Requires restructuring" },
                  ].map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-white">{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.ruling}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={item.status === "approved" ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
                          {item.status === "approved" ? "Approved" : "Rejected"}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
