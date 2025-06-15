import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Leaf } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#products", label: "Products" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-morphism bg-white/95 shadow-lg"
          : "glass-morphism"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Leaf className="text-forest text-2xl mr-2" />
            <span className="text-xl font-bold text-forest">HayFlow</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-gray-700 hover:text-forest transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <Button
              onClick={() => handleNavClick("#contact")}
              className="holographic-bg text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="text-gray-700 hover:text-forest" />
                </Button>
              </SheetTrigger>
              <SheetContent className="glass-dark">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="text-white hover:text-wheat transition-colors py-2 text-left"
                    >
                      {link.label}
                    </button>
                  ))}
                  <Button
                    onClick={() => handleNavClick("#contact")}
                    className="holographic-bg text-white mt-4"
                  >
                    Get Quote
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
