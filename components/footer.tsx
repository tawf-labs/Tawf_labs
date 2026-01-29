"use client"

import Link from "next/link"
import { Github, X, MessageCircle, Send, Twitter } from "lucide-react"

export const Footer = () => {
  const productLinks = [
    { label: "Overview", href: "/#about" },
    { label: "Ecosystem", href: "/#ecosystem" },
    { label: "DApps", href: "/#dapps" },
    { label: "Governance", href: "/#governance" },
  ]

  const companyLinks = [
    { label: "About", href: "/#about" },
    { label: "Team", href: "/team" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ]

  const resourcesLinks = [
    { label: "Documentation", href: "/docs" },
    { label: "Help Center", href: "/help" },
    { label: "Community", href: "/community" },
    { label: "Partners", href: "/partners" },
  ]

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/tawf-labs", label: "GitHub" },
    { icon: Twitter, href: "https://x.com/tawfecosystem", label: "Twitter" },
    { icon: MessageCircle, href: "https://discord.gg/s7K59wE4qc", label: "Discord" },
    { icon: Send, href: "https://t.me/tawf", label: "Telegram" },
  ]

  const linkClassName = "text-sm text-foreground/60 hover:text-foreground transition-all duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background py-1 px-1 -mx-1"

  return (
    <footer className="relative z-10 bg-black border-t border-white/10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
            {/* Logo and Description - spans 2 columns on large screens */}
            <div className="lg:col-span-2">
              <Link
                href="/"
                className="inline-block mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              >
                <img src="/logos/tawflogo.png" alt="Tawf Logo - Home" className="w-[80px] h-auto" />
              </Link>
              <p className="text-sm text-foreground/60 leading-relaxed max-w-sm">
                Tawf serves the Ummah with Sharia-aligned infrastructure for on-chain zakat, waqf, and qurban, governed by a dual-layer DAO with zero-knowledge Sharia oversight.
              </p>
            </div>

            {/* Products Column */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Products</h3>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={linkClassName}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={linkClassName}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-3">
                {resourcesLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={linkClassName}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={linkClassName}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section - Copyright and Social Icons */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-foreground/50">
                © {new Date().getFullYear()} Tawf. All rights reserved.
              </p>

              <nav className="flex items-center gap-4" aria-label="Social media links">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-foreground/60 hover:text-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      aria-label={`Visit Tawf on ${social.label}`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
