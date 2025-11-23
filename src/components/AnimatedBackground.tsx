import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const keywords = [
    "SYSTEMS", "RUST", "GPU", "SCALE", "INFRA", 
    "AGENTIC", "ETHICS", "BUILD", "SHIP", "DEPLOY",
    "COMPUTE", "NODES", "MESH", "GRPC", "K8S",
    "LATENCY", "MODEL", "DATA", "FLOW", "SYNC",
    "PURDUE", "CS", "ALGO", "GRAPH", "TIME",
    "MEMORY", "KERNEL", "LINUX", "DIST", "NET"
  ];

  return (
    <>
      {/* Animated gradient orbs */}
      <motion.div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0 blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 blur-3xl opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
          right: "10%",
          top: "20%",
        }}
      />

      <motion.div
        className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-0 blur-3xl opacity-25"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
          left: "15%",
          bottom: "15%",
        }}
      />

      {/* Additional floating orbs for more movement */}
      <motion.div
        className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-0 blur-3xl opacity-15"
        animate={{
          x: [0, 120, 0],
          y: [0, -120, 0],
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
          left: "40%",
          top: "60%",
        }}
      />

      <motion.div
        className="fixed w-[350px] h-[350px] rounded-full pointer-events-none z-0 blur-3xl opacity-20"
        animate={{
          x: [0, -90, 0],
          y: [0, 90, 0],
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(217,70,239,0.3) 0%, transparent 70%)",
          right: "30%",
          bottom: "30%",
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 rounded-full pointer-events-none z-0 bg-violet-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Hidden Words Layer - Revealed by Cursor */}
      <div 
        className="fixed inset-0 z-0 flex flex-wrap items-center justify-center gap-16 opacity-20 pointer-events-none overflow-hidden"
        style={{
          maskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
        }}
      >
        {keywords.map((word, i) => (
          <motion.span 
            key={i} 
            className="text-4xl md:text-6xl font-black text-violet-400/20 font-mono select-none whitespace-nowrap"
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Noise Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cursor-reveal texture layer (Dots) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-30 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 2px, transparent 2px)",
          backgroundSize: "140px 140px",
          maskImage: `radial-gradient(420px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,1) 0%, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(420px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,1) 0%, transparent 70%)`,
        }}
      />

      {/* Luminescent spotlight following the cursor */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139,92,246,0.15), transparent 55%)`,
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern overlay with subtle animation */}
      <motion.div 
        className="fixed inset-0 bg-grid-pattern pointer-events-none z-0"
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}