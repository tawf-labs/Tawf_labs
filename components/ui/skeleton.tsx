import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "text-sm" | "avatar" | "card" | "circle"
}

function Skeleton({ className, variant = "text", ...props }: SkeletonProps) {
  const variantClasses = {
    text: "skeleton-text",
    "text-sm": "skeleton-text-sm",
    avatar: "skeleton-avatar",
    card: "skeleton-card",
    circle: "rounded-full",
  }

  return (
    <div
      className={cn("skeleton", variantClasses[variant], className)}
      {...props}
    />
  )
}

export { Skeleton }
