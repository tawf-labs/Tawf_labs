"use client"

import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg border border-border/60 bg-black/30 p-6 sm:p-8 md:p-10 backdrop-blur">
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">Build with Tawf Labs</h3>
            <p className="font-sans text-base sm:text-lg text-foreground/80 mb-6 sm:mb-8 max-w-2xl text-soft-glow leading-relaxed">
              Looking to launch a Sharia-first zk application or partner on governance design? Let's connect.
            </p>
            <a href="mailto:team@tawflabs.com">
              <Button>[Email Us]</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )

}
// export function ContactSection() {
//   return (
//     <section id="contact" className="relative py-20 md:py-28">
//       <div className="container">
//         <div className="rounded-lg border border-border/60 bg-black/30 p-8 md:p-10 backdrop-blur">
//           <h3 className="font-display text-2xl md:text-3xl mb-3">Build with Tawf Labs</h3>
//           <p className="font-sans text-foreground/80 mb-6 max-w-2xl text-soft-glow leading-relaxed">
//             Looking to launch a halal-first zk application or partner on governance design? Let’s connect.
//           </p>
//           <a href="mailto:team@tawflabs.com">
//             <Button>[Email Us]</Button>
//           </a>
//         </div>
//       </div>
//     </section>
//   )
// }
