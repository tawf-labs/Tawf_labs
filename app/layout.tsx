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
    title: "Tawf - Shariah-First Web3 Ecosystem",
    description: "Bridging the ummah to Web3 with Sharia-compliant dApps. Explore zakat, waqf, qurban, and governance on-chain.",
    icons: {
      icon: [
        { url: "/tawflogo.png", type: "image/png" },
      ],
      shortcut: "/tawflogo.png",
      apple: "/tawflogo.png",
    },
    openGraph: {
      title: "Tawf - Shariah-First Web3 Ecosystem",
      description: "Bridging the ummah to Web3 with Sharia-compliant dApps. Explore zakat, waqf, qurban, and governance on-chain.",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: "Tawf - Shariah-First Web3 Ecosystem",
        },
      ],
      type: "website",
      siteName: "Tawf",
    },
    twitter: {
      card: "summary_large_image",
      title: "Tawf - Shariah-First Web3 Ecosystem",
      description: "Bridging the ummah to Web3 with Sharia-compliant dApps",
      images: ["/og-image.svg"],
    },
    keywords: ["Web3", "Shariah-compliant", "Zakat", "Waqf", "Qurban", "Governance", "DeFi", "Islamic Finance"],
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
