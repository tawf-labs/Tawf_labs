"use client";

import { LandPlot } from "lucide-react";

export function GovernanceSection() {
  return (
    <section id="governance" className="relative py-16 sm:py-20 md:py-28">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <h2 className="bg-clip-text bg-gradient-to-r from-[#FFC700] to-[#ffe38a] mb-6 sm:mb-8 font-display text-transparent text-3xl sm:text-4xl md:text-5xl">
              Dual-Layer Governance with ZK Sharia
            </h2>

            <LandPlot className="-mt-8 w-12 h-12 text-foreground/80" />
          </div>

          <div className="gap-6 lg:gap-8 grid md:grid-cols-3">
            <p className="md:col-span-2 font-sans text-foreground/80 text-soft-glow text-base sm:text-lg leading-relaxed">
             Tawf operates a dual-layer DAO system that balances open community participation with Sharia integrity. The Community DAO which operates transparently to allow open community participation and decision-making, while a parallel ZK-enabled Sharia Oversight DAO independently reviews outcomes for Sharia alignment. This separation ensures decisions remain community-driven while applications, upgrades, and standards can be verifiably Sharia-aligned.
            </p>
            <ul className="space-y-2 pl-5 text-foreground/80 text-soft-glow text-sm sm:text-base list-disc">
              <li>Transparent Community DAO for community involvement</li>
              <li>Private ZK Stewardship Layer for scholars and ulamas</li>
              <li>Balanced approach ensuring Sharia alignment and privacy</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
