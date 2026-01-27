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
    <div className="relative">
      <Header />
      <main id="main-content">
        <Hero />
        <div className="relative z-10">
          {/* Subtle, consistent dark gradients with a light amber tint for depth */}
          <section aria-labelledby="about-heading">
            <span id="about-heading" className="sr-only">About Tawf</span>
            <div className="bg-black/95">
              <AboutSection />
            </div>
          </section>
          <section aria-labelledby="ecosystem-heading">
            <span id="ecosystem-heading" className="sr-only">Ecosystem</span>
            <div className="bg-black/95">
              <EcosystemSection />
            </div>
          </section>
          <section aria-labelledby="dapps-heading">
            <span id="dapps-heading" className="sr-only">Decentralized Applications</span>
            <div className="bg-black/95">
              <DappsSection />
            </div>
          </section>
          <section aria-labelledby="governance-heading">
            <span id="governance-heading" className="sr-only">Governance</span>
            <div className="bg-black/95">
              <GovernanceSection />
            </div>
          </section>
          <section aria-labelledby="contact-heading">
            <span id="contact-heading" className="sr-only">Contact</span>
            <div className="bg-black/95">
              <ContactSection />
            </div>
          </section>
        </div>
      </main>
      <Leva hidden />
      <Footer />
    </div>
  )
}