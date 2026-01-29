"use client";

import { LandPlot, Users, Shield, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export function GovernanceSection() {
  return (
    <section id="governance" className="relative py-16 sm:py-20 md:py-28">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-12">
            <h2 className="bg-clip-text bg-gradient-to-r from-[#FFC700] to-[#ffe38a] font-display text-transparent text-3xl sm:text-4xl md:text-5xl">
              Dual-Layer Governance
            </h2>
            <LandPlot className="-mt-6 w-12 h-12 text-foreground/80" />
          </div>

          <p className="text-foreground/70 text-lg mb-12 max-w-4xl">
            TAWF operates a dual-layer DAO system that balances open community participation with Sharia integrity through transparent community governance and private ZK-enabled oversight.
          </p>

          {/* Bento Box Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Community DAO Card */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Community DAO</h3>
                  <p className="text-sm text-foreground/60">Transparent & Decentralized</p>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70 text-sm">Fully transparent on-chain governance with open proposal viewing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70 text-sm">Open DID-based voting using TAWF DID credentials for all community members</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70 text-sm">Community-driven decision making for ecosystem upgrades and treasury management</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-foreground/50">
                  Empowering the community with transparent governance while ensuring Sharia compliance through oversight
                </p>
              </div>
            </div>

            {/* ZK Sharia Council Card */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">ZK Sharia Council</h3>
                  <p className="text-sm text-foreground/60">Private & Verifiable</p>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <EyeOff className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70 text-sm">Zero-knowledge proofs ensure privacy while maintaining verifiability</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70 text-sm">Independent Sharia scholars with TAWF DID credentials review proposals and outcomes for compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70 text-sm">Veto power on non-compliant decisions while protecting scholar identities</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-foreground/50">
                  Ensuring Sharia alignment without compromising on privacy or security for Islamic scholars
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Summary */}
          <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10">
            <p className="text-center text-sm text-foreground/70">
              <span className="font-semibold text-foreground">DID-Based Governance:</span> Both the Community DAO and ZK Sharia Council use TAWF DID (NFT credentials) for voting rights—no tokens required. This dual-layer system ensures decisions remain community-driven while applications, upgrades, and standards can be verifiably Sharia-aligned.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
