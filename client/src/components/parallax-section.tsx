import { useEffect, useRef, ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  backgroundImage: string;
  speed?: number;
  className?: string;
}

export default function ParallaxSection({
  children,
  backgroundImage,
  speed = 0.5,
  className = "",
}: ParallaxSectionProps) {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        backgroundRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div
        ref={backgroundRef}
        className="absolute inset-0 parallax"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      {children}
    </section>
  );
}
