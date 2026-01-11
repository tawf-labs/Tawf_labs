"use client"

import Link from "next/link"
import { MobileMenu } from "./mobile-menu"
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navItems = [
    {
      label: "Discover",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "About Us", href: "/#about" },
        { label: "Ecosystem", href: "/#ecosystem" },
        { label: "DApps", href: "/#dapps" },
        { label: "Governance", href: "/governance" },
        { label: "Team", href: "/team" },
        { label: "Transparency", href: "/transparency" },
      ],
    },
    {
      label: "Governance",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Overview", href: "/#governance" },
        { label: "Portal", href: "/governance" },
        { label: "Sharia Council", href: "/governance/sharia" },
        { label: "Treasury", href: "/governance/treasury" },
      ],
    },
    {
      label: "Business",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Enterprise", href: "/#enterprise" },
        { label: "Partners", href: "/#partners" },
        { label: "Grant Program", href: "/#grants" },
      ],
    },
    {
      label: "Builders",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Documentation", href: "/docs" },
        { label: "GitHub", href: "https://github.com/tawf" },
        { label: "Bugs & Feature Requests", href: "/#feedback" },
      ],
    },
    {
      label: "Community",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Blog", href: "/blog" },
        { label: "Forum", href: "/forum" },
        { label: "Events", href: "/events" },
      ],
    },
  ]

  return (
    <div className="fixed z-50 top-0 left-0 w-full">
      {scrolled && (
        <div className="absolute top-0 left-0 w-full h-20 backdrop-blur-md bg-black/80 border-b border-white/10 pointer-events-none" />
      )}

      <div className="relative pt-0 md:pt-0 transition-colors duration-200 ease-out">
        <header className="flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left: Logo */}
          <Link href="/" className="flex-shrink-0">
                <img src="/logos/tawflogo.png" alt="Tawf Logo" className="w-[80px] md:w-[100px] h-auto" />
          </Link>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-12">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 font-sans font-medium uppercase text-foreground/60 hover:text-foreground duration-150 transition-colors ease-out"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-56 rounded-lg bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                    <div className="py-2">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block px-4 py-2.5 font-sans font-medium text-foreground/70 hover:text-foreground hover:bg-white/5 duration-150 transition-colors ease-out"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right: Dashboard Button and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden lg:inline-flex items-center justify-center px-4 py-1.5 inline-block font-sans font-medium uppercase text-black bg-white rounded-full hover:bg-white/90 duration-150 transition-colors ease-out"
            >
              Dashboard
            </Link>
            <MobileMenu />
          </div>
        </header>
      </div>
    </div>
  )
}