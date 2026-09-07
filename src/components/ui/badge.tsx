import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "forest" | "emerald" | "moss" | "gold" | "amber" | "outline" | "danger" | "verified" | "warning" | "destructive";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-parchment-dark/70 text-ink border-cream-border",
    forest: "bg-forest/10 text-forest border-forest/20 font-medium",
    emerald: "bg-forest/10 text-forest border-forest/20 font-medium",
    moss: "bg-moss/15 text-forest-dark border-moss/30 font-medium",
    gold: "bg-gold/15 text-[#8c6710] border-gold/30 font-medium",
    amber: "bg-gold/15 text-[#8c6710] border-gold/30 font-medium",
    outline: "bg-transparent text-ink-muted border-cream-border",
    danger: "bg-red-50 text-red-700 border-red-200",
    destructive: "bg-red-100 text-red-700 border-red-300 font-medium",
    verified: "bg-emerald-100 text-emerald-700 border-emerald-200 font-medium",
    warning: "bg-amber-100 text-amber-700 border-amber-200 font-medium",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
