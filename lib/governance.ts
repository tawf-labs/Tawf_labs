// Governance Types and Mock Data for TAWF Governance Portal

// ============ TYPES ============

export type UserRole = "user" | "ngo" | "maintainer" | "sharia_council"

export type ProposalStatus = "active" | "passed" | "rejected" | "pending_sharia" | "sharia_approved" | "sharia_rejected"

export type ProposalCategory = "community" | "treasury" | "protocol" | "sharia_election" | "sharia_ruling"

export interface Proposal {
  id: string
  title: string
  description: string
  category: ProposalCategory
  status: ProposalStatus
  author: string
  authorRole: UserRole
  createdAt: string
  endDate: string
  votesFor: number
  votesAgainst: number
  votesAbstain: number
  totalVoters: number
  requiredQuorum: number
  discussions: Discussion[]
  shariaReview?: ShariaReview
}

export interface Discussion {
  id: string
  author: string
  authorRole: UserRole
  content: string
  createdAt: string
}

export interface ShariaReview {
  status: "pending" | "approved" | "rejected" | "needs_revision"
  reviewer?: string
  ruling?: string
  evidence?: string[]
  createdAt?: string
}

export interface GovernanceUser {
  address: string
  did: string | null
  role: UserRole
  points: number
  proposalsCreated: number
  votesParticipated: number
  joinedAt: string
}

export interface FundVault {
  id: string
  name: string
  description: string
  balance: number
  currency: string
  percentage: number
  lastUpdated: string
}

// Treasury Policy Types
export interface TreasuryPolicy {
  allowedSources: TreasurySource[]
  prohibitedSources: string[]
  spendingCategories: SpendingCategory[]
  lastUpdated: string
}

export interface TreasurySource {
  id: string
  name: string
  description: string
  isActive: boolean
}

export interface SpendingCategory {
  id: string
  name: string
  description: string
  maxAllocation: number // percentage
}

// DAO Stats for Tally-style header
export interface DAOStats {
  totalMembers: number
  didHolders: number
  activeProposals: number
  totalProposals: number
  treasuryBalance: number
  treasuryCurrency: string
}

// Top Contributors / Voters
export interface TopContributor {
  address: string
  displayName: string
  avatar?: string
  tawfPoints: number
  role: UserRole
}

// ============ MOCK DATA ============

export const mockCurrentUser: GovernanceUser = {
  address: "0x1234...5678",
  did: null, // null means no DID connected
  role: "user",
  points: 0,
  proposalsCreated: 0,
  votesParticipated: 0,
  joinedAt: "2025-12-01",
}

// Mock user with DID connected (for testing)
export const mockConnectedDIDUser: GovernanceUser = {
  address: "0x1234...5678",
  did: "did:ethr:0x1234567890abcdef",
  role: "user",
  points: 1250,
  proposalsCreated: 3,
  votesParticipated: 15,
  joinedAt: "2025-06-15",
}

// Mock Sharia Council member
export const mockShariaCouncilMember: GovernanceUser = {
  address: "0xabcd...efgh",
  did: "did:ethr:0xabcdef1234567890",
  role: "sharia_council",
  points: 5000,
  proposalsCreated: 12,
  votesParticipated: 45,
  joinedAt: "2025-01-01",
}

