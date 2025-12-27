"use client";

import { LandPlot } from "lucide-react";

export function GovernanceSection() {
  return (
    <section id="governance" className="relative py-16 sm:py-20 md:py-28">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <h2 className="bg-clip-text bg-gradient-to-r from-[#FFC700] to-[#ffe38a] mb-6 sm:mb-8 font-display text-transparent text-3xl sm:text-4xl md:text-5xl">
              Sharia Governance with ZK
            </h2>

            <LandPlot className="-mt-8 w-12 h-12 text-foreground/80" />
          </div>

          <div className="gap-6 lg:gap-8 grid md:grid-cols-3">
            <p className="md:col-span-2 font-sans text-foreground/80 text-soft-glow text-base sm:text-lg leading-relaxed">
              We design governance primitives that preserve individual privacy
              while guaranteeing collective integrity. With zero-knowledge
              attestations, participants can prove eligibility, compliance, and
              voting rights without revealing sensitive data—delivering
              transparent and Sharia-aligned decision-making.
            </p>
            <ul className="space-y-2 pl-5 text-foreground/80 text-soft-glow text-sm sm:text-base list-disc">
              <li>Privacy-preserving eligibility proofs</li>
              <li>Transparent tallying and audit trails</li>
              <li>Community-first, Sharia-by-design</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
