import type { Metadata } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

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
    viewport: "width=device-width, initial-scale=1",
    title: "TAWF - Bridging the Ummah to Web3",
    description:
      "Chain-agnostic trust infrastructure serving the Sharia dApp ecosystem",
    icons: {
      icon: [{ url: "/tawflogo.png", type: "image/png" }],
      shortcut: "/tawflogo.png",
      apple: "/tawflogo.png",
    },
    openGraph: {
      title: "TAWF - Bridging the Ummah to Web3",
      description:
        "Chain-agnostic trust and compliance infrastructure for Sharia-compliant Web3",
      images: [
        {
          url: "/tawflogo.png",
          width: 1200,
          height: 630,
          alt: "TAWF - Sharia dApp Infrastructure",
        },
      ],
      type: "website",
      siteName: "TAWF",
    },
    twitter: {
      card: "summary_large_image",
      title: "TAWF - Bridging the Ummah to Web3",
      description:
        "Chain-agnostic trust and compliance infrastructure for Sharia-compliant Web3",
      images: ["/tawflogo.png"],
    },
    keywords: [
      "Sharia dApp Infrastructure",
      "Islamic Web3 Platform",
      "Zakat Services",
      "Qurbani Services",
      "Zero Knowledge Proofs",
      "Islamic Crypto Infrastructure",
      "Sharia Compliance Layer",
      "Islamic DeFi",
      "zkt.app",
      "qrbn.app",
      "Ummah Web3",
      "Islamic Blockchain",
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
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-2 focus:bg-neutral-900 focus:text-white rounded">
            Skip to main content
          </a>
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}