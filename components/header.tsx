"use client"

import Link from "next/link"
import { MobileMenu } from "./mobile-menu"
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)
  const [activePath, setActivePath] = useState("/")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setActivePath(window.location.pathname)
  }, [])

  const handleMouseEnter = (label: string) => {
    // Clear any existing timeout when mouse enters
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    // Set a timeout to close the dropdown after 500ms
    const timeout = setTimeout(() => {
      setOpenDropdown(null)
    }, 500)
    setDropdownTimeout(timeout)
  }

  const navItems = [
  // ─────────────────────────────
  // Discover — What is Tawf?
  // ─────────────────────────────
  {
    label: "Discover",
    hasDropdown: true,
    dropdownItems: [
      { label: "About Tawf", href: "/#about" },
      { label: "Vision & Principles", href: "/#vision" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Foundation & Legal", href: "/foundation" },
      { label: "Transparency", href: "/transparency" },
      { label: "Team", href: "/team" },
    ],
  },

  // ─────────────────────────────
  // Ecosystem — What exists?
  // ─────────────────────────────
  {
    label: "Ecosystem",
    hasDropdown: true,
    dropdownItems: [
      { label: "DApps", href: "/#dapps" },
      { label: "Partners", href: "/#partners" },
      { label: "Networks & Integrations", href: "/#ecosystem" },
    ],
  },

  // ─────────────────────────────
  // Governance — Decision making
  // ─────────────────────────────
  {
    label: "Governance",
    hasDropdown: true,
    dropdownItems: [
      { label: "Overview", href: "/#governance" },
      { label: "Portal", href: "/governance" },
      // Future expansion:
      // { label: "Sharia Council", href: "/governance/sharia" },
      // { label: "Treasury", href: "/governance/treasury" },
    ],
  },

  // ─────────────────────────────
  // Foundation — Institutional layer
  // ─────────────────────────────
  // {
  //   label: "Foundation",
  //   hasDropdown: true,
  //   dropdownItems: [
  //     { label: "About the Foundation", href: "/foundation" },
  //     { label: "Legal & Compliance", href: "/foundation/legal" },
  //     { label: "Partnerships", href: "/#partners" },
  //     // Future:
  //     // { label: "Grants Program", href: "/grants" },
  //   ],
  // },

  // ─────────────────────────────
  // Builders — Dev & research
  // ─────────────────────────────
  {
    label: "Builders",
    hasDropdown: true,
    dropdownItems: [
      { label: "Documentation", href: "/docs" },
      { label: "GitHub", href: "https://github.com/tawf-labs" },
      { label: "Research & Papers", href: "/research" },
      { label: "Report Bugs & Requests", href: "/#feedback" },
    ],
  },

  // ─────────────────────────────
  // Community — Social & coordination
  // ─────────────────────────────
  // {
  //   label: "Community",
  //   hasDropdown: true,
  //   dropdownItems: [
  //     { label: "Discord", href: "https://discord.gg/yzYqgzkF" },
  //     { label: "Forum", href: "/forum" },
  //     { label: "Events", href: "/events" },
  //     { label: "Blog & Updates", href: "/blog" },
  //   ],
  // },
];


  return (
    <div className="fixed z-50 top-0 left-0 w-full">
      {scrolled && (
        <div className="absolute top-0 left-0 w-full h-20 backdrop-blur-md bg-black/80 border-b border-white/10 pointer-events-none" />
      )}

      <div className="relative pt-0 md:pt-0 transition-colors duration-200 ease-out">
        <header className="flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Skip Navigation Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-medium"
          >
            Skip to main content
          </a>

          {/* Left: Logo */}
          <Link href="/" className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
                <img src="/logos/tawflogo.png" alt="Tawf Logo - Home" className="w-[80px] md:w-[100px] h-auto" />
          </Link>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-12" aria-label="Main navigation">
            {navItems.map((item) => {
              const isOpen = openDropdown === item.label
              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className="flex items-center gap-1 px-4 py-2 font-sans font-medium uppercase text-foreground/60 hover:text-foreground duration-200 transition-colors ease-out cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-expanded={isOpen ? "true" : "false"}
                    aria-haspopup={item.hasDropdown ? "true" : undefined}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && isOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-56 rounded-lg bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                      role="menu"
                      aria-label={`${item.label} menu`}
                    >
                      <div className="py-2">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="block px-4 py-2.5 font-sans font-medium text-foreground/70 hover:text-foreground hover:bg-white/5 duration-200 transition-colors ease-out focus-visible:outline-none focus-visible:bg-white/10 rounded-md"
                            role="menuitem"
                            aria-current={dropdownItem.href === activePath ? "page" : undefined}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right: Dashboard Button and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden lg:inline-flex items-center justify-center px-4 py-1.5 inline-block font-sans font-medium uppercase text-black bg-white rounded-full hover:bg-white/90 duration-200 transition-colors ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-current={activePath === "/dashboard" ? "page" : undefined}
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