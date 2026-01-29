"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Scale, Shield, Users, FileText, Globe, Heart, GraduationCap, Building } from "lucide-react"
import Link from "next/link"

const values = [
  {
    icon: Scale,
    title: "Sharia Compliance First",
    description: "All systems and applications are developed under the guidance of Islamic scholars, ensuring alignment with Sharia principles in every smart contract and transaction.",
  },
  {
    icon: Shield,
    title: "Transparency & Trust",
    description: "On-chain verification of all fund flows, zakat calculations, and qurbani fulfillment. Public audibility ensures the Ummah can verify operations at any time.",
  },
  {
    icon: Heart,
    title: "Serving the Ummah",
    description: "Our mission is to provide infrastructure that enables Muslims to fulfill Islamic obligations with confidence, privacy, and ease in the digital age.",
  },
  {
    icon: Users,
    title: "Community Governance",
    description: "Dual-layer governance combining scholar oversight for Sharia compliance and community participation for operational decisions.",
  },
]

const governance = [
  {
    title: "Sharia Council",
    description: "Islamic scholars who provide guidance on Sharia compliance, review systems, and certify that applications align with Islamic principles.",
    icon: GraduationCap,
  },
  {
    title: "Community DAO",
    description: "Token holders govern operational aspects including treasury management, partnership approvals, and ecosystem development decisions.",
    icon: Users,
  },
  {
    title: "Technical Governance",
    description: "Core contributors and developers maintain the codebase, implement upgrades, and ensure security of the infrastructure.",
    icon: Shield,
  },
]

const legal = [
  {
    category: "Legal Structure",
    items: [
      { label: "Entity Type", value: "Foundation" },
      { label: "Jurisdiction", value: "To Be Announced" },
      { label: "Governance", value: "DAO + Sharia Council" },
    ],
  },
  {
    category: "Compliance",
    items: [
      { label: "Sharia Oversight", value: "Council of Scholars" },
      { label: "Smart Contract Audits", value: "Third-Party Verified" },
      { label: "Financial Reporting", value: "On-Chain Transparency" },
    ],
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

export default function FoundationPage() {
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
                  <Building className="w-6 h-6 text-[#FFC700]" />
                </div>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
                Foundation & Governance
              </h1>
              <p className="font-sans text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Building trust through transparency, Sharia compliance, and community governance. The institutional foundation supporting Tawf's ecosystem.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center p-12 bg-gradient-to-br from-[#FFC700]/10 to-transparent border border-[#FFC700]/20 rounded-3xl"
            >
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                Our Mission
              </h2>
              <p className="font-sans text-lg text-foreground/80 leading-relaxed">
                Tawf Foundation exists to serve the Ummah by providing trustworthy, Sharia-compliant infrastructure for Islamic obligations on-chain. We bridge traditional Islamic scholarship with modern blockchain technology, enabling Muslims to fulfill zakat, qurbani, and other duties with confidence in the digital age.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
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
                Core Principles
              </h2>
              <p className="font-sans text-foreground/60 max-w-2xl mx-auto">
                The values that guide everything we build.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              {values.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex flex-col items-center text-center p-6"
                  >
                    <div className="mb-4 flex items-center justify-center w-16 h-16 bg-[#FFC700]/10 rounded-2xl">
                      <IconComponent className="w-8 h-8 text-[#FFC700]" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Governance Structure */}
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
                <Scale className="w-8 h-8 text-[#FFC700]" />
                <h2 className="font-display text-3xl md:text-4xl text-foreground">
                  Governance Structure
                </h2>
              </div>
              <p className="font-sans text-foreground/60 mb-12 max-w-2xl">
                Tawf employs a dual-layer governance system ensuring both Sharia compliance and community-driven development.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {governance.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-black/40 backdrop-blur border border-border/60 rounded-2xl p-6"
                    >
                      <div className="mb-4 flex items-center justify-center w-14 h-14 bg-[#FFC700]/10 rounded-xl">
                        <IconComponent className="w-7 h-7 text-[#FFC700]" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3 text-center">
                        {item.title}
                      </h3>
                      <p className="font-sans text-sm text-foreground/60 leading-relaxed text-center">
                        {item.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Legal & Compliance */}
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
                  Legal & Compliance
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {legal.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-black/40 backdrop-blur border border-border/60 rounded-2xl p-6"
                  >
                    <h3 className="font-display text-lg font-semibold text-[#FFC700] mb-4">
                      {section.category}
                    </h3>
                    <div className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center">
                          <span className="font-sans text-sm text-foreground/70">{item.label}</span>
                          <span className="font-mono text-sm text-foreground/90">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Transparency CTA */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center p-12 bg-gradient-to-br from-[#FFC700]/10 to-transparent border border-[#FFC700]/20 rounded-3xl"
            >
              <Globe className="w-12 h-12 text-[#FFC700] mx-auto mb-6" />
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                Transparency Portal
              </h2>
              <p className="font-sans text-foreground/70 mb-8 max-w-2xl mx-auto">
                All operations, treasury movements, and governance decisions are recorded on-chain. Verify our transparency at any time.
              </p>
              <Link
                href="/transparency"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFC700] to-[#ebb800] text-black font-sans font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200"
              >
                View Transparency
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
