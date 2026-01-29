"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface TeamMember {
  name: string
  role: string
  bio: string
  initials: string
  image?: string
  socials?: {
    github?: string
    twitter?: string
    linkedin?: string
    email?: string
  }
}

export default function LabsPage() {
  const teamMembers: TeamMember[] = [
    {
      name: "Muhammad Zidan Fatonie",
      role: "Founder & CEO",
      bio: "Cryptography researcher focused on zero-knowledge proofs and privacy protocols for Islamic finance.",
      initials: "MZ",
      image: "/zidan.jpg",
      socials: {
        github: "https://github.com/mzf11125",
        twitter: "https://x.com/DeDanzi",
        linkedin: "https://linkedin.com/in/mzidanfatonie",
      },
    },
    {
      name: "Bhremada Fevreano",
      role: "CTO & Co-Founder",
      bio: "Cybersecurity specialist with national CTF finalist experience, focused on blockchain security and smart contract auditing.",
      initials: "BF",
      image: "/bhre.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/bhremada-fevreano/",
      },
    },
    {
      name: "Marcellino Asanuddin",
      role: "Relations and Operations",
      bio: "Operations lead connecting partners and communities with Tawf's vision for Sharia-compliant Web3 infrastructure.",
      initials: "MA",
      image: "/marcel.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/marcellino-asanuddin/",
      },
    },
    {
      name: "Maulana Asykari Muhammad",
      role: "CBO",
      bio: "Business strategist driving adoption of transparent smart contracts for zakat, qurbani, and Islamic charitable distribution.",
      initials: "MA",
      image: "/maul.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/maulanasykari",
      },
    },
    {
      name: "Abdul Latif",
      role: "Lead Designer",
      bio: "Designer crafting intuitive interfaces that make complex Web3 and zero-knowledge technology accessible to everyone.",
      initials: "AL",
      socials: {
        linkedin: "https://www.linkedin.com/in/abdul-latif-2999b6282/",
      },
    },
    {
      name: "Riyan Ainur Rahman",
      role: "Lead Developer",
      bio: "Full-stack developer architecting secure, scalable infrastructure for decentralized Islamic applications.",
      initials: "RR",
      image: "/riyan.jpg",
      socials: {
        github: "https://github.com/riyqnn",
        linkedin: "https://www.linkedin.com/in/riyanarhm",
      },
    },
    {
      name: "Muhammad Fazle Mawla",
      role: "Designer and Video Editor",
      bio: "Creative designer and video editor crafting visual narratives that communicate Tawf's vision for Sharia-compliant Web3 solutions.",
      initials: "FM",
      image: "/fazle.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/muhammad-fazle-mawla-b86a77246/",
      },
    },
  ]

  return (
    <main className="relative min-h-screen">
      <Header />
      
      {/* Background gradient effect similar to hero */}
      <div className="absolute inset-0 bg-black -z-10" />
      
      <div className="relative z-10 bg-black/95">
        <section className="relative py-32 sm:py-36 md:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-12 sm:mb-16">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
                  Tawf Labs
                </h1>
                <p className="font-sans text-lg sm:text-xl text-foreground/80 max-w-3xl leading-relaxed">
                  Meet the team bridging Islamic finance and Web3 through Sharia-compliant web3 innovation.
                </p>
              </div>

              {/* Team Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <Card key={member.name} className="border-border/60 bg-black/30 backdrop-blur hover:bg-black/40 transition-colors duration-300">
                    <CardHeader>
                      {/* Avatar with image or initials */}
                      <div className="mb-4">
                        {member.image ? (
                          <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#FFC700]/30">
                            <Image
                              src={member.image}
                              alt={member.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFC700] to-[#ebb800] flex items-center justify-center">
                            <span className="font-display text-2xl font-bold text-black">
                              {member.initials}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <CardTitle className="font-display text-xl sm:text-2xl text-foreground">
                        {member.name}
                      </CardTitle>
                      <CardDescription className="font-mono text-sm text-[#FFC700]/90">
                        {member.role}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex flex-col gap-4">
                      <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                        {member.bio}
                      </p>
                      
                      {/* Social Links */}
                      {member.socials && (
                        <div className="flex gap-3 pt-2">
                          {member.socials.github && (
                            <Link
                              href={member.socials.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/60 hover:text-[#FFC700] transition-colors duration-200"
                            >
                              <Github className="w-5 h-5" />
                            </Link>
                          )}
                          {member.socials.twitter && (
                            <Link
                              href={member.socials.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/60 hover:text-[#FFC700] transition-colors duration-200"
                            >
                              <Twitter className="w-5 h-5" />
                            </Link>
                          )}
                          {member.socials.linkedin && (
                            <Link
                              href={member.socials.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/60 hover:text-[#FFC700] transition-colors duration-200"
                            >
                              <Linkedin className="w-5 h-5" />
                            </Link>
                          )}
                          {member.socials.email && (
                            <Link
                              href={member.socials.email}
                              className="text-foreground/60 hover:text-[#FFC700] transition-colors duration-200"
                            >
                              <Mail className="w-5 h-5" />
                            </Link>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-16 sm:mt-20 text-center">
                <h3 className="font-display text-2xl sm:text-3xl mb-4 text-foreground">
                  Join Our Mission
                </h3>
                <p className="font-sans text-base sm:text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                  We're always looking for talented individuals passionate about building the future of Islamic Web3.
                </p>
                <Link
                  href="/#contact"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-[#FFC700] to-[#ebb800] text-black font-sans font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}   