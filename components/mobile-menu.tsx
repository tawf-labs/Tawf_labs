"use client"

import { cn } from "@/lib/utils"
import * as Dialog from "@radix-ui/react-dialog"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface MobileMenuProps {
  className?: string
}

export const MobileMenu = ({ className }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: "About", href: "#about" },
    { name: "Dapps", href: "#dapps" },
    { name: "Governance", href: "/governance" },
    { name: "Transparency", href: "/transparency" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "#contact" },
  ]

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <Dialog.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            "group lg:hidden p-2 text-foreground transition-all duration-200 rounded-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className
          )}
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <Menu className="group-[[data-state=open]]:hidden" size={24} />
          <X className="hidden group-[[data-state=open]]:block" size={24} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <div data-overlay="true" className="fixed z-30 inset-0 bg-black/50 backdrop-blur-sm" />

        <Dialog.Content
          onInteractOutside={(e) => {
            if (e.target instanceof HTMLElement && e.target.dataset.overlay !== "true") {
              e.preventDefault()
            }
          }}
          className="fixed top-0 left-0 w-full z-40 py-28 md:py-40"
        >
          <Dialog.Title className="sr-only">Mobile Navigation Menu</Dialog.Title>

          <nav className="flex flex-col space-y-6 container mx-auto" aria-label="Mobile navigation">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className="text-xl font-display uppercase text-foreground/60 transition-all duration-200 ease-out hover:text-foreground/100 py-2 px-4 rounded-md focus-visible:outline-none focus-visible:bg-white/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                tabIndex={isOpen ? 0 : -1}
              >
                {item.name}
              </Link>
            ))}

            {/* Note: Dashboard button is intentionally excluded from mobile menu.
                It's only visible on desktop (md+ breakpoint) in the main header. */}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}