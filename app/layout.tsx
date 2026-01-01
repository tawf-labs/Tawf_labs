import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tawf — Sharia-First Web3 Governance Layer",
    description:
      "Tawf is a Sharia-first Web3 ecosystem providing on-chain zakat, waqf, and qurban infrastructure, governed by a dual-layer DAO with zero-knowledge Sharia oversight.",
    icons: {
      icon: [{ url: "/tawflogo.png", type: "image/png" }],
      shortcut: "/tawflogo.png",
      apple: "/tawflogo.png",
    },
    openGraph: {
      title: "Tawf — Sharia-First Web3 Governance Layer",
      description:
        "A Sharia-first Web3 governance layer for zakat, waqf, qurban, and community-led applications, secured by zero-knowledge Sharia oversight.",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: "Tawf — Sharia-First Web3 Governance Layer",
        },
      ],
      type: "website",
      siteName: "Tawf",
    },
    twitter: {
      card: "summary_large_image",
      title: "Tawf — Sharia-First Web3 Governance Layer",
      description:
        "Sharia-first governance infrastructure for zakat, waqf, qurban, and ethical Web3 applications.",
      images: ["/og-image.svg"],
    },
    keywords: [
      "Sharia Governance",
      "Islamic DAO",
      "Zakat",
      "Waqf",
      "Qurban",
      "Web3 Governance",
      "Zero Knowledge",
      "Islamic Finance",
      "Onchain Governance",
    ],
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`} suppressHydrationWarning>
        {/* <Header /> */}
        {children}
      </body>
    </html>
  )
}
