"use client";

import { Layers } from "lucide-react";

// 3D Crystal Illustration for Community DAO
function Crystal3D() {
  return (
    <div className="crystal-glow">
      <div className="crystal-3d">
        {/* Back layers for depth */}
        <div className="crystal-layer crystal-layer-3" />
        <div className="crystal-layer crystal-layer-2" />
        {/* Main crystal layer */}
        <div className="crystal-layer crystal-layer-1" />
        {/* Glass highlight */}
        <div className="crystal-highlight" />
        {/* Glowing base */}
        <div className="crystal-base" />
      </div>
    </div>
  );
}

// 3D Scales Illustration for ZK Sharia Council
function Scales3D() {
  return (
    <div className="scales-glow">
      <div className="scales-3d">
        {/* Vertical stand */}
        <div className="scales-stand" />
        {/* Base platform */}
        <div className="scales-base" />
        {/* Center pivot jewel */}
        <div className="scales-jewel" />
        {/* Swaying beam assembly */}
        <div className="scales-beam-assembly">
          {/* Horizontal beam */}
          <div className="scales-beam" />
          {/* Left side: chains + pan */}
          <div className="scales-left">
            <div className="scales-chain scales-chain-1" />
            <div className="scales-chain scales-chain-2" />
            <div className="scales-pan" />
          </div>
          {/* Right side: chains + pan */}
          <div className="scales-right">
            <div className="scales-chain scales-chain-1" />
            <div className="scales-chain scales-chain-2" />
            <div className="scales-pan" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function GovernanceSection() {
  return (
    <section id="governance" className="relative py-16 sm:py-20 md:py-28">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-12">
            <h2 className="bg-clip-text bg-gradient-to-r from-[#FFC700] to-[#ffe38a] font-display text-transparent text-3xl sm:text-4xl md:text-5xl">
              Dual-Layer Governance
            </h2>
            <Layers className="w-12 h-12 text-foreground/80 icon-float" />
          </div>

          <p className="text-foreground/70 text-lg mb-12 max-w-4xl">
            TAWF operates a dual-layer DAO system that balances open community participation with Sharia integrity through transparent community governance and private ZK-enabled oversight.
          </p>

          {/* Bento Box Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Community DAO Card */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 p-8 transition-all duration-300">
              <div className="flex items-center gap-5 mb-6">
                <Crystal3D />
                <div className="flex-1 pt-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Community DAO</h3>
                  <p className="text-sm text-foreground/60">Transparent & Decentralized</p>
                </div>
              </div>

              <ul className="space-y-4 list-minimal list-minimal-emerald">
                <li>Fully transparent on-chain governance with open proposal viewing</li>
                <li>Open DID-based voting using TAWF DID credentials for all community members</li>
                <li>Community-driven decision making for ecosystem upgrades and treasury management</li>
              </ul>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-foreground/50">
                  Empowering the community with transparent governance while ensuring Sharia compliance through oversight
                </p>
              </div>
            </div>

            {/* ZK Sharia Council Card */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 p-8 transition-all duration-300">
              <div className="flex items-center gap-5 mb-6">
                <Scales3D />
                <div className="flex-1 pt-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">ZK Sharia Council</h3>
                  <p className="text-sm text-foreground/60">Private & Verifiable</p>
                </div>
              </div>

              <ul className="space-y-4 list-minimal list-minimal-gold">
                <li>Zero-knowledge proofs ensure privacy while maintaining verifiability</li>
                <li>Independent Sharia scholars with TAWF DID credentials review proposals and outcomes for compliance</li>
                <li>Veto power on non-compliant decisions while protecting scholar identities</li>
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
              <span className="font-semibold text-foreground">DID-Based Governance:</span> Both the Community DAO and ZK Sharia Council use TAWF DID (NFT credentials) for voting rights, no tokens required. This dual-layer system ensures decisions remain community-driven while applications, upgrades, and standards can be verifiably Sharia-aligned.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
