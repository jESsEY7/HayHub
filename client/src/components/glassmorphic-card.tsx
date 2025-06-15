import { cn } from "@/lib/utils";

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
}

export default function GlassmorphicCard({
  children,
  className,
  variant = "light",
}: GlassmorphicCardProps) {
  const baseClasses = "rounded-2xl backdrop-blur-md border";
  
  const variantClasses = {
    light: "glass-morphism",
    dark: "glass-dark",
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
