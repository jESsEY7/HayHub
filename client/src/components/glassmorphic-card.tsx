import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface GlassmorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
}

const GlassmorphicCard = forwardRef<HTMLDivElement, GlassmorphicCardProps>(({
  children,
  className,
  variant = "light",
  ...props
}, ref) => {
  const baseClasses = "rounded-2xl backdrop-blur-md border";

  const variantClasses = {
    light: "glass-morphism",
    dark: "glass-dark",
  };

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

GlassmorphicCard.displayName = "GlassmorphicCard";

export default GlassmorphicCard;
