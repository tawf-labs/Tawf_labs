export interface TokenBalance {
  contractAddress: string
  token: TokenMetadata
  balance: string
  formattedBalance: string
  usdValue?: number
}

export interface TokenMetadata {
  address: string
  name: string
  symbol: string
  decimals: number
  logo?: string
  type?: "ERC-20" | "ERC-721" | "ERC-1155" | "native"
}

export interface PortfolioToken {
  address: string
  name: string
  symbol: string
  decimals: number
  balance: string
  formattedBalance: string
  usdValue?: number
  logo?: string
  color?: string
}

export interface BlockscoutTokenBalance {
  contract_address: string
  token: {
    name: string
    symbol: string
    decimals: string
    logo?: string
    type?: string
  }
  value: string
  value_formatted: string
  token_price_usd?: string
}

export interface BlockscoutResponse<T> {
  items: T[]
  next_page_params?: Record<string, unknown>
}
