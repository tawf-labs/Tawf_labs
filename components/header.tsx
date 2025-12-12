"use client"

import Link from "next/link"
import { Logo } from "./logo"
import { MobileMenu } from "./mobile-menu"
import { useEffect, useState } from "react"

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    // run once to set initial state (useful if page is loaded scrolled)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed z-50 top-0 left-0 w-full">
      {/* Blur background - now taller and behind everything */}
      {scrolled && (
        <div className="absolute top-0 left-0 w-full h-28 backdrop-blur-sm bg-white/30 dark:bg-black/30 border-b border-white/5 pointer-events-none" />
      )}

      <div className="relative pt-8 md:pt-14 transition-colors duration-200 ease-out">
        <header className="flex items-center justify-between container">
          {/* <Link href="/">
            <Logo className="w-[100px] md:w-[120px]" />
          </Link> */}
          <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
            {["About", "Dapps", "Governance", "Team", "Contact"].map((item) => (
              <Link
                className="uppercase inline-block font-sans font-medium text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
                href={item === "Team" ? "/team" : `/#${item.toLowerCase()}`}
                key={item}
              >
                {item}
              </Link>
            ))}
          </nav>
          {/* <Link
            className="uppercase max-lg:hidden transition-colors ease-out duration-150 font-sans font-medium text-primary hover:text-primary/80"
            href="/#contact"
          >
            Contact
          </Link> */}
          <MobileMenu />
        </header>
      </div>
    </div>
  )
}