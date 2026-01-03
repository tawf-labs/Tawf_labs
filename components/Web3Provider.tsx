"use client"

import React from "react"
import { Config, WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { XellarKitProvider, defaultConfig, darkTheme } from "@xellar/kit"

const config = defaultConfig({
  appName: "Tawf",
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
  xellarAppId: process.env.NEXT_PUBLIC_XELLAR_APP_ID || "",
  xellarEnv: "sandbox",
  ssr: true,
}) as Config

const queryClient = new QueryClient()

export const Web3Provider = ({
  children,
}: {
  children: React.ReactNode
}) => {
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