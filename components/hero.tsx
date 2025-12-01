"use client"

import Link from "next/link"
import { GL } from "./gl"
import { Pill } from "./pill"
import { Button } from "./ui/button"
import { useState } from "react"

export function Hero() {
  const [hovering, setHovering] = useState(false)
  return (
    <div className="flex flex-col h-svh justify-center items-center px-4">
      <GL hovering={hovering} />

      <div className="text-center relative z-10 w-full max-w-4xl mx-auto">
        {/* <Pill className="mb-6">TAWF LABS</Pill> */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-balance leading-tight bg-gradient-to-r from-white to-[#ffe38a] bg-clip-text text-transparent drop-shadow-2xl">
          Empowering the Ummah <br />
          <i className="font-semibold">in Web3</i>
        </h1>
        {/* <p className="font-sans text-sm sm:text-base text-white text-balance leading-relaxed mt-6 sm:mt-8 max-w-[640px] mx-auto drop-shadow-lg bg-black/20 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 sm:py-4 border border-white/10"> */}
          {/* We build halal-first zk dapps: blockchain-based zakat at zkt.app, Tawf Sharia governance using zero-knowledge
          proofs, and blockchain-based qurbani at qrbn.app. */}
        {/* </p> */}
        {/* <p className="text-sm sm:text-base text-white mt-6 sm:mt-8 max-w-[640px] mx-auto">Sharia-first zk dapps: zakat (zkt.app), Sharia governance, and qurbani (qrbn.app).</p> */}
        <p className="text-sm sm:text-base text-white mt-6 sm:mt-8 max-w-[640px] mx-auto">Sharia-led Layer 3 ecosystem of dApps. Governed by community</p>



        <div className="mt-8 sm:mt-14">
          <Link className="max-sm:hidden" href="/#dapps">
            <Button onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
              [Explore Dapps]
            </Button>
          </Link>
          <Link className="sm:hidden" href="/#dapps">
            <Button
              size="sm"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [Explore Dapps]
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
