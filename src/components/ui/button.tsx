import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-forest text-parchment hover:bg-forest-dark shadow-sm hover:shadow active:scale-[0.99] focus-visible:ring-forest",
      secondary:
        "bg-gold text-ink font-semibold hover:bg-gold-dark shadow-sm active:scale-[0.99] focus-visible:ring-gold",
      outline:
        "border border-cream-border bg-white text-ink hover:bg-parchment hover:border-[#c8c0af] focus-visible:ring-cream-border",
      ghost:
        "text-ink-light hover:bg-parchment hover:text-ink focus-visible:ring-cream-border",
      danger:
        "bg-red-700 text-white hover:bg-red-800 shadow-sm focus-visible:ring-red-600",
    };

    const sizes = {
      sm: "h-9 px-3.5 text-xs gap-1.5",
      md: "h-11 px-5 text-sm gap-2",
      lg: "h-12 px-7 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
