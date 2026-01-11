"use client"

import Link from "next/link"
import { Github, X, MessageCircle, Send } from "lucide-react"

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
    { icon: Github, href: "https://github.com/tawf", label: "GitHub" },
    { icon: X, href: "https://twitter.com/tawf", label: "Twitter" },
    { icon: MessageCircle, href: "https://discord.gg/tawf", label: "Discord" },
    { icon: Send, href: "https://t.me/tawf", label: "Telegram" },
  ]

  return (
    <footer className="relative z-10 bg-black border-t border-white/10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
            {/* Logo and Description - spans 2 columns on large screens */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <img src="/logos/tawflogo.png" alt="Tawf Logo" className="w-[80px] h-auto" />
              </Link>
              <p className="text-sm text-foreground/60 leading-relaxed max-w-sm">
                Tawf is a Sharia-first Web3 ecosystem providing on-chain zakat, waqf, and qurban infrastructure, governed by a dual-layer DAO with zero-knowledge Sharia oversight.
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
                      className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-200"
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
                      className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-200"
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
                      className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-200"
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
                      className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-200"
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

              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-foreground/60 hover:text-foreground transition-all duration-200"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
