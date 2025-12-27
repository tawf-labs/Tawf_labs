"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutGrid, Phone, Smartphone } from "lucide-react";

export function DappsSection() {
  const apps = [
    {
      name: "zkt.app",
      title: "Zakat on-chain",
      desc: "Calculate, verify, and distribute zakat with auditability and privacy via ZK proofs.",
      href: "https://zkt.app",
    },
    {
      name: "Tawf Sharia Governance",
      title: "ZK Governance",
      desc: "Sharia-compliant governance with zero-knowledge attestations and transparent outcomes.",
      href: "#governance",
    },
    {
      name: "qrbn.app",
      title: "Qurbani on-chain",
      desc: "End-to-end qurbani procurement and proof-of-fulfillment using blockchain.",
      href: "https://qrbn.app",
    },
  ];

  return (
    <section id="dapps" className="relative py-16 sm:py-20 md:py-28">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <h2 className="bg-clip-text bg-gradient-to-r from-[#FFC700] to-[#ffe38a] mb-8 sm:mb-10 font-display text-transparent text-3xl sm:text-4xl md:text-5xl">
              Dapps
            </h2>
            <Smartphone className="-mt-8 w-12 h-12 text-foreground/80" />
          </div>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
              <Card
                key={app.name}
                className="bg-black/30 backdrop-blur border-border/60"
              >
                <CardHeader>
                  <CardTitle className="font-display text-xl">
                    {app.title}
                  </CardTitle>
                  <CardDescription className="font-mono text-foreground/80">
                    {app.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="font-sans text-foreground/80 text-soft-glow text-sm leading-relaxed">
                    {app.desc}
                  </p>
                  <div>
                    <Link
                      href={app.href}
                      target={
                        app.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel="noopener noreferrer"
                    >
                      <Button>[Open]</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
