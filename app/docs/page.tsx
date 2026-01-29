"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Github, Code2, BookOpen, Zap, Wrench, FileText, Users, MessageCircle } from "lucide-react"
import Link from "next/link"

interface DocSection {
  title: string
  description: string
  icon: React.ElementType
  status: "coming-soon" | "available"
  href?: string
}

interface SDKFeature {
  title: string
  description: string
}

export default function DocsPage() {
  const sdkFeatures: SDKFeature[] = [
    {
      title: "Sharia-Compliant Transactions",
      description: "SDK methods for zakat, waqf, and qurban transactions with built-in Sharia validation.",
    },
    {
      title: "Zero-Knowledge Proofs",
      description: "Privacy-preserving identity and verification using zk-SNARKs technology.",
    },
    {
      title: "Smart Contract Integration",
      description: "Seamless integration with TAWF's smart contracts for Islamic finance operations.",
    },
    {
      title: "Wallet Connection",
      description: "Multi-wallet support with Sharia-aware transaction filtering and guidance.",
    },
  ]

  const docSections: DocSection[] = [
    {
      title: "Getting Started",
      description: "Quick start guide to begin building with TAWF. Learn about installation, configuration, and your first Sharia-compliant dApp.",
      icon: BookOpen,
      status: "coming-soon",
    },
    {
      title: "API Reference",
      description: "Complete API documentation for TAWF-SDK. Detailed reference for all methods, types, and interfaces.",
      icon: Code2,
      status: "coming-soon",
    },
    {
      title: "Tutorials & Guides",
      description: "Step-by-step tutorials for building common use cases. From simple zakat trackers to complex waqf systems.",
      icon: FileText,
      status: "coming-soon",
    },
    {
      title: "Examples",
      description: "Code samples and example projects to help you understand best practices and common patterns.",
      icon: Wrench,
      status: "coming-soon",
    },
  ]

  const communityLinks = [
    {
      title: "GitHub Repository",
      description: "Explore our open-source codebase, contribute to development, and report issues.",
      icon: Github,
      href: "https://github.com/tawf-labs",
      color: "text-white hover:text-[#FFC700]",
    },
    {
      title: "Join Development",
      description: "Connect with our team and community of developers building the future of Islamic Web3.",
      icon: Users,
      href: "https://discord.gg/s7K59wE4qc",
      color: "text-white hover:text-[#FFC700]",
    },
    {
      title: "Provide Feedback",
      description: "Share your thoughts, report bugs, and request features to help improve TAWF.",
      icon: MessageCircle,
      href: "/#feedback",
      color: "text-white hover:text-[#FFC700]",
    },
  ]

  return (
    <main className="relative min-h-screen">
      <Header />

      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-black -z-10" />

      <div className="relative z-10 bg-black/95">
        <section className="relative py-32 sm:py-36 md:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-12 sm:mb-16">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-[#FFC700] to-[#ebb800] bg-clip-text text-transparent">
                  Documentation
                </h1>
                <p className="font-sans text-lg sm:text-xl text-foreground/80 max-w-3xl leading-relaxed">
                  Building the future of Sharia-compliant Web3. Resources, guides, and tools for developers.
                </p>
              </div>

              {/* SDK Status Hero Card */}
              <Card className="border-border/60 bg-gradient-to-br from-[#FFC700]/10 to-[#ebb800]/5 backdrop-blur mb-12">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FFC700] to-[#ebb800] flex items-center justify-center">
                        <Code2 className="w-8 h-8 text-black" />
                      </div>
                      <div>
                        <CardTitle className="font-display text-2xl sm:text-3xl text-foreground">
                          TAWF-SDK
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            <Zap className="w-3 h-3 mr-1" />
                            In Development
                          </span>
                          <span className="text-sm text-foreground/60">Coming Soon</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-6">
                  <p className="font-sans text-base text-foreground/80 leading-relaxed">
                    We're building a comprehensive SDK for developers to integrate Sharia-compliant Web3 features into their applications. The TAWF-SDK will provide tools, libraries, and documentation to build Islamic finance dApps with confidence.
                  </p>

                  {/* SDK Features List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {sdkFeatures.map((feature) => (
                      <div key={feature.title} className="flex items-start gap-3 p-4 rounded-lg bg-black/30 border border-white/5">
                        <div className="w-8 h-8 rounded-lg bg-[#FFC700]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Zap className="w-4 h-4 text-[#FFC700]" />
                        </div>
                        <div>
                          <h4 className="font-display text-sm font-semibold text-foreground mb-1">
                            {feature.title}
                          </h4>
                          <p className="font-sans text-xs text-foreground/60">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Documentation Sections Grid */}
              <div className="mb-8">
                <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-6">
                  Documentation Sections
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {docSections.map((section) => {
                    const Icon = section.icon
                    return (
                      <Card
                        key={section.title}
                        className="border-border/60 bg-black/30 backdrop-blur hover:bg-black/40 transition-colors duration-300"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFC700]/20 to-[#ebb800]/10 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-[#FFC700]" />
                            </div>
                            {section.status === "coming-soon" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-foreground/60 border border-white/10">
                                Coming Soon
                              </span>
                            )}
                          </div>
                          <CardTitle className="font-display text-xl text-foreground mt-4">
                            {section.title}
                          </CardTitle>
                          <CardDescription className="font-sans text-sm text-foreground/60">
                            {section.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Community & Contribution Section */}
              <div className="mt-16 sm:mt-20">
                <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-6 text-center">
                  Join Our Development
                </h2>
                <p className="font-sans text-base sm:text-lg text-foreground/70 mb-8 max-w-2xl mx-auto text-center">
                  Be part of building the future of Sharia-compliant Web3. Contribute, ask questions, and connect with our community.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {communityLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <Link
                        key={link.title}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="group"
                      >
                        <Card className="border-border/60 bg-black/30 backdrop-blur hover:bg-black/40 transition-colors duration-300 h-full">
                          <CardContent className="flex flex-col items-center text-center p-6">
                            <div className={`w-14 h-14 rounded-full bg-white/5 group-hover:bg-[#FFC700]/10 flex items-center justify-center mb-4 transition-colors duration-200`}>
                              <Icon className={`w-7 h-7 ${link.color} transition-colors duration-200`} />
                            </div>
                            <h3 className="font-display text-base font-semibold text-foreground mb-2">
                              {link.title}
                            </h3>
                            <p className="font-sans text-sm text-foreground/60">
                              {link.description}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-20 text-center">
                <p className="font-sans text-sm text-foreground/50 mb-4">
                  Documentation is actively being developed. Check back often for updates.
                </p>
                <Link
                  href="https://github.com/tawf-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFC700] to-[#ebb800] text-black font-sans font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200"
                >
                  <Github className="w-5 h-5" />
                  Follow on GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
