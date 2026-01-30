"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookOpen, Shield, FileText, Users, Code2, Globe, Scale, Sparkles, Download, ExternalLink, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const researchAreas = [
  {
    icon: Shield,
    title: "Zero-Knowledge Sharia Verification",
    description: "Developing zk-SNARK verification systems for confirming Sharia compliance without exposing sensitive financial data. Privacy-preserving zakat calculations and qurbani fulfillment verification.",
  },
  {
    icon: Scale,
    title: "Islamic Finance on Blockchain",
    description: "Research on applying blockchain technology to Islamic financial instruments. Waqf endowment management, sukuk tokenization, and Sharia-compliant smart contract patterns.",
  },
  {
    icon: BookOpen,
    title: "Sharia Governance Frameworks",
    description: "Novel governance structures combining Islamic principles with decentralized decision-making. Dual-layer DAO architecture with scholar oversight and community participation.",
  },
  {
    icon: Code2,
    title: "Privacy-Preserving Technology",
    description: "Advancing zero-knowledge proof systems tailored for Islamic use cases. Efficient verification circuits for zakat eligibility, nisab calculation, and distribution tracking.",
  },
  {
    icon: Users,
    title: "Scholar-Developer Collaboration",
    description: "Bridging traditional Islamic scholarship with modern blockchain development. Research methodologies for translating fiqh rulings into verifiable on-chain logic.",
  },
  {
    icon: Globe,
    title: "Cross-Chain Islamic Infrastructure",
    description: "Multi-chain infrastructure enabling Sharia-compliant applications across EVM and non-EVM networks. Interoperability standards for Islamic dApps and cross-chain zakat distribution.",
  },
]

const publications = [
  {
    title: "Zero-Knowledge Proofs for Private Zakat Calculation",
    category: "Cryptography",
    status: "In Review",
    year: "2025",
  },
  {
    title: "A Framework for Sharia-Compliant DAO Governance",
    category: "Governance",
    status: "Published",
    year: "2024",
  },
  {
    title: "Qurbani on Chain: Verification of Islamic Sacrifice Obligations",
    category: "Applications",
    status: "In Progress",
    year: "2025",
  },
  {
    title: "Privacy-Preserving Waqf Management via zk-SNARKs",
    category: "Islamic Finance",
    status: "In Progress",
    year: "2025",
  },
]

