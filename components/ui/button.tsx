import type * as React from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex relative uppercase font-display cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-bold ease-out transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "rounded-full tracking-wide text-[color:var(--btn-foreground)] bg-[image:linear-gradient(180deg,var(--btn-bg-start),var(--btn-bg-end))] border border-[color:var(--btn-border)] shadow-[0_6px_20px_rgba(0,0,0,0.25)] [filter:drop-shadow(0_12px_22px_var(--btn-drop))] hover:[filter:drop-shadow(0_18px_28px_var(--btn-drop-hover))] hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:scale-[1.045] hover:-translate-y-0.5 focus-visible:ring-[var(--btn-glow)] will-change-transform after:content-[''] after:absolute after:-z-10 after:left-6 after:right-6 after:-bottom-2 after:h-6 after:rounded-full after:bg-[radial-gradient(ellipse_at_center,var(--btn-ellipse),rgba(0,0,0,0)_65%)] after:blur-xl after:opacity-80 hover:after:opacity-100",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        ghost:
          "hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        link:
          "text-primary underline-offset-4 hover:underline focus-visible:ring-ring focus-visible:underline",
      },
      size: {
        default: "h-16 px-12 text-base",
        sm: "h-14 px-9 text-sm",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /**
   * Accessible label for screen readers. Use when button contains only an icon.
   */
  ariaLabel?: string
}

function Button({
  className,
  variant,
  size,
  children,
  asChild = false,
  ariaLabel,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      style={
        {
          "--btn-bg-start": "#FFA63D",
          "--btn-bg-end": "#FFCC59",
          "--btn-border": "#FFD980",
          "--btn-glow": "rgba(255, 163, 26, 0.6)",
          "--btn-foreground": "#0A0A0A",
          "--btn-drop": "rgba(255, 143, 0, 0.35)",
          "--btn-drop-hover": "rgba(255, 143, 0, 0.62)",
          "--btn-ellipse": "rgba(255, 143, 0, 0.48)",
        } as React.CSSProperties
      }
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      aria-label={ariaLabel}
      {...props}
    >
      <span className="tracking-[0.06em]">
        <Slottable>{children}</Slottable>
      </span>
    </Comp>
  )
}

export { Button, buttonVariants }
