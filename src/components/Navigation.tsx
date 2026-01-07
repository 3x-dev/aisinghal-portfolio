import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { useReducedEffects } from "@/hooks/use-reduced-effects";

export function Navigation() {
  const location = useLocation();
  const [navOpacity, setNavOpacity] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { shouldReduceEffects } = useReducedEffects();

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

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);
  
  const links = [
    { path: "/", label: "Home" },
    { path: "/now", label: "Now" },
    { path: "/projects", label: "Projects" },
    { path: "/past-work", label: "Past Work" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const navSurface = isScrolled ? "bg-black/80" : "bg-black/40";
  const navBlur = shouldReduceEffects
    ? ""
    : isScrolled
      ? "backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
      : "backdrop-blur-md";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: navOpacity }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 transition-[background-color,opacity] duration-300 ${navSurface} ${navBlur}`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-black relative group">
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-black/40 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
              <img
                src="/siteicon2.png"
                alt="Aryan Singhal"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
          
          <div className="hidden md:flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-2 py-1 backdrop-blur-xl">
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
                    className={`relative flex items-center gap-2 px-5 py-2 transition-all duration-300 ${
                      isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 rounded-full opacity-0 transition duration-300 group-hover:opacity-100 group-hover:scale-[1.02] ${
                        isActive
                          ? "bg-gradient-to-r from-violet-500/40 via-fuchsia-500/30 to-rose-500/30 opacity-100"
                          : "bg-violet-500/10"
                      }`}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="relative">
                        {link.label}
                        <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
                      </span>
                      {!isActive && (
                        <motion.span
                          className="h-1 w-1 rounded-full bg-violet-300 opacity-0 group-hover:opacity-100"
                          animate={{ scale: [1, 1.6, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                        />
                      )}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-5 right-5 h-0.5 bg-gradient-to-r from-violet-300 via-white to-fuchsia-300"
                      />
                    )}
                  </Link>
                </Button>
              );
            })}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-full border border-white/10 bg-white/5 text-violet-200 transition-colors hover:text-white"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation"
            >
              {isMobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </Button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isMobileOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/80 p-2 shadow-[0_16px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                {links.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="text-[0.6rem] uppercase tracking-[0.35em] text-violet-300">
                          live
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