export const mockProposals: Proposal[] = [
  {
    id: "prop-001",
    title: "Allocate 10% of Treasury to Zakat Education Initiative",
    description: "This proposal seeks to allocate 10% of the Tawf Treasury funds towards developing educational materials and workshops about Zakat calculation and distribution, targeting both new Muslims and those unfamiliar with proper Zakat practices.",
    category: "treasury",
    status: "active",
    author: "0x7890...abcd",
    authorRole: "user",
    createdAt: "2025-12-28",
    endDate: "2026-01-10",
    votesFor: 1245,
    votesAgainst: 234,
    votesAbstain: 89,
    totalVoters: 1568,
    requiredQuorum: 2000,
    discussions: [
      {
        id: "disc-001",
        author: "0xdef0...1234",
        authorRole: "ngo",
        content: "This aligns perfectly with our mission. We can partner with local mosques to distribute these materials.",
        createdAt: "2025-12-29",
      },
    ],
  },
  {
    id: "prop-002",
    title: "Elect New Sharia Council Member - Dr. Ahmad Hassan",
    description: "Community nomination for Dr. Ahmad Hassan to join the Sharia Council. Dr. Hassan has 20+ years of experience in Islamic Finance and holds a PhD in Islamic Jurisprudence from Al-Azhar University.",
    category: "sharia_election",
    status: "active",
    author: "0x5678...9abc",
    authorRole: "maintainer",
    createdAt: "2025-12-25",
    endDate: "2026-01-15",
    votesFor: 2890,
    votesAgainst: 156,
    votesAbstain: 234,
    totalVoters: 3280,
    requiredQuorum: 3000,
    discussions: [
      {
        id: "disc-002",
        author: "0xfedc...ba98",
        authorRole: "user",
        content: "Dr. Hassan has excellent credentials. His work on Islamic derivatives was groundbreaking.",
        createdAt: "2025-12-26",
      },
      {
        id: "disc-003",
        author: "0x8765...4321",
        authorRole: "maintainer",
        content: "I second this nomination. His publications on Sharia-compliant finance are widely respected.",
        createdAt: "2025-12-27",
      },
    ],
  },
  {
    id: "prop-003",
    title: "Integrate Privacy-Preserving Zakat Tracking",
    description: "Implement zero-knowledge proofs for Zakat contributions to maintain donor privacy while ensuring transparency in fund distribution.",
    category: "protocol",
    status: "pending_sharia",
    author: "0xabcd...5678",
    authorRole: "maintainer",
    createdAt: "2025-12-20",
    endDate: "2025-12-30",
    votesFor: 3456,
    votesAgainst: 123,
    votesAbstain: 45,
    totalVoters: 3624,
    requiredQuorum: 3000,
    discussions: [
      {
        id: "disc-004",
        author: "0x1234...abcd",
        authorRole: "maintainer",
        content: "Privacy is crucial for Zakat donors. This ZKP implementation could really help adoption.",
        createdAt: "2025-12-21",
      },
      {
        id: "disc-005",
        author: "0x5678...efgh",
        authorRole: "user",
        content: "Will this affect the transparency requirements for fund distribution?",
        createdAt: "2025-12-22",
      },
    ],
    shariaReview: {
      status: "pending",
    },
  },
  {
    id: "prop-004",
    title: "Qurban Distribution Partnership with Islamic Relief",
    description: "Establish official partnership with Islamic Relief for Qurban meat distribution to ensure wider reach and proper Sharia-compliant handling.",
    category: "community",
    status: "sharia_approved",
    author: "0x9012...3456",
    authorRole: "ngo",
    createdAt: "2025-12-15",
    endDate: "2025-12-25",
    votesFor: 4521,
    votesAgainst: 89,
    votesAbstain: 156,
    totalVoters: 4766,
    requiredQuorum: 3000,
    discussions: [],
    shariaReview: {
      status: "approved",
      reviewer: "Sharia Council",
      ruling: "This partnership aligns with Islamic principles of cooperation (ta'awun) for charitable purposes. The distribution methodology meets Sharia requirements.",
      createdAt: "2025-12-22",
    },
  },
  {
    id: "prop-005",
    title: "Reduce Ujrah Fee from 2.5% to 2%",
    description: "Proposal to reduce the platform ujrah (service fee) from 2.5% to 2% to encourage more participation and reduce burden on contributors.",
    category: "treasury",
    status: "passed",
    author: "0x3456...7890",
    authorRole: "user",
    createdAt: "2025-12-01",
    endDate: "2025-12-15",
    votesFor: 5234,
    votesAgainst: 1023,
    votesAbstain: 345,
    totalVoters: 6602,
    requiredQuorum: 5000,
    discussions: [],
    shariaReview: {
      status: "approved",
      reviewer: "Sharia Council",
      ruling: "Fee reduction is permissible and encouraged as it reduces burden on those performing charitable obligations.",
      createdAt: "2025-12-10",
    },
  },
  {
    id: "prop-006",
    title: "Add Support for Waqf (Endowment) Management",
    description: "Extend the platform to support Waqf management, allowing users to create and manage Islamic endowments with transparent on-chain tracking.",
    category: "protocol",
    status: "rejected",
    author: "0x6789...0123",
    authorRole: "user",
    createdAt: "2025-11-15",
    endDate: "2025-11-30",
    votesFor: 1234,
    votesAgainst: 3456,
    votesAbstain: 567,
    totalVoters: 5257,
    requiredQuorum: 5000,
    discussions: [],
  },
]

