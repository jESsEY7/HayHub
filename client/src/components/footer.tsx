import { Leaf, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const productLinks = [
    { name: "Round Bales", href: "#products" },
    { name: "Square Bales", href: "#products" },
    { name: "Premium Alfalfa", href: "#products" },
    { name: "Custom Orders", href: "#contact" },
  ];

  const serviceLinks = [
    { name: "Delivery", href: "#services" },
    { name: "Storage", href: "#services" },
    { name: "Consultation", href: "#services" },
    { name: "Bulk Orders", href: "#services" },
  ];

  const companyLinks = [
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Careers", href: "#" },
    { name: "News", href: "#" },
  ];

  const socialLinks = [
    { icon: <Facebook className="text-xl" />, href: "#" },
    { icon: <Twitter className="text-xl" />, href: "#" },
    { icon: <Instagram className="text-xl" />, href: "#" },
    { icon: <Linkedin className="text-xl" />, href: "#" },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-forest text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <Leaf className="text-wheat text-2xl mr-2" />
              <span className="text-2xl font-bold">HayFlow</span>
            </div>
            <p className="text-gray-300 mb-4">
              Premium hay bales and agricultural solutions for modern farming operations.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-300 hover:text-wheat transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-wheat transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-wheat transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-wheat transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">
            © 2024 HayFlow. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-wheat transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-wheat transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
