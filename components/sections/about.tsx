"use client";

import { ShieldMinus } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="relative py-16 sm:py-20 md:py-28">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-end gap-2 mb-12">
            <h2 className="bg-clip-text bg-gradient-to-r from-[#FFC700] to-[#ffe38a] mb-6 font-display text-transparent text-3xl sm:text-4xl md:text-5xl">
              Our Mission
            </h2>
            <ShieldMinus className="-mt-2 sm:-mt-4 md:-mt-6 mb-6 w-12 h-12 text-foreground/80" />
          </div>

          <p className="max-w-3xl font-sans text-foreground/80 text-soft-glow text-base sm:text-lg leading-relaxed">
            Tawf advances financial inclusion for the Ummah by delivering
            transparent, privacy-preserving Web3 applications. We apply
            zero-knowledge cryptography to uphold Sharia compliance while
            enabling global participation in digital giving and governance.
          </p>
        </div>
      </div>
    </section>
  );
}
