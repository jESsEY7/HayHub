export interface ParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
  trigger?: Element | null;
}

export class ParallaxController {
  private elements: Map<Element, ParallaxOptions> = new Map();
  private rafId: number | null = null;
  private isScrolling = false;

  constructor() {
    this.handleScroll = this.handleScroll.bind(this);
    this.update = this.update.bind(this);
  }

  register(element: Element, options: ParallaxOptions = {}) {
    this.elements.set(element, {
      speed: 0.5,
      direction: "up",
      ...options,
    });

    if (this.elements.size === 1) {
      this.startListening();
    }
  }

  unregister(element: Element) {
    this.elements.delete(element);

    if (this.elements.size === 0) {
      this.stopListening();
    }
  }

  private startListening() {
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  private stopListening() {
    window.removeEventListener("scroll", this.handleScroll);
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private handleScroll() {
    if (!this.isScrolling) {
      this.rafId = requestAnimationFrame(this.update);
      this.isScrolling = true;
    }
  }

  private update() {
    const scrolled = window.pageYOffset;

    this.elements.forEach((options, element) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Check if element is in viewport
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const speed = options.speed || 0.5;
        const direction = options.direction === "down" ? 1 : -1;
        const offset = (scrolled - elementTop) * speed * direction;

        (element as HTMLElement).style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    });

    this.isScrolling = false;
  }

  destroy() {
    this.stopListening();
    this.elements.clear();
  }
}

export const parallaxController = new ParallaxController();
