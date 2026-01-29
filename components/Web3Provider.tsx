"use client"

import React, { useState } from "react"
import { Config, WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { XellarKitProvider, defaultConfig, darkTheme } from "@xellar/kit"
import { baseSepolia, liskSepolia } from "viem/chains"

const config = defaultConfig({
  appName: "TAWF",
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
  xellarAppId: process.env.NEXT_PUBLIC_XELLAR_APP_ID || "",
  xellarEnv: "sandbox",
  ssr: true,
  chains: [baseSepolia, liskSepolia],
}) as Config

export const Web3Provider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider
          theme={darkTheme}
          showConfirmationModal={true}
        >
          {children}
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}