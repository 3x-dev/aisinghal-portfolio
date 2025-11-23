import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;

      setIsScrolled(currentY > 8);

      if (currentY <= 0) {
        setIsVisible(true);
      } else if (delta > 6) {
        setIsVisible(false);
      } else if (delta < -6) {
        setIsVisible(true);
      }

      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const links = [
    { path: "/", label: "Home" },
    { path: "/now", label: "Now" },
    { path: "/projects", label: "Projects" },
    { path: "/about", label: "About" },
    { path: "/past-work", label: "Past Work" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -40, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 transition-[background-color,opacity] duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.45)]" : "bg-black/40 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-black">
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              AS
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Button
                  key={link.path}
                  variant="ghost"
                  asChild
                  className="relative overflow-hidden rounded-full px-0 py-0 text-sm font-medium text-gray-300 transition-colors group"
                >
                  <Link
                    to={link.path}
                    className={`relative flex items-center px-5 py-2 transition-colors duration-200 ${
                      isActive ? "text-violet-200" : "text-gray-300 group-hover:text-white"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
                        isActive ? "bg-violet-500/30 opacity-100" : "bg-violet-500/20"
                      }`}
                    />
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-5 right-5 h-0.5 bg-violet-300"
                      />
                    )}
                  </Link>
                </Button>
              );
            })}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <span className="text-violet-400">☰</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}