// Mock Sharia-specific proposals (only visible to Sharia Council)
export const mockShariaProposals: Proposal[] = [
  {
    id: "sharia-001",
    title: "Ruling: Cryptocurrency Zakat Calculation Method",
    description: "Determine the proper methodology for calculating Zakat on cryptocurrency holdings. Should it follow the gold standard (2.5% after nisab) or require special considerations?",
    category: "sharia_ruling",
    status: "active",
    author: "Sharia Council",
    authorRole: "sharia_council",
    createdAt: "2025-12-30",
    endDate: "2026-01-20",
    votesFor: 3,
    votesAgainst: 1,
    votesAbstain: 1,
    totalVoters: 5,
    requiredQuorum: 4,
    discussions: [
      {
        id: "sharia-disc-001",
        author: "Dr. Ahmad",
        authorRole: "sharia_council",
        content: "Based on contemporary scholarly consensus, cryptocurrency should be treated as tradable assets (urud al-tijarah) and zakatable at 2.5% after holding for one lunar year.",
        createdAt: "2025-12-31",
      },
    ],
  },
  {
    id: "sharia-002",
    title: "Review: Zero-Knowledge Proof Privacy Features",
    description: "Review the Sharia compliance of using zero-knowledge proofs for anonymous charitable contributions. Does anonymity in giving align with Islamic principles?",
    category: "sharia_ruling",
    status: "pending_sharia",
    author: "Sharia Council",
    authorRole: "sharia_council",
    createdAt: "2025-12-28",
    endDate: "2026-01-15",
    votesFor: 0,
    votesAgainst: 0,
    votesAbstain: 0,
    totalVoters: 0,
    requiredQuorum: 4,
    discussions: [],
  },
]

export const mockFundVaults: FundVault[] = [
  {
    id: "vault-zakat",
    name: "Zakat Fund Vault",
    description: "Holds Zakat contributions awaiting distribution to eligible recipients (asnaf). Funds are distributed according to Sharia guidelines with full transparency.",
    balance: 1250000,
    currency: "USDC",
    percentage: 45.5,
    lastUpdated: "2026-01-04",
  },
  {
    id: "vault-qurban",
    name: "Qurban Fund Vault",
    description: "Holds Qurban/Udhiyah contributions for the purchase and distribution of sacrificial animals during Eid al-Adha and throughout the year.",
    balance: 450000,
    currency: "USDC",
    percentage: 16.4,
    lastUpdated: "2026-01-04",
  },
  {
    id: "vault-treasury",
    name: "Tawf Treasury",
    description: "Main treasury funded from ujrah (service fees). Used for operational costs, partnerships, and community-approved initiatives.",
    balance: 780000,
    currency: "USDC",
    percentage: 28.4,
    lastUpdated: "2026-01-04",
  },
  {
    id: "vault-dev",
    name: "Tawf Development Treasury",
    description: "Reserved for protocol development, security audits, and infrastructure improvements. Allocations require community governance approval.",
    balance: 267000,
    currency: "USDC",
    percentage: 9.7,
    lastUpdated: "2026-01-04",
  },
]

// Mock Treasury Policy
export const mockTreasuryPolicy: TreasuryPolicy = {
  allowedSources: [
    {
      id: "platform-fees",
      name: "Platform Fees (Ujrah)",
      description: "Service fees collected from platform transactions",
      isActive: true,
    },
    {
      id: "subscriptions",
      name: "Subscriptions",
      description: "Premium feature subscriptions from users and organizations",
      isActive: true,
    },
    {
      id: "infaq",
      name: "Optional Infaq",
      description: "Voluntary donations from community members",
      isActive: true,
    },
    {
      id: "grants",
      name: "Ecosystem Grants",
      description: "Grants from partner blockchain ecosystems",
      isActive: true,
    },
  ],
  prohibitedSources: [
    "Yield from DeFi protocols or lending",
    "Token inflation or minting",
    "Staking rewards or protocol emissions",
    "Interest from any source (riba)",
    "Gambling or speculation profits",
    "Revenue from haram activities",
  ],
  spendingCategories: [
    {
      id: "operations",
      name: "Operations",
      description: "Day-to-day operational costs, infrastructure, and maintenance",
      maxAllocation: 30,
    },
    {
      id: "development",
      name: "Development",
      description: "Protocol development, security audits, and improvements",
      maxAllocation: 25,
    },
    {
      id: "community",
      name: "Community Initiatives",
      description: "Education, outreach, and community-approved projects",
      maxAllocation: 20,
    },
    {
      id: "partnerships",
      name: "Partnerships",
      description: "Strategic partnerships with NGOs and Islamic institutions",
      maxAllocation: 15,
    },
    {
      id: "reserve",
      name: "Emergency Reserve",
      description: "Reserve fund for unexpected expenses",
      maxAllocation: 10,
    },
  ],
  lastUpdated: "2026-01-04",
}

// Mock DAO Stats
export const mockDAOStats: DAOStats = {
  totalMembers: 7842,
  didHolders: 8820,
  activeProposals: 2,
  totalProposals: 12,
  treasuryBalance: 2747000, // Sum of all vaults
  treasuryCurrency: "USDC",
}