const whitepapers = [
  {
    id: "tawf-protocol",
    title: "Tawf Protocol Whitepaper",
    description: "A comprehensive overview of the Tawf Protocol, detailing our Sharia-first approach to zero-knowledge decentralized applications, governance framework, and technical architecture.",
    category: "Protocol",
    year: "2025",
    pages: 42,
    file: "/research/Tawf Protocol White Paper.pdf",
    icon: FileText,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function ResearchPage() {
  const [selectedWhitepaper, setSelectedWhitepaper] = useState<typeof whitepapers[0] | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const openViewer = (paper: typeof whitepapers[0]) => {
    setSelectedWhitepaper(paper)
    setIsViewerOpen(true)
  }

  return (
    <main className="relative min-h-screen">
      <Header />

      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-black -z-10" />

      <div className="relative z-10 bg-black/95">
        {/* Hero Section */}
        <section className="relative py-32 sm:py-36 md:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFC700]/20 to-[#ebb800]/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#FFC700]" />
                </div>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
                Research
              </h1>
              <p className="font-sans text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Advancing the frontiers of Sharia-compliant Web3 through cryptography, Islamic finance research, and novel governance frameworks.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                Research Areas
              </h2>
              <p className="font-sans text-foreground/60 max-w-2xl mx-auto">
                Exploring the intersection of Islamic jurisprudence, cryptography, and decentralized systems.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {researchAreas.map((area, index) => {
                const IconComponent = area.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="flex flex-col bg-black/40 backdrop-blur border border-border/60 rounded-2xl p-6"
                  >
                    <div className="mb-4 flex items-center justify-center w-14 h-14 bg-[#FFC700]/10 rounded-xl">
                      <IconComponent className="w-7 h-7 text-[#FFC700]" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                      {area.title}
                    </h3>
                    <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                      {area.description}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Whitepapers */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-[#FFC700]" />
                <h2 className="font-display text-3xl md:text-4xl text-foreground">
                  Whitepapers
                </h2>
              </div>
              <p className="font-sans text-foreground/60 mb-12 max-w-2xl">
                Comprehensive protocol documentation and technical specifications for the Tawf ecosystem.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {whitepapers.map((paper, index) => {
                  const IconComponent = paper.icon
                  return (
                    <motion.div
                      key={paper.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group flex flex-col bg-black/40 backdrop-blur border border-border/60 rounded-2xl p-6 hover:border-[#FFC700]/30 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center justify-center w-14 h-14 bg-[#FFC700]/10 rounded-xl group-hover:bg-[#FFC700]/20 transition-colors">
                          <IconComponent className="w-7 h-7 text-[#FFC700]" />
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FFC700]/20 text-[#FFC700]">
                          {paper.category}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                        {paper.title}
                      </h3>
                      <p className="font-sans text-sm text-foreground/60 leading-relaxed mb-4 flex-1">
                        {paper.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-border/40">
                        <div className="flex items-center gap-3 text-sm text-foreground/60">
                          <span>{paper.pages} pages</span>
                          <span className="text-foreground/40">•</span>
                          <span>{paper.year}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openViewer(paper)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFC700]/10 hover:bg-[#FFC700]/20 text-[#FFC700] font-sans text-sm font-medium rounded-lg transition-colors duration-200"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View
                          </button>
                          <a
                            href={paper.file}
                            download
                            className="inline-flex items-center justify-center w-9 h-9 bg-white/5 hover:bg-white/10 text-foreground rounded-lg transition-colors duration-200"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Publications */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-[#FFC700]" />
                <h2 className="font-display text-3xl md:text-4xl text-foreground">
                  Publications & Papers
                </h2>
              </div>
              <p className="font-sans text-foreground/60 mb-12 max-w-2xl">
                Our research contributions to the field of Islamic Web3, cryptography, and decentralized governance.
              </p>

              <div className="space-y-4">
                {publications.map((pub, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center justify-between p-6 bg-black/40 backdrop-blur border border-border/60 rounded-xl hover:border-[#FFC700]/30 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                        {pub.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-[#FFC700]/80">{pub.category}</span>
                        <span className="text-foreground/40">•</span>
                        <span className="text-foreground/60">{pub.year}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        pub.status === "Published"
                          ? "bg-green-500/20 text-green-400"
                          : pub.status === "In Review"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}>
                        {pub.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Collaboration CTA */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center p-12 bg-gradient-to-br from-[#FFC700]/10 to-transparent border border-[#FFC700]/20 rounded-3xl"
            >
              <Users className="w-12 h-12 text-[#FFC700] mx-auto mb-6" />
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                Collaborate With Us
              </h2>
              <p className="font-sans text-foreground/70 mb-8 max-w-2xl mx-auto">
                We welcome collaborations with Islamic scholars, cryptographers, and institutions. Join us in building the foundational research for Sharia-compliant Web3.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://github.com/tawf-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFC700] to-[#ebb800] text-black font-sans font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200"
                >
                  <Code2 className="w-5 h-5" />
                  GitHub Research
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-foreground font-sans font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  Contact Researchers
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {isViewerOpen && selectedWhitepaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsViewerOpen(false)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-full max-w-6xl h-[85vh] bg-black border border-border/60 rounded-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-black/50">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#FFC700]" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {selectedWhitepaper.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={selectedWhitepaper.file}
                    download
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFC700]/10 hover:bg-[#FFC700]/20 text-[#FFC700] font-sans text-sm font-medium rounded-lg transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  <button
                    onClick={() => setIsViewerOpen(false)}
                    className="inline-flex items-center justify-center w-9 h-9 bg-white/5 hover:bg-white/10 text-foreground rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* PDF iframe */}
              <div className="flex-1 w-full overflow-hidden">
                <iframe
                  src={`${selectedWhitepaper.file}#view=FitH`}
                  className="w-full h-full border-0"
                  title={selectedWhitepaper.title}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
