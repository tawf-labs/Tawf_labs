"use client"

export function GovernanceSection() {
  return (
    <section id="governance" className="relative py-16 sm:py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8 bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
            Sharia Governance with ZK
          </h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <p className="md:col-span-2 font-sans text-base sm:text-lg text-foreground/80 leading-relaxed text-soft-glow">
              We design governance primitives that preserve individual privacy while guaranteeing collective integrity.
              With zero-knowledge attestations, participants can prove eligibility, compliance, and voting rights without
              revealing sensitive data—delivering transparent and Sharia-aligned decision-making.
            </p>
            <ul className="list-disc pl-5 text-sm sm:text-base text-foreground/80 space-y-2 text-soft-glow">
              <li>Privacy-preserving eligibility proofs</li>
              <li>Transparent tallying and audit trails</li>
              <li>Community-first, Sharia-by-design</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
