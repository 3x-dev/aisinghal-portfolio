import { motion } from "framer-motion";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const location = useLocation();
  
  const links = [
    { path: "/", label: "Home" },
    { path: "/now", label: "Now" },
    { path: "/projects", label: "Projects" },
    { path: "/thinking", label: "Thinking" },
    { path: "/about", label: "About" },
    { path: "/past-work", label: "Past Work" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-black">
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              AS
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                asChild
                className={`relative ${
                  location.pathname === link.path
                    ? "text-violet-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Link to={link.path}>
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-400"
                    />
                  )}
                </Link>
              </Button>
            ))}
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
