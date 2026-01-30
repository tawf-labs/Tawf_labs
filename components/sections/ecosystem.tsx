"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { Earth } from "lucide-react";

const partners = [
  {
    name: "Lisk",
    logo: "/logos/lisk.png",
    url: "https://lisk.com",
  },
   {
    name: "Base",
    logo: "/logos/base.png",
    url: "https://base.org",
    invert: true,
  },
  {
    name: "Ethereum",
    logo: "/logos/ethereum.png",
    url: "https://ethereum.org",
    invert: true,
  },
   {
    name: "Blockdev",
    logo: "/logos/blockdev.png",
    url: "https://blockdev.id/",
    invert: true,
  },
];

const ITEMS_PER_VIEW = 4;

export function EcosystemSection() {
  const controls = useAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const totalGroups = Math.ceil(partners.length / ITEMS_PER_VIEW);

  // Animation variants for the carousel items
  const variants = {
    hidden: (custom: number) => ({
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
        delay: custom * 0.1,
      },
    }),
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.1,
      },
    }),
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, isInView]);

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start("hidden").then(() => {
        setCurrentIndex((prev) => (prev + 1) % totalGroups);
        // Small delay to allow the state to update before starting the next animation
        setTimeout(() => controls.start("visible"), 50);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [controls, totalGroups]);

  // Create infinite loop array with unique keys
  const extendedPartners = [...partners, ...partners];
  const startIndex = currentIndex * ITEMS_PER_VIEW;
  const visiblePartners = extendedPartners.slice(
    startIndex,
    startIndex + ITEMS_PER_VIEW
  );

  return (
    <section
      id="ecosystem"
      className="relative py-16 sm:py-20 md:py-28 w-full overflow-hidden"
    >
      <div className="-z-10 absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background/30 via-background/80 to-background" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]" />
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[100vw] container">
        <div className="mx-auto mb-12 px-4 max-w-4xl text-center">
          <div className="flex justify-center items-center gap-3">
            <h2 className="bg-clip-text bg-gradient-to-r from-[#FFC700] to-[#ffe38a] mb-6 font-display text-transparent text-3xl sm:text-4xl md:text-5xl">
              Infrastructure & Partnerships
            </h2>
            <Earth className="-mt-2 sm:-mt-4 md:-mt-6 w-12 h-12 text-foreground/80 icon-float" />
          </div>

          <div className="inline-block bg-background/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="mx-auto max-w-3xl font-sans text-foreground/80 text-soft-glow text-base sm:text-lg leading-relaxed">
              TAWF provides chain-agnostic infrastructure, integrating leading EVM and non-EVM blockchain networks to support Sharia dApps across Web3.
            </p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="left-0 z-10 absolute inset-y-0 bg-transparent w-16 md:w-24 pointer-events-none" />
          <div className="right-0 z-10 absolute inset-y-0 bg-transparent w-16 md:w-24 pointer-events-none" />

          <div
            ref={ref}
            className="flex justify-center items-center gap-4 md:gap-8 lg:gap-12 py-4 w-full"
            style={{
              width: "fit-content",
              margin: "0 auto",
              overflowX: "hidden",
              overflowY: "hidden",
              // overflowY: "visible",
              maxWidth: "100%",
              // maxHeight: "120%",
            }}
          >
            {visiblePartners.map((partner, index) => (
              <motion.div
                key={`${partner.name}-${index}-${currentIndex}`}
                className="flex-shrink-0 mx-1"
                custom={index}
                initial="hidden"
                animate={controls}
                variants={variants}
              >
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex justify-center items-center bg-background/50 hover:shadow-[0_0_30px_rgba(255,199,0,0.2)] backdrop-blur-sm p-3 md:p-4 border hover:border-[#FFC700]/50 border-border/20 rounded-2xl w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC700]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={`Visit ${partner.name} website`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="p-1 object-center object-contain"
                      style={partner.invert ? { filter: "brightness(0) invert(1)" } : undefined}
                      sizes="(max-width: 640px) 80px, 100px"
                    />
                  </div>
                  <span className="-bottom-7 absolute opacity-0 group-hover:opacity-100 text-foreground/70 text-xs sm:text-sm whitespace-nowrap transition-opacity duration-200" aria-hidden="true">
                    {partner.name}
                  </span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8 sm:mt-12" role="tablist" aria-label="Partner groups">
          {Array.from({ length: totalGroups }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC700]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background${
                currentIndex === i
                  ? "bg-[#FFC700] w-8"
                  : "bg-foreground/20 w-3 hover:bg-foreground/40"
              }`}
              aria-label={`Show partner group ${i + 1}`}
              aria-selected={currentIndex === i}
              role="tab"
              tabIndex={currentIndex === i ? 0 : -1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
