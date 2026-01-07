import type {
  PortfolioToken,
  BlockscoutTokenBalance,
  BlockscoutResponse,
} from "./types"
import { baseSepolia, liskSepolia } from "viem/chains"

// Network configuration
const NETWORK_CONFIGS = {
  [baseSepolia.id]: {
    name: "Base Sepolia",
    blockscoutUrl: "https://base-sepolia.blockscout.com/api",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  [liskSepolia.id]: {
    name: "Lisk Sepolia",
    blockscoutUrl: "https://rpc.lisk-sepolia.blockscout.com/api",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
}

// Simple in-memory cache
const tokenMetadataCache = new Map<string, PortfolioToken>()
const balanceCache = new Map<string, PortfolioToken[]>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCacheKey(address: string, chainId: number): string {
  return `${chainId}:${address.toLowerCase()}`
}

function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_TTL
}

/**
 * Fetch token balances for a wallet address from Blockscout API
 * Note: This may fail due to CORS in browser environments
 */
export async function fetchTokenBalances(
  address: string,
  chainId: number
): Promise<PortfolioToken[]> {
  const cacheKey = getCacheKey(address, chainId)

  // Check cache
  const cached = balanceCache.get(cacheKey)
  if (cached && isCacheValid(Date.now())) {
    return cached
  }

  const config = NETWORK_CONFIGS[chainId as keyof typeof NETWORK_CONFIGS]
  if (!config) {
    throw new Error(`Unsupported chain ID: ${chainId}`)
  }

  try {
    // Skip Blockscout API calls from browser due to CORS
    // In production, this should go through a backend proxy
    console.warn('Token balance fetching from Blockscout is disabled in browser environments due to CORS')
    return []
  } catch (error) {
    console.error("Error fetching token balances:", error)
    // Return empty array on fetch errors (e.g., CORS, network issues)
    return []
  }
}

/**
 * Fetch native token balance using RPC calls
 */
export async function fetchNativeBalance(
  address: string,
  chainId: number
): Promise<PortfolioToken | null> {
  const config = NETWORK_CONFIGS[chainId as keyof typeof NETWORK_CONFIGS]
  if (!config) {
    throw new Error(`Unsupported chain ID: ${chainId}`)
  }

  // Direct RPC call (works from browser)
  try {
    const rpcUrl = chainId === liskSepolia.id
      ? "https://lisk-sepolia.drpc.org"
      : chainId === baseSepolia.id
      ? "https://sepolia.base.org"
      : null

    if (!rpcUrl) {
      return null
    }

    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [address, "latest"],
        id: 1,
      }),
    })

    const data = await response.json()
    const balanceHex = data.result || "0x0"
    const balanceBigInt = BigInt(balanceHex)
    const formattedBalance = (Number(balanceBigInt) / Math.pow(10, config.nativeCurrency.decimals)).toFixed(6)

    return {
      address: "0x0000000000000000000000000000000000000000",
      name: config.nativeCurrency.name,
      symbol: config.nativeCurrency.symbol,
      decimals: config.nativeCurrency.decimals,
      balance: balanceHex,
      formattedBalance,
      color: getNativeTokenColor(chainId),
    }
  } catch (error) {
    console.error("Error fetching native balance from RPC:", error)
    return null
  }
}

/**
 * Fetch all tokens (native + ERC20) for a wallet
 */
export async function fetchAllTokens(
  address: string,
  chainId: number
): Promise<PortfolioToken[]> {
  const [nativeBalance, tokenBalances] = await Promise.all([
    fetchNativeBalance(address, chainId),
    fetchTokenBalances(address, chainId),
  ])

  const allTokens = [...tokenBalances]
  if (nativeBalance) {
    allTokens.unshift(nativeBalance)
  }

  // Filter out tokens with zero balance
  return allTokens.filter((token) => {
    const balance = BigInt(token.balance)
    return balance > BigInt(0)
  })
}

/**
 * Get token color based on symbol (for UI display)
 */
function getTokenColor(symbol: string): string {
  const colors: Record<string, string> = {
    USDC: "from-blue-400 to-blue-600",
    USDT: "from-green-400 to-green-600",
    DAI: "from-yellow-400 to-yellow-600",
    ISLM: "from-amber-500 to-amber-600",
    ETH: "from-gray-500 to-gray-600",
  }

  return colors[symbol.toUpperCase()] || "from-gray-400 to-gray-500"
}

/**
 * Get native token color based on chain ID
 */
function getNativeTokenColor(chainId: number): string {
  if (chainId === baseSepolia.id || chainId === liskSepolia.id) {
    return "from-gray-500 to-gray-600"
  }
  return "from-gray-400 to-gray-500"
}

/**
 * Clear cache (useful for manual refresh)
 */
export function clearTokenCache(): void {
  tokenMetadataCache.clear()
  balanceCache.clear()
}

/**
 * Get network name by chain ID
 */
export function getNetworkName(chainId: number): string {
  const config = NETWORK_CONFIGS[chainId as keyof typeof NETWORK_CONFIGS]
  return config?.name || `Chain ID: ${chainId}`
}
