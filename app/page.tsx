"use client"

import { Hero } from "@/components/hero"
import { Leva } from "leva"
import { AboutSection } from "@/components/sections/about"
import { DappsSection } from "@/components/sections/dapps"
import { GovernanceSection } from "@/components/sections/governance"
import { ContactSection } from "@/components/sections/contact"
import { EcosystemSection } from "@/components/sections/ecosystem"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <div className="relative z-10">
        {/* Subtle, consistent dark gradients with a light amber tint for depth */}
        <div className="bg-black/95">
          <AboutSection />
        </div>
        <div className="bg-black/95">
          <EcosystemSection />
        </div>
        <div className="bg-black/95">
          <DappsSection />
        </div>
        <div className="bg-black/95">
          <GovernanceSection />
        </div>
        <div className="bg-black/95">
          <ContactSection />
        </div>
      </div>
      <Leva hidden />
      <Footer />
    </main>
  )
}