import { useEffect, useRef } from "react";
import { parallaxController, type ParallaxOptions } from "@/lib/parallax";

export function useParallax(options: ParallaxOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    parallaxController.register(element, options);

    return () => {
      parallaxController.unregister(element);
    };
  }, [options.speed, options.direction]);

  return elementRef;
}
