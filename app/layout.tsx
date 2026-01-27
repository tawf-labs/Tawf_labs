import type React from "react"
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
    title: "Tawf Sharia dApp Ecosystem",
    description:
      "Sharia-compliant dapps, built for the Ummah.",
    icons: {
      icon: [{ url: "/tawflogo.png", type: "image/png" }],
      shortcut: "/tawflogo.png",
      apple: "/tawflogo.png",
    },
    openGraph: {
      title: "Tawf Sharia dApp Ecosystem",
      description:
        "Tawf enables Muslims to fulfill Islamic obligations on-chain. Zakat at zkt.app, Qurbani at qrbn.app. Sharia-compliant with zero-knowledge privacy.",
      images: [
        {
          url: "/tawflogo.png",
          width: 1200,
          height: 630,
          alt: "Tawf - Sharia dApp Ecosystem",
        },
      ],
      type: "website",
      siteName: "Tawf",
    },
    twitter: {
      card: "summary_large_image",
      title: "Tawf Sharia dApp Ecosystem",
      description:
        "Sharia-compliant dapps for the Ummah. Zakat (zkt.app), Qurbani (qrbn.app). Privacy-preserving, verified by Islamic scholars.",
      images: ["/tawflogo.png"],
    },
    keywords: [
      "Zakat",
      "Zakat on-chain",
      "Qurbani",
      "Qurban",
      "Sharia dApp",
      "Islamic Crypto",
      "Islamic Finance",
      "Zero Knowledge",
      "zkt.app",
      "qrbn.app",
      "Sharia Compliance",
    ],
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <div id="main-content" tabIndex={-1} className="sr-only">
            Main content
          </div>
          {children}
        </Providers>
      </body>
    </html>
  )
}