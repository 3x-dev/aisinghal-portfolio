import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const location = useLocation();
  const [navOpacity, setNavOpacity] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const FADE_DISTANCE = 240;
    const MIN_OPACITY = 0.35;
    let frameId = 0;

    const updateMetrics = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 8);

      const progress = Math.min(Math.max(currentY / FADE_DISTANCE, 0), 1);
      const opacity = 1 - progress * (1 - MIN_OPACITY);

      setNavOpacity(Number(opacity.toFixed(3)));
      frameId = 0;
    };

    const handleScroll = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(updateMetrics);
    };

    updateMetrics();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);
  
  const links = [
    { path: "/", label: "Home" },
    { path: "/now", label: "Now" },
    { path: "/projects", label: "Projects" },
    { path: "/past-work", label: "Past Work" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: navOpacity }}
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