// Mock Top Contributors (Tally-style "Rising Delegates")
export const mockTopContributors: TopContributor[] = [
  {
    address: "0x1234...5678",
    displayName: "Tawf Team",
    tawfPoints: 10330000,
    role: "maintainer",
  },
  {
    address: "0xabcd...efgh",
    displayName: "@karmacrypto",
    tawfPoints: 6660000,
    role: "user",
  },
  {
    address: "0x5678...9abc",
    displayName: "@maxkordek",
    tawfPoints: 4730000,
    role: "user",
  },
  {
    address: "0x9012...3456",
    displayName: "przemer",
    tawfPoints: 3200000,
    role: "ngo",
  },
  {
    address: "0xdef0...1234",
    displayName: "grumlin",
    tawfPoints: 2670000,
    role: "user",
  },
  {
    address: "0x378F...4fE9",
    displayName: "0x378F...4fE9",
    tawfPoints: 1800000,
    role: "user",
  },
]

// ============ HELPER FUNCTIONS ============

export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case "user":
      return "Community Member"
    case "ngo":
      return "NGO Partner"
    case "maintainer":
      return "Tawf Labs Maintainer"
    case "sharia_council":
      return "Sharia Council Member"
    default:
      return "Member"
  }
}

export function getRoleBadgeColor(role: UserRole): string {
  switch (role) {
    case "user":
      return "bg-gray-600"
    case "ngo":
      return "bg-blue-600"
    case "maintainer":
      return "bg-purple-600"
    case "sharia_council":
      return "bg-amber-600"
    default:
      return "bg-gray-600"
  }
}

export function getStatusDisplayName(status: ProposalStatus): string {
  switch (status) {
    case "active":
      return "Active"
    case "passed":
      return "Passed"
    case "rejected":
      return "Rejected"
    case "pending_sharia":
      return "Pending Sharia Review"
    case "sharia_approved":
      return "Sharia Approved"
    case "sharia_rejected":
      return "Sharia Rejected"
    default:
      return "Unknown"
  }
}

export function getStatusBadgeColor(status: ProposalStatus): string {
  switch (status) {
    case "active":
      return "bg-green-600"
    case "passed":
      return "bg-blue-600"
    case "rejected":
      return "bg-red-600"
    case "pending_sharia":
      return "bg-yellow-600"
    case "sharia_approved":
      return "bg-emerald-600"
    case "sharia_rejected":
      return "bg-rose-600"
    default:
      return "bg-gray-600"
  }
}

export function calculateVotePercentage(votesFor: number, votesAgainst: number, votesAbstain: number): { for: number; against: number; abstain: number } {
  const total = votesFor + votesAgainst + votesAbstain
  if (total === 0) return { for: 0, against: 0, abstain: 0 }
  return {
    for: Math.round((votesFor / total) * 100),
    against: Math.round((votesAgainst / total) * 100),
    abstain: Math.round((votesAbstain / total) * 100),
  }
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

export function formatCurrency(amount: number, currency: string = "USDC"): string {
  return `${formatNumber(amount)} ${currency}`
}

export function addDiscussion(proposalId: string, author: string, authorRole: UserRole, content: string): Discussion {
  return {
    id: `disc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    author,
    authorRole,
    content,
    createdAt: new Date().toISOString().split("T")[0],
  }
}

// ============ TEST ADDRESSES ============

export const TEST_ADDRESSES = {
  USER: "0x742d35Cc6634C0532925a3b844Bc9e7595f42E7E",
  NGO: "0xABCDEFABCDEFABCDEFABCDEFABCDEFABCDEFABCD",
  MAINTAINER: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  SHARIA_COUNCIL: "0xeF4DB09D536439831FEcaA33fE4250168976535E",
}

// ============ MOCK USER LOOKUP ============

export function getMockUserByAddress(address: string): GovernanceUser {
  // Return different mock users based on address for testing
  const addressLower = address.toLowerCase()
  
  if (addressLower === TEST_ADDRESSES.SHARIA_COUNCIL.toLowerCase()) {
    return mockShariaCouncilMember
  }
  
  if (addressLower === TEST_ADDRESSES.MAINTAINER.toLowerCase()) {
    return {
      ...mockConnectedDIDUser,
      address,
      role: "maintainer",
      points: 2500,
    }
  }
  
  if (addressLower === TEST_ADDRESSES.NGO.toLowerCase()) {
    return {
      ...mockConnectedDIDUser,
      address,
      role: "ngo",
      points: 1200,
    }
  }
  
  if (addressLower === TEST_ADDRESSES.USER.toLowerCase()) {
    return {
      ...mockConnectedDIDUser,
      address,
    }
  }
  
  // Default: return a new user with random points
  return {
    address,
    did: null,
    role: "user",
    points: Math.floor(Math.random() * 500) + 50,
    proposalsCreated: 0,
    votesParticipated: 0,
    joinedAt: new Date().toISOString().split("T")[0],
  }
